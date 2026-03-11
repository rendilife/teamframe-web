"use client";

export default function Updates() {
  return (
    <main className="min-h-screen bg-[#0E1117] text-[#E6EDF3] px-6 py-20">

      <div className="max-w-5xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold">
          Vývoj TeamFrame
        </h1>

        {/* Březen */}
        <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
          <h2 className="text-xl font-semibold">
            Březen 2026
          </h2>

          <ul className="mt-4 text-[#8B949E] space-y-2">
            <li>• Incident Dashboard</li>
            <li>• Reference Manager</li>
            <li>• Master Manager</li>
            <li>• Stabilizace MiniDock</li>
          </ul>
        </div>

        {/* Únor */}
        <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
          <h2 className="text-xl font-semibold">
            Únor 2026
          </h2>

          <ul className="mt-4 text-[#8B949E] space-y-2">
            <li>• Implementace Shift Engine (8h / 12h)</li>
            <li>• Dashboard ACTIVE / NEXT</li>
            <li>• Přidání rotace zaměstnanců mezi stroji</li>
            <li>• Vylepšení správy kvalifikací</li>
          </ul>
        </div>

        {/* Leden */}
        <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
          <h2 className="text-xl font-semibold">
            Leden 2026
          </h2>

          <ul className="mt-4 text-[#8B949E] space-y-2">
            <li>• Vytvoření TeamFrame Dashboard</li>
            <li>• Vizualizace výroby na velkých obrazovkách</li>
            <li>• Základní monitoring strojů</li>
            <li>• Přehled zaměstnanců podle oddělení</li>
          </ul>
        </div>

        {/* Prosinec */}
        <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
          <h2 className="text-xl font-semibold">
            Prosinec 2025
          </h2>

          <ul className="mt-4 text-[#8B949E] space-y-2">
            <li>• První verze serverové architektury</li>
            <li>• Komunikace klient ↔ server</li>
            <li>• Základní ukládání dat výroby</li>
          </ul>
        </div>

        {/* Listopad */}
        <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
          <h2 className="text-xl font-semibold">
            Listopad 2025
          </h2>

          <ul className="mt-4 text-[#8B949E] space-y-2">
            <li>• Employee Manager</li>
            <li>• Evidence zaměstnanců a kvalifikací</li>
            <li>• Přiřazování zaměstnanců ke strojům</li>
          </ul>
        </div>

        {/* Říjen */}
        <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
          <h2 className="text-xl font-semibold">
            Říjen 2025
          </h2>

          <ul className="mt-4 text-[#8B949E] space-y-2">
            <li>• Machine Manager</li>
            <li>• Správa výrobních strojů</li>
            <li>• Definice výrobních referencí</li>
          </ul>
        </div>

        {/* Září */}
        <div className="border border-[#161B22] rounded-xl p-6 bg-[#0B0F14]">
          <h2 className="text-xl font-semibold">
            Září 2025
          </h2>

          <ul className="mt-4 text-[#8B949E] space-y-2">
            <li>• První návrh systému TeamFrame</li>
            <li>• Základní architektura aplikace</li>
            <li>• Návrh plánování směn</li>
          </ul>
        </div>

      </div>

    </main>
  );
}