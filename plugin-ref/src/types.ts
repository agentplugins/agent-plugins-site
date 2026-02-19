/**
 * Open Plugin type definitions.
 *
 * These types represent the structures defined in the Open Plugin specification.
 */

/** Plugin manifest (.plugin/plugin.json) */
export interface PluginManifest {
  name: string;
  version?: string;
  description?: string;
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  homepage?: string;
  repository?: string;
  license?: string;
  logo?: string;
  keywords?: string[];
  commands?: string | string[];
  agents?: string | string[];
  skills?: string | string[];
  rules?: string | string[];
  hooks?: string | string[] | HookConfig;
  mcpServers?: string | string[] | MCPConfig;
  lspServers?: string | string[] | LSPConfig;
  outputStyles?: string | string[];
}

/** Hook configuration (hooks/hooks.json) */
export interface HookConfig {
  hooks: Record<string, HookRule[]>;
}

/** A single hook rule that matches events and dispatches actions */
export interface HookRule {
  matcher?: string;
  hooks: HookAction[];
}

/** A hook action to execute when a rule matches */
export type HookAction = CommandHookAction | PromptHookAction | AgentHookAction;

export interface CommandHookAction {
  type: "command";
  command: string;
}

export interface PromptHookAction {
  type: "prompt";
  prompt: string;
}

export interface AgentHookAction {
  type: "agent";
  prompt: string;
}

/** MCP server configuration (.mcp.json) */
export interface MCPConfig {
  mcpServers: Record<string, MCPServerEntry>;
}

export interface MCPServerEntry {
  command: string;
  args?: string[];
  env?: Record<string, string>;
  cwd?: string;
}

/** LSP server configuration (.lsp.json) */
export type LSPConfig = Record<string, LSPServerEntry>;

export interface LSPServerEntry {
  command: string;
  extensionToLanguage: Record<string, string>;
  args?: string[];
  transport?: "stdio" | "socket";
  env?: Record<string, string>;
  initializationOptions?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  workspaceFolder?: string;
  startupTimeout?: number;
  shutdownTimeout?: number;
  restartOnCrash?: boolean;
  maxRestarts?: number;
}

/** Skill metadata (from SKILL.md frontmatter) */
export interface SkillMetadata {
  name: string;
  description: string;
  license?: string;
  compatibility?: string;
  metadata?: Record<string, string>;
  "allowed-tools"?: string;
}

/** Agent metadata (from agent .md frontmatter) */
export interface AgentMetadata {
  name: string;
  description: string;
}

/** Command metadata (from command .md frontmatter) */
export interface CommandMetadata {
  description?: string;
  "disable-model-invocation"?: boolean;
}

/** Rule metadata (from rule .mdc frontmatter) */
export interface RuleMetadata {
  description: string;
  alwaysApply?: boolean;
  globs?: string | string[];
}

/** Result of inspecting a plugin directory */
export interface PluginInfo {
  name: string;
  path: string;
  manifest: PluginManifest | null;
  skills: DiscoveredSkill[];
  commands: DiscoveredCommand[];
  agents: DiscoveredAgent[];
  rules: DiscoveredRule[];
  hooks: HookRule[];
  mcpServers: Record<string, MCPServerEntry>;
  lspServers: Record<string, LSPServerEntry>;
}

export interface DiscoveredSkill {
  name: string;
  description: string;
  path: string;
}

export interface DiscoveredCommand {
  name: string;
  description: string;
  path: string;
}

export interface DiscoveredAgent {
  name: string;
  description: string;
  path: string;
}

export interface DiscoveredRule {
  name: string;
  description: string;
  alwaysApply: boolean;
  globs?: string | string[];
  path: string;
}

/** Validation problem */
export interface ValidationProblem {
  level: "error" | "warning";
  message: string;
  path?: string;
}

/** Marketplace index (marketplace.json) */
export interface MarketplaceIndex {
  name: string;
  owner?: {
    name?: string;
    email?: string;
  };
  metadata?: {
    description?: string;
    version?: string;
    pluginRoot?: string;
  };
  plugins: MarketplaceEntry[];
}

export interface MarketplaceEntry {
  name: string;
  description: string;
  version?: string;
  source: string;
  logo?: string;
  category?: string;
  tags?: string[];
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  homepage?: string;
  repository?: string;
  license?: string;
  keywords?: string[];
}
