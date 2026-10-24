
import { BadgeCheck, ChartColumn, FileSpreadsheet, FileText, Headset, ListChecks, MessagesSquare, RefreshCw, Server, SlidersHorizontal, Wrench, Bot, Check, Database, Sparkles, ArrowRight, Globe, MessageCircle, Play, Heart, Search, ShoppingBag, Workflow } from "lucide-react";
import emblemImage from "@/assets/sailboat-emblem.png";
import { lazy, Suspense, type ComponentType } from "react";
import { ClientOnly } from "@/components/ClientOnly";

const emblemAsset = emblemImage;

const AgentDotField = lazy(() => import("@/components/AnimatedDotField"));

function DotField() {
  return <div className="agent-dither-field pointer-events-none absolute inset-0" aria-hidden="true">
    <ClientOnly><Suspense fallback={null}><AgentDotField /></Suspense></ClientOnly>
  </div>;
}

type Ic = ComponentType<{ className?: string; strokeWidth?: number }>;
const Hub = ({ x, y, icon: I = Workflow }: { x: number; y: number; icon?: Ic }) => <span className="cap-hub surface-sheen" style={{ left: `${x}%`, top: `${y}%` }}><I className="size-7" strokeWidth={2.2} /></span>;
const Pill = ({ x, y, icon: I, label, align = "center", branch, d = 0 }: { x: number; y: number; icon?: Ic | undefined; label: string; align?: "center" | "left"; branch?: boolean; d?: number }) =>
  <span className={`cap-pill is-${align} ${branch ? "cap-branch" : ""}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}>{I && <I strokeWidth={1.5} />}{label}</span>;

/** Hub on the left branching to a column of capabilities (live, slow). */
function TreeScene({ items }: { items: { icon: Ic; label: string }[] }) {
  const ys = items.map((_, i) => 14 + (72 / (items.length - 1)) * i);
  return <div className="cap-stage cap-tree">
    <svg viewBox="0 0 320 240" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
      {ys.map((y, i) => { const py = y * 2.4; const p = `M70 120 C 100 120, 95 ${py}, 128 ${py}`; return <g key={i}>
        <path d={p} className="cap-line" /><path d={p} className="flow-pulse" pathLength={100} style={{ animationDelay: `${i}s` }} /></g>; })}
    </svg>
    <Hub x={16} y={50} icon={Sparkles} />
    {items.map((it, i) => <Pill key={it.label} x={40} y={ys[i] ?? 50} icon={it.icon} label={it.label} align="left" branch d={i} />)}
  </div>;
}

/** Hub in the middle of a slowly turning orbit, surrounded by connected tools. */
function OrbitScene({ items }: { items: { icon: Ic; label: string }[] }) {
  const pos: [number, number][] = [[24, 22], [76, 22], [24, 78], [76, 78]];
  return <div className="cap-stage cap-slow">
    <svg viewBox="0 0 320 240" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
      {pos.map(([x, y], i) => <g key={i}><path d={`M160 120 L${x * 3.2} ${y * 2.4}`} className="cap-line" strokeDasharray="3 4" />
        <path d={`M160 120 L${x * 3.2} ${y * 2.4}`} className="flow-pulse" pathLength={100} style={{ animationDelay: `${i * 0.9}s` }} /></g>)}
    </svg>
    <span className="cap-orbit" />
    <Hub x={50} y={50} icon={Database} />
    {items.map((it, i) => <Pill key={it.label} x={pos[i]?.[0] ?? 50} y={pos[i]?.[1] ?? 50} icon={it.icon} label={it.label} d={i * 0.9} />)}
  </div>;
}

/** Static: hub on top feeding a 2x2 grid of operations. */
function StackScene({ items }: { items: { icon: Ic; label: string }[] }) {
  return <div className="relative grid w-full max-w-[320px] justify-items-center">
    <span className="cap-hub surface-sheen !static !translate-x-0 !translate-y-0 !animate-none" style={{ translate: "none" }}><Workflow className="size-7" strokeWidth={2.2} /></span>
    <svg viewBox="0 0 200 28" className="h-7 w-full" fill="none"><path d="M100 0V14M50 28V14H150V28" className="cap-line" /></svg>
    <div className="grid w-full grid-cols-2 gap-2.5">
      {items.slice(0, 2).map((it) => <span key={it.label} className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2.5 text-xs font-medium"><it.icon className="size-3 shrink-0 text-primary" strokeWidth={1.5} />{it.label}</span>)}
    </div>
    <svg viewBox="0 0 200 16" className="h-4 w-full" fill="none"><path d="M50 0V16M150 0V16" className="cap-line" /></svg>
    <div className="grid w-full grid-cols-2 gap-2.5">
      {items.slice(2).map((it) => <span key={it.label} className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2.5 text-xs font-medium"><it.icon className="size-3 shrink-0 text-primary" strokeWidth={1.5} />{it.label}</span>)}
    </div>
  </div>;
}

/** Hub-and-pill scenes for the three capability cards. */
export function CapabilityScene({ index }: { index: number }) {
  return (
    <div className="capability-scene relative flex h-64 items-center justify-center overflow-hidden bg-secondary/40 px-4" aria-hidden="true">
      {index === 0 && <StackScene items={[{ icon: ListChecks, label: "Tasks" }, { icon: RefreshCw, label: "Process" }, { icon: BadgeCheck, label: "Approvals" }, { icon: Headset, label: "Support" }]} />}
      {index === 1 && <OrbitScene items={[{ icon: FileSpreadsheet, label: "Data" }, { icon: Server, label: "Systems" }, { icon: ChartColumn, label: "Reports" }, { icon: Wrench, label: "Tools" }]} />}
      {index === 2 && <TreeScene items={[{ icon: Bot, label: "Agents" }, { icon: MessagesSquare, label: "Assistants" }, { icon: FileText, label: "Documents" }, { icon: SlidersHorizontal, label: "AI setup" }]} />}
    </div>
  );
}

export function ServiceScene({ index, className = "h-48 shrink-0 bg-secondary/30", grid = true }: { index: number; className?: string; grid?: boolean }) {
  return <div className={`service-scene service-scene-${index} relative grid place-items-center overflow-hidden px-5 text-primary ${className}`} aria-hidden="true">
    {grid && index !== 1 && <div className="scene-grid pointer-events-none absolute inset-0" />}
    {index === 1 && <DotField />}
    {index === 0 && <div className="relative flex w-full max-w-80 items-center justify-between gap-2"><span className="grid size-16 shrink-0 place-items-center rounded-lg border border-primary/30 bg-card p-2.5"><img src={emblemAsset} alt="" className="size-full object-contain" /></span><span className="flex flex-1 items-center gap-1"><span className="flex-1 border-t border-dashed border-primary/40" /><ArrowRight className="scene-arrow size-4 shrink-0" /><span className="flex-1 border-t border-dashed border-primary/40" /></span><span className="grid size-16 shrink-0 place-items-center rounded-lg border border-primary/30 bg-card"><Bot className="size-6" /></span><span className="flex flex-1 items-center gap-1"><span className="flex-1 border-t border-dashed border-primary/40" /><ArrowRight className="scene-arrow size-4 shrink-0" /><span className="flex-1 border-t border-dashed border-primary/40" /></span><span className="grid size-16 shrink-0 place-items-center rounded-lg border border-primary/30 bg-card"><Check className="size-6" /></span></div>}
    {index === 1 && <span className="agent-halo" />}
    {index === 1 && <div className="agent-core relative grid size-20 place-items-center rounded-full"><Bot className="size-9" /></div>}
    {index === 2 && <svg viewBox="0 0 260 140" className="relative h-36 w-full max-w-64" fill="none"><path d="M20 116H242" className="stroke-border" /><g className="fill-primary/15">{[34,54,72,104].map((h,i)=><rect key={h} className="chart-bar" style={{animationDelay:`${i*0.15}s`}} x={32+i*51} y={116-h} width="26" height={h} rx="4" />)}</g><path className="chart-line" pathLength={100} d="m28 88 51-17 51 6 64-51 34-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path className="chart-head" d="M235 15 L224.5 24 L221.5 12.5 Z" fill="currentColor" /><circle className="chart-dot fill-card" cx="130" cy="77" r="5" stroke="currentColor" strokeWidth="2" /></svg>}
    {index === 3 && <div className="relative w-full max-w-64 rounded-lg border bg-card p-4"><div className="flex items-center gap-2 rounded-md border px-2 py-2 text-[11px] text-muted-foreground"><Search className="size-3" />Search, meet your business</div><div className="mt-3 flex items-center gap-2"><Sparkles className="size-4" /><span className="text-xs font-semibold">AI overview</span></div><div className="mt-3 space-y-2"><span className="block h-1.5 w-full rounded bg-primary/20" /><span className="block h-1.5 w-4/5 rounded bg-primary/15" /></div><span className="mt-3 inline-flex items-center gap-1 text-[10px]"><Check className="size-3" />Your brand, discovered</span></div>}
    {index === 4 && <div className="relative grid w-full max-w-64 grid-cols-3 gap-2 rounded-lg border bg-card p-3">{["Leads", "In progress", "Won"].map((name,i)=><div key={name}><span className="text-[9px] font-medium text-muted-foreground">{name}</span>{Array.from({length:3-i},(_,j)=><div key={j} className="mt-2 rounded border bg-secondary/50 p-2"><span className="block h-1 w-4/5 rounded bg-primary/30" /><span className="mt-2 block h-1 w-1/2 rounded bg-primary/15" /></div>)}</div>)}</div>}
    {index === 5 && <div className="relative flex items-center gap-4"><div className="grid size-24 place-items-center rounded-lg border border-primary/30 bg-card font-display text-5xl">Aa</div><div className="space-y-2"><div className="size-8 rounded-full bg-primary" /><div className="size-8 rounded-full bg-accent" /><div className="size-8 rounded-full bg-foreground" /></div><div className="hidden size-16 rotate-12 border-2 border-primary sm:block" /></div>}
    {index === 6 && <div className="relative w-full max-w-64 overflow-hidden rounded-lg border bg-card"><div className="flex gap-1 border-b px-3 py-2"><span className="size-1.5 rounded-full bg-primary/50" /><span className="size-1.5 rounded-full bg-primary/30" /><span className="size-1.5 rounded-full bg-primary/15" /></div><div className="grid grid-cols-[1fr_0.7fr] gap-3 p-4"><div className="space-y-2"><span className="block h-2 w-full rounded bg-foreground/60" /><span className="block h-2 w-2/3 rounded bg-foreground/60" /><span className="block h-1 w-full rounded bg-primary/20" /><span className="mt-3 block h-4 w-12 rounded bg-primary" /></div><div className="grid place-items-center rounded border bg-secondary"><Globe className="size-8" /></div></div></div>}
    {index === 7 && <div className="relative flex items-center gap-4"><div className="grid size-24 place-items-center rounded-lg border bg-card"><ShoppingBag className="size-11" /></div><div className="space-y-3"><span className="block h-2 w-24 rounded bg-foreground/50" /><span className="block h-1.5 w-16 rounded bg-primary/25" /><span className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-[10px] text-primary-foreground"><Check className="size-3" />Order confirmed</span></div></div>}
    {index === 8 && <div className="relative flex items-center gap-3"><div className="social-card -rotate-6 rounded-lg border bg-card p-3"><div className="grid size-16 place-items-center rounded-md bg-accent/50"><Play className="size-6" /></div><div className="mt-2 flex gap-2"><Heart className="size-3" /><MessageCircle className="size-3" /></div></div><div className="social-card social-card-b rotate-6 rounded-lg border bg-card p-3"><div className="grid size-16 place-items-center rounded-md bg-primary/15"><Sparkles className="size-6" /></div><div className="mt-2 flex gap-2"><Heart className="size-3" /><MessageCircle className="size-3" /></div></div><span className="absolute -right-5 -top-2 rounded-full border bg-card p-2"><Heart className="size-4" /></span></div>}
  </div>;
}