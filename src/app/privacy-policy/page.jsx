import { createMetadata } from "@/lib/seo";
import { PrivacyPolicyView } from "@/views/LegalView";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Ideaboat collects, uses and protects the information you share with us.",
  path: "/privacy-policy",
});

export default function Page() {
  return <PrivacyPolicyView />;
}
