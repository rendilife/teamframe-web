"use client";

import { useEffect, useState } from "react";

// If you later move the Cloudflare Worker to another host, update this one origin.
// Do NOT link directly to the APK here: the Worker counts the download request.
const WORKER_ORIGIN = "https://blue-dream-9863.rendi023.workers.dev";
const DOWNLOAD_URL = `${WORKER_ORIGIN}/api/public/demo/download`;
const STATS_URL = `${WORKER_ORIGIN}/api/public/demo/stats`;

export default function GlyphFlowDemoDownload({ lang }: { lang: "cs" | "en" }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch(STATS_URL, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Demo counter unavailable");
        return response.json();
      })
      .then((data) => {
        if (active && Number.isFinite(data?.downloads) && data.downloads >= 0) {
          setCount(data.downloads);
        }
      })
      .catch(() => {}); // An unavailable counter must not break the download button.
    return () => { active = false; };
  }, []);

  const cs = lang === "cs";
  return (
    <div className="rounded-2xl border border-[#2b5556] bg-[#081a20] p-6 text-center">
      <div className="text-xs font-bold tracking-[.16em] text-[#7ce9dc]">GlyphFlow DEMO · APK</div>
      <p className="mt-3 text-sm text-[#bdd4d3]">{cs ? "Android · instalace mimo Google Play" : "Android · install outside Google Play"}</p>
      <a
        href={DOWNLOAD_URL}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#53eddc] px-5 py-3 font-bold text-[#05201d] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {cs ? "⬇ Stáhnout DEMO APK" : "⬇ Download DEMO APK"}
      </a>
      {count !== null && (
        <p className="mt-3 text-xs text-[#99c4c1]" aria-live="polite">
          {cs ? "Stažení (jedinečná za 24 h): " : "Downloads (unique per 24 h): "}{count.toLocaleString(cs ? "cs-CZ" : "en-US")}
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-[#91aeb0]">
        {cs
          ? "Instaluj jen z oficiálního webu. Glyph Matrix je určen pro kompatibilní Nothing Phone; DEMO nepovoluje placené funkce."
          : "Install only from the official site. Glyph Matrix requires a compatible Nothing Phone; premium features stay locked."}
      </p>
    </div>
  );
}
