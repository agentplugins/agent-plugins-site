import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";

const { rewrite: rewriteLLM } = rewritePath("/*path", "/llms.mdx/*path");

const rewriteMarkdownPath = (pathname: string) =>
  pathname === "/" || pathname === "/docs"
    ? "/llms.mdx"
    : rewriteLLM(pathname);

const MDX_EXTENSION_PATTERN = /\.mdx?$/;

const rewriteInternally = (request: NextRequest, destination: string) =>
  NextResponse.rewrite(new URL(destination, request.nextUrl));

const proxy = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const isSemanticSitemap = pathname === "/sitemap.md";

  if (!isSemanticSitemap && MDX_EXTENSION_PATTERN.test(pathname)) {
    const stripped = pathname.replace(MDX_EXTENSION_PATTERN, "");
    const result = rewriteMarkdownPath(stripped);
    if (result) {
      return rewriteInternally(request, result);
    }
  }

  if (!isSemanticSitemap && isMarkdownPreferred(request)) {
    const result = rewriteMarkdownPath(pathname);
    if (result) {
      return rewriteInternally(request, result);
    }
  }

  return NextResponse.next();
};

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, canonical schemas, static assets,
  // favicon, sitemap, robots, etc.
  matcher: [
    "/((?!api|_next/static|_next/image|schemas/|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default proxy;
