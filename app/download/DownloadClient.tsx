"use client";

import { useEffect, useState } from "react";

const DEFAULT_INSTALLER_URL =
  "https://github.com/rendilife/teamframe-web/releases/latest/download/TeamFrameInstaller.exe";

type GitHubAsset = {
  name: string;
  size: number;
};

type GitHubRelease = {
  assets?: GitHubAsset[];
};

export default function DownloadClient() {
  const [count, setCount] = useState(0);
  const [version, setVersion] = useState("");
  const [size, setSize] = useState("");
  const [installerUrl, setInstallerUrl] = useState(DEFAULT_INSTALLER_URL);

  // 🔥 COUNT
  useEffect(() => {
    fetch("https://broken-water-81ad.rendi023.workers.dev/api/download-count", {
      cache: "no-store"
    })
      .then(res => res.json())
      .then(data => setCount(Number(data.count) || 0))
      .catch(() => {});
  }, []);

  // 🔥 VERZE
  useEffect(() => {
    fetch("/version.json")
      .then(res => res.json())
      .then(data => {
        setVersion(data.client || "");
        setInstallerUrl(data.installer_url || DEFAULT_INSTALLER_URL);
      })
      .catch(() => {});
  }, []);

  // 🔥 SIZE
  useEffect(() => {
    fetch("https://api.github.com/repos/rendilife/teamframe-web/releases/latest")
      .then(res => res.json())
      .then((data: GitHubRelease) => {
        const asset = data.assets?.find((a) =>
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

    window.location.href = installerUrl;
  };

  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* HLAVIČKA */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Stažení TeamFrame</h1>
          <p className="text-gray-400">
            Moderní systém pro plánování směn, řízení výroby a přehled v reálném čase.
          </p>
        </div>

        {/* DOWNLOAD BOX */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 space-y-4">

          <h2 className="text-xl font-semibold">📦 TeamFrame Installer</h2>

          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            ⬇️ Stáhnout TeamFrame
          </button>

          {/* 🔥 INFO (TADY JE TVŮJ COUNT ZPÁTKY) */}
          <div className="text-sm text-gray-400 space-y-1">
            {version && <p>Verze {version}</p>}
            {size && <p>Velikost: {size}</p>}
            <p>Staženo: {count}×</p>
          </div>
        </div>

        {/* POPIS – BEZ PŘEKOPÁNÍ */}
        <div className="space-y-4 text-sm text-gray-400">

        <div>
          <h3 className="text-white font-semibold">⚠️ Bezpečnost</h3>
          <p className="text-gray-400">
            Aplikace je ve fázi beta. Windows může při prvním spuštění zobrazit upozornění,
            což je u nových aplikací běžné.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold">📘 O systému</h3>
          <p className="text-gray-400">
            TeamFrame je systém pro plánování směn a řízení výroby,
            který poskytuje okamžitý přehled o stavu pracovišť, zaměstnanců a procesů.
          </p>
          <p className="text-gray-400">
            Umožňuje rychle reagovat na změny ve výrobě a zjednodušuje každodenní řízení provozu.
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




{/* 🚀 OFFICIAL CHANGELOG */}
<div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 space-y-4">

  <div className="flex items-center justify-between flex-wrap gap-2">
    <h2 className="text-xl font-semibold">
      🚀 TeamFrame 1.6.7
    </h2>

    <span className="text-sm text-gray-500">
      Vydáno: 20.05.2026
    </span>
  </div>

  <div className="space-y-6 text-sm text-gray-300">

    {/* ✨ Přidáno */}
    <div>
      <h3 className="text-white font-semibold mb-2">
        ✨ Přidáno
      </h3>

      <ul className="list-disc ml-5 space-y-1">
        <li>WEB dashboard nově načítá avatary zaměstnanců přes bezpečný šifrovaný backend endpoint.</li>
        <li>Start logika serveru nově automaticky rozlišuje DEV běh z Python zdrojáků a PROD Nuitka EXE build.</li>
        <li>Přidána příprava infrastruktury pro budoucí PLC komunikaci a průmyslové napojení zařízení.</li>
        <li>Rozšířen základ WEB architektury pro budoucí realtime průmyslové dashboardy a stavové vstupy.</li>
      </ul>
    </div>

    {/* 🛠️ Opraveno */}
    <div>
      <h3 className="text-white font-semibold mb-2">
        🛠️ Opraveno
      </h3>

      <ul className="list-disc ml-5 space-y-1">
        <li>WEB dashboard hodiny nyní běží po vteřinách nezávisle na polling refreshi.</li>
        <li>WEB launcher nyní spouští server_web.py v DEV režimu a server_web.exe v PROD režimu.</li>
        <li>Changelog pending queue nově zachovává nevydané změny až do ostrého release publish buildu.</li>
        <li>Changelog a release notes nyní používají české kategorie, české texty a UTF-8 bezpečné ikonky.</li>
        <li>Opravena release logika pro správné rozlišení preview buildu a ostrého publish release režimu.</li>
      </ul>
    </div>

    {/* ⚡ Optimalizováno */}
    <div>
      <h3 className="text-white font-semibold mb-2">
        ⚡ Optimalizováno
      </h3>

      <ul className="list-disc ml-5 space-y-1">
        <li>Dashboard refresh manager omezuje duplicitní intervaly a pozastavuje polling, když je stránka skrytá.</li>
        <li>Machine cards a mobilní dashboard byly zkompaktněny pro TV obrazovky a mobilní zařízení.</li>
        <li>Optimalizováno generování changelog preview a release notes pro rychlejší release workflow.</li>
        <li>Vylepšena kompatibilita release buildů s Nuitka EXE prostředím a balením cryptography modulů.</li>
      </ul>
    </div>

    {/* 🔧 PLC / Výroba */}
    <div>
      <h3 className="text-white font-semibold mb-2">
        🔧 PLC / Výroba
      </h3>

      <ul className="list-disc ml-5 space-y-1">
        <li>Připraven základ pro budoucí komunikaci s PLC systémy a průmyslovými zařízeními.</li>
        <li>TeamFrame architektura byla upravena s důrazem na budoucí sběr stavů strojů a výrobních signálů.</li>
        <li>Probíhá příprava infrastruktury pro průmyslové napojení výrobních linek a realtime monitoring.</li>
      </ul>
    </div>

  </div>
</div>











        </div>

      </div>
      
      
      
      
      
      
      
      
      

    </main>
  );
}
