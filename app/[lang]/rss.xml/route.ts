import { Feed } from "feed";
import type { NextRequest } from "next/server";
import { siteUrl, title } from "@/geistdocs";
import { source } from "@/lib/geistdocs/source";

export const revalidate = false;

export const GET = async (
  _req: NextRequest,
  { params }: RouteContext<"/[lang]/rss.xml">
) => {
  const { lang } = await params;
  const feed = new Feed({
    title,
    id: siteUrl,
    link: siteUrl,
    language: lang,
    copyright: `Agent Plugins documentation contributors, ${new Date().getFullYear()}. CC BY 4.0.`,
  });

  for (const page of source.getPages(lang)) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: new URL(page.url, siteUrl).toString(),
      date: new Date(page.data.lastModified ?? new Date()),
      author: [
        {
          name: "Agent Plugins",
        },
      ],
    });
  }

  const rss = feed.rss2();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
};
