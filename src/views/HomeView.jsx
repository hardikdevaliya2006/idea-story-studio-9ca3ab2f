"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Mail, Cpu, Trophy, HeartHandshake, Users } from "lucide-react";
import svcWebDesignImage from "@/assets/svc-web-design.jpg";
import svcAppImage from "@/assets/svc-app-dev.jpg";
import svcWebDevImage from "@/assets/svc-web-dev.jpg";
import svcMarketingImage from "@/assets/svc-marketing.jpg";
import brand1Image from "@/assets/brand-1.png";
import brand2Image from "@/assets/brand-2.png";
import brand3Image from "@/assets/brand-3.png";
import brand4Image from "@/assets/brand-4.png";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { HeroCapsules } from "@/components/HeroCapsules";
import { Reveal, SpotlightCard, Line, useReveal } from "@/components/site-chrome";
import { HOME_FAQS } from "@/data/faqs";
const svcWebDesign = svcWebDesignImage;
const svcApp = svcAppImage;
const svcWebDev = svcWebDevImage;
const svcMarketing = svcMarketingImage;
const brand1 = brand1Image;
const brand2 = brand2Image;
const brand3 = brand3Image;
const brand4 = brand4Image;
function SectionTitle({ title, action, actionHref }) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-12">
      <div>
        <h2 className="font-display text-3xl font-normal leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={actionHref ?? "/services"}
          className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition hover:bg-foreground hover:text-background"
        >
          {action} <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
        </Link>
      )}
    </Reveal>
  );
}
const marqueeItems = [
  "Branding",
  "Web Design",
  "SEO",
  "Social Media",
  "Performance Ads",
  "App Development",
  "Content",
  "UI / UX",
];
const stats = [
  ["200+", "Clients"],
  ["280+", "Projects"],
  ["100%", "Happy clients"],
  ["420K", "Followers"],
  ["10+", "Years of experience"],
];
const reasonIcons = [Cpu, Trophy, HeartHandshake, Users];
const reasons = [
  ["Expertise in cutting-edge tech", "Modern stacks and tools that keep your brand future-proof."],
  ["Proven track record", "Hundreds of campaigns delivered with measurable growth."],
  ["Client-centric approach", "We listen first, then build around your goals."],
  ["Dedicated team", "Strategists, designers and developers on one boat."],
];
const services = [
  ["01", "Web Design", "₹25,000", "/services/branding-designing"],
  ["02", "App Development", "₹60,000", "/services/website-development"],
  ["03", "Web Development", "₹40,000", "/services/website-development"],
  ["04", "Digital Marketing", "₹15,000/mo", "/services/social-media"],
];
const serviceImages = [svcWebDesign.src, svcApp.src, svcWebDev.src, svcMarketing.src];
const works = [
  [
    "Zenith Fitness App",
    "Mobile App Development",
    "6 months",
    ["React Native", "Firebase", "Redux"],
    svcApp.src,
  ],
  [
    "Aura E-commerce",
    "Web Design & Development",
    "3 months",
    ["WordPress", "PHP", "CSS3"],
    svcWebDesign.src,
  ],
  [
    "Nova SaaS Platform",
    "Web Development",
    "4 months",
    ["Next.js", "Node", "Postgres"],
    svcWebDev.src,
  ],
  [
    "Pulse Growth Campaign",
    "Digital Marketing",
    "Ongoing",
    ["Meta Ads", "Google Ads", "SEO"],
    svcMarketing.src,
  ],
];
function ServicesList() {
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const previewRef = useRef(null);
  const move = (e) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r || !previewRef.current) return;
    previewRef.current.style.transform = `translate(${e.clientX - r.left - 160}px, ${e.clientY - r.top - 120}px)`;
  };
  return (
    <div
      ref={boxRef}
      className="relative divide-y border-y"
      onPointerMove={move}
      onPointerLeave={() => setActive(-1)}
    >
      <div
        ref={previewRef}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ transition: "transform 0.25s cubic-bezier(.2,.8,.2,1)" }}
      >
        <div
          className={`relative h-60 w-80 overflow-hidden rounded-xl border border-primary/30 transition-all duration-500 ${active >= 0 ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
          style={{ rotate: active >= 0 ? "-4deg" : "0deg" }}
        >
          {serviceImages.map((src, k) => (
            <img
              key={k}
              src={src}
              alt=""
              width={944}
              height={704}
              loading="lazy"
              className={`absolute inset-0 size-full object-cover transition duration-500 ${active === k ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            />
          ))}
        </div>
      </div>
      {services.map(([n, t, p, href], i) => (
        <Reveal key={t} delay={i * 80}>
          <Link
            href={href}
            onPointerEnter={() => setActive(i)}
            className="flex items-center justify-between gap-6 py-7"
          >
            <span className="text-sm text-muted-foreground">{n}</span>
            <span className="flex-1 font-display text-xl font-semibold md:text-3xl">{t}</span>
            <span className="hidden text-sm text-muted-foreground md:block">Starts from {p}</span>
            <ArrowUpRight className="size-6" />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
function WorksStack() {
  const refs = useRef([]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onScroll = () => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        if (!desktop.matches) {
          el.style.transform = "";
          el.style.filter = "";
          return;
        }
        const next = refs.current[i + 1];
        let p = 0;
        if (next) {
          const a = el.getBoundingClientRect().top;
          const b = next.getBoundingClientRect().top;
          p = Math.min(Math.max(1 - (b - a) / window.innerHeight, 0), 1);
        }
        el.style.transform = `scale(${1 - p * 0.08})`;
        el.style.filter = `brightness(${1 - p * 0.45})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="relative">
      {works.map(([t, c, d, tech, img], i) => (
        <div key={t} className="pb-6 lg:sticky lg:pb-8" style={{ top: `${96 + i * 24}px` }}>
          <div
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="grid origin-top gap-4 rounded-xl border bg-card p-4 will-change-transform lg:grid-cols-[1fr_1.4fr_1fr]"
          >
            <div className="flex flex-col justify-between p-4">
              <div>
                <span className="font-display text-xs tracking-widest text-primary">
                  0{i + 1} / 0{works.length}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">Category — {c}</p>
                <p className="text-sm text-muted-foreground">Time taken — {d}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm">
                Details <ArrowUpRight className="size-4" />
              </span>
            </div>
            <div className="group overflow-hidden rounded-xl">
              <img
                src={img}
                alt={t}
                width={944}
                height={704}
                loading="lazy"
                className="aspect-video size-full object-cover transition duration-700"
              />
            </div>
            <div className="flex flex-col justify-between gap-6 p-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Technologies
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tech.map((x) => (
                    <span key={x} className="rounded-full border px-3 py-1 text-xs">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                className="rounded-full bg-primary py-3 text-center text-sm text-primary-foreground transition hover:opacity-90"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
const words = [
  "Brands",
  "Startups",
  "Businesses",
  "Creators",
  "Founders",
  "E-commerce",
  "Agencies",
  "Ideas",
];
function Hero() {
  const [i, setI] = useState(0);
  const measureRef = useRef(null);
  const [boxW, setBoxW] = useState(null);
  useEffect(() => {
    if (measureRef.current) setBoxW(measureRef.current.offsetWidth);
  }, [i]);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero-soft relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-36">
      <HeroCapsules />

      <h1 className="relative max-w-6xl font-display text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
        <Line delay={150}>We Help</Line>
        <Line delay={320}>
          <span
            className="relative mx-2 inline-block border border-primary/70 bg-primary/10 align-baseline transition-[width] duration-700 ease-[cubic-bezier(.65,0,.35,1)]"
            style={{ width: boxW ? boxW : undefined }}
          >
            <span
              ref={measureRef}
              aria-hidden
              className="invisible absolute left-0 top-0 whitespace-nowrap px-4"
            >
              {words[i]}
            </span>
            {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map(
              (p) => (
                <span key={p} className={`absolute ${p} size-2 bg-foreground`} />
              ),
            )}
            <span
              key={i}
              className="block overflow-hidden whitespace-nowrap px-4 text-center text-primary"
              aria-label={words[i]}
            >
              {(words[i] ?? "").split("").map((ch, k) => (
                <span
                  key={k}
                  aria-hidden
                  className="letter-swap inline-block"
                  style={{ animationDelay: `${k * 35}ms` }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>{" "}
          <span className="block sm:inline">Grow Faster</span>
        </Line>
      </h1>

      <Reveal delay={500} className="relative mt-8 max-w-2xl">
        <p className="text-base text-muted-foreground md:text-lg">
          Ideaboat is a digital marketing, design & development studio steering brands toward real
          growth.
        </p>
      </Reveal>

      <Reveal delay={650} className="relative mt-8 flex items-center gap-3">
        <div className="flex -space-x-3">
          {[brand1.src, brand2.src, brand3.src, brand4.src].map((b, k) => (
            <img
              key={k}
              src={b}
              alt=""
              loading="lazy"
              className="size-10 rounded-full border-2 border-background object-cover"
            />
          ))}
        </div>
        <p className="text-sm">
          <span className="font-bold text-primary">200+</span>{" "}
          <span className="text-muted-foreground">brands trust our crew</span>
        </p>
      </Reveal>

      <Reveal delay={800} className="relative mt-10">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Start a Project <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
        </a>
      </Reveal>
    </section>
  );
}
export default function Index() {
  useReveal();
  const [open, setOpen] = useState(0);
  return (
    <div className="overflow-x-clip">
      {/* HERO — Sheryians-style centered */}
      <Hero />

      {/* BENTO STATS */}
      <section className="mx-auto max-w-6xl px-6">
        <Reveal className="glass grid grid-cols-2 overflow-hidden rounded-[28px] md:grid-cols-[1fr_1fr_1.6fr]">
          {[
            ["743k", "Followers across socials", "+18% this year"],
            ["280+", "Projects delivered", "Across 12 industries"],
          ].map(([v, l, s], i) => (
            <div
              key={l}
              className={`group relative flex flex-col justify-between gap-6 border-b border-r p-5 sm:p-8 md:gap-10 transition-colors duration-500 hover:bg-foreground/5 border-foreground/10 md:border-b-0 md:border-r ${i === 1 ? "border-r-0 md:border-r" : ""}`}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {l}
              </p>
              <div>
                <p className="glass-text font-display text-3xl font-semibold tracking-tight transition-colors sm:text-5xl duration-500 group-hover:text-primary">
                  {v}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{s}</p>
              </div>
              <span className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          ))}
          <a
            href="#contact"
            className="group relative col-span-2 flex min-h-56 flex-col justify-between overflow-hidden p-6 sm:p-8 md:col-span-1"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/20 transition-opacity duration-700 group-hover:opacity-0" />
            <div className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100" />
            <div className="relative flex items-end justify-between gap-6 transition-colors duration-500 group-hover:text-primary-foreground">
              <div>
                <p className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                  Start your
                  <br />
                  project
                </p>
                <p className="mt-3 text-sm opacity-70">Reply within 24 hours.</p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition duration-500 group-hover:rotate-45 group-hover:bg-primary-foreground group-hover:text-primary">
                <ArrowUpRight className="size-6" />
              </span>
            </div>
          </a>
        </Reveal>
      </section>

      {/* MARQUEE */}
      <div className="group/mq relative mt-20 overflow-hidden py-6 md:mt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee group-hover/mq:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center">
              <span className="cursor-default px-8 font-display text-xl font-light tracking-tight text-muted-foreground/80 transition duration-300 hover:text-foreground md:px-12 md:text-3xl">
                {m}
              </span>
              <span className="size-1.5 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>

      <main
        id="main-content"
        className="mx-auto max-w-6xl space-y-16 px-6 py-16 md:space-y-24 md:py-24"
      >
        {/* STATS */}
        <section className="glass grid grid-cols-2 overflow-hidden rounded-[28px] md:grid-cols-5">
          {stats.map(([v, l], i) => (
            <Reveal
              key={l}
              delay={i * 100}
              className={`group relative border-b border-r p-5 transition-colors duration-500 border-foreground/10 last:border-r-0 hover:bg-foreground/5 sm:p-6 md:border-b-0 lg:p-8 ${i === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <p className="glass-text font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {v}
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {l}
              </p>
              <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </section>

        {/* WHY */}
        <section>
          <SectionTitle eyebrow="Why Ideaboat" title="Reasons to come aboard" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([t, d], i) => {
              const Icon = reasonIcons[i] ?? Cpu;
              return (
                <Reveal key={t} delay={i * 120} className="h-full">
                  <SpotlightCard className="flex h-full flex-col p-6">
                    <div className="relative flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-display text-xs tracking-widest text-muted-foreground">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="relative mt-8 font-display text-lg font-semibold leading-snug">
                      {t}
                    </h3>
                    <p className="relative mt-2 text-sm text-muted-foreground">{d}</p>
                    <div className="flex-1" />
                    <div className="relative mt-6 h-px w-full bg-border">
                      <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-700 group-hover:w-full" />
                    </div>
                    <Link
                      href="/about"
                      className="relative mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      Learn more <ArrowUpRight className="size-4" />
                    </Link>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section>
          <SectionTitle
            eyebrow="What we do"
            title="Our services"
            action="Book a call"
            actionHref="/book-a-discovery-call"
          />
          <ServicesList />
        </section>

        {/* WORKS */}
        <section>
          <SectionTitle
            eyebrow="Selected projects"
            title="Our works"
            action="All services"
            actionHref="/services"
          />
          <WorksStack />
        </section>

        {/* TESTIMONIALS */}
        <section>
          <SectionTitle eyebrow="Kind words" title="Testimonials" />
          <TestimonialCarousel />
        </section>

        {/* FAQ */}
        <section className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Questions.
            </h2>
            <p className="mt-5 max-w-xs text-muted-foreground">
              Everything you might want to know before starting your project.
            </p>
            <div className="mt-8 max-w-sm rounded-2xl bg-muted p-5">
              <p className="text-sm font-semibold">Still have a question?</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Write to us and we will help you get started.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
              >
                <Mail className="size-3.5" />
                Email us
              </Link>
            </div>
          </Reveal>
          <div className="space-y-2">
            {HOME_FAQS.map(({ question, answer }, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={question} delay={i * 60}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${isOpen ? "border-border bg-card" : "border-transparent bg-muted hover:bg-muted/70"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      <span className="flex-1 font-medium">{question}</span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-foreground text-background" : "bg-background text-foreground"}`}
                      >
                        <Plus className="size-4" />
                      </span>
                    </div>
                    <div
                      className={`grid transition-all duration-500 ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <p className="overflow-hidden pl-8 pr-10 text-sm leading-relaxed text-muted-foreground">
                        {answer}
                      </p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CONTACT + CTA — side by side */}
        <section
          id="contact"
          className="grid scroll-mt-24 items-stretch gap-8 md:scroll-mt-28 lg:grid-cols-2"
        >
          <Reveal className="h-full">
            <ContactForm />
          </Reveal>
          <Reveal className="relative h-full overflow-hidden rounded-[28px] bg-primary p-8 text-primary-foreground md:p-10">
            <div className="texture-grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
            <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary-foreground/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-primary-foreground/10 blur-2xl" />
            <div className="spin-slow absolute -right-20 -top-20 size-72 rounded-full border border-dashed border-primary-foreground/40" />
            <div className="relative z-10 flex h-full flex-col justify-center">
              <h2 className="max-w-md font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                Ready to set sail on your digital journey?
              </h2>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
function ContactForm() {
  const topics = ["Branding", "Website", "App", "Marketing", "Other"];
  const [topic, setTopic] = useState("Website");
  const [vals, setVals] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const field = (k, label, type = "text") => (
    <label className="group relative block">
      <input
        type={type}
        required
        value={vals[k]}
        onChange={(e) => setVals({ ...vals, [k]: e.target.value })}
        placeholder=" "
        className="peer w-full rounded-2xl border bg-background/60 px-4 pb-2.5 pt-6 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px]">
        {label}
      </span>
    </label>
  );
  if (sent)
    return (
      <div className="glass flex h-full min-h-[420px] flex-col items-center justify-center rounded-[28px] p-8 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-primary text-2xl text-primary-foreground letter-swap">
          ✓
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold">Message sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks {vals.name.split(" ")[0] || "there"}, we'll reply about your {topic.toLowerCase()}{" "}
          project soon.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setVals({ name: "", email: "", msg: "" });
          }}
          className="mt-6 text-sm text-primary underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  return (
    <div className="glass flex h-full flex-col rounded-[28px] p-8">
      <h3 className="font-display text-2xl font-semibold">Ask your question</h3>
      <form
        className="mt-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition duration-300 ${topic === t ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:border-primary/60 hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        {field("name", "Your name")}
        {field("email", "Email address", "email")}
        <label className="relative block">
          <textarea
            required
            maxLength={300}
            rows={4}
            value={vals.msg}
            onChange={(e) => setVals({ ...vals, msg: e.target.value })}
            placeholder="Tell us about your idea..."
            className="w-full resize-none rounded-2xl border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
          <span className="absolute bottom-3 right-4 text-[11px] text-muted-foreground">
            {vals.msg.length}/300
          </span>
        </label>
        <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]">
          Send message <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
        </button>
      </form>
    </div>
  );
}
