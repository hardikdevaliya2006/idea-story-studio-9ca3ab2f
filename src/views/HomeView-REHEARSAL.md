# Rehearsal: home page sections (hero → footer)

A stageshow-lens refinement of the real home page, not a new faux stage. The
brief was to polish every section between the hero and the footer while keeping
all copy and behaviour. Judged against `references/craft.md` (restraint, type,
spacing and alignment, colour, icons) and `references/framing.md` (one gutter,
no dead corners, only filler bleeds), the same lens used for the Services bento
and footer walkthrough in this repo.

Captured before and after with `_services-shot.mjs` at 1280 and 390, in light
and dark: the top stats/marquee strip, `#main-content` (stats → contact) and
the FAQ and services sections in close-up. Frames live in
`C:/Users/hardi/AppData/Local/Temp/opencode/services-shots/` with the `home-`
(before) and `home2-` (after) prefixes.

## What the frames showed, and what changed

- **Top stats + marquee** — the gradient numbers were too faint over the dark
  ground. `glass-text` now runs from full foreground to 78% instead of 55%,
  so the figures hold their weight in both themes without losing the sheen.
  Marquee words went to 90% opacity and are `select-none`.
- **Stats strip** — unchanged structurally; it now reads clearly with the
  stronger number treatment.
- **Why Ideaboat** — cards were top-heavy with a void before the rule and link.
  Tightened padding (`p-5 sm:p-6`), heading gap (`mt-8` → `mt-6`), rule gap
  (`mt-6` → `mt-5`) and link gap (`mt-4` → `mt-3`); gave the icon the same 1.8
  stroke as the hero features, the copy a 1.6 line height, and the link a
  primary-colour hover. Content and the four `/about` links are untouched.
- **Our services** — gave each row a `group` so the title and arrow pick up the
  primary colour on hover, which now matches the existing image preview; the
  index is mono/tabular, the price is `whitespace-nowrap`, and the row pitch
  eased from `py-7` to `py-6`. No links or prices changed.
- **Our works** — the scroll-stack dim was so strong (brightness 0.55, scale
  0.92) that scrolled-past cards looked muddy and inconsistent. Reduced to
  brightness 0.72 / scale 0.95; the cards still recede, but stay legible. Card
  padding went to `p-4 sm:p-5`, category/time to 13px with relaxed leading,
  and Details picked up the same hover treatment. The desktop-only effect and
  all content are intact.
- **Testimonials** — quote type to 17px/1.6, mark to 40px, role to 13px, card
  padding to 24/28px. A second stageshow pass kept the marquee and
  hover-to-focus but rebuilt each card's reading order (quote mark and result
  chip on one line, the words in the middle, a tone-coloured initials avatar
  with the name at the foot), swapped the two opaque edge slabs for a mask
  fade, and added a real pause/play control. All six quotes, names, roles and
  stats are unchanged; under reduced motion the row becomes a scroller.
- **FAQ** — the 60px title outweighed the 18px answers. Capped at 48px, gave
  the intro copy 15px/1.6 and a wider measure, opened the row spacing to
  10px, made the toggle 32px, and added a focus ring. The "Email us" button is
  now the primary green used by every other CTA instead of a one-off white
  pill. All six questions, answers and the accordion logic are unchanged.
- **Contact + closing CTA** — only polish: focus rings on topic chips, the
  send button and "Send another"; tabular counter; chip labels no longer wrap.
  The Final CTA card was already on the site's shared language and was left as
  is; it now sits consistently against the refined contact form.

## Redesign: the band between the hero and "Reasons to come aboard"

The supplied frame showed three separate surfaces with two empty bands: a pale
two-stat bento with a CTA, a full-bleed services marquee, and a five-stat card —
with the 280+ figure said twice and 743k/420K followers competing. Judged with
`craft.md` ("say it once", no empty bands, one accent) and `framing.md` (one
gutter, no dead corners), they are now **one ruled proof band**:

- **Tier 1 — lead metrics + destination.** The two headline figures and the
  "Start your project" CTA sit in one 3-column grid (1fr / 1fr / 1.5fr). The
  CTA is the focal object: a mint wash that fills solid primary on hover, with
  the arrow circle rotating. All copy and the `#contact` link are unchanged.
- **Tier 2 — the service ticker.** The marquee moves inside the same surface,
  separated by hairlines, with a mask fade at each end instead of two opaque
  gradient slabs. All eight service words, the pause-on-hover and the 30s loop
  are unchanged; the type is smaller so it reads as a ruled band, not a second
  headline.
- **Tier 3 — the supporting facts.** The five smaller figures are now a quiet
  footer row inside the same panel with hairline dividers rather than a second
  glass card. The odd last cell spans both columns on phones, so there is no
  dead corner.

Captured as `home3-proof-*` (1280/390, light/dark) and `home3-context-*`. The
main element's top padding was reduced because the proof band now owns the
rhythm above "Reasons to come aboard".

## Polish: the "Reasons to come aboard" cards

The supplied frame showed four equal cards with pale marks, a tiny 12px index
and a large void above the footer rule. Kept the four-card grid, every heading,
description and `/about` link, and the shared surface language; changed only
the card's internal hierarchy:

- The index is now a 24px display numeral at 20% foreground instead of a faint
  12px micro-label. It fills the top-right of each card and gives the row an
  editorial rhythm without adding a second mark.
- Icon tiles sit at the top-left with a stronger hairline (`border-primary/25`)
  and keep the primary fill on hover; the glyphs share the 1.8 stroke used
  elsewhere.
- Tightened the heading tracking, restored 14px body copy, reduced the spacer
  to a measured 20px and pulled the footer rule and "Learn more" closer to the
  copy. The arrow now nudges right on hover.

Captured as `reasons-before-light-1800.png`, `reasons-after-light-1800.png`
and `reasons-final-*` at 1280/390 in both themes. The equal-height card grid
and its footer pattern were intentionally kept — shortening the cards would
have produced a ragged row.

### Second pass: one ruled surface

The follow-up frame still read as four equal bordered boxes floating on the
page with a dead band above each rule — the "boxed" and "flat" failure modes
from `stageshow`. Kept every heading, description, icon and `/about` link, and
recomposed the row as a single `.reasons-band` on the same language as the
proof band above it:

- One panel, one radius set, one accent. Hairline dividers separate the four
  cells (vertical from `sm`, horizontal on phones) instead of four gaps and
  four borders, so the section now reads as one object with four parts.
- The rule and "Learn more" follow the copy at a measured 20px instead of
  being bottom-anchored behind a `flex-1` spacer. The empty band is gone; the
  small space that remains under each link is breathing room, not a void.
- The index grew to a 28px display numeral at 22% foreground and the icon is a
  true circle; on hover the cell washes, the icon fills primary, the rule
  sweeps and the arrow nudges. Reduced-motion drops those transitions.

Captured as `reasons-now-*` (the four-box state) and `reasons-after-*` at
1280/390 in light and dark, plus `reasons-hover-light-1280.png`. Cell hover
was exercised interactively, not just inferred.

### Third pass: the title and the cell components

The follow-up asked for more polish on the heading and the cards themselves:

- The section no longer goes through `SectionTitle` (which never rendered its
  `eyebrow` prop) and owns a simple, larger balanced heading block instead.
- The icons grew to 48px circles and the index to a 30px numeral at 18%
  foreground, so the top row reads as one measured unit.
- "Learn more" is now a real component: a circular arrow chip with a hairline
  border that fills primary on hover. The rule sweep, cell wash and icon fill
  hand off to it, and the focus ring sits on the link.

### Fourth pass: remove the label, lock the alignment

The eyebrow and the coloured word in the title read as generated decoration,
so both are gone — the heading is now one plain, balanced line. The cells were
also ragged: the first title wraps to two lines at desktop width, which pushed
its body, rule and link below the other three.

- From `lg`, each title reserves two lines (`min-height: 2.7em`) and each body
  reserves two (`3.2em`), so the icon row, heading, copy, rule and link all sit
  on one shared baseline across all four cells. The footer is bottom-anchored
  with `margin-top: auto` and a fixed 20px lead-in, and the old 280px
  `min-height` is gone — that was the source of the empty band under the links.
- Below `lg` the reserved heights are dropped so cards flow at their natural
  height; forcing two lines there left an awkward gap under single-line titles
  on phones.

Measured at 1280 with puppeteer: all four cards report identical offsets —
icon 28, index 28, title 98, copy 155, rule 219, link 232 — and height 286.
Captured as `reasons-v4-*` at 1280/390 in light and dark. Copy and `/about`
destinations are unchanged.

### Fifth pass: separators on every card

The last frame exposed two gaps: the middle pair had no vertical divider at
all (the old `2n+1` rule only separated cells 1/2 and 3/4), and the green rule
accent only appeared on hover. Both are fixed:

- From `lg`, `:not(:last-child)` gives every cell a right hairline, so the four
  columns are separated all the way across, not in pairs.
- The primary dash under each card now rests at 32px and sweeps to full width
  on hover, so the separator accent is present on all four cards at rest.

Verified the computed borders at 1280 (1px / 1px / 1px / 0px) and captured as
`reasons-v6-*` at 1280/390 in light and dark.

## Polish: the "Our works" stack

The supplied frame showed four stacked project cards that were greyed out and
muddy even at rest, with a wide solid-green CTA repeated on every card.

- **The depth calculation was wrong.** Progress used the gap to the next card
  divided by `window.innerHeight`, so a card was already ~50% dimmed while it
  was the active one. It now measures how far the next card has travelled into
  the current card's own height: `0` at rest, rising only as the next card
  covers it. Verified at 1280: `0/0/0/0` at rest, then `0.681/0/0/0`, then
  `0.882/0.197/0/0`.
- Depth is now a scrim of the page ground driven by a `--stack` custom property
  instead of a `brightness()` filter, with the scale on the same value. A
  single rAF-throttled scroll loop writes the variable; reduced motion drops
  both. Sticky stagger opened from 24px to 40px so the layers read.
- The card keeps its three columns but the side columns now have a hairline
  footer under the "Details" link and "Book a call", which turns the former
  dead space into deliberate breathing room. The index is mono/tabular, the
  image is a 16:10 crop that zooms on hover, and the CTA is a quiet outline
  pill that fills primary on hover instead of a loud solid slab.

Captured as `works2-*-step0..3` at 1280/390 in light plus `works2-dark-1280`.
All project copy, tech chips and the `#contact` links are unchanged.

### Artwork from `public/services`

The supplied folder holds a light and a dark rendering of four disciplines.
Those now replace the old `src/assets/svc-*.jpg` files in both places they were
used — the works cards and the services hover preview — with `useTheme()`
picking the variant. Paths are percent-encoded because the filenames contain
spaces (and the original "develoment"/"ligth"/"desing" typos are preserved).

Mapping: Zenith → app development, Aura → branding & design, Nova → web
design, Pulse → digital marketing; the services preview follows its own row
order. Verified all eight paths resolve at both themes and captured as
`works-images-{light,dark}-1280.png`.

## Section titles: one composed header system

All four home section headings were bare Sora lines; the `eyebrow` prop was
passed by three callers but never rendered, and "Reasons to come aboard" used a
separate `.why-title` rule. They now share one `SectionTitle` component and one
CSS block (`.section-head`) built from the site tokens:

- a mono uppercase eyebrow — an index in `--primary`, a 26px primary rule, and
  a short label (`Why Ideaboat`, `What we do`, `Selected work`, `Kind words`);
- a Sora display title at `clamp(2rem, 4.6vw, 3rem)`, weight 400, `-0.045em`
  tracking and balanced wrapping, up from the old 30/36px scale;
- an optional action restyled as a pill with a circular arrow chip that fills
  with `--primary` on hover, aligned to the title's baseline at `md` and above.

Nothing else changed: all titles, links, copy, the carousel's own Pause control
and every section below are untouched. Captured with `_title-shot.mjs` (the same
harness as the other passes) at 1280 and 390 in light and dark.

## Verification

`npm run build` passes (webpack build, all 23 static pages generated). Before
and after frames were compared at every width and theme listed above; no copy,
link, form action, scroll effect, reveal, marquee or accordion changed.

## Not checked

- Hover states were inferred from the markup and hover classes, not exercised
  interactively at every breakpoint.
- The stageshow film gate is not applicable here — these are live site
  sections, not isolated `Stage` scenes. `_services-shot.mjs` hides the header
  and scrolls each section so every `Reveal` has fired before the still.
- The eyebrow labels and 01–04 index are new visible copy; they are navigational
  furniture, not page content, and can be dropped by removing the `index` /
  `eyebrow` props without touching the titles.
