import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import IndustriesView from "@/views/IndustriesView";
export const metadata = createMetadata({
  title: "Industries — Automation Built for Real Workflows",
  description:
    "AI and automation tailored to SaaS, agencies, eCommerce, healthcare, finance, real estate, logistics and education workflows.",
  path: "/industries",
  keywords: ["industry automation", "AI by industry"],
});
export default function IndustriesPage() {
  return (
    <>
      <IndustriesView />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
    </>
  );
}
