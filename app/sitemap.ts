import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const url = siteUrl();
  const now = new Date();

  const staticRoutes = ["", "/tedaviler", "/surec", "/iletisim", "/bilgi-bankasi", "/halil-cetin-kimdir"].map(
    (path) => ({
      url: `${url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const treatments = content.treatments.map((t) => ({
    url: `${url}/tedaviler/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const { prisma } = await import("@/lib/db");
  const articles = await prisma.article.findMany({ select: { slug: true, updatedAt: true } });
  const articleRoutes = articles.map((a) => ({
    url: `${url}/bilgi-bankasi/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...treatments, ...articleRoutes];
}
