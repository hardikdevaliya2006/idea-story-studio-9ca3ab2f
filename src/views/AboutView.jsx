"use client";
import { Compass, Gem, Users, Target, Lightbulb, Layers, Rocket, Quote } from "lucide-react";
import { CTASection, Reveal, SpotlightCard, useReveal } from "@/components/site-chrome";
import { ImpactScene } from "@/components/ImpactScenes";
const pillars = [
  {
    icon: Lightbulb,
    title: "What we do",
    desc: "AI solutions, intelligent automation, custom AI agents & integrations",
  },
  {
    icon: Compass,
    title: "How we work",
    desc: "Strategy-led, collaborative & focused on practical business outcomes",
  },
  {
    icon: Users,
    title: "Who we work with",
    desc: "Startups, growing businesses & teams across industries",
  },
  {
    icon: Target,
    title: "Our focus",
    desc: "Practical AI, smarter workflows & scalable solutions",
  },
];
const stats = [
  ["2x", "More qualified leads"],
  ["35%", "Faster lead response"],
  ["20+ HRS", "Saved monthly through AI automation"],
];
const values = [
  {
    icon: Lightbulb,
    title: "Innovation with Purpose",
    desc: "We explore AI and emerging technologies with a clear purpose-solving real business challenges and creating smarter ways to work.",
  },
  {
    icon: Gem,
    title: "Built for Quality",
    desc: "We focus on reliable, practical solutions designed to perform consistently and create long-term value for businesses.",
  },
  {
    icon: Users,
    title: "Better Together",
    desc: "We work closely with our clients, combining their industry knowledge with our AI expertise to build solutions that truly fit their needs.",
  },
  {
    icon: Target,
    title: "Results That Matter",
    desc: "We measure success by meaningful outcomes-from reducing repetitive work to improving efficiency and supporting sustainable growth.",
  },
];
const steps = [
  [
    "Insights. Surfaced.",
    "We start by understanding your goals, audience, and challenges. This is where insights surface and opportunities begin to take shape.",
  ],
  [
    "Strategy. Mapped.",
    "We map out a clear strategy, aligning AI solutions with your vision. Every step is focused on solving real problems and unlocking growth.",
  ],
  [
    "Built. To Fit.",
    "We bring ideas to life by developing custom AI agents and automations designed to fit seamlessly into your workflow.",
  ],
  [
    "Results. Measured.",
    "We refine and expand your solution, track results, improve performance, and scale your AI systems as your business grows.",
  ],
];
const team = [
  { name: "Marcus Okafor", role: "Founder & CEO", icon: Rocket },
  { name: "Olivia Bennett", role: "Head of Automation", icon: Layers },
  { name: "Christopher Hayes", role: "Chief AI Architect", icon: Lightbulb },
  { name: "Ethan Walker", role: "Client Success", icon: Users },
];
const testimonials = [
  {
    name: "Michael Rodriguez",
    role: "VP of Sales, GrowthLabs",
    quote:
      "The team understood our complex integration requirements and built something that just works. Worth every penny.",
  },
  {
    name: "Alex Rivera",
    role: "COO, Haus",
    quote:
      "The team didn't just build an automation; they re-engineered our entire operations workflow. We're moving twice as fast now.",
  },
  {
    name: "Sarah Jenkins",
    role: "VP Engineering, DataCorp",
    quote:
      "Finally, an automation partner who actually understands enterprise security requirements. No hand-waving, just solid execution.",
  },
  {
    name: "Adam Smith",
    role: "CEO, TechSpace",
    quote:
      "They quickly grasped our complicated integration needs and delivered a solution that works flawlessly. Absolutely worth the investment.",
  },
];
export default function AboutPage() {
  useReveal();
  return (
    <div className="overflow-x-clip">
      <main
        id="main-content"
        className="mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-28 md:space-y-24 md:pb-24 md:pt-36"
      >
        {/* PILLARS */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="relative grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="size-5" />
                </span>
                <h3 className="relative mt-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {p.title}
                </h3>
                <p className="relative mt-2 text-sm font-medium leading-snug">{p.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </section>

        {/* MISSION */}
        <section className="grid items-start gap-10 md:grid-cols-2">
          <Reveal>
            <h1 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
              AI that makes business simpler, not more complicated
            </h1>
            <p className="mt-5 text-sm text-muted-foreground md:text-base">
              To empower businesses with AI solutions that simplify work, spark innovation, and
              create lasting impact. IdeaBoat combines intelligent automation with practical
              technology to solve real business challenges and help teams work smarter.
            </p>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Our focus is on building intelligent solutions that reduce repetitive work and improve
              everyday operations. From custom AI agents to workflow automation, we help businesses
              turn new opportunities into practical systems designed for efficiency and sustainable
              growth.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {stats.map(([v, l], i) => (
              <Reveal key={l} delay={i * 120}>
                <SpotlightCard className="flex items-center gap-6 p-6">
                  <span className="relative font-display text-4xl font-semibold text-primary md:text-5xl">
                    {v}
                  </span>
                  <span className="relative text-sm text-muted-foreground">{l}</span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* VALUES */}
        <section>
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
              What drives IdeaBoat forward
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6">
                  <span className="relative grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <v.icon className="size-5" />
                  </span>
                  <h3 className="relative mt-8 font-display text-lg font-semibold leading-snug">
                    {v.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* APPROACH */}
        <section>
          <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                Our approach
              </p>
              <h2 className="mt-4 max-w-lg font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
                How we turn ideas into impact
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground md:text-base">
              From understanding your goals to building and scaling AI solutions, IdeaBoat follows a
              clear approach focused on real business results.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 110} className="h-full">
                <article className="approach-card">
                  <div className="approach-card-stage">
                    <ImpactScene index={i} />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[18px] font-semibold leading-snug tracking-tight">
                        {t}
                      </h3>
                      <span className="font-display text-xs font-medium text-primary/70">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="approach-rule my-3" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section>
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
              Meet the visionaries
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 100} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6">
                  <span className="relative grid size-14 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <m.icon className="size-6" />
                  </span>
                  <h3 className="relative mt-6 font-display text-lg font-semibold">{m.name}</h3>
                  <p className="relative mt-1 text-sm text-muted-foreground">{m.role}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section>
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
              Human + machine, working for you
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 120} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6">
                  <Quote className="relative size-6 text-primary" />
                  <p className="relative mt-4 text-sm leading-relaxed md:text-base">"{t.quote}"</p>
                  <div className="flex-1" />
                  <div className="relative mt-6 border-t pt-4">
                    <p className="font-display text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  );
}
