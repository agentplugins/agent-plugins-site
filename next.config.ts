import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const redirectHosts = [
  "open-plugins.com",
  "www.open-plugins.com",
  "agent-plugins.io",
  "www.agent-plugins.io",
  "www.agent-plugins.org",
] as const;

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// `has.value` is a regular expression. Group the complete alternation because
// Next.js anchors the value when it compiles the host condition.
const redirectHostPattern = `(?:${redirectHosts.map(escapeRegex).join("|")})`;

const legacyPageMapping = [
  ["/agent-builders", "/client-implementers"],
  [
    "/agent-builders/components/mcp-servers",
    "/client-implementers/mcp-runtime",
  ],
  ["/agent-builders/components/skills", "/plugin-authors/skills"],
  ["/plugin-builders", "/plugin-authors"],
  ["/plugin-builders/installation", "/plugin-authors"],
  ["/plugin-builders/specification", "/specification"],
  ["/supported-agents", "/client-implementers"],
] as const;

const legacyPageRedirects = legacyPageMapping.flatMap(([source, destination]) => [
  { source, destination, permanent: true as const },
  {
    source: `${source}.:extension(md|mdx)`,
    destination: `${destination}.:extension`,
    permanent: true as const,
  },
]);

const config: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: redirectHostPattern }],
        destination: "https://agent-plugins.org/:path*",
        permanent: true,
      },
      ...legacyPageRedirects,
      {
        source:
          "/agent-builders/components/:component(agents|hooks|lsp-servers|rules)",
        destination: "/specification#why-only-agent-skills-and-mcp-in-v1",
        permanent: false,
      },
      {
        source:
          "/agent-builders/components/:component(agents|hooks|lsp-servers|rules).:extension(md|mdx)",
        destination:
          "/specification.:extension#why-only-agent-skills-and-mcp-in-v1",
        permanent: false,
      },
      {
        source: "/plugin-builders/marketplace",
        destination: "/",
        permanent: true,
      },
      {
        source: "/plugin-builders/marketplace.:extension(md|mdx)",
        destination: "/docs.:extension",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
