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

        {/* 🔥 HLAVIČKA */}
        <div>
          <h1 className="text-4xl font-bold">Stažení TeamFrame</h1>
          <p className="text-[#8B949E] mt-2">
            Moderní systém pro plánování směn, řízení výroby a přehled o dění na pracovišti v reálném čase.
          </p>
        </div>

        {/* 🔥 POPIS PRODUKTU */}
        <div className="text-sm text-[#8B949E] space-y-2">
          <p>
            TeamFrame propojuje server, klienta a dashboard do jednoho systému, který v reálném čase zobrazuje stav výroby,
            operátorů a jednotlivých strojů.
          </p>
          <p>
            Díky chytré logice (ShiftBrain) dokáže automaticky reagovat na výpadky, chybějící operátory nebo změny ve výrobě.
          </p>
        </div>

        {/* 🔥 DOWNLOAD BLOK */}
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

        {/* 🔥 INFO SEKCE */}
        <div className="space-y-6 text-sm text-[#8B949E]">

          <div>
            <h3 className="text-white font-semibold">⚠️ Bezpečnostní upozornění</h3>
            <p>
              Aplikace není digitálně podepsaná. Windows může při spuštění zobrazit varování.
              Jedná se o běžné chování u nových aplikací.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">🧭 Jak spustit aplikaci</h3>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Stáhni soubor <b>TeamFrameInstaller.exe</b></li>
              <li>Klikni pravým tlačítkem → <b>Spustit jako správce</b></li>
              <li>Pokud Windows zobrazí varování, klikni na <b>Další informace → Přesto spustit</b></li>
            </ol>
          </div>

          <div>
            <h3 className="text-white font-semibold">🚀 Co systém obsahuje</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>TV Dashboard pro přehled výroby</li>
              <li>Správu zaměstnanců a kvalifikací</li>
              <li>Automatické plánování směn (ShiftBrain)</li>
              <li>Online přehled o stavu strojů</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold">🧪 Stav projektu</h3>
            <p>
              Aktuální verze je beta a systém se aktivně vyvíjí.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}