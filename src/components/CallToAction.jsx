import { useId } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CtaConversation from "@/components/CtaConversation";
import { siteConfig } from "@/lib/site";

/**
 * One closing CTA for every page. A compact dark panel, a single statement and
 * one primary action, closed by a quiet ruled email foot. The right column
 * carries a miniature conversation with the studio (message posted, answered).
 *
 * Pass `title` / `text` to tailor the message, or override either action.
 */
export default function CallToAction({
  title = "Ready to turn ideas into impact? Let's talk.",
  text = "Bring us the idea. We'll bring the strategy, design and build to make it real.",
  primary = { label: "Contact us", href: "/contact" },
  secondary = { label: "About Ideaboat", href: "/about" },
  showContact = true,
}) {
  const id = useId();
  return (
    <section className="cta-section" aria-labelledby={id}>
      <div className="cta-shell">
        <div className="cta-panel">
          <div className="cta-panel-body">
            <div className="cta-panel-copy">
              <h2 id={id} className="cta-panel-title">
                {title}
              </h2>
              {text && <p className="cta-panel-text">{text}</p>}
              <div className="cta-panel-actions">
                <Link href={primary.href} className="cta-panel-btn">
                  {primary.label}
                  <span className="cta-panel-btn-icon" aria-hidden="true">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </Link>
                {secondary && (
                  <Link href={secondary.href} className="cta-panel-link">
                    {secondary.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {showContact && (
                <div className="cta-panel-foot">
                  <a className="cta-panel-mail" href={`mailto:${siteConfig.email}`}>
                    <span>{siteConfig.email}</span>
                    <ArrowUpRight className="size-[15px]" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            {showContact && <CtaConversation />}
          </div>
        </div>
      </div>
    </section>
  );
}
