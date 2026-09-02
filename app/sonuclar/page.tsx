import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Saç Ekimi Sonuçları",
  description:
    "Ön hat, tepe ve sıklaştırma sonuçları. 12. ay yoğunluk örnekleri.",
  alternates: { canonical: "/sonuclar" },
};

const cases = [
  { title: "Ön hat yeniden çizimi", note: "FUE · 3.400 greft · 12. ay" },
  { title: "Tepe kapanması", note: "Safir FUE · 3.800 greft · 12. ay" },
  { title: "Şakak sıklaştırma", note: "DHI · 2.200 greft · 10. ay" },
  { title: "Sakal çerçevesi", note: "Sakal ekimi · 1.400 greft · 8. ay" },
  { title: "Norwood 4 restorasyon", note: "FUE · 4.200 greft · 12. ay" },
  { title: "Doğal genç çizgi", note: "DHI · 2.600 greft · 12. ay" },
];

export default async function ResultsPage() {
  const content = await getContent();

  return (
    <SiteShell content={content}>
      <section className="mx-auto max-w-6xl px-5 pt-32 pb-24">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Sonuçlar</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          Fotoğraf değil, oran.
        </h1>
        <p className="mt-6 max-w-2xl text-muted">
          İlk sürümde vaka kartları görsel yer tutucudur. Gerçek önce/sonra
          görselleri admin panelinden eklenecek.
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cases.map((item, i) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-line bg-card"
            >
              <div
                className="h-64"
                style={{
                  background: `linear-gradient(${120 + i * 18}deg, rgba(196,164,106,${0.1 + (i % 3) * 0.07}), #0c0d11 50%, #1a140c)`,
                }}
              />
              <div className="p-5">
                <h2 className="font-display text-2xl">{item.title}</h2>
                <p className="mt-2 text-xs tracking-wide text-muted">
                  {item.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
