<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history - force pushing, or rebasing/amending/squashing commits
> that are already pushed - as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Architecture

- **Next.js 16 App Router.** Pages live in `src/app/*` and only own route metadata + a `generateStaticParams`/`generateMetadata` where needed; the page body comes from the matching `src/views/*` component. Shared chrome lives in `src/components/site-chrome.jsx` and is mounted once in `src/app/layout.jsx` (`ThemeProvider` → header → page → footer), so every page ships the same internal links.
- **Fonts** (Sora, DM Sans) are loaded with `next/font/google` in `src/app/layout.jsx` and exposed as `--font-sora` / `--font-dm-sans`, which `src/styles.css` consumes.
- **SEO is centralised** in `src/lib/seo.js` (`createMetadata`, `organizationSchema`, `websiteSchema`, `serviceSchema`, `breadcrumbSchema`, `faqSchema`) and `src/lib/site.js` (canonical origin from `NEXT_PUBLIC_SITE_URL`, contact details). Each `page.jsx` exports metadata from `createMetadata`; `sitemap.js`, `robots.js` and `opengraph-image.jsx` live in `src/app`. Service detail pages use `generateStaticParams` + `dynamicParams = false`, plus a visible breadcrumb mirrored in `BreadcrumbList` JSON-LD.
- **Theme** is class-based and inverted: `:root` holds dark tokens, `html.light` overrides them. An inline script in the root layout applies the stored theme before first paint; `ThemeProvider`/`useTheme` in `site-chrome.jsx` keeps React in sync and persists changes.
- **Content model:** `src/data/services.js` is the single source of truth for the 9 services and the four `APPROACH` steps. The home-page FAQs live in `src/data/faqs.js` so the accordion and the `FAQPage` schema cannot drift.
- **Adding a service** only needs an entry in `src/data/services.js`: the services grid is a uniform bento (1 column, 2 from `sm`, 3 from `lg`) so cards flow in order, and the header/footer split the list at index 4. `ServiceScene` in `ServicesVisuals.jsx` has per-index artwork and `ServicePreviewArt.jsx` has per-index nav art (both fall back gracefully).
- **Services listing graphics** live in `ServicesVisuals`; the process sequence lives in `ServiceProcess`. `AgentFace3D` (three.js) and `AnimatedDotField` (canvas) are loaded lazily inside `ClientOnly`, so browser-only rendering never runs during SSR.
- **Bento tiles** (`.bento-card` in `ServicesView.jsx`) put the one-line tagline copy along the top and the artwork in a `flex-1` panel at the base; nothing paints its own background, so every tile stays one surface. There is deliberately no hover arrow - the diagonal wash and gradient edge are the only hover feedback.
- **Process section** ("How we turn ideas into impact"): a 4:3 artwork panel stacks the four `ImpactScene`s and blur-crossfades the active one, beside a step list whose rail fills as a timer (`--process-progress` on `.process-steps`). One rAF loop drives both the rail width and the step hand-over so they cannot drift; it pauses on mouse hover, keyboard focus and off-screen, and under reduced motion the rail fill is not rendered and only clicks change steps.
- **AI Agents dots** use the reusable lazy client-only canvas `AnimatedDotField`: an ordered (4x4 Bayer) dither of square dots on a fixed grid; a static per-cell density (dense side edges, clear disc at the icon) plus a slow sum-of-sines wave field is thresholded each ~30fps frame, and the cursor adds a local ripple (window pointer tracking hit-tested, canvas pointer-events none). Colour from `--agent-dither-front`, re-read on theme change; pauses offscreen; static frame under reduced motion.
- **Homepage dropdown artwork** (`ServicePreviewArt.jsx`) is no longer mounted: the navbar dropdown now follows the same icon-and-copy row pattern as the rest of the site.
- **Site navbar** follows todesktop's floating composition: `.nav-shell` is transparent at rest (1128px-wide, links optically centred between logo and actions) and condenses into a 740px glass pill on scroll (logo wordmark swaps to the sailboat emblem). A single `.nav-pill` slides under the hovered or active link, driven by measured item offsets. The Services dropdown is a single-column 472px glass panel of icon-and-copy rows; below `lg` a full-screen `.nav-mobile` sheet has 28px Sora links with chevrons and an expandable Services list. Scroll is locked while it is open and Escape closes it.
- **Home hero** follows todesktop's composition: `.hero-frame` / `.hero-aura` stack the faint inset outlines and top glow, `.hero-mark` holds the sailboat emblem on a gradient-ringed squircle, `.hero-badge` is the mono uppercase line, and the three-up feature strip pulls `SERVICES[0]`, `[5]` and `[6]` so its copy stays in sync. `HeroTechIcons` floats nine inlined brand marks either side of the column on `xl` and up, each drifting on its own timer (still under reduced motion), with a brighter near-solid fill in light mode so they stay legible.
- **Footer hover layers** are masked with a filled-letter silhouette of the displayed outline logo, so the glow fills the inside of each letter while staying within the letter shapes; pointer coordinates come from the shared container.
- **Service detail pages** live at `src/app/services/[slug]/page.jsx`; the server page validates the slug with `findService()` and `notFound()`, and `ServiceDetailView` re-looks-up the record (records hold icon components) and renders the visible breadcrumb + title.
- **Styling:** the primary button's look (gradient sheen, darker outline, inner highlight ring) is the shared `.surface-sheen` class in `src/styles.css`; it carries colour/fill only, so any element reusing it keeps its own positioning in its own class - add the class in markup rather than copying the gradient. Shadows are disabled globally; use borders/rings for depth.
- **Forms are client-side only** (`EnquiryForm`, home `ContactForm`): they show a success state but do not post anywhere yet.
- **Plain JavaScript, no TypeScript.** Source files are `.js`/`.jsx`; there is no `tsconfig.json`. The `@/*` import alias lives in `jsconfig.json`, and type annotations are not used anywhere. `next.config` is plain `.mjs` (see below) and `npm run build` uses `next build --webpack`.
- **Deploy note (Hostinger).** The production host has an older glibc than the native SWC binary needs, so Next falls back to the WASM SWC build, where Turbopack is unavailable. That is why the build script passes `--webpack`, and why `next.config` must stay plain JS: a `next.config.ts` has to be compiled by SWC before it is read, which fails in the WASM fallback path.
- **Responsive rules.** Mobile-first: the header switches from the sheet to the inline nav at `lg` (1024px); the works stack and the process panel switch to two columns at `lg` too; card grids go `sm:grid-cols-2 lg:grid-cols-4`; every page `main` carries `px-6` and `space-y-16 md:space-y-24`. The works-stack scroll effect is desktop-only for the same reason.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
