"use client";

import { useEffect, useState } from "react";

export default function DownloadClient() {
  const [count, setCount] = useState(0);
  const [version, setVersion] = useState("");
  const [size, setSize] = useState("");

  // 🔥 COUNT
  useEffect(() => {
    fetch("https://broken-water-81ad.rendi023.workers.dev/api/download-count", {
      cache: "no-store"
    })
      .then(res => res.json())
      .then(data => setCount(Number(data.count) || 0))
      .catch(() => {});
  }, []);

  // 🔥 VERZE (z public/version.json)
  useEffect(() => {
    fetch("/version.json")
      .then(res => res.json())
      .then(data => {
        setVersion(data.client || "1.0.0");
      })
      .catch(() => {});
  }, []);

  // 🔥 SIZE (GitHub)
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
      <div className="max-w-4xl mx-auto space-y-10">

        {/* HLAVIČKA */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Stažení TeamFrame</h1>
          <p className="text-gray-400">
            Kompletní systém pro plánování směn, řízení výroby a přehled v reálném čase.
          </p>
        </div>

        {/* DOWNLOAD BOX */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 space-y-4">

          <h2 className="text-xl font-semibold">📦 Installer</h2>

          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            ⬇️ Stáhnout TeamFrame
          </button>

          <div className="text-sm text-gray-400 space-y-1">
            {version && <p>Verze {version}</p>}
            {size && <p>Velikost: {size}</p>}
            {count > 0 && <p>Staženo: {count}×</p>}
          </div>
        </div>

        {/* POPIS */}
        <div className="space-y-4 text-sm text-gray-400">

          <div>
            <h3 className="text-white font-semibold">⚠️ Bezpečnost</h3>
            <p>
              Aplikace není zatím digitálně podepsaná. Windows může zobrazit varování.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">🧭 Instalace</h3>
            <ol className="list-decimal ml-5">
              <li>Stáhni TeamFrameInstaller.exe</li>
              <li>Pravým → Spustit jako správce</li>
              <li>Další informace → Přesto spustit</li>
            </ol>
          </div>

          <div>
            <h3 className="text-white font-semibold">🚀 Funkce</h3>
            <ul className="list-disc ml-5">
              <li>Dashboard výroby</li>
              <li>Správa zaměstnanců</li>
              <li>ShiftBrain plánování</li>
              <li>Stavy strojů v reálném čase</li>
            </ul>
          </div>

        </div>

      </div>
    </main>
  );
}