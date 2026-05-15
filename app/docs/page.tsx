export default function Docs() {
  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold">Dokumentace</h1>

        <p className="text-[#8B949E]">
          Technická dokumentace systému TeamFrame.
        </p>

        {/* Architecture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">System Architecture</h2>

          <p className="text-[#8B949E]">
            TeamFrame je modulární client-server systém pro plánování směn,
            řízení výroby a vizualizaci provozu.
          </p>

          <div className="bg-[#161B22] p-6 rounded-lg text-sm font-mono text-[#C9D1D9]">
{`Industrial Data Sources
        ↓
TeamFrame Server (API)
        ↓
TeamFrame Client Applications
        ↓
Production Dashboards`}
          </div>
        </section>

        {/* Server */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">TeamFrame Server</h2>

          <p className="text-[#8B949E]">
            Server funguje jako centrální bod systému. Poskytuje API pro klienty,
            spravuje data a zajišťuje synchronizaci mezi moduly.
          </p>

          <ul className="list-disc pl-6 text-[#8B949E] space-y-1">
            <li>správa dat výroby</li>
            <li>REST API komunikace</li>
            <li>bezpečnost a přístupová logika</li>
            <li>integrace s externími systémy</li>
          </ul>
        </section>

        {/* Client */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">TeamFrame Client</h2>

          <p className="text-[#8B949E]">
            Klientská aplikace slouží pro každodenní práci ve výrobě a
            obsahuje moduly pro plánování, správu zaměstnanců a řízení výroby.
          </p>
        </section>

        {/* ShiftBrain */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">ShiftBrain</h2>

          <p className="text-[#8B949E]">
            ShiftBrain je plánovací engine, který automaticky vyhodnocuje
            dostupnost zaměstnanců, kvalifikace a požadavky strojů.
          </p>
        </section>




{/* Dashboard */}
<section className="space-y-3">
  <h2 className="text-2xl font-semibold">TeamFrame Dashboard</h2>

  <p className="text-[#8B949E]">
    Dashboard slouží pro realtime vizualizaci výroby na velkých obrazovkách.
    Zobrazuje ACTIVE/NEXT směny, stavy strojů, incidenty a plánované změny.
  </p>

  <ul className="list-disc pl-6 text-[#8B949E] space-y-1">
    <li>fullscreen TV režim</li>
    <li>realtime API refresh</li>
    <li>incident monitoring</li>
    <li>vizualizace prostojů</li>
    <li>ACTIVE / NEXT zobrazení</li>
  </ul>
</section>



{/* SQL Layer */}
<section className="space-y-3">
  <h2 className="text-2xl font-semibold">Hybrid SQL Layer</h2>

  <p className="text-[#8B949E]">
    TeamFrame aktuálně používá hybridní SQL vrstvu,
    která bezpečně kombinuje SQL databázi s původním JSON backendem.
  </p>

  <ul className="list-disc pl-6 text-[#8B949E] space-y-1">
    <li>SQLAlchemy 2.x</li>
    <li>read-only SQL režim</li>
    <li>SQL → JSON fallback</li>
    <li>benchmark a integrity testy</li>
    <li>bez zásahu do ShiftBrain logiky</li>
  </ul>
</section>




{/* Realtime Engine */}
<section className="space-y-3">
  <h2 className="text-2xl font-semibold">Realtime Engine</h2>

  <p className="text-[#8B949E]">
    TeamFrame používá realtime synchronizaci mezi Serverem,
    Dashboardem a klientskými aplikacemi.
  </p>

  <ul className="list-disc pl-6 text-[#8B949E] space-y-1">
    <li>live machine states</li>
    <li>incident synchronization</li>
    <li>realtime refresh</li>
    <li>Snail overlay API</li>
    <li>low-latency polling system</li>
  </ul>
</section>












      </div>
    </main>
  );
}