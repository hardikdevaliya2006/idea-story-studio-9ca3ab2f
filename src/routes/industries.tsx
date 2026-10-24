import { createFileRoute } from "@tanstack/react-router";
import IndustriesView from "@/views/IndustriesView";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Ideaboat | Automation Built for Real Workflows" },
      { name: "description", content: "AI and automation tailored to the workflows of your industry." },
      { property: "og:title", content: "Industries — Ideaboat | Automation Built for Real Workflows" },
      { property: "og:description", content: "AI and automation tailored to the workflows of your industry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndustriesView,
});
