/**
 * Single source of truth for anything that identifies the site to search
 * engines: canonical origin, contact details (NAP consistency), and defaults.
 *
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment (e.g.
 * https://www.ideaboat.com) so canonicals, sitemap and Open Graph URLs are
 * absolute and correct in production.
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteConfig = {
  name: "Ideaboat",
  legalName: "Ideaboat",
  tagline: "Ideas in Motion",
  url: (configuredUrl && configuredUrl.length > 0
    ? configuredUrl
    : "https://www.ideaboat.com"
  ).replace(/\/+$/, ""),
  locale: "en_US",
  language: "en",
  twitter: "@ideaboat",
  title: "Ideaboat — AI Automation, AI Agents & Growth Systems",
  description:
    "Ideaboat designs AI workflow automation, custom AI agents, CRM systems and conversion-focused websites that remove manual work and help teams grow.",
  keywords: [
    "AI automation agency",
    "AI workflow automation",
    "custom AI agents",
    "business process automation",
    "CRM integration",
    "AI consulting",
    "AEO",
    "GEO",
    "web development agency",
    "Ideaboat",
  ],
  email: "hello@ideaboat.com",
  phoneDisplay: "1-800-356-8933",
  phoneHref: "tel:18003568933",
};
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
