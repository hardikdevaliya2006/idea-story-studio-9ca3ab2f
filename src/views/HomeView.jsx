"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Mail, Cpu, Trophy, HeartHandshake, Users } from "lucide-react";
import { SERVICES } from "@/data/services";
import brand1Image from "@/assets/brand-1.png";
import brand2Image from "@/assets/brand-2.png";
import brand3Image from "@/assets/brand-3.png";
import brand4Image from "@/assets/brand-4.png";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { HeroTechIcons } from "@/components/HeroTechIcons";
import ContactVoyageScene from "@/components/ContactVoyageScene";
import { Reveal, Line, useReveal, useTheme } from "@/components/site-chrome";
import { HOME_FAQS } from "@/data/faqs";
// Service artwork lives in /public/services with a light and dark rendering
// of each discipline. The paths are percent-encoded because the supplied
// filenames contain spaces (and a couple of typos we keep for fidelity).
const SERVICE_IMAGES = {
  app: {
    light: "/services/app%20development%20ligth%20.png",
    dark: "/services/app%20develoment%20dark.png",
  },
  web: {
    light: "/services/Web%20desing%20Light%20.png",
    dark: "/services/webdesing%20dark.png",
  },
  branding: {
    light: "/services/branding%20and%20desing%20light%20.png",
    dark: "/services/branding%20and%20desing%20dark.png",
  },
  marketing: {
    light: "/services/digital%20marketing%20light%20.png",
    dark: "/services/digital%20marketing%20dark.png",
  },
};
const brand1 = brand1Image;
const brand2 = brand2Image;
const brand3 = brand3Image;
const brand4 = brand4Image;
function SectionTitle({ eyebrow, title, action, actionHref }) {
  return (
    <Reveal className="section-head">
      <div className="section-head-copy">
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
      </div>
      {action && (
        <Link href={actionHref ?? "/services"} className="section-action">
          <span>{action}</span>
          <span className="section-action-icon" aria-hidden="true">
            <ArrowUpRight className="size-4" />
          </span>
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
const serviceImages = [
  SERVICE_IMAGES.web,
  SERVICE_IMAGES.app,
  SERVICE_IMAGES.web,
  SERVICE_IMAGES.marketing,
];
const works = [
  [
    "Zenith Fitness App",
    "Mobile App Development",
    "6 months",
    ["React Native", "Firebase", "Redux"],
    SERVICE_IMAGES.app,
  ],
  [
    "Aura E-commerce",
    "Web Design & Development",
    "3 months",
    ["WordPress", "PHP", "CSS3"],
    SERVICE_IMAGES.branding,
  ],
  [
    "Nova SaaS Platform",
    "Web Development",
    "4 months",
    ["Next.js", "Node", "Postgres"],
    SERVICE_IMAGES.web,
  ],
  [
    "Pulse Growth Campaign",
    "Digital Marketing",
    "Ongoing",
    ["Meta Ads", "Google Ads", "SEO"],
    SERVICE_IMAGES.marketing,
  ],
];
function ServicesList() {
  const { theme } = useTheme();
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const posRef = useRef(null);
  const cardRef = useRef(null);
  const prevActive = useRef(-1);
  const pointer = useRef({ x: 0, y: 0, t: 0 });
  const motion = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    scale: 0.82,
    targetScale: 0.82,
    lastMove: 0,
    running: false,
    raf: 0,
  });

  // One rAF loop eases the card's position, tilt and scale together. A fast
  // pointer glide reads as one continuous motion instead of a series of
  // restarted CSS transitions, and the loop parks itself once it has settled.
  const tick = useCallback(() => {
    const s = motion.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduce ? 1 : 0.16;
    // Tilt is driven by pointer speed and returns to flat once the pointer
    // stops, so it reads as momentum rather than a permanent skew.
    if (performance.now() - s.lastMove > 90) {
      s.targetTiltX = 0;
      s.targetTiltY = 0;
    }
    const stiffness = reduce ? 1 : 0.13;
    const damping = reduce ? 0 : 0.74;
    s.vx = (s.vx + (s.tx - s.x) * stiffness) * damping;
    s.vy = (s.vy + (s.ty - s.y) * stiffness) * damping;
    s.x += s.vx;
    s.y += s.vy;
    s.tiltX += (s.targetTiltX - s.tiltX) * ease;
    s.tiltY += (s.targetTiltY - s.tiltY) * ease;
    s.scale += (s.targetScale - s.scale) * ease;
    if (posRef.current) {
      posRef.current.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
    }
    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(1000px) rotateX(${s.tiltX.toFixed(2)}deg) ` +
        `rotateY(${s.tiltY.toFixed(2)}deg) rotateZ(-4deg) scale(${s.scale.toFixed(3)})`;
    }
    const settled =
      Math.abs(s.tx - s.x) < 0.15 &&
      Math.abs(s.ty - s.y) < 0.15 &&
      Math.abs(s.vx) < 0.05 &&
      Math.abs(s.vy) < 0.05 &&
      Math.abs(s.targetTiltX - s.tiltX) < 0.1 &&
      Math.abs(s.targetTiltY - s.tiltY) < 0.1 &&
      Math.abs(s.targetScale - s.scale) < 0.002;
    if (settled) {
      s.running = false;
      return;
    }
    s.raf = requestAnimationFrame(tick);
  }, []);

  const wake = useCallback(() => {
    const s = motion.current;
    if (s.running) return;
    s.running = true;
    s.raf = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    const s = motion.current;
    return () => {
      cancelAnimationFrame(s.raf);
      // StrictMode replays effects in dev: clear the flag too, or wake()
      // believes the loop is still alive and never schedules another frame.
      s.running = false;
    };
  }, []);

  useEffect(() => {
    const s = motion.current;
    s.targetScale = active >= 0 ? 1.03 : 0.82;
    // Appear at the cursor instead of gliding in from the list's top-left.
    if (active >= 0 && prevActive.current < 0) {
      s.x = s.tx;
      s.y = s.ty;
      s.vx = 0;
      s.vy = 0;
      s.tiltX = 0;
      s.tiltY = 0;
    }
    if (active < 0) {
      s.targetTiltX = 0;
      s.targetTiltY = 0;
    }
    prevActive.current = active;
    wake();
  }, [active, wake]);

  const move = (e) => {
    const box = boxRef.current;
    const card = cardRef.current;
    if (!box || !card) return;
    const r = box.getBoundingClientRect();
    const w = card.offsetWidth || 256;
    const h = card.offsetHeight || 192;
    const s = motion.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The row under the pointer is the magnet: pull the card's vertical
    // target mostly to that row's centre, with the cursor adding a small
    // offset, so it snaps row to row instead of merely trailing.
    const link = e.target instanceof Element ? e.target.closest("a[href^='/services/']") : null;
    let targetY = e.clientY - r.top - h / 2;
    if (link) {
      const row = link.getBoundingClientRect();
      targetY = targetY * 0.35 + (row.top + row.height / 2 - r.top - h / 2) * 0.65;
      if (!reduce) {
        const rel = (e.clientX - row.left) / row.width - 0.5;
        const title = link.querySelector(".service-mag-title");
        if (title) title.style.setProperty("--mag-x", `${(rel * 16).toFixed(1)}px`);
      }
    }
    // A gentle pull toward the list's centre makes the card feel drawn in.
    const centrePull = (r.width / 2 - (e.clientX - r.left)) * 0.12;
    s.tx = Math.max(0, Math.min(e.clientX - r.left - w / 2 + centrePull, r.width - w));
    s.ty = Math.max(0, Math.min(targetY, r.height - h));
    const now = performance.now();
    const prev = pointer.current;
    const dt = Math.max(now - prev.t, 8);
    const vx = (e.clientX - prev.x) / dt;
    const vy = (e.clientY - prev.y) / dt;
    pointer.current = { x: e.clientX, y: e.clientY, t: now };
    s.lastMove = now;
    if (!reduce) {
      s.targetTiltY = Math.max(-10, Math.min(10, vx * 5.5));
      s.targetTiltX = Math.max(-8, Math.min(8, -vy * 5.5));
    }
    wake();
  };

  return (
    <div
      ref={boxRef}
      className="relative divide-y border-y"
      onPointerMove={move}
      onPointerLeave={() => {
        setActive(-1);
        boxRef.current?.querySelectorAll(".service-mag-title").forEach((title) => {
          title.style.setProperty("--mag-x", "0px");
        });
      }}
    >
      <div
        ref={posRef}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          ref={cardRef}
          className={`relative h-48 w-64 overflow-hidden rounded-2xl border border-primary/30 transition-opacity duration-500 lg:h-60 lg:w-80 ${active >= 0 ? "opacity-100" : "opacity-0"}`}
          style={{ willChange: "transform" }}
        >
          {serviceImages.map((pair, k) => (
            <img
              key={k}
              src={theme === "light" ? pair.light : pair.dark}
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
            className="group flex items-center justify-between gap-6 py-6"
          >
            <span
              className={`font-mono text-xs tabular-nums transition-colors duration-300 ${active === i ? "text-primary" : "text-muted-foreground"}`}
            >
              {n}
            </span>
            <span
              className={`service-mag-title flex-1 font-display text-xl font-semibold tracking-tight transition-all duration-500 md:text-3xl ${active === i ? "text-primary" : active >= 0 ? "text-foreground/60" : "text-foreground"}`}
            >
              {t}
            </span>
            <span
              className={`hidden whitespace-nowrap text-sm transition-colors duration-300 md:block ${active === i ? "text-foreground" : "text-muted-foreground"}`}
            >
              Starts from {p}
            </span>
            <ArrowUpRight
              className={`size-6 shrink-0 transition-all duration-300 ${active === i ? "-translate-y-0.5 translate-x-0.5 text-primary" : "text-muted-foreground"}`}
            />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
function WorksStack() {
  const { theme } = useTheme();
  const refs = useRef([]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        if (!desktop.matches || reduce.matches) {
          el.style.removeProperty("--stack");
          return;
        }
        const next = refs.current[i + 1];
        if (!next) {
          el.style.setProperty("--stack", "0");
          return;
        }
        const a = el.getBoundingClientRect().top;
        const b = next.getBoundingClientRect().top;
        const height = el.offsetHeight || 1;
        // 0 while the next card is still fully below, 1 once it has covered
        // this one. The old viewport-based measure dimmed a card at rest.
        const p = Math.min(Math.max((a + height - b) / height, 0), 1);
        el.style.setProperty("--stack", p.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="relative">
      {works.map(([t, c, d, tech, palette], i) => (
        <div key={t} className="pb-6 lg:sticky lg:pb-8" style={{ top: `${96 + i * 40}px` }}>
          <div
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="work-card grid gap-4 rounded-2xl border bg-card p-4 sm:gap-6 sm:p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,0.9fr)]"
          >
            <div className="flex min-w-0 flex-col justify-between gap-6 p-1 sm:p-2">
              <div>
                <span className="font-mono text-[11px] tracking-widest text-primary tabular-nums">
                  0{i + 1} / 0{works.length}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {t}
                </h3>
                <div className="mt-4 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  <p>Category - {c}</p>
                  <p>Time taken - {d}</p>
                </div>
              </div>
              <div className="work-foot">
                <span className="work-details inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  Details <ArrowUpRight className="size-4" />
                </span>
              </div>
            </div>
            <div className="group/media min-w-0 overflow-hidden rounded-xl">
              <img
                src={theme === "light" ? palette.light : palette.dark}
                alt={t}
                width={944}
                height={704}
                loading="lazy"
                className="aspect-[16/10] size-full object-cover transition duration-700 group-hover/media:scale-[1.04]"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-between gap-6 p-1 sm:p-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Technologies
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tech.map((x) => (
                    <span key={x} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="work-foot">
                <a
                  href="#contact"
                  className="work-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition"
                >
                  Book a call <ArrowUpRight className="size-4" />
                </a>
              </div>
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
    const measure = () => {
      if (measureRef.current) setBoxW(measureRef.current.offsetWidth);
    };
    measure();
    // The box width depends on the font size, which jumps at the sm/lg
    // breakpoints, so re-measure on resize instead of waiting for the next word.
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [i]);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  // Three core offers, straight from the services data so the copy can't drift.
  const features = [SERVICES[0], SERVICES[5], SERVICES[6]];
  return (
    <section className="hero-soft relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[var(--site-gutter)] pb-16 pt-32 text-center sm:pb-20 sm:pt-36">
      {/* Architectural frame + ambient glows, borrowed from todesktop's hero. */}
      <span className="hero-frame hero-frame-a" aria-hidden="true" />
      <span className="hero-frame hero-frame-b" aria-hidden="true" />
      <span className="hero-aura" aria-hidden="true" />
      <HeroTechIcons />

      <h1 className="relative z-10 mt-6 max-w-[var(--site-max)] font-display text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
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

      <Reveal delay={450} className="relative z-10 mt-7 max-w-2xl">
        <p className="text-base text-muted-foreground md:text-lg">
          Ideaboat is a digital marketing, design & development studio steering brands toward real
          growth.
        </p>
      </Reveal>

      <Reveal
        delay={560}
        className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Start a Project <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
        </a>
        <Link
          href="/book-a-discovery-call"
          className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-7 py-3.5 text-sm font-medium backdrop-blur transition hover:border-primary/50 hover:text-primary"
        >
          Book a call
        </Link>
      </Reveal>

      <Reveal delay={680} className="relative z-10 mt-6 flex items-center gap-3">
        <div className="flex -space-x-3">
          {[brand1.src, brand2.src, brand3.src, brand4.src].map((b, k) => (
            <img
              key={k}
              src={b}
              alt=""
              loading="lazy"
              className="size-9 rounded-full border-2 border-background object-cover"
            />
          ))}
        </div>
        <p className="text-sm">
          <span className="font-bold text-primary">200+</span>{" "}
          <span className="text-muted-foreground">brands trust our crew</span>
        </p>
      </Reveal>

      {/* Three-up feature strip, ruled like todesktop's hero columns. */}
      <Reveal delay={780} className="relative z-10 mt-10 w-full max-w-4xl sm:mt-14">
        <div className="mx-auto grid w-full max-w-md gap-6 md:max-w-none md:grid-cols-3 md:gap-0">
          {features.map((f, k) => {
            const Icon = f.icon;
            return (
              <div
                key={f.slug}
                className="relative flex items-center gap-4 text-left md:flex-col md:gap-0 md:px-6 md:text-center"
              >
                {k > 0 && (
                  <span
                    className="absolute left-0 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-border md:block"
                    aria-hidden="true"
                  />
                )}
                <span className="hero-feature-icon shrink-0">
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0 md:mt-4">
                  <h2 className="font-display text-[15px] font-semibold leading-snug">{f.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:mt-1.5 md:max-w-[15.5rem]">
                    {f.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
export default function Index() {
  useReveal();
  const [open, setOpen] = useState(0);
  return (
    <div className="overflow-x-clip">
      {/* HERO - Sheryians-style centered */}
      <Hero />

      {/* PROOF BAND — the headline metrics, the service ticker and the next
          step share one ruled surface instead of three floating strips. */}
      <section className="page-container pt-10 md:pt-14" aria-label="Ideaboat at a glance">
        <Reveal className="proof-band">
          <div className="proof-lead">
            {[
              ["743k", "Followers across socials", "+18% this year"],
              ["280+", "Projects delivered", "Across 12 industries"],
            ].map(([v, l, s]) => (
              <div className="proof-metric group" key={l}>
                <p className="proof-label">{l}</p>
                <div className="proof-metric-foot">
                  <p className="glass-text font-display text-3xl font-semibold tracking-tight sm:text-[2.75rem]">
                    {v}
                  </p>
                  <p className="proof-sub">{s}</p>
                </div>
                <span className="proof-sweep" aria-hidden="true" />
              </div>
            ))}
            <a href="#contact" className="proof-cta group">
              <span className="proof-cta-wash" aria-hidden="true" />
              <span className="proof-cta-fill" aria-hidden="true" />
              <span className="proof-cta-body">
                <span>
                  <span className="proof-cta-title">Start your project</span>
                  <span className="proof-cta-sub">Reply within 24 hours.</span>
                </span>
                <span className="proof-cta-icon">
                  <ArrowUpRight className="size-5 sm:size-6" />
                </span>
              </span>
            </a>
          </div>

          <div className="proof-ticker group/mq">
            <div className="proof-marquee marquee group-hover/mq:[animation-play-state:paused]">
              {[...marqueeItems, ...marqueeItems].map((m, i) => (
                <span key={i} className="flex items-center">
                  <span className="cursor-default select-none whitespace-nowrap px-6 font-display text-lg font-light tracking-tight text-muted-foreground transition-colors duration-300 hover:text-foreground sm:px-9 sm:text-xl">
                    {m}
                  </span>
                  <span className="size-1 shrink-0 rounded-full bg-primary/70" />
                </span>
              ))}
            </div>
          </div>

          <div className="proof-facts">
            {stats.map(([v, l], i) => (
              <Reveal key={l} delay={i * 80} className="proof-fact group">
                <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{v}</p>
                <p className="proof-label mt-1.5">{l}</p>
                <span className="proof-sweep" aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <main
        id="main-content"
        className="page-container space-y-16 pb-16 pt-12 md:space-y-24 md:pb-24 md:pt-20"
      >

        {/* WHY */}
        <section>
          <SectionTitle eyebrow="Why Ideaboat" title="What we bring to the table" />
          <div className="reasons-band">
            {reasons.map(([t, d], i) => {
              const Icon = reasonIcons[i] ?? Cpu;
              return (
                <Reveal key={t} delay={i * 120} className="reason">
                  <div className="reason-head">
                    <span className="reason-icon">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="reason-index">0{i + 1}</span>
                  </div>
                  <h3 className="reason-title">{t}</h3>
                  <p className="reason-copy">{d}</p>
                  <div className="reason-foot">
                    <span className="reason-rule" aria-hidden="true" />
                    <Link href="/about" className="reason-link">
                      Learn more
                      <span className="reason-arrow">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section>
          <SectionTitle
            eyebrow="Services"
            title="What we're good at"
            action="Book a call"
            actionHref="/book-a-discovery-call"
          />
          <ServicesList />
        </section>

        {/* WORKS */}
        <section>
          <SectionTitle
            eyebrow="Recent work"
            title="Work we're proud of"
            action="All services"
            actionHref="/services"
          />
          <WorksStack />
        </section>

        {/* TESTIMONIALS */}
        <section>
          <SectionTitle eyebrow="From our clients" title="Don't take our word for it" />
          <TestimonialCarousel />
        </section>

        {/* FAQ */}
        <section className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <Reveal className="md:sticky md:top-28 md:self-start">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Questions we get a lot
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Everything you might want to know before starting your project.
            </p>
            <div className="mt-7 max-w-sm rounded-2xl bg-muted p-5">
              <p className="text-sm font-semibold">Still have a question?</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Write to us and we will help you get started.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Mail className="size-3.5" />
                Email us
              </Link>
            </div>
          </Reveal>
          <div className="space-y-2.5">
            {HOME_FAQS.map(({ question, answer }, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={question} delay={i * 60}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isOpen ? "border-border bg-card" : "border-transparent bg-muted hover:bg-muted/70"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
                      <span className="flex-1 font-medium leading-snug">{question}</span>
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-foreground text-background" : "bg-background text-foreground"}`}
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

        {/* CONTACT + CTA - side by side */}
        <section
          id="contact"
          className="grid scroll-mt-24 items-stretch gap-8 md:scroll-mt-28 lg:grid-cols-2"
        >
          <Reveal className="h-full">
            <ContactForm />
          </Reveal>
          <Reveal className="h-full">
            <h2 className="sr-only">Ready to set sail on your digital journey?</h2>
            <ContactVoyageScene />
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
      <div className="glass flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl p-8 text-center">
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
    <div className="glass flex h-full flex-col rounded-3xl p-8">
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
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${topic === t ? "border-primary bg-primary font-medium text-primary-foreground" : "text-muted-foreground hover:border-primary/60 hover:text-foreground"}`}
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
          <span className="absolute bottom-3 right-4 text-[11px] tabular-nums text-muted-foreground">
            {vals.msg.length}/300
          </span>
        </label>
        <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]">
          Send message <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
        </button>
      </form>
    </div>
  );
}
