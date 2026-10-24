import { createFileRoute } from "@tanstack/react-router";
import ContactView from "@/views/ContactView";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ideaboat | Let's Talk About Your Next AI Project" },
      { name: "description", content: "Tell us about your business, goals, or project and we'll help you find the right next step." },
      { property: "og:title", content: "Contact — Ideaboat | Let's Talk About Your Next AI Project" },
      { property: "og:description", content: "Tell us about your business, goals, or project and we'll help you find the right next step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactView,
});
