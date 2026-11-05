import { useEffect, useState } from "react";
import svcWebDesignImage from "@/assets/svc-web-design.jpg";
import svcAppImage from "@/assets/svc-app-dev.jpg";
import svcWebDevImage from "@/assets/svc-web-dev.jpg";
import svcMarketingImage from "@/assets/svc-marketing.jpg";
const svcWebDesign = svcWebDesignImage;
const svcApp = svcAppImage;
const svcWebDev = svcWebDevImage;
const svcMarketing = svcMarketingImage;
// Four service capsules only — stacked at the centre, then spread to the corners around the headline.
const capsules = [
  { label: "AI Workflow Automations", x: "-30vw", y: "-19vh", rot: -6, img: svcApp.src },
  { label: "Website Development", x: "30vw", y: "-17vh", rot: 5, img: svcWebDev.src },
  { label: "Branding & Designing", x: "-28vw", y: "17vh", rot: 4, img: svcWebDesign.src },
  { label: "Social Media", x: "28vw", y: "19vh", rot: -5, img: svcMarketing.src },
];
export function HeroCapsules() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {capsules.map((c, k) => (
        <div
          key={c.label}
          className="absolute left-1/2 top-1/2 hidden md:block"
          style={{
            transform: open
              ? `translate(-50%, -50%) translate(${c.x}, ${c.y}) rotate(${c.rot}deg)`
              : `translate(-50%, -50%) scale(0.6) rotate(${k * 8 - 28}deg)`,
            opacity: open ? 1 : 0,
            transition: `transform 1.4s cubic-bezier(.2,.8,.2,1) ${k * 90}ms, opacity .8s ease ${k * 90}ms`,
          }}
        >
          <div
            className="float-soft"
            style={{ animationDelay: `${k * -0.8}s`, animationDuration: `${6 + (k % 3)}s` }}
          >
            <span className="pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-card py-0.5 pl-0.5 pr-3 text-[11px] font-medium text-card-foreground transition duration-300 hover:border-primary md:text-xs">
              <img src={c.img} alt="" className="size-5 rounded-full object-cover md:size-6" />
              {c.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
