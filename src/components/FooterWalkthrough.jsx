"use client";
/**
 * Stageshow: a walkthrough of the Ideaboat footer, and nothing else.
 *
 * A cropped, full-bleed dark footer at hero scale. A cursor tours the four
 * areas in reading order - the cursor-follow wordmark glow, the link columns,
 * the connect strip and the legal bar - then returns to the wordmark for the
 * payoff before the scene settles back to its opening frame.
 *
 * Built as a custom React/CSS scene (the pattern this project already uses in
 * ImpactScenes / ServicesView), but following the stageshow rules: named
 * targets measured from live rects, every move explained, one gutter, real
 * words, two easing curves, a caused reset, a reduced-motion poster and a
 * pause when the stage leaves the viewport. No kit import: the kit is TSX and
 * this repository is deliberately plain JavaScript (see AGENTS.md).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Linkedin, Facebook, Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import wordmarkAsset from "@/assets/ideaboat-logo-white.png";

/* The live footer's link lists, kept here so the demo stays self-contained. */
const COMPANY = ["Home", "About Us", "Industries", "Contact"];
const AI_SOLUTIONS = [
  "AI Workflow Automation",
  "Custom AI Agents",
  "AI for Business Growth",
  "Custom Solutions & CRM",
];
const BUILD_GROW = [
  "Branding & Designing",
  "Website Development",
  "Shopify & Ecommerce Websites",
  "Social Media",
];

/** Cubic-bezier solver - the kit's two curves, written out for plain JS. */
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const fx = (t) => ((ax * t + bx) * t + cx) * t;
  const fy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    let t = x;
    for (let i = 0; i < 6; i += 1) {
      const d = dx(t);
      if (Math.abs(d) < 1e-5) break;
      t -= (fx(t) - x) / d;
    }
    return fy(Math.min(1, Math.max(0, t)));
  };
}
const CURVE = {
  travel: bezier(0.45, 0, 0.1, 1),
  settle: bezier(0.25, 0.8, 0.25, 1),
  enter: bezier(0.2, 0.7, 0.3, 1),
  linear: (t) => t,
};
const lerp = (a, b, t) => a + (b - a) * t;
const point = (a, b, t, arc = 0) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t) - Math.sin(Math.PI * t) * arc,
});

export default function FooterWalkthrough() {
  const stageRef = useRef(null);
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const haloRef = useRef(null);
  const washRef = useRef(null);
  const noteRef = useRef(null);
  const ruleRef = useRef(null);
  const visibleRef = useRef(true);
  const [run, setRun] = useState(0);
  const [reduced, setReduced] = useState(false);

  /** Measure every target in stage-local pixels so the tour reflows with the
   *  footer at any host width - the same job the kit's `rect()` does. */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return null;
    const sr = stage.getBoundingClientRect();
    const local = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - sr.left,
        y: r.top - sr.top,
        w: r.width,
        h: r.height,
        cx: r.left - sr.left + r.width / 2,
        cy: r.top - sr.top + r.height / 2,
      };
    };
    const one = (name) => {
      const el = stage.querySelector(`[data-fw="${name}"]`);
      return el
        ? local(el)
        : { x: 0, y: 0, w: sr.width, h: sr.height, cx: sr.width / 2, cy: sr.height / 2 };
    };
    const column = (name) => {
      const links = Array.from(
        stage.querySelectorAll(`[data-fw-col="${name}"] [data-fw-link]`),
      ).map(local);
      const c = one(name);
      return { ...c, links };
    };
    return {
      wm: one("wordmark"),
      company: column("company"),
      ai: column("ai"),
      grow: column("grow"),
      connect: one("connect"),
      connectItems: Array.from(stage.querySelectorAll("[data-fw-connect]")).map(local),
      bottom: one("bottom"),
      width: sr.width,
      height: sr.height,
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    visibleRef.current = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    if (stageRef.current) io.observe(stageRef.current);
    return () => io.disconnect();
  }, [run]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    /* ---- visual primitives (no React state on the hot path) ---- */
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    const halo = haloRef.current;
    const wash = washRef.current;
    const note = noteRef.current;
    const rule = ruleRef.current;
    const linksOf = (name) => stage.querySelectorAll(`[data-fw-col="${name}"] [data-fw-link]`);
    const connectItems = () => stage.querySelectorAll("[data-fw-connect]");

    const setCursor = (pt, opacity = 1) => {
      cursor.style.opacity = String(opacity);
      cursor.style.transform = `translate3d(${pt.x - 2}px, ${pt.y - 2}px, 0)`;
    };
    /* Position the light pool from a stage point, measured against the
       wordmark's own rect - the same two-axis follow as the live footer. */
    const setGlow = (pt, M, opacity, haloOpacity = opacity) => {
      const wm = M?.wm;
      const xPct = pt && wm?.w ? ((pt.x - wm.x) / wm.w) * 100 : 50;
      const yPct = pt && wm?.h ? ((pt.y - wm.y) / wm.h) * 100 : 50;
      stage.style.setProperty("--fw-glow-x", `${xPct}%`);
      stage.style.setProperty("--fw-glow-y", `${yPct}%`);
      glow.style.opacity = String(opacity);
      halo.style.opacity = String(haloOpacity);
    };
    const setWash = (opacity) => {
      wash.style.opacity = String(opacity);
    };
    const setNote = (opacity) => {
      note.style.opacity = String(opacity);
    };
    const setRule = (scale) => {
      rule.style.transform = `translateX(-50%) scaleX(${scale})`;
    };
    const lightLinks = (name, y, M) => {
      const items = linksOf(name);
      const rects = M[name].links;
      items.forEach((el, i) => {
        if (rects[i]) el.classList.toggle("is-lit", y >= rects[i].cy - 6);
      });
    };
    const clearLinks = (name, p) => {
      const items = linksOf(name);
      const keep = Math.round((1 - p) * items.length);
      items.forEach((el, i) => el.classList.toggle("is-lit", i < keep));
    };
    const lightConnect = (x, M) => {
      connectItems().forEach((el, i) => {
        const item = M.connectItems[i];
        if (item) el.classList.toggle("is-lit", x >= item.cx - 4);
      });
    };
    const clearConnect = (p) => {
      const items = connectItems();
      const keep = Math.round((1 - p) * items.length);
      items.forEach((el, i) => el.classList.toggle("is-lit", i < keep));
    };
    const settle = () => {
      ["company", "ai", "grow"].forEach((name) =>
        linksOf(name).forEach((el) => el.classList.remove("is-lit")),
      );
      connectItems().forEach((el) => el.classList.remove("is-lit"));
      setGlow(null, null, 0, 0);
      setWash(0);
      setNote(0);
      setRule(0);
      setCursor({ x: -60, y: -60 }, 0);
    };

    /* Reduced motion: a single complete poster, no timeline. */
    if (reduced) {
      settle();
      setGlow(null, null, 1, 1);
      setWash(1);
      setNote(1);
      const first = linksOf("company")[0];
      if (first) first.classList.add("is-lit");
      return undefined;
    }

    /* ---- name the places the cursor has a reason to visit ---- */
    const off = (M) => ({ x: -40, y: -20 });
    const wmLeft = (M) => ({ x: M.wm.x + M.wm.w * 0.08, y: M.wm.y + M.wm.h * 0.58 });
    const wmRight = (M) => ({ x: M.wm.x + M.wm.w * 0.92, y: M.wm.y + M.wm.h * 0.42 });
    const wmMid = (M) => ({ x: M.wm.cx, y: M.wm.cy });
    const colTop = (M, name) => {
      const c = M[name];
      return { x: c.x + c.w * 0.45, y: c.links[0].cy - 26 };
    };
    const colBottom = (M, name) => {
      const c = M[name];
      return { x: c.x + c.w * 0.45, y: c.links[c.links.length - 1].cy + 22 };
    };
    const connectLeft = (M) => {
      const first = M.connectItems[0];
      return first ? { x: first.x + 6, y: first.cy } : { x: M.connect.x, y: M.connect.cy };
    };
    const connectRight = (M) => {
      const items = M.connectItems;
      const last = items[items.length - 1];
      return last
        ? { x: last.x + last.w - 6, y: last.cy }
        : { x: M.connect.x + M.connect.w, y: M.connect.cy };
    };
    const bottomMid = (M) => ({ x: M.bottom.cx, y: M.bottom.cy });

    /** Beat list. `run(p, eased, M)` is called every frame; a beat's job is
     *  to animate a relationship, not just move the arrow. */
    const beats = [
      { d: 500, run: () => settle() },
      {
        d: 700,
        run: (_p, e, M) => setCursor(point(off(M), wmLeft(M), e, 20), 1),
      },
      {
        d: 1900,
        run: (_p, e, M) => {
          const pt = point(wmLeft(M), wmRight(M), e, 12);
          setCursor(pt, 1);
          setGlow(pt, M, 1, 1);
          setNote(e < 0.14 ? e / 0.14 : e > 0.82 ? (1 - e) / 0.18 : 1);
        },
      },
      {
        d: 700,
        run: (_p, e, M) => {
          const pt = point(wmRight(M), colTop(M, "company"), e, 16);
          setCursor(pt, 1);
          setGlow(pt, M, 1 - e, 1 - e);
          setNote(1 - e);
        },
      },
      {
        d: 1400,
        run: (_p, e, M) => {
          const pt = point(colTop(M, "company"), colBottom(M, "company"), e);
          setCursor(pt, 1);
          lightLinks("company", pt.y, M);
        },
      },
      {
        d: 600,
        run: (_p, e, M) => {
          setCursor(point(colBottom(M, "company"), colTop(M, "ai"), e, 18), 1);
          clearLinks("company", e);
        },
      },
      {
        d: 1300,
        run: (_p, e, M) => {
          const pt = point(colTop(M, "ai"), colBottom(M, "ai"), e);
          setCursor(pt, 1);
          lightLinks("ai", pt.y, M);
        },
      },
      {
        d: 600,
        run: (_p, e, M) => {
          setCursor(point(colBottom(M, "ai"), colTop(M, "grow"), e, 18), 1);
          clearLinks("ai", e);
        },
      },
      {
        d: 1300,
        run: (_p, e, M) => {
          const pt = point(colTop(M, "grow"), colBottom(M, "grow"), e);
          setCursor(pt, 1);
          lightLinks("grow", pt.y, M);
        },
      },
      {
        d: 700,
        run: (_p, e, M) => {
          setCursor(point(colBottom(M, "grow"), connectLeft(M), e, 16), 1);
          clearLinks("grow", e);
        },
      },
      {
        d: 1500,
        run: (_p, e, M) => {
          const pt = point(connectLeft(M), connectRight(M), e, 8);
          setCursor(pt, 1);
          lightConnect(pt.x, M);
        },
      },
      {
        d: 600,
        run: (_p, e, M) => {
          setCursor(point(connectRight(M), bottomMid(M), e, 14), 1);
          clearConnect(e);
        },
      },
      {
        d: 900,
        run: (_p, e, M) => {
          setCursor(bottomMid(M), 1);
          setRule(e);
        },
      },
      {
        d: 900,
        run: (_p, e, M) => {
          setRule(1 - e);
          const pt = point(bottomMid(M), wmMid(M), e, 18);
          setCursor(pt, 1);
          setGlow(wmMid(M), M, e, e * 0.6);
          setWash(e);
        },
      },
      {
        d: 1700,
        run: (_p, _e, M) => {
          setCursor(wmMid(M), 1);
          setGlow(wmMid(M), M, 1, 1);
          setWash(1);
          setNote(1);
        },
      },
      {
        d: 750,
        run: (_p, e, M) => {
          setWash(1 - e);
          setGlow(wmMid(M), M, 1 - e, 1 - e);
          setNote(1 - e);
          setCursor(wmMid(M), 1 - e);
        },
      },
      { d: 350, run: () => settle() },
    ];
    const TOTAL = beats.reduce((sum, b) => sum + b.d, 0);

    let elapsed = 0;
    let last = performance.now();
    let raf = 0;
    const frame = (now) => {
      const dt = Math.min(50, now - last);
      last = now;
      if (visibleRef.current && !document.hidden) {
        elapsed = (elapsed + dt) % TOTAL;
        const M = measure();
        if (M) {
          let t = elapsed;
          for (let i = 0; i < beats.length; i += 1) {
            if (t < beats[i].d || i === beats.length - 1) {
              const p = Math.min(1, t / beats[i].d);
              const eased =
                CURVE[
                  i === 1 || i === 3 || i === 5 || i === 7 || i === 9 || i === 11 || i === 13
                    ? "travel"
                    : "settle"
                ](p);
              beats[i].run(p, eased, M);
              break;
            }
            t -= beats[i].d;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    settle();
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [run, reduced, measure]);

  useEffect(() => {
    const onResize = () => {
      /* Rects are re-measured each frame; nothing to cache, but nudge the
         cursor home so a resize never leaves it parked over dead space. */
      if (stageRef.current) {
        stageRef.current.style.setProperty("--fw-glow-x", "50%");
        stageRef.current.style.setProperty("--fw-glow-y", "50%");
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fw-demo">
      <div className="fw-stage-wrap">
        <div
          ref={stageRef}
          className="fw-stage"
          data-fw-stage=""
          aria-hidden="true"
          style={{ "--fw-glow-x": "50%", "--fw-glow-y": "50%" }}
        >
          <svg className="fw-defs" aria-hidden="true" focusable="false">
            <filter
              id="fw-wordmark-stroke"
              colorInterpolationFilters="sRGB"
              x="-2%"
              y="-10%"
              width="104%"
              height="120%"
            >
              <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="fw-dilated" />
              <feFlood className="fw-flood" />
              <feComposite in2="fw-dilated" operator="in" result="fw-stroke" />
              <feComposite in="fw-stroke" in2="SourceAlpha" operator="xor" />
            </filter>
          </svg>

          <div className="fw-footer">
            {/* 1 - the signature: a hollow wordmark whose letters light up
                   under the pointer. */}
            <div className="fw-wordmark-band">
              <div ref={noteRef} className="fw-note">
                <span>Cursor-follow glow</span>
                <span className="fw-note-lead" />
              </div>
              <div className="fw-wordmark" data-fw="wordmark">
                <img className="fw-outline" src={wordmarkAsset.src} alt="" aria-hidden="true" />
                <div
                  ref={washRef}
                  className="fw-layer fw-wash"
                  style={{
                    WebkitMaskImage: `url(${wordmarkAsset.src})`,
                    maskImage: `url(${wordmarkAsset.src})`,
                  }}
                />
                <div
                  ref={haloRef}
                  className="fw-layer fw-halo"
                  style={{
                    WebkitMaskImage: `url(${wordmarkAsset.src})`,
                    maskImage: `url(${wordmarkAsset.src})`,
                  }}
                />
                <div
                  ref={glowRef}
                  className="fw-layer fw-glow"
                  style={{
                    WebkitMaskImage: `url(${wordmarkAsset.src})`,
                    maskImage: `url(${wordmarkAsset.src})`,
                  }}
                />
              </div>
            </div>

            {/* 2 - the four real columns of the footer. */}
            <div className="fw-grid">
              <div className="fw-brand">
                <img className="fw-logo" src={wordmarkAsset.src} alt="" aria-hidden="true" />
                <p className="fw-tagline">Ideas that sail brands forward.</p>
                <p className="fw-address">
                  <span>Capstone Building, Parimal Garden, 706</span>
                  <span>Ahmedabad, Gujarat 380006</span>
                </p>
              </div>
              <div className="fw-col" data-fw="company" data-fw-col="company">
                <p className="fw-head">Company</p>
                <ul>
                  {COMPANY.map((label) => (
                    <li key={label} data-fw-link="">
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fw-col" data-fw="ai" data-fw-col="ai">
                <p className="fw-head">AI Solutions</p>
                <ul>
                  {AI_SOLUTIONS.map((label) => (
                    <li key={label} data-fw-link="">
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fw-col" data-fw="grow" data-fw-col="grow">
                <p className="fw-head">Build &amp; Grow</p>
                <ul>
                  {BUILD_GROW.map((label) => (
                    <li key={label} data-fw-link="">
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3 - the connect strip: real contact routes and socials. */}
            <div className="fw-connect" data-fw="connect">
              <div className="fw-connect-group">
                <p className="fw-head">Get in touch</p>
                <div className="fw-connect-items">
                  <span className="fw-connect-item" data-fw-connect="">
                    <Mail size={12} strokeWidth={1.8} aria-hidden="true" />
                    hello@ideaboat.com
                  </span>
                  <span className="fw-connect-item" data-fw-connect="">
                    <Phone size={12} strokeWidth={1.8} aria-hidden="true" />
                    096629 08849
                  </span>
                </div>
              </div>
              <div className="fw-connect-group fw-connect-group-right">
                <p className="fw-head">Follow along</p>
                <div className="fw-connect-items">
                  <span className="fw-social" data-fw-connect="">
                    <Linkedin size={13} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="fw-social" data-fw-connect="">
                    <Facebook size={13} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="fw-social" data-fw-connect="">
                    <Instagram size={13} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="fw-connect-cta" data-fw-connect="">
                    Book a call <ArrowUpRight size={11} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            {/* 4 - the legal bar, with a rule that draws on cue. */}
            <div className="fw-bottom" data-fw="bottom">
              <div className="fw-bottom-inner">
                <span>© 2026 Ideaboat. All rights reserved.</span>
                <span className="fw-legal-links">Privacy Policy · Terms of Service</span>
                <span ref={ruleRef} className="fw-rule" />
              </div>
            </div>
          </div>

          {/* One arrow, styled for a dark stage, moving only with a cause. */}
          <div ref={cursorRef} className="fw-cursor">
            <svg viewBox="0 0 22 26" width="22" height="26" aria-hidden="true">
              <path d="M2 1.6 2 22l5.3-5.2 3.5 7.2 3.5-1.7-3.5-7.1 7.6-.6L2 1.6Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="fw-controls">
        <p>
          Cursor tour · wordmark glow → links → contact → legal ·{" "}
          {reduced ? "poster (reduced motion)" : "looping"}
        </p>
        <button type="button" onClick={() => setRun((n) => n + 1)}>
          Replay walkthrough
        </button>
      </div>
    </div>
  );
}
