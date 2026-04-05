"use client";

import { useEffect, useState } from "react";

export default function DownloadClient() {
  const [count, setCount] = useState(0);
  const [version, setVersion] = useState("...");
  const [size, setSize] = useState("");

  // 🔥 načtení download count
  useEffect(() => {
    fetch("https://broken-water-81ad.rendi023.workers.dev/api/download-count", {
      cache: "no-store"
    })
      .then(res => res.json())
      .then(data => setCount(Number(data.count) || 0))
      .catch(() => {});
  }, []);

  // 🔥 načtení verze
  useEffect(() => {
    fetch("https://teamframe.cz/version.json")
      .then(res => res.json())
      .then(data => setVersion(data.version || "unknown"))
      .catch(() => {});
  }, []);

  // 🔥 načtení velikosti z GitHub
  useEffect(() => {
    fetch("https://api.github.com/repos/rendilife/teamframe-web/releases/latest")
      .then(res => res.json())
      .then(data => {
        const asset = data.assets?.find((a: any) =>
          a.name.includes("Installer")
        );

        if (asset) {
          const mb = (asset.size / 1024 / 1024).toFixed(1);
          setSize(`${mb} MB`);
        }
      })
      .catch(() => {});
  }, []);

  const handleDownload = async () => {
    try {
      const res = await fetch("https://broken-water-81ad.rendi023.workers.dev/api/download", {
        method: "POST"
      });

      const data = await res.json();
      if (data.count !== undefined) {
        setCount(data.count);
      }
    } catch {}

    window.location.href =
      "https://github.com/rendilife/teamframe-web/releases/latest/download/TeamFrameInstaller.exe";
  };

  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* HLAVIČKA */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Stažení TeamFrame</h1>
          <p className="text-gray-400 max-w-xl">
            Kompletní systém pro plánování směn, řízení výroby a přehled v reálném čase.
          </p>
        </div>

        {/* DOWNLOAD BOX */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 space-y-6">

          <div>
            <h2 className="text-xl font-semibold">📦 TeamFrame Installer</h2>
            <p className="text-gray-400 text-sm">
              Client • Server • Dashboard
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition"
          >
            ⬇️ Stáhnout TeamFrame
          </button>

          <div className="text-sm text-gray-400 space-y-1">
            <p>Verze {version}</p>
            {size && <p>Velikost: {size}</p>}
            {count > 0 && <p>Staženo: {count}×</p>}
          </div>
        </div>

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-400">

          <div className="space-y-3">
            <h3 className="text-white font-semibold">⚠️ Bezpečnost</h3>
            <p>
              Aplikace je ve fázi beta a zatím není digitálně podepsaná.
              Windows může zobrazit varování – jedná se o standardní chování.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-semibold">🧭 Instalace</h3>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Stáhni TeamFrameInstaller.exe</li>
              <li>Pravým → Spustit jako správce</li>
              <li>Další informace → Přesto spustit</li>
            </ol>
          </div>

        </div>

      </div>
    </main>
  );
}