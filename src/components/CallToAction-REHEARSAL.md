# Rehearsal: shared closing CTA card

A stageshow-lens pass on the live `CallToAction` panel — the same lens used for
the Services bento, the footer walkthrough and the home/contact page passes. No
new `Stage`: the live section is the subject, and every copy, link and form
behaviour is unchanged.

Gold: none copied. Judged against `references/craft.md` (restraint, spacing and
alignment, colour) and `references/framing.md` (one gutter, no dead corners,
only filler bleeds). The card's own `CtaConversation` already carries the
kit-style story (draft → posted → typing → reply, a window inset on three sides
and bleeding off the foot of its well); this pass fixes the composition around
it.

## What the frames showed, and what changed

- **The dead band** — the copy column stretched to the conversation's height,
  leaving the whole lower-left empty under the action. The column now ends in a
  quiet, ruled contact route: one hairline and the studio's real email from
  `siteConfig`, a measured 28px below the button at every width. It is real
  content, not decoration, and it sits roughly level with the chat's composer
  on desktop. No flex spacer is doing the layout's work.
- **Tight control** — the first pass used `margin-top: auto`, which put the
  hairline 8px under the button at 900 and 390 (it read as touching). A fixed
  28px gap fixed all widths without changing the desktop composition.
- **Faint support copy** — `--cta-muted` went from 70% to 78% of the ink so
  "Let's talk." and the email hold their weight over the dark green ground, the
  same call made for the home page's stats and support lines.
- **Chat type** — bubbles to 12.5px/1.4 and the run gap to 12px, inside the
  craft rules' 11–15px / 1.3+ / 8–12px bounds. The composer still clears the
  bottom crop at every width (30px at 1280, 29px at 900, 14px at 390).
- **Focus and reduced motion** — the new mail link gets the same mint focus ring
  as the other actions, and the mail hover transform is cleared under
  `prefers-reduced-motion` alongside the existing button rules.

## Verification

`_cta-shot.mjs` captured `#main-content`'s closing CTA at 1280, 900 and 390 in
light and dark on `/services` and `/` (the home variant has a second action and
longer copy). Frames live in
`C:/Users/hardi/AppData/Local/Temp/opencode/cta-shots/` under `before-`,
`after-`, `final-` and `home-`. The `final-` set is the shipped state. Dropdown,
heading, button, secondary link and the chat's play-once timeline were not
touched; the scene was allowed to settle before every still.

`npm run build` passes (webpack build, all static pages generated).

## Not checked

- The stageshow `film.mjs --gate` loop is not applicable — this is a live React
  section, not an isolated kit `Stage`.
- Hover and focus were verified from the class rules and focus styling, not by
  driving a pointer through every breakpoint.
- The home variant was checked at 1280/900/390; the shorter service-detail and
  industry CTAs inherit the same foot and were checked only through the shared
  component at the services width.

## Second polish pass

The conversation's crop was the last compositional fault: on the home variant
its foot stopped 2px short of the panel edge (a near-tangent), while the shorter
service CTA bled 33px. The conversation well now stretches to the copy column at
`>=900px`, so the window's top tracks the headline and its foot crosses the
panel by ~28px on every page. No change below 900px, and no change to this
component's copy, links or email foot. See `CtaConversation-REHEARSAL.md` for the
measured rects and the read-receipt correction that shipped with the same pass.
