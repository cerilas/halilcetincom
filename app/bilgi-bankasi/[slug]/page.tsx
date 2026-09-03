import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { CtaSection } from "@/components/sections/cta-section";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug }
  });
  
  if (!article) return {};
  
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription,
    keywords: article.metaKeywords ? article.metaKeywords.split(',') : [],
    alternates: { canonical: `/bilgi-bankasi/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  
  const article = await prisma.article.findUnique({
    where: { slug }
  });
  
  if (!article) notFound();

  return (
    <SiteShell content={content}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.metaTitle || article.title,
          description: article.metaDescription,
          image: article.coverImage ? [article.coverImage] : [],
          datePublished: article.publishedAt.toISOString(),
          dateModified: article.updatedAt.toISOString(),
          author: {
            "@type": "Organization",
            name: content.clinic.legalName,
          }
        }}
      />
      
      <article className="mx-auto max-w-3xl px-5 pt-32 pb-24">
        <Link href="/bilgi-bankasi" className="text-xs tracking-wide text-gold">
          ← Bilgi Bankası
        </Link>
        
        <div className="mt-8 flex flex-wrap gap-4 text-xs tracking-wider text-gold uppercase">
          <span>{article.category}</span>
          <span className="text-muted/50">•</span>
          <span className="text-foreground">{article.author}</span>
          <span className="text-muted/50">•</span>
          <span className="text-muted">
            {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        
        <h1 className="mt-6 font-display text-4xl md:text-6xl leading-tight">
          {article.title}
        </h1>
        
        <div className="my-12 overflow-hidden rounded-2xl border border-line relative h-[400px]">
          <Image
            src={article.coverImage || "/sac-ekimi-bilgi-bankasi-gorsel.jpg"}
            alt={`${article.title} - Gaziantep Saç Ekimi`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
        
        <div 
          className="prose dark:prose-invert prose-gold max-w-none mt-10"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }} 
        />

        {article.metaKeywords && (
          <div className="mt-16 border-t border-line pt-8">
            <h3 className="text-sm font-medium text-foreground mb-4">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {article.metaKeywords.split(',').map((keyword, i) => (
                <span 
                  key={i} 
                  className="rounded-full border border-line bg-card px-3 py-1.5 text-xs text-muted"
                >
                  {keyword.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
      
      <CtaSection content={content} />
    </SiteShell>
  );
}
