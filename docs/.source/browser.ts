// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "supported-agents.mdx": () => import("../content/docs/supported-agents.mdx?collection=docs"), "agent-builders/index.mdx": () => import("../content/docs/agent-builders/index.mdx?collection=docs"), "plugin-builders/index.mdx": () => import("../content/docs/plugin-builders/index.mdx?collection=docs"), "plugin-builders/installation.mdx": () => import("../content/docs/plugin-builders/installation.mdx?collection=docs"), "plugin-builders/marketplace.mdx": () => import("../content/docs/plugin-builders/marketplace.mdx?collection=docs"), "plugin-builders/specification.mdx": () => import("../content/docs/plugin-builders/specification.mdx?collection=docs"), "agent-builders/components/agents.mdx": () => import("../content/docs/agent-builders/components/agents.mdx?collection=docs"), "agent-builders/components/hooks.mdx": () => import("../content/docs/agent-builders/components/hooks.mdx?collection=docs"), "agent-builders/components/lsp-servers.mdx": () => import("../content/docs/agent-builders/components/lsp-servers.mdx?collection=docs"), "agent-builders/components/mcp-servers.mdx": () => import("../content/docs/agent-builders/components/mcp-servers.mdx?collection=docs"), "agent-builders/components/rules.mdx": () => import("../content/docs/agent-builders/components/rules.mdx?collection=docs"), "agent-builders/components/skills.mdx": () => import("../content/docs/agent-builders/components/skills.mdx?collection=docs"), }),
};
export default browserCollections;