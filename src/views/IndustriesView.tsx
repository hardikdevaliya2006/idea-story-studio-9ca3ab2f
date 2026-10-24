
import { Cloud, Briefcase, ShoppingCart, HeartPulse, Landmark, Building2, Truck, GraduationCap, Plus } from "lucide-react";
import { SiteHeader, SiteFooter, CTASection, Reveal, SpotlightCard, useReveal, useTheme } from "@/components/site-chrome";


const industries = [
  { icon: Cloud, title: "SaaS", desc: "Automate lead-to-renewal flows (enrichment → routing → CRM updates → success handoffs) so nothing falls through the cracks." },
  { icon: Briefcase, title: "Agencies", desc: "Turn intake → scoping → proposals → project kickoff into one connected pipeline across email, docs, and your PM tool." },
  { icon: ShoppingCart, title: "eCommerce", desc: "Sync orders, inventory, support tickets, and returns so ops stays clean while customers get fast, consistent updates." },
  { icon: HeartPulse, title: "Healthcare", desc: "Reduce admin load by automating scheduling, intake routing, and internal handoffs—without touching sensitive clinical workflows." },
  { icon: Landmark, title: "Finance", desc: "Streamline approvals and reconciliations with controlled automations that log actions and keep humans in the loop." },
  { icon: Building2, title: "Real Estate", desc: "Move faster from inquiry → qualification → viewing → follow-ups by connecting forms, CRM, calendars, and messaging." },
  { icon: Truck, title: "Logistics", desc: "Automate exception handling (delays, stockouts, reroutes) by pulling signals from systems and pushing alerts to the right team." },
  { icon: GraduationCap, title: "Education", desc: "Connect admissions, onboarding, and student support so staff spend less time on manual coordination and more on delivery." },
];

const helpList = [
  "Internal workflow automation",
  "Data pipelines and reporting",
  "Cross-system integrations across tools",
  "AI assistants for internal teams",
];

export default function IndustriesPage() {
  useReveal();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="overflow-x-clip">
      <SiteHeader theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-32 md:pt-36">
        <h1 className="sr-only">Industries — automation built for real workflows</h1>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((it, i) => (
            <Reveal key={it.title} delay={(i % 4) * 100} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="relative grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                  <it.icon className="size-5" />
                </span>
                <h3 className="relative mt-8 font-display text-lg font-semibold leading-snug">{it.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </section>

        <section className="glass grid gap-10 rounded-[28px] p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
          <Reveal>
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">The workflows where automation creates the biggest impact</h2>
            <p className="mt-5 max-w-md text-sm text-muted-foreground md:text-base">We focus on the workflows where automation creates the biggest impact and removes the most manual work.</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {helpList.map((h, i) => (
              <Reveal key={h} delay={i * 80}>
                <div className="flex h-full items-center gap-3 rounded-2xl border bg-card px-4 py-4 transition duration-300 hover:border-primary/50">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Plus className="size-4" /></span>
                  <span className="text-sm font-medium">{h}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <CTASection title="Don't see your industry?" text="Tell us about your workflows — if there's manual work, there's usually an automation opportunity." />
      </main>

      <SiteFooter theme={theme} />
    </div>
  );
}
