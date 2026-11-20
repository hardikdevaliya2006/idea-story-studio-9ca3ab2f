"use client";
/**
 * "How we turn ideas into impact" — one staged product shot, not four cards.
 *
 * A single Agent Studio window carries the whole story. Its chrome stays put;
 * the pane behind it becomes the tool for each phase (signal search → plan
 * map → agent config → live metrics) and the right rail shows the same four
 * agents moving from idle to live. The drawn cursor performs one task per
 * beat and the button it presses is the visible cause of the next phase.
 *
 * Stageshow rules: corner-bleed framing with no plate, real words on the
 * subject and bars only in the cropped lower band, one accent, measured
 * targets, a cause for every change and a reset, and a complete poster under
 * reduced motion or when the section is off-screen.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Layers, Radio, RotateCcw, Search, Send, Workflow } from "lucide-react";

const STEPS = [
  {
    title: "Discover",
    line: "We learn your goals and find where AI helps most.",
    outcome: "Goals & opportunities",
  },
  {
    title: "Plan",
    line: "A clear strategy mapped to real business problems.",
    outcome: "A practical roadmap",
  },
  {
    title: "Build",
    line: "Custom agents and automations fitted to your workflow.",
    outcome: "Connected & tested",
  },
  {
    title: "Scale",
    line: "Track results, refine, and grow the system with you.",
    outcome: "Measure & improve",
  },
];

const NODES = [
  { label: "New lead", meta: "Webhook", Icon: Radio },
  { label: "Enrich", meta: "3 sources", Icon: Layers },
  { label: "Decide", meta: "Rules + model", Icon: Workflow },
  { label: "Reply", meta: "Email", Icon: Send },
];

const QUERY = "where do leads stall";
const RAIL_MS = 4200;
const FAILSAFE_MS = 9000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const empty = {
  typed: "",
  findings: false,
  selected: -1,
  wired: false,
  lift: false,
  config: false,
  ran: false,
  live: false,
};

/** The settled frame of each phase — what a screenshot or reduced motion sees. */
function posterFor(phase) {
  if (phase === 0) return { ...empty, typed: QUERY, findings: true, selected: 0 };
  if (phase === 1) return { ...empty, wired: true, lift: true };
  if (phase === 2) return { ...empty, config: true, ran: true };
  return { ...empty, live: true };
}

function phaseCopy(phase, scene) {
  return [
    {
      eyebrow: "STEP 01 · DISCOVER",
      title: "Find the gap",
      sub: "Search your signals for where the work stalls.",
      status: "Draft",
      action: "Map the journey",
    },
    {
      eyebrow: "STEP 02 · PLAN",
      title: "Shape the plan",
      sub: "Link the finding to the work that fixes it.",
      status: "Mapped",
      action: "Build the agents",
    },
    {
      eyebrow: "STEP 03 · BUILD",
      title: "Configure Decide",
      sub: "Rules and a model, ready for every lead.",
      status: scene.ran ? "Tested" : "Building",
      action: scene.ran ? "Go live" : "Run test",
    },
    {
      eyebrow: "STEP 04 · SCALE",
      title: "Running live",
      sub: "Every lead routed, measured and improving.",
      status: "Live",
      action: "Start a new cycle",
    },
  ][phase];
}

function Cursor({ x, y, kind, pressed, ripple, visible }) {
  if (!visible) return null;
  return (
    <div
      className="studio-cursor"
      data-kind={kind}
      data-pressed={pressed || undefined}
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
      aria-hidden="true"
    >
      {ripple > 0 && <span className="studio-cursor__ripple" key={ripple} />}
      {kind === "ibeam" ? (
        <svg className="studio-cursor__beam" width="14" height="20" viewBox="0 0 14 20">
          <path d="M7 1v18M3.2 1h7.6M3.2 19h7.6" />
        </svg>
      ) : (
        <svg className="studio-cursor__arrow" width="22" height="22" viewBox="0 0 22 22">
          <path d="M4 3 18.5 9.6 11.8 11.8 9.6 18.5Z" />
        </svg>
      )}
    </div>
  );
}

function Roll({ value }) {
  return (
    <span className="studio-roll">
      <span key={value}>{value}</span>
    </span>
  );
}

export function ServiceProcess() {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [scene, setScene] = useState(empty);
  const [cursorState, setCursor] = useState({
    x: 0.56,
    y: 0.58,
    kind: "pointer",
    pressed: false,
    ripple: 0,
    visible: true,
  });
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const railsRef = useRef([]);
  const tokenRef = useRef(0);
  const pausedRef = useRef(false);

  const put = useCallback((patch) => setScene((s) => ({ ...s, ...patch })), []);

  /** Measure a named control inside the window so a press lands in the same
   *  place at 340px and at 640px. */
  const target = useCallback((name, fx = 0.5, fy = 0.5) => {
    const body = bodyRef.current;
    const el = body?.querySelector(`[data-target="${name}"]`);
    if (!body || !el) return { x: 0.5, y: 0.6 };
    const a = el.getBoundingClientRect();
    const b = body.getBoundingClientRect();
    return {
      x: (a.left + a.width * fx - b.left) / b.width,
      y: (a.top + a.height * fy - b.top) / b.height,
    };
  }, []);

  const go = useCallback((index) => {
    tokenRef.current += 1; // abort the script that is currently running
    setPhase(index);
    setCycle((c) => c + 1);
    setScene({ ...empty });
  }, []);

  /* Visibility, hover and reduced motion each settle on the phase's poster. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  /* The authored script. Every change follows a press, and the last press of
   * each beat is the cause of the next phase. */
  useEffect(() => {
    tokenRef.current += 1;
    const token = tokenRef.current;
    const alive = () => tokenRef.current === token && !pausedRef.current && visible && !reduced;

    railsRef.current.forEach((el) => el?.style.setProperty("--process-progress", "0"));

    if (!alive()) {
      setScene(posterFor(phase));
      setCursor((c) => ({ ...c, visible: false }));
      return undefined;
    }

    setScene({ ...empty });
    setCursor({ x: 0.56, y: 0.58, kind: "pointer", pressed: false, ripple: 0, visible: true });

    const moveTo = async (name, fx, fy, kind = "pointer", ms = 460) => {
      const p = target(name, fx, fy);
      setCursor((c) => ({ ...c, x: p.x, y: p.y, kind }));
      await sleep(ms);
      return alive();
    };

    const tap = async (name, fx = 0.84, fy = 0.5) => {
      if (!(await moveTo(name, fx, fy, "pointer", 380))) return false;
      setCursor((c) => ({ ...c, pressed: true }));
      await sleep(130);
      setCursor((c) => ({ ...c, pressed: false, ripple: c.ripple + 1 }));
      await sleep(150);
      return alive();
    };

    const run = async () => {
      if (phase === 0) {
        if (!(await moveTo("findField", 0.72, 0.5, "ibeam", 340))) return;
        for (let i = 1; i <= QUERY.length; i += 1) {
          if (!alive()) return;
          put({ typed: QUERY.slice(0, i) });
          await sleep(40);
        }
        await sleep(360);
        if (!alive()) return;
        put({ findings: true });
        if (!(await moveTo("findRow0", 0.82, 0.5, "pointer", 360))) return;
        put({ selected: 0 });
        await sleep(700);
        if (await tap("actionBtn")) go(1);
      }

      if (phase === 1) {
        if (!(await moveTo("planNode1", 0.5, 0.5, "pointer", 380))) return;
        put({ wired: true });
        await sleep(720);
        if (!alive()) return;
        put({ lift: true });
        await sleep(760);
        if (await tap("actionBtn")) go(2);
      }

      if (phase === 2) {
        if (!(await moveTo("decideNode", 0.5, 0.5, "pointer", 380))) return;
        put({ config: true });
        await sleep(680);
        if (!alive()) return;
        if (!(await tap("actionBtn"))) return;
        put({ ran: true });
        await sleep(1200);
        if (await tap("actionBtn")) go(3);
      }

      if (phase === 3) {
        put({ live: true });
        if (!(await moveTo("actionBtn", 0.84, 0.5, "pointer", 420))) return;
        await sleep(2200);
        if (await tap("actionBtn")) go(0);
      }
    };

    const timer = setTimeout(run, 200);
    return () => clearTimeout(timer);
  }, [phase, cycle, reduced, visible, target, put, go]);

  /* One clock drives the step rail. The script normally advances first; the
   * failsafe only matters if a measured target ever goes missing. */
  useEffect(() => {
    if (reduced || paused || !visible) return undefined;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now) => {
      const delta = Math.min(now - last, 64);
      last = now;
      elapsed += delta;
      railsRef.current[phase]?.style.setProperty(
        "--process-progress",
        String(Math.min(1, elapsed / RAIL_MS)),
      );
      if (elapsed >= FAILSAFE_MS) go((phase + 1) % STEPS.length);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, cycle, reduced, paused, visible, go]);

  const copy = phaseCopy(phase, scene);
  const status = copy.status;
  const isReset = phase === 3;
  const done = phase === 2 && scene.ran;
  const nodeState = (i) => {
    if (phase === 0) return "idle";
    if (phase === 1) return "mapped";
    if (phase === 2)
      return i === 2 ? (scene.config ? "active" : "mapped") : i < 2 ? "live" : "mapped";
    return "live";
  };

  return (
    <div
      ref={rootRef}
      className="impact-process"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="process-visual studio-stage"
        aria-label={`Agent Studio: ${STEPS[phase].title}`}
      >
        <div className="studio-window" data-phase={phase}>
          <div className="studio-bar">
            <span className="studio-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="studio-name">Agent Studio</span>
          </div>

          <div className="studio-body" ref={bodyRef}>
            <div className="studio-main">
              <div className="studio-head">
                <div className="studio-head-top">
                  <span className="studio-eyebrow">{copy.eyebrow}</span>
                  <span className="studio-status" data-state={status.toLowerCase()}>
                    <i aria-hidden="true" />
                    {status}
                  </span>
                </div>
                <div className="studio-title">{copy.title}</div>
                <p className="studio-sub">{copy.sub}</p>
              </div>

              <div className="studio-content">
                {phase === 0 && (
                  <>
                    <div className="studio-field" data-target="findField">
                      <Search size={14} strokeWidth={2} aria-hidden="true" />
                      <span className={scene.typed ? "is-typed" : ""}>
                        {scene.typed || "Ask a question about your funnel"}
                      </span>
                      {!scene.typed && <i className="studio-caret" aria-hidden="true" />}
                    </div>
                    <div className="studio-findings" data-on={scene.findings || undefined}>
                      <div
                        className={`studio-finding ${scene.selected === 0 ? "is-selected" : ""}`}
                        data-target="findRow0"
                      >
                        <span>Handoff at lead routing</span>
                        <b>82%</b>
                        <i style={{ "--w": "82%" }} />
                      </div>
                      <div className="studio-finding">
                        <span>Drop after welcome email</span>
                        <b>64%</b>
                        <i style={{ "--w": "64%" }} />
                      </div>
                    </div>
                    <div className="studio-chip" data-on={scene.findings || undefined}>
                      <Check size={12} strokeWidth={2.5} aria-hidden="true" /> 3 opportunities found
                    </div>
                  </>
                )}

                {phase === 1 && (
                  <>
                    <div className="studio-map" data-on={scene.wired || undefined}>
                      <div className="studio-map-node" data-target="planNode0">
                        <span>Signal</span>
                        <i>82% handoff lag</i>
                      </div>
                      <span className="studio-map-line" aria-hidden="true">
                        <i />
                      </span>
                      <div className="studio-map-node is-focus" data-target="planNode1">
                        <span>Blueprint</span>
                        <i>3 connected agents</i>
                      </div>
                      <span className="studio-map-line" aria-hidden="true">
                        <i />
                      </span>
                      <div className="studio-map-node" data-target="planNode2">
                        <span>Launch</span>
                        <i>Live in one cycle</i>
                      </div>
                    </div>
                    <div className="studio-plan-result" data-on={scene.lift || undefined}>
                      <span>One roadmap, linked to the work</span>
                      <b>+18% lift</b>
                    </div>
                  </>
                )}

                {phase === 2 && (
                  <>
                    <div className="studio-config" data-on={scene.config || undefined}>
                      <div className="studio-config-line">
                        <span className="studio-brace">{"{"}</span>
                        <span className="studio-key">when</span>
                        <span> : </span>
                        <span className="studio-val">&quot;score &gt; 79&quot;</span>
                        <span>,</span>
                      </div>
                      <div className="studio-config-line">
                        <span className="studio-key">route</span>
                        <span> : </span>
                        <span className="studio-val">&quot;sales&quot;</span>
                        <span className="studio-brace">{"}"}</span>
                      </div>
                    </div>
                    <div className="studio-output" data-on={scene.ran || undefined}>
                      <span>
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" /> Routed to Sales
                      </span>
                      <b>320ms</b>
                    </div>
                    <div className="studio-runs">
                      <div>
                        <span>Lead #482</span>
                        <i>2m ago</i>
                        <Check size={12} aria-hidden="true" />
                      </div>
                      <div>
                        <span>Lead #481</span>
                        <i>14m ago</i>
                        <Check size={12} aria-hidden="true" />
                      </div>
                    </div>
                  </>
                )}

                {phase === 3 && (
                  <>
                    <div className="studio-metric">
                      <Roll value={scene.live ? "12.4k" : "4.2k"} />
                      <span>runs today</span>
                    </div>
                    <div className="studio-kpis">
                      <div className="studio-kpi">
                        <span>Latency</span>
                        <b>{scene.live ? "92ms" : "180ms"}</b>
                        <i style={{ "--w": scene.live ? "42%" : "84%" }} />
                      </div>
                      <div className="studio-kpi">
                        <span>Success</span>
                        <b>{scene.live ? "99.8%" : "97.4%"}</b>
                        <i style={{ "--w": scene.live ? "96%" : "82%" }} />
                      </div>
                    </div>
                    <div className="studio-capacity">
                      <span>Capacity</span>
                      <b>{scene.live ? "68%" : "24%"}</b>
                      <div>
                        <i style={{ "--w": scene.live ? "68%" : "24%" }} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                className={`studio-action ${isReset ? "is-reset" : ""} ${done ? "is-go" : ""}`}
                data-target="actionBtn"
                onClick={() => (isReset ? go(0) : go((phase + 1) % STEPS.length))}
              >
                {isReset ? <RotateCcw size={13} strokeWidth={2.2} aria-hidden="true" /> : null}
                {copy.action}
                {!isReset && <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />}
              </button>

              <div className="studio-quiet" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>

            <aside className="studio-rail">
              <div className="studio-rail-head">
                <span>Workflow</span>
                <span>4 steps</span>
              </div>
              <div className="studio-spine">
                {NODES.map(({ label, meta, Icon }, i) => (
                  <div
                    className="studio-node"
                    key={label}
                    data-state={nodeState(i)}
                    {...(i === 2 ? { "data-target": "decideNode" } : {})}
                  >
                    <span className="studio-node-icon">
                      <Icon size={13} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="studio-node-copy">
                      <b>{label}</b>
                      <i>{meta}</i>
                    </span>
                    <span className="studio-node-mark" aria-hidden="true">
                      {nodeState(i) === "live" ? <Check size={12} strokeWidth={2.6} /> : null}
                    </span>
                  </div>
                ))}
              </div>
              <div className="studio-rail-foot">
                <span className="studio-rail-dot" aria-hidden="true" />
                {phase === 3 ? "Live · 4 agents" : "4 agents ready"}
              </div>
              <div className="studio-quiet studio-quiet--rail" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </aside>

            <Cursor {...cursorState} />
          </div>
        </div>
      </div>

      <div className="process-steps">
        {STEPS.map((s, i) => (
          <button
            type="button"
            key={s.title}
            className={`process-step ${i === phase ? "is-active" : ""}`}
            onClick={() => go(i)}
            aria-current={i === phase ? "step" : undefined}
          >
            <span className="process-rail" aria-hidden="true">
              <span className="process-rail-fill" ref={(el) => (railsRef.current[i] = el)} />
            </span>
            <span className="process-step-no" aria-hidden="true">
              0{i + 1}
            </span>
            <span className="process-step-body">
              <span className="process-step-title">{s.title}</span>
              <span className="process-step-line">{s.line}</span>
              <span className="process-step-outcome">
                <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                {s.outcome}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
