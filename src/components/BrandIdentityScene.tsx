import { Palette, type LucideIcon } from "lucide-react";

/**
 * Branding scene, modelled on agno.com's "You own your data" tile: an open box
 * with the brand mark rising out of it and four asset chips fanned above,
 * each catching a slow sheen. Geometry is laid out on the source 427 x 301
 * artboard so the composition matches the reference.
 */
const CHIPS: { icon: string; label: string; left: number; top: number; delay: number }[] = [
  { icon: "/design_tool_icon/figma.jpg", label: "Figma", left: 7.42, top: 35.81, delay: 0.15 },
  { icon: "/design_tool_icon/canva.webp", label: "Canva", left: 28.44, top: 16.28, delay: 0 },
  { icon: "/design_tool_icon/Photoshop.jpg", label: "Photoshop", left: 55.43, top: 16.28, delay: 0.3 },
  { icon: "/design_tool_icon/framer.png", label: "Framer", left: 78.27, top: 35.81, delay: 0.45 },
];

export function BrandIdentityScene() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="relative aspect-[427/301] h-full max-h-[13.5rem] w-auto max-w-full">
        <span className="brand-glow" aria-hidden="true" />

        <svg
          viewBox="0 0 427 301"
          className="brand-box absolute inset-0 size-full"
          fill="none"
          aria-hidden="true"
        >
          <path className="brand-box-mouth" d="M158.5 182.5H258L267.4 215H149Z" />
          <path className="brand-box-side" d="M149 215 158.5 182.5V270L149 301Z" />
          <path className="brand-box-side" d="M267.4 215 258 182.5V270L267.4 301Z" />
          <path className="brand-box-front" d="M149 215H267.4V301H149Z" />
          <path className="brand-box-flap" d="M158.9 182.2 117 215.4 101.4 245.8 149 215.4Z" />
          <path className="brand-box-flap" d="M257.9 182.2 299 215.4 314.5 245.8 267.4 215.4Z" />
          <path className="brand-box-line" d="M158.5 182.5H258" />
          <path className="brand-box-line" d="M149 215H267.4" />
          <path className="brand-box-line" d="M158.5 182.5V270" />
          <path className="brand-box-line" d="M258 182.5V270" />
          <path className="brand-box-line" d="M117 215.4 101.4 245.8" />
          <path className="brand-box-line" d="M299 215.4 314.5 245.8" />
        </svg>

        {CHIPS.map(({ icon, label, left, top, delay }) => (
          <span
            key={label}
            className="brand-chip"
            style={{ left: `${left}%`, top: `${top}%` }}
            aria-hidden="true"
          >
            <img
              src={icon}
              alt={label}
              className="brand-chip-img"
              loading="lazy"
            />
            <span className="brand-shine" style={{ animationDelay: `${delay}s` }} />
          </span>
        ))}

        <span
          className="brand-mark surface-sheen"
          style={{ left: "42.37%", top: "46.75%" }}
          aria-hidden="true"
        >
          <Palette />
          <span className="brand-shine" style={{ animationDelay: "0.9s" }} />
        </span>
      </div>
    </div>
  );
}