"use client";
import { useEffect, useRef, useState } from "react";
import AboutPipeline from "@/components/AboutPipeline";

const INTERVAL = 4600;

/**
 * The approach section's one interaction: a 4:3 artwork panel that
 * blur-crossfades between the four existing ImpactScenes, beside a step list
 * whose rail fills as the shared timer runs. One rAF loop drives both, so the
 * rail and the hand-over can never drift. It pauses on hover, keyboard focus
 * and off-screen; under reduced motion the rail is not filled and only a click
 * changes the step.
 *
 * Steps are `[title, description]` pairs passed in from AboutView so all of the
 * page's words keep living in one place.
 */
export default function AboutApproach({ steps }) {
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const activeRef = useRef(0);
  const railsRef = useRef([]);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
    railsRef.current.forEach((el) => el?.style.setProperty("--fill", "0"));
  }, [active]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now) => {
      const delta = Math.min(now - last, 64);
      last = now;
      if (visibleRef.current && !pausedRef.current) {
        elapsedRef.current += delta;
        if (elapsedRef.current >= INTERVAL) {
          elapsedRef.current = 0;
          const next = (activeRef.current + 1) % steps.length;
          activeRef.current = next;
          setActive(next);
        }
        railsRef.current[activeRef.current]?.style.setProperty(
          "--fill",
          String(elapsedRef.current / INTERVAL),
        );
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [steps.length]);

  const go = (index) => {
    elapsedRef.current = 0;
    activeRef.current = index;
    setActive(index);
  };

  return (
    <div
      ref={rootRef}
      className="about-approach"
      onPointerEnter={() => (pausedRef.current = true)}
      onPointerLeave={() => (pausedRef.current = false)}
      onFocusCapture={() => (pausedRef.current = true)}
      onBlurCapture={() => (pausedRef.current = false)}
    >
      <div className="process-visual about-visual" aria-hidden="true">
        {steps.map(([title], i) => (
          <div key={title} className={`process-visual-layer ${i === active ? "is-active" : ""}`}>
            <AboutPipeline index={i} />
          </div>
        ))}
      </div>

      <div className="about-steps">
        {steps.map(([title, desc], i) => (
          <button
            type="button"
            key={title}
            className={`about-step ${i === active ? "is-active" : ""}`}
            onClick={() => go(i)}
            aria-current={i === active ? "step" : undefined}
          >
            <span className="about-step-rail" aria-hidden="true">
              <span className="about-step-fill" ref={(el) => (railsRef.current[i] = el)} />
            </span>
            <span className="about-step-no" aria-hidden="true">
              0{i + 1}
            </span>
            <span className="about-step-body">
              <span className="about-step-title">{title}</span>
              <span className="about-step-desc">{desc}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
