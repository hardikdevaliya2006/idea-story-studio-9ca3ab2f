/*
 * Hand-drawn line illustrations for the Services dropdown.
 *
 * Each service gets a small 40x40 scene in the same spirit as MindCloud's Docs
 * icons: a quiet, monochrome "rest" drawing and a lit layer of brand-coloured
 * accents that crossfades in on hover. Colours are driven by CSS custom
 * properties (defined in styles.css) so the same artwork works in both themes.
 */

import React from "react";

function Art({ children }) {
  return (
    <span className="nav-art" aria-hidden="true">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "var(--art-line)" }}
      >
        {children}
      </svg>
    </span>
  );
}

function WorkflowArt() {
  return (
    <Art>
      <rect className="art-soft" x="3" y="4" width="13" height="9" rx="2.5" />
      <rect className="art-soft" x="3" y="27" width="13" height="9" rx="2.5" />
      <rect className="art-soft" x="24" y="15.5" width="13" height="9" rx="2.5" />
      <path d="M16 8.5h4c2.5 0 2.5 11.5 4 11.5" />
      <path d="M16 31.5h4c2.5 0 2.5-11.5 4-11.5" />
      <path className="art-line-soft" d="M6.5 8.5h7M6.5 31.5h5M27.5 20h6" />
      <g className="art-lit">
        <circle className="art-primary" cx="9.5" cy="8.5" r="1.6" />
        <circle className="art-accent" cx="9.5" cy="31.5" r="1.6" />
        <circle className="art-glow" cx="30.5" cy="20" r="3.6" />
        <circle className="art-primary-line" cx="30.5" cy="20" r="3.2" />
        <circle className="art-primary-dot" cx="30.5" cy="20" r="1.4" />
      </g>
    </Art>
  );
}

function AgentArt() {
  return (
    <Art>
      <rect className="art-soft" x="6" y="11" width="28" height="22" rx="7" />
      <path d="M20 11V6" />
      <circle className="art-soft" cx="20" cy="5" r="1.8" />
      <circle className="art-soft" cx="14.5" cy="21" r="2.2" />
      <circle className="art-soft" cx="25.5" cy="21" r="2.2" />
      <path d="M15.5 27h9" />
      <path d="M6 19H3M34 19h3" />
      <g className="art-lit">
        <circle className="art-primary-dot" cx="20" cy="5" r="1.8" />
        <circle className="art-primary-dot" cx="14.5" cy="21" r="1.3" />
        <circle className="art-primary-dot" cx="25.5" cy="21" r="1.3" />
        <path className="art-accent-line" d="M33 4v6M30 7h6" />
      </g>
    </Art>
  );
}

function GrowthArt() {
  return (
    <Art>
      <path d="M5 34h30" />
      <rect className="art-soft" x="8" y="24" width="6" height="10" rx="1.5" />
      <rect className="art-soft" x="17" y="18" width="6" height="16" rx="1.5" />
      <rect className="art-soft" x="26" y="11" width="6" height="23" rx="1.5" />
      <path d="M9 20l8-6 9-6" />
      <path d="M22 8h4v4" />
      <g className="art-lit">
        <rect className="art-primary-fill" x="8" y="24" width="6" height="10" rx="1.5" />
        <rect className="art-accent-fill" x="17" y="18" width="6" height="16" rx="1.5" />
        <rect className="art-primary-fill" x="26" y="11" width="6" height="23" rx="1.5" />
        <circle className="art-warm-dot" cx="31" cy="6" r="2" />
      </g>
    </Art>
  );
}

function SearchArt() {
  return (
    <Art>
      <rect className="art-soft" x="4" y="6" width="32" height="23" rx="4" />
      <path d="M11 13h18M11 18h15M11 23h10" />
      <circle className="art-soft" cx="27" cy="27" r="5" />
      <path d="M30.6 30.6l4.4 4.4" />
      <path className="art-line-soft" d="M4 12h32" />
      <g className="art-lit">
        <path className="art-primary-line" strokeWidth="2" d="M11 13h13" />
        <circle className="art-glow" cx="27" cy="27" r="4" />
        <circle className="art-accent-line" cx="27" cy="27" r="4" />
        <path className="art-warm-line" d="M7 3v4M5 5h4" />
      </g>
    </Art>
  );
}

function CrmArt() {
  return (
    <Art>
      <rect className="art-soft" x="4" y="6" width="14" height="11" rx="2.5" />
      <rect className="art-soft" x="22" y="23" width="14" height="11" rx="2.5" />
      <path d="M18 11.5h4a4 4 0 0 1 4 4V23" />
      <path className="art-line-soft" d="M8 11h6M8 14.5h4M26 28h6M26 31h4" />
      <g className="art-lit">
        <circle className="art-primary-dot" cx="11" cy="11.5" r="1.6" />
        <circle className="art-accent-dot" cx="29" cy="28" r="1.6" />
        <path className="art-accent-line" strokeDasharray="1 2.4" d="M22 17.5h3" />
      </g>
    </Art>
  );
}

function BrandArt() {
  return (
    <Art>
      <rect className="art-soft" x="5" y="8" width="9" height="24" rx="2" />
      <rect className="art-soft" x="15.5" y="8" width="9" height="24" rx="2" />
      <rect className="art-soft" x="26" y="8" width="9" height="24" rx="2" />
      <path className="art-line-soft" d="M9.5 12v16M20 12v16M30.5 12v16" />
      <g className="art-lit">
        <rect className="art-primary-fill" x="5.6" y="8.6" width="7.8" height="22.8" rx="1.5" />
        <rect className="art-accent-fill" x="16.1" y="8.6" width="7.8" height="22.8" rx="1.5" />
        <rect className="art-warm-fill" x="26.6" y="8.6" width="7.8" height="22.8" rx="1.5" />
      </g>
    </Art>
  );
}

function WebArt() {
  return (
    <Art>
      <rect className="art-soft" x="4" y="6" width="32" height="28" rx="3" />
      <path d="M4 13h32" />
      <circle className="art-soft" cx="9" cy="9.5" r="1.2" />
      <circle className="art-soft" cx="13.5" cy="9.5" r="1.2" />
      <circle className="art-soft" cx="18" cy="9.5" r="1.2" />
      <path d="M16 20l-4 4 4 4M24 20l4 4-4 4M22.5 19l-5 10" />
      <g className="art-lit">
        <circle className="art-primary-dot" cx="9" cy="9.5" r="1.2" />
        <path className="art-accent-line" strokeWidth="1.8" d="M16 20l-4 4 4 4M24 20l4 4-4 4" />
        <path className="art-primary-line" strokeWidth="1.8" d="M22.5 19l-5 10" />
      </g>
    </Art>
  );
}

function ShopArt() {
  return (
    <Art>
      <rect className="art-soft" x="7" y="13" width="26" height="21" rx="3" />
      <path d="M14 13v-3a6 6 0 0 1 12 0v3" />
      <path className="art-line-soft" d="M13 22h14" />
      <circle className="art-soft" cx="20" cy="27" r="2" />
      <g className="art-lit">
        <rect className="art-glow" x="7.6" y="13.6" width="24.8" height="19.8" rx="2.5" />
        <circle className="art-accent-dot" cx="20" cy="27" r="1.6" />
        <path className="art-warm-line" d="M34 5v5M31.5 7.5h5" />
      </g>
    </Art>
  );
}

function SocialArt() {
  return (
    <Art>
      <path className="art-soft" d="M6 17L25 11v18L6 23z" />
      <path d="M25 15a4 4 0 0 1 0 10" />
      <path d="M10 23v4a3 3 0 0 0 6 0v-4.6" />
      <path className="art-line-soft" d="M9 17v6" />
      <circle className="art-soft" cx="34" cy="12" r="2.6" />
      <circle className="art-soft" cx="34" cy="28" r="2.6" />
      <path className="art-line-soft" d="M31.5 13.5L28 16M31.5 26.5L28 24" />
      <g className="art-lit">
        <circle className="art-primary-dot" cx="34" cy="12" r="2.6" />
        <circle className="art-accent-dot" cx="34" cy="28" r="2.6" />
        <path className="art-accent-line" opacity="0.8" d="M29 13a5 5 0 0 1 0 14M31.5 10.5a8.5 8.5 0 0 1 0 19" />
      </g>
    </Art>
  );
}

const ART = {
  "ai-workflow-automation": WorkflowArt,
  "custom-ai-agents": AgentArt,
  "ai-for-business-growth": GrowthArt,
  "aeo-geo": SearchArt,
  "custom-solutions-crm": CrmArt,
  "branding-designing": BrandArt,
  "website-development": WebArt,
  "shopify-ecommerce": ShopArt,
  "social-media": SocialArt,
};

export default function ServiceArt({ slug }) {
  const Illustration = ART[slug];
  return Illustration ? <Illustration /> : null;
}
