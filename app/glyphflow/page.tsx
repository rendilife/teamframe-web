import type { Metadata } from "next";
import GlyphFlowLanding from "./GlyphFlowLanding";

export const metadata: Metadata = {
  title: "GlyphFlow Matrix Studio | Vlastní Glyph Matrix pro Nothing Phone (4a) Pro",
  description: "Tvoř pixelové obrázky, animace, fonty a efekty na Nothing Phone (4a) Pro. Zapoj se do uzavřeného testování aplikace GlyphFlow Matrix Studio.",
  alternates: {
    canonical: "https://teamframe.cz/glyphflow",
    languages: { cs: "https://teamframe.cz/glyphflow", en: "https://teamframe.cz/glyphflow/en" },
  },
  openGraph: { title: "GlyphFlow Matrix Studio", description: "Tvůj Glyph Matrix. Tvoje pravidla.", type: "website", url: "https://teamframe.cz/glyphflow" },
};

export default function GlyphFlowPage() {
  return <GlyphFlowLanding lang="cs" />;
}
