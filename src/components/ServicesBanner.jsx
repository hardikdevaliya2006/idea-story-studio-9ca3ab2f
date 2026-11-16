/**
 * Services banner.
 *
 * A code-drawn replacement for the raster hero strip. The background blobs,
 * type and logo row are layered in the DOM, so the same markup renders the
 * light and dark artwork (colours come from the `.services-banner` tokens in
 * styles.css). Logos live in /public/banner-logos so they can be swapped,
 * removed or left as an empty ring (set `src: null`) without touching the layout.
 */
const LOGOS = [
  { name: "React", src: "/banner-logos/react.svg", className: "h-auto w-[64%]" },
  { name: "Next.js", src: "/banner-logos/nextjs.svg", className: "h-auto w-[60%]" },
  { name: "Node.js", src: "/banner-logos/nodejs.svg", className: "h-auto w-[58%]" },
  { name: "Tailwind CSS", src: "/banner-logos/tailwind.svg", className: "h-auto w-[60%]" },
  { name: "Figma", src: "/banner-logos/figma.svg", className: "h-auto w-[44%]" },
  { name: "GitHub", src: "/banner-logos/github.svg", className: "h-auto w-[60%]" },
  { name: "Shopify", src: "/banner-logos/shopify.svg", className: "h-auto w-[55%]" },
  { name: "WordPress", src: "/banner-logos/wordpress.svg", className: "h-auto w-[62%]" },
  { name: "Supabase", src: "/banner-logos/supabase.svg", className: "h-auto w-[56%]" },
  { name: "Analytics", src: "/banner-logos/analytics.svg", className: "h-auto w-[50%]" },
];

const BLOBS = [1, 2, 3, 4, 5];

function LogoItems({ duplicate = false }) {
  return LOGOS.map((logo) => (
    <li
      key={`${logo.name}-${duplicate ? "dup" : "main"}`}
      className="services-banner-logo"
      aria-hidden={duplicate || undefined}
    >
      {logo.src && (
        <img
          src={logo.src}
          alt={logo.name}
          decoding="async"
          className={`object-contain ${logo.className}`}
        />
      )}
    </li>
  ));
}

export function ServicesBanner() {
  return (
    <section
      className="services-banner relative isolate overflow-hidden rounded-3xl border px-5 py-8 text-center sm:px-8 sm:py-10 md:px-10"
      aria-label="AI-Powered Solutions. For a Smarter Tomorrow. From automation to design, we build modern digital solutions that help your business grow, scale and succeed."
    >
      {BLOBS.map((n) => (
        <span
          key={n}
          className={`services-banner-blob services-banner-blob-${n}`}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-display text-[clamp(1.32rem,2.65vw,1.9rem)] font-extrabold leading-none tracking-[-0.035em] text-[var(--banner-title)]">
          AI-Powered Solutions
        </p>
        <p className="mt-[clamp(4px,0.5vw,6px)] font-display text-[clamp(0.98rem,1.7vw,1.22rem)] font-bold leading-none tracking-[-0.015em] text-[var(--banner-subtitle)]">
          For a Smarter Tomorrow
        </p>

        {/* Mobile: one continuously sliding row (pauses on touch/focus and is
            swipeable when reduced motion is requested). Desktop: static row. */}
        <div
          className="services-banner-slider mt-[clamp(10px,1.1vw,12px)] sm:hidden"
          tabIndex={0}
          aria-label="Technology stack"
        >
          <ul className="services-banner-track">
            <LogoItems />
            <LogoItems duplicate />
          </ul>
        </div>

        <ul className="mt-[clamp(10px,1.1vw,12px)] hidden items-center justify-center gap-[clamp(9px,1.55vw,18px)] sm:flex sm:flex-wrap">
          <LogoItems />
        </ul>

        <p className="mt-[clamp(9px,0.95vw,11px)] max-w-[34rem] text-[clamp(0.68rem,1.05vw,0.75rem)] leading-[1.3] text-[var(--banner-body)]">
          From automation to design, we build modern digital solutions
          <br className="hidden sm:block" /> that help your business grow, scale and succeed.
        </p>
      </div>
    </section>
  );
}
