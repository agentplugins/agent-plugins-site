import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/geistdocs/source";

const search = createFromSource(source);
type SearchResult = Awaited<ReturnType<typeof search.search>>[number];

const MARK_TAG_PATTERN = /<\/?mark>/g;

const normalize = (value: string) =>
  value.replace(MARK_TAG_PATTERN, "").trim().toLocaleLowerCase();

const promoteExactTitle = (results: SearchResult[], query: string) => {
  const start = results.findIndex(
    (result) =>
      result.type === "page" && normalize(result.content) === normalize(query)
  );

  if (start <= 0) {
    return results;
  }

  const nextPage = results.findIndex(
    (result, index) => index > start && result.type === "page"
  );
  const end = nextPage === -1 ? results.length : nextPage;

  return [
    ...results.slice(start, end),
    ...results.slice(0, start),
    ...results.slice(end),
  ];
};

export const GET = async (request: Request) => {
  const response = await search.GET(request);
  const query = new URL(request.url).searchParams.get("query");

  if (!(response.ok && query)) {
    return response;
  }

  const results = (await response.json()) as SearchResult[];

  return Response.json(promoteExactTitle(results, query), {
    headers: response.headers,
    status: response.status,
  });
};
