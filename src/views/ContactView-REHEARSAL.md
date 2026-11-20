# Rehearsal: contact page redesign

A stageshow-lens restructure of the real `/contact` page: a new look built to
the same craft and framing rules used for the Services bento, the footer
walkthrough and the home-page pass. No new stage or faux product — the live
page is the subject.

The brief was "restructure, redesign, new look", with all copy, links and form
behaviour preserved.

## The new composition

1. **The invitation** — a mono eyebrow (`01 / Get in touch`), one large display
   heading with the key phrase in the brand green, a single lead sentence, and
   the four "good fit" project lines in a quiet bordered panel at the page's
   own inset. No dead corners: the panel runs the full content column.
2. **The workspace** — `lg:grid-cols-[0.85fr_1.15fr]`. One focal surface (the
   form) on the right; a quiet support rail on the left carrying the real
   contact routes, the address and the first-call talking points. Every real
   word is on something the story is about; the rail is the filler that gives
   the form room.
3. **The process** — the three "What happens next" cards became one connected
   rail: a hairline behind three numbered stops, horizontal at `md` and
   vertical below it. Removed the "01/02/03" display numerals that competed
   with the step numbers.

## Craft decisions

- **One accent, said once.** The eyebrow rules, step marks, tick marks and
  direct-line icons all use `--primary`; the send button reuses the site's
  shared `.surface-sheen` (colour/fill only, no copied gradient).
- **No shadows.** Depth comes from borders, the `glass` surface, the corner
  wash on the form and z-order — as everywhere else on this site.
- **One icon family.** Every icon is lucide-react at a consistent size and
  weight; no hand-drawn marks or invented logos.
- **Real content where it matters.** Phone, email and address come from
  `siteConfig`; subjects come from the shared `SUBJECTS` export. No duplicated
  contact route lower on the page.
- **Floating labels** match the home contact form's language: 11px raised
  label on focus/fill, 4px focus ring, same 16px control radius.
- **Restrained motion.** The page keeps `Reveal` for staggered arrivals; no new
  timeline was added. Reduced-motion still shows everything (the site's
  global `prefers-reduced-motion` rule clears `.reveal`).
- **Payoff.** Submit swaps to a centred confirmation — a filled check disc,
  "Message sent", a line personalised with the first name, and "Send another
  message" that resets the controlled fields.

## Verification

- `npm run build` passes (webpack build, 23 static pages).
- Captured `#main-content` at 1280 and 390 in light and dark with
  `_services-shot.mjs`; frames in
  `C:/Users/hardi/AppData/Local/Temp/opencode/services-shots/` under
  `contact-redesign*`.
- Exercised the form with puppeteer: empty state, filled/focused state
  (floating labels + focus ring), submit → success, and "Send another"
  resetting the fields. Headings, labels and contact values stay legible in
  both themes at both widths.

## Not checked

- Native `<select>` option-list styling is browser-dependent; only the closed
  control was captured.
- Hover states were checked visually via the class rules, not by moving a
  pointer through every breakpoint.
- The stageshow `film.mjs --gate` loop is not applicable — this is a live page,
  not an isolated kit `Stage`.
