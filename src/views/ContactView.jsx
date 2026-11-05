"use client";
import { Phone, Mail, Check } from "lucide-react";
import { Reveal, EnquiryForm, useReveal } from "@/components/site-chrome";
import { siteConfig } from "@/lib/site";
const projects = [
  "AI workflow and business process automation",
  "Custom AI agents and intelligent assistants",
  "AI integration with your existing tools and systems",
  "Data processing, reporting, and intelligent automation",
];
const discuss = [
  "Understand your business goals and current challenges",
  "Identify the right AI and automation opportunities",
  "Discuss the best approach and next steps",
];
const nextSteps = [
  [
    "We Review Your Request",
    "We review your goals, challenges, and project details to understand where IdeaBoat can help.",
  ],
  [
    "Discovery Conversation",
    "We connect with you to understand your business, current processes, and the AI or automation opportunities you want to explore.",
  ],
  [
    "Recommended Next Steps",
    "We outline the right solution, approach, and practical next steps to move your idea forward.",
  ],
];
export default function ContactPage() {
  useReveal();
  return (
    <div className="overflow-x-clip">
      <main
        id="main-content"
        className="mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-28 md:space-y-24 md:pb-24 md:pt-36"
      >
        <h1 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
          Let's talk about your next project
        </h1>
        <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <Reveal>
              <ul className="space-y-3">
                {projects.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={150}>
              <ul className="space-y-3">
                {discuss.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={250} className="grid gap-3 sm:grid-cols-2">
              <a
                href={siteConfig.phoneHref}
                className="group flex items-center gap-3 rounded-2xl border bg-card p-5 transition hover:border-primary/50"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Call us at:</span>
                  <span className="block text-sm font-semibold transition group-hover:text-primary">
                    {siteConfig.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}?subject=Hello`}
                className="group flex items-center gap-3 rounded-2xl border bg-card p-5 transition hover:border-primary/50"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Email us:</span>
                  <span className="block text-sm font-semibold transition group-hover:text-primary">
                    {siteConfig.email}
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <EnquiryForm
              heading="Let's Discuss Your Idea"
              subtext="Tell us about your business, goals, or project. We'll review your requirements and help you identify the right next step."
            />
          </Reveal>
        </section>

        <section>
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
              What happens next
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {nextSteps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 120} className="h-full">
                <div className="group relative flex h-full flex-col rounded-xl border bg-card p-6">
                  <span className="font-display text-4xl font-semibold text-primary/40 transition duration-500 group-hover:text-primary">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
