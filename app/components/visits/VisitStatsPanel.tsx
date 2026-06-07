"use client";

import { useEffect, useState } from "react";

type VisitStats = {
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

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0 s";
  }

  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);

  if (minutes < 60) {
    return `${minutes} min ${rest} s`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours} h ${minutes % 60} min`;
}

function formatDate(date: string) {
  const parts = date.split("-");
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  return date;
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-[#8B949E]">{label}</div>
      <div className="mt-3 text-3xl font-bold text-[#E6EDF3]">{value}</div>
      <div className="mt-2 text-sm text-[#8B949E]">{hint}</div>
    </div>
  );
}

export default function VisitStatsPanel() {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = () => {
      fetch("/api/visits/stats", { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : null))
        .then((data: VisitStats | null) => {
          if (active && data?.ok) {
            setStats(data);
          }
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        })
        .catch(() => {
          if (active) {
            setLoading(false);
          }
        });
    };

    load();
    const timer = window.setInterval(load, 30_000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-6 text-[#8B949E]">
        Načítám návštěvnost...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-6 text-[#F2CC60]">
        Návštěvnost zatím není dostupná.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Celkem"
          value={stats.totalVisits}
          hint="Počet unikátních zařízení započítaných jednou denně."
        />
        <StatCard
          label="Dnes"
          value={stats.todayVisits}
          hint={`Aktuální den: ${formatDate(stats.date)}`}
        />
        <StatCard
          label="Návraty"
          value={`${stats.returnRate}%`}
          hint={`${stats.returningToday} dnešních návštěv je z vracejících se zařízení.`}
        />
        <StatCard
          label="Délka"
          value={formatDuration(stats.todayAverageDurationSeconds)}
          hint="Průměrná délka dnešní návštěvy podle heartbeat signálu."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-5">
          <div className="text-sm text-[#8B949E]">Unikátní zařízení celkem</div>
          <div className="mt-2 text-2xl font-semibold">{stats.uniqueDevices}</div>
        </div>
        <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-5">
          <div className="text-sm text-[#8B949E]">Průměrná délka celkem</div>
          <div className="mt-2 text-2xl font-semibold">
            {formatDuration(stats.averageDurationSeconds)}
          </div>
        </div>
        <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-5">
          <div className="text-sm text-[#8B949E]">Úložiště</div>
          <div className="mt-2 text-2xl font-semibold">
            {stats.storage === "worker"
              ? "Cloudflare Worker KV"
              : stats.storage === "redis"
                ? "Vercel KV / Upstash"
                : "Dočasná paměť"}
          </div>
        </div>
      </div>

      {!stats.persistent && (
        <div className="rounded-xl border border-[#5D4A1F] bg-[#16120A] p-5 text-sm text-[#F2CC60]">
          Počítadlo běží jen v dočasné paměti. Zkontroluj nasazení Cloudflare Workeru
          nebo nastav env proměnné pro Vercel KV / Upstash.
        </div>
      )}

      <div className="text-xs text-[#6B7280]">
        Poslední aktualizace: {new Date(stats.updatedAt).toLocaleString("cs-CZ")}
      </div>
    </div>
  );
}
