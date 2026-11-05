import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import BookCallView from "@/views/BookCallView";
export const metadata = createMetadata({
  title: "Book a Discovery Call",
  description:
    "Book a discovery call with Ideaboat. Tell us about your systems and goals, and we'll follow up with a practical automation plan and next steps.",
  path: "/book-a-discovery-call",
  keywords: ["book a discovery call", "AI consultation"],
});
export default function BookCallPage() {
  return (
    <>
      <BookCallView />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book a discovery call", path: "/book-a-discovery-call" },
        ])}
      />
    </>
  );
}
