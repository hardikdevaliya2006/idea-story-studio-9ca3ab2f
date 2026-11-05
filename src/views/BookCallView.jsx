"use client";
import { Mail } from "lucide-react";
import { Reveal, EnquiryForm, useReveal } from "@/components/site-chrome";
import { siteConfig } from "@/lib/site";
const nextSteps = [
  ["Initial review", "We review your systems and the workflows you mentioned."],
  ["Discovery conversation", "A short conversation to understand your systems and goals."],
  ["Direction", "If there's a fit, we outline a possible automation approach and next steps."],
];
export default function BookCallPage() {
  useReveal();
  return (
    <div className="overflow-x-clip">
      <main
        id="main-content"
        className="mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-28 md:space-y-24 md:pb-24 md:pt-36"
      >
        <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <Reveal>
              <h1 className="font-display text-2xl font-semibold leading-snug md:text-3xl">
                Tell us about your goals, and we'll tailor our expertise to fit your needs.
              </h1>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                Fill out the form and we'll get back to you soon.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <a
                href={`mailto:${siteConfig.email}?subject=Hello`}
                className="group flex items-center gap-3 rounded-2xl border bg-card p-5 transition hover:border-primary/50"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">
                    For more questions, please email
                  </span>
                  <span className="block text-sm font-semibold transition group-hover:text-primary">
                    {siteConfig.email}
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <EnquiryForm
              heading="Tell us about your systems and goals"
              subtext="We'll review what you share and follow up with the next steps."
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
