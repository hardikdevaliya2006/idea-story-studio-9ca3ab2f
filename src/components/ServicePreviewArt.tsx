
import { Bot, Heart, MessageCircle, Share2, Play, ShoppingBag, Search, Globe, Palette, Workflow, TrendingUp, LayoutGrid } from "lucide-react";

const icons = [Workflow, Bot, TrendingUp, Search, LayoutGrid, Palette, Globe, ShoppingBag, Share2];

/** Bespoke line-art compositions, selected by the focused service. */
export function ServicePreviewArt({ service }: { service: number }) {
  const Icon = icons[service] ?? Workflow;
  return (
    <div key={service} className="service-preview-art relative grid size-40 place-items-center" role="img" aria-label={`${["Workflow automation", "AI agent", "Business growth", "Search discovery", "CRM systems", "Brand design", "Website development", "Ecommerce", "Social media"][service]} graphic`}>
      <svg viewBox="0 0 160 160" className="absolute inset-0 size-full" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {service === 0 && <><path d="M28 34H80V80H132V126H80V80H28Z" /><rect x="14" y="20" width="28" height="28" rx="6" /><rect x="118" y="66" width="28" height="28" rx="6" /><rect x="66" y="112" width="28" height="28" rx="6" /><path d="m74 29 6 5-6 5m52 80 6 7-6 5" /></>}
        {service === 1 && <><rect x="38" y="38" width="84" height="84" rx="24" /><rect x="26" y="26" width="108" height="108" rx="32" strokeDasharray="3 7" /><path d="M80 12v14M80 134v14M12 80h14M134 80h14M45 15l8 13M107 132l8 13" /><circle cx="80" cy="12" r="3" /></>}
        {service === 2 && <><path d="M18 132H144M24 132V98h22v34M58 132V82h22v50M92 132V62h22v70M126 132V36h18v96" /><path d="m18 72 36-23 29 9 50-39m-19 0h19v19" /><circle cx="54" cy="49" r="4" /><circle cx="83" cy="58" r="4" /></>}
        {service === 3 && <><ellipse cx="72" cy="70" rx="52" ry="52" /><ellipse cx="72" cy="70" rx="25" ry="52" /><path d="M20 70h104M28 44h88M28 96h88m83 13 26 26" /><circle cx="112" cy="112" r="19" strokeWidth="2" /><path d="m106 112 4 4 8-9" /></>}
        {service === 4 && <><rect x="12" y="20" width="136" height="120" rx="9" /><path d="M12 44h136M48 44v96" /><path d="M23 61h13M23 77h13M23 93h13" /><rect x="60" y="57" width="34" height="29" rx="4" /><rect x="104" y="57" width="32" height="29" rx="4" /><path d="M60 104h76M60 117h51" /><circle cx="24" cy="32" r="2" /><circle cx="34" cy="32" r="2" /></>}
        {service === 5 && <><path d="m80 19 57 33v66l-57 33-57-33V52Z" /><path d="m23 52 57 33 57-33M80 85v66M80 19v66m-57 33 57-33 57 33" /><circle cx="80" cy="85" r="29" /><path d="M14 15h17M22 7v17m116 112h15m-7-7v15" /></>}
        {service === 6 && <><rect x="12" y="25" width="136" height="105" rx="9" /><path d="M12 48h136" /><circle cx="25" cy="37" r="2" /><circle cx="35" cy="37" r="2" /><circle cx="45" cy="37" r="2" /><path d="m53 68-17 18 17 18m54-36 17 18-17 18M88 64l-16 43M60 144h40M80 130v14" /></>}
        {service === 7 && <><path d="M35 45h90l9 99H26Z" /><path d="M59 45V33a21 21 0 0 1 42 0v12" /><path d="m112 19 26-3 12 23-26 3Z" /><circle cx="135" cy="28" r="2" /><path d="M16 77H6m139 36h10" /><circle cx="28" cy="21" r="6" /></>}
        {service === 8 && <><path d="M80 80 30 34M80 80l52-38M80 80l-52 46M80 80l49 48" strokeDasharray="3 5" /><circle cx="80" cy="80" r="27" /><rect x="10" y="14" width="41" height="38" rx="10" /><rect x="112" y="22" width="38" height="38" rx="10" /><rect x="9" y="109" width="40" height="37" rx="10" /><circle cx="130" cy="130" r="20" /></>}
      </svg>
      {service === 8 ? <><Share2 className="absolute left-[65px] top-[65px] size-[30px]" /><Heart className="absolute left-[21px] top-[24px] size-5" /><MessageCircle className="absolute right-[19px] top-[31px] size-5" /><Play className="absolute bottom-[22px] left-[20px] size-5" /><Heart className="absolute bottom-[20px] right-[20px] size-5" /></> : <Icon className={`relative size-9 ${[2, 3, 4, 6].includes(service) ? "opacity-0" : ""}`} strokeWidth={1.4} />}
    </div>
  );
}