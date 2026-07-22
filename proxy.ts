import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { i18n } from "@/lib/geistdocs/i18n";

const { rewrite: rewriteLLM } = rewritePath(
  "/*path",
  `/${i18n.defaultLanguage}/llms.mdx/*path`,
);

const rewriteMarkdownPath = (pathname: string) =>
  pathname === "/" || pathname === "/docs"
    ? `/${i18n.defaultLanguage}/llms.mdx`
    : rewriteLLM(pathname);

const MDX_EXTENSION_PATTERN = /\.mdx?$/;
const INTERNAL_I18N_REWRITE_HEADER = "x-agent-plugins-i18n-rewrite";

const internationalizer = createI18nMiddleware(i18n);

const rewriteInternally = (
  request: NextRequest,
  destination: string | URL,
  responseHeaders?: Headers,
) => {
  const headers = new Headers(request.headers);
  const url = new URL(destination);

  headers.set(INTERNAL_I18N_REWRITE_HEADER, "1");

  // Avoid Next.js canonicalizing an internal `/en/` rewrite to public `/en`,
  // which the locale middleware correctly redirects back to `/`.
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }

  return NextResponse.rewrite(url, {
    headers: responseHeaders,
    request: { headers },
  });
};

const proxy = async (request: NextRequest, context: NextFetchEvent) => {
  const pathname = request.nextUrl.pathname;
  const isSemanticSitemap =
    pathname === "/sitemap.md" ||
    i18n.languages.some(
      (language) => pathname === `/${language}/sitemap.md`,
    );

  // `next start` runs the proxy again for an internal locale rewrite. Let that
  // rewritten request reach the localized App Router route instead of sending
  // it back through locale canonicalization.
  if (
    request.headers.get(INTERNAL_I18N_REWRITE_HEADER) === "1" &&
    i18n.languages.some(
      (language) =>
        pathname === `/${language}` || pathname.startsWith(`/${language}/`),
    )
  ) {
    return NextResponse.next();
  }

  // Handle .md/.mdx URL requests before i18n runs.
  if (
    !isSemanticSitemap &&
    (pathname === "/docs.md" ||
      pathname === "/docs.mdx" ||
      pathname.startsWith("/")) &&
    (pathname.endsWith(".md") || pathname.endsWith(".mdx"))
  ) {
    const stripped = pathname.replace(MDX_EXTENSION_PATTERN, "");
    const result = rewriteMarkdownPath(stripped);
    if (result) {
      return rewriteInternally(request, new URL(result, request.nextUrl));
    }
  }

  // Handle Accept header content negotiation.
  if (!isSemanticSitemap && isMarkdownPreferred(request)) {
    const result = rewriteMarkdownPath(pathname);
    if (result) {
      return rewriteInternally(request, new URL(result, request.nextUrl));
    }
  }

  // Fallback to i18n middleware. Mark internal rewrites so production does not
  // canonicalize their locale-prefixed target as though it were a public URL.
  const response = await internationalizer(request, context);

  if (!response) {
    return NextResponse.next();
  }

  const rewrite = response.headers.get("x-middleware-rewrite");

  if (rewrite) {
    return rewriteInternally(request, rewrite, response.headers);
  }

  return response;
};

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, canonical schemas, static assets,
  // favicon, sitemap, robots, etc.
  matcher: [
    "/((?!api|_next/static|_next/image|schemas/|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default proxy;
