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
  title: "Ideaboat - AI Automation, AI Agents & Growth Systems",
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
  phoneDisplay: "096629 08849",
  phoneHref: "tel:+919662908849",
  address: ["Capstone Building, Parimal Garden, 706", "Ahmedabad, Gujarat 380006"],
  socials: [
    {
      platform: "LinkedIn",
      label: "Ideaboat on LinkedIn",
      href: "https://www.linkedin.com/company/idea-boat?originalSubdomain=in",
    },
    {
      platform: "Facebook",
      label: "Ideaboat on Facebook",
      href: "https://www.facebook.com/people/IdeaBoat/100066347627038/",
    },
    {
      platform: "Instagram",
      label: "Ideaboat on Instagram",
      href: "https://www.instagram.com/ideaboat.in/",
    },
  ],
};
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
