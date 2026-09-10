import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { ProcessRail } from "@/components/sections/process-rail";

import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Adım Adım Saç Ekimi Süreci ve Operasyon Aşamaları",
  description:
    "Analizden 12. aya kadar saç ekimi protokolü. Planlama, operasyon ve iyileşme takip adımları hakkında detaylı bilgi.",
  alternates: { canonical: "/surec" },
};

export default async function ProcessPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const content = await getContent(params.lang);

  return (
    <SiteShell content={content}>
      <div className="pt-16">
        <ProcessRail steps={content.process} content={content} />
      </div>
      <CtaSection content={content} />
    </SiteShell>
  );
}
