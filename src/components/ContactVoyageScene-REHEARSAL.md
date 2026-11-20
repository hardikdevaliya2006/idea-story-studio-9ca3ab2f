# Rehearsal: contact voyage

**Gold:** `hero-demo` for the cursor-led, five-beat structure and the corner-straddling satellite;
`subscriptions` for the conveyor reset. Kept the named targets measured from live rects, the two
easing curves, the whole payoff hold and the caused reset. Changed the product, the ground (a
brand-green panel rather than a white page), the story (brief → live site) and the composition
(corner-bled dark workspace window, one small URL chip).

**Beats:** open on the finished workspace → cursor enters from the right margin → press *Set sail* →
the four voyage steps fill in reading order while the brief pane is covered by an opaque live-site
slide → a **Live** badge drops onto the preview → the URL chip strides the window's top-right corner →
2.5s hold on the result → the new surfaces leave as one thing and a fresh brief returns while the
cursor heads back out → loop (10.3s).

**Captured:** 1440×900 and 390×844, light and dark themes, opening / reveal-start / reveal-mid /
reveal-late / payoff, reduced-motion poster, and the real home section at desktop.

**Gate:** the kit's `film.mjs --gate` is not runnable here - this repository is deliberately plain
JavaScript and loads no TSX kit (`AGENTS.md`), so there is no `Stage` or `window.__ssVerification`
to film. Verification used Puppeteer element stills at the widths above plus a computed-state probe
(`--cv-route`, `--cv-reveal-y`, button state, badge/chip opacity) at each frame.

**Film lines → frames → fixes:**
- *Headline crowded the window* → `open.png` → moved the hero from `top: 27%` to `30%` (compact `28%`).
- *Muddy crossfade: brief and preview both half-visible over the dark card* → first `beat-4650.png` →
  replaced the opacity crossfade with a single opaque slide from the bottom; the brief stays whole behind it.
- *`Setting sail…` left on the button after the site was live* → reduced-motion poster → one control,
  three labels in one slot (`Set sail` → `Setting sail…` → `Live now`), derived from scene progress.
- *Empty dark pane in the opening frame* → `open.png` → added three brief placeholder lines and kept the avatar line.
- *Compact card collapsed to zero height* → `compact-live.png` → `.cv-main { flex: 1; min-height: 0 }` in the column body.
- *Cursor crossed the headline on entry* → `open.png` → enter from the right margin at mid-height.
- *URL chip covered a real word in the title bar* → `home-poster.png` → removed the `voyage / 0142` meta; the chip now overlaps chrome only.
- *Brand read "studio", not the product's name* → polish pass → eyebrow and window wordmark now both read **IDEABOAT**; the preview nav uses the real sailboat asset instead of a colored square.
- *White arrow vanished over the light site* → `reveal-mid.png` → the cursor inks itself dark when its measured point is inside the revealed card.
- *Steps lit ahead of the rail, press felt weightless* → polish pass → step state derives from the same route value that fills the rail; dots/labels ease in over 180ms; the button dims 10% and its arrow nudges on press; the Live badge lands with a soft 0.9 → 1 scale.

**Review:** one hero window, one gutter (9%), one satellite; the window is inset on three sides and
bleeds off the foot; real words carry the story (brief, four steps, the button, the live headline)
and bars sit at the edges; one icon family (Lucide) at one size; fixed-label button slot; no shadows
on the site chrome, only the product shot's own restrained depth.

**Assumptions:** the panel is a brand moment, so the green ground is the stage - the dark window is
the product being shown, not a plate on a white page. The in-product copy "Idea to impact." and
`ideaboat.studio` are illustrative placeholders.

**Unresolved:** none observed at the captured frames.

**Not checked:** 40–80ms frame-by-frame press/hand-off/seam inspection at 60fps; the kit's automated
gate verdict; live resize during playback; screen-reader announcement (the scene is `aria-hidden`
with a visually hidden `h2` carrying the headline).

## Polish pass (payoff still)

Fresh-eye look at the captured payoff frame found the one largest fault: the live site's hero had a
dead right-hand void — the headline, supporting bar and CTA all sat in the left half, so the result
read as a half-finished wireframe rather than a launched site. Fixes, in the order of visual weight:

- Filled the void with one quiet flat "growth" graphic (pale-green panel, white stat card, four
  ascending green bars). No sparkles, purple or invented logo — the brand mark stays in the nav.
- Replaced the anonymous gray support bar with a real line, *Design. Build. Grow.*, and gave the
  green CTA its own label, *Explore work ↗*, so the focal element carries words instead of a block.
- Gave the three bottom placeholders an inner thumb + caption line, so they read as content cards
  rather than three equal gray rectangles; the row still crops at the foot as intended filler.
- Compact (358px) keeps the sub line and card structure but drops the graphic — a second layout, not
  a squeeze; the narrow hero has no room for a side panel.

Recaptured at 1440×900 (brief, payoff, reduced poster) and 390×844 (poster): the brief state is
unchanged, the opaque reveal still covers it cleanly, and the payoff holds as one complete surface.
`npx eslint src/components/ContactVoyageScene.jsx` passes. The kit's `film.mjs --gate` remains
unavailable for this plain-JS scene.
