const testimonials = [
  {
    q: "Ideaboat turned our business around in just three months. Leads doubled and our brand finally feels premium.",
    name: "Aarav Mehta",
    role: "Founder, Brewline",
    stat: "+212% revenue",
  },
  {
    q: "A pleasure to work with - fast, thoughtful and always on brand. They felt like part of our team.",
    name: "Sara Kapoor",
    role: "CMO, Northwind",
    stat: "4.9★ rating",
  },
  {
    q: "They brought our vision to life with an app our users genuinely love using every day.",
    name: "Rohan Iyer",
    role: "CEO, Fitloop",
    stat: "120k installs",
  },
  {
    q: "Results beyond expectation. Our new website finally converts visitors into customers.",
    name: "Neha Shah",
    role: "Head of Growth, Lumen",
    stat: "3.4x conversions",
  },
  {
    q: "The best creative partner we've had. Clear process, sharp design and zero stress.",
    name: "Kabir Singh",
    role: "Director, Studio K",
    stat: "8 campaigns",
  },
  {
    q: "Our ads finally make sense. Lower cost per lead and a team that explains every number.",
    name: "Priya Nair",
    role: "Owner, Bloom Café",
    stat: "-46% cost per lead",
  },
];
export function TestimonialCarousel() {
  const items = [...testimonials, ...testimonials];
  return (
    <div className="group/mq relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee group/row group-hover/mq:[animation-play-state:paused]">
        {items.map((t, i) => (
          <article
            key={i}
            className="mr-4 flex w-[82vw] max-w-[380px] shrink-0 flex-col justify-between rounded-2xl border border-foreground/10 bg-card p-6 transition duration-500 group-hover/row:opacity-50 group-hover/row:blur-[4px] hover:!opacity-100 hover:!blur-none hover:border-foreground/25 sm:mr-5 sm:w-[380px]"
          >
            <span className="font-display text-4xl leading-none text-primary">“</span>
            <p className="mt-2 font-display text-lg leading-snug text-foreground">{t.q}</p>
            <div className="mt-8">
              <h3 className="font-display text-base font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.role} <span className="mx-1">•</span> {t.stat}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
