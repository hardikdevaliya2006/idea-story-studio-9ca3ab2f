import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import AboutView from "@/views/AboutView";
export const metadata = createMetadata({
  title: "About Us - AI, Automation & Technology",
  description:
    "Meet Ideaboat: a team that turns ideas into intelligent solutions through AI, automation and technology. Our mission, values, approach and the people behind the work.",
  path: "/about",
  keywords: ["about Ideaboat", "AI automation team"],
});
export default function AboutPage() {
  return (
    <>
      <AboutView />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
