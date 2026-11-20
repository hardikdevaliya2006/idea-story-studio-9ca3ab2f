# Rehearsal: About page — three-section stageshow redesign

Gold: no single gold example copied. This is a stageshow-lens redesign of the
live `/about` page, borrowing the corner-bleed window-beside-copy framing of
`hero-demo` and the content-changing-in-place discipline of `choreography`.
It keeps the site's own tokens — green accent, Sora/DM Sans, hairline borders,
no shadows — and the Agno / MindCloud / ToDesktop blend the brief asked for:
a technical control-plane label and status row, a connect–automate–deploy
workflow, and real product chrome with a window that bleeds out of its well.

## What changed

The old page was six near-identical grids of `SpotlightCard`s with no masthead.
It is now one editorial reading edge per section, with a miniature product
scene in each of the three sections the brief named:

- **Mission** — masthead copy beside `AboutControlPlane`: one control-plane
  window, a three-node workflow (Connect / Automate / Deploy) and one status row.
- **By the numbers / In brief** — one ruled band and four columns on shared
  rules instead of cards.
- **What we care about** — sticky heading column beside hairline-separated
  value rows.
- **How we work** — `AboutApproach` keeps its rail-driven hand-off but its
  crossfading artwork is now `AboutPipeline`: a Studio window whose body shows
  the current step's real content (signals, strategy map, workspace, results).
- **Meet the crew** — `AboutStudio`, a small presence panel, sits above one
  roster panel of four rows.
- **In their words** — one divided panel of four quotes instead of four cards.

Every original string — mission, stats, pillars, values, step copy, team and
testimonials — is unchanged. New words appear only inside the faux product
screens and as small section labels.

## Beats and payoff

- The control plane resolves `Running → Complete` 1.4s after the section scrolls
  into view. One shot, no loop; reduced motion sees the settled frame.
- The approach rail fills over 4.6s per step while the window holds; at the end
  the hand-over and the blur-crossfade happen together. One rAF loop drives both.
  It pauses on hover, focus and off-screen; clicking a step jumps to it.
- The presence panel is deliberately a still — a second loop would compete with
  the rail.

## Verification

Captured with `_about-shot.mjs` at 1280 and 390, light and dark, one frame per
section (`about-fix-*` in `C:/Users/hardi/AppData/Local/Temp/opencode/about-shots/`).
A second pass clicked all four approach steps and shot the window at each state
(`state-1..4.png`).

- First pass found `Live`, `Deploy` and `4 online` sliced by the right crop;
  all three now sit clear of it. The approach panel was a pale wireframe; it is
  now a real Studio window with words where the eye lands.
- `npm run build` passes (webpack build, 24 static pages). `npx eslint` and
  `prettier --check` pass on every changed source file.

## Not checked

- Hover/focus states were inferred from the markup, not exercised at every
  breakpoint, and the approach timer was stepped by clicking rather than filmed
  as a full 18-second loop.
- The stageshow `film.mjs --gate` loop does not apply: these are live React
  scenes on a real page, not isolated kit `Stage` demos, so there is no gate to
  attach to. Visual rules were checked against the captured frames by eye.
- The `Sailboat` glyph in each window header is the site's own emblem, not an
  invented mark. The presence panel's two named avatar colours are scene-local
  and do not affect the site palette.
