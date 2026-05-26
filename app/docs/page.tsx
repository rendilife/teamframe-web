const sections = [
  {
    title: "1. Co TeamFrame aktuálně je",
    body: [
      "TeamFrame je interní výrobní systém pro provoz v lokální síti. Není to jen jedna aplikace, ale propojený ekosystém serveru, klienta, dashboardu, webové vrstvy, licencí, installeru a výrobních modulů.",
      "Primární filozofie systému je LAN-first provoz, jednoduchá údržba, rychlé lokální zobrazení dat a stabilita ve výrobě."
    ],
    items: [
      "TeamFrame Server: backend, API, směny, data, launcher a web dashboard.",
      "TeamFrame Client: hlavní PyQt6 klient pro každodenní práci.",
      "TeamFrame Dashboard: PyQt6 dashboard pro výrobu, TV režim a moduly.",
      "TeamFrame WEB Dashboard: Flask web vrstva pro mobil, tablet, PC a TV v LAN.",
      "Installer/release pipeline: Nuitka EXE buildy, installer, update metadata a changelog.",
      "Licence: lokální licenční vrstvy plus Cloudflare Worker/KV server.",
      "MiniDock systém: malé top-level dock widgety mezi Clientem, Dashboardem a ServerLauncherem.",
      "Budoucí vrstvy: PLC manager a metrics/OEE foundation."
    ]
  },
  {
    title: "2. Citlivé části, na které sahat opatrně",
    body: [
      "Tyto části jsou bezpečnostně nebo provozně citlivé. Změny dělat jen cíleně, po záloze a bez velkého refactoru."
    ],
    items: [
      "licence, HWID, auth.enc, secure_key.bin",
      "encryption, security router, security layer",
      "Cloudflare licenční vrstva",
      "ShiftBrain a commit engine",
      "existing server.py API a existing /api/* endpointy",
      "Incident Engine a Machine Status logika",
      "existující Dashboard moduly, pokud se řeší jiná vrstva"
    ]
  },
  {
    title: "3. Důležité složky",
    body: [
      "Aktuální lokální cesty podle vývojového stroje:"
    ],
    items: [
      "C:\\Users\\Acer\\Desktop\\server",
      "C:\\Users\\Acer\\Desktop\\TeamFrame",
      "C:\\Users\\Acer\\Desktop\\TeamFrameDashboard",
      "C:\\Users\\Acer\\Desktop\\InstallerProject",
      "C:\\Users\\Acer\\Desktop\\server_license_storage",
      "C:\\Users\\Acer\\Desktop\\teamframe_web",
      "C:\\Users\\Acer\\Desktop\\TeamFrameBuild"
    ]
  },
  {
    title: "4. Server a WEB architektura",
    body: [
      "Produkční cílová architektura používá samostatné EXE procesy: server_api.exe, server_web.exe a server_launcher.exe.",
      "Vývojový režim má spouštět Python zdrojáky. Produkční frozen/Nuitka režim má spouštět EXE. Detekce má být automatická, typicky přes getattr(sys, \"frozen\", False)."
    ],
    items: [
      "DEV: python server.py a python server_web.py",
      "PROD: server_api.exe, server_web.exe a server_launcher.exe",
      "WEB port: 8080",
      "Lokální URL: http://127.0.0.1:8080",
      "Dashboard route: /web/dashboard",
      "WEB vrstva: Flask, Blueprinty, polling přes fetch(), bez FastAPI/Quart/SocketIO refactoru"
    ]
  },
  {
    title: "5. WEB Dashboard",
    body: [
      "WEB dashboard je určený pro mistra a výrobu. Priorita je čitelnost z dálky, rychlost v LAN, stabilita a kompaktní průmyslový vzhled.",
      "Dashboard nesmí jako hlavní text zobrazovat jen raw employee hash/ID. Hlavní text má být jméno, příjmení nebo display name. ID může být malé a šedé pod jménem."
    ],
    items: [
      "login skeleton a session login",
      "role admin/zaměstnanec jako příprava",
      "ACTIVE/NEXT panely",
      "machine cards",
      "/web/api/status, /web/api/shifts a /web/api/machines",
      "employee metadata enrichment",
      "employee avatary přes backend endpoint",
      "hodiny oddělené od polling refresh manageru",
      "čas ve formátu 18.05.2026 22:47",
      "statusy: provoz zelená, stop červená, přehoz oranžová, paused/pauza žlutá"
    ]
  },
  {
    title: "6. Release a changelog systém",
    body: [
      "Release systém je v InstallerProject. Changelog je vedený přes pending_changes.json jako release queue.",
      "Během vývoje se nové položky přidávají do pending. Přesun do deployed probíhá až při ostrém release buildu s -Publish. PlanOnly ani test build nesmí pending queue mazat."
    ],
    items: [
      "build_full_release.ps1",
      "build_test_sql_release.ps1",
      "add_pending_change.ps1",
      "update_changelog.ps1",
      "CHANGELOG.md",
      "release_notes.txt",
      "release.json",
      "teamframe_web/public/releases/latest.json",
      "teamframe_web/public/releases/X.X.X.json",
      "Výstupy mají být česky a UTF-8 safe"
    ]
  },
  {
    title: "7. Download web",
    body: [
      "Download stránka už automaticky načítá /releases/latest.json a dynamicky renderuje changelog. Layout, dark theme, download box, counter logika, version.json a installer URL logika se nemají zbytečně měnit."
    ],
    items: [
      "Soubor: C:\\Users\\Acer\\Desktop\\teamframe_web\\app\\download\\DownloadClient.tsx",
      "Pokud latest.json neexistuje, changelog se nezobrazí.",
      "Nesmí spadnout stránka ani Next.js hydration."
    ]
  },
  {
    title: "8. Licence a trial",
    body: [
      "Trial a placená licence musí být oddělené. Aktivace placené licence nesmí lokálně smazat trial_status.",
      "Placená licence může přičíst zbývající trial dny k délce licence. Trial záznam má zůstat zachovaný pro audit."
    ],
    items: [
      "Client a Dashboard maskují license_key a hwid v logu.",
      "Server licence storage zachovává existující data při ukládání klíče.",
      "Cloudflare Worker umí trial bonus dny.",
      "Generátor licenčních klíčů nemá držet Cloudflare API token ve zdrojovém kódu.",
      "Tokeny, licenční klíče a HWID neukládat do dokumentace."
    ]
  },
  {
    title: "9. Cloudflare Worker",
    body: [
      "Worker slouží jako licence server nad Cloudflare KV. KV binding musí být LICENSES.",
      "Opravená verze workeru byla připravená na ploše jako teamframe_license_worker_fixed.js."
    ],
    items: [
      "/api/license/check",
      "/api/license/trial",
      "/api/version",
      "/api/download",
      "/api/download-count",
      "kontrola produktu server/client/dashboard",
      "HWID lock",
      "trial aktivace",
      "expirování licence",
      "download counter"
    ]
  },
  {
    title: "10. MiniDock systém",
    body: [
      "MiniDocky běží mezi různými procesy: TeamFrame Client, TeamFrame Dashboard a TeamFrame ServerLauncher.",
      "Cílem je jednotný bottom-right stack systém, který drží pořadí, nepřekrývá se a přežije zavření nebo restart jednotlivých procesů."
    ],
    items: [
      "cross-process stack registry",
      "řazení odspodu nahoru podle pořadí spuštění",
      "auto realign po zavření/restartu docku",
      "manuální vertikální drag reorder",
      "persistentní pořadí docků",
      "tooltip nad dockem",
      "fullscreen suppress pro Dashboard fullscreen režim"
    ]
  },
  {
    title: "11. Dashboard stabilita",
    body: [
      "Řešil se problém tichého ukončení Dashboardu bez tracebacku při rychlém fullscreen toggle a při některých těžších modulech.",
      "U Dashboard modulů je potřeba hlídat duplicitní QTimer intervaly, těžké opakované vytváření widgetů a reentrantní Qt render."
    ],
    items: [
      "debounce ochrana fullscreen toggle",
      "bezpečné skrývání top-level MiniDock oken",
      "logování closeEvent a aboutToQuit",
      "sledování Snail overlay lifecycle",
      "podezřelé oblasti: grafy, planned/preparing moduly, finished preparings, pyqtgraph"
    ]
  },
  {
    title: "12. Snail overlay",
    body: [
      "V Clientu byla opravena chyba, kdy se oddělení s diakritikou posílalo přímo do URL a urllib padal na ASCII encode.",
      "Dashboard snail už URL encoding používal."
    ],
    items: [
      "Soubor: C:\\Users\\Acer\\Desktop\\TeamFrame\\snail\\snail_anim.py",
      "Příčina: dept=Montáž v raw URL",
      "Oprava: urllib.parse.quote(str(dept), safe=\"\")",
      "Stejná API chyba se loguje max jednou za 30 sekund"
    ]
  },
  {
    title: "13. ShiftEngine",
    body: [
      "12h ShiftEngine měl problém na decrypt/load vrstvě s chybou 'module' object is not callable. 8h ShiftEngine fungoval.",
      "Směr opravy byl nepřepisovat security/encryption, ale použít stejný bezpečný AES-GCM employee decrypt helper jako zbytek serveru."
    ],
    items: [
      "Nerozbíjet 8h ShiftEngine",
      "Nerozbíjet encrypted employee files",
      "Nerozbíjet existing decrypt architecture",
      "Nerozbíjet ACTIVE/NEXT export contract"
    ]
  },
  {
    title: "14. PLC a Metrics foundation",
    body: [
      "Byly připravené backend foundation vrstvy pro budoucí PLC/OEE architekturu. Zatím nejde o plné řízení výroby ani kompletní OEE dashboard.",
      "PLC a metrics výpočty mají zůstat server-side, ne v GUI."
    ],
    items: [
      "server/plc/plc_manager.py",
      "server/plc/base_driver.py",
      "server/plc/drivers/simulation_driver.py",
      "server/plc/drivers/modbus_driver.py",
      "server/plc/drivers/opcua_driver.py",
      "server/metrics/metrics_manager.py",
      "availability_engine, performance_engine, quality_engine, oee_engine",
      "future OPC UA / Siemens / Modbus integrace"
    ]
  },
  {
    title: "15. PLC Manager widget",
    body: [
      "PLC Manager widget je konfigurační GUI v TeamFrame Clientu. Není to realtime dashboard a nemá počítat OEE.",
      "Modul má být napojený do existujícího TeamFrame module loaderu, ne otevíraný jako standalone okno."
    ],
    items: [
      "Soubor: C:\\Users\\Acer\\Desktop\\TeamFrame\\widgets\\plc_manager_widget.py",
      "MODULE_KEY = plc_manager",
      "správa PLC zařízení",
      "machine mapping",
      "metrics settings",
      "české menu a ikonka"
    ]
  },
  {
    title: "16. Installer a sdílená složka",
    body: [
      "Installer nesmí vytvářet nebo přepisovat sdílení ProgramData složky stylem Everyone/FULL. To je nebezpečné pro serverová data.",
      "Cíl je zachovat přístup ostatních PC v LAN, ale bez otevřených práv pro každého."
    ],
    items: [
      "nepoužívat Everyone/FULL",
      "preferovat bezpečnější Authenticated Users/Change podle potřeby",
      "čistit starý explicitní Everyone grant",
      "hlídat ProgramData/share permissions hlavně na čisté instalaci"
    ]
  },
  {
    title: "17. Ochrana proti vícenásobnému spuštění",
    body: [
      "Client ochranu měl, ServerLauncher a Dashboard byly doplněné stejným stylem přes Qt lock soubor.",
      "Cíl je zabránit duplicitním procesům, které by rozbily dock stack, registry nebo provozní data."
    ],
    items: [
      "Qt QLockFile",
      "jeden běžící ServerLauncher",
      "jeden běžící Dashboard",
      "neotevírat duplicity"
    ]
  }
];

const checklists = [
  {
    title: "Client",
    items: [
      "Spustit TeamFrame Client.",
      "Přepnout oddělení na Montáž.",
      "Sledovat konzoli.",
      "Nemá se opakovat ASCII SNAIL API ERROR.",
      "Snail overlay má dál fungovat."
    ]
  },
  {
    title: "Dashboard",
    items: [
      "Spustit Dashboard.",
      "Otevřít TV dashboard.",
      "Zapnout/vypnout fullscreen pomalu i rychle.",
      "Client/Server docky mají zůstat za fullscreenem.",
      "Dashboard se nemá tichounce ukončit."
    ]
  },
  {
    title: "WEB",
    items: [
      "Spustit ServerLauncher.",
      "Spustit API a WEB.",
      "Otevřít http://127.0.0.1:8080/web/dashboard.",
      "Ověřit ACTIVE/NEXT, machine cards, status bar a čas.",
      "Z mobilu/tabletu otevřít LAN adresu serveru."
    ]
  },
  {
    title: "Release",
    items: [
      ".\\build_full_release.ps1 -Version X.X.X -PlanOnly",
      "Pending queue se nesmí změnit na deployed.",
      "latest.json se nesmí přepsat.",
      ".\\build_full_release.ps1 -Version X.X.X -Publish",
      "Pending změny se přesunou do deployed a vygeneruje se latest.json."
    ]
  }
];

const commands = [
  {
    title: "Py compile jednoho souboru",
    code: `& "C:\\Users\\Acer\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe" -m py_compile "C:\\Users\\Acer\\Desktop\\TeamFrame\\snail\\snail_anim.py"`
  },
  {
    title: "Ověření JSON",
    code: `& "C:\\Users\\Acer\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe" -c "import json; from pathlib import Path; p=Path(r'C:\\Users\\Acer\\Desktop\\InstallerProject\\pending_changes.json'); json.loads(p.read_text(encoding='utf-8-sig')); print('OK')"`
  },
  {
    title: "Přidání pending změny",
    code: `& "C:\\Users\\Acer\\Desktop\\InstallerProject\\add_pending_change.ps1" -Category "Fixed" -Module "client" -Text "Popis změny česky."`
  },
  {
    title: "Release preview",
    code: `.\\build_full_release.ps1 -Version 1.6.10 -PlanOnly`
  },
  {
    title: "Ostrý release",
    code: `.\\build_full_release.ps1 -Version 1.6.10 -Publish`
  }
];

function Card({
  title,
  body,
  items,
}: {
  title: string;
  body?: string[];
  items?: string[];
}) {
  return (
    <section className="rounded-xl border border-[#30363D] bg-[#161B22] p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-[#F0F6FC]">{title}</h2>

      {body?.map((paragraph) => (
        <p key={paragraph} className="text-[#B7C0CC] leading-7">
          {paragraph}
        </p>
      ))}

      {items && (
        <ul className="list-disc pl-6 text-[#8B949E] space-y-2">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Docs() {
  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#58A6FF]">
            TeamFrame Docs
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-[#F0F6FC] sm:text-5xl">
              Technická dokumentace
            </h1>
            <p className="max-w-3xl text-[#8B949E] leading-7">
              Praktická mapa systému TeamFrame podle aktuálního průchodu Codexem:
              architektura, citlivé vrstvy, release proces, licence, WEB,
              Dashboard, MiniDocky, PLC foundation a bezpečné checklisty.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[#8B949E]">
            <span className="rounded-full border border-[#30363D] bg-[#0D1117] px-3 py-1">
              Datum záznamu: 26.05.2026
            </span>
            <span className="rounded-full border border-[#30363D] bg-[#0D1117] px-3 py-1">
              Bez tokenů, klíčů a HWID
            </span>
            <span className="rounded-full border border-[#30363D] bg-[#0D1117] px-3 py-1">
              LAN-first výrobní systém
            </span>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5">
            <div className="text-3xl font-bold text-[#3FB950]">Flask</div>
            <p className="mt-2 text-sm text-[#8B949E]">WEB vrstva, Blueprinty a polling přes fetch().</p>
          </div>
          <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5">
            <div className="text-3xl font-bold text-[#D29922]">PyQt6</div>
            <p className="mt-2 text-sm text-[#8B949E]">Client, Dashboard, MiniDocky a desktop moduly.</p>
          </div>
          <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5">
            <div className="text-3xl font-bold text-[#58A6FF]">Nuitka</div>
            <p className="mt-2 text-sm text-[#8B949E]">Produkční EXE buildy, installer a release flow.</p>
          </div>
        </section>

        <div className="space-y-5">
          {sections.map((section) => (
            <Card
              key={section.title}
              title={section.title}
              body={section.body}
              items={section.items}
            />
          ))}
        </div>

        <section className="rounded-xl border border-[#30363D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-[#F0F6FC]">18. Testovací checklisty</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {checklists.map((checklist) => (
              <div key={checklist.title} className="rounded-lg border border-[#30363D] bg-[#0D1117] p-4">
                <h3 className="font-semibold text-[#F0F6FC]">{checklist.title}</h3>
                <ol className="mt-3 list-decimal pl-5 text-sm text-[#8B949E] space-y-2">
                  {checklist.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <Card
          title="19. Doporučení pro další práci"
          body={[
            "Krátkodobě se vyplatí sjednotit logging, projít encoding textových konstant, držet release queue aktuální a doplnit jednoduché healthchecky.",
            "Střednědobě má smysl dokumentovat release pipeline, licence/trial flow, testy ShiftEngine 8h/12h a safe config editor.",
            "Dlouhodobě je dobrý směr PLC simulation, metrics API, OEE dashboard až po stabilním backendu a lepší installer permission audit."
          ]}
          items={[
            "Nejdřív záloha, potom úprava.",
            "Malé kroky místo velkého refactoru.",
            "U licencí nikdy nelogovat tajné údaje.",
            "U WEB dashboardu držet jednoduchost: Flask, Blueprint, fetch polling.",
            "U výroby preferovat čitelnost a stabilitu před efekty.",
            "U ShiftEngine nikdy netestovat na ostrých datech bez zálohy."
          ]}
        />

        <section className="rounded-xl border border-[#30363D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-[#F0F6FC]">20. Užitečné příkazy</h2>
          <div className="space-y-4">
            {commands.map((command) => (
              <div key={command.title} className="space-y-2">
                <h3 className="font-semibold text-[#C9D1D9]">{command.title}</h3>
                <pre className="overflow-x-auto rounded-lg border border-[#30363D] bg-[#0D1117] p-4 text-sm text-[#C9D1D9]">
                  <code>{command.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#30363D] bg-[#161B22] p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#F0F6FC]">21. Krátké shrnutí hodnoty projektu</h2>
          <p className="text-[#B7C0CC] leading-7">
            TeamFrame už není jednoduchý nástroj. Je to lokální výrobní platforma
            s vlastním serverem, dashboardy, webem, licencemi, installerem,
            updatery, šifrovanými daty, směnami, stroji, incidenty a release
            procesem.
          </p>
          <p className="text-[#B7C0CC] leading-7">
            Největší hodnota není jen v kódu. Je v tom, že systém řeší reálný
            provozní problém výroby: kdo je kde, co běží, co stojí, co se má
            dělat a jak to rychle vidí mistr, obsluha i vedení.
          </p>
        </section>
      </div>
    </main>
  );
}
