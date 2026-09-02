import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { PinCard } from "@/components/ui/pin-card";

export const metadata: Metadata = {
  title: "Saç Ekimi Tedavileri",
  description:
    "FUE, DHI, Safir FUE ve sakal ekimi. İstanbul'da kişiye özel saç ekimi protokolleri.",
  alternates: { canonical: "/tedaviler" },
};

export default async function TreatmentsPage() {
  const content = await getContent();

  return (
    <SiteShell content={content}>
      <section className="mx-auto max-w-6xl px-5 pt-32 pb-20">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Tedaviler</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          Teknikler, yüzünüze göre.
        </h1>
        <p className="mt-6 max-w-2xl text-muted">
          Her yöntem bir pazarlama adı değil; donör, yoğunluk ve çizgi ihtiyacına
          göre seçilen bir araçtır.
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {content.treatments.map((treatment) => (
            <Link key={treatment.id} href={`/tedaviler/${treatment.slug}`}>
              <PinCard title={treatment.grafts}>
                <div className="min-h-[260px] p-7">
                  <h2 className="font-display text-3xl">{treatment.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {treatment.excerpt}
                  </p>
                  <p className="mt-8 text-xs text-gold">{treatment.duration}</p>
                </div>
              </PinCard>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
