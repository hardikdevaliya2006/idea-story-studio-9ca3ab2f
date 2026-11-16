import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
export const alt = "Ideaboat - AI automation, AI agents and growth systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
/**
 * Default social card, used for Open Graph and Twitter previews on every page.
 * Generated at build time - no external image or font request needed.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #07130d 0%, #0c2418 55%, #10351f 100%)",
        color: "#f3f7f4",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "#47c86e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#07130d",
            fontSize: "30px",
            fontWeight: 700,
          }}
        >
          I
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {siteConfig.name}
          </span>
          <span style={{ fontSize: "18px", color: "#9fd8b4" }}>{siteConfig.tagline}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}
        >
          AI that removes the busywork.
        </div>
        <div style={{ display: "flex", fontSize: "28px", color: "#b7e6c7" }}>
          Workflow automation · AI agents · CRM · High-converting websites
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "22px", color: "#7fae90" }}>
          {siteConfig.url.replace("https://", "")}
        </span>
        <span
          style={{
            display: "flex",
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid rgba(71, 200, 110, 0.45)",
            fontSize: "20px",
            color: "#8fe3ab",
          }}
        >
          Book a call
        </span>
      </div>
    </div>,
    { ...size },
  );
}
