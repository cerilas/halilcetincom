import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const url = siteUrl();
  const now = new Date();

  const staticRoutes = ["", "/tedaviler", "/surec", "/sonuclar", "/hakkimizda", "/iletisim"].map(
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

  return [...staticRoutes, ...treatments];
}
