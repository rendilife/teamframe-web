"use client";

export default function DownloadClient() {

  const handleDownload = () => {
    window.location.href =
      "https://github.com/rendilife/teamframe-web/releases/latest/download/TeamFrameInstaller.exe";
  };

  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-14">

        {/* HLAVIČKA */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Stažení TeamFrame</h1>
          <p className="text-gray-400 max-w-xl">
            Systém pro plánování směn a řízení výroby v reálném čase.
          </p>
        </div>

        {/* DOWNLOAD */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-10 text-center space-y-6">

          <h2 className="text-xl font-semibold">
            📦 TeamFrame Installer
          </h2>

          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-semibold text-lg transition"
          >
            ⬇️ Stáhnout zdarma
          </button>

          <p className="text-xs text-gray-500">
            Windows Installer (.exe)
          </p>

        </div>

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-10 text-sm text-gray-400">

          <div>
            <h3 className="text-white font-semibold mb-2">⚠️ Bezpečnost</h3>
            <p>
              Aplikace je ve fázi beta a zatím není digitálně podepsaná.
              Windows může zobrazit varování – jedná se o běžné chování.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">🧭 Instalace</h3>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Stáhni instalační soubor</li>
              <li>Spusť jako správce</li>
              <li>Potvrď „Přesto spustit“</li>
            </ol>
          </div>

        </div>

      </div>
    </main>
  );
}