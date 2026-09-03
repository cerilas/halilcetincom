import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/lib/seo";
import { MagneticButton } from "@/components/react-bits/magnetic-button";
import { CtaSection } from "@/components/sections/cta-section";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = await getContent();
  return content.treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const treatment = content.treatments.find((t) => t.slug === slug);
  if (!treatment) return {};
  return {
    title: treatment.title,
    description: treatment.excerpt,
    alternates: { canonical: `/tedaviler/${treatment.slug}` },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const treatment = content.treatments.find((t) => t.slug === slug);
  if (!treatment) notFound();

  return (
    <SiteShell content={content}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: treatment.title,
          description: treatment.description,
          procedureType: "Hair transplantation",
        }}
      />
      <article className="mx-auto max-w-3xl px-5 pt-32 pb-24">
        <Link href="/tedaviler" className="text-xs tracking-wide text-gold">
          ← Tedaviler
        </Link>
        <h1 className="mt-6 font-display text-5xl md:text-7xl">
          {treatment.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">{treatment.excerpt}</p>
        <div className="mt-8 flex gap-6 text-sm text-gold">
          <span>{treatment.grafts}</span>
          <span>{treatment.duration}</span>
        </div>
        
        {treatment.image && (
          <div className="my-10 overflow-hidden rounded-2xl border border-line relative h-[400px]">
            <Image
              src={treatment.image}
              alt={`${treatment.title} - Saç Ekimi Operasyonu`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover opacity-90"
              priority
            />
          </div>
        )}
        
        <div className="gold-line my-10 h-px" />
        <div 
          className="prose dark:prose-invert prose-gold max-w-none text-base leading-8 text-foreground/85 prose-headings:font-display prose-headings:text-foreground prose-a:text-gold hover:prose-a:text-gold-soft prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: treatment.contentHtml || `<p>${treatment.description}</p>` }}
        />
        <div className="mt-12">
          <MagneticButton href="/iletisim" className="bg-gold text-black">
            Bu tedavi için analiz
          </MagneticButton>
        </div>
      </article>
      <CtaSection content={content} />
    </SiteShell>
  );
}
