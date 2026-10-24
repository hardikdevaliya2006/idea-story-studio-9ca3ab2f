
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Mail, ArrowLeftRight, Workflow, Bot, FileText, BarChart3, Layers } from "lucide-react";
import sailboatImage from "@/assets/sailboat-emblem.png";
import {
  SiteHeader, SiteFooter, useTheme,
  useReveal, Reveal,
} from "@/components/site-chrome";
import { SERVICES } from "@/data/services";
import { CapabilityScene, ServiceScene } from "@/components/ServicesVisuals";
import { ServiceProcess } from "@/components/ServiceProcess";

const sailboatAsset = sailboatImage;


const capabilities: { title: string; detail: string }[] = [
  { title: "Workflow & Operations", detail: "Tasks, approvals and support." },
  { title: "Data & Integrations", detail: "Systems, reports and tools." },
  { title: "AI Enablement", detail: "Agents, assistants and documents." },
];

/* ---------- what we can build: six short chips ---------- */

const buildList = [
  "Workflow automation",
  "Custom AI agents",
  "CRM integrations",
  "Document intelligence",
  "Automated reporting",
  "Cross-platform processes",
];

/* ---------- bento: staggered 3-column grid, tall cards carry a description ---------- */

// Desktop placement per service on an 8-row grid (each unit is a half-height row).
const BENTO_LAYOUT = [
  "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  "lg:col-start-2 lg:row-start-1 lg:row-span-4",
  "lg:col-start-3 lg:row-start-1 lg:row-span-2",
  "lg:col-start-1 lg:row-start-3 lg:row-span-4",
  "lg:col-start-3 lg:row-start-3 lg:row-span-3",
  "lg:col-start-2 lg:row-start-5 lg:row-span-2",
  "lg:col-start-1 lg:row-start-7 lg:row-span-2",
  "lg:col-start-2 lg:row-start-7 lg:row-span-2",
  "lg:col-start-3 lg:row-start-6 lg:row-span-3",
];
const TALL = new Set([1, 3, 8]);

function BentoCard({ index }: { index: number }) {
  const s = SERVICES[index];
  if (!s) return null;
  const tall = TALL.has(index);
  return (
    <Link to="/services/$slug" params={{ slug: s.slug }} className="group block h-full">
      <div className="bento-card">
        <ArrowUpRight className="bento-arrow" />
        <div className="relative z-10 px-6 pt-7 text-center">
          <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
          <p className={`mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground ${tall || index === 4 ? "" : "lg:hidden"}`}>{s.short}</p>
        </div>
        <ServiceScene index={index} grid={false} className={tall ? "bento-scene lg:min-h-64" : "bento-scene"} />
      </div>
    </Link>
  );
}

/* ---------- page ---------- */

export default function ServicesPage() {
  useReveal();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="overflow-x-clip">
      <SiteHeader theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-32 md:pt-36">
        <h1 className="sr-only">Services — AI solutions designed to automate workflows &amp; connect your systems</h1>

        {/* CAPABILITIES — illustration first, one line each */}
        <section>
          <Reveal>
            <h2 className="sr-only">Where AI can make a difference</h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 120} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border bg-card p-3 pb-5">
                  <div className="overflow-hidden rounded-xl">
                    <CapabilityScene index={i} />
                  </div>
                  <div className="mt-5 px-2">
                    <h3 className="font-display text-xl font-semibold leading-snug">{c.title}</h3>
                  </div>
                  <p className="mt-2 px-2 text-sm text-muted-foreground">{c.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES — every card has its own scene */}
        <section id="services">
          <Reveal className="mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
            <div className="min-w-0">
              <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
                Our{" "}
                <span className="heading-accent relative inline-block font-semibold text-primary">
                  services
                  <svg className="heading-swash pointer-events-none absolute -bottom-2.5 left-0 h-3 w-full overflow-visible" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength={100} d="M4 9 C 55 3.5, 135 2.5, 196 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </div>
            <Link to="/book-a-discovery-call" className="group hidden shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background sm:inline-flex">
              Start a conversation <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(8,minmax(7.5rem,auto))]">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90} className={`h-full ${BENTO_LAYOUT[i] ?? ""}`}>
                <BentoCard index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHAT WE CAN BUILD — clean split: statement + numbered list */}
        <section className="relative grid gap-12 overflow-hidden rounded-[28px] border bg-card p-8 md:grid-cols-[1fr_1.3fr] md:gap-16 md:p-14">
          <div className="dots pointer-events-none absolute -bottom-16 -left-16 size-64 opacity-30" />
          <Reveal className="relative flex flex-col justify-between gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Mail className="size-3.5" strokeWidth={2} /> Built around your workflow
              </span>
              <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] tracking-tight md:text-5xl">What we can build for you</h2>
                <div className="mt-6 flex items-center gap-3">
                  <span className="surface-icon surface-sheen flex size-14 items-center justify-center">
                    <Mail className="size-7" strokeWidth={2} />
                  </span>
                  <ArrowLeftRight className="size-5 text-muted-foreground" />
                  <span className="boat-soft-ring flex size-14 items-center justify-center rounded-full bg-background p-1.5">
                    <img src={sailboatAsset} alt="Ideaboat emblem" className="size-full" />
                  </span>
                </div>
              </div>
          </Reveal>
            <ul className="relative grid content-center gap-3 sm:grid-cols-2">
              {buildList.map((b, i) => (
                <Reveal key={b} delay={i * 70} className="h-full">
                  <li className="build-item">
                    <span className="build-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] font-medium leading-snug">{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
        </section>

        {/* APPROACH — connected step cards, glanceable */}
        <section>
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">How we turn ideas into impact</h2>
          </Reveal>
          <ServiceProcess />
        </section>

        {/* CTA */}
        <Reveal className="relative overflow-hidden rounded-[28px] bg-primary p-10 text-primary-foreground md:p-14">
          <div className="texture-grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="spin-slow absolute -right-20 -top-20 size-72 rounded-full border border-dashed border-primary-foreground/40" />
          <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-8 max-md:grid-cols-1">
            <div className="min-w-0">
              <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Have an idea in mind?</h2>
              <p className="mt-4 max-w-md text-sm opacity-80 md:text-base">Let's talk.</p>
            </div>
            <Link to="/book-a-discovery-call" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background transition hover:bg-foreground/85">
              Book a discovery call <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </main>

      <SiteFooter theme={theme} />
    </div>
  );
}
