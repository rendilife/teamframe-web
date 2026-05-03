"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "@/app/components/Reveal";





const sections = [
  "overview",
  "architecture",
  "usecases",
  "modules",
  "security",
  "license",
  "docs",
];

  function SectionSpy() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}





























type Shot = {
  id: string;
  title: string;
  subtitle: string;
  src: string;
};

export default function Home() {



  SectionSpy();

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


    {
      id: "incident7h",
      title: "Reálný incident – dlouhodobý prostoj",
      subtitle: "Trvání v reálném čase • perzistence po restartu",
      src: "/images/incident7h.png",
    },


    {
      id: "incident_dashboard",
      title: "Incident Dashboard",
      subtitle: "Živý feed incidentů • směna / den / týden / měsíc • stránkování",
      src: "/images/incident_dashboard.png",
    },









    {
      id: "employee_manager",
      title: "Employee Manager",
      subtitle: "Správa zaměstnanců • směny • reference • stav",
      src: "/images/employee_manager.png",
    },
    {
      id: "machine_manager",
      title: "Machine Manager",
      subtitle: "Správa pracovišť • konfigurace • vazby",
      src: "/images/machine_manager.png",
    },
    {
      id: "reference_manager",
      title: "Reference Manager",
      subtitle: "Definice referencí • vazby na stroje",
      src: "/images/reference_manager.png",
    },
    {
      id: "qualification_detail",
      title: "Detail kvalifikací zaměstnanců",
      subtitle: "Barevné rozlišení stavu školení",
      src: "/images/kvalifikace_zaměstnanců.png",
    },
    {
      id: "schedule_pattern",
      title: "Směnový pattern",
      subtitle: "Definice rotační logiky 8h / 12h",
      src: "/images/schedule_patern.png",
    },
    {
      id: "incident_count_graph",
      title: "Graf počtu incidentů",
      subtitle: "Statistické vyhodnocení událostí",
      src: "/images/počet_incidentů_v_grafu.png",
    },

    {
      id: "master_manager",
      title: "Master panel – správa mistrů / adminů",
      subtitle: "Role • oddělení • skupiny • šifrované účty",
      src: "/images/master-manager.png",
    },






    {
      id: "planned_changeovers",
      title: "Plánované přehozy",
      subtitle: "Přehled naplánovaných změn referencí",
      src: "/images/planovane_prehozy.png",
    },
    {
      id: "finished_changeovers",
      title: "Hotové přehozy",
      subtitle: "Historie dokončených přehozů",
      src: "/images/hotove_prehozy.png",
    },
    {
      id: "changeover_dialog",
      title: "Naplánování přehozu",
      subtitle: "Dialog pro zadání plánovaného přehozu",
      src: "/images/dialog_naplanovat.png",
    },
    {
      id: "changeover_start",
      title: "Zahájení přehozu",
      subtitle: "Potvrzení zahájení práce na přehozu",
      src: "/images/start_přehozu.png",
    },
    {
      id: "changeover_status",
      title: "Stav přehozu",
      subtitle: "Průběh a aktuální stav operace",
      src: "/images/status_prehozu.png",
    },
    {
      id: "changeover_reason",
      title: "Důvod zpoždění",
      subtitle: "Evidence důvodu prodloužení přehozu",
      src: "/images/důvod_zpoždění.png",
    },
    {
      id: "changeover_tv",
      title: "Přehozy na TV Dashboardu",
      subtitle: "Vizualizace plánovaných změn na hale",
      src: "/images/tv_dashoboard_prehoz.png",
    },
    {
      id: "machine_next_ref",
      title: "Next reference ve strojích",
      subtitle: "Příprava další výroby přímo ve správě strojů",
      src: "/images/vylepseny_machine_manager_next_ref.png",
    },
    {
      id: "changeover_statusbar",
      title: "Status bar přehozů",
      subtitle: "Rychlá informace o plánovaných změnách",
      src: "/images/statusbar_tv_dashboard.png",
    },
    {
      id: "changeover_finish",
      title: "Potvrzení dokončení",
      subtitle: "Dialog uzavření přehozu",
      src: "/images/dialog_potvrzení_hotovo.png",
    },




{
  id: "changeover_audit",
  title: "Auditní panel přehozů",
  subtitle: "Kontrola historie operací • detail záznamu přehozu",
  src: "/images/auditni_zona_pro_mistra.png",
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
<main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] pt-16">









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
                      TeamFrame je modulární systém pro řízení výrobního provozu. Umožňuje plánování směn,
                      správu strojů, práci s kvalifikacemi zaměstnanců a evidenci incidentů včetně analýzy
                      prostojů a jejich trvání.
                    </p>

                    <p className="text-lg text-[#8B949E] leading-relaxed">
                      Systém je navržen pro interní firemní prostředí a je postaven na třech hlavních částech:
                      desktopovém klientovi pro správu dat, serverové části zajišťující logiku a ukládání dat
                      a samostatném dashboardu určeném pro velké obrazovky ve výrobě.
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
                Součásti systému
              </h2>
              <p className="text-[#8B949E] text-lg leading-relaxed max-w-4xl">
                    TeamFrame je rozdělen do tří hlavních částí. 
                    Klientská aplikace slouží pro správu výroby, server zajišťuje
                    logiku a ukládání dat a dashboard zobrazuje stav provozu
                    na velkých obrazovkách ve výrobě.
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



<Reveal>
<section className="max-w-6xl mx-auto py-20 px-6">

<h2 className="text-3xl font-semibold mb-6">
Architektura systému
</h2>

<p className="text-[#8B949E] mb-12 max-w-3xl">
TeamFrame funguje jako třívrstvý systém. Klientská aplikace spravuje
výrobní data, server zajišťuje jejich zpracování a dashboard zobrazuje
aktuální stav provozu na velkých obrazovkách ve výrobě.
</p>

<div className="grid md:grid-cols-3 gap-8 items-center text-center">

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">Client</h3>
<p className="text-[#8B949E] text-sm">
Správa výroby, zaměstnanců, strojů a plánování směn.
</p>
</div>

<div className="hidden md:block text-3xl text-[#6B7280]">
→
</div>

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">Server</h3>
<p className="text-[#8B949E] text-sm">
Zpracování dat, logika systému a ukládání informací.
</p>
</div>

<div className="hidden md:block text-3xl text-[#6B7280]">
→
</div>

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">Dashboard</h3>
<p className="text-[#8B949E] text-sm">
Vizualizace stavu výroby a plánovaných operací.
</p>
</div>

</div>

</section>
</Reveal>




















<Reveal>
<section className="px-6 py-20 border-t border-[#161B22]">

<div className="mx-auto max-w-7xl space-y-14">

<div className="space-y-4">
<h2 className="text-3xl md:text-4xl font-semibold">
Proč vznikl TeamFrame
</h2>

<p className="text-[#8B949E] text-lg leading-relaxed max-w-4xl">
TeamFrame vznikl jako interní nástroj pro řízení výrobního provozu.
Cílem bylo vytvořit systém, který spojuje plánování směn, řízení strojů,
kvalifikace zaměstnanců a evidenci incidentů do jednoho prostředí.
</p>
</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">
Jedno místo pro řízení výroby
</h3>
<p className="text-[#8B949E] text-sm">
Plánování směn, správa strojů, kvalifikace zaměstnanců
a incidenty jsou sjednoceny v jednom systému.
</p>
</div>

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">
Reálný stav výroby
</h3>
<p className="text-[#8B949E] text-sm">
Dashboard zobrazuje aktuální stav strojů,
incidenty a plánované operace přímo ve výrobní hale.
</p>
</div>

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">
Interní firemní systém
</h3>
<p className="text-[#8B949E] text-sm">
TeamFrame běží na interním serveru firmy
a není závislý na externích cloudových službách.
</p>
</div>

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">
Podpora vícesměnného provozu
</h3>
<p className="text-[#8B949E] text-sm">
Systém podporuje směnové režimy 8h i 12h
včetně rotačních patternů a plánování kapacit.
</p>
</div>

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">
Evidence přehozů
</h3>
<p className="text-[#8B949E] text-sm">
Plánování, sledování a vyhodnocení přehozů
včetně reálného trvání operací.
</p>
</div>

<div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
<h3 className="text-lg font-semibold mb-2">
Analýza prostojů
</h3>
<p className="text-[#8B949E] text-sm">
Incident engine ukládá historii událostí
a umožňuje analyzovat prostoj výroby.
</p>
</div>

</div>

</div>

</section>
</Reveal>






<Reveal>
<section id="usecases" className="px-6 py-20 border-t border-[#161B22]">

  <div className="mx-auto max-w-7xl space-y-14">

    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-semibold">
        Pro koho je TeamFrame
      </h2>

      <p className="text-[#8B949E] text-lg leading-relaxed max-w-4xl">
        TeamFrame je navržen pro výrobní provozy, které potřebují řídit směny,
        pracoviště, kvalifikace zaměstnanců a plánované operace ve výrobě.
        Systém je vhodný zejména pro vícesměnné provozy, kde je potřeba mít
        přehled o aktuálním stavu výroby a plánovaných změnách.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
        <h3 className="text-lg font-semibold mb-2">
          Výrobní firmy
        </h3>
        <p className="text-[#8B949E] text-sm">
          Provozy s větším počtem strojů a zaměstnanců,
          kde je potřeba koordinovat výrobu a směny.
        </p>
      </div>

      <div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
        <h3 className="text-lg font-semibold mb-2">
          Vícesměnné provozy
        </h3>
        <p className="text-[#8B949E] text-sm">
          Podpora plánování směn v režimech 8h i 12h,
          včetně rotací zaměstnanců a přehledu směn.
        </p>
      </div>

      <div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
        <h3 className="text-lg font-semibold mb-2">
          Automotive výroba
        </h3>
        <p className="text-[#8B949E] text-sm">
          Prostředí s vysokými nároky na organizaci výroby,
          plánování operací a kontrolu prostojů.
        </p>
      </div>

      <div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
        <h3 className="text-lg font-semibold mb-2">
          Provozy s častými přehozy
        </h3>
        <p className="text-[#8B949E] text-sm">
          Evidence plánovaných přehozů, jejich průběhu
          a vyhodnocení zpoždění nebo prostojů.
        </p>
      </div>

      <div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
        <h3 className="text-lg font-semibold mb-2">
          Digitální řízení výroby
        </h3>
        <p className="text-[#8B949E] text-sm">
          Přehled o aktuálním stavu provozu
          na dashboardech umístěných přímo ve výrobě.
        </p>
      </div>

      <div className="bg-[#161B22] p-6 rounded-xl border border-[#30363D]">
        <h3 className="text-lg font-semibold mb-2">
          Interní firemní systémy
        </h3>
        <p className="text-[#8B949E] text-sm">
          TeamFrame běží na interním serveru firmy
          a je navržen pro bezpečný provoz uvnitř sítě.
        </p>
      </div>

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



        <Reveal>
          <TwoCol
            title="Řízení přehozů (Changeover management)"
            intro="Modul přehozů slouží k plánování, sledování a vyhodnocení změn výroby mezi referencemi. Umožňuje připravit další výrobu dopředu, sledovat průběh přehozu a evidovat jeho reálné trvání."
            bullets={[
              "Plánování přehozů dopředu",
              "Zahájení a potvrzení operace",
              "Evidence reálného trvání přehozu",
              "Zadání důvodu zpoždění",
              "Historie dokončených přehozů",
            ]}
            shot={shots.find((s) => s.id === "planned_changeovers")!}
            onOpen={() => open("planned_changeovers")}
            reverse={false}
          />
        </Reveal>


<Reveal>
  <TwoCol
    title="Průběh přehozu"
    intro="Seřizovač zahajuje přehoz přímo v systému podle naplánované změny výroby. Od tohoto okamžiku systém měří reálné trvání operace a zobrazuje průběh přehozu."
    bullets={[
      "Spuštění přehozu seřizovačem",
      "Automatické měření času operace",
      "Vizualizace průběhu přehozu",
      "Napojení na stav stroje",
    ]}
    shot={shots.find((s) => s.id === "changeover_start")!}
    onOpen={() => open("changeover_start")}
    reverse={true}
  />
</Reveal>




<Reveal>
  <TwoCol
    title="Naplánování přehozu"
    intro="Přehozy plánuje mistr výroby nebo administrátor systému. Vybere stroj, cílovou referenci a plánovaný čas změny výroby. Naplánovaný přehoz se následně zobrazí v přehledu přehozů a na výrobním dashboardu."
    bullets={[
      "Plánování přehozu mistrem nebo administrátorem",
      "Výběr stroje a nové reference",
      "Definice plánovaného času změny výroby",
      "Automatické zobrazení v přehledu přehozů",
    ]}
    shot={shots.find((s) => s.id === "changeover_dialog")!}
    onOpen={() => open("changeover_dialog")}
    reverse={false}
  />
</Reveal>


<Reveal>
  <TwoCol
    title="Stav přehozu"
    intro="Po zahájení přehozu systém sleduje průběh operace a zobrazuje aktuální stav i její trvání. Informace jsou dostupné přímo v modulu přehozů i na dashboardu."
    bullets={[
      "Zobrazení aktuálního stavu přehozu",
      "Měření trvání operace",
      "Vizualizace průběhu změny výroby",
      "Integrace se stavem stroje",
    ]}
    shot={shots.find((s) => s.id === "changeover_status")!}
    onOpen={() => open("changeover_status")}
    reverse={true}
  />
</Reveal>


<Reveal>
  <TwoCol
    title="Evidence zpoždění"
    intro="Pokud přehoz trvá déle než plánovaný čas, může seřizovač při dokončení uvést důvod prodloužení operace. Tyto informace slouží jako podklad pro analýzu výrobních problémů."
    bullets={[
      "Zadání důvodu prodloužení přehozu",
      "Klasifikace problému",
      "Podklad pro analýzu výroby",
      "Součást historie přehozů",
    ]}
    shot={shots.find((s) => s.id === "changeover_reason")!}
    onOpen={() => open("changeover_reason")}
    reverse={false}
  />
</Reveal>


<Reveal>
<TwoCol
title="Next reference (příprava výroby)"
intro="Správa strojů umožňuje definovat další referenci, která se bude vyrábět po dokončení aktuální zakázky."
bullets={[
"Příprava další výroby",
"Napojení na plánování přehozů",
"Zobrazení v přehledu strojů",
"Podklad pro směnové plánování",
]}
shot={shots.find((s) => s.id === "machine_next_ref")!}
onOpen={() => open("machine_next_ref")}
reverse={true}
/>
</Reveal>





<Reveal>
  <TwoCol
    title="Status bar přehozů"
    intro="Dashboard obsahuje status bar zobrazující aktivní přehozy a jejich stav. Směna tak má okamžitý přehled o probíhajících změnách výroby."
    bullets={[
      "Rychlá informace o aktivních přehozech",
      "Vizualizace přímo na dashboardu",
      "Přehled změn výroby pro směnu",
    ]}
    shot={shots.find((s) => s.id === "changeover_statusbar")!}
    onOpen={() => open("changeover_statusbar")}
    reverse={false}
  />
</Reveal>




<Reveal>
  <TwoCol
    title="Dokončení přehozu"
    intro="Po dokončení práce seřizovač potvrdí ukončení přehozu. Systém uloží reálný čas operace a případné zpoždění do historie."
    bullets={[
      "Potvrzení dokončení přehozu",
      "Uložení reálného času operace",
      "Zápis do historie přehozů",
    ]}
    shot={shots.find((s) => s.id === "changeover_finish")!}
    onOpen={() => open("changeover_finish")}
    reverse={true}
  />
</Reveal>










        <Reveal>
          <TwoCol
            title="Vizualizace přehozů na dashboardu"
            intro="Dashboard může zobrazovat plánované přehozy přímo na velké obrazovce ve výrobě. Směna tak vidí dopředu připravené změny výroby a může se na ně připravit."
            bullets={[
              "Zobrazení plánovaných přehozů",
              "Integrace s TV Dashboardem",
              "Přehled změn výroby pro směnu",
              "Napojení na stroje a reference",
            ]}
            shot={shots.find((s) => s.id === "changeover_tv")!}
            onOpen={() => open("changeover_tv")}
            reverse={false}
          />
        </Reveal>


        <Reveal>
          <TwoCol
            title="Historie dokončených přehozů"
            intro="Systém ukládá historii všech dokončených přehozů. Data lze použít pro analýzu trvání operací a optimalizaci výrobního procesu."
            bullets={[
              "Přehled všech dokončených přehozů",
              "Reálné časy operací",
              "Podklad pro statistiky výroby",
              "Analýza zpoždění",
            ]}
            shot={shots.find((s) => s.id === "finished_changeovers")!}
            onOpen={() => open("finished_changeovers")}
            reverse={true}
          />
        </Reveal>





<Reveal>
  <TwoCol
    title="Auditní editor přehozů"
    intro="Administrativní nástroj pro práci s auditními záznamy přehozů. Modul umožňuje otevřít uložené logy operací a ručně upravit jejich hodnoty v případě chyb, výpadků systému nebo nekonzistence dat."
    bullets={[
      "Ruční úprava auditních záznamů přehozů",
      "Diagnostika problémů v datech",
      "Úprava časů operace (start / konec)",
      "Oprava důvodů zpoždění a metadat operace",
    ]}
    shot={shots.find((s) => s.id === "changeover_audit")!}
    onOpen={() => open("changeover_audit")}
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
                  <section className="rounded-2xl border border-[#161B22] bg-[#0B0F14] p-10 md:p-14">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-semibold">
                        Incident Engine a výpočet prostojů
                      </h3>

                      <p className="text-[#8B949E] leading-relaxed">
                        Incident Dashboard je postavený nad interním Incident Engine.
                        Ten zaznamenává změny provozních stavů strojů, drží historii událostí
                        a počítá trvání prostojů v reálném čase včetně perzistence po restartu systému.
                      </p>

                      <ul className="text-[#8B949E] space-y-2 leading-relaxed">
                        <li>• Samostatný incidentní záznam pro každou změnu stavu</li>
                        <li>• Historie změn v rámci jedné události</li>
                        <li>• Výpočet trvání od okamžiku změny (sekundy/minuty/hodiny)</li>
                        <li>• Podklad pro měsíční agregace a statistické grafy</li>
                      </ul>

                      <p className="text-[#6B7280] text-sm">
                        Vizualizační vrstva (Incident Dashboard) je hotová. Engine část se dále rozšiřuje o logičtější klasifikaci důvodů incidentů.
                      </p>
                    </div>
                  </section>
                </Reveal>


                <Reveal>
                  <TwoCol
                    title="Incident Dashboard (živý feed událostí)"
                    intro="Dashboard zobrazuje incidenty jako barevné karty podle typu události. Směnový režim ukazuje poslední incidenty aktuální směny, den/týden/měsíc slouží pro rychlý přehled a trendové kontroly. Ovládání je dělané pro halu: klávesy, fullscreen a stránkování bez klikání."
                    bullets={[
                      "Barevné karty s gradientem podle typu incidentu + ikony",
                      "F1 Den / F2 Týden / F3 Měsíc / F4 Směna (8h)",
                      "SHIFT režim = rychlý feed aktuální směny (bez stránkování)",
                      "DAY/WEEK/MONTH = stránkování + auto-page (PgUp/PgDn, Space pauza)",
                      "Oddělení přepínáš šipkami ←/→, R refresh, F11 fullscreen",
                    ]}
                    shot={shots.find((s) => s.id === "incident_dashboard")!}
                    onOpen={() => open("incident_dashboard")}
                    reverse={false}
                  />
                </Reveal>



            <Reveal>
              <TwoCol
                title="Employee Manager"
                intro="Centrální správa zaměstnanců včetně směn, referencí a stavů. Modul umožňuje řídit dostupnost pracovníků, kvalifikace a vazby na plánování."
                bullets={[
                  "Evidence zaměstnanců a osobních údajů",
                  "Přiřazení směn (8h / 12h)",
                  "Napojení na reference a kvalifikace",
                  "Vizualizace stavu pracovníka",
                ]}
                shot={shots.find((s) => s.id === "employee_manager")!}
                onOpen={() => open("employee_manager")}
                reverse={false}
              />
            </Reveal>





            <Reveal>
              <TwoCol
                title="Master Manager (správa mistrů / adminů)"
                intro="Modul slouží ke správě mistrů a administrátorů systému. Umožňuje definovat role, oprávnění a vazby na oddělení včetně šifrovaného uložení účtů."
                bullets={[
                  "Role: mistr výroby / super admin",
                  "RFID / PIN autentizace",
                  "Šifrované uložení účtů",
                  "Oddělení a skupiny směn",
                ]}
                shot={shots.find((s) => s.id === "master_manager")!}
                onOpen={() => open("master_manager")}
                reverse={true}
              />
            </Reveal>












            <Reveal>
              <TwoCol
                title="Grafy proškolenosti (kvalifikace)"
                intro="Dashboard zobrazuje přehled proškolenosti zaměstnanců podle referencí a strojů. Cílem je rychle vidět, kde je riziko – málo zaškolených lidí nebo probíhající školení."
                bullets={[
                  "Vizualizace stavu školení: bez školení / školení / zaškolen",
                  "Souhrnné procento proškolenosti (oddělení / stroj / reference)",
                  "Rychlá identifikace slabých míst v týmu",
                  "Podklad pro plánování směn a zaškolování",
                ]}
                shot={shots.find((s) => s.id === "graphs")!}
                onOpen={() => open("graphs")}
                reverse={true}
              />
            </Reveal>



            <Reveal>
              <TwoCol
                title="Graf počtu incidentů"
                intro="Statistické vyhodnocení incidentů podle časového období. Slouží pro sledování trendů a optimalizaci provozu."
                bullets={[
                  "Měsíční agregace",
                  "Trend vývoje incidentů",
                  "Podklad pro reporting",
                  "Napojení na incident log",
                ]}
                shot={shots.find((s) => s.id === "incident_count_graph")!}
                onOpen={() => open("incident_count_graph")}
                reverse={true}
              />
            </Reveal>












            <Reveal>
              <TwoCol
                title="Machine Manager"
                intro="Konfigurace pracovišť a jejich vazeb. Modul definuje strukturu výroby, referenční napojení a provozní parametry."
                bullets={[
                  "Správa pracovišť",
                  "Napojení referencí na stroje",
                  "Definice provozních parametrů",
                  "Podklad pro plánování směn",
                ]}
                shot={shots.find((s) => s.id === "machine_manager")!}
                onOpen={() => open("machine_manager")}
                reverse={true}
              />
            </Reveal>



            <Reveal>
              <TwoCol
                title="Reference Manager"
                intro="Definice referencí a jejich vazeb na stroje. Umožňuje řídit kvalifikační strukturu napříč odděleními."
                bullets={[
                  "Tvorba a správa referencí",
                  "Napojení na konkrétní pracoviště",
                  "Vazba na zaměstnance",
                  "Podklad pro kvalifikační grafy",
                ]}
                shot={shots.find((s) => s.id === "reference_manager")!}
                onOpen={() => open("reference_manager")}
                reverse={false}
              />
            </Reveal>




            <Reveal>
              <TwoCol
                title="Detail kvalifikací zaměstnanců"
                intro="Barevně rozlišený přehled školení jednotlivých zaměstnanců. Umožňuje rychle identifikovat riziková místa."
                bullets={[
                  "Barevné stavy školení",
                  "Rychlá vizuální orientace",
                  "Identifikace kritických referencí",
                  "Podklad pro plánování",
                ]}
                shot={shots.find((s) => s.id === "qualification_detail")!}
                onOpen={() => open("qualification_detail")}
                reverse={true}
              />
            </Reveal>


            <Reveal>
              <TwoCol
                title="Směnový pattern (rotační logika)"
                intro="Definice rotační logiky pro 8h a 12h provoz. Oddělené režimy bez míchání struktur."
                bullets={[
                  "Samostatná logika 8h režimu",
                  "Samostatná logika 12h režimu",
                  "Rotační cykly",
                  "Podklad pro Shift Engine",
                ]}
                shot={shots.find((s) => s.id === "schedule_pattern")!}
                onOpen={() => open("schedule_pattern")}
                reverse={false}
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
