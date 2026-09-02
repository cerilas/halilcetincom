import { getContent } from "@/lib/content";
import { clinicJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";
import { SiteShell } from "@/components/layout/site-shell";
import { HomeView } from "@/components/sections/home-view";

export default async function HomePage() {
  const content = await getContent();

  return (
    <SiteShell content={content}>
      <JsonLd data={clinicJsonLd(content)} />
      <JsonLd data={faqJsonLd(content)} />
      <HomeView content={content} />
    </SiteShell>
  );
}
