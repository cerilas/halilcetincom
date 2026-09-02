import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { ProcessRail } from "@/components/sections/process-rail";

export const metadata: Metadata = {
  title: "Saç Ekimi Süreci",
  description:
    "Analizden 12. aya kadar saç ekimi protokolü. Planlama, operasyon ve takip adımları.",
  alternates: { canonical: "/surec" },
};

export default async function ProcessPage() {
  const content = await getContent();

  return (
    <SiteShell content={content}>
      <div className="pt-16">
        <ProcessRail steps={content.process} />
      </div>
    </SiteShell>
  );
}
