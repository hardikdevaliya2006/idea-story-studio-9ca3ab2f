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
import { useReveal, Reveal } from "@/components/site-chrome";
import { SERVICES } from "@/data/services";
import { CapabilityScene, ServiceScene, AutomationStackScene } from "@/components/ServicesVisuals";
import { ServiceProcess } from "@/components/ServiceProcess";
import { ServicesBanner } from "@/components/ServicesBanner";
const sailboatAsset = sailboatImage.src;
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
/* ---------- services grid: nine equal bento tiles, artwork over copy ---------- */
function BentoCard({ index }) {
  const s = SERVICES[index];
  if (!s) return null;
  return (
    <Link href={`/services/${s.slug}`} className="group block h-full">
      <div className="bento-card">
        {/* Copy sits at the top of the tile; the artwork fills the base. Both
            share the same card surface, so there is no second panel. */}
        <div className="bento-copy">
          <h3 className="font-display text-base font-semibold leading-snug">{s.title}</h3>
          <p className="mt-1 text-balance text-sm leading-relaxed text-muted-foreground">
            {s.tagline}
          </p>
        </div>
        <div className="bento-visual" aria-hidden="true">
          {index === 0 ? (
            <div className="w-full max-w-[18rem]">
              <AutomationStackScene />
            </div>
          ) : (
            <ServiceScene index={index} grid={false} className="size-full" />
          )}
        </div>
      </div>
    </Link>
  );
}
/* ---------- page ---------- */
export default function ServicesPage() {
  useReveal();
  return (
    <div className="overflow-x-clip">
      <main
        id="main-content"
        className="mx-auto max-w-6xl space-y-12 px-6 pb-20 pt-28 md:space-y-20 md:pb-24 md:pt-32"
      >
        {/* BANNER - drawn in the DOM so it matches both themes */}
        <section>
          <Reveal>
            <ServicesBanner />
          </Reveal>
          <div className="mt-6 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 120} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border bg-card p-4">
                  <h2 className="text-center font-display text-lg font-semibold leading-snug tracking-tight md:text-xl">
                    {c.title}
                  </h2>
                  <p className="mt-1.5 text-center text-sm leading-relaxed text-muted-foreground">
                    {c.detail}
                  </p>
                  <div className="mt-4 overflow-hidden rounded-xl border">
                    <CapabilityScene index={i} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES - every card has its own scene */}
        <section id="services">
          <Reveal className="mb-10 text-center md:mb-14">
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
            <p className="mx-auto mt-5 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground interactive-text md:text-base">
              We design and build AI-powered systems that slot into your existing workflow —{" "}
              <span className="text-highlight relative cursor-default group">
                no rip-and-replace
                <span className="highlight-underline" aria-hidden="true"></span>
              </span>
              , just measurable automation from day one.
            </p>
            <Link
              href="/book-a-discovery-call"
              className="surface-sheen group relative mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:brightness-105"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80} className="h-full">
                <BentoCard index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHAT WE CAN BUILD - statement, capability list, workflow footer strip */}
        <section className="relative grid gap-8 overflow-hidden rounded-3xl border bg-card p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:grid-rows-[auto_1fr] md:gap-x-12 md:gap-y-10 lg:gap-x-16 lg:p-10">
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

        {/* APPROACH - connected step cards, glanceable */}
        <section>
          <Reveal className="mb-10 md:mb-12">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              How we turn ideas into impact
            </h2>
          </Reveal>
          <ServiceProcess />
        </section>

        {/* CTA */}
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:p-14">
          <div className="texture-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
          <div className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-primary-foreground/20" />
          <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-8 max-md:grid-cols-1">
            <div className="min-w-0">
              <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                Have an idea in mind?
              </h2>
              <p className="mt-4 max-w-md text-sm opacity-80 md:text-base">Let's talk.</p>
            </div>
            <Link
              href="/book-a-discovery-call"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 sm:w-auto"
            >
              Book a call <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
