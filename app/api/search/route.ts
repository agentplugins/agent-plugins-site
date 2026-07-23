import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/geistdocs/source";

const normalizedTitlesByUrl = new Map(
  source
    .getPages()
    .map((page) => [page.url, page.data.title.trim().toLowerCase()])
);

export const { GET } = createFromSource(source, {
  plugins: [
    {
      name: "exact-title-first",
      afterSearch: (_database, params, _language, results) => {
        const query = params.term?.trim().toLowerCase();
        const groups = results.groups;

        // Fumadocs groups advanced-search results by page URL.
        const index =
          groups?.findIndex(
            (group) =>
              normalizedTitlesByUrl.get(String(group.values[0])) === query
          ) ?? -1;

        if (groups && index > 0) {
          groups.unshift(...groups.splice(index, 1));
        }
      },
    },
  ],
});
