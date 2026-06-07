import VisitStatsPanel from "@/app/components/visits/VisitStatsPanel";

export const metadata = {
  title: "Návštěvnost – TeamFrame",
  description: "Interní přehled návštěvnosti webu TeamFrame.",
};

export default function NavstevnostPage() {
  return (
    <main className="min-h-screen bg-[#0E1117] px-6 py-20 text-[#E6EDF3]">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-3">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#00B3A4]">
            TeamFrame Web
          </div>
          <h1 className="text-4xl font-bold">Návštěvnost</h1>
          <p className="max-w-3xl text-[#8B949E]">
            Počítadlo používá anonymní device id uložené v prohlížeči. Jedno zařízení se
            započítá maximálně jednou denně, délka návštěvy se měří lehkým heartbeat
            signálem a návraty se počítají bez ukládání osobních údajů.
          </p>
        </div>

        <VisitStatsPanel />
      </div>
    </main>
  );
}
