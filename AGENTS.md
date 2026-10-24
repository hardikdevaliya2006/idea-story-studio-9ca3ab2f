<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Migrated from Next.js to TanStack Start: thin route files in `src/routes/*` own `head()` metadata and render the matching view from `src/views/*`; shared UI lives in `src/components/*`. Fonts (Sora, DM Sans) load via link tags in `__root.tsx`.
- Services listing graphics live in `ServicesVisuals`; the process sequence lives in `ServiceProcess` with a lazily loaded client-only Lordicon renderer, so browser animation code never enters SSR evaluation.
- AI Agents dots use the reusable lazy client-only canvas `AnimatedDotField`: an ordered (4x4 Bayer) dither of square dots on a fixed grid; a static per-cell density (dense side edges, clear disc at the icon) plus a slow sum-of-sines wave field is thresholded each ~30fps frame, and the cursor adds a local ripple (window pointer tracking hit-tested, canvas pointer-events none). Colour from `--agent-dither-front`, re-read on theme change; pauses offscreen; static frame under reduced motion.
- Homepage dropdown artwork lives in `ServicePreviewArt`, indexed by service order; hover and keyboard focus share the same preview state so both interactions show identical artwork.
- Footer hover layers are masked with a filled-letter silhouette of the displayed outline logo, so the glow fills the inside of each letter while staying within the letter shapes; pointer coordinates come from the shared container.

- Service pages live at `src/routes/services.$slug.tsx` and are a sibling of `src/routes/services.index.tsx`, so the listing stays a full page and detail pages never render inside it. Add a service by appending to `src/data/services.ts`; both pages read from it.
- The detail route loader returns only the slug/title/intro; `ServiceDetailView` looks the full record up with `findService()` (records hold icon components).
- The services listing is a staggered bento grid: desktop placement comes from a per-index layout list in `ServicesView.tsx` sized for the current service count, so adding a service also needs a new placement entry (otherwise it auto-flows below the grid).


- The primary button's look (gradient sheen, darker outline, inner highlight ring) is the shared `.surface-sheen` class in `src/styles.css`; it carries colour/fill only, so any element reusing it keeps its own positioning in its own class — add the class in markup rather than copying the gradient.
