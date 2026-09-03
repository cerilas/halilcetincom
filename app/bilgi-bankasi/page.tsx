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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function KnowledgeBasePage({ searchParams }: Props) {
  const content = await getContent();
  const params = await searchParams;
  
  const page = typeof params.page === "string" ? parseInt(params.page, 10) || 1 : 1;
  const q = typeof params.q === "string" ? params.q : "";
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
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Kütüphane</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          Bilgi Bankası
        </h1>
        
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-end border-b border-white/5 pb-10">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Saç ekimi, saç sağlığı ve medikal estetik hakkında bilimsel kaynaklara dayalı detaylı rehberler.
            </p>
            <div className="flex items-center gap-3 text-sm text-gold/90 bg-gold/5 w-max px-4 py-2 rounded-full border border-gold/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              Kütüphanede <strong>{absoluteTotal} özel içerik</strong> bulunuyor.
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
              {q ? `"${q}" aramasıyla eşleşen makale bulunamadı.` : "Henüz makale bulunmamaktadır."}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link key={article.id} href={`/bilgi-bankasi/${article.slug}`}>
                  <PinCard title={article.category}>
                    <div className="flex flex-col h-full min-h-[300px] p-7">
                      <div className="mb-6 -mt-2 -mx-2 overflow-hidden rounded-xl border border-line h-40 relative">
                        <Image 
                          src={article.coverImage || "/sac-ekimi-bilgi-bankasi-gorsel.jpg"} 
                          alt={`${article.title} - Gaziantep Saç Ekimi Bilgi Bankası`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <h2 className="font-display text-2xl line-clamp-2">{article.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-muted line-clamp-3">
                        {article.metaDescription || article.title}
                      </p>
                      <div className="mt-auto pt-6 flex items-end justify-between text-xs text-gold">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-foreground">{article.author}</span>
                          <span className="text-muted/70">
                            {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all mb-0.5">
                          Tümünü Oku <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </PinCard>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-28 pt-8 border-t border-line/50 flex items-center justify-center gap-4">
                {page > 1 ? (
                  <Link 
                    href={`/bilgi-bankasi?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                    className="rounded-full border border-line bg-card px-5 py-2.5 text-sm hover:text-gold transition-colors"
                  >
                    Önceki
                  </Link>
                ) : (
                  <span className="rounded-full border border-line/50 px-5 py-2.5 text-sm text-muted/30 cursor-not-allowed">
                    Önceki
                  </span>
                )}
                
                <span className="text-sm text-muted">
                  Sayfa {page} / {totalPages}
                </span>
                
                {page < totalPages ? (
                  <Link 
                    href={`/bilgi-bankasi?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                    className="rounded-full border border-line bg-card px-5 py-2.5 text-sm hover:text-gold transition-colors"
                  >
                    Sonraki
                  </Link>
                ) : (
                  <span className="rounded-full border border-line/50 px-5 py-2.5 text-sm text-muted/30 cursor-not-allowed">
                    Sonraki
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
