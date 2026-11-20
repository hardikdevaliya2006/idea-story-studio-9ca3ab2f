# Rehearsal: Industries page — restructured

Gold: no single gold example copied. This is an in-place redesign of the real
`/industries` page, judged against `references/craft.md`, `references/framing.md`
and the same lens already used for `HomeView` and the Services bento in this
repo. The brief was "restructure, redesign, new look" — not a polish pass.

## What was wrong

- The page had **no masthead**. It opened on eight identical cards and buried its
  `h1` ("The workflows where automation creates the biggest impact") in a grey
  panel two sections down.
- Eight equally weighted cards in a 4×2 grid, each with a large void between the
  icon and the title (`mt-8`) and a full paragraph of small text: flat, top-heavy
  and generated-looking. Every card read the same.
- The lower panel restated the page's purpose and used four plus-in-circle
  bullets — real sentences spent on filler framing.
- Big empty band between the card grid and the lower panel; no focal object.

## What changed

- **Masthead** — the page now starts with an eyebrow, a proper `h1` ("Automation
  built for real workflows", already the page's metadata title) and the existing
  lead sentence, moved up from the old lower panel. The four coverage lines are
  no longer bullets in a grey panel: they are a quiet glass satellite card on
  the right, with a numbered row for each real line.
- **Sector index** — the eight cards become a single-column directory of real
  rows: two-digit index, the same Lucide icon at one stroke weight, the sector
  name, and a short factual signal line. One row leads at a time (leading accent
  edge, tinted surface, "Viewing" label); the rest stay quiet.
- **Focus canvas** — a second, larger surface to the right of the directory is
  the hero object. Hover, focus or click a row and it crossfades to that sector's
  full description plus a numbered "Typical automation path" rail. Each path is
  the arrow-chain already written into the description, so the canvas shows real
  words instead of skeleton bars. An eight-tick footer shows position in the
  index. All eight panels stay mounted in one CSS grid cell, so the canvas never
  changes height and content fades rather than swaps.
- **Compact redesign** — below `lg` the canvas is dropped, not squeezed: every
  row keeps its full description and gains a wrap-friendly chip strip for the
  workflow. The masthead and coverage card stack. This is a separate layout,
  not a narrower version of the desktop one.
- **CTA** — the shared `CTASection` is unchanged, including its title, copy and
  `/book-a-discovery-call` link. The `breadcrumbSchema` in `page.jsx` is intact.

## Framing and craft checks

- One lead object (the canvas), one quiet list (the directory), one gutter shared
  with the rest of the site through `.page-container`. No plate or drop shadow
  (shadows are disabled site-wide); depth comes from surface tint and hairlines.
- The canvas is exactly the directory's height at 1280 (578px in both columns),
  so there is no dead column or empty band. This was the largest fault on the
  second pass and was fixed by tightening row padding, not by adding filler.
- Words keep 18–26px insets; two-digit indices are mono/tabular; the active
  tick, icon and label all use the single green accent. No invented marks,
  sparkles or purple. The faint grid on the canvas is `mask`-faded, not content.
- Reduced motion is covered by the site's global rule plus an explicit rule for
  the row and canvas transitions; without JS the rows are plain buttons and the
  first sector is still shown.

## Captured and checked

- `_services-shot.mjs`, at 1280 / 768 / 390 in light and dark, before and after:
  `industries-before-*` and `industries-final-*` in
  `C:/Users/hardi/AppData/Local/Temp/opencode/services-shots/`.
- `_industries-layout-shot.mjs` for the 1:1 two-column framing judgement.
- `_industries-interact.mjs` hovers row 06 and confirms the row, panel title,
  step labels and footer tick all report "Real Estate" / index 06 in sync.
- `npm run build` passes (webpack, all 23 static pages generated).

## Not checked

- The stageshow `film.mjs --gate` loop: this is a live React page, not a kit
  `Stage`, so the gate has nothing to attach to. The still-frame rules it
  enforces were checked against the captured frames instead.
- Touch devices: the tour is driven by hover, focus and click; the compact
  layout was checked by width only.
- `npm run lint` still reports 2816 pre-existing prettier errors in other files;
  neither `IndustriesView.jsx` nor the new CSS adds any.
