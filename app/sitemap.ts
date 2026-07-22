import type { MetadataRoute } from "next";

import { siteUrl } from "@/geistdocs";
import { source } from "@/lib/geistdocs/source";

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string => new URL(path, siteUrl).toString();

  return source.getPages().map((page) => ({
    changeFrequency: page.url === "/" ? "monthly" : "weekly",
    lastModified: page.data.lastModified
      ? new Date(page.data.lastModified)
      : undefined,
    priority: page.url === "/" ? 1 : 0.5,
    url: url(page.url),
  }));
}
