import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { SERVICES } from "@/data/services";
import { createMetadata, serviceSchema } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
// These guard the parts of SEO that are easy to break silently when pages or
// services are added: crawlable URLs, canonical uniqueness and schema fields.
describe("SEO", () => {
  it("lists every public page and service in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const path of [
      "/",
      "/services",
      "/about",
      "/industries",
      "/contact",
      "/book-a-discovery-call",
    ]) {
      expect(urls).toContain(absoluteUrl(path));
    }
    for (const service of SERVICES) {
      expect(urls).toContain(absoluteUrl(`/services/${service.slug}`));
    }
  });
  it("gives every service a unique canonical URL and description", () => {
    const metas = SERVICES.map((service) =>
      createMetadata({
        title: service.title,
        description: service.intro,
        path: `/services/${service.slug}`,
      }),
    );
    const canonicals = metas.map((meta) => String(meta.alternates?.canonical));
    expect(new Set(canonicals).size).toBe(SERVICES.length);
    for (const meta of metas) {
      expect(String(meta.description).length).toBeGreaterThan(40);
      expect(meta.openGraph?.images).toBeTruthy();
      expect(meta.twitter).toBeTruthy();
    }
  });
  it("describes each service with Service schema linked to the organisation", () => {
    for (const service of SERVICES) {
      const schema = serviceSchema(service);
      expect(schema["@type"]).toBe("Service");
      expect(schema["url"]).toBe(absoluteUrl(`/services/${service.slug}`));
      expect(schema["provider"]).toEqual({ "@id": `${siteConfig.url}/#organization` });
    }
  });
});
