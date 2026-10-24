import { createFileRoute, notFound } from "@tanstack/react-router";
import { findService } from "@/data/services";
import ServiceDetailView from "@/views/ServiceDetailView";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = findService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug, title: service.title, intro: service.intro };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Ideaboat | AI Systems & Automation` : "Service — Ideaboat";
    const description = loaderData?.intro ?? "Ideaboat services";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetailRoute,
});

function ServiceDetailRoute() {
  const { slug } = Route.useLoaderData();
  return <ServiceDetailView slug={slug} />;
}
