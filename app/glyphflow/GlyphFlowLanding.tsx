import Link from "next/link";
import WheelScrollGallery from "./WheelScrollGallery";


type Language = "cs" | "en";

type Feature = {
  mark: string;
  title: string;
  description: string;
};

type Screenshot = {
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
};

const content = {
  cs: {
    navProject: "Další projekt od Rendi Studio",
    navBeta: "Uzavřená beta",
    eyebrow: "NEZÁVISLÉ GLYPH MATRIX STUDIO",
    status: "Testování právě probíhá",
    titleFirst: "Tvůj Glyph Matrix.",
    titleSecond: "Tvoje pravidla.",
    lead: "Vytvářej vlastní pixelové obrázky, animace a textové efekty pro Nothing Phone (4a) Pro. Proměň Glyph Matrix v něco opravdu osobního.",
    ctaPrimary: "Přihlásit se do bety",
    ctaSecondary: "Prozkoumat funkce",
    ctaHelper: "Uzavřené testování na Google Play · pro schválené testery zdarma",
    chipEditor: "13 × 13 pixelů",
    chipAnimations: "Vlastní animace",
    chipHardware: "Fyzický Glyph Matrix",
    heroCaption: "Skutečné obrazovky z aplikace · žádný mockup",
    heroMain: "Reálné prostředí aplikace přímo v telefonu",
    heroSecondary: "Editor animací a práce se snímky",
    heroThird: "Komunitní knihovna a sdílený obsah",
    sectionTag: "CO UMÍ GLYPHFLOW",
    sectionTitle: "Tvoř, upravuj a nech svůj telefon reagovat.",
    sectionLead: "Zaměřujeme se na možnosti skutečného Glyph Matrixu, ne jen na dekorace na displeji.",
    features: [
      { mark: "▦", title: "Pixelový editor 13 × 13", description: "Kresli vlastní symboly a obrázky s přímým náhledem pro Glyph Matrix." },
      { mark: "✧", title: "Animační studio", description: "Skládej snímky do vlastních pohyblivých efektů a upravuj jejich rychlost." },
      { mark: "Aa", title: "Text a vlastní fonty", description: "Vytvářej pixelové písmo, pracuj s textovým tokem a textovými efekty." },
      { mark: "☎", title: "Kontakty a hovory", description: "Přiřazuj vlastní Glyph motivy kontaktům a přizpůsob vizuální upozornění." },
      { mark: "◉", title: "Notifikace a další reakce", description: "Rozšířené Glyph efekty pro události telefonu včetně experimentálních automatizací." },
      { mark: "☁", title: "Počasí a komunita", description: "Zobrazuj počasí na Matrixu a objevuj tvorbu dalších uživatelů v komunitní knihovně." },
    ] satisfies Feature[],
    screenshotsTag: "REÁLNÉ UKÁZKY Z APLIKACE",
    screenshotsTitle: "Jak GlyphFlow skutečně vypadá.",
    screenshotsLead: "Vybral jsem nejzajímavější obrazovky, aby web působil čistěji a přitom ukázal hlavní sílu aplikace.",
    screenshotsHint: "Najeď myší na galerii a posouvej obrázky kolečkem. Na telefonu stačí táhnout prstem.",
    screenshots: [
      { title: "Nástroje", description: "Hlavní rozcestník funkcí: hardware test, Wallet, kontakty, počasí, hodiny i FAQ.", src: "/glyphflow/tools.png", width: 691, height: 1536 },
      { title: "Studio animací", description: "Editor snímků, jasových vrstev a přímé odeslání animace na Glyph Matrix.", src: "/glyphflow/animation.png", width: 691, height: 1536 },
      { title: "Komunitní knihovna", description: "Napojení na Cloudflare komunitu a přehled online stavu knihovny obsahu.", src: "/glyphflow/community.png", width: 691, height: 1536 },
      { title: "Knihovna Glyphů", description: "Ukázka uživatelského obsahu: obrázky, symboly, texty a komunitní motivy.", src: "/glyphflow/library.png", width: 691, height: 1536 },
      { title: "Hodiny", description: "Živý náhled hodin a přepínání stylů čísel přímo pro zadní Glyph Matrix.", src: "/glyphflow/clock.png", width: 1164, height: 1600 },
      { title: "Počasí", description: "Online počasí podle polohy telefonu nebo zadaného města s okamžitým spuštěním na Glyphu.", src: "/glyphflow/weather.png", width: 691, height: 1536 },
    ] satisfies Screenshot[],
    betaTag: "PŘIPOJ SE K TESTOVÁNÍ",
    betaTitle: "Hledáme první skutečné uživatele.",
    betaLead: "GlyphFlow už běží v uzavřené betě. Hledáme majitele kompatibilního Nothing Phone, kteří chtějí aplikaci používat, zkoušet funkce a pomoci nám odhalovat chyby.",
    betaSteps: [
      { number: "01", title: "Vyplň přihlášku", body: "Zanech Google e-mail a model svého Nothing Phone." },
      { number: "02", title: "Počkej na schválení", body: "Po schválení dostaneš instrukce, testovací odkaz a jednorázový promo kód." },
      { number: "03", title: "Vyzkoušej aplikaci", body: "Zapoj se přes Google Play, nainstaluj GlyphFlow a dej nám vědět, co funguje a co můžeme vylepšit." },
    ],
    betaAction: "Otevřít registrační formulář",
    betaFine: "Místa v uzavřené betě jsou omezená. Přihláška nezaručuje okamžitý přístup.",
    faqTag: "NEŽ ZAČNEŠ",
    faqTitle: "Časté otázky",
    faqs: [
      { q: "Který telefon potřebuji?", a: "Aktuální beta je zaměřená na Nothing Phone (4a) Pro s fyzickým Glyph Matrixem. Podporu dalších modelů řešíme postupně." },
      { q: "Je testování zdarma?", a: "Ano, schváleným beta testerům poskytujeme postup pro přístup a jednorázový promo kód pro bezplatné vyzkoušení." },
      { q: "Je to oficiální aplikace Nothing?", a: "Ne. GlyphFlow Matrix Studio je nezávislý projekt a není oficiální aplikací společnosti Nothing." },
      { q: "Co když objevím chybu?", a: "Právě proto betu spouštíme. Napiš nám, co se stalo a na jakém zařízení; tvoje zpětná vazba nám pomůže." },
    ],
    footerDescription: "Nezávislé studio pro Nothing Glyph Matrix.",
    footerTeamframe: "TeamFrame",
    footerContact: "Kontakt",
    footerBeta: "Registrace do bety",
    legal: "Nothing a Nothing Phone jsou ochranné známky příslušných vlastníků. GlyphFlow není oficiálně propojen se společností Nothing.",
  },
  en: {
    navProject: "Another project by Rendi Studio",
    navBeta: "Closed beta",
    eyebrow: "INDEPENDENT GLYPH MATRIX STUDIO",
    status: "Closed beta is live",
    titleFirst: "Your Glyph Matrix.",
    titleSecond: "Your rules.",
    lead: "Create custom pixel artwork, animations and text effects for Nothing Phone (4a) Pro. Make the Glyph Matrix truly yours.",
    ctaPrimary: "Join the closed beta",
    ctaSecondary: "Explore the features",
    ctaHelper: "Closed Google Play testing · free for approved testers",
    chipEditor: "13 × 13 pixels",
    chipAnimations: "Custom animations",
    chipHardware: "Physical Glyph Matrix",
    heroCaption: "Real app screens · no mockups",
    heroMain: "The real app running on the phone",
    heroSecondary: "Animation studio and frame editing",
    heroThird: "Community library and shared content",
    sectionTag: "MEET GLYPHFLOW",
    sectionTitle: "Create, customize, and make your phone respond.",
    sectionLead: "Built around what your phone’s actual Glyph Matrix can do — not just another on-screen theme.",
    features: [
      { mark: "▦", title: "13 × 13 pixel editor", description: "Design your own symbols and artwork with a preview made for the Glyph Matrix." },
      { mark: "✧", title: "Animation studio", description: "Combine frames into custom animated effects and adjust their speed." },
      { mark: "Aa", title: "Text and custom fonts", description: "Create pixel lettering and experiment with scrolling text and visual effects." },
      { mark: "☎", title: "Contacts and calls", description: "Assign custom Glyph designs to contacts and personalize visual call alerts." },
      { mark: "◉", title: "Notifications and reactions", description: "Extend Glyph feedback for phone events with experimental automations." },
      { mark: "☁", title: "Weather and community", description: "Bring weather to your Matrix and explore creations shared in the community library." },
    ] satisfies Feature[],
    screenshotsTag: "REAL APP PREVIEWS",
    screenshotsTitle: "How GlyphFlow actually looks.",
    screenshotsLead: "I kept only the strongest screenshots so the page stays cleaner while still showing the app’s main strengths.",
    screenshotsHint: "Hover over the gallery and use your mouse wheel to scroll sideways. Swipe on mobile.",
    screenshots: [
      { title: "Tools", description: "The main gateway to the app: hardware tests, Wallet, contacts, weather, clocks and help.", src: "/glyphflow/tools.png", width: 691, height: 1536 },
      { title: "Animation studio", description: "Frame editor, brightness layers and direct playback on the physical Glyph Matrix.", src: "/glyphflow/animation.png", width: 691, height: 1536 },
      { title: "Community library", description: "Connected Cloudflare community space with library status and shortcuts.", src: "/glyphflow/community.png", width: 691, height: 1536 },
      { title: "Glyph library", description: "Examples of user content: pictures, symbols, text and shared community creations.", src: "/glyphflow/library.png", width: 691, height: 1536 },
      { title: "Clocks", description: "Live clock preview with multiple number styles for the rear Glyph Matrix.", src: "/glyphflow/clock.png", width: 1164, height: 1600 },
      { title: "Weather", description: "Live weather based on phone location or a selected city, with instant Glyph output.", src: "/glyphflow/weather.png", width: 691, height: 1536 },
    ] satisfies Screenshot[],
    betaTag: "BECOME A BETA TESTER",
    betaTitle: "Help shape what comes next.",
    betaLead: "GlyphFlow is already in closed beta. We’re looking for owners of compatible Nothing Phones who want to try features, use the app and report real-world issues.",
    betaSteps: [
      { number: "01", title: "Apply for access", body: "Share your Google email and your Nothing Phone model." },
      { number: "02", title: "Get approved", body: "Approved testers receive instructions, a Google Play testing link, and a one-time promo code." },
      { number: "03", title: "Try GlyphFlow", body: "Opt in through Google Play, install the app, and let us know what works and what needs improvement." },
    ],
    betaAction: "Open the beta application",
    betaFine: "Closed beta spaces are limited. Applying does not guarantee immediate access.",
    faqTag: "GOOD TO KNOW",
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Which phone do I need?", a: "The current beta is focused on Nothing Phone (4a) Pro with a physical Glyph Matrix. Support for additional models may come later." },
      { q: "Is testing free?", a: "Yes. Approved beta testers receive access instructions and a one-time promotional code for free testing." },
      { q: "Is this an official Nothing app?", a: "No. GlyphFlow Matrix Studio is an independent project and is not an official app from Nothing." },
      { q: "What if I find a bug?", a: "That is exactly why we run a beta. Tell us what happened and which device you used — your feedback helps improve GlyphFlow." },
    ],
    footerDescription: "An independent studio for Nothing Glyph Matrix.",
    footerTeamframe: "TeamFrame",
    footerContact: "Contact",
    footerBeta: "Beta application",
    legal: "Nothing and Nothing Phone are trademarks of their respective owners. GlyphFlow is not affiliated with Nothing.",
  },
};

function HeroPreview({ lang }: { lang: Language }) {
  const t = content[lang];
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[#27e3d1]/10 blur-[80px]" />
      <div className="relative rounded-[34px] border border-[#294149] bg-[#0b141a] p-4 shadow-[0_35px_90px_rgba(0,0,0,.45)] sm:p-5">
        <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.2em] text-[#94b1b5]">
          <span>GlyphFlow / Live Preview</span>
          <span className="rounded-full border border-[#24464a] bg-[#0f2127] px-3 py-1 text-[#7ce7db]">{t.heroCaption}</span>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.08fr_.92fr]">
          <div className="overflow-hidden rounded-[26px] border border-[#23414a] bg-[#050a0f]">
            <img src="/glyphflow/tools.png" alt={t.heroMain} width={691} height={1536} loading="eager" decoding="async" className="block h-[450px] w-full object-cover object-top" />
          </div>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[26px] border border-[#23414a] bg-[#050a0f]">
              <img src="/glyphflow/animation.png" alt={t.heroSecondary} width={691} height={1536} loading="eager" decoding="async" className="block h-[213px] w-full object-cover object-top" />
            </div>
            <div className="overflow-hidden rounded-[26px] border border-[#23414a] bg-[#050a0f]">
              <img src="/glyphflow/library.png" alt={t.heroThird} width={691} height={1536} loading="lazy" decoding="async" className="block h-[213px] w-full object-cover object-top" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderCard({ shot }: { shot: Screenshot }) {
  return (
    <article className="snap-start shrink-0 overflow-hidden rounded-[28px] border border-[#20353c] bg-[#0f1c23] shadow-[0_25px_80px_rgba(0,0,0,.22)] w-[86vw] max-w-[420px]">
      <div className="border-b border-[#19313a] bg-[#081117] p-3 sm:p-4">
        <div className="overflow-hidden rounded-[22px] border border-[#23414a] bg-[#050a0f]">
          <img src={shot.src} alt={shot.title} width={shot.width} height={shot.height} loading="lazy" decoding="async" className="block h-[460px] w-full object-contain object-top" />
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-xl font-bold tracking-tight text-white">{shot.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#aac2c6]">{shot.description}</p>
      </div>
    </article>
  );
}

export default function GlyphFlowLanding({ lang }: { lang: Language }) {
  const t = content[lang];
  const isCs = lang === "cs";
  const registration = `/glyphflow-beta?lang=${lang}`;

  return (
    <main lang={lang} className="min-h-screen overflow-hidden bg-[#070c11] text-[#ecfbfa]">
      <div className="border-b border-[#1d3137] bg-[#0c171c]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs text-[#a6bec2] md:px-8">
          <span><span className="mr-2 text-[#44dbc9]">●</span>{t.navProject}</span>
          <div className="flex items-center gap-5">
            <span className="hidden text-[#82ded4] sm:inline">{t.navBeta}</span>
            <div className="flex items-center gap-2" aria-label="Language">
              <Link href="/glyphflow" hrefLang="cs" aria-current={isCs ? "page" : undefined} className={isCs ? "font-bold text-white underline decoration-[#57e7d7] underline-offset-4" : "hover:text-white"}>CZ</Link>
              <span aria-hidden="true">/</span>
              <Link href="/glyphflow/en" hrefLang="en" aria-current={!isCs ? "page" : undefined} className={!isCs ? "font-bold text-white underline decoration-[#57e7d7] underline-offset-4" : "hover:text-white"}>EN</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="relative isolate px-5 pb-24 pt-16 md:px-8 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-[20%] -z-10 h-[400px] w-[400px] rounded-full bg-[#12483f]/25 blur-[130px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#225954] bg-[#10312c] px-4 py-2 text-xs font-semibold tracking-[.15em] text-[#86ebdf]">
              <span className="h-2 w-2 rounded-full bg-[#40ecda]" />{t.eyebrow}
            </p>
            <div className="mb-7 inline-flex items-center gap-2 text-xs text-[#9eb7ba]"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{t.status}</div>
            <h1 className="max-w-[790px] text-[clamp(3.2rem,6vw,5.7rem)] font-black leading-[1.02] tracking-[-.055em]">
              {t.titleFirst}<br /><span className="bg-gradient-to-r from-[#32e1cd] to-[#b7fff4] bg-clip-text text-transparent">{t.titleSecond}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#b5cbd0] md:text-xl">{t.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={registration} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#42e1d0] px-7 py-3 font-bold text-[#05201d] transition hover:bg-[#95fff0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42e1d0]">{t.ctaPrimary} <span aria-hidden="true" className="ml-3">↗</span></a>
              <a href="#features" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#355459] px-7 py-3 font-semibold text-[#e5faf8] transition hover:bg-[#183038] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42e1d0]">{t.ctaSecondary}</a>
            </div>
            <p className="mt-4 text-sm text-[#88a7ac]">{t.ctaHelper}</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {[t.chipEditor, t.chipAnimations, t.chipHardware].map((chip) => <span key={chip} className="rounded-full border border-[#254148] bg-[#11232b] px-4 py-2 text-xs font-medium text-[#b8d7d9]">{chip}</span>)}
            </div>
          </div>
          <HeroPreview lang={lang} />
        </div>
      </section>

      <section id="features" className="border-y border-[#173038] bg-[#0b151b] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[.22em] text-[#55e9d8]">{t.sectionTag}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{t.sectionTitle}</h2>
          <p className="mt-5 max-w-2xl text-[#adc6c9]">{t.sectionLead}</p>
          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.features.map((f) => (
              <article key={f.title} className="rounded-2xl border border-[#223740] bg-[#111f27] p-7 transition-colors hover:border-[#398b80]">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#336359] bg-[#143b36] text-xl font-bold text-[#75f5e4]">{f.mark}</div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-[#aac2c6]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[.22em] text-[#55e9d8]">{t.screenshotsTag}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{t.screenshotsTitle}</h2>
          <p className="mt-5 max-w-3xl text-[#adc6c9]">{t.screenshotsLead}</p>
          <p className="mt-3 text-sm text-[#7fa0a5]">{t.screenshotsHint}</p>
          <WheelScrollGallery label={isCs ? "Galerie obrázků GlyphFlow" : "GlyphFlow screenshot gallery"}>
            {t.screenshots.map((shot) => <SliderCard key={shot.title} shot={shot} />)}
          </WheelScrollGallery>
        </div>
      </section>

      <section id="beta" className="border-y border-[#173038] bg-[#0b151b] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#276a65] bg-gradient-to-br from-[#153c39] via-[#11292b] to-[#0e191e] p-7 shadow-[0_25px_90px_rgba(0,0,0,.2)] md:p-12">
          <p className="text-xs font-bold tracking-[.2em] text-[#70f2e0]">{t.betaTag}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">{t.betaTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#b9d8d6]">{t.betaLead}</p>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {t.betaSteps.map((step) => (
              <div key={step.number} className="rounded-xl border border-[#2d5252] bg-[#0a171b]/80 p-6">
                <span className="text-sm font-bold tracking-widest text-[#6df7e5]">{step.number}</span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#afc8cb]">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-3">
            <a href={registration} className="inline-flex min-h-12 items-center rounded-xl bg-[#53eddc] px-7 py-3 font-bold text-[#05201d] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{t.betaAction} <span aria-hidden="true" className="ml-3">↗</span></a>
            <p className="text-sm text-[#9ac5c4]">{t.betaFine}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#22343b] bg-[#0c151b] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[.22em] text-[#55e9d8]">{t.faqTag}</p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">{t.faqTitle}</h2>
          <div className="mt-8 space-y-3">
            {t.faqs.map((item) => (
              <details key={item.q} className="group rounded-xl border border-[#263d43] bg-[#121f26] p-5 open:border-[#39877d]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">{item.q}<span aria-hidden="true" className="text-xl text-[#7ce5d8] transition group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-[#afc7ca]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#183038] bg-[#080e13] px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-start">
          <div>
            <div className="text-xl font-bold">Glyph<span className="text-[#51e8d6]">Flow</span> <span className="text-xs font-medium tracking-widest text-[#77969b]">MATRIX STUDIO</span></div>
            <p className="mt-2 text-sm text-[#90aeb1]">{t.footerDescription}</p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#b5cdcf]" aria-label="Footer">
            <a href={registration} className="hover:text-white">{t.footerBeta}</a>
            <a href="mailto:teamframedev@gmail.com" className="hover:text-white">{t.footerContact}</a>
            <Link href="/" className="hover:text-white">{t.footerTeamframe}</Link>
          </nav>
        </div>
        <div className="mx-auto mt-9 max-w-7xl border-t border-[#1b3339] pt-6 text-xs leading-relaxed text-[#7d999e]">© {new Date().getFullYear()} Rendi Studio · {t.legal}</div>
      </footer>
    </main>
  );
}
