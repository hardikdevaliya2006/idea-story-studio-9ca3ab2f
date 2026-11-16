import { Check } from "lucide-react";
import { ImpactScene } from "@/components/ImpactScenes";

/** Kept verbatim from the previous step list so no copy is lost. */
const steps = [
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

/**
 * Four feature cards in the spirit of todesktop.com's "The Electron ops stack":
 * a self-contained illustration on a tinted stage, a centered label, a short
 * rule, and supporting copy. Uses the existing ImpactScene artwork and the
 * site's own theme tokens, and never lets an illustration escape its card.
 */
export function ServiceProcess() {
  return (
    <div className="impact-grid">
      {steps.map((s, i) => (
        <article key={s.title} className="impact-card">
          <div className="impact-card-stage">
            <ImpactScene index={i} />
          </div>
          <div className="impact-card-copy">
            <h3 className="impact-card-title">{s.title}</h3>
            <span className="impact-rule" aria-hidden="true" />
            <p className="impact-card-line">{s.line}</p>
            <span className="impact-card-outcome">
              <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
              {s.outcome}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
