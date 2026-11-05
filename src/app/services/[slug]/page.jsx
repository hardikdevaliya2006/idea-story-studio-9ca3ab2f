import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SERVICES, findService } from "@/data/services";
import { breadcrumbSchema, createMetadata, serviceSchema } from "@/lib/seo";
import ServiceDetailView from "@/views/ServiceDetailView";
export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) {
    return { title: "Service not found", robots: { index: false, follow: false } };
  }
  return createMetadata({
    title: service.title,
    description: service.intro,
    path: `/services/${service.slug}`,
    keywords: [service.title, ...service.tools.slice(0, 4)],
  });
}
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  return (
    <>
      <ServiceDetailView slug={service.slug} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
