"use client";

import { useEffect, useState } from "react";

export default function DownloadClient() {
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

        <h1 className="text-4xl font-bold">Stažení TeamFrame</h1>

        <button onClick={handleDownload}>
          Stáhnout
        </button>

        <p>Staženo: {count}×</p>

      </div>
    </main>
  );
}