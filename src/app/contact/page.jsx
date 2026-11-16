import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import ContactView from "@/views/ContactView";
export const metadata = createMetadata({
  title: "Contact - Let's Talk About Your Next AI Project",
  description:
    "Tell Ideaboat about your business, goals or project. We review your requirements and help you find the right automation or AI next step.",
  path: "/contact",
  keywords: ["contact Ideaboat", "AI project enquiry"],
});
export default function ContactPage() {
  return (
    <>
      <ContactView />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
