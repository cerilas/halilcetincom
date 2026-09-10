import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/utils";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const locales = ["tr", "en", "ar"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteUrl();
  const now = new Date();
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const content = await getContent(locale);
    // Since middleware rewrites /tr to /, we should output the clean URLs for Turkish
    const prefix = locale === "tr" ? "" : `/${locale}`;

    const staticRoutes = ["", "/tedaviler", "/surec", "/iletisim", "/bilgi-bankasi", "/halil-cetin-kimdir"].map(
      (path) => ({
        url: `${url}${prefix}${path}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: path === "" ? 1 : 0.8,
      }),
    );

    const treatments = content.treatments.map((t) => ({
      url: `${url}${prefix}/tedaviler/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const articles = await prisma.article.findMany({ select: { slug: true, updatedAt: true } });
    const articleRoutes = articles.map((a) => ({
      url: `${url}${prefix}/bilgi-bankasi/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    sitemapEntries.push(...staticRoutes, ...treatments, ...articleRoutes);
  }

  return sitemapEntries;
}
