# Rehearsal: CTA conversation (shared closing CTA, right column)

Gold: no single gold example copied — an in-place stageshow-lens addition to the
site's shared `CallToAction`, judged against `references/craft.md`,
`references/framing.md` and `references/motion.md`. The previous right column
was a bare email and place on a large empty field; the brief was to make that
space feel intentional.

Framing: one chat window, inset 14px from the top and 8px from each side of its
well, running past the foot of the *panel* so the panel's own rounded edge makes
the crop. The well no longer clips: the earlier wrapper clip left a ~50px empty
band of bare panel under the window, which read as a floating screenshot pasted
in a card. The composer is now pinned to the foot of the window with a 62px
foot below it, so it clears the panel edge by 30px at 1280 and 14px at 390 while
the window itself bleeds ~33px past it. Verified on every page that renders the
shared CTA: the bleed and the composer clearance are identical. The cut crosses
only empty window surface; no control is sliced. The panel is the ground — no
plate, no shadow, depth from a lighter surface and a hairline.

Look: the panel's mint is the only accent. Real words carry the subject; the
status dot, avatar, dots and stamp are the only other marks. The header avatar
uses the real sailboat emblem on a deep-green square (the Lucide glyph in a
mint square was a stand-in), and the wordmark keeps it from reading as a generic
app. The composer's two labels trade places by moving rather than only fading:
the draft leaves upward, the placeholder rises into its slot.

Story (plays once on scroll into view, ~2.7s):
1. A short history sits under the header and a draft waits in the composer.
2. The message posts: a mint bubble rises into the thread, composer clears.
3. A typing pill arrives in the studio's column.
4. The typing hands off to the reply, which holds with a "Just now" stamp.

The poster is beat 4 — the settled frame tells the story on its own, and
reduced-motion visitors get it immediately with no timeline. Messages stay
mounted and are toggled with `data-on`, so the height, opacity and position
all transition; the typing pill and reply overlap on the handoff.

Captured: 1280, 1024, 900 and 390 wide, light and dark, on home and about, at
the draft / sent / typing / settled beats via a temporary puppeteer harness.
Measured element rects at 1280 to set the well height so the composer clears
the crop by ~30px. The 900 pass showed the window narrow but still legible;
no control was cut. Polish pass re-shot 1280 and 390 at the settled beat and
measured panel / window / composer rects on every page using the shared CTA.

Changes from the previous right column: the email, label and place are kept
verbatim from `siteConfig`, moved under the scene as a quiet caption; the email
size was capped so it cannot wrap at the narrow column.

Not checked: the stageshow `film.mjs --gate` loop — this is a live React scene,
not an isolated kit `Stage`, so there is no gate to attach to. Hover states are
unchanged from the rest of the CTA. Reduced motion was checked with an emulated
media feature, not a system preference.

## Second polish pass (crop and receipt)

Two faults the settled 1280 still made visible, both fixed without changing the
copy, the play-once timeline or the reduced-motion poster:

- **A sliver crop on the home variant.** The well was vertically centred, so the
  taller home copy pushed the window's foot to within 2px of the panel edge —
  a near-tangent, not a crop. The well now stretches to the copy column at
  `>=900px` and the window's `min-height` is `calc(100% + 63px)`. Measured on the
  settled frame: the foot crosses the panel by 28px at 1280/900 on both home and
  `/services` (33px before this pass on the shorter copy), and the composer clears
  the edge by 35px at every desktop width. The window's top now tracks the
  headline instead of floating 60–95px below it, which also closes the dead
  top-right corner. Under 900px nothing changed: the well is still 282px and the
  window still bleeds ~49px on mobile.
- **A receipt on the wrong bubble.** `✓ Just now` sat under the studio's
  *received* reply, where no messenger puts a read receipt. It now sits under the
  visitor's own mint bubble, right-aligned in a `--me` stack, and uses
  `CheckCheck` (read) rather than a single check. The reply is a clean last
  bubble, so the payoff carries no stray mark.

Re-shot at 1280/900/390 in light and dark on `/` and `/services` via
`_cta-shot.mjs`; measured window, well and composer rects at each width.
`npm run build` passes. The empty lower third of the thread is deliberate: a
three-message conversation leaves room under the history, and the composer is
pinned to the foot of the cropped window.

## Live-interactivity pass

The brief was to make the CTA card genuinely interactive, not just a decorative
illustration. The stageshow framing and choreography are unchanged: the window
still insets on three sides and bleeds off the foot of its well, the mint is the
only accent, the sailboat avatar and the three-beat intro (draft → posted →
typing → reply) are exactly as before. That intro is now the *demonstration* of
what the composer does; the settled frame it lands on is still the poster, so
the screenshot state and reduced-motion behaviour are preserved.

**Trigger:** the intro runs only once the card is actually reached — held at a
single message while the page is at the top, then played on scroll-in. The
observer is no longer disconnected after the first run: leaving the card clears
any pending timers, and re-entering resets to the opening history and replays
the full beat, so arriving at the card always shows the conversation being
written. A visit therefore replays every time, while reduced motion still shows
the settled frame immediately.

What changed:
- The fixed four `data-on` slots became a message array. Each new message mounts
  as a row with the same grid-rows/opacity/transform entrance, so a visitor's
  message and the studio's reply enter exactly like the scripted ones. The
  composer switches from the decorative two-label crossfade to a real `<input>`
  and `<button>` only once the intro reaches `live`.
- Sending works by click or Enter, is guarded against empty drafts and double
  sends while typing, and clears the draft on send. Replies cycle through four
  short canned lines so repeated exchanges stay plausible; the "Just now" read
  receipt stays on the visitor's own bubble. Under reduced motion the reply is
  immediate and the intro jumps straight to the settled frame.
- The window is now a fixed height instead of `min-height`, and the thread is a
  hidden-scrollbar viewport. New messages can accumulate without pushing the
  composer past the crop. Auto-scroll runs three times (immediately, next frame,
  after the 520ms row animation) because `scrollHeight` is still short while a
  row expands from `0fr`; without the last pass the newest bubble was clipped.
- Once scrolled, an 18px top mask dissolves older bubbles under the header
  instead of slicing them. At rest the first message stays hard-edged.
- Accessibility: the window is no longer `aria-hidden`. The thread is a labelled
  `role="log"`; `aria-live` turns polite only after the visitor's first send so
  the scripted intro is not announced. The input and send button have labels and
  a mint focus treatment, and the send button is disabled while empty or typing.
- The site-wide form rule (`input:not([type="hidden"])`) sits later in
  `styles.css` and outranked a single-class rule, painting a 70%-white pill and a
  46px min-height inside the chat. The input rules are scoped under
  `.cta-conv-field` so the field's dark surface and 34px height win.

Verified with a temporary Puppeteer harness at 1280 and 390: after the intro the
live input is present; typing plus Enter adds the visitor bubble and a canned
reply and clears the draft; a second exchange via the button works and the
composer ends empty. Replay was checked separately: one message at page top, a
settled three-message conversation on first arrival, an immediate reset to one
message on re-entry, the full beat again, and a working send after that replay.
Frames were inspected at both widths. `npm run build` passes. Not checked: real
touch input, a screen reader, or the film gate (this is a live React section,
not an isolated kit `Stage`).

## Product-shot pass (stronger still frame)

Brief: make the same chat read as a real product shot, not a thumbnail pasted
into a wide panel. No gold example was copied (the kit's `messages` folder is
empty in this install); judged against `references/framing.md` (fill and bleed),
`references/craft.md` (restraint, type, status marks) and `references/motion.md`
(caused changes, explicit handoff). Copy, links and the live composer are
unchanged.

**Framing was the fault.** The grid gave the chat only `0.65fr`: the window
measured 252px at 1280 and **156px at 900**, where bubbles and the placeholder
wrapped ("Hi! What are / you building?", "Message Ide"). The body is now
`1fr / minmax(280px, 0.85fr)` from 900 with a fixed 400px seat for the window
from 1200, and the window's side insets were removed so it fills its column.
Measured on `/services`: window **400px at 1280, 280px at 900, 284px at 390**.
The single bottom bleed is unchanged — 28px past the panel at 1280 and 900,
49px at 390; the composer clears the crop by 35px / 35px / 14px. The tight
two-column range scales the headline down (`clamp(1.9rem, 3.1vw, 2.5rem)` at
900–1199) so it stays two lines rather than three. Home's longer CTA was re-shot
at 1280 / 900 / 390 and keeps the same composition.

**Still frame.** "Active now" now renders the mint presence dot its CSS already
styled. The receipt is a two-glyph slot: a single check on delivery, `CheckCheck`
once the studio answers, so the status changes on itself. The studio's answer
also leaves a small tapback on the visitor's last bubble — the one mark that
says the idea landed. It is clipped by the row's entrance mask unless the
outgoing stack reserves 10px, which it now does. The empty lower third of the
thread is deliberate: a three-message history with the composer pinned to the
foot; the rows were not spread to fill it. The scrolled-thread fade went 18px →
24px so an older bubble dissolves instead of leaving a lit sliver.

**Motion.** The typing pill now stays mounted on `handoff` after the reply is
added; `data-leaving` collapses its row over the reply's entrance so the two
hand off instead of one vanishing. Reduced motion settles straight to the final
frame with no handoff state.

**Captured** with a temporary Puppeteer harness (deleted after): open / posted /
typing / leaving / settled on `/services` at 1280, plus a live send (5 messages
and 2 tapbacks, field cleared), the reduced-motion poster (3 messages, 1
tapback — pixel-identical to the settled frame), and `_cta-shot.mjs` at 1280 /
900 / 390 in both themes on `/services` and `/`. `npm run build` and
`npx eslint src/components/CtaConversation.jsx` pass.

**Not checked:** the 280ms handoff was observed in the DOM (`data-leaving`
present) but a screenshot is slower than the window, so the mid-collapse frame
was not photographed; the kit `film.mjs --gate` (live React scene), real touch,
and a screen reader remain out of scope.
