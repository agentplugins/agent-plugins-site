/**
 * Plugin installation logic.
 *
 * For Claude Code: prepares a local marketplace directory that Claude Code
 * understands, then shells out to `claude plugin marketplace add` + `claude plugin install`.
 *
 * For Cursor: also installs via the Claude Code CLI. Cursor discovers "Imported"
 * plugins by reading from the Claude Code plugin cache (~/.claude/plugins/cache/),
 * so both targets use the same underlying installation mechanism.
 */

import { join, relative } from "path";
import { mkdir, cp, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import { homedir } from "os";
import type { DiscoveredPlugin } from "./discover.js";
import type { Target } from "./targets.js";
import { c, step, stepDone, stepError, barLine, barEmpty } from "./ui.js";

/**
 * Map from target id to the underlying installer key.
 * Targets that share the same installer (e.g. claude-code and cursor both use
 * the Claude Code CLI) map to the same key so we can deduplicate.
 */
function installerKey(targetId: string): string {
  switch (targetId) {
    case "claude-code":
    case "cursor":
      return "claude-code";
    default:
      return targetId;
  }
}

/** Track which installers have already run to avoid duplicate work. */
const completedInstallers = new Set<string>();

/**
 * Install discovered plugins into a target tool.
 *
 * When multiple targets share the same underlying installer (e.g. claude-code
 * and cursor both install via the Claude Code CLI), the installation is only
 * performed once.
 */
export async function installPlugins(
  plugins: DiscoveredPlugin[],
  target: Target,
  scope: string,
  repoPath: string,
  source: string,
): Promise<void> {
  const key = installerKey(target.id);

  if (completedInstallers.has(key)) {
    return;
  }

  switch (key) {
    case "claude-code":
      // Both Claude Code and Cursor use the Claude Code plugin system.
      // Cursor discovers "Imported" plugins by reading from the Claude Code
      // plugin cache (~/.claude/plugins/cache/), so both targets install
      // through the Claude Code CLI.
      await installToClaudeCode(plugins, scope, repoPath, source);
      break;
    default:
      throw new Error(`Unsupported target: ${target.id}`);
  }

  completedInstallers.add(key);
}

// ---------------------------------------------------------------------------
// Claude Code installer
// ---------------------------------------------------------------------------
//
// Claude Code requires:
// 1. A directory with .claude-plugin/marketplace.json at the root
// 2. Each plugin directory has .claude-plugin/plugin.json (not .plugin/plugin.json)
// 3. Hook/MCP/LSP configs use ${CLAUDE_PLUGIN_ROOT} (not ${PLUGIN_ROOT})
//
// So we:
// 1. Prepare the cloned repo to match Claude Code's expected structure
// 2. `claude plugin marketplace add <local-path>`
// 3. `claude plugin install <plugin>@<marketplace> --scope <scope>`

async function installToClaudeCode(
  plugins: DiscoveredPlugin[],
  scope: string,
  repoPath: string,
  source: string,
): Promise<void> {
  const marketplaceName = plugins[0]?.marketplace ?? deriveMarketplaceName(source);

  // 1. Prepare the repo directory for Claude Code
  step("Preparing plugins for Claude Code...");
  barEmpty();
  await prepareForClaudeCode(plugins, repoPath, marketplaceName);

  // 2. Add the marketplace
  // For official Anthropic marketplaces, pass the GitHub URL directly so the
  // claude CLI recognises the source as coming from the 'anthropics' org.
  // Otherwise it rejects the reserved marketplace name.
  const marketplaceSource = isAnthropicSource(source) ? normalizeGitUrl(source) : repoPath;

  const claudePath = findClaude();
  step("Adding marketplace");
  barLine(c.dim(`Binary: ${claudePath}`));
  try {
    const version = execSync(`${claudePath} --version`, { encoding: "utf-8", stdio: "pipe" }).trim();
    barLine(c.dim(`Version: ${version}`));
  } catch {
    barLine(c.dim(`Warning: could not get claude version`));
  }

  try {
    const result = execSync(`${claudePath} plugin marketplace add ${marketplaceSource}`, {
      encoding: "utf-8",
      stdio: "pipe",
    });
    if (result.trim()) barLine(c.dim(result.trim()));
    stepDone("Marketplace added");
  } catch (err: any) {
    const stderr = err.stderr?.toString().trim() ?? "";
    const stdout = err.stdout?.toString().trim() ?? "";
    if (stderr.includes("already") || stdout.includes("already")) {
      stepDone(`Marketplace ${c.dim("'"+marketplaceName+"'")} already on disk`);
    } else {
      stepError("Failed to add marketplace.");
      barLine(c.dim(`Command: ${claudePath} plugin marketplace add ${marketplaceSource}`));
      if (stdout) barLine(c.dim(`stdout: ${stdout}`));
      if (stderr) barLine(c.dim(`stderr: ${stderr}`));
      barLine(c.dim(`exit code: ${err.status}`));
      process.exit(1);
    }
  }

  barEmpty();

  // 3. Install each plugin
  for (const plugin of plugins) {
    const pluginRef = `${plugin.name}@${marketplaceName}`;
    step(`Installing ${c.bold(pluginRef)}...`);

    try {
      execSync(`${claudePath} plugin install ${pluginRef} --scope ${scope}`, {
        encoding: "utf-8",
        stdio: "pipe",
      });
      stepDone(`Installed ${c.cyan(pluginRef)}`);
    } catch (err: any) {
      const stderr = err.stderr?.toString().trim() ?? "";
      const stdout = err.stdout?.toString().trim() ?? "";
      if (stderr.includes("already") || stdout.includes("already")) {
        stepDone(`${c.cyan(pluginRef)} ${c.dim("already installed")}`);
      } else {
        stepError(`Failed to install ${pluginRef}`);
        barLine(c.dim(`Command: ${claudePath} plugin install ${pluginRef} --scope ${scope}`));
        if (stdout) barLine(c.dim(`stdout: ${stdout}`));
        if (stderr) barLine(c.dim(`stderr: ${stderr}`));
        barLine(c.dim(`exit code: ${err.status}`));
      }
    }
  }
}

async function prepareForClaudeCode(
  plugins: DiscoveredPlugin[],
  repoPath: string,
  marketplaceName: string,
): Promise<void> {
  const claudePluginDir = join(repoPath, ".claude-plugin");
  await mkdir(claudePluginDir, { recursive: true });

  const marketplaceJson = {
    name: marketplaceName,
    owner: { name: "plugins" },
    plugins: plugins.map((p) => {
      const rel = relative(repoPath, p.path);
      const sourcePath = rel === "" ? "./" : `./${rel}`;

      const entry: Record<string, unknown> = {
        name: p.name,
        source: sourcePath,
        description: p.description ?? "",
      };
      if (p.version) entry.version = p.version;
      if (p.manifest?.author) entry.author = p.manifest.author;
      if (p.manifest?.license) entry.license = p.manifest.license;
      if (p.manifest?.keywords) entry.keywords = p.manifest.keywords;

      return entry;
    }),
  };

  await writeFile(
    join(claudePluginDir, "marketplace.json"),
    JSON.stringify(marketplaceJson, null, 2),
  );
  barLine(c.dim("Generated .claude-plugin/marketplace.json"));

  for (const plugin of plugins) {
    await preparePluginDirForVendor(plugin, ".claude-plugin", "CLAUDE_PLUGIN_ROOT");
  }
}

// ---------------------------------------------------------------------------
// Claude CLI resolution
// ---------------------------------------------------------------------------

/**
 * Find the claude binary, preferring the newest version if multiple exist.
 * Returns the full path to avoid PATH-order issues across shell environments.
 */
function findClaude(): string {
  // Try `which` first to find the default
  try {
    const path = execSync("which claude", { encoding: "utf-8", stdio: "pipe" }).trim();
    if (path) return path;
  } catch {
    // not found via which
  }

  // Common install locations as fallback
  const home = homedir();
  const candidates = [
    join(home, ".local", "bin", "claude"),
    join(home, ".bun", "bin", "claude"),
    "/usr/local/bin/claude",
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  // Last resort — just use bare "claude" and let the shell resolve it
  return "claude";
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Prepare an individual plugin directory for a specific vendor:
 * - Copy .plugin/ -> <vendorDir>/ if the vendor dir doesn't exist yet
 * - Generate <vendorDir>/plugin.json if neither .plugin/ nor vendor dir exist
 * - Translate ${PLUGIN_ROOT} -> ${<VENDOR_ENV_VAR>} in config files
 */
async function preparePluginDirForVendor(
  plugin: DiscoveredPlugin,
  vendorDir: string,
  envVar: string,
): Promise<void> {
  const pluginPath = plugin.path;

  const openPluginDir = join(pluginPath, ".plugin");
  const vendorPluginDir = join(pluginPath, vendorDir);

  const hasOpenPlugin = existsSync(join(openPluginDir, "plugin.json"));
  const hasVendorPlugin = existsSync(join(vendorPluginDir, "plugin.json"));

  if (hasOpenPlugin && !hasVendorPlugin) {
    await cp(openPluginDir, vendorPluginDir, { recursive: true });
    barLine(c.dim(`${plugin.name}: translated .plugin/ → ${vendorDir}/`));
  }

  // Ensure vendor plugin.json exists (some plugins might only have skills/)
  if (!hasOpenPlugin && !hasVendorPlugin) {
    await mkdir(vendorPluginDir, { recursive: true });
    await writeFile(
      join(vendorPluginDir, "plugin.json"),
      JSON.stringify(
        {
          name: plugin.name,
          description: plugin.description ?? "",
          version: plugin.version ?? "0.0.0",
        },
        null,
        2,
      ),
    );
    barLine(c.dim(`${plugin.name}: generated ${vendorDir}/plugin.json`));
  }

  // Translate ${PLUGIN_ROOT} -> ${<VENDOR_ENV_VAR>} in config files
  await translateEnvVars(pluginPath, plugin.name, envVar);
}

/**
 * Translate plugin root env vars to the vendor-specific form.
 *
 * The open-plugin spec uses ${PLUGIN_ROOT}. Each vendor uses its own:
 * - Claude Code: ${CLAUDE_PLUGIN_ROOT}
 * - Cursor: ${CURSOR_PLUGIN_ROOT}
 *
 * Also handles the case where a different vendor's env var was already
 * substituted (e.g. Claude Code ran first and wrote ${CLAUDE_PLUGIN_ROOT},
 * but we need ${CURSOR_PLUGIN_ROOT} for the Cursor copy).
 */
const KNOWN_PLUGIN_ROOT_VARS = [
  "PLUGIN_ROOT",
  "CLAUDE_PLUGIN_ROOT",
  "CURSOR_PLUGIN_ROOT",
];

async function translateEnvVars(
  pluginPath: string,
  pluginName: string,
  envVar: string,
): Promise<void> {
  const configFiles = [
    join(pluginPath, "hooks", "hooks.json"),
    join(pluginPath, ".mcp.json"),
    join(pluginPath, ".lsp.json"),
  ];

  const target = `\${${envVar}}`;
  // Build patterns to replace: ${PLUGIN_ROOT}, ${CLAUDE_PLUGIN_ROOT}, etc.
  const patterns = KNOWN_PLUGIN_ROOT_VARS
    .filter((v) => v !== envVar)
    .map((v) => `\${${v}}`);

  for (const filePath of configFiles) {
    if (!existsSync(filePath)) continue;

    let content = await readFile(filePath, "utf-8");
    let changed = false;
    for (const pattern of patterns) {
      if (content.includes(pattern)) {
        content = content.replaceAll(pattern, target);
        changed = true;
      }
    }
    if (changed) {
      await writeFile(filePath, content);
      barLine(
        c.dim(`${pluginName}: translated plugin root → \${${envVar}} in ${filePath.split("/").pop()}`),
      );
    }
  }
}

/**
 * Derive the marketplace name from the source string.
 *
 * Derive the marketplace name from the repo owner/name.
 */
function deriveMarketplaceName(source: string): string {
  // GitHub shorthand: owner/repo
  if (source.match(/^[\w-]+\/[\w.-]+$/)) {
    return source.replace("/", "-");
  }

  // SSH URL: git@github.com:owner/repo.git -> owner-repo
  const sshMatch = source.match(/^git@[^:]+:(.+?)(?:\.git)?$/);
  if (sshMatch) {
    const parts = sshMatch[1]!.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
    }
  }

  // HTTPS URL: extract owner/repo
  try {
    const url = new URL(source);
    const parts = url.pathname.replace(/\.git$/, "").split("/").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
    }
  } catch {
    // Not a URL
  }

  // Local path: use basename
  const parts = source.replace(/\/$/, "").split("/");
  return parts[parts.length - 1] ?? "plugins";
}

/**
 * Check if a source string points to the anthropics GitHub org.
 */
function isAnthropicSource(source: string): boolean {
  if (source.match(/^anthropics\/[\w.-]+$/)) return true;
  if (source.startsWith("https://github.com/anthropics/")) return true;
  if (source.startsWith("git@github.com:anthropics/")) return true;
  return false;
}

/**
 * Normalize a source string to a GitHub HTTPS URL.
 * Shorthand `owner/repo` becomes `https://github.com/owner/repo`.
 * SSH URLs become HTTPS. Already-HTTPS URLs are returned as-is.
 */
function normalizeGitUrl(source: string): string {
  if (source.match(/^[\w-]+\/[\w.-]+$/)) {
    return `https://github.com/${source}`;
  }
  const sshMatch = source.match(/^git@([^:]+):(.+?)(?:\.git)?$/);
  if (sshMatch) {
    return `https://${sshMatch[1]}/${sshMatch[2]}`;
  }
  return source;
}
