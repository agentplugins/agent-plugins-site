import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as yaml from "yaml";
import { parseManifestObject } from "./manifest.js";
import type {
  PluginManifest,
  PluginInfo,
  DiscoveredSkill,
  DiscoveredCommand,
  DiscoveredAgent,
  DiscoveredRule,
  HookRule,
  MCPServerEntry,
  LSPServerEntry,
  SkillMetadata,
  AgentMetadata,
  CommandMetadata,
  RuleMetadata,
  HookConfig,
  MCPConfig,
  LSPConfig,
} from "./types.js";

/**
 * Parse a plugin manifest from a file path.
 * Returns null if the manifest does not exist.
 */
export async function parseManifest(pluginPath: string): Promise<PluginManifest | null> {
  const manifestPath = path.join(pluginPath, ".plugin", "plugin.json");
  try {
    const content = await fs.readFile(manifestPath, "utf-8");
    const data = JSON.parse(content);
    return parseManifestObject(data);
  } catch (err: unknown) {
    if (isNodeError(err) && err.code === "ENOENT") return null;
    throw err;
  }
}

/**
 * Inspect a plugin directory: parse manifest and discover all components.
 */
export async function inspect(pluginPath: string): Promise<PluginInfo> {
  const resolvedPath = path.resolve(pluginPath);
  const manifest = await parseManifest(resolvedPath);
  const name = manifest?.name ?? path.basename(resolvedPath);

  const [skills, commands, agents, rules, hooks, mcpServers, lspServers] = await Promise.all([
    discoverSkills(resolvedPath),
    discoverCommands(resolvedPath),
    discoverAgents(resolvedPath),
    discoverRules(resolvedPath),
    discoverHooks(resolvedPath),
    discoverMCPServers(resolvedPath),
    discoverLSPServers(resolvedPath),
  ]);

  return {
    name,
    path: resolvedPath,
    manifest,
    skills,
    commands,
    agents,
    rules,
    hooks,
    mcpServers,
    lspServers,
  };
}

/** Parse YAML frontmatter from a markdown file. */
function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match?.[1]) return {};
  return yaml.parse(match[1]) ?? {};
}

/** Check if a filename matches markdown-like extensions. */
function isMarkdownFile(name: string): boolean {
  return /\.(md|mdc|markdown)$/.test(name);
}

/** Discover skills in the skills/ directory. */
async function discoverSkills(pluginPath: string): Promise<DiscoveredSkill[]> {
  const skillsDir = path.join(pluginPath, "skills");
  const entries = await readDirSafe(skillsDir);
  const skills: DiscoveredSkill[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillMdPath = path.join(skillsDir, entry.name, "SKILL.md");
    try {
      const content = await fs.readFile(skillMdPath, "utf-8");
      const fm = parseFrontmatter(content) as unknown as SkillMetadata;
      skills.push({
        name: fm.name ?? entry.name,
        description: fm.description ?? "",
        path: skillMdPath,
      });
    } catch {
      // No SKILL.md, skip
    }
  }

  // Root SKILL.md fallback: if no skills/ dir and no skills found
  if (skills.length === 0) {
    const rootSkillPath = path.join(pluginPath, "SKILL.md");
    try {
      const content = await fs.readFile(rootSkillPath, "utf-8");
      const fm = parseFrontmatter(content) as unknown as SkillMetadata;
      skills.push({
        name: fm.name ?? path.basename(pluginPath),
        description: fm.description ?? "",
        path: rootSkillPath,
      });
    } catch {
      // No root SKILL.md either
    }
  }

  return skills;
}

/** Discover commands in the commands/ directory. */
async function discoverCommands(pluginPath: string): Promise<DiscoveredCommand[]> {
  const commandsDir = path.join(pluginPath, "commands");
  const entries = await readDirSafe(commandsDir);
  const commands: DiscoveredCommand[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;
    const filePath = path.join(commandsDir, entry.name);
    const content = await fs.readFile(filePath, "utf-8");
    const fm = parseFrontmatter(content) as CommandMetadata;
    commands.push({
      name: entry.name.replace(/\.(md|mdc|markdown)$/, ""),
      description: fm.description ?? "",
      path: filePath,
    });
  }
  return commands;
}

/** Discover agents in the agents/ directory. */
async function discoverAgents(pluginPath: string): Promise<DiscoveredAgent[]> {
  const agentsDir = path.join(pluginPath, "agents");
  const entries = await readDirSafe(agentsDir);
  const agents: DiscoveredAgent[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;
    const filePath = path.join(agentsDir, entry.name);
    const content = await fs.readFile(filePath, "utf-8");
    const fm = parseFrontmatter(content) as unknown as AgentMetadata;
    if (fm.name && fm.description) {
      agents.push({
        name: fm.name,
        description: fm.description,
        path: filePath,
      });
    }
  }
  return agents;
}

/** Discover rules in the rules/ directory. */
async function discoverRules(pluginPath: string): Promise<DiscoveredRule[]> {
  const rulesDir = path.join(pluginPath, "rules");
  const entries = await readDirSafe(rulesDir);
  const rules: DiscoveredRule[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !/\.(mdc|md|markdown)$/.test(entry.name)) continue;
    const filePath = path.join(rulesDir, entry.name);
    const content = await fs.readFile(filePath, "utf-8");
    const fm = parseFrontmatter(content) as unknown as RuleMetadata;
    rules.push({
      name: entry.name.replace(/\.(mdc|md|markdown)$/, ""),
      description: fm.description ?? "",
      alwaysApply: fm.alwaysApply ?? false,
      globs: fm.globs,
      path: filePath,
    });
  }
  return rules;
}

/** Discover hooks from hooks/hooks.json. */
async function discoverHooks(pluginPath: string): Promise<HookRule[]> {
  const hooksFile = path.join(pluginPath, "hooks", "hooks.json");
  try {
    const content = await fs.readFile(hooksFile, "utf-8");
    const config = JSON.parse(content) as HookConfig;
    return Object.values(config.hooks ?? {}).flat();
  } catch {
    return [];
  }
}

/** Discover MCP servers from .mcp.json. */
async function discoverMCPServers(pluginPath: string): Promise<Record<string, MCPServerEntry>> {
  const mcpFile = path.join(pluginPath, ".mcp.json");
  try {
    const content = await fs.readFile(mcpFile, "utf-8");
    const config = JSON.parse(content) as MCPConfig;
    return config.mcpServers ?? {};
  } catch {
    return {};
  }
}

/** Discover LSP servers from .lsp.json. */
async function discoverLSPServers(pluginPath: string): Promise<Record<string, LSPServerEntry>> {
  const lspFile = path.join(pluginPath, ".lsp.json");
  try {
    const content = await fs.readFile(lspFile, "utf-8");
    return JSON.parse(content) as LSPConfig;
  } catch {
    return {};
  }
}

/** Safely read a directory, returning empty array if it doesn't exist. */
async function readDirSafe(dirPath: string) {
  try {
    return await fs.readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

function isNodeError(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && "code" in err;
}
