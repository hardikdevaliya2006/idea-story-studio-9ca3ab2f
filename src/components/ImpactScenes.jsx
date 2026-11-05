/**
 * Approach visuals, modelled on todesktop.com's feature cards.
 * Each step is a gridded stage with a floating glass panel and one slow,
 * looped illustration — one per step, self-contained SVG (nothing is
 * hotlinked from todesktop). Geometry is in % of a 4:3 stage so it scales
 * with the card. Animations only run when prefers-reduced-motion: no-preference.
 */
function Stage({ children }) {
  return (
    <div className="impact-stage" aria-hidden="true">
      <span className="impact-stage-grid" />
      {children}
    </div>
  );
}
function Window({ left, top, width, height, children }) {
  return (
    <div className="impact-window" style={{ left, top, width, height }}>
      <div className="impact-window-bar">
        <span />
        <span />
        <span />
      </div>
      {children}
    </div>
  );
}
/** Discover: insights surface — a document with a magnifying glass over it. */
function DiscoverScene() {
  return (
    <Stage>
      <span className="impact-halo" />
      <span className="impact-ring" />
      <Window left="10%" top="14%" width="80%" height="62%">
        <svg viewBox="0 0 140 90" className="approach-icon approach-discover" fill="none">
          <rect x="10" y="10" width="72" height="62" rx="7" className="approach-doc" />
          <rect
            x="18"
            y="22"
            width="44"
            height="6"
            rx="2"
            className="approach-line"
            style={{ animationDelay: "0s" }}
          />
          <rect
            x="18"
            y="32"
            width="56"
            height="6"
            rx="2"
            className="approach-line"
            style={{ animationDelay: "0.15s" }}
          />
          <rect
            x="18"
            y="42"
            width="38"
            height="6"
            rx="2"
            className="approach-line"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="108"
            cy="60"
            r="15"
            className="approach-ring"
            style={{ animationDelay: "0.45s" }}
          />
          <path className="approach-handle" d="M120 70l14 14" />
        </svg>
      </Window>
      <span className="impact-node" style={{ left: "82%", top: "78%" }} />
    </Stage>
  );
}
/** Plan: strategy mapped — a winding path with nodes connecting the way. */
function PlanScene() {
  return (
    <Stage>
      <span className="impact-ring impact-ring-wide" />
      <Window left="9%" top="12%" width="82%" height="66%">
        <svg viewBox="0 0 140 90" className="approach-icon approach-plan" fill="none">
          <path className="approach-path" d="M14 58c0 0 28 -26 56 0 0 0 28 26 56 0" />
          <circle cx="14" cy="58" r="5" className="approach-dot" style={{ animationDelay: "0s" }} />
          <circle
            cx="70"
            cy="32"
            r="5"
            className="approach-dot"
            style={{ animationDelay: "0.25s" }}
          />
          <circle
            cx="126"
            cy="58"
            r="5"
            className="approach-dot"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </Window>
      <span className="impact-tag" style={{ left: "8%", top: "84%" }}>
        Roadmap
      </span>
      <span className="impact-node" style={{ left: "86%", top: "76%" }} />
    </Stage>
  );
}
/** Build: built to fit — blocks assembling into place. */
function BuildScene() {
  return (
    <Stage>
      <Window left="9%" top="10%" width="64%" height="56%">
        <svg viewBox="0 0 140 90" className="approach-icon approach-build" fill="none">
          <rect
            x="20"
            y="44"
            width="40"
            height="30"
            rx="4"
            className="approach-block"
            style={{ animationDelay: "0s" }}
          />
          <rect
            x="20"
            y="22"
            width="56"
            height="16"
            rx="4"
            className="approach-block"
            style={{ animationDelay: "0.2s" }}
          />
          <rect
            x="20"
            y="6"
            width="72"
            height="10"
            rx="4"
            className="approach-block"
            style={{ animationDelay: "0.4s" }}
          />
        </svg>
      </Window>
      <span className="impact-tag" style={{ left: "56%", top: "2%" }}>
        v1.0 · shipped
      </span>
      <span className="impact-node" style={{ left: "84%", top: "76%" }} />
    </Stage>
  );
}
/** Scale: results measured — a line chart trending up. */
function ScaleScene() {
  return (
    <Stage>
      <Window left="8%" top="10%" width="84%" height="68%">
        <svg viewBox="0 0 140 90" className="approach-icon approach-scale" fill="none">
          <polyline className="approach-chart-line" points="20,70 48,56 76,48 104,32 130,26" />
          <circle cx="20" cy="70" r="4" className="approach-dot" style={{ animationDelay: "0s" }} />
          <circle
            cx="48"
            cy="56"
            r="4"
            className="approach-dot"
            style={{ animationDelay: "0.18s" }}
          />
          <circle
            cx="76"
            cy="48"
            r="4"
            className="approach-dot"
            style={{ animationDelay: "0.36s" }}
          />
          <circle
            cx="104"
            cy="32"
            r="4"
            className="approach-dot"
            style={{ animationDelay: "0.54s" }}
          />
          <circle
            cx="130"
            cy="26"
            r="4"
            className="approach-dot"
            style={{ animationDelay: "0.72s" }}
          />
        </svg>
      </Window>
      <span className="impact-node" style={{ left: "82%", top: "78%" }} />
    </Stage>
  );
}
const SCENES = [DiscoverScene, PlanScene, BuildScene, ScaleScene];
export function ImpactScene({ index }) {
  const Scene = SCENES[index % SCENES.length];
  return <Scene />;
}
