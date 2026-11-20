import { createMetadata } from "@/lib/seo";
import { TermsOfServiceView } from "@/views/LegalView";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of the Ideaboat website.",
  path: "/terms-of-service",
});

export default function Page() {
  return <TermsOfServiceView />;
}
