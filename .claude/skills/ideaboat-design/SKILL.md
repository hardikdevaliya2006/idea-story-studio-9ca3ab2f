---
name: ideaboat-design
description: >-
  Reproduce and extend the Ideaboat marketing-site design language captured from
  the home page and the service detail pages. Use this whenever you are building,
  restyling, or adding a section/page that must look like Ideaboat: the dark-green
  (or light) theme, Sora + DM Sans type, no-shadow depth, glass surfaces, the
  centered rotating-word hero, proof band, service rows with cursor-following
  preview, sticky works stack, and the service detail layout (breadcrumb,
  overview + includes, outcomes, tools, approach, other services, closing CTA).
  Trigger even when the user just says "make it match the home page", "use our
  service-page style", "add a page in the same design", "keep the theme/look
  consistent", or asks for a new marketing section in this repo. Also use it
  when touching the shared primitives in site-chrome.jsx or the tokens in
  styles.css so the design cannot drift.
---

# Ideaboat Design System (home + service pages)

This skill is the distilled design DNA of two pages: the marketing home page
(`src/views/HomeView.jsx` + `src/app/page.jsx`) and the service detail page
(`src/views/ServiceDetailView.jsx` + `src/app/services/[slug]/page.jsx`).
Use it to build new pages/sections that feel native to the site, or to restyle
existing ones without guesswork.

## 1. Source of truth — read before you write

When working in this repo, these files are authoritative. Read the ones relevant
to the task instead of inventing new values:

| Concern | File |
| --- | --- |
| Tokens, utilities, all section CSS | `src/styles.css` |
| Theme, nav, footer, `Reveal`, `Line`, `SpotlightCard`, `CTASection`, forms | `src/components/site-chrome.jsx` |
| Home page sections + hero + works + FAQ + contact form | `src/views/HomeView.jsx` |
| Service detail sections | `src/views/ServiceDetailView.jsx` |
| Service content model + `APPROACH` + `findService` | `src/data/services.js` |
| Home FAQ copy (shared with FAQPage schema) | `src/data/faqs.js` |
| Fonts, theme init script, shared chrome | `src/app/layout.jsx` |
| Per-page metadata + structured data | `src/lib/seo.js`, `src/lib/site.js` |
| Architecture rules | `AGENTS.md` at repo root |

The content model is the single source of truth for service copy. Never
hardcode a service title, tagline, tool list, or CTA into a view — read it from
`SERVICES`/`findService()` so the grid, nav, footer, detail page and schema
cannot drift.

## 2. Design tokens

Colors are OKLCH. The site is **inverted**: `:root` holds the dark theme and
`html.light` overrides it. The `<html>` element ships with `class="light"` by
default; an inline script in the root layout applies the stored choice before
first paint, and `ThemeProvider`/`useTheme` keeps React in sync.

**Dark (`:root`)**
- `--background: oklch(0.145 0.004 165)` near-black green
- `--foreground: oklch(0.965 0.006 165)` near-white
- `--card: oklch(0.195 0.01 165)` raised surface
- `--primary: oklch(0.74 0.17 150)` bright mint green
- `--primary-foreground: oklch(0.16 0.02 165)`
- `--muted: oklch(0.215 0.01 165)` / `--muted-foreground: oklch(0.73 0.014 165)`
- `--border: oklch(0.29 0.012 165)` (also `--input`, `--wire` is fainter)
- `--accent: oklch(0.32 0.07 190)` teal; `--ring` = primary

**Light (`html.light`)**
- `--background: oklch(0.975 0.003 165)` near-white green cast
- `--foreground: oklch(0.25 0.018 165)` deep green-ink
- `--card: #fff`
- `--primary: oklch(0.54 0.14 152)` deeper green for contrast on light
- `--primary-foreground: oklch(0.98 0.01 160)`
- `--muted-foreground: oklch(0.46 0.018 165)`, `--border: oklch(0.9 0.01 165)`
- Footer stays dark in light mode via `html.light .site-footer` token overrides.

**Shape, type, layout**
- `--radius: 1.25rem`; Tailwind `rounded-2xl`/`rounded-3xl` and 24px panels are common; hero frames use `2.75rem`.
- Display font: **Sora** (`--font-display` / `--font-sora`); body: **DM Sans** (`--font-sans` / `--font-dm-sans`); eyebrows, indices, labels: `ui-monospace` (mono).
- `--site-max: 1280px`; `--site-gutter: clamp(24px, 5.56vw, 80px)` (16px ≤640px, 12px ≤480px). `.page-container` = `width: min(100% - var(--site-gutter) * 2, var(--site-max)); margin-inline: auto`.
- Section rhythm: `space-y-16 md:space-y-24` on `main`; panels use 24px radius and 1px borders.
- **Shadows are banned globally** — every `--shadow-*` token resolves to `none`. Depth comes from 1px borders, inner highlight rings, gradients and `backdrop-filter` blur. Never reach for `shadow-*`.

Utility classes worth reusing: `.glass` (blurred translucent surface), `.glass-text` (vertical gradient text), `.surface-sheen` (primary-button look), `.hero-soft` / `.hero-aura` / `.hero-frame` (hero wash + inset frames), `.hero-feature-icon`, `.spotlight-card`, `.wire`, `.texture-grain`, `.letter-swap`, `.line-mask`, `.marquee`.

## 3. Shared primitives (use these, don't rebuild them)

- `<Reveal delay={ms}>` — wraps any block with `.reveal` + inline `transitionDelay`. Each page calls `useReveal()` once; it adds `.in` on intersection at threshold 0.15. Under no-JS, content stays visible (`.js .reveal:not(.in)` hides only when JS exists); under reduced motion reveals are instant.
- `<Line delay={ms}>` — `line-mask` headline line that rises into view (hero).
- `<SpotlightCard>` — `group relative rounded-2xl border bg-card`; tracks `--mx/--my` on pointer move; CSS `::before` draws a primary border glow and `::after` a soft fill, both fading in on hover. Use for outcomes/approach cards.
- `<CTASection title text />` (`CTASection` alias of `CallToAction`) — the shared closing CTA.
- Section header pattern: mono uppercase eyebrow + Sora title (`clamp(2rem, 4.6vw, 3rem)`, weight 400, `-0.045em`, `text-wrap: balance`) + optional pill action with circular icon. The home page wraps this in a local `SectionTitle`; copy that shape on new home-style sections.
- Primary buttons: add `.surface-sheen` for the gradient/outline/highlight-ring look; keep positioning in your own class. The arrow icon rotates up-right on hover (`group-hover:rotate-45`).
- `EnquiryForm` / home `ContactForm` are client-side only: they show a success state, do not post anywhere yet. Keep that contract.

Motion rules: reveals use `1s cubic-bezier(.2,.7,.2,1)` with `translateY(40px)` + `blur(6px)`; stagger children by 50–120ms (`delay={i * 80}`); hover transitions 0.2–0.5s; marquees 30s linear. Reduced motion must disable animation/transition globally and reveal everything instantly.

## 4. Home page anatomy (in order)

Read `HomeView.jsx` while following this sequence.

1. **Hero** — `min-h-[100svh]`, centered, `hero-soft` radial wash. Layered decorations: two faint inset `.hero-frame` outlines + `.hero-aura` glow + `HeroTechIcons` (nine drifting brand chips, `xl` and up). `h1` is Sora 4xl → 7xl, lines via `<Line>`; the rotating word sits in a bordered box with four corner brackets, measured width, and per-letter `letter-swap` animation (2.2s timer). Subhead + two CTAs (solid "Start a Project", glass "Book a call") + overlapping brand avatars with "200+ brands trust our crew". A three-up feature strip pulls `SERVICES[0]`, `[5]`, `[6]` with hairline separators — copy stays in sync with data.
2. **Proof band** — one ruled, rounded, blurred surface holding two metrics, a fill-up CTA ("Start your project", sweeps from bottom on hover), a hovering-paused service marquee, and five stats. Each metric/fact has a `.proof-sweep` hairline that grows on hover.
3. **Why / reasons** — `SectionTitle`, then `.reasons-band`: a 4-column (1 → 2 → 4) hairline-divided grid. Each reason has an icon chip, `01` index, title, copy, and a "Learn more" link with a rule that fills on hover.
4. **Services** — `SectionTitle` with a "Book a call" action. `ServicesList` is a divided list of rows (mono index, large Sora title, "Starts from ₹…", diagonal arrow) with a theme-aware image preview card (`-4deg`, scale + fade) clamped to the list bounds. Preserve the current interaction: one **rAF lerp loop** eases position, scale and tilt together (not a CSS `transition: transform`, which restarts on every pointer move and feels laggy); tilt is **velocity-based** (`rotateX`/`rotateY` from pointer speed, clamped, decaying to flat ~90ms after the pointer stops); the interaction has a **magnetic pull** — position uses a damped spring (`stiffness 0.13`, `damping 0.74`) so the card overshoots and settles, its vertical target is 65% the hovered row's centre + 35% the pointer, and a small pull toward the list centre draws it in; the active title drifts toward the cursor via a `--mag-x` custom property (`.service-mag-title`); the card scales to 1.03 on hover; it appears at the cursor rather than gliding from the corner; the active row turns mint while its neighbors dim; reduced motion snaps instantly and skips tilt and title drift; the loop parks itself when settled and clears its `running` flag on unmount so StrictMode's dev effect replay cannot strand it. On mobile the preview is hidden.
5. **Recent work** — `SectionTitle` + `WorksStack`: cards are `lg:sticky` (top `96 + i*40px`) in a 3-column grid. A single rAF scroll loop sets `--stack` per card to dim it as the next covers it; desktop-only, off under reduced motion. Each card: index/title/category/time, theme-aware 16:10 image, tech pills, "Book a call".
6. **Testimonials** — `TestimonialCarousel` component.
7. **FAQ** — two columns: sticky heading + "still have a question?" card; right side accordion from `HOME_FAQS`. Open item gets `border-border bg-card`, closed item `bg-muted`; the plus rotates 45° into an ×; answer uses `grid-rows-[0fr]→[1fr]` + opacity.
8. **Contact + voyage** — two columns: floating-label `ContactForm` (topic pills, 300-char counter, success state) beside `ContactVoyageScene`.
9. **Closing CTA** — shared `CallToAction`.

## 5. Service detail page anatomy (in order)

Read `ServiceDetailView.jsx` while following this sequence. The server page
(`src/app/services/[slug]/page.jsx`) uses `generateStaticParams` +
`dynamicParams = false`, validates the slug with `findService()`/`notFound()`,
and emits `createMetadata`, `breadcrumbSchema` and `serviceSchema`.

1. **Breadcrumb** — visible `Home / Services / <title>` with chevrons, mirrored in `BreadcrumbList` JSON-LD.
2. **Compact identifier** — `h1` (Sora 2xl → 3xl, semibold) + tagline on the same baseline.
3. **Overview + includes** — a `.glass rounded-3xl` two-column panel: left = "How we approach it" heading (Sora 3xl → 4xl, weight 400), overview copy, "Book a call" button; right = "what's included" check-list as a 2-column grid of bordered cards with green check chips.
4. **Outcomes** — "What changes once it's live": 4-column `SpotlightCard`s with a large ghost number (`01`, `text-primary/40`) that lights on hover and the outcome text.
5. **Tools** — "What we work with": wrapped rounded-full bordered pills.
6. **Approach** — "Discover, plan, build, scale": 4-column `SpotlightCard`s from `APPROACH` (Discover / Plan / Build / Scale), same ghost-number treatment plus title + copy.
7. **Other services** — 4-column bordered link cards with title + rotating arrow; derived from `SERVICES.filter(...)`.
8. **Closing CTA** — `<CTASection title={s.ctaTitle} text={s.ctaText} />`.

Section headings on this page are consistently Sora `3xl → 4xl`, weight 400, `-0.045em`, with `mb-8 md:mb-12`; grids are `gap-4 sm:grid-cols-2 lg:grid-cols-4`.

## 6. Content & voice

The service records in `src/data/services.js` carry: `slug`, `icon` (a lucide
component), `title`, `short`, `intro`, `tagline`, `overview`, `includes[]`,
`tools[]`, `outcomes[]`, `ctaTitle`, `ctaText`, and optional `navTitle`.
`APPROACH` is a `[title, description][]` array; `findService(slug)` is the lookup.

Copy voice: plain, direct, benefit-led, "we" voice, contractions, short
sentences, no hype or superlatives. Taglines are punchy fragments ("Less manual
work, fewer dropped handoffs", "A site that loads fast and asks for the sale").
Headlines are understated; the visual design carries the drama.

## 7. Visual artwork & interaction patterns

- Service artwork lives in `/public/services` as light/dark PNG pairs (filenames percent-encoded). Pick with `theme === "light" ? pair.light : pair.dark`.
- `ServicesVisuals.jsx` holds the per-service code-drawn scenes; `ServiceProcess.jsx` + `ImpactScenes.jsx` drive the four-step process (4:3 panel, blur-crossfade, rail fill from a single rAF loop, pauses on hover/focus/offscreen); `ServicePreviewArt.jsx` is the nav art. `AnimatedDotField` and `AgentFace3D` are browser-only and must stay inside `ClientOnly`.
- Footer wordmark fills the letter silhouette with a cursor-following light pool (SVG mask + `--glow-x/--glow-y`), hidden on touch/small screens.
- Nav: transparent at rest, condenses into a 680px glass pill on scroll (wordmark swaps to the sailboat emblem); one sliding `.nav-pill` follows hover/active; Services dropdown is a portaled glass panel of icon-and-copy rows; below `lg` a full-screen dark sheet with expandable Services.

## 8. Workflow for adding a page/section in this style

1. Decide which page family it belongs to (home-style marketing or service-detail) and read that view plus `styles.css`/`site-chrome.jsx`.
2. Wrap content in `.page-container` and a `main` with `space-y-16 md:space-y-24`; keep mobile-first breakpoints (inline nav/works stack/process columns switch at `lg` = 1024px).
3. Compose from the shared primitives (`Reveal`, `SpotlightCard`, `CTASection`, `surface-sheen`, `glass`) instead of new one-off surfaces.
4. Pull all service/FAQ copy from the data modules; never duplicate it.
5. Export metadata with `createMetadata` and add structured data where relevant (`faqSchema`, `breadcrumbSchema`, `serviceSchema`).
6. Keep browser-only code lazy (`ClientOnly`) and all motion disabled under `prefers-reduced-motion`.
7. Plain JavaScript only (`.js`/`.jsx`, no TypeScript). Build uses `next build --webpack`; keep `next.config` plain `.mjs`.

## 9. Common mistakes to avoid

- Adding any `shadow-*` utility — shadows are globally disabled; use borders, rings and gradients.
- Copying the primary-button gradient into a component instead of using `.surface-sheen`.
- Hardcoding service/tagline/tool copy in a view instead of reading `services.js`.
- Running canvas/three.js during SSR, or forgetting `useReveal()` on a page that uses `Reveal`.
- Letting a light theme produce a light footer, or a low-contrast primary.
- Breaking the 1 → 2 → 3/4 column mobile-first grids or the 1280px/gutter alignment.
- Animating under reduced motion, or hiding `.reveal` content when JS is unavailable.
