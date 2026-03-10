// @ts-nocheck
import * as __fd_glob_16 from "../content/docs/agent-builders/components/skills.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/agent-builders/components/rules.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/agent-builders/components/mcp-servers.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/agent-builders/components/lsp-servers.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/agent-builders/components/hooks.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/agent-builders/components/agents.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/plugin-builders/specification.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/plugin-builders/marketplace.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/plugin-builders/installation.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/plugin-builders/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/agent-builders/index.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/supported-agents.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/agent-builders/components/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/plugin-builders/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/agent-builders/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "agent-builders/meta.json": __fd_glob_1, "plugin-builders/meta.json": __fd_glob_2, "agent-builders/components/meta.json": __fd_glob_3, }, {"index.mdx": __fd_glob_4, "supported-agents.mdx": __fd_glob_5, "agent-builders/index.mdx": __fd_glob_6, "plugin-builders/index.mdx": __fd_glob_7, "plugin-builders/installation.mdx": __fd_glob_8, "plugin-builders/marketplace.mdx": __fd_glob_9, "plugin-builders/specification.mdx": __fd_glob_10, "agent-builders/components/agents.mdx": __fd_glob_11, "agent-builders/components/hooks.mdx": __fd_glob_12, "agent-builders/components/lsp-servers.mdx": __fd_glob_13, "agent-builders/components/mcp-servers.mdx": __fd_glob_14, "agent-builders/components/rules.mdx": __fd_glob_15, "agent-builders/components/skills.mdx": __fd_glob_16, });