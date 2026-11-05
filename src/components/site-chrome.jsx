"use client";
import logoImage from "@/assets/ideaboat-logo-white.png";
import darkLogoImage from "@/assets/ideaboat-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
    // Without IntersectionObserver the `.js` class would keep every block
    // hidden forever, so reveal everything up front.
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
export function Line({ children, delay }) {
  return (
    <span className="line-mask">
      <span style={{ animationDelay: `${delay}ms` }}>{children}</span>
    </span>
  );
}
export function SpotlightCard({ children, className = "" }) {
  const move = (e) => {
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
const ThemeContext = createContext(null);
/**
 * Theme state for the whole chrome. The initial class is applied by the inline
 * script in the root layout (before first paint), so this provider only has to
 * mirror it in React state and persist the user's choice.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      /* private mode */
    }
    const next = stored === "dark" ? "dark" : "light";
    document.documentElement.classList.toggle("light", next === "light");
    setTheme(next);
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("light", next === "light");
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode */
      }
      return next;
    });
  }, []);
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
/* ---------- site-wide navigation ---------- */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];
const serviceGroups = [
  { title: "AI Solutions", tag: "Intelligence", items: SERVICES.slice(0, 4) },
  { title: "Build & Grow", tag: "Craft", items: SERVICES.slice(4) },
];
function ServicesDropdown({ active }) {
  const [preview, setPreview] = useState(0);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapper = useRef(null);
  const pathname = usePathname();
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const show = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);
  // Small delay so moving from the trigger into the panel never closes it
  // while the pointer crosses the gap.
  const hide = useCallback(
    (delay = 140) => {
      cancelClose();
      closeTimer.current = setTimeout(() => setOpen(false), delay);
    },
    [cancelClose],
  );
  // Close after navigating away.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onOutsidePointer = (event) => {
      if (!wrapper.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutsidePointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutsidePointer);
    };
  }, [open]);
  useEffect(() => () => cancelClose(), [cancelClose]);
  return (
    <div
      ref={wrapper}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={() => hide()}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) hide(0);
      }}
    >
      {/* The only navigable part of this menu: goes to the services listing. */}
      <Link
        href="/services"
        className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 transition duration-300 hover:bg-foreground/[0.06] hover:text-foreground ${active ? "bg-foreground/[0.06] text-foreground" : ""}`}
      >
        Services{" "}
        <Plus className={`size-3 transition duration-500 ${open ? "rotate-[135deg]" : ""}`} />
      </Link>

      <div
        id="services-menu"
        onPointerDown={show}
        className={`absolute left-1/2 top-full z-20 w-[min(780px,calc(100vw-1.5rem))] -translate-x-1/2 pt-4 transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="grid grid-cols-[1fr_1.15fr_200px] gap-2 overflow-hidden rounded-[28px] border bg-popover p-3 text-left">
          {serviceGroups.map((g) => (
            <div key={g.title} className="p-2">
              <ul>
                {g.items.map((s) => {
                  const idx = SERVICES.indexOf(s);
                  const isPreview = preview === idx;
                  return (
                    <li key={s.slug}>
                      {/* Static preview row: intentionally not a link, so it
                        never navigates. Only the "Services" nav item does. */}
                      <div
                        onMouseEnter={() => setPreview(idx)}
                        className={`dd-item flex cursor-default items-center gap-3 rounded-xl px-2 py-2 text-[13px] transition ${
                          isPreview
                            ? "bg-foreground/[0.05] text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span className="font-mono text-[10px] text-muted-foreground/60">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="whitespace-nowrap">{s.title}</span>
                      </div>
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
export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname() ?? "/";
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
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 md:px-6 ${scrolled ? "py-3" : "py-4 md:py-6"}`}
    >
      <div className="glass nav-solid mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 transition-all duration-500 sm:pl-5 md:pl-6">
        <Link href="/" aria-label="Ideaboat home" className="shrink-0">
          <img
            src={theme === "light" ? darkLogoAsset.src : logoAsset.src}
            alt="Ideaboat"
            className="h-4 w-auto md:h-[18px]"
          />
        </Link>
        <nav className="hidden items-center gap-1 whitespace-nowrap text-[13px] font-medium text-muted-foreground lg:flex">
          {NAV.map((n) =>
            n.label === "Services" ? (
              <ServicesDropdown key={n.label} active={isActive("/services")} />
            ) : (
              <Link
                key={n.label}
                href={n.href}
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
            className="grid size-10 place-items-center rounded-full text-foreground transition hover:bg-foreground/[0.06] lg:hidden"
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link
            href="/book-a-discovery-call"
            className="group hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition hover:bg-primary hover:text-primary-foreground sm:flex"
          >
            Book a discovery call
            <ArrowUpRight className="size-3.5 transition group-hover:rotate-45" />
          </Link>
        </div>
      </div>
      <div
        className={`glass nav-solid mx-auto mt-2 grid max-w-6xl overflow-hidden rounded-3xl transition-all duration-500 lg:hidden ${menu ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col p-3">
            {NAV.map((n) => (
              <div key={n.label}>
                <Link
                  href={n.href}
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
                        href={`/services/${s.slug}`}
                        prefetch
                        onClick={() => setMenu(false)}
                        className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/book-a-discovery-call"
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
  const followPointer = (event) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--glow-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
  };
  return (
    <div className="footer-wordmark mx-auto w-full max-w-6xl px-3 pb-4 pt-16 md:px-6 md:pt-24">
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
        <img src={wordmarkAsset.src} alt="" aria-hidden className="footer-wordmark-outline" />
        <div
          className="footer-wordmark-layer footer-wordmark-halo"
          style={{
            WebkitMaskImage: `url(${wordmarkAsset.src})`,
            maskImage: `url(${wordmarkAsset.src})`,
          }}
        />
        <div
          className="footer-wordmark-layer footer-wordmark-glow"
          style={{
            WebkitMaskImage: `url(${wordmarkAsset.src})`,
            maskImage: `url(${wordmarkAsset.src})`,
          }}
        />
      </div>
    </div>
  );
}
export function SiteFooter() {
  const linkCls = "font-medium text-foreground transition hover:text-primary";
  const headCls = "text-xs uppercase tracking-[0.12em] text-muted-foreground";
  return (
    <footer className="site-footer overflow-hidden border-t bg-card">
      <FooterWordmark />
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
        <div>
          <img src={logoAsset.src} alt="Ideaboat" className="h-5 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Ideas that sail brands forward.
          </p>
        </div>
        <div>
          <p className={headCls}>Company</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.filter((n) => n.label !== "Services").map((n) => (
              <li key={n.label}>
                <Link href={n.href} className={linkCls}>
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
                  <Link href={`/services/${s.slug}`} className={linkCls}>
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
          href="/book-a-discovery-call"
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
export function EnquiryForm({ heading, subtext }) {
  const [sent, setSent] = useState(false);
  return (
    <SpotlightCard className="p-6 md:p-8">
      <h2 className="relative font-display text-2xl font-semibold">{heading}</h2>
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
