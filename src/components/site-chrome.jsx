"use client";
import logoImage from "@/assets/ideaboat-logo-white.png";
import darkLogoImage from "@/assets/ideaboat-logo.png";
import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { siteConfig } from "@/lib/site";
import sailboatEmblem from "@/assets/sailboat-emblem.png";
import wordmarkImage from "@/assets/ideaboat-logo-white.png";
const sailboatAsset = sailboatEmblem.src;
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
      className={`spotlight-card group relative rounded-2xl border bg-card ${className}`}
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
// AEO & GEO is retired from navigation (its page stays reachable directly).
// The remaining eight services split evenly: four per column.
export const NAV_SERVICES = SERVICES.filter((s) => s.slug !== "aeo-geo");
export const serviceGroups = [
  { title: "AI Solutions", tag: "Intelligence", items: NAV_SERVICES.slice(0, 4) },
  { title: "Build & Grow", tag: "Craft", items: NAV_SERVICES.slice(4) },
];
function ServicesDropdown({ index, itemRef, active, onHover }) {
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapper = useRef(null);
  const panelRef = useRef(null);
  const [pos, setPos] = useState(null);
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
    onHover(index);
  }, [cancelClose, index, onHover]);
  // Small delay so moving from the trigger into the panel never closes it
  // while the pointer crosses the gap.
  const hide = useCallback(
    (delay = 120) => {
      cancelClose();
      setPreview(null);
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
      if (
        !wrapper.current?.contains(event.target) &&
        !panelRef.current?.contains(event.target)
      ) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutsidePointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutsidePointer);
    };
  }, [open]);
  useEffect(() => () => cancelClose(), [cancelClose]);

  // The panel is portaled to <body> and positioned from live rects so it stays
  // aligned with the navbar in both header states and throughout scrolling.
  // The scrolled shell morphs over 0.45s, so we track it every animation frame
  // instead of relying on scroll events alone (which stop before the morph does).
  useEffect(() => {
    if (!open) return;
    let frame;
    let last = null;
    const update = () => {
      const trigger = wrapper.current?.getBoundingClientRect();
      const shellEl = wrapper.current?.closest(".nav-shell");
      if (!trigger || !shellEl) return;
      const shell = shellEl.getBoundingClientRect();
      const scrolled = shellEl.classList.contains("nav-shell-scrolled");
      // Scrolled: align to the compact pill. At rest: sit under the trigger.
      const anchor = scrolled ? shell : trigger;
      const top = scrolled ? shell.bottom + 4 : trigger.bottom;
      const left = anchor.left + anchor.width / 2;
      if (!last || last.top !== top || last.left !== left) {
        last = { top, left };
        setPos(last);
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Two balanced columns mirror the reference: a raised, "primary" card and a
  // quieter secondary card. Each row links to its service detail page.
  const renderGroup = (items, offset, variant) => (
    <div className={`nav-dd-panel nav-dd-panel-${variant}`}>
      <p className="nav-dd-section">
        {variant === "primary" ? "AI & Automation" : "Design & Growth"}
      </p>
      <ul role="list" onMouseLeave={() => setPreview(null)}>
        {items.map((s, i) => {
          const idx = offset + i;
          const Icon = s.icon;
          return (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                prefetch
                onClick={() => setOpen(false)}
                onMouseEnter={() => setPreview(idx)}
                onFocus={() => setPreview(idx)}
                className={`nav-dd-row ${preview === idx ? "is-preview" : ""}`}
              >
                <span className="nav-dd-icon">
                  {Icon ? <Icon size={18} strokeWidth={1.8} aria-hidden="true" /> : null}
                </span>
                <span className="nav-dd-copy">
                  <span className="nav-dd-title">{s.navTitle ?? s.title}</span>
                  <span className="nav-dd-desc">{s.tagline}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div
      ref={(el) => {
        wrapper.current = el;
        itemRef(el);
      }}
      className="nav-item nav-item-services"
      onMouseEnter={show}
      onMouseLeave={() => hide()}
      onFocus={show}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !panelRef.current?.contains(event.relatedTarget)
        ) hide(0);
      }}
    >
      {/* Goes to the full services listing; the rows below link to details. */}
      <Link
        href="/services"
        aria-expanded={open}
        aria-controls="services-menu"
        className={`nav-link group ${active ? "is-active" : ""} ${open ? "is-open" : ""}`}
      >
        Services
        <ChevronRight className="nav-chevron" strokeWidth={2} aria-hidden="true" />
      </Link>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            id="services-menu"
            className="nav-dropdown nav-dropdown-portal is-open"
            style={{ top: pos?.top ?? 0, left: pos?.left ?? 0 }}
            onMouseEnter={cancelClose}
            onMouseLeave={() => hide()}
          >
            <div className="nav-dropdown-bridge" aria-hidden="true" />
            <div className="nav-dropdown-panel">
              <div className="nav-dropdown-grid">
                {renderGroup(NAV_SERVICES.slice(0, 4), 0, "primary")}
                {renderGroup(NAV_SERVICES.slice(4), 4, "secondary")}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const pillRef = useRef(null);
  const pathname = usePathname() ?? "/";
  const isActive = useCallback(
    (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  );
  const activeIndex = NAV.findIndex((n) => isActive(n.href));
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMenu(false);
    setServicesOpen(false);
  }, [pathname]);
  // Lock the page while the full-screen sheet is open and close it on Escape.
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);
  // The inline nav only exists from lg up, so drop the sheet when it appears.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) setMenu(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  // A single pill slides between nav items: it sits on the active page by
  // default and follows the pointer (or keyboard focus) while it is inside.
  const targetIndex = hovered ?? (activeIndex >= 0 ? activeIndex : null);
  const placePill = useCallback(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const item = targetIndex === null ? null : itemRefs.current[targetIndex];
    if (!item) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.width = `${item.offsetWidth}px`;
    pill.style.transform = `translateX(${item.offsetLeft}px)`;
    pill.style.opacity = "1";
  }, [targetIndex]);
  useLayoutEffect(() => {
    placePill();
    // Keep following the items while the bar animates between its two states.
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      placePill();
      if (now - start < 520) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [placePill, scrolled]);
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => placePill());
    if (navRef.current) observer.observe(navRef.current);
    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, [placePill]);
  useEffect(() => {
    if (!document.fonts) return;
    document.fonts.ready.then(() => placePill());
  }, [placePill]);
  return (
    <header
      className={`nav-header inset-x-0 top-0 z-50 lg:top-6 ${scrolled ? "nav-header-scrolled fixed" : "absolute"} ${menu ? "nav-header-menu-open" : ""}`}
    >
      <div className={`nav-shell ${scrolled ? "nav-shell-scrolled" : ""}`}>
        <Link href="/" aria-label="Ideaboat home" className="nav-logo">
          <img
            src={menu ? logoAsset.src : theme === "light" ? darkLogoAsset.src : logoAsset.src}
            alt="Ideaboat"
            className="nav-logo-wordmark"
          />
          <img src={sailboatAsset} alt="" aria-hidden="true" className="nav-logo-mark" />
        </Link>

        <nav
          ref={navRef}
          aria-label="Main"
          className="nav-links"
          onMouseLeave={() => setHovered(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null);
          }}
        >
          <span ref={pillRef} className="nav-pill" aria-hidden="true" />
          {NAV.map((n, i) =>
            n.label === "Services" ? (
              <ServicesDropdown
                key={n.label}
                index={i}
                itemRef={(el) => {
                  itemRefs.current[i] = el;
                }}
                active={isActive(n.href)}
                onHover={setHovered}
              />
            ) : (
              <Link
                key={n.label}
                href={n.href}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                className={`nav-link ${isActive(n.href) ? "is-active" : ""}`}
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="nav-icon-btn"
          >
            {theme === "dark" ? <Sun className="size-[17px]" /> : <Moon className="size-[17px]" />}
          </button>
          <button
            onClick={() => setMenu((value) => !value)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            className="nav-icon-btn nav-menu-btn"
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link
            href="/book-a-discovery-call"
            className="nav-cta surface-sheen group hidden sm:inline-flex"
          >
            Book a call
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:rotate-45" />
          </Link>
        </div>
      </div>

      <div id="mobile-menu" className={`nav-mobile ${menu ? "is-open" : ""}`} aria-hidden={!menu}>
        <div className="nav-mobile-list">
          {NAV.map((n, i) =>
            n.label === "Services" ? (
              <div key={n.label} style={{ "--nav-i": i }}>
                <div className="nav-mobile-row">
                  <Link
                    href={n.href}
                    onClick={() => setMenu(false)}
                    className={`nav-mobile-item nav-mobile-item-split ${isActive(n.href) ? "is-active" : ""}`}
                  >
                    {n.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((value) => !value)}
                    aria-label={servicesOpen ? "Hide services" : "Show services"}
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-services"
                    className="nav-mobile-expand"
                  >
                    <ChevronRight
                      className={`size-5 transition-transform duration-300 ${servicesOpen ? "rotate-90" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div
                  id="mobile-services"
                  className={`nav-mobile-services ${servicesOpen ? "is-open" : ""}`}
                >
                  <div className="nav-mobile-services-inner">
                    {serviceGroups.map((group) => (
                      <div className="nav-mobile-service-group" key={group.title}>
                        <p className="nav-mobile-service-label">{group.title}</p>
                        <ul role="list">
                          {group.items.map((s) => {
                            const Icon = s.icon;
                            return (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                prefetch
                                onClick={() => setMenu(false)}
                                className="nav-mobile-service"
                              >
                                <span className="nav-dd-icon">
                                  {Icon ? <Icon size={18} strokeWidth={1.8} aria-hidden="true" /> : null}
                                </span>
                                <span className="nav-mobile-service-title">{s.navTitle ?? s.title}</span>
                                <ChevronRight className="size-4 opacity-40" aria-hidden="true" />
                              </Link>
                            </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setMenu(false)}
                style={{ "--nav-i": i }}
                className={`nav-mobile-item ${isActive(n.href) ? "is-active" : ""}`}
              >
                {n.label}
                <ChevronRight className="nav-mobile-chevron" aria-hidden="true" />
              </Link>
            ),
          )}
        </div>
        <div className="nav-mobile-footer">
          <Link
            href="/book-a-discovery-call"
            onClick={() => setMenu(false)}
            className="nav-cta surface-sheen group flex h-12 w-full items-center justify-center text-sm"
          >
            Book a call
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function FooterWordmark() {
  const followPointer = (event) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const art = event.currentTarget;
    art.style.setProperty("--glow-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    art.style.setProperty("--glow-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };
  return (
    <div className="footer-wordmark page-container pb-4 pt-16 md:pt-24">
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
const SOCIAL_ICONS = { LinkedIn: Linkedin, Facebook, Instagram };
export function SiteFooter() {
  const linkCls = "font-medium text-foreground transition hover:text-primary";
  const headCls = "footer-head text-xs uppercase tracking-[0.12em] text-muted-foreground";
  return (
    <footer className="site-footer overflow-hidden border-t bg-card">
      <FooterWordmark />
      <div className="page-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
        <div>
          <img src={logoAsset.src} alt="Ideaboat" className="h-5 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Ideas that sail brands forward.
          </p>
          <address className="footer-address mt-6 not-italic text-sm leading-relaxed text-muted-foreground">
            <span className="footer-address-label block">Studio</span>
            {siteConfig.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
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

      {/* Connect strip: real contact routes and socials, on one hairline. */}
      <div className="page-container footer-connect">
        <div className="footer-connect-group">
          <p className={headCls}>Get in touch</p>
          <div className="footer-contact-list">
            <a href={`mailto:${siteConfig.email}`} className="footer-contact">
              <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>{siteConfig.email}</span>
            </a>
            <a href={siteConfig.phoneHref} className="footer-contact">
              <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <div className="footer-connect-group footer-connect-group-right">
          <p className={headCls}>Follow along</p>
          <div className="footer-socials">
            {siteConfig.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="footer-social"
                >
                  {Icon ? <Icon size={16} strokeWidth={1.8} aria-hidden="true" /> : null}
                </a>
              );
            })}
            <Link
              href="/book-a-discovery-call"
              className="footer-book surface-sheen group inline-flex items-center gap-2"
            >
              Book a call
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover:rotate-45"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="page-container footer-legal">
        <p>© {new Date().getFullYear()} Ideaboat. All rights reserved.</p>
        <nav aria-label="Legal" className="footer-legal-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
}
/**
 * Backwards-compatible name for the shared closing CTA. Existing callers can
 * keep passing `title` and `text`; the local copy now lives in one component.
 */
export function CTASection({ title, text, ...rest }) {
  return <CallToAction title={title} text={text} {...rest} />;
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
  "w-full rounded-2xl border bg-card px-4 py-3.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary";
export function EnquiryForm({ heading, subtext }) {
  const [sent, setSent] = useState(false);
  return (
    <SpotlightCard className="p-6 md:p-8">
      <h2 className="relative font-display text-2xl font-semibold">{heading}</h2>
      <p className="relative mt-2 text-sm text-muted-foreground">{subtext}</p>
      {sent ? (
        <div className="relative mt-8 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center">
          <p className="font-display text-lg font-semibold text-primary">
            Thanks - we've received your message.
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
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-medium text-primary-foreground transition hover:bg-primary/90 sm:col-span-2"
          >
            Send message <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
          </button>
        </form>
      )}
    </SpotlightCard>
  );
}
