import { JsonLd } from "@/components/json-ld";
import { HOME_FAQS } from "@/data/faqs";
import { createMetadata, faqSchema } from "@/lib/seo";
import HomeView from "@/views/HomeView";
export const metadata = createMetadata({
  title: "Ideaboat — Digital Marketing, Design & Development Studio",
  description:
    "Ideaboat helps brands grow with AI-powered websites, apps, branding and digital marketing. Strategy, design, development and automation under one roof.",
  path: "/",
  keywords: ["digital marketing agency", "web design", "branding", "app development"],
});
export default function HomePage() {
  return (
    <>
      <HomeView />
      <JsonLd data={faqSchema(HOME_FAQS)} />
    </>
  );
}
