import { JsonLd } from "@/components/json-ld";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import ServicesView from "@/views/ServicesView";
export const metadata = createMetadata({
  title: "AI Services - Automation, Agents & Growth Systems",
  description:
    "Explore Ideaboat's AI services: workflow automation, custom AI agents, AI for business growth, AEO & GEO, custom CRM solutions, branding, websites, Shopify and social media.",
  path: "/services",
  keywords: ["AI services", "workflow automation services", "AI agent development"],
});
export default function ServicesPage() {
  return (
    <>
      <ServicesView />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
