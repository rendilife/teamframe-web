import crypto from "node:crypto";

export type VisitStats = {
  ok: boolean;
  storage: "redis" | "worker" | "memory" | "disabled";
  persistent: boolean;
  date: string;
  totalVisits: number;
  todayVisits: number;
  uniqueDevices: number;
  returningToday: number;
  returnRate: number;
  averageDurationSeconds: number;
  todayAverageDurationSeconds: number;
  updatedAt: string;
};

type VisitSessionInput = {
  deviceId: string;
  path?: string;
  referrer?: string;
};

type VisitHeartbeatInput = {
  deviceId: string;
  path?: string;
};

type VisitSessionResult = {
  ok: boolean;
  countedToday: boolean;
  returning: boolean;
  storage: VisitStats["storage"];
  persistent: boolean;
  stats?: VisitStats;
};

type VisitRecord = {
  startedAt: number;
  lastSeenAt: number;
  durationSeconds: number;
  path: string;
  referrer: string;
  returning: boolean;
};

type MemoryState = {
  devices: Set<string>;
  dayDevices: Map<string, Set<string>>;
  returningByDay: Map<string, number>;
  visitsByDay: Map<string, Map<string, VisitRecord>>;
  totalVisits: number;
  totalDurationSeconds: number;
  durationByDay: Map<string, number>;
};

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const VISITOR_WORKER_URL = (
  process.env.VISITOR_COUNTER_WORKER_URL ||
  process.env.NEXT_PUBLIC_VISITOR_COUNTER_WORKER_URL ||
  "https://broken-water-81ad.rendi023.workers.dev"
).replace(/\/+$/, "");
const HASH_SALT = process.env.VISITOR_COUNTER_SALT || "teamframe-web-visitor-counter";
const SESSION_DELTA_LIMIT_SECONDS = 75;

const KEY_PREFIX = "teamframe:web:visits";

const globalMemory = globalThis as unknown as {
  __teamFrameVisitMemory?: MemoryState;
};

function getMemoryState(): MemoryState {
  if (!globalMemory.__teamFrameVisitMemory) {
    globalMemory.__teamFrameVisitMemory = {
      devices: new Set(),
      dayDevices: new Map(),
      returningByDay: new Map(),
      visitsByDay: new Map(),
      totalVisits: 0,
      totalDurationSeconds: 0,
      durationByDay: new Map(),
    };
  }

  return globalMemory.__teamFrameVisitMemory;
}

function hasRedis() {
  return Boolean(REDIS_URL && REDIS_TOKEN);
}

function hasWorker() {
  return Boolean(VISITOR_WORKER_URL);
}

function dateStamp(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function safeText(value: unknown, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.slice(0, 500);
}

function hashDeviceId(deviceId: string) {
  return crypto
    .createHash("sha256")
    .update(`${HASH_SALT}:${deviceId}`)
    .digest("hex");
}

function toNumber(value: unknown) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function clampDurationDelta(delta: number) {
  if (!Number.isFinite(delta) || delta <= 0) {
    return 0;
  }

  return Math.min(delta, SESSION_DELTA_LIMIT_SECONDS);
}

function parseRedisHash(value: unknown): Record<string, string> {
  if (!Array.isArray(value)) {
    return {};
  }

  const result: Record<string, string> = {};
  for (let index = 0; index < value.length; index += 2) {
    const key = value[index];
    const item = value[index + 1];
    if (typeof key === "string") {
      result[key] = String(item ?? "");
    }
  }
  return result;
}

async function redisCommand(command: (string | number)[]) {
  if (!hasRedis()) {
    throw new Error("Visitor counter Redis storage is not configured.");
  }

  const response = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis command failed: ${response.status}`);
  }

  const data = await response.json();
  return data?.result;
}

async function workerJsonRequest<T>(
  path: string,
  init?: {
    method?: "GET" | "POST";
    body?: unknown;
  },
): Promise<T> {
  if (!hasWorker()) {
    throw new Error("Visitor counter worker URL is not configured.");
  }

  const response = await fetch(`${VISITOR_WORKER_URL}${path}`, {
    method: init?.method || "GET",
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Visitor worker request failed: ${response.status} ${body.slice(0, 200)}`);
  }

  return response.json() as Promise<T>;
}

async function getWorkerStats(): Promise<VisitStats> {
  return workerJsonRequest<VisitStats>("/api/visits/stats");
}

async function trackWorkerSession(input: VisitSessionInput): Promise<VisitSessionResult> {
  return workerJsonRequest<VisitSessionResult>("/api/visits/session", {
    method: "POST",
    body: input,
  });
}

async function trackWorkerHeartbeat(input: VisitHeartbeatInput): Promise<VisitSessionResult> {
  return workerJsonRequest<VisitSessionResult>("/api/visits/heartbeat", {
    method: "POST",
    body: input,
  });
}

function keys(day: string, deviceHash?: string) {
  return {
    devices: `${KEY_PREFIX}:devices`,
    totalVisits: `${KEY_PREFIX}:total_visits`,
    totalDuration: `${KEY_PREFIX}:total_duration`,
    dayDevices: `${KEY_PREFIX}:day:${day}:devices`,
    dayReturning: `${KEY_PREFIX}:day:${day}:returning`,
    dayDuration: `${KEY_PREFIX}:day:${day}:duration`,
    visit: `${KEY_PREFIX}:day:${day}:visit:${deviceHash || ""}`,
  };
}

async function getRedisStats(day = dateStamp()): Promise<VisitStats> {
  const k = keys(day);
  const [
    totalVisits,
    todayVisits,
    uniqueDevices,
    returningToday,
    totalDuration,
    todayDuration,
  ] = await Promise.all([
    redisCommand(["GET", k.totalVisits]),
    redisCommand(["SCARD", k.dayDevices]),
    redisCommand(["SCARD", k.devices]),
    redisCommand(["GET", k.dayReturning]),
    redisCommand(["GET", k.totalDuration]),
    redisCommand(["GET", k.dayDuration]),
  ]);

  const total = toNumber(totalVisits);
  const today = toNumber(todayVisits);
  const returning = toNumber(returningToday);
  const duration = toNumber(totalDuration);
  const durationToday = toNumber(todayDuration);

  return {
    ok: true,
    storage: "redis",
    persistent: true,
    date: day,
    totalVisits: total,
    todayVisits: today,
    uniqueDevices: toNumber(uniqueDevices),
    returningToday: returning,
    returnRate: today > 0 ? Math.round((returning / today) * 100) : 0,
    averageDurationSeconds: total > 0 ? Math.round(duration / total) : 0,
    todayAverageDurationSeconds: today > 0 ? Math.round(durationToday / today) : 0,
    updatedAt: new Date().toISOString(),
  };
}

async function trackRedisSession(input: VisitSessionInput): Promise<VisitSessionResult> {
  const day = dateStamp();
  const now = nowSeconds();
  const deviceHash = hashDeviceId(input.deviceId);
  const k = keys(day, deviceHash);
  const path = safeText(input.path, "/");
  const referrer = safeText(input.referrer);

  const wasKnown = toNumber(await redisCommand(["SISMEMBER", k.devices, deviceHash])) === 1;
  const countedToday = toNumber(await redisCommand(["SADD", k.dayDevices, deviceHash])) === 1;

  await redisCommand(["SADD", k.devices, deviceHash]);

  if (countedToday) {
    await Promise.all([
      redisCommand(["INCR", k.totalVisits]),
      wasKnown ? redisCommand(["INCR", k.dayReturning]) : Promise.resolve(0),
      redisCommand(["EXPIRE", k.dayDevices, 60 * 60 * 24 * 400]),
      redisCommand(["EXPIRE", k.dayReturning, 60 * 60 * 24 * 400]),
    ]);
  }

  const existing = parseRedisHash(await redisCommand(["HGETALL", k.visit]));
  if (!existing.startedAt) {
    await redisCommand([
      "HSET",
      k.visit,
      "startedAt",
      now,
      "lastSeenAt",
      now,
      "durationSeconds",
      0,
      "path",
      path,
      "referrer",
      referrer,
      "returning",
      wasKnown ? "1" : "0",
    ]);
  } else {
    await redisCommand([
      "HSET",
      k.visit,
      "lastSeenAt",
      now,
      "path",
      path,
    ]);
  }

  await redisCommand(["EXPIRE", k.visit, 60 * 60 * 24 * 400]);

  return {
    ok: true,
    countedToday,
    returning: wasKnown,
    storage: "redis",
    persistent: true,
    stats: await getRedisStats(day),
  };
}

async function trackRedisHeartbeat(input: VisitHeartbeatInput) {
  const day = dateStamp();
  const now = nowSeconds();
  const deviceHash = hashDeviceId(input.deviceId);
  const k = keys(day, deviceHash);
  const record = parseRedisHash(await redisCommand(["HGETALL", k.visit]));

  if (!record.startedAt) {
    return trackRedisSession(input);
  }

  const lastSeenAt = toNumber(record.lastSeenAt);
  const delta = clampDurationDelta(now - lastSeenAt);

  if (delta > 0) {
    await Promise.all([
      redisCommand(["HINCRBY", k.visit, "durationSeconds", delta]),
      redisCommand(["HSET", k.visit, "lastSeenAt", now, "path", safeText(input.path, "/")]),
      redisCommand(["INCRBY", k.totalDuration, delta]),
      redisCommand(["INCRBY", k.dayDuration, delta]),
      redisCommand(["EXPIRE", k.visit, 60 * 60 * 24 * 400]),
      redisCommand(["EXPIRE", k.dayDuration, 60 * 60 * 24 * 400]),
    ]);
  }

  return {
    ok: true,
    countedToday: false,
    returning: record.returning === "1",
    storage: "redis" as const,
    persistent: true,
    stats: await getRedisStats(day),
  };
}

function getMemoryStats(day = dateStamp()): VisitStats {
  const memory = getMemoryState();
  const todayVisits = memory.dayDevices.get(day)?.size || 0;
  const returningToday = memory.returningByDay.get(day) || 0;
  const todayDuration = memory.durationByDay.get(day) || 0;

  return {
    ok: true,
    storage: "memory",
    persistent: false,
    date: day,
    totalVisits: memory.totalVisits,
    todayVisits,
    uniqueDevices: memory.devices.size,
    returningToday,
    returnRate: todayVisits > 0 ? Math.round((returningToday / todayVisits) * 100) : 0,
    averageDurationSeconds:
      memory.totalVisits > 0 ? Math.round(memory.totalDurationSeconds / memory.totalVisits) : 0,
    todayAverageDurationSeconds:
      todayVisits > 0 ? Math.round(todayDuration / todayVisits) : 0,
    updatedAt: new Date().toISOString(),
  };
}

function trackMemorySession(input: VisitSessionInput): VisitSessionResult {
  const memory = getMemoryState();
  const day = dateStamp();
  const now = nowSeconds();
  const deviceHash = hashDeviceId(input.deviceId);
  const path = safeText(input.path, "/");
  const referrer = safeText(input.referrer);
  const wasKnown = memory.devices.has(deviceHash);

  if (!memory.dayDevices.has(day)) {
    memory.dayDevices.set(day, new Set());
  }
  if (!memory.visitsByDay.has(day)) {
    memory.visitsByDay.set(day, new Map());
  }

  const dayDevices = memory.dayDevices.get(day)!;
  const dayVisits = memory.visitsByDay.get(day)!;
  const countedToday = !dayDevices.has(deviceHash);

  if (countedToday) {
    dayDevices.add(deviceHash);
    memory.devices.add(deviceHash);
    memory.totalVisits += 1;
    if (wasKnown) {
      memory.returningByDay.set(day, (memory.returningByDay.get(day) || 0) + 1);
    }
  }

  if (!dayVisits.has(deviceHash)) {
    dayVisits.set(deviceHash, {
      startedAt: now,
      lastSeenAt: now,
      durationSeconds: 0,
      path,
      referrer,
      returning: wasKnown,
    });
  } else {
    const record = dayVisits.get(deviceHash)!;
    record.lastSeenAt = now;
    record.path = path;
  }

  return {
    ok: true,
    countedToday,
    returning: wasKnown,
    storage: "memory",
    persistent: false,
    stats: getMemoryStats(day),
  };
}

function trackMemoryHeartbeat(input: VisitHeartbeatInput): VisitSessionResult {
  const memory = getMemoryState();
  const day = dateStamp();
  const now = nowSeconds();
  const deviceHash = hashDeviceId(input.deviceId);
  const dayVisits = memory.visitsByDay.get(day);
  const record = dayVisits?.get(deviceHash);

  if (!record) {
    return trackMemorySession(input);
  }

  const delta = clampDurationDelta(now - record.lastSeenAt);
  if (delta > 0) {
    record.durationSeconds += delta;
    record.lastSeenAt = now;
    record.path = safeText(input.path, "/");
    memory.totalDurationSeconds += delta;
    memory.durationByDay.set(day, (memory.durationByDay.get(day) || 0) + delta);
  }

  return {
    ok: true,
    countedToday: false,
    returning: record.returning,
    storage: "memory",
    persistent: false,
    stats: getMemoryStats(day),
  };
}

export async function trackVisitSession(input: VisitSessionInput) {
  if (!input.deviceId || input.deviceId.length < 12) {
    throw new Error("Missing visitor device id.");
  }

  if (hasRedis()) {
    return trackRedisSession(input);
  }

  if (hasWorker()) {
    try {
      return await trackWorkerSession(input);
    } catch (error) {
      console.error("[VISITS] Cloudflare Worker session fallback failed:", error);
    }
  }

  return trackMemorySession(input);
}

export async function trackVisitHeartbeat(input: VisitHeartbeatInput) {
  if (!input.deviceId || input.deviceId.length < 12) {
    throw new Error("Missing visitor device id.");
  }

  if (hasRedis()) {
    return trackRedisHeartbeat(input);
  }

  if (hasWorker()) {
    try {
      return await trackWorkerHeartbeat(input);
    } catch (error) {
      console.error("[VISITS] Cloudflare Worker heartbeat fallback failed:", error);
    }
  }

  return trackMemoryHeartbeat(input);
}

export async function getVisitStats() {
  if (hasRedis()) {
    return getRedisStats();
  }

  if (hasWorker()) {
    try {
      return await getWorkerStats();
    } catch (error) {
      console.error("[VISITS] Cloudflare Worker stats fallback failed:", error);
    }
  }

  return getMemoryStats();
}
