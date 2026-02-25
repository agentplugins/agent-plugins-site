/**
 * Plugin installation logic.
 *
 * For Claude Code: prepares a local marketplace directory that Claude Code
 * understands, then shells out to `claude plugin marketplace add` + `claude plugin install`.
 */

import { join, relative } from "path";
import { mkdir, cp, rm } from "node:fs/promises";
import type { DiscoveredPlugin } from "./discover";
import type { Target } from "./targets";

/**
 * Install discovered plugins into a target tool.
 */
export async function installPlugins(
  plugins: DiscoveredPlugin[],
  target: Target,
  scope: string,
  repoPath: string,
  source: string,
): Promise<void> {
  switch (target.id) {
    case "claude-code":
      await installToClaudeCode(plugins, scope, repoPath, source);
      break;
    default:
      throw new Error(`Unsupported target: ${target.id}`);
  }
}

// --- Claude Code installer ---
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
  console.log("\nPreparing plugins for Claude Code...");
  await prepareForClaudeCode(plugins, repoPath, marketplaceName);

  // 2. Add the marketplace from the local path
  console.log(`Adding marketplace from local path: ${repoPath}`);
  const addResult = await Bun.$`claude plugin marketplace add ${repoPath}`.quiet().nothrow();

  if (addResult.exitCode !== 0) {
    const stderr = addResult.stderr.toString().trim();
    const stdout = addResult.stdout.toString().trim();
    // "already exists" or "already added" is fine
    if (!stderr.includes("already") && !stdout.includes("already")) {
      console.error(`Failed to add marketplace: ${stderr || stdout}`);
      process.exit(1);
    }
    console.log("  Marketplace already registered.");
  } else {
    console.log("  Marketplace added.");
  }

  // 3. Install each plugin
  for (const plugin of plugins) {
    const pluginRef = `${plugin.name}@${marketplaceName}`;
    console.log(`\nInstalling ${pluginRef}...`);

    const installResult =
      await Bun.$`claude plugin install ${pluginRef} --scope ${scope}`.quiet().nothrow();

    if (installResult.exitCode !== 0) {
      const stderr = installResult.stderr.toString().trim();
      const stdout = installResult.stdout.toString().trim();
      if (stderr.includes("already") || stdout.includes("already")) {
        console.log(`  Already installed.`);
      } else {
        console.error(`  Failed: ${stderr || stdout}`);
      }
    } else {
      console.log(`  Installed.`);
    }
  }
}

/**
 * Prepare a cloned repo so Claude Code can consume it as a marketplace.
 *
 * 1. Generate .claude-plugin/marketplace.json at repo root
 * 2. Translate .plugin/ -> .claude-plugin/ for each plugin
 * 3. Translate ${PLUGIN_ROOT} -> ${CLAUDE_PLUGIN_ROOT} in configs
 */
async function prepareForClaudeCode(
  plugins: DiscoveredPlugin[],
  repoPath: string,
  marketplaceName: string,
): Promise<void> {
  // Generate .claude-plugin/marketplace.json at repo root
  const claudePluginDir = join(repoPath, ".claude-plugin");
  await mkdir(claudePluginDir, { recursive: true });

  const marketplaceJson = {
    name: marketplaceName,
    owner: { name: "add-plugin" },
    plugins: plugins.map((p) => {
      // Compute relative source path from repo root to plugin dir
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

  await Bun.write(
    join(claudePluginDir, "marketplace.json"),
    JSON.stringify(marketplaceJson, null, 2),
  );
  console.log("  Generated .claude-plugin/marketplace.json");

  // Prepare each plugin directory
  for (const plugin of plugins) {
    await preparePluginDir(plugin);
  }
}

/**
 * Prepare an individual plugin directory:
 * - Copy .plugin/ -> .claude-plugin/ if needed
 * - Translate ${PLUGIN_ROOT} -> ${CLAUDE_PLUGIN_ROOT}
 */
async function preparePluginDir(plugin: DiscoveredPlugin): Promise<void> {
  const pluginPath = plugin.path;

  // Translate .plugin/ -> .claude-plugin/ if the plugin uses the open-plugin format
  const openPluginDir = join(pluginPath, ".plugin");
  const claudePluginDir = join(pluginPath, ".claude-plugin");

  const hasOpenPlugin = await Bun.file(join(openPluginDir, "plugin.json")).exists();
  const hasClaudePlugin = await Bun.file(join(claudePluginDir, "plugin.json")).exists();

  if (hasOpenPlugin && !hasClaudePlugin) {
    await cp(openPluginDir, claudePluginDir, { recursive: true });
    console.log(`  ${plugin.name}: translated .plugin/ -> .claude-plugin/`);
  }

  // Ensure .claude-plugin/plugin.json exists (some plugins might only have skills/)
  if (!hasOpenPlugin && !hasClaudePlugin) {
    await mkdir(claudePluginDir, { recursive: true });
    await Bun.write(
      join(claudePluginDir, "plugin.json"),
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
    console.log(`  ${plugin.name}: generated .claude-plugin/plugin.json`);
  }

  // Translate ${PLUGIN_ROOT} -> ${CLAUDE_PLUGIN_ROOT} in config files
  await translateEnvVars(pluginPath, plugin.name);
}

/**
 * Open-plugin spec uses ${PLUGIN_ROOT}, Claude Code uses ${CLAUDE_PLUGIN_ROOT}.
 */
async function translateEnvVars(pluginPath: string, pluginName: string): Promise<void> {
  const configFiles = [
    join(pluginPath, "hooks", "hooks.json"),
    join(pluginPath, ".mcp.json"),
    join(pluginPath, ".lsp.json"),
  ];

  for (const filePath of configFiles) {
    if (!(await Bun.file(filePath).exists())) continue;

    let content = await Bun.file(filePath).text();
    if (content.includes("${PLUGIN_ROOT}")) {
      content = content.replaceAll("${PLUGIN_ROOT}", "${CLAUDE_PLUGIN_ROOT}");
      await Bun.write(filePath, content);
      console.log(`  ${pluginName}: translated \${PLUGIN_ROOT} in ${filePath.split("/").pop()}`);
    }
  }
}

/**
 * Derive the marketplace name from the source string.
 *
 * Claude Code slugifies owner/repo as "owner-repo".
 */
function deriveMarketplaceName(source: string): string {
  // GitHub shorthand: owner/repo
  if (source.match(/^[\w-]+\/[\w.-]+$/)) {
    return source.replace("/", "-");
  }

  // Git URL: extract owner/repo
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
  return parts[parts.length - 1] ?? "add-plugin";
}
