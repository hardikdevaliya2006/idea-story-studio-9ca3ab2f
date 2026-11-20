import { SERVICES } from "@/data/services";
import { absoluteUrl } from "@/lib/site";
const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/book-a-discovery-call", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];
export default function sitemap() {
  const lastModified = new Date();
  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    })),
  ];
}
