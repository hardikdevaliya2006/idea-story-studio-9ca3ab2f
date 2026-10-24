import { createFileRoute } from "@tanstack/react-router";
import AboutView from "@/views/AboutView";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Ideaboat | AI, Automation & Technology" },
      { name: "description", content: "IdeaBoat helps businesses turn ideas into intelligent solutions through AI, automation, and technology." },
      { property: "og:title", content: "About Us — Ideaboat | AI, Automation & Technology" },
      { property: "og:description", content: "IdeaBoat helps businesses turn ideas into intelligent solutions through AI, automation, and technology." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutView,
});
