"use client";
/**
 * Stageshow lens on the approach section: one Studio window whose body changes
 * with the active step of the rail beside it. Four states, no cursor, no loop —
 * the rail owns the timing and this component only renders the current screen.
 * The window is inset at the top-left and bleeds off the right and bottom of
 * the 4:3 stage; every real word sits clear of the crop.
 */
import { Check, Sailboat } from "lucide-react";

const SCREENS = [
  {
    tag: "Discover",
    label: "Signals",
    rows: [
      ["Goal", "More qualified leads"],
      ["Audience", "Operations teams"],
      ["Signal", "Slow first response"],
    ],
  },
  {
    tag: "Plan",
    label: "Strategy map",
    nodes: ["Capture", "Qualify", "Route"],
  },
  {
    tag: "Build",
    label: "Workspace",
    checks: [
      ["Agent", "Lead qualifier"],
      ["Workflow", "Route to sales"],
      ["Deploy", "Staging"],
    ],
  },
  {
    tag: "Measure",
    label: "Results",
    metrics: [
      ["2x", "More qualified leads"],
      ["35%", "Faster lead response"],
    ],
  },
];

export default function AboutPipeline({ index }) {
  const screen = SCREENS[index];
  return (
    <div className="about-pipe" aria-hidden="true">
      <div className="about-pipe-head">
        <span className="about-pipe-mark">
          <Sailboat size={14} strokeWidth={2} />
        </span>
        <span className="about-pipe-title">Studio</span>
        <span className="about-pipe-tag">{screen.tag}</span>
      </div>

      <div className="about-pipe-body">
        <p className="about-pipe-label">{screen.label}</p>

        {screen.rows && (
          <div className="about-pipe-rows">
            {screen.rows.map(([key, value]) => (
              <div className="about-pipe-row" key={key}>
                <span className="about-pipe-key">{key}</span>
                <span className="about-pipe-value">{value}</span>
              </div>
            ))}
          </div>
        )}

        {screen.nodes && (
          <div className="about-pipe-nodes">
            {screen.nodes.map((node, i) => (
              <div className="about-pipe-node" key={node}>
                <span className="about-pipe-node-no">0{i + 1}</span>
                <span>{node}</span>
              </div>
            ))}
          </div>
        )}

        {screen.checks && (
          <div className="about-pipe-rows">
            {screen.checks.map(([key, value]) => (
              <div className="about-pipe-row" key={key}>
                <Check className="about-pipe-check" size={13} strokeWidth={2.4} />
                <span className="about-pipe-key">{key}</span>
                <span className="about-pipe-value">{value}</span>
              </div>
            ))}
          </div>
        )}

        {screen.metrics && (
          <div className="about-pipe-metrics">
            {screen.metrics.map(([value, label]) => (
              <div className="about-pipe-metric" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
