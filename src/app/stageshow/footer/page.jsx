import { createMetadata } from "@/lib/seo";
import FooterWalkthroughView from "@/views/FooterWalkthroughView";

export const metadata = createMetadata({
  title: "Footer walkthrough",
  description:
    "A stageshow walkthrough of the Ideaboat footer: the cursor-follow wordmark glow, the link columns and the copyright bar.",
  path: "/stageshow/footer",
  noIndex: true,
});

export default function Page() {
  return <FooterWalkthroughView />;
}
