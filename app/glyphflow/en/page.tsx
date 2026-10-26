import type { Metadata } from "next";
import GlyphFlowLanding from "../GlyphFlowLanding";

export const metadata: Metadata = {
  title: "GlyphFlow Matrix Studio | Customize Your Nothing Phone (4a) Pro",
  description: "Create pixel art, animations, fonts and effects for the Nothing Phone (4a) Pro Glyph Matrix. Apply to join the GlyphFlow Matrix Studio closed beta.",
  alternates: {
    canonical: "https://teamframe.cz/glyphflow/en",
    languages: { cs: "https://teamframe.cz/glyphflow", en: "https://teamframe.cz/glyphflow/en" },
  },
  openGraph: { title: "GlyphFlow Matrix Studio", description: "Your Glyph Matrix. Your rules.", type: "website", url: "https://teamframe.cz/glyphflow/en" },
};

export default function GlyphFlowPageEn() {
  return <GlyphFlowLanding lang="en" />;
}
