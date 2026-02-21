"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./components/Reveal";

type Shot = {
  id: string;
  title: string;
  subtitle: string;
  src: string;
};

export default function Home() {
  const shots: Shot[] = useMemo(
    () => [
      {
        id: "tv",
        title: "TeamFrame Dashboard (TV režim)",
        subtitle: "Zobrazovací vrstva pro halu • ACTIVE / NEXT pohledy",
        src: "/images/tv_dashboard.png",
      },
      {
        id: "machines",
        title: "Přehled strojů a provozních stavů",
        subtitle: "Priority • stavy • rychlá orientace pro směnu",
        src: "/images/machines_status_dashboard.png",
      },
      {
        id: "references",
        title: "Reference a kvalifikace",
        subtitle: "Proškolení • kritické reference • přehled dle strojů",
        src: "/images/reference_dashboard.png",
      },
      {
        id: "graphs",
        title: "Grafy incidentů a prostojů",
        subtitle: "Souhrny • trendy • měsíční agregace",
        src: "/images/graphs_dashboard.png",
      },
      {
        id: "server",
        title: "Server Launcher",
        subtitle: "Řízení služeb • dohled procesů • restart logika",
        src: "/images/server-launcher1.png",
      },
      {
        id: "server2",
        title: "Server Launcher (detail)",
        subtitle: "Logy • stav • kontrolní panely",
        src: "/images/server-launcher2.png",
      },
      {
        id: "master",
        title: "Master Manager",
        subtitle: "Oprávnění • RFID/PIN • správa administrace",
        src: "/images/master-manager.png",
      },
      {
        id: "minidock",
        title: "Mini Dock",
        subtitle: "Rychlý přístup k modulům • přehled bez přepínání oken",
        src: "/images/mini-dock.png",
      },
      {
        id: "tasks",
        title: "Task Panel",
        subtitle: "Úkoly podle oddělení • stav řešení • provozní komunikace",
        src: "/images/task_panel.png",
      },
      {
        id: "network",
        title: "Network Manager",
        subtitle: "Nastavení interní komunikace • server IP • dostupnost služeb",
        src: "/images/network-manager.png",
      },
      {
        id: "security",
        title: "Security Overlay",
        subtitle: "Centrální ověřování • uzamčení UI • kontrola přístupu",
        src: "/images/security-overlay.png",
      },
      {
        id: "license",
        title: "Licenční systém",
        subtitle: "HWID • šifrované licence • DEV/PROD režim",
        src: "/images/license-system.png",
      },
    ],
    []
  );

  const [lightbox, setLightbox] = useState<Shot | null>(null);

  // ESC zavře lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (shotId: string) => {
    const s = shots.find((x) => x.id === shotId);
    if (s) setLightbox(s);
  };

  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3]">
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 border-b border-[#161B22] bg-[#0E1117]/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-wide">
            Team<span className="text-[#00B3A4]">Frame</span>
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-[#8B949E]">
            <a className="hover:text-white transition" href="#overview">
              Přehled
            </a>
            <a className="hover:text-white transition" href="#architecture">
              Architektura
            </a>
            <a className="hover:text-white transition" href="#modules">
              Moduly
            </a>
            <a className="hover:text-white transition" href="#security">
              Bezpečnost
            </a>
            <a className="hover:text-white transition" href="#license">
              Licence
            </a>
            <a className="hover:text-white transition" href="#contact">
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pt-20 pb-24" id="overview">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#161B22] bg-gradient-to-b from-[#0F1622] to-[#0E1117] p-10 md:p-14 shadow-2xl shadow-[#00B3A4]/5">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                  Team<span className="text-[#00B3A4]">Frame</span>
                </h1>

                <p className="text-lg text-[#8B949E] leading-relaxed">
                  TeamFrame je modulární systém pro plánování směn, řízení strojů,
                  práci s kvalifikacemi zaměstnanců a evidenci incidentů včetně výpočtů trvání
                  a agregací prostojů.
                </p>

                <p className="text-lg text-[#8B949E] leading-relaxed">
                  Nasazení cílí na interní firemní prostředí. Provoz je postavený na klientovi,
                  serverové části a samostatném dashboardu určeném pro velké obrazovky.
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-[#8B949E]">
                  <Badge>8h / 12h režimy</Badge>
                  <Badge>ACTIVE / NEXT</Badge>
                  <Badge>Incident log</Badge>
                  <Badge>Kvalifikace</Badge>
                  <Badge>Interní server</Badge>
                  <Badge>Šifrovaná data</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <ShotCard
                  title="TV Dashboard"
                  subtitle="Kliknutím otevřeš náhled ve fullscreenu"
                  src="/images/tv_dashboard.png"
                  onClick={() => open("tv")}
                />
                <p className="text-xs text-[#6B7280]">
                  Tip: klik na libovolný obrázek na stránce otevře full-screen náhled. Zavřeš křížkem nebo ESC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <Reveal>
        <section id="architecture" className="px-6 py-20 border-t border-[#161B22]">
          <div className="mx-auto max-w-7xl space-y-14">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Architektura systému
              </h2>
              <p className="text-[#8B949E] text-lg leading-relaxed max-w-4xl">
                TeamFrame je rozdělen do tří částí. Klient zajišťuje řízení lidí, strojů, referencí a úkolů.
                Server drží centrální konzistenci dat, připravuje podklady pro dashboardy a zpracovává incidenty.
                Dashboard je zobrazovací vrstva optimalizovaná pro velké obrazovky.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <InfoCard
                title="TeamFrame Client"
                points={[
                  "Řízení lidí, strojů, referencí, úkolů",
                  "Plánování směn (8h / 12h)",
                  "Ruční i řízené přiřazování",
                ]}
              />
              <InfoCard
                title="TeamFrame Server"
                points={[
                  "Centrální logika a konzistence dat",
                  "Příprava dat pro dashboardy",
                  "Incident logika a výpočty trvání",
                ]}
              />
              <InfoCard
                title="TeamFrame Dashboard"
                points={[
                  "Full-screen režim pro halu",
                  "ACTIVE / NEXT pohledy",
                  "Stránkování dle strojů a oddělení",
                ]}
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* MODULES */}
      <section id="modules" className="px-6 py-20 border-t border-[#161B22]">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">Moduly a funkce</h2>
            <p className="text-[#8B949E] text-lg leading-relaxed max-w-4xl">
              Níže je přehled klíčových částí systému. Každá sekce obsahuje krátký technický popis, účel v provozu
              a náhled reálného rozhraní. Text je psaný věcně, bez marketingových frází.
            </p>
          </div>

          {/* 1: Planning */}
          <Reveal>
            <TwoCol
              title="Plánování směn (8h / 12h)"
              intro="Směnová logika podporuje odlišné režimy provozu bez jejich míchání. V přehledu je možné rychle ověřit aktuální i následující směnu, přiřazení zaměstnanců a vazby na pracoviště."
              bullets={[
                "Podpora 8h i 12h režimu",
                "Vizualizace aktuální a následující směny",
                "Rychlá kontrola přiřazení a kapacit",
                "Oddělené režimy plánování a zobrazení",
              ]}
              shot={shots.find((s) => s.id === "tv")!}
              onOpen={() => open("tv")}
              reverse={false}
            />
          </Reveal>

          {/* 2: Machines */}



        <Reveal>
          <TwoCol
            title="Reálný incident – dlouhodobý prostoj"
            intro="Dashboard počítá prostoj na základě reálného času od změny stavu. Incident zůstává aktivní i po restartu aplikace a pokračuje ve výpočtu bez ohledu na otevření modulu."
            bullets={[
              "Výpočet trvání od okamžiku změny stavu",
              "Perzistence i po restartu dashboardu",
              "Zobrazení v ACTIVE pohledu",
              "Podklad pro měsíční agregace",
            ]}
            shot={shots.find((s) => s.id === "incident7h")!}
            onOpen={() => open("incident7h")}
            reverse={false}
          />
        </Reveal>

          <Reveal>
            <TwoCol
              title="Stroje, priority a provozní stavy"
              intro="Modul strojů drží přehled priorit, aktivních referencí a provozních stavů. Změny stavu se promítají do incidentů, což umožní následnou statistiku prostojů."
              bullets={[
                "Stavy: v provozu / údržba / plánovaná odstávka / mimo provoz",
                "Prioritizace a rychlý přehled pro směnu",
                "Změny stavů jako incidentní záznamy",
                "Podklad pro grafy a měsíční agregace",
              ]}
              shot={shots.find((s) => s.id === "machines")!}
              onOpen={() => open("machines")}
              reverse={true}
            />
          </Reveal>

          {/* 3: References */}
          <Reveal>
            <TwoCol
              title="Reference a kvalifikace"
              intro="Každý zaměstnanec má evidované reference. Stav školení je vizualizovaný v přehledu i na dashboardu, včetně identifikace kritických referencí s nízkým počtem kvalifikovaných lidí."
              bullets={[
                "Stavy: bez školení / školení / zaškolen",
                "Přehled kvalifikací po strojích",
                "Identifikace kritických referencí",
                "Podklad pro proškolenostní grafy",
              ]}
              shot={shots.find((s) => s.id === "references")!}
              onOpen={() => open("references")}
              reverse={false}
            />
          </Reveal>

          {/* 4: Graphs */}
          <Reveal>
            <TwoCol
              title="Incident log a prostoje (grafy)"
              intro="Každá změna provozního stavu stroje je incidentní záznam. Incident drží historii změn a výpočet trvání. Data lze agregovat do měsíčních statistik a trendů."
              bullets={[
                "Samostatný incidentní záznam pro každou událost",
                "Historie změn stavů v rámci incidentu",
                "Výpočet trvání (sekundy/minuty) a souhrny",
                "Měsíční agregace a trendy na dashboardu",
              ]}
              shot={shots.find((s) => s.id === "graphs")!}
              onOpen={() => open("graphs")}
              reverse={true}
            />
          </Reveal>

          {/* 5: Task Panel */}
          <Reveal>
            <TwoCol
              title="Task Panel (úkoly)"
              intro="Úkoly jsou vedené po odděleních a slouží jako provozní komunikační vrstva. Modul podporuje zadání, průběžný stav a uzavření úkolu, včetně rychlé orientace ve frontě práce."
              bullets={[
                "Úkoly podle oddělení",
                "Stav řešení a rychlá orientace",
                "Přehled bez otevírání více oken",
                "Vazba na provozní situaci směny",
              ]}
              shot={shots.find((s) => s.id === "tasks")!}
              onOpen={() => open("tasks")}
              reverse={false}
            />
          </Reveal>

          {/* 6: Mini Dock */}
          <Reveal>
            <TwoCol
              title="Mini Dock (rychlé ovládání)"
              intro="Mini Dock slouží jako rychlá ovládací lišta. Umožní přístup k modulům a přehled bez nutnosti práce s více samostatnými okny."
              bullets={[
                "Rychlý přístup k modulům",
                "Provozní přehled v minimálním prostoru",
                "Omezení přepínání kontextu během směny",
              ]}
              shot={shots.find((s) => s.id === "minidock")!}
              onOpen={() => open("minidock")}
              reverse={true}
            />
          </Reveal>

          {/* 7: Server Launcher */}
          <Reveal>
            <TwoCol
              title="Server Launcher (správa backendu)"
              intro="Server Launcher je samostatné serverové GUI pro řízení služeb. Zajišťuje dohled, logy, restart logiku a operativní kontrolu běžících procesů."
              bullets={[
                "Řízení API a webové služby",
                "Dohled nad procesy a stavem",
                "Logy a restart logika při výpadku",
                "Určeno pro interní server podniku",
              ]}
              shot={shots.find((s) => s.id === "server")!}
              onOpen={() => open("server")}
              reverse={false}
              extraShot={
                shots.find((s) => s.id === "server2") ?? null
              }
              onOpenExtra={() => open("server2")}
            />
          </Reveal>

          {/* 8: Network */}
          <Reveal>
            <TwoCol
              title="Network Manager (interní infrastruktura)"
              intro="Síťový modul drží konfiguraci připojení klienta k serveru a kontrolu dostupnosti služeb. Cílem je stabilní provoz v interní síti bez závislosti na externích službách."
              bullets={[
                "Nastavení IP/portů a serverových cest",
                "Kontrola dostupnosti serveru",
                "Určeno pro interní firemní síť",
              ]}
              shot={shots.find((s) => s.id === "network")!}
              onOpen={() => open("network")}
              reverse={true}
            />
          </Reveal>

          {/* 9: Security */}
          <Reveal>
            <section id="security" className="rounded-2xl border border-[#161B22] bg-[#0B0F14] p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold">Bezpečnost a data</h3>
                  <p className="text-[#8B949E] leading-relaxed">
                    Systém pracuje s přístupovými právy a šifrovaným ukládáním citlivých dat.
                    Přístup může být řízený rolemi a odděleními. Veškeré provozní informace zůstávají pod kontrolou firmy.
                  </p>
                  <ul className="text-[#8B949E] space-y-2">
                    <li>• Šifrované ukládání citlivých dat</li>
                    <li>• Role a přístupová oprávnění</li>
                    <li>• Uzamčení UI přes bezpečnostní overlay</li>
                    <li>• Provoz v interním firemním prostředí</li>
                  </ul>
                </div>

                <ShotCard
                  title={shots.find((s) => s.id === "security")!.title}
                  subtitle={shots.find((s) => s.id === "security")!.subtitle}
                  src={shots.find((s) => s.id === "security")!.src}
                  onClick={() => open("security")}
                />
              </div>
            </section>
          </Reveal>

          {/* 10: License */}
          <Reveal>
            <section id="license" className="rounded-2xl border border-[#161B22] bg-[#11151C] p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <ShotCard
                  title={shots.find((s) => s.id === "license")!.title}
                  subtitle={shots.find((s) => s.id === "license")!.subtitle}
                  src={shots.find((s) => s.id === "license")!.src}
                  onClick={() => open("license")}
                />

                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold">Licenční vrstva</h3>
                  <p className="text-[#8B949E] leading-relaxed">
                    Licencování je navržené s ohledem na produkční nasazení. Součástí je vazba na HWID,
                    šifrované soubory a oddělení vývojového a produkčního režimu.
                  </p>
                  <ul className="text-[#8B949E] space-y-2">
                    <li>• HWID vazba</li>
                    <li>• Šifrované licenční soubory</li>
                    <li>• DEV/PROD režim dle pravidel distribuce</li>
                    <li>• Kontrola platnosti a zobrazení stavu</li>
                  </ul>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-16 border-t border-[#161B22]">
        <div className="mx-auto max-w-7xl text-center space-y-3">
          <div className="text-sm text-[#8B949E]">Kontakt</div>
          <a
            className="text-[#00B3A4] hover:underline text-lg"
            href="mailto:teamframedev@gmail.com"
          >
            teamframedev@gmail.com
          </a>
          <div className="text-xs text-[#6B7280]">
            Prezentace systému a testovací verze dle domluvy.
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-xs text-[#6B7280]">
        © {new Date().getFullYear()} TeamFrame
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setLightbox(null)} />
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
            <div className="flex items-start justify-between gap-6 mb-4">
              <div>
                <div className="text-xl font-semibold">{lightbox.title}</div>
                <div className="text-sm text-[#8B949E]">{lightbox.subtitle}</div>
              </div>
              <button
                className="h-10 w-10 rounded-full border border-[#30363D] text-white hover:bg-white/10 transition"
                onClick={() => setLightbox(null)}
                aria-label="Zavřít"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#1F242C] shadow-2xl shadow-[#00B3A4]/10 bg-black">
              <img src={lightbox.src} alt={lightbox.title} className="w-full" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-[#1F242C] bg-[#0B0F14] px-3 py-1">
      {children}
    </span>
  );
}

function InfoCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-2xl border border-[#161B22] bg-[#0B0F14] p-8 shadow-xl shadow-[#00B3A4]/5">
      <div className="text-lg font-semibold mb-4">{title}</div>
      <ul className="text-[#8B949E] space-y-2 text-sm leading-relaxed">
        {points.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>
    </div>
  );
}

function ShotCard({
  title,
  subtitle,
  src,
  onClick,
}: {
  title: string;
  subtitle: string;
  src: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl overflow-hidden border border-[#1F242C] bg-[#0B0F14] shadow-xl shadow-[#00B3A4]/10 hover:shadow-2xl hover:shadow-[#00B3A4]/15 transition"
    >
      <div className="relative">
        <img src={src} alt={title} className="w-full object-cover" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-[#8B949E]">{subtitle}</div>
      </div>
    </button>
  );
}

function TwoCol({
  title,
  intro,
  bullets,
  shot,
  onOpen,
  reverse,
  extraShot,
  onOpenExtra,
}: {
  title: string;
  intro: string;
  bullets: string[];
  shot: Shot;
  onOpen: () => void;
  reverse: boolean;
  extraShot?: Shot | null;
  onOpenExtra?: () => void;
}) {
  const Text = (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="text-[#8B949E] leading-relaxed">{intro}</p>
      <ul className="text-[#8B949E] space-y-2 leading-relaxed">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </div>
  );

  const Image = (
    <div className="space-y-6">
      <ShotCard title={shot.title} subtitle={shot.subtitle} src={shot.src} onClick={onOpen} />
      {extraShot && onOpenExtra && (
        <ShotCard title={extraShot.title} subtitle={extraShot.subtitle} src={extraShot.src} onClick={onOpenExtra} />
      )}
    </div>
  );

  return (
    <section className="rounded-2xl border border-[#161B22] bg-[#0B0F14] p-10 md:p-14">
      <div className={`grid md:grid-cols-2 gap-16 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        {Text}
        {Image}
      </div>
    </section>
  );
}