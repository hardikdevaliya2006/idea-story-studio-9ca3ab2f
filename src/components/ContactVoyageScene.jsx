"use client";
/**
 * Stageshow: the contact panel's "voyage" - a miniature Ideaboat Studio
 * workspace that turns the visitor's brief into a live site.
 *
 * A cropped, corner-bled product window sits on the brand-green stage. A
 * cursor arrives, presses "Set sail", the four voyage steps fill in reading
 * order while the brief resolves into a live preview, a LIVE badge drops onto
 * it and a URL chip straddles the window's top-right corner. The payoff holds,
 * then the new content leaves as one thing and a fresh brief returns on the
 * same clock as the cursor - a caused, conveyor reset with no rewind.
 *
 * Built as a custom React/CSS scene, the pattern this project already uses in
 * FooterWalkthrough: live-rect measurement, two easing curves, one gutter,
 * real words only where the story is, a reduced-motion poster and a pause
 * when the stage leaves the viewport. No kit import: the kit is TSX and this
 * repository is deliberately plain JavaScript (see AGENTS.md).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import sailboat from "@/assets/sailboat-emblem.png";

const STEPS = [
  { n: "01", label: "Discover" },
  { n: "02", label: "Design" },
  { n: "03", label: "Build" },
  { n: "04", label: "Launch" },
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
  tap: bezier(0.3, 0.75, 0.1, 1),
  linear: (t) => t,
};
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const point = (a, b, t, arc = 0) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t) - Math.sin(Math.PI * t) * arc,
});

export default function ContactVoyageScene() {
  const stageRef = useRef(null);
  const cursorRef = useRef(null);
  const visibleRef = useRef(true);
  const [reduced, setReduced] = useState(false);

  /** Measure every target in stage-local pixels so the tour reflows with the
   *  panel at any host width - the same job the kit's `rect()` does. */
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
      const el = stage.querySelector(`[data-cv="${name}"]`);
      return el ? local(el) : { x: 0, y: 0, w: 0, h: 0, cx: sr.width / 2, cy: sr.height / 2 };
    };
    return {
      btn: one("btn"),
      rest: one("rest"),
      card: one("card"),
      cardRest: one("cardrest"),
      /* Enter from the right margin, below the caption, so the arrow never
         tracks across the headline on its way to the toolbar. */
      off: { x: sr.width + 30, y: sr.height * 0.42 },
      w: sr.width,
      h: sr.height,
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
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const cursor = cursorRef.current;
    const button = stage.querySelector('[data-cv="btn"]');
    const steps = Array.from(stage.querySelectorAll("[data-cv-step]"));
    const badge = stage.querySelector('[data-cv="badge"]');
    const chip = stage.querySelector('[data-cv="chip"]');
    let sceneReveal = 0;
    let cardRect = null;

    const setCursor = (pt, alpha = 1) => {
      cursor.style.opacity = alpha.toFixed(3);
      cursor.style.transform = `translate3d(${(pt.x - 2).toFixed(1)}px, ${(pt.y - 2).toFixed(1)}px, 0)`;
      /* The arrow inks itself over the light site so it never disappears
         against the payoff it is pointing at. */
      const overLight =
        sceneReveal > 0.5 &&
        cardRect &&
        pt.x >= cardRect.x &&
        pt.x <= cardRect.x + cardRect.w &&
        pt.y >= cardRect.y &&
        pt.y <= cardRect.y + cardRect.h;
      cursor.classList.toggle("is-dark", Boolean(overLight));
    };

    /** Paint the whole scene from one state object - every value is derived,
     *  so overlapping beats can never disagree about what is on screen. */
    const paint = ({
      route = 0,
      reveal = 0,
      badgeOn = 0,
      chipOn = 0,
      busy = 0,
      press = 0,
      step = -1,
    } = {}) => {
      stage.style.setProperty("--cv-route", route.toFixed(3));
      /* The live site slides up over the brief as one opaque surface - never a
         see-through crossfade, which reads as a smudge on the dark card. */
      sceneReveal = clamp01(reveal);
      stage.style.setProperty("--cv-reveal-y", `${((1 - sceneReveal) * 100).toFixed(1)}%`);
      badge.style.opacity = clamp01(badgeOn).toFixed(3);
      badge.style.transform = `translateY(${(-10 * (1 - badgeOn)).toFixed(1)}px) scale(${(0.9 + 0.1 * badgeOn).toFixed(3)})`;
      chip.style.opacity = clamp01(chipOn).toFixed(3);
      chip.style.transform = `translate(${(16 * (1 - chipOn)).toFixed(1)}px, ${(-8 * (1 - chipOn)).toFixed(1)}px)`;
      /* One control, one label slot: idle → busy → the finished state. */
      button.dataset.state = reveal > 0.92 ? "done" : busy > 0.5 ? "busy" : "idle";
      button.style.setProperty("--cv-press", press.toFixed(3));
      button.style.transform = `scale(${(1 - 0.035 * press).toFixed(3)})`;
      steps.forEach((el, i) => {
        el.classList.toggle("is-done", i <= step);
        el.classList.toggle("is-active", i === step);
      });
    };

    /* Reduced motion: the finished launch, held as one complete poster. */
    if (reduced) {
      paint({ route: 1, reveal: 1, badgeOn: 1, chipOn: 1, busy: 1, step: 3 });
      setCursor({ x: -60, y: -60 }, 0);
      return undefined;
    }

    const btnPoint = (M) => ({
      x: M.btn.x + M.btn.w * 0.86,
      y: M.btn.y + M.btn.h * 0.54,
    });

    /** Beats. `run(p, eased, M)` is called every frame; a beat animates the
     *  relationship between things, not just one object in isolation. */
    const beats = [
      {
        d: 520,
        curve: "settle",
        run: (_p, _e, M) => {
          paint({});
          setCursor(M.off, 0);
        },
      },
      { d: 760, curve: "travel", run: (_p, e, M) => setCursor(point(M.off, M.rest, e, 20), 1) },
      {
        d: 620,
        curve: "travel",
        run: (_p, e, M) => setCursor(point(M.rest, btnPoint(M), e, 12), 1),
      },
      {
        d: 280,
        curve: "tap",
        run: (_p, e, M) => {
          setCursor(btnPoint(M), 1);
          paint({ press: e });
        },
      },
      {
        d: 1050,
        curve: "settle",
        run: (_p, e, M) => {
          setCursor(btnPoint(M), 1);
          const route = e * 0.42;
          paint({ press: 1 - e, busy: 1, route, step: Math.floor(route * 4) });
        },
      },
      {
        d: 1600,
        curve: "travel",
        run: (_p, e, M) => {
          setCursor(point(btnPoint(M), M.cardRest, e, 16), 1);
          const route = 0.42 + e * 0.58;
          paint({
            busy: 1,
            route,
            step: Math.min(3, Math.floor(route * 4)),
            reveal: clamp01((e - 0.18) / 0.82),
          });
        },
      },
      {
        d: 780,
        curve: "settle",
        run: (_p, e, M) => {
          setCursor(M.cardRest, 1);
          paint({ busy: 1, route: 1, step: 3, reveal: 1, badgeOn: e });
        },
      },
      {
        d: 820,
        curve: "settle",
        run: (_p, e, M) => {
          setCursor(M.cardRest, 1);
          paint({ busy: 1, route: 1, step: 3, reveal: 1, badgeOn: 1, chipOn: e });
        },
      },
      {
        d: 2500,
        curve: "linear",
        run: (_p, _e, M) => {
          setCursor(M.cardRest, 1);
          paint({ busy: 1, route: 1, step: 3, reveal: 1, badgeOn: 1, chipOn: 1 });
        },
      },
      {
        d: 820,
        curve: "travel",
        run: (_p, e, M) => {
          setCursor(point(M.cardRest, M.rest, e, 14), 1);
          const out = 1 - e;
          const step = e < 0.32 ? 3 : e < 0.55 ? 2 : e < 0.78 ? 1 : -1;
          paint({
            busy: e < 0.18 ? 1 : 0,
            route: out,
            reveal: out,
            badgeOn: out,
            chipOn: out,
            step,
          });
        },
      },
      {
        d: 520,
        curve: "settle",
        run: (_p, e, M) => {
          setCursor(point(M.rest, M.off, e, 10), 1 - e);
          paint({});
        },
      },
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
          cardRect = M.card;
          let t = elapsed;
          for (let i = 0; i < beats.length; i += 1) {
            if (t < beats[i].d || i === beats.length - 1) {
              const p = Math.min(1, t / beats[i].d);
              beats[i].run(p, CURVE[beats[i].curve](p), M);
              break;
            }
            t -= beats[i].d;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    paint({});
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced, measure]);

  return (
    <div ref={stageRef} className="cv-stage" aria-hidden="true">
      <div className="cv-wash" />
      <div className="texture-grain cv-grain" />
      <div className="cv-orbit" />

      <div className="cv-copy">
        <p className="cv-eyebrow">IDEABOAT</p>
        <p className="cv-headline">
          Ready to set sail
          <br />
          on your digital journey?
        </p>
      </div>

      <div className="cv-window">
        <div className="cv-titlebar">
          <img className="cv-mark" src={sailboat.src} alt="" />
          <span className="cv-brand">IDEABOAT</span>
          <span className="cv-dots">
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className="cv-body">
          <div className="cv-rail">
            <p className="cv-railhead">The voyage</p>
            <div className="cv-steps">
              <span className="cv-steps-line" />
              {STEPS.map((s) => (
                <div className="cv-step" data-cv-step="" key={s.n}>
                  <span className="cv-stepdot" />
                  <span className="cv-stepnum">{s.n}</span>
                  <span className="cv-steplabel">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-main">
            <div className="cv-mainhead">
              <div>
                <p className="cv-maintitle">Your voyage</p>
                <p className="cv-subtitle">From brief to live</p>
              </div>
              <span className="cv-rest" data-cv="rest" />
              <button className="cv-btn" data-cv="btn" type="button" tabIndex={-1}>
                <span className="cv-btn-labels">
                  <span className="cv-btn-label" data-label="idle">
                    Set sail
                  </span>
                  <span className="cv-btn-label" data-label="busy">
                    Setting sail…
                  </span>
                  <span className="cv-btn-label" data-label="done">
                    Live now
                  </span>
                </span>
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <div className="cv-card" data-cv="card">
              <div className="cv-brief">
                <span className="cv-tag">THE BRIEF</span>
                <p className="cv-brieftext">“Ready to set sail on your digital journey?”</p>
                <div className="cv-brief-lines">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cv-briefmeta">
                  <span className="cv-avatar" />
                  <span className="cv-barline" />
                </div>
              </div>

              <div className="cv-preview">
                <div className="cv-site">
                  <div className="cv-site-nav">
                    <img className="cv-site-mark" src={sailboat.src} alt="" />
                    <span className="cv-site-links">
                      <b />
                      <b />
                      <b />
                    </span>
                    <span className="cv-site-cta" />
                  </div>
                  <div className="cv-site-hero">
                    <div className="cv-site-copy">
                      <p className="cv-site-title">
                        Idea
                        <br />
                        to impact.
                      </p>
                      <span className="cv-site-sub">Design. Build. Grow.</span>
                      <span className="cv-site-btn">
                        Explore work <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                    {/* A quiet growth graphic fills the hero's right side so the
                        payoff reads as a finished site, not a wireframe. */}
                    <div className="cv-site-art" aria-hidden="true">
                      <div className="cv-site-artcard">
                        <span className="cv-site-artcap" />
                        <span className="cv-site-artbars">
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="cv-site-artline" />
                      </div>
                    </div>
                  </div>
                  <div className="cv-site-grid">
                    <span className="cv-site-tile">
                      <i />
                      <b />
                    </span>
                    <span className="cv-site-tile">
                      <i />
                      <b />
                    </span>
                    <span className="cv-site-tile">
                      <i />
                      <b />
                    </span>
                  </div>
                </div>
              </div>

              <span className="cv-cardrest" data-cv="cardrest" />
              <span className="cv-live" data-cv="badge">
                <span className="cv-livedot" /> Live
              </span>
            </div>
          </div>
        </div>

        <div className="cv-chip" data-cv="chip">
          <span className="cv-chip-dot" />
          <span>ideaboat.studio</span>
          <ArrowUpRight size={11} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      <div ref={cursorRef} className="cv-cursor">
        <svg viewBox="0 0 22 26" width="22" height="26" aria-hidden="true">
          <path d="M2 1.6 2 22l5.3-5.2 3.5 7.2 3.5-1.7-3.5-7.1 7.6-.6L2 1.6Z" />
        </svg>
      </div>
    </div>
  );
}
