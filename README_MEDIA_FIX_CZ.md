# GlyphFlow – oprava zobrazování screenshotů na TeamFrame

Vychází z právě zaslaného `media.zip` (GlyphFlowLanding.tsx + 7 PNG).

## Vložení do projektu

- **Nahraď** `app/glyphflow/GlyphFlowLanding.tsx` souborem z tohoto ZIPu.
- **Přidej** celou složku `public/glyphflow/` z tohoto ZIPu do kořene webového projektu (na stejné úrovni jako `app/`).
- `app/glyphflow/page.tsx` a `app/glyphflow/en/page.tsx` nech beze změny. Stejně tak neměň TeamFrame, formulář nebo backend.
- Staré obrázky v `app/glyphflow/media/` už nová komponenta nepotřebuje; můžeš je později odstranit, ale není to pro funkci nutné.

## Co je změněno

- Obrázky jsou nyní **statické soubory**, dostupné například na `/glyphflow/tools.png` a `/glyphflow/animation.png`.
- Místo optimalizace `next/image` se používá standardní HTML `<img>`; tato cesta vylučuje problém s Next.js image optimizerem a nezávisí na bundlování obrázků z TSX importů.
- Hero obsahuje skutečné obrázky; vodorovná galerie zachována. Všechny obrázky mají výšku náhledu a `object-fit`, aby nevytvářely obrovské prázdné bloky.
- Příliš dlouhý screenshot hodin byl oříznutý pouze pro webovou ukázku (bez změny originálu u tebe).
- CZ / EN obsah, navigace a beta odkaz zůstávají.

## Rychlá kontrola po nasazení

1. Otevři `https://teamframe.cz/glyphflow/tools.png`. Pokud se neobjeví obrázek, nebyla publikována složka `public/glyphflow/`.
2. Potom otevři `https://teamframe.cz/glyphflow` a `https://teamframe.cz/glyphflow/en`.
3. Pokud se obrázek na přímé URL zobrazí, ale stránka pořád ne, zkontroluj, že nasazený `GlyphFlowLanding.tsx` odpovídá tomuto ZIPu (nová verze obsahuje `<img src="/glyphflow/tools.png"...>`).

*Změna nebyla ověřena plným buildem ani na produkci, protože nemám kompletní Next.js projekt a přístup k nasazení. Struktura statických souborů a odkazy byly zkontrolovány lokálně.*
