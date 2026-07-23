import {
  getLLMText,
  LLM_NAVIGATION_FOOTER,
  source,
} from "@/lib/geistdocs/source";

export const revalidate = false;

export const GET = async () => {
  const scan = source
    .getPages()
    .map((page) => getLLMText(page, { includeNavigationFooter: false }));
  const scanned = await Promise.all(scan);
  const content = [...scanned, LLM_NAVIGATION_FOOTER].join("\n\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
