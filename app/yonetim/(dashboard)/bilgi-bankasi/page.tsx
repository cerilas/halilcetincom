import { prisma } from "@/lib/db";
import { CmsView } from "./cms-view";

export const dynamic = "force-dynamic";

export default async function BilgiBankasiPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="flex flex-col h-full h-[calc(100vh-80px)]">
      <div className="mb-8">
        <h1 className="font-display text-3xl">Bilgi Bankası (CMS)</h1>
        <p className="text-muted mt-2">
          Buradan sitedeki bilgi bankası makalelerini ekleyebilir, silebilir ve düzenleyebilirsiniz.
        </p>
      </div>
      
      <CmsView initialArticles={articles} />
    </div>
  );
}
