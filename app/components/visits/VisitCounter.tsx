"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type VisitStats = {
  ok: boolean;
  storage: "redis" | "memory" | "disabled";
  persistent: boolean;
  totalVisits: number;
  todayVisits: number;
  uniqueDevices: number;
  returningToday: number;
  returnRate: number;
  averageDurationSeconds: number;
  todayAverageDurationSeconds: number;
};

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0 s";
  }

  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);

  if (minutes <= 0) {
    return `${rest} s`;
  }

  return `${minutes} min ${rest} s`;
}

export default function VisitCounter() {
  const [stats, setStats] = useState<VisitStats | null>(null);

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
        .catch(() => {});
    };

    load();
    const timer = window.setInterval(load, 60_000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (!stats) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-[#8B949E]">
      <Link href="/navstevnost" className="hover:text-[#00B3A4] transition">
        Návštěvy celkem: <span className="text-[#E6EDF3]">{stats.totalVisits}</span>
      </Link>
      <span>
        Dnes: <span className="text-[#E6EDF3]">{stats.todayVisits}</span>
      </span>
      <span>
        Zařízení: <span className="text-[#E6EDF3]">{stats.uniqueDevices}</span>
      </span>
      <span>
        Návraty: <span className="text-[#E6EDF3]">{stats.returnRate}%</span>
      </span>
      <span>
        Průměr dnes:{" "}
        <span className="text-[#E6EDF3]">
          {formatDuration(stats.todayAverageDurationSeconds)}
        </span>
      </span>
      {!stats.persistent && (
        <span className="rounded-full border border-[#30363D] px-2 py-0.5 text-[#F2CC60]">
          dev memory
        </span>
      )}
    </div>
  );
}
