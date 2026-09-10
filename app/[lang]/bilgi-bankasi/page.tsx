import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/layout/site-shell";
import { PinCard } from "@/components/ui/pin-card";
import { SearchBar } from "@/components/ui/search-bar";
import { prisma } from "@/lib/db";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Saç Ekimi Bilgi Bankası ve Uzman Rehberi",
  description:
    "Saç ekimi hakkında bilimsel, detaylı ve güvenilir bilgiler. Saç dökülmesi tedavileri, ameliyat sonrası bakım ve daha fazlası.",
  alternates: { canonical: "/bilgi-bankasi" },
};

export const revalidate = 3600; // Revalidate every hour

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function KnowledgeBasePage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const content = await getContent(resolvedParams.lang);
  
  const page = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page, 10) || 1 : 1;
  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const ITEMS_PER_PAGE = 6;
  
  const whereClause = q ? {
    OR: [
      { title: { contains: q, mode: "insensitive" as const } },
      { contentHtml: { contains: q, mode: "insensitive" as const } },
      { category: { contains: q, mode: "insensitive" as const } },
    ]
  } : {};
  
  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where: whereClause,
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: {
        publishedAt: 'desc'
      }
    }),
    prisma.article.count({ where: whereClause })
  ]);
  
  // Get absolute total for statistics (not filtered by search)
  const absoluteTotal = await prisma.article.count();

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <SiteShell content={content}>
      <section className="mx-auto max-w-6xl px-5 pt-32 pb-40">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">{content.ui.knowledgeBase.eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          {content.ui.knowledgeBase.title}
        </h1>
        
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-end border-b border-white/5 pb-10">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <p className="text-muted text-base md:text-lg leading-relaxed">
              {content.ui.knowledgeBase.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-gold/90 bg-gold/5 w-max px-4 py-2 rounded-full border border-gold/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              {content.ui.knowledgeBase.libraryHas} <strong>{absoluteTotal} {content.ui.knowledgeBase.specialContentCount}</strong> {content.ui.knowledgeBase.found}
            </div>
          </div>
          
          <div className="lg:col-span-5 xl:col-span-4 w-full">
            <Suspense fallback={<div className="h-12 w-full rounded-full border border-line bg-card/50" />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
        
        {articles.length === 0 ? (
          <div className="mt-14 py-20 text-center border border-line rounded-2xl bg-card">
            <p className="text-muted">
              {q ? `"${q}" ${content.ui.knowledgeBase.noMatch}` : content.ui.knowledgeBase.noArticles}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const title = resolvedParams.lang === "en" ? article.titleEn || article.title : resolvedParams.lang === "ar" ? article.titleAr || article.title : article.title;
                const metaDesc = resolvedParams.lang === "en" ? article.metaDescriptionEn || article.metaDescription : resolvedParams.lang === "ar" ? article.metaDescriptionAr || article.metaDescription : article.metaDescription;
                const coverAlt = resolvedParams.lang === "en" ? article.coverImageAltEn || article.coverImageAlt : resolvedParams.lang === "ar" ? article.coverImageAltAr || article.coverImageAlt : article.coverImageAlt;
                const category = content.ui.knowledgeBase.categories[article.category] || article.category;
                
                return (
                  <Link key={article.id} href={`/${resolvedParams.lang}/bilgi-bankasi/${article.slug}`}>
                    <PinCard title={category}>
                      <div className="flex flex-col h-full min-h-[300px] p-7">
                        <div className="mb-6 -mt-2 -mx-2 overflow-hidden rounded-xl border border-line h-40 relative">
                          <Image 
                            src={article.coverImage || "/sac-ekimi-bilgi-bankasi-gorsel.jpg"} 
                            alt={coverAlt || `${title} - Gaziantep Saç Ekimi Bilgi Bankası`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <h2 className="font-display text-2xl line-clamp-2">{title}</h2>
                        <p className="mt-3 text-sm leading-7 text-muted line-clamp-3">
                          {metaDesc || title}
                        </p>
                        <div className="mt-auto pt-6 flex items-end justify-between text-xs text-gold">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-foreground">{article.author}</span>
                            <span className="text-muted/70">
                              {new Date(article.publishedAt).toLocaleDateString(resolvedParams.lang === "en" ? "en-US" : resolvedParams.lang === "ar" ? "ar-SA" : "tr-TR", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all mb-0.5">
                            {content.ui.knowledgeBase.readAll} <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </PinCard>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-28 pt-8 border-t border-line/50 flex items-center justify-center gap-4">
                {page > 1 ? (
                  <Link 
                    href={`/${resolvedParams.lang}/bilgi-bankasi?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                    className="rounded-full border border-line bg-card px-5 py-2.5 text-sm hover:text-gold transition-colors"
                  >
                    {content.ui.knowledgeBase.prev}
                  </Link>
                ) : (
                  <span className="rounded-full border border-line/50 px-5 py-2.5 text-sm text-muted/30 cursor-not-allowed">
                    {content.ui.knowledgeBase.prev}
                  </span>
                )}
                
                <span className="text-sm text-muted">
                  {content.ui.knowledgeBase.page} {page} / {totalPages}
                </span>
                
                {page < totalPages ? (
                  <Link 
                    href={`/${resolvedParams.lang}/bilgi-bankasi?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                    className="rounded-full border border-line bg-card px-5 py-2.5 text-sm hover:text-gold transition-colors"
                  >
                    {content.ui.knowledgeBase.next}
                  </Link>
                ) : (
                  <span className="rounded-full border border-line/50 px-5 py-2.5 text-sm text-muted/30 cursor-not-allowed">
                    {content.ui.knowledgeBase.next}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </section>
      
      <CtaSection content={content} />
    </SiteShell>
  );
}
