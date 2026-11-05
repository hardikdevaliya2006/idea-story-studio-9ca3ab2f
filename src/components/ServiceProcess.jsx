import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ImpactScene } from "@/components/ImpactScenes";
const steps = [
  {
    title: "Discover",
    line: "We learn your goals and find where AI helps most.",
    detail: "Understand the challenge",
    outcome: "Goals & opportunities",
  },
  {
    title: "Plan",
    line: "A clear strategy mapped to real business problems.",
    detail: "Map the way forward",
    outcome: "A practical roadmap",
  },
  {
    title: "Build",
    line: "Custom agents and automations fitted to your workflow.",
    detail: "Bring the system to life",
    outcome: "Connected & tested",
  },
  {
    title: "Scale",
    line: "Track results, refine, and grow the system with you.",
    detail: "Keep getting better",
    outcome: "Measure & improve",
  },
];
export function ServiceProcess() {
  const [step, setStep] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stage = useRef(null);
  const cardsRef = useRef([]);
  const raf = useRef(0);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setDesktop(mq.matches);
      setReduced(preference.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    preference.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      preference.removeEventListener("change", sync);
    };
  }, []);
  // Desktop: scroll position across the tall stage drives the active step and
  // its fractional progress (--step-frac is written straight to the element so
  // the meters move without re-rendering each frame).
  useEffect(() => {
    if (!desktop) return;
    const update = () => {
      raf.current = 0;
      const el = stage.current;
      if (!el) return;
      const travel = el.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / travel));
      const s = Math.min(steps.length - 1, Math.floor(p * steps.length));
      el.style.setProperty("--step-frac", String(Math.min(1, p * steps.length - s)));
      setStep(s);
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [desktop]);
  // Mobile: stacked cards activate as each crosses the middle of the viewport.
  useEffect(() => {
    if (desktop) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = cardsRef.current.indexOf(entry.target);
          if (index >= 0) setStep(index);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    for (const card of cardsRef.current) if (card) observer.observe(card);
    return () => observer.disconnect();
  }, [desktop]);
  const focusStep = (index) => {
    const el = stage.current;
    const card = cardsRef.current[index];
    if (desktop && el) {
      const travel = el.offsetHeight - window.innerHeight;
      const top =
        window.scrollY + el.getBoundingClientRect().top + travel * ((index + 0.25) / steps.length);
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    } else if (card) {
      card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }
  };
  const current = steps[step];
  return (
    <div ref={stage} className="process-stage border-y lg:h-[300vh]" style={{ "--step-frac": 0 }}>
      <div className="py-10 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* Pinned copy: counter, heading, description and progress track the active card */}
          <div className="flex flex-col justify-center gap-7">
            <div className="process-copy" key={step}>
              <p className="process-counter font-display text-6xl font-semibold leading-none text-primary/25 md:text-7xl">
                <span key={step}>0{step + 1}</span>
                <span className="ml-2 align-middle text-base font-normal text-muted-foreground md:text-lg">
                  / 04
                </span>
              </p>
              <h3 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {current.detail}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {current.line}
              </p>
              <p
                key={`outcome-${step}`}
                className="process-copy-in mt-6 flex items-center gap-2.5 text-sm font-medium text-primary"
              >
                <Check className="size-4" strokeWidth={2.5} />
                {current.outcome}
              </p>
            </div>
            <div className="flex items-center gap-4" aria-hidden="true">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {current.title}
              </span>
              <div className="flex flex-1 max-w-44 gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className={`process-seg ${i < step ? "is-done" : ""} ${i === step ? "is-current" : ""}`}
                  >
                    <i />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step cards: 2x2 on desktop, stacked on mobile; scroll picks the active one */}
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:content-center lg:gap-4">
            {steps.map((s, i) => {
              const active = i === step;
              const passed = i < step;
              return (
                <li
                  key={s.title}
                  ref={(node) => {
                    cardsRef.current[i] = node;
                  }}
                  className={`process-card ${active ? "is-active" : ""} ${passed ? "is-passed" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => focusStep(i)}
                    aria-pressed={active}
                    className="flex h-full w-full flex-col text-foreground"
                  >
                    <div className="process-card-stage">
                      <ImpactScene index={i} />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-[11px] font-medium tabular-nums text-primary/60">
                            0{i + 1}
                          </span>
                          <span className="process-title font-display text-sm font-semibold md:text-[15px]">
                            {s.title}
                          </span>
                        </div>
                        {passed && (
                          <Check
                            className="process-check size-3.5 text-primary"
                            strokeWidth={2.5}
                          />
                        )}
                        {active && (
                          <span className="process-dot size-1.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <span
                        className="process-meter mt-auto block h-0.5 w-full overflow-hidden rounded-full bg-border"
                        aria-hidden="true"
                      >
                        <span
                          className="block h-full rounded-full bg-primary"
                          style={{ width: active ? undefined : passed ? "100%" : "0%" }}
                          data-current={active || undefined}
                        />
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
