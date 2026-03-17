/**
 * Plugin discovery.
 *
 * Discovers plugins from:
 * 1. A marketplace.json at repo root (or .plugin/marketplace.json, .claude-plugin/marketplace.json)
 * 2. Individual plugin directories with .plugin/plugin.json manifests
 * 3. Standalone plugins (single plugin at repo root)
 */

import { join } from "path";
import { readFile, readdir, stat } from "fs/promises";
import { existsSync } from "fs";


export interface DiscoveredPlugin {
  /** Plugin name from manifest or marketplace entry */
  name: string;
  /** Semantic version */
  version: string | undefined;
  /** Description */
  description: string | undefined;
  /** Absolute path to the plugin root directory */
  path: string;
  /** Which marketplace this came from (if any) */
  marketplace: string | undefined;
  /** Discovered skills */
  skills: { name: string; description: string }[];
  /** Discovered commands */
  commands: { name: string; description: string }[];
  /** Discovered agents */
  agents: { name: string; description: string }[];
  /** Discovered rules */
  rules: { name: string; description: string }[];
  /** Has hooks configuration */
  hasHooks: boolean;
  /** Has MCP server configuration */
  hasMcp: boolean;
  /** Has LSP server configuration */
  hasLsp: boolean;
  /** The raw manifest data, if present */
  manifest: Record<string, unknown> | null;
  /**
   * Explicit skill paths from marketplace entry.
   * When present, only these skills should be included (not full skills/ scan).
   */
  explicitSkillPaths: string[] | undefined;
  /** Raw marketplace entry data (for passthrough to installer) */
  marketplaceEntry: Record<string, unknown> | undefined;
}

/** A plugin that references a remote source (another repo) and can't be resolved locally */
export interface RemotePlugin {
  name: string;
  description: string | undefined;
  source: Record<string, unknown>;
}

export interface DiscoverResult {
  plugins: DiscoveredPlugin[];
  remotePlugins: RemotePlugin[];
  /** Local source paths referenced in marketplace.json but not found on disk */
  missingPaths: string[];
}

interface MarketplaceIndex {
  name: string;
  plugins: MarketplaceEntry[];
  metadata?: { pluginRoot?: string };
}

interface MarketplaceEntry {
  name: string;
  description: string;
  version?: string;
  /** Local relative path (string) or remote reference (object with url, etc.) */
  source: string | Record<string, unknown>;
  skills?: string[];
  [key: string]: unknown;
}

/**
 * Discover all plugins in a repository/directory.
 */
export async function discover(repoPath: string): Promise<DiscoverResult> {
  // 1. Check for marketplace.json
  const marketplacePaths = [
    join(repoPath, "marketplace.json"),
    join(repoPath, ".plugin", "marketplace.json"),
    join(repoPath, ".claude-plugin", "marketplace.json"),
    join(repoPath, ".cursor-plugin", "marketplace.json"),
  ];

  for (const mp of marketplacePaths) {
    if (await fileExists(mp)) {
      const data = await readJson(mp);
      if (data && typeof data === "object" && "plugins" in data && Array.isArray(data.plugins)) {
        return discoverFromMarketplace(repoPath, data as unknown as MarketplaceIndex);
      }
    }
  }

  // 2. Check if repo root itself is a plugin
  if (await isPluginDir(repoPath)) {
    const plugin = await inspectPlugin(repoPath);
    return { plugins: plugin ? [plugin] : [], remotePlugins: [], missingPaths: [] };
  }

  // 3. Scan directories for plugins (up to 2 levels deep)
  const plugins: DiscoveredPlugin[] = [];
  await scanForPlugins(repoPath, plugins, 2);

  return { plugins, remotePlugins: [], missingPaths: [] };
}

async function scanForPlugins(
  dirPath: string,
  results: DiscoveredPlugin[],
  depth: number,
): Promise<void> {
  if (depth <= 0) return;
  const entries = await readDirSafe(dirPath);
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    const childPath = join(dirPath, entry.name);
    if (await isPluginDir(childPath)) {
      const plugin = await inspectPlugin(childPath);
      if (plugin) results.push(plugin);
    } else {
      await scanForPlugins(childPath, results, depth - 1);
    }
  }
}

async function discoverFromMarketplace(
  repoPath: string,
  marketplace: MarketplaceIndex,
): Promise<DiscoverResult> {
  const plugins: DiscoveredPlugin[] = [];
  const remotePlugins: RemotePlugin[] = [];
  const missingPaths: string[] = [];
  const root = marketplace.metadata?.pluginRoot ?? ".";

  for (const entry of marketplace.plugins) {
    // Collect entries with non-string source (remote references to other repos)
    if (typeof entry.source !== "string") {
      remotePlugins.push({
        name: entry.name,
        description: entry.description || undefined,
        source: entry.source as Record<string, unknown>,
      });
      continue;
    }

    const sourcePath = join(repoPath, root, entry.source.replace(/^\.\//, ""));

    if (!(await dirExists(sourcePath))) {
      missingPaths.push(entry.source);
      continue;
    }

    // Discover skills — use explicit skill paths from marketplace entry if provided
    let skills: { name: string; description: string }[];
    if (entry.skills && Array.isArray(entry.skills)) {
      // Marketplace entry specifies exact skill paths (e.g. anthropics/skills repo)
      skills = [];
      for (const skillPath of entry.skills) {
        const resolvedPath = join(repoPath, root, skillPath.replace(/^\.\//, ""));
        const skillMd = join(resolvedPath, "SKILL.md");
        if (await fileExists(skillMd)) {
          const content = await readFile(skillMd, "utf-8");
          const fm = parseFrontmatter(content);
          skills.push({
            name: (fm.name as string) ?? dirName(resolvedPath),
            description: (fm.description as string) ?? "",
          });
        }
      }
    } else {
      skills = await discoverSkills(sourcePath);
    }

    // Try to load plugin manifest from the source dir
    let manifest: Record<string, unknown> | null = null;
    for (const manifestDir of [".plugin", ".claude-plugin", ".cursor-plugin"]) {
      const manifestPath = join(sourcePath, manifestDir, "plugin.json");
      if (await fileExists(manifestPath)) {
        manifest = await readJson(manifestPath);
        break;
      }
    }

    const [commands, agents, rules, hasHooks, hasMcp, hasLsp] = await Promise.all([
      discoverCommands(sourcePath),
      discoverAgents(sourcePath),
      discoverRules(sourcePath),
      fileExists(join(sourcePath, "hooks", "hooks.json")),
      fileExists(join(sourcePath, ".mcp.json")),
      fileExists(join(sourcePath, ".lsp.json")),
    ]);

    // Marketplace entry name takes priority, then manifest, then dirname
    const name = entry.name || (manifest?.name as string) || dirName(sourcePath);

    plugins.push({
      name,
      version: entry.version || (manifest?.version as string) || undefined,
      description: entry.description || (manifest?.description as string) || undefined,
      path: sourcePath,
      marketplace: marketplace.name,
      skills,
      commands,
      agents,
      rules,
      hasHooks,
      hasMcp,
      hasLsp,
      manifest,
      explicitSkillPaths: entry.skills,
      marketplaceEntry: entry as Record<string, unknown>,
    });
  }

  return { plugins, remotePlugins, missingPaths };
}

/**
 * Check if a directory looks like a plugin.
 */
async function isPluginDir(dirPath: string): Promise<boolean> {
  const checks = [
    join(dirPath, ".plugin", "plugin.json"),
    join(dirPath, ".claude-plugin", "plugin.json"),
    join(dirPath, ".cursor-plugin", "plugin.json"),
    join(dirPath, "skills"),
    join(dirPath, "commands"),
    join(dirPath, "agents"),
    join(dirPath, "SKILL.md"),
  ];

  for (const check of checks) {
    if (await pathExists(check)) return true;
  }
  return false;
}

/**
 * Inspect a plugin directory, parsing manifest and discovering components.
 */
async function inspectPlugin(pluginPath: string): Promise<DiscoveredPlugin | null> {
  let manifest: Record<string, unknown> | null = null;
  for (const manifestDir of [".plugin", ".claude-plugin", ".cursor-plugin"]) {
    const manifestPath = join(pluginPath, manifestDir, "plugin.json");
    if (await fileExists(manifestPath)) {
      manifest = await readJson(manifestPath);
      break;
    }
  }

  const name = (manifest?.name as string) ?? dirName(pluginPath);

  const [skills, commands, agents, rules, hasHooks, hasMcp, hasLsp] = await Promise.all([
    discoverSkills(pluginPath),
    discoverCommands(pluginPath),
    discoverAgents(pluginPath),
    discoverRules(pluginPath),
    fileExists(join(pluginPath, "hooks", "hooks.json")),
    fileExists(join(pluginPath, ".mcp.json")),
    fileExists(join(pluginPath, ".lsp.json")),
  ]);

  return {
    name,
    version: manifest?.version as string | undefined,
    description: manifest?.description as string | undefined,
    path: pluginPath,
    marketplace: undefined,
    skills,
    commands,
    agents,
    rules,
    hasHooks,
    hasMcp,
    hasLsp,
    manifest,
    explicitSkillPaths: undefined,
    marketplaceEntry: undefined,
  };
}

// --- Component discovery ---

async function discoverSkills(pluginPath: string): Promise<{ name: string; description: string }[]> {
  const skillsDir = join(pluginPath, "skills");
  const entries = await readDirSafe(skillsDir);
  const skills: { name: string; description: string }[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillMd = join(skillsDir, entry.name, "SKILL.md");
    if (await fileExists(skillMd)) {
      const content = await readFile(skillMd, "utf-8");
      const fm = parseFrontmatter(content);
      skills.push({
        name: (fm.name as string) ?? entry.name,
        description: (fm.description as string) ?? "",
      });
    }
  }

  // Root SKILL.md fallback
  if (skills.length === 0) {
    const rootSkill = join(pluginPath, "SKILL.md");
    if (await fileExists(rootSkill)) {
      const content = await readFile(rootSkill, "utf-8");
      const fm = parseFrontmatter(content);
      skills.push({
        name: (fm.name as string) ?? dirName(pluginPath),
        description: (fm.description as string) ?? "",
      });
    }
  }

  return skills;
}

async function discoverCommands(pluginPath: string): Promise<{ name: string; description: string }[]> {
  const commandsDir = join(pluginPath, "commands");
  const entries = await readDirSafe(commandsDir);
  const commands: { name: string; description: string }[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.match(/\.(md|mdc|markdown)$/)) continue;
    const filePath = join(commandsDir, entry.name);
    const content = await readFile(filePath, "utf-8");
    const fm = parseFrontmatter(content);
    commands.push({
      name: entry.name.replace(/\.(md|mdc|markdown)$/, ""),
      description: (fm.description as string) ?? "",
    });
  }

  return commands;
}

async function discoverAgents(pluginPath: string): Promise<{ name: string; description: string }[]> {
  const agentsDir = join(pluginPath, "agents");
  const entries = await readDirSafe(agentsDir);
  const agents: { name: string; description: string }[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.match(/\.(md|mdc|markdown)$/)) continue;
    const filePath = join(agentsDir, entry.name);
    const content = await readFile(filePath, "utf-8");
    const fm = parseFrontmatter(content);
    if (fm.name && fm.description) {
      agents.push({
        name: fm.name as string,
        description: fm.description as string,
      });
    }
  }

  return agents;
}

async function discoverRules(pluginPath: string): Promise<{ name: string; description: string }[]> {
  const rulesDir = join(pluginPath, "rules");
  const entries = await readDirSafe(rulesDir);
  const rules: { name: string; description: string }[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.match(/\.(mdc|md|markdown)$/)) continue;
    const filePath = join(rulesDir, entry.name);
    const content = await readFile(filePath, "utf-8");
    const fm = parseFrontmatter(content);
    rules.push({
      name: entry.name.replace(/\.(mdc|md|markdown)$/, ""),
      description: (fm.description as string) ?? "",
    });
  }

  return rules;
}

// --- Utilities ---

function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match?.[1]) return {};
  const result: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (kv) {
      let val: string = kv[2]!.trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (val === "true") {
        result[kv[1]!] = true;
      } else if (val === "false") {
        result[kv[1]!] = false;
      } else {
        result[kv[1]!] = val;
      }
    }
  }
  return result;
}

function dirName(p: string): string {
  const parts = p.replace(/\/$/, "").split("/");
  return parts[parts.length - 1] ?? "unknown";
}

async function fileExists(path: string): Promise<boolean> {
  try {
    const s = await stat(path);
    return s.isFile();
  } catch {
    return false;
  }
}

async function dirExists(dirPath: string): Promise<boolean> {
  try {
    const s = await stat(dirPath);
    return s.isDirectory();
  } catch {
    return false;
  }
}

async function pathExists(p: string): Promise<boolean> {
  return existsSync(p);
}

async function readJson(path: string): Promise<Record<string, unknown> | null> {
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function readDirSafe(dirPath: string) {
  try {
    return await readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
}
