
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import {
  SiteHeader, SiteFooter, CTASection,
  Reveal, SpotlightCard, useReveal, useTheme,
} from "@/components/site-chrome";
import { SERVICES, APPROACH, findService } from "@/data/services";



export default function ServiceDetailPage({ slug }: { slug: string }) {
  const s = findService(slug);
  useReveal();
  const { theme, toggleTheme } = useTheme();

  if (!s) return null;

  const others = SERVICES.filter((o) => o.slug !== s.slug);


  return (
    <div className="overflow-x-clip">
      <SiteHeader theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl space-y-20 px-6 pb-20 pt-32 md:pt-36">
        <h1 className="sr-only">{s.title} — {s.tagline}</h1>

        {/* COMPACT SERVICE IDENTIFIER */}
        <Reveal className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display font-semibold">{s.title}</span>
          <span className="text-sm text-muted-foreground">{s.tagline}</span>
        </Reveal>

        {/* OVERVIEW + WHAT'S INCLUDED */}
        <section className="glass grid gap-10 rounded-[28px] p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold leading-snug md:text-3xl">How we approach it</h2>

            <p className="mt-5 text-sm text-muted-foreground md:text-base">{s.overview}</p>
            <Link to="/book-a-discovery-call" className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
              Book a discovery call <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
            </Link>
          </Reveal>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.includes.map((it, i) => (
                <Reveal key={it} delay={i * 70}>
                  <li className="flex h-full items-start gap-3 rounded-2xl border bg-card px-4 py-4">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check className="size-3.5" /></span>
                    <span className="text-sm font-medium leading-snug">{it}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* OUTCOMES */}
        <section>
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">What changes once it's live</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.outcomes.map((o, i) => (
              <Reveal key={o} delay={i * 100} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6">
                  <span className="relative font-display text-3xl font-semibold text-primary/40 transition duration-500 group-hover:text-primary">0{i + 1}</span>
                  <p className="relative mt-5 text-sm leading-snug">{o}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TOOLS */}
        <section>
          <Reveal className="mb-6">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">What we work with</h2>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {s.tools.map((t, i) => (
              <Reveal key={t} delay={i * 50}>
                <span className="inline-flex rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">{t}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* APPROACH */}
        <section>
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Discover, plan, build, scale</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-4">
            {APPROACH.map(([t, d], i) => (
              <Reveal key={t} delay={i * 110} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6">
                  <span className="relative font-display text-3xl font-semibold text-primary/40 transition duration-500 group-hover:text-primary">0{i + 1}</span>
                  <h3 className="relative mt-5 font-display text-lg font-semibold">{t}</h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">{d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* OTHER SERVICES */}
        <section>
          <Reveal className="mb-6">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Other things we build</h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 4) * 80} className="h-full">
                <Link to="/services/$slug" params={{ slug: o.slug }} className="group flex h-full items-center justify-between gap-3 rounded-2xl border bg-card px-5 py-4 transition duration-300 hover:border-primary/50">
                  <span className="text-sm font-medium leading-snug">{o.title}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CTASection title={s.ctaTitle} text={s.ctaText} />
      </main>

      <SiteFooter theme={theme} />
    </div>
  );
}
