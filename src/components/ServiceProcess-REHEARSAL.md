# Rehearsal: "How we turn ideas into impact" (Services process section)

Gold: none copied. Judged against `references/craft.md`, `references/framing.md`
and `references/motion.md`, borrowing interactions but not any product's
identity. The in-repo precedent was `AboutApproach` on `/about`: a 4:3 crossfade
panel beside a rail-driven step list, one rAF loop driving both. This section
keeps that controller and the original step copy; the four views are original
product studies with a drawn cursor.

## The four views

One window fills the panel edge to edge; its contents carry the inset. Each
view tells one short story, can be driven by hand, and uses measured targets
(`useTargets`) so a press lands on the same control at 366px and at 640px.

1. **Discover — Signal search.** A dot-gridded insight console. The cursor types
   a question, picks a suggested question from a panel of icon-and-tag rows, and
   presses Explore. Two finding cards rise with drawn sparklines and scores, a
   "3 opportunities found" chip appears, and a signal trail of three meters
   fills the lower band. Cards can be saved; the back row returns to search.
2. **Plan — Strategy canvas.** A workstream board whose cards have progress
   meters. Selecting "Data map" lifts the card, fills its meter, draws a branch
   into a linked Signal → Blueprint → Launch flow with travelling packets,
   rises four mini bars, rolls `4.2h → 3.5h` and reveals a `+18%` lift.
3. **Build — Agent Studio.** A dark, original workflow tool: a four-step flow
   spine on the left (New lead → Enrich → Decide → Reply), a step configuration
   with syntax-coloured config on the right, a test result, recent runs and a
   quiet status strip. The cursor opens Decide and runs the test; "Routed to
   Sales · 320ms" lands and holds. No editor chrome, tabs, minimap or status
   bar were borrowed.
4. **Scale — Service mesh.** A global-traffic readout with a rolling number, two
   KPI cards (latency bars and an error sparkline), a dotted map of edge → api
   replicas → postgres with flowing traffic, and a capacity meter. Pressing Add
   capacity twice brings up two replicas with `+1` tags, lights new paths,
   rolls `4.2k → 12.4k` and `180ms → 92ms`, and fills the meter.

The cursor is the kit's solid arrow with its hotspot at the click point; it
turns into an I-beam over text, dips on a press and sends one ripple. Scripts
cancel on a step change; each view resets behind the incoming blur and replays.
Under reduced motion only the settled poster of each view is shown.

## Framing, motion, look

Each view is one hero surface with no plate and no shadow. Type and spacing use
container units (`cqw`) with readable floors. Beats have a visible cause, the
payoff holds for about a second, and nothing resets in view. The controller
still pauses on hover, keyboard focus and off-screen; the rail remains the
visible cause of the hand-over.

## Verification (Chrome, `npm run build` + `next start`)

- `npm run build` passes (webpack, 24 static pages); ESLint is clean on both
  changed components.
- Puppeteer at 1280 and 390, light and dark: all four views rendered with their
  own chrome (Discover, Strategy canvas, Agent Studio, Infrastructure) and the
  cursor landed on measured targets at both widths. Frames:
  `C:/Users/hardi/AppData/Local/Temp/opencode/process-shots-v5/`.
- The auto timer advanced 0 → 1 → 2 at ~4s intervals with the pointer away;
  hidden views pause their idle animation. Manual clicks on every step, card,
  chip, suggestion, workflow node, Run button and capacity button answered.
- `prefers-reduced-motion: reduce` showed a complete poster for each step.

Not checked: the stageshow `film.mjs --gate` loop (this is a live React section,
not an isolated kit `Stage`), real touch input, a screen reader, and one
continuous 16-second film of the cycle — the hand-over was sampled by polling
the active step and by clicking.
