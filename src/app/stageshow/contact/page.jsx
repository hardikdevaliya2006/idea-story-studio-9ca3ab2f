import { createMetadata } from "@/lib/seo";
import ContactVoyageView from "@/views/ContactVoyageView";

export const metadata = createMetadata({
  title: "Contact voyage walkthrough",
  description:
    "A stageshow walkthrough of the Ideaboat Studio contact panel: a brief becomes a live site across four voyage steps.",
  path: "/stageshow/contact",
  noIndex: true,
});

export default function Page() {
  return <ContactVoyageView />;
}
