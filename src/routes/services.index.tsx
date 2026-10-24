import { createFileRoute } from "@tanstack/react-router";
import ServicesView from "@/views/ServicesView";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Ideaboat | AI Systems & Automation" },
      { name: "description", content: "AI systems, automation, websites and marketing services from Ideaboat." },
      { property: "og:title", content: "Services — Ideaboat | AI Systems & Automation" },
      { property: "og:description", content: "AI systems, automation, websites and marketing services from Ideaboat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesView,
});
