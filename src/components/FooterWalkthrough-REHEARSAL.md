# Rehearsal: Footer walkthrough

Gold: `examples/home-walkthrough` (studied `index.tsx`, `home-walkthrough.css`,
`poster.png` and `states.png`). Kept its dark palette (#0c110f / #171c19),
mint accent, hairline rows, uppercase mono micro-labels, pill CTA and compact
redesign approach. Changed the subject from the home page to the footer, and
used the real footer's own hollow, cursor-follow wordmark as the signature
instead of the gold's feature cards. The three supplied footer references
(MindCloud, Agno, Invertase) informed the connect strip and legal row.

Wordmark hover: observed live at sheryians.com with headless Chrome (loading
the SPA, scrolling to the footer and moving the pointer across the wordmark in
six steps). Its signature is a 360px blurred accent disc that follows the
cursor in both axes behind a mask of the lettering, so a soft round pool of
light travels over the outline letters. Replaced IdeaBoat's old linear band
with the same two-axis radial treatment (a 190px bright core inside a 360px
halo) in both the live footer and this demo, keeping IdeaBoat's green and its
existing ease-in / slow fade-out timing.

Beats (~17s loop):
1. Rest on the finished footer.
2. Cursor enters and sweeps the wordmark; the glow band tracks the pointer and
   the "Cursor-follow glow" note names the effect.
3. Cursor drops to Company; links light top-to-bottom as it passes.
4. The two service columns, same relationship; previous column clears in a
   bottom-to-top stagger during the travel.
5. The connect strip: email, phone, three social marks and the Book a call pill
   light in reading order as the cursor crosses them.
6. The legal rule draws, then retracts as the cursor returns to the wordmark.
7. Payoff: the whole wordmark fills green and holds for 1.7s.
8. Wash, glow, note and cursor leave together; 0.85s of calm, then the loop.

Captured: 1280 and 390 wide in headless Chrome with puppeteer-core, reading
frames at each beat plus the reduced-motion poster at 1280. The wide stage is
1120×580, compact 358×600 - both tightened after the first pass showed empty
bands; compact drops the address, wraps long service links at 11px and stacks
the connect strip.

Gate: not run. This is a custom React/CSS scene rather than a kit `Stage`, so
`film.mjs --gate` has no kit stage to attach to. The visual rules the gate
enforces were checked by eye against the captured frames instead.

Film notes:
- `empty pane` (first pass, both widths): void between the wordmark and the
  columns - fixed by shortening the stage.
- `tight inset` (first compact pass): the longest service link touched the
  right edge - fixed with 11px type and wrapping.
- Faint wordmark outline at rest (first pass): raised the stroke flood from
  26% to 45% so the letters read against the dark ground.
- Lingering highlights (connect pass): `clearLinks` left the top link lit
  because progress never reaches exactly 1 - fixed by rounding the keep count.
- Cursor parked past the last control on compact (connect pass): `connectLeft`
  / `connectRight` now measure the first and last connect items, not the strip.
- Poster: the payoff frame is used under `prefers-reduced-motion` - full green
  wordmark, note visible, cursor hidden, one link lit; no timeline runs.

Review: the eye lands on the glowing wordmark first, then the green link as the
cursor reaches each column, then the lit connect strip and drawn rule; one
object leads throughout.

Assumptions: this is a noindex preview route (`/stageshow/footer`). It mirrors
the live footer's real data - address, phone, social links and legal routes -
kept as plain strings so the shot stays self-contained.

Unresolved: none observed in the captured frames.

Not checked: a real touch device (the tour is cursor-driven; compact layout was
checked by width only), Safari/Firefox rendering of the SVG mask filter, live
frame rate on a device, and a film at the strict requirement's `--width 390`
gate (no kit stage).
