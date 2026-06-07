"use client";

import { useEffect } from "react";

const DEVICE_KEY = "teamframe_web_device_id";
const HEARTBEAT_MS = 20_000;

function makeDeviceId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `tf-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getDeviceId() {
  try {
    const existing = localStorage.getItem(DEVICE_KEY);
    if (existing && existing.length >= 12) {
      return existing;
    }

    const next = makeDeviceId();
    localStorage.setItem(DEVICE_KEY, next);
    return next;
  } catch {
    return makeDeviceId();
  }
}

function payload(deviceId: string) {
  return {
    deviceId,
    path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || "",
  };
}

function postJson(url: string, body: unknown) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    keepalive: true,
  }).catch(() => null);
}

function beacon(url: string, body: unknown) {
  try {
    if (!navigator.sendBeacon) {
      return false;
    }

    const blob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    return navigator.sendBeacon(url, blob);
  } catch {
    return false;
  }
}

export default function VisitorTracker() {
  useEffect(() => {
    const deviceId = getDeviceId();
    const sessionPayload = payload(deviceId);

    postJson("/api/visits/session", sessionPayload);

    const sendHeartbeat = () => {
      const body = payload(deviceId);
      body.referrer = "";
      postJson("/api/visits/heartbeat", body);
    };

    const sendFinalHeartbeat = () => {
      const body = payload(deviceId);
      body.referrer = "";
      if (!beacon("/api/visits/heartbeat", body)) {
        postJson("/api/visits/heartbeat", body);
      }
    };

    const interval = window.setInterval(sendHeartbeat, HEARTBEAT_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendFinalHeartbeat();
      } else {
        sendHeartbeat();
      }
    };

    window.addEventListener("beforeunload", sendFinalHeartbeat);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("beforeunload", sendFinalHeartbeat);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sendFinalHeartbeat();
    };
  }, []);

  return null;
}
