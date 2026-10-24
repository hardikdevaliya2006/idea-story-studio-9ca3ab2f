import { createFileRoute } from "@tanstack/react-router";
import HomeView from "@/views/HomeView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ideaboat — Digital Marketing & Creative Agency" },
      { name: "description", content: "Strategy, design, development and digital marketing that drive growth." },
      { property: "og:title", content: "Ideaboat — Digital Marketing & Creative Agency" },
      { property: "og:description", content: "Strategy, design, development and digital marketing that drive growth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeView,
});
