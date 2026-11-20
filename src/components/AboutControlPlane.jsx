"use client";
/**
 * Stageshow lens on the mission column: a miniature Ideaboat control plane.
 * One window, corner-bled out of its well, with a three-step workflow and a
 * single status row that resolves from Running to Complete when the section
 * scrolls into view. Seven real strings; everything else is quiet surface.
 * The settled frame is what reduced-motion visitors see immediately.
 */
import { useEffect, useRef, useState } from "react";
import { Check, PlugZap, Rocket, Sailboat, Workflow } from "lucide-react";

const NODES = [
  { label: "Connect", icon: PlugZap },
  { label: "Automate", icon: Workflow },
  { label: "Deploy", icon: Rocket },
];

export default function AboutControlPlane() {
  const wellRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return undefined;
    }
    const well = wellRef.current;
    if (!well) return undefined;
    let timer = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        timer = window.setTimeout(() => setDone(true), 1400);
      },
      { threshold: 0.35 },
    );
    io.observe(well);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="about-scene about-cp" ref={wellRef}>
      <div className="about-scene-window about-cp-window" aria-hidden="true">
        <div className="about-cp-head">
          <span className="about-cp-mark">
            <Sailboat size={14} strokeWidth={2} />
          </span>
          <span className="about-cp-title">Control plane</span>
          <span className="about-cp-live">
            <i />
            Live
          </span>
        </div>

        <div className="about-cp-body">
          <div className="about-cp-flow">
            {NODES.map(({ label, icon: Icon }, i) => (
              <div key={label} className={`about-cp-node ${i === 1 ? "is-focus" : ""}`}>
                <span className="about-cp-node-icon">
                  <Icon size={14} strokeWidth={1.9} />
                </span>
                <span className="about-cp-node-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="about-cp-run">
            <span className="about-cp-run-mark">
              {done ? <Check size={12} strokeWidth={2.6} /> : <span className="about-cp-spin" />}
            </span>
            <span className="about-cp-run-label">Agent run</span>
            <span className="about-cp-run-state">{done ? "Complete" : "Running"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
