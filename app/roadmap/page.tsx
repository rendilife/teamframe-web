export default function Roadmap() {
  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-10">

        <h1 className="text-4xl font-bold">Roadmap TeamFrame</h1>

        <p className="text-[#8B949E]">
          Přehled plánovaného vývoje systému TeamFrame.
        </p>

      </div>



<div className="space-y-12">

  {/* 1 */}
  <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
    <h2 className="text-xl font-semibold mb-3">Krátkodobý vývoj</h2>

    <ul className="text-[#8B949E] space-y-2">
      <li>• Rozšíření incident engine o klasifikaci důvodů prostojů</li>
      <li>• Optimalizace výkonu dashboardu pro velké obrazovky</li>
      <li>• Rozšíření statistik přehozů a jejich vyhodnocení</li>
      <li>• Vylepšení vizualizace směn a plánování kapacit</li>
    </ul>
  </div>

  {/* 2 */}
  <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
    <h2 className="text-xl font-semibold mb-3">Střednědobý vývoj</h2>

    <ul className="text-[#8B949E] space-y-2">
      <li>• Rozšíření analytických grafů pro výrobu</li>
      <li>• Pokročilé vyhodnocení prostojů a trendů</li>
      <li>• Lepší integrace mezi moduly plánování a incidentů</li>
      <li>• Rozšíření role management náhledů</li>
    </ul>
  </div>

  {/* 3 */}
  <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
    <h2 className="text-xl font-semibold mb-3">Dlouhodobý vývoj</h2>

    <ul className="text-[#8B949E] space-y-2">
      <li>• Rozšíření modulární architektury systému</li>
      <li>• Možnosti integrace s externími výrobními systémy</li>
      <li>• Rozšíření automatických analýz výroby</li>
      <li>• Další rozvoj dashboardu pro výrobní haly</li>
    </ul>
  </div>

</div>





    </main>
  );
}