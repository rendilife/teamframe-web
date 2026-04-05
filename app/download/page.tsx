"use client";

import { useEffect, useState } from "react";

export default function Download() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://broken-water-81ad.rendi023.workers.dev/api/download-count")
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => {});
  }, []);

  const handleDownload = async () => {
    try {
      await fetch("https://broken-water-81ad.rendi023.workers.dev/api/download", {
        method: "POST"
      });
    } catch {}

    window.location.href =
      "https://github.com/rendilife/teamframe-web/releases/download/v1.5.6/TeamFrameInstaller.exe";
  };

  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-12">

        <div>
          <h1 className="text-4xl font-bold">Stažení TeamFrame</h1>
          <p className="text-[#8B949E] mt-2">
            Moderní systém pro plánování směn a řízení výroby v reálném čase.
          </p>
        </div>

        <div className="bg-[#161B22] p-6 rounded-2xl border border-[#30363D] space-y-6">

          <div>
            <h2 className="text-xl font-semibold">📦 TeamFrame Installer</h2>
            <p className="text-[#8B949E] text-sm">
              Kompletní instalátor obsahující Client, Server a Dashboard.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            ⬇️ Stáhnout instalátor
          </button>

          <p className="text-sm text-[#8B949E]">
            Staženo: {count}×
          </p>

        </div>

        <div className="space-y-4 text-sm text-[#8B949E]">

          <div>
            <h3 className="text-white font-semibold">⚠️ Bezpečnostní upozornění</h3>
            <p>
              Aplikace není digitálně podepsaná. Windows může zobrazit varování.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">🧭 Jak spustit aplikaci</h3>
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