import logoImage from "@/assets/ideaboat-logo-white.png";
import darkLogoImage from "@/assets/ideaboat-logo.png";
import { useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode, type PointerEvent } from "react";
import { ArrowUpRight, Sun, Moon, Menu, X, Plus } from "lucide-react";
import { SERVICES } from "@/data/services";
import { ServicePreviewArt } from "@/components/ServicePreviewArt";
import wordmarkImage from "@/assets/ideaboat-logo-white.png";

const logoAsset = logoImage;
const darkLogoAsset = darkLogoImage;
const wordmarkAsset = wordmarkImage;

/* ---------- shared visual helpers (same design language as the home page) ---------- */

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="line-mask">
      <span style={{ animationDelay: `${delay}ms` }}>{children}</span>
    </span>
  );
}

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={move}
      className={`spotlight-card group relative rounded-xl border bg-card ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- theme ---------- */

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.remove("light");
      setTheme("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode */
    }
    setTheme(next);
  };
  return { theme, toggleTheme };
}

/* ---------- site-wide navigation ---------- */

export const NAV = [
  { label: "Home", href: "/" } as const,
  { label: "About Us", href: "/about" } as const,
  { label: "Services", href: "/services" } as const,
  { label: "Industries", href: "/industries" } as const,
  { label: "Contact", href: "/contact" } as const,
];

const serviceGroups = [
  { title: "AI Solutions", tag: "Intelligence", items: SERVICES.slice(0, 4) },
  { title: "Build & Grow", tag: "Craft", items: SERVICES.slice(4) },
];

function ServicesDropdown({ active }: { active: boolean }) {
  const [preview, setPreview] = useState(0);
  return (
    <div className="group/dd relative">
      <Link
        to="/services"
        className={`flex items-center gap-1 rounded-full px-4 py-2 transition duration-300 hover:bg-foreground/[0.06] hover:text-foreground ${active ? "bg-foreground/[0.06] text-foreground" : ""}`}
      >
        Services <Plus className="size-3 transition duration-500 group-hover/dd:rotate-[135deg]" />
      </Link>
      <div className="invisible absolute left-1/2 top-full w-[780px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-500 group-hover/dd:visible group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:opacity-100">
        <div className="grid grid-cols-[1fr_1.15fr_200px] gap-2 overflow-hidden rounded-[28px] border bg-popover p-3 text-left">
          {serviceGroups.map((g) => (
            <div key={g.title} className="p-2">
              <ul>
                {g.items.map((s) => {
                  const idx = SERVICES.indexOf(s);
                  const isPreview = preview === idx;
                  return (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        onMouseEnter={() => setPreview(idx)}
                        onFocus={() => setPreview(idx)}
                        className={`dd-item group/it flex items-center gap-3 rounded-xl px-2 py-2 text-[13px] transition hover:bg-foreground/[0.05] hover:text-foreground ${isPreview ? "bg-foreground/[0.05] text-foreground" : "text-muted-foreground"}`}
                      >
                        <span className="font-mono text-[10px] text-muted-foreground/60 transition group-hover/it:text-primary">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="whitespace-nowrap transition-transform duration-300 group-hover/it:translate-x-1">
                          {s.title}
                        </span>
                        <ArrowUpRight className="ml-auto size-3.5 -translate-x-1 opacity-0 transition group-hover/it:translate-x-0 group-hover/it:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="dd-feature relative flex items-center justify-center overflow-hidden rounded-2xl bg-primary p-4 text-primary-foreground">
            <div className="relative flex items-center justify-center" aria-hidden>
              <ServicePreviewArt service={preview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 md:px-6 ${scrolled ? "py-3" : "py-4 md:py-6"}`}
    >
      <div className="glass nav-solid mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 md:pl-6">
        <Link to="/" aria-label="Ideaboat home">
          <img
            src={theme === "light" ? darkLogoAsset : logoAsset}
            alt="Ideaboat"
            className="h-4 w-auto md:h-[18px]"
          />
        </Link>
        <nav className="hidden items-center gap-1 text-[13px] font-medium text-muted-foreground md:flex">
          {NAV.map((n) =>
            n.label === "Services" ? (
              <ServicesDropdown key={n.label} active={isActive("/services")} />
            ) : (
              <Link
                key={n.label}
                to={n.href}
                className={`rounded-full px-4 py-2 transition duration-300 hover:bg-foreground/[0.06] hover:text-foreground ${isActive(n.href) ? "bg-foreground/[0.06] text-foreground" : ""}`}
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid size-10 place-items-center rounded-full text-muted-foreground transition hover:bg-foreground/[0.06] hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-full text-foreground transition hover:bg-foreground/[0.06] md:hidden"
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link
            to="/book-a-discovery-call"
            className="group hidden items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition hover:bg-primary hover:text-primary-foreground sm:flex"
          >
            Book a discovery call
            <ArrowUpRight className="size-3.5 transition group-hover:rotate-45" />
          </Link>
        </div>
      </div>
      <div
        className={`glass nav-solid mx-auto mt-2 grid max-w-6xl overflow-hidden rounded-3xl transition-all duration-500 md:hidden ${menu ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col p-3">
            {NAV.map((n) => (
              <div key={n.label}>
                <Link
                  to={n.href}
                  onClick={() => setMenu(false)}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium transition hover:bg-foreground/[0.06] ${isActive(n.href) ? "text-primary" : "text-foreground"}`}
                >
                  {n.label}
                </Link>
                {n.label === "Services" && (
                  <div className="mb-2 ml-4 flex flex-wrap gap-1.5 border-l pl-3">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        onClick={() => setMenu(false)}
                        className="rounded-full border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/book-a-discovery-call"
              onClick={() => setMenu(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-foreground py-3 text-sm font-medium text-background"
            >
              Book a discovery call
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function FooterWordmark() {
  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--glow-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
  };
  return (
    <div className="footer-wordmark mx-auto w-full max-w-6xl px-3 pb-4 pt-16 md:px- md:pt-24">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter
          id="footer-wordmark-stroke"
          colorInterpolationFilters="sRGB"
          x="-2%"
          y="-10%"
          width="104%"
          height="120%"
        >
          <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="dilated" />
          <feFlood className="footer-wordmark-flood" />
          <feComposite in2="dilated" operator="in" result="stroke" />
          <feComposite in="stroke" in2="SourceAlpha" operator="xor" />
        </filter>
      </svg>
      <div
        className="footer-wordmark-art"
        role="img"
        aria-label="Ideaboat"
        onPointerEnter={followPointer}
        onPointerMove={followPointer}
      >
        <img src={wordmarkAsset} alt="" aria-hidden className="footer-wordmark-outline" />
        <div
          className="footer-wordmark-layer footer-wordmark-halo"
          style={{ WebkitMaskImage: `url(${wordmarkAsset})`, maskImage: `url(${wordmarkAsset})` }}
        />
        <div
          className="footer-wordmark-layer footer-wordmark-glow"
          style={{ WebkitMaskImage: `url(${wordmarkAsset})`, maskImage: `url(${wordmarkAsset})` }}
        />
      </div>
    </div>
  );
}

export function SiteFooter({ theme }: { theme: "dark" | "light" }) {
  const linkCls = "font-medium text-foreground transition hover:text-primary";
  const headCls = "text-xs uppercase tracking-[0.12em] text-muted-foreground";
  return (
    <footer className="site-footer overflow-hidden border-t bg-card" data-theme={theme}>
      <FooterWordmark />
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
        <div>
          <img src={logoAsset} alt="Ideaboat" className="h-5 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Ideas that sail brands forward.
          </p>
        </div>
        <div>
          <p className={headCls}>Company</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.filter((n) => n.label !== "Services").map((n) => (
              <li key={n.label}>
                <Link to={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {serviceGroups.map((g) => (
          <div key={g.title}>
            <p className={headCls}>{g.title}</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {g.items.map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t py-7 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ideaboat. All rights reserved.
      </p>
    </footer>
  );
}

export function CTASection({
  title = "Have an idea in mind?",
  text = "Let's talk about where AI and automation can create real value for your business.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Reveal className="relative overflow-hidden rounded-[28px] bg-primary p-10 text-primary-foreground md:p-14">
      <div className="texture-grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary-foreground/10 blur-2xl" />
      <div className="spin-slow absolute -right-20 -top-20 size-72 rounded-full border border-dashed border-primary-foreground/40" />
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-8">
        <div>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-sm opacity-80 md:text-base">{text}</p>
        </div>
        <Link
          to="/book-a-discovery-call"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background transition hover:bg-foreground/85"
        >
          Book a discovery call <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </Reveal>
  );
}

/* ---------- shared enquiry form (contact / discovery call) ---------- */

export const SUBJECTS = [
  "Intelligent Automation & AI",
  "System Integrations",
  "AI Agents & Internal Tools",
  "Data Orchestration",
  "Support & Monitoring",
];

const inputCls =
  "w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary";

export function EnquiryForm({ heading, subtext }: { heading: string; subtext: string }) {
  const [sent, setSent] = useState(false);
  return (
    <SpotlightCard className="p-6 md:p-8">
      <h3 className="relative font-display text-2xl font-semibold">{heading}</h3>
      <p className="relative mt-2 text-sm text-muted-foreground">{subtext}</p>
      {sent ? (
        <div className="relative mt-8 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center">
          <p className="font-display text-lg font-semibold text-primary">
            Thanks — we've received your message.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            We'll review your requirements and get back to you soon.
          </p>
        </div>
      ) : (
        <form
          className="relative mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input required name="name" placeholder="Name" className={inputCls} />
          <input name="phone" type="tel" placeholder="Phone" className={inputCls} />
          <input
            required
            name="email"
            type="email"
            placeholder="Business Email"
            className={inputCls}
          />
          <input name="company" placeholder="Company name" className={inputCls} />
          <select name="subject" required defaultValue="" className={`${inputCls} sm:col-span-2`}>
            <option value="" disabled>
              Select a subject
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            required
            name="message"
            placeholder="Message"
            rows={5}
            className={`${inputCls} resize-none sm:col-span-2`}
          />
          <p className="text-xs text-muted-foreground sm:col-span-2">
            We'll only use your info to respond to your inquiry.
          </p>
          <button
            type="submit"
            className="group inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-medium text-primary-foreground transition hover:bg-primary/90 sm:col-span-2"
          >
            Send message <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
          </button>
        </form>
      )}
    </SpotlightCard>
  );
}
