
import { ClientOnly } from "@/components/ClientOnly";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Compass, PenTool, Code2, Rocket, Check, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import discover from "@/assets/process/discover.json";
import plan from "@/assets/process/plan.json";
import build from "@/assets/process/build.json";
import scale from "@/assets/process/scale.json";

const AnimatedIcon = lazy(() => import("./ProcessLordIcon"));
const steps = [
  { icon: Compass, asset: discover, title: "Discover", line: "We learn your goals and find where AI helps most.", detail: "Understand the challenge", outcome: "Goals & opportunities" },
  { icon: PenTool, asset: plan, title: "Plan", line: "A clear strategy mapped to real business problems.", detail: "Map the way forward", outcome: "A practical roadmap" },
  { icon: Code2, asset: build, title: "Build", line: "Custom agents and automations fitted to your workflow.", detail: "Bring the system to life", outcome: "Connected & tested" },
  { icon: Rocket, asset: scale, title: "Scale", line: "Track results, refine, and grow the system with you.", detail: "Keep getting better", outcome: "Measure & improve" },
];

export function ServiceProcess() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: .25 });
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible) return;
    const timer = window.setInterval(() => setActive(step => (step + 1) % steps.length), 3500);
    return () => window.clearInterval(timer);
  }, [paused, reduced, visible, active]);
  const current = (steps[active] ?? steps[0])!;
  return <div ref={container} className="process-experience border-y py-8 md:py-10" data-active-step={active}>
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-14">
      <div className="flex flex-col justify-between gap-8">
        <div><p className="font-display text-5xl font-semibold text-primary/30">0{active + 1}<span className="ml-2 text-base text-muted-foreground">/ 04</span></p><h3 className="mt-5 font-display text-2xl font-semibold">{current.detail}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{current.line}</p><p className="mt-6 flex items-center gap-2 text-sm text-primary"><Check className="size-4" />{current.outcome}</p></div>
        <div className="flex items-center gap-4"><Button variant="outline" size="icon" aria-label={paused || reduced ? "Play process animation" : "Pause process animation"} disabled={reduced} onClick={() => setPaused(value => !value)}>{paused || reduced ? <Play /> : <Pause />}</Button><span className="text-xs text-muted-foreground">{current.title}</span><div className="flex gap-1.5" aria-hidden="true">{steps.map((step,i) => <span key={step.title} className={`h-1 w-5 rounded-full ${i <= active ? "bg-primary" : "bg-border"}`} />)}</div></div>
      </div>
      <ol className="relative grid grid-cols-2 gap-3">
        {steps.map((step, i) => <li key={step.title}><Button variant="ghost" aria-pressed={i === active} onClick={() => { setActive(i); setPaused(true); }} className={`process-step h-full min-h-40 w-full flex-col gap-2 whitespace-normal rounded-lg border p-4 text-foreground ${i === active ? "border-primary/50 bg-primary/10" : "border-border bg-secondary/20"}`}><div className="flex w-full items-center justify-between"><span className="text-xs text-muted-foreground">0{i + 1}</span>{i < active && <Check className="size-3 text-primary" />}{i === active && <span className="size-1.5 rounded-full bg-primary" />}</div><span className="grid size-16 place-items-center text-primary"><ClientOnly fallback={<step.icon className="size-8" />}><Suspense fallback={<step.icon className="size-8" />}><AnimatedIcon icon={step.asset} active={i === active && !paused && !reduced && visible} /></Suspense></ClientOnly></span><span className="font-display text-sm font-semibold">{step.title}</span><span className="process-step-meter block h-0.5 w-full overflow-hidden rounded bg-border" aria-hidden="true">{i === active && <span key={`${active}-${paused}`} className={`block h-full bg-primary ${paused || reduced ? "w-full" : "process-meter-running"}`} />}</span></Button></li>)}
      </ol>
    </div>
  </div>;
}