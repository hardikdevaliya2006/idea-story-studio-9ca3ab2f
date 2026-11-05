import { absoluteUrl, siteConfig } from "@/lib/site";
/**
 * Builds a complete, consistent Metadata object for a page: canonical URL,
 * Open Graph, Twitter card and robots directives. Titles use the root
 * template ("%s | Ideaboat") so pages only supply the page-specific part.
 */
export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false,
}) {
  const url = absoluteUrl(path);
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  };
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/favicon.png"),
    image: absoluteUrl("/favicon.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    sameAs: [`https://twitter.com/${siteConfig.twitter.replace("@", "")}`],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: siteConfig.phoneDisplay,
        availableLanguage: ["English"],
      },
    ],
  };
}
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}
export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.intro,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(`/services/${service.slug}`),
      servicePhone: siteConfig.phoneDisplay,
    },
  };
}
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
