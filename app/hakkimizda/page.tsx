import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Klinik Hakkında",
  description:
    "Op. Dr. Halil Çetin ve İstanbul Nişantaşı saç ekimi kliniği. Cerrahi titizlik, dijital planlama.",
  alternates: { canonical: "/hakkimizda" },
};

export default async function AboutPage() {
  const content = await getContent();

  return (
    <SiteShell content={content}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Physician",
          name: content.clinic.doctorName,
          jobTitle: content.clinic.doctorTitle,
          worksFor: content.clinic.legalName,
        }}
      />
      <section className="mx-auto max-w-3xl px-5 pt-32 pb-24">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Klinik</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          {content.about.headline}
        </h1>
        <p className="mt-8 text-lg leading-9 text-muted">{content.about.body}</p>
        <ul className="mt-12 space-y-4">
          {content.about.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-foreground/90">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-muted">
          {content.clinic.doctorName} · {content.clinic.doctorTitle}
        </p>
      </section>
    </SiteShell>
  );
}
