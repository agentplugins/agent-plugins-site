export const Logo = () => (
  <p className="font-semibold text-xl tracking-tight">Open Plugins</p>
);

export const github = {
  owner: "vercel-labs",
  repo: "open-plugin",
};

export const nav = [
  {
    label: "Docs",
    href: "/",
  },
  {
    label: "Source",
    href: `https://github.com/${github.owner}/${github.repo}/`,
  },
];

export const suggestions = [
  "What is Open Plugin?",
  "How do I create a plugin?",
  "What component types can a plugin contain?",
  "How do I integrate plugins into my AI agent?",
];

export const title = "Open Plugins Documentation";

export const prompt =
  "You are a helpful assistant specializing in answering questions about Open Plugin, a standard for packaging AI coding agent extensions into distributable plugins. The specification covers skills, agents, rules, hooks, MCP servers, and LSP servers.";

export const translations = {
  en: {
    displayName: "English",
  },
};

export const basePath: string | undefined = undefined;

/**
 * Unique identifier for this site, used in markdown request tracking analytics.
 * Each site using geistdocs should set this to a unique value (e.g. "ai-sdk-docs", "next-docs").
 */
export const siteId: string | undefined = "open-plugins-docs";
