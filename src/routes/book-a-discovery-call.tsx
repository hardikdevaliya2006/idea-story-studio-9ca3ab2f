import { createFileRoute } from "@tanstack/react-router";
import BookCallView from "@/views/BookCallView";

export const Route = createFileRoute("/book-a-discovery-call")({
  head: () => ({
    meta: [
      { title: "Book a Discovery Call — Ideaboat" },
      { name: "description", content: "Tell us about your systems and goals. We'll follow up with the next steps." },
      { property: "og:title", content: "Book a Discovery Call — Ideaboat" },
      { property: "og:description", content: "Tell us about your systems and goals. We'll follow up with the next steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookCallView,
});
