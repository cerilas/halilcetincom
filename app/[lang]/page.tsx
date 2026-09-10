import { getContent } from "@/lib/content";
import { clinicJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";
import { SiteShell } from "@/components/layout/site-shell";
import { HomeView } from "@/components/sections/home-view";

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const content = await getContent(params.lang);

  return (
    <SiteShell content={content}>
      <JsonLd data={clinicJsonLd(content)} />
      <JsonLd data={faqJsonLd(content)} />
      <HomeView content={content} />
    </SiteShell>
  );
}
