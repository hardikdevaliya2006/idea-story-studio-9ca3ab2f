import {
  BadgeCheck,
  ChartColumn,
  FileSpreadsheet,
  FileText,
  Headset,
  ListChecks,
  MessagesSquare,
  RefreshCw,
  Server,
  SlidersHorizontal,
  Wrench,
  Bot,
  Check,
  Database,
  Sparkles,
  Globe,
  MessageCircle,
  Play,
  Heart,
  Search,
  ShoppingBag,
  Workflow,
} from "lucide-react";
import { lazy, Suspense } from "react";
import { ClientOnly } from "@/components/ClientOnly";
import { BrandIdentityScene } from "@/components/BrandIdentityScene";
const AgentDotField = lazy(() => import("@/components/AnimatedDotField"));
const AgentFace3D = lazy(() => import("@/components/AgentFace3D"));
function DotField() {
  return (
    <div className="agent-dither-field pointer-events-none absolute inset-0" aria-hidden="true">
      <ClientOnly>
        <Suspense fallback={null}>
          <AgentDotField />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
/** Client-only WebGL mascot; the green head turns toward the cursor. */
function AgentFace() {
  return (
    <ClientOnly>
      <Suspense fallback={null}>
        <AgentFace3D />
      </Suspense>
    </ClientOnly>
  );
}
const Hub = ({ x, y, icon: I = Workflow }) => (
  <span className="cap-hub surface-sheen" style={{ left: `${x}%`, top: `${y}%` }}>
    <I className="size-7" strokeWidth={2.2} color="#fff" />
  </span>
);
const Pill = ({ x, y, icon: I, label, align = "center", branch, d = 0, wide = false }) => (
  <span
    className={`cap-pill is-${align} ${branch ? "cap-branch" : ""} ${wide ? "is-wide" : ""}`}
    style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}
  >
    {I && <I strokeWidth={1.5} />}
    {label}
  </span>
);
/** Hub on the left branching to a column of capabilities (live, slow). */
function TreeScene({ items }) {
  const ys = items.map((_, i) => 14 + (72 / (items.length - 1)) * i);
  return (
    <div className="cap-stage cap-tree">
      <svg
        viewBox="0 0 320 240"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        fill="none"
      >
        {ys.map((y, i) => {
          const py = y * 2.4;
          const px = (i === 2 ? 52 : 48) * 3.2;
          const p = `M70 120 C 100 120, ${px - 33} ${py}, ${px} ${py}`;
          return (
            <g key={i}>
              <path d={p} className="cap-line" />
              <path
                d={p}
                className="flow-pulse"
                pathLength={100}
                style={{ animationDelay: `${i}s` }}
              />
            </g>
          );
        })}
      </svg>
      <Hub x={16} y={50} icon={Sparkles} />
      {items.map((it, i) => (
        <Pill
          key={it.label}
          x={i === 2 ? 52 : 48}
          y={ys[i] ?? 50}
          icon={it.icon}
          label={it.label}
          align="left"
          branch
          wide={i === 3}
          d={i}
        />
      ))}
    </div>
  );
}
/** Hub in the middle of a slowly turning orbit, surrounded by connected tools. */
function OrbitScene({ items }) {
  const pos = [
    [24, 22],
    [76, 22],
    [24, 78],
    [76, 78],
  ];
  return (
    <div className="cap-stage cap-slow">
      <svg
        viewBox="0 0 320 240"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        fill="none"
      >
        {pos.map(([x, y], i) => (
          <g key={i}>
            <path
              d={`M160 120 L${x * 3.2} ${y * 2.4}`}
              className="cap-line"
              strokeDasharray="3 4"
            />
            <path
              d={`M160 120 L${x * 3.2} ${y * 2.4}`}
              className="flow-pulse"
              pathLength={100}
              style={{ animationDelay: `${i * 0.9}s` }}
            />
          </g>
        ))}
      </svg>
      <span className="cap-orbit" />
      <Hub x={50} y={50} icon={Database} />
      {items.map((it, i) => (
        <Pill
          key={it.label}
          x={pos[i]?.[0] ?? 50}
          y={pos[i]?.[1] ?? 50}
          icon={it.icon}
          label={it.label}
          d={i * 0.9}
        />
      ))}
    </div>
  );
}
/** Static: hub on top feeding a 2x2 grid of operations. */
function StackScene({ items }) {
  return (
    <div className="relative grid w-full max-w-[320px] justify-items-center">
      <span
        className="cap-hub surface-sheen !static !translate-x-0 !translate-y-0 !animate-none"
        style={{ translate: "none" }}
      >
        <Workflow className="size-7" strokeWidth={2.2} color="#fff" />
      </span>
      <svg viewBox="0 0 200 28" className="w-full" fill="none">
        <path d="M100 0V14M50 28V14H150V28" className="cap-line" />
      </svg>
      <div className="grid w-full grid-cols-2 gap-2.5">
        {items.slice(0, 2).map((it) => (
          <span
            key={it.label}
            className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2.5 text-xs font-medium  justify-center"
          >
            <it.icon className="size-3.5 shrink-0 text-primary" strokeWidth={1.5} />
            {it.label}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 200 16" className="w-full" fill="none">
        <path d="M50 0V16M150 0V16" className="cap-line" />
      </svg>
      <div className="grid w-full grid-cols-2 gap-2.5">
        {items.slice(2).map((it) => (
          <span
            key={it.label}
            className="flex items-center justify-center gap-2 rounded-xl border bg-card px-3 py-2.5 text-xs font-medium"
          >
            <it.icon className="size-3.5 shrink-0 text-primary" strokeWidth={1.5} />
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
/** Layered product mock: a workflow run card floating over a second, offset card. */
export function AutomationStackScene() {
  return (
    <div className="relative flex h-[9.75rem] w-full items-center justify-center">
      {/* Back layer: a second run card peeking out behind the front one. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[7.2rem] w-[76%] -translate-x-[44%] -translate-y-[40%] rotate-[8deg] rounded-2xl border bg-card p-3"
      >
        <span className="block h-1.5 w-1/2 rounded-full bg-foreground/10" />
        <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-foreground/[0.07]" />
        <span className="mt-2 block h-1.5 w-2/5 rounded-full bg-foreground/[0.07]" />
      </div>

      {/* Front layer: the run itself - source, label, and its output. */}
      <div className="relative w-full max-w-[16.5rem] -rotate-[4deg] rounded-2xl border bg-card p-3.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-[2deg]">
        <div className="flex items-center gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Workflow className="size-4" strokeWidth={2.4} />
          </span>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Workflow
          </span>
          <span className="ml-auto shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
            # ops
          </span>
        </div>
        <p className="mt-3 font-display text-[14px] font-semibold leading-snug">
          Invoice approved → synced
        </p>
        <div className="mt-3 space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-foreground/10" />
          <span className="block h-1.5 w-3/5 rounded-full bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}
/** Hub-and-pill scenes for the three capability cards. */
export function CapabilityScene({ index }) {
  return (
    <div
      className="capability-scene relative flex h-64 items-center justify-center overflow-hidden bg-secondary/40 px-4"
      aria-hidden="true"
    >
      {index === 0 && (
        <StackScene
          items={[
            { icon: ListChecks, label: "Tasks" },
            { icon: RefreshCw, label: "Process" },
            { icon: BadgeCheck, label: "Approvals" },
            { icon: Headset, label: "Support" },
          ]}
        />
      )}
      {index === 1 && (
        <OrbitScene
          items={[
            { icon: FileSpreadsheet, label: "Data" },
            { icon: Server, label: "Systems" },
            { icon: ChartColumn, label: "Reports" },
            { icon: Wrench, label: "Tools" },
          ]}
        />
      )}
      {index === 2 && (
        <TreeScene
          items={[
            { icon: Bot, label: "Agents" },
            { icon: MessagesSquare, label: "Assistants" },
            { icon: FileText, label: "Documents" },
            { icon: SlidersHorizontal, label: "AI setup" },
          ]}
        />
      )}
    </div>
  );
}
export function ServiceScene({ index, className = "h-48 shrink-0 bg-secondary/30", grid = true }) {
  return (
    <div
      className={`service-scene service-scene-${index} relative grid place-items-center overflow-hidden px-5 text-primary ${className}`}
      aria-hidden="true"
    >
      {grid && index !== 1 && <div className="scene-grid pointer-events-none absolute inset-0" />}
      {index === 1 && <DotField />}
      {index === 1 && <span className="agent-halo" />}
      {index === 1 && <AgentFace />}
      {index === 2 && (
        <svg viewBox="0 0 260 140" className="relative h-44 w-full max-w-72" fill="none">
          <path d="M20 116H242" className="stroke-border" />
          <g className="fill-primary/15">
            {[34, 54, 72, 104].map((h, i) => (
              <rect
                key={h}
                className="chart-bar"
                style={{ animationDelay: `${i * 0.15}s` }}
                x={32 + i * 51}
                y={116 - h}
                width="26"
                height={h}
                rx="4"
              />
            ))}
          </g>
          <path
            className="chart-line"
            pathLength={100}
            d="m28 88 51-17 51 6 64-51 34-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path className="chart-head" d="M235 15 L224.5 24 L221.5 12.5 Z" fill="currentColor" />
          <circle
            className="chart-dot fill-card"
            cx="130"
            cy="77"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
      {index === 3 && (
        <div className="relative w-full max-w-[16rem] rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 rounded-md border px-2.5 py-2 text-[11px] text-muted-foreground">
            <Search className="size-3.5" />
            Search, meet your business
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Sparkles className="size-4" />
            <span className="text-[13px] font-semibold">AI overview</span>
          </div>
          <div className="mt-3 space-y-2">
            <span className="block h-1.5 w-full rounded bg-primary/20" />
            <span className="block h-1.5 w-4/5 rounded bg-primary/15" />
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10.5px]">
            <Check className="size-3" />
            Your brand, discovered
          </span>
        </div>
      )}
      {index === 4 && (
        <div className="relative grid w-full max-w-[17rem] grid-cols-3 gap-2 rounded-xl border bg-card p-3.5">
          {["Leads", "In progress", "Won"].map((name, i) => (
            <div key={name}>
              <span className="text-[9.5px] font-medium text-muted-foreground">{name}</span>
              {Array.from({ length: 3 - i }, (_, j) => (
                <div key={j} className="mt-2 rounded-sm border bg-secondary/50 p-2">
                  <span className="block h-1.5 w-4/5 rounded bg-primary/30" />
                  <span className="mt-1.5 block h-1.5 w-1/2 rounded bg-primary/15" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {index === 5 && <BrandIdentityScene />}
      {index === 6 && (
        <div className="web-scene relative w-full max-w-[21rem] overflow-hidden rounded-xl border bg-card">
          <div className="flex gap-1.5 border-b px-5 py-3">
            <span className="web-scene-dot size-2 rounded-full bg-primary/50" />
            <span className="web-scene-dot size-2 rounded-full bg-primary/30" />
            <span className="web-scene-dot size-2 rounded-full bg-primary/15" />
          </div>
          <div className="grid grid-cols-[1fr_0.7fr] gap-5 p-6">
            <div className="space-y-2.5">
              <span className="web-line web-line-1 block h-2.5 w-full rounded bg-foreground/60" />
              <span className="web-line web-line-2 block h-2.5 w-2/3 rounded bg-foreground/60" />
              <span className="web-line web-line-3 block h-1.5 w-full rounded bg-primary/20" />
              <span className="web-cta relative mt-4 block h-5 w-14 overflow-hidden rounded bg-primary" />
            </div>
            <div className="web-globe relative grid place-items-center overflow-hidden rounded-lg border bg-secondary">
              <Globe className="web-globe-icon relative z-10 size-12" />
            </div>
          </div>
        </div>
      )}
      {index === 7 && (
        <div className="shop-scene relative flex items-center gap-6">
          <div className="shop-bag relative grid size-32 shrink-0 place-items-center rounded-xl border bg-card">
            <ShoppingBag className="shop-bag-icon size-14" />
            <span className="shop-parcel" aria-hidden="true" />
          </div>
          <div className="space-y-3.5">
            <span className="shop-line shop-line-1 block h-2.5 w-32 rounded bg-foreground/50" />
            <span className="shop-line shop-line-2 block h-2 w-24 rounded bg-primary/25" />
            <span className="shop-confirm relative flex items-center gap-2.5 rounded-lg bg-primary px-5 py-3 text-[12px] text-primary-foreground">
              <Check className="shop-check size-4" />
              Order confirmed
            </span>
          </div>
        </div>
      )}
      {index === 8 && (
        <div className="relative flex items-center gap-4">
          <div className="social-card -rotate-6 rounded-xl border bg-card p-4">
            <div className="grid size-20 place-items-center rounded-lg bg-accent/50">
              <Play className="size-7" />
            </div>
            <div className="mt-3 flex gap-2.5">
              <Heart className="size-4" />
              <MessageCircle className="size-4" />
            </div>
          </div>
          <div className="social-card social-card-b rotate-6 rounded-xl border bg-card p-4">
            <div className="grid size-20 place-items-center rounded-lg bg-primary/15">
              <Sparkles className="size-7" />
            </div>
            <div className="mt-3 flex gap-2.5">
              <Heart className="size-4" />
              <MessageCircle className="size-4" />
            </div>
          </div>
          <span className="absolute -right-6 -top-3 rounded-full border bg-card p-2.5">
            <Heart className="size-5" />
          </span>
        </div>
      )}
    </div>
  );
}
