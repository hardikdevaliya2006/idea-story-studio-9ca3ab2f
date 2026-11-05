# Ideaboat

Marketing site for Ideaboat — AI automation, custom AI agents and growth systems.

Built with **Next.js 16 (App Router)**, **React 19**, **JavaScript (JSX)** and **Tailwind CSS 4**.
Every page is statically rendered at build time for speed and crawlability.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Environment

| Variable               | Required in production | Purpose                                                                                                 |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes                    | Canonical origin used by metadata, sitemap, robots and Open Graph URLs, e.g. `https://www.ideaboat.com` |

If it is not set, the site falls back to `https://www.ideaboat.com` (see `src/lib/site.js`).
Set it in the hosting dashboard before going live so canonicals and the sitemap point at the real domain.

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the development server         |
| `npm run build`  | Production build (static generation) |
| `npm start`      | Serve the production build           |
| `npm run lint`   | ESLint                               |
| `npm run format` | Prettier                             |
| `npm test`       | Vitest                               |

## Project structure

```
src/
├── app/                 App Router: one folder per URL, each owns its metadata
│   ├── layout.jsx       shell, fonts, theme init, header/footer, Organization schema
│   ├── page.jsx         /
│   ├── about/
│   ├── services/        /services and /services/[slug] (9 pre-rendered pages)
│   ├── industries/
│   ├── contact/
│   ├── book-a-discovery-call/
│   ├── sitemap.js       /sitemap.xml
│   ├── robots.js        /robots.txt
│   ├── opengraph-image.jsx  1200×630 social card
│   ├── not-found.jsx
│   ├── error.jsx
│   └── global-error.jsx
├── views/               Page bodies (client components; SSR-rendered HTML)
├── components/          Shared chrome and animated artwork
├── data/                services.js (source of truth), faqs.js
├── lib/
│   ├── site.js          canonical origin, contact details, defaults
│   └── seo.js           createMetadata + JSON-LD builders
├── styles.css           Tailwind 4 entry, theme tokens, bespoke animations
└── assets/              Images imported by components
```

## SEO

- Per-page `Metadata` (title template, description, canonical, Open Graph, Twitter card, robots) via `createMetadata` in `src/lib/seo.js`.
- Structured data: `Organization` + `WebSite` on every page, `Service` and `BreadcrumbList` on service detail pages, `FAQPage` on the home page.
- `sitemap.xml` and `robots.txt` generated from the same data as the pages.
- Generated Open Graph/Twitter image (`/opengraph-image`, 1200×630).
- Semantic landmarks, visible breadcrumbs, one descriptive `<h1>` per page, skip link, and `alt` text.
- All routes are statically generated; unknown service slugs return a real 404 (`dynamicParams = false`).
- Security headers are configured in `next.config.mjs`.

When you add a service to `src/data/services.js`, the detail page, sitemap, navigation and footer pick it up automatically. See `AGENTS.md` for the two visual lists that still need a manual entry.

## Notes

- Contact and enquiry forms are client-side only; they show a success state but do not post to a backend yet.
- Deploy anywhere that supports Next.js (Vercel, a Node server, or a container).
- The project is plain JavaScript (`.js`/`.jsx`, no TypeScript); the `@/*` alias is defined in `jsconfig.json`.
- `npm run build` runs `next build --webpack`. Some shared hosts (e.g. Hostinger) ship a glibc older than the native SWC binary requires, which makes Turbopack unavailable; the webpack build works with the WASM SWC fallback. `next.config.mjs` is therefore kept as plain JavaScript — a TypeScript config cannot be loaded in that fallback path.
