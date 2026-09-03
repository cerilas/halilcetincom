import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { PinCard } from "@/components/ui/pin-card";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Safir FUE ve DHI Saç Ekimi Tedavileri",
  description:
    "FUE, DHI, Safir FUE ve sakal ekimi. Gaziantep'te kişiye özel saç ekimi protokolleri ile doğal ve kalıcı sonuçlar.",
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
                  <p className="mt-2 font-medium text-sm text-foreground/80">
                    {treatment.excerpt}
                  </p>
                  
                  {treatment.image && (
                    <div className="my-6 overflow-hidden rounded-xl border border-line relative h-48">
                      <Image
                        src={treatment.image}
                        alt={`${treatment.title} - Saç Ekimi Operasyonu`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                  )}

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {treatment.description}
                  </p>
                  <p className="mt-8 text-xs text-gold">{treatment.duration}</p>
                </div>
              </PinCard>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection content={content} />
    </SiteShell>
  );
}
