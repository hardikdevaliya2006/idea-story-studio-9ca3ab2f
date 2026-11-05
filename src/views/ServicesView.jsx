"use client";
import Link from "next/link";
import {
  Mail,
  ArrowLeftRight,
  ArrowUpRight,
  Workflow,
  Bot,
  FileText,
  BarChart3,
  Layers,
} from "lucide-react";
import sailboatImage from "@/assets/sailboat-emblem.png";
import { useTheme, useReveal, Reveal } from "@/components/site-chrome";
import { SERVICES } from "@/data/services";
import { CapabilityScene, ServiceScene, AutomationStackScene } from "@/components/ServicesVisuals";
import { ServiceProcess } from "@/components/ServiceProcess";
const sailboatAsset = sailboatImage.src;
// Served as-is from /public: no next/image optimizer, so the browser gets the
// original 2172px PNG instead of a downscaled/compressed variant.
const bannerLight = "/banner/AI-Powered%20Solutions%20Banner%20White.png";
const bannerDark = "/banner/AI-Powered%20Solutions%20Hero%20Banner%20Dark.png";
const capabilities = [
  { title: "Workflow & Operations", detail: "Tasks, approvals and support." },
  { title: "Data & Integrations", detail: "Systems, reports and tools." },
  { title: "AI Enablement", detail: "Agents, assistants and documents." },
];
/* ---------- what we can build: six icon rows ---------- */
const buildList = [
  { icon: Workflow, label: "Workflow automation", hint: "Rules, approvals and handoffs" },
  { icon: Bot, label: "Custom AI agents", hint: "Assistants built around your tasks" },
  { icon: ArrowLeftRight, label: "CRM integrations", hint: "Your tools talking to each other" },
  { icon: FileText, label: "Document intelligence", hint: "Read, extract and organize" },
  { icon: BarChart3, label: "Automated reporting", hint: "Numbers without the busywork" },
  { icon: Layers, label: "Cross-platform processes", hint: "One flow across every tool" },
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
function BentoCard({ index }) {
  const s = SERVICES[index];
  if (!s) return null;
  const tall = TALL.has(index);
  const isAgent = index === 1;
  // Automation card: a floating mock of an automated run, copy anchored bottom-left.
  if (index === 0) {
    return (
      <Link href={`/services/${s.slug}`} className="group block h-full">
        <div className="bento-card">
          <ArrowUpRight className="bento-arrow" />
          <div className="flex flex-1 items-center px-6 pb-1 pt-8">
            <AutomationStackScene />
          </div>
          <div className="px-6 pb-6 pt-4">
            <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/services/${s.slug}`} className="group block h-full">
      <div className={`bento-card ${isAgent ? "min-h-[24rem] lg:min-h-0" : ""}`}>
        {!isAgent && <ArrowUpRight className="bento-arrow" />}
        {isAgent && (
          <div className="absolute inset-0">
            <ServiceScene index={index} grid={false} className="size-full" />
          </div>
        )}
        <div className="relative z-10 px-6 pt-7 text-center">
          <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
          {!isAgent && (
            <p
              className={`mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground ${tall || index === 4 ? "" : "lg:hidden"}`}
            >
              {s.short}
            </p>
          )}
        </div>
        {!isAgent && (
          <ServiceScene
            index={index}
            grid={false}
            className={tall ? "bento-scene lg:min-h-64" : "bento-scene"}
          />
        )}
      </div>
    </Link>
  );
}
/* ---------- page ---------- */
export default function ServicesPage() {
  useReveal();
  const { theme } = useTheme();
  return (
    <div className="overflow-x-clip">
      <main
        id="main-content"
        className="mx-auto max-w-6xl space-y-12 px-6 pb-20 pt-28 md:space-y-16 md:pb-24 md:pt-32"
      >
        {/* BANNER — original PNG served unoptimised, at its native resolution */}
        <section>
          <Reveal>
            <img
              src={theme === "dark" ? bannerDark : bannerLight}
              alt="AI-Powered Solutions for a smarter tomorrow"
              width={2172}
              height={theme === "dark" ? 363 : 353}
              decoding="async"
              className="h-auto w-full rounded-2xl border object-cover object-center max-sm:aspect-[2.4/1]"
            />
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 120} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border bg-card p-3 pt-0">
                  <div className="mt-5 px-2">
                    <h2 className="text-center font-display text-xl font-semibold leading-snug">
                      {c.title}
                    </h2>
                  </div>
                  <p className="mt-2 px-2 pb-2 text-sm text-muted-foreground text-center">
                    {c.detail}
                  </p>
                  <div className="overflow-hidden rounded-xl border">
                    <CapabilityScene index={i} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES — every card has its own scene */}
        <section id="services">
          <Reveal className="mb-12 text-center">
            <h1 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Our{" "}
              <span className="heading-accent relative inline-block font-semibold text-primary">
                Services
                <svg
                  className="heading-swash pointer-events-none absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-3 w-full max-w-[200px] overflow-visible"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    pathLength={100}
                    d="M4 9 C 55 3.5, 135 2.5, 196 7"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-base text-muted-foreground leading-relaxed interactive-text">
              We design and build AI-powered systems that slot into your existing workflow —
              <span className="text-highlight relative cursor-default group">
                no rip-and-replace
                <span className="highlight-underline" aria-hidden="true"></span>
              </span>
              , just measurable automation from day one.
            </p>
            <Link
              href="/book-a-discovery-call"
              className="mt-8 inline-flex group items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background"
            >
              Start a conversation{" "}
              <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(8,minmax(7.5rem,auto))]">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={(i % 3) * 90}
                className={`h-full ${BENTO_LAYOUT[i] ?? ""}`}
              >
                <BentoCard index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHAT WE CAN BUILD — statement, capability list, workflow footer strip */}
        <section className="relative grid gap-8 overflow-hidden rounded-[28px] border bg-card p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:grid-rows-[auto_1fr] md:gap-x-12 md:gap-y-10 md:p-8 lg:gap-x-16">
          <div className="dots pointer-events-none absolute -bottom-16 -left-16 size-64" />
          <Reveal className="relative order-1 md:col-start-1 md:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Mail className="size-3.5" strokeWidth={2} /> Built around your workflow
            </span>
            <h2 className="mt-5 max-w-md font-display text-2xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
              What we can build for you?
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Six building blocks that connect the tools you already use, so work keeps moving
              without the manual handoffs.
            </p>
          </Reveal>

          <ul className="relative order-2 grid content-center gap-3 md:col-start-2 md:row-span-2 md:row-start-1 lg:grid-cols-2">
            {buildList.map((b, i) => (
              <Reveal key={b.label} delay={i * 70} className="h-full">
                <li className="build-item">
                  <span className="build-icon" aria-hidden="true">
                    <b.icon className="size-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium leading-snug">{b.label}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                      {b.hint}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal
            delay={120}
            className="relative order-3 flex items-center gap-3 md:col-start-1 md:row-start-2 md:self-end"
          >
            <span className="surface-icon surface-sheen flex size-12 shrink-0 items-center justify-center">
              <Mail className="size-5" strokeWidth={2} color="#fff" />
            </span>
            <ArrowLeftRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="surface-icon flex size-12 shrink-0 items-center justify-center rounded-xl border bg-background p-1.5">
              <img src={sailboatAsset} alt="Ideaboat emblem" className="size-full" />
            </span>
          </Reveal>
        </section>

        {/* APPROACH — connected step cards, glanceable */}
        <section>
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
              How we turn ideas into impact
            </h2>
          </Reveal>
          <ServiceProcess />
        </section>

        {/* CTA */}
        <Reveal className="relative overflow-hidden rounded-[28px] bg-primary p-7 text-primary-foreground sm:p-10 md:p-14">
          <div className="texture-grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="spin-slow absolute -right-20 -top-20 size-72 rounded-full border border-dashed border-primary-foreground/40" />
          <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-8 max-md:grid-cols-1">
            <div className="min-w-0">
              <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                Have an idea in mind?
              </h2>
              <p className="mt-4 max-w-md text-sm opacity-80 md:text-base">Let's talk.</p>
            </div>
            <Link
              href="/book-a-discovery-call"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background transition hover:bg-foreground/85 sm:w-auto"
            >
              Book a discovery call <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
