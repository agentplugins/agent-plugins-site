/**
 * Plugin installation logic.
 *
 * For Claude Code: prepares a local marketplace directory that Claude Code
 * understands, then shells out to `claude plugin marketplace add` + `claude plugin install`.
 *
 * For Cursor: copies plugin directories into ~/.cursor/plugins/cache/<marketplace>/<plugin>/<sha>/
 * where Cursor discovers them automatically.
 */

import { join, relative } from "path";
import { mkdir, cp, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import { homedir } from "os";
import { createHash } from "crypto";
import type { DiscoveredPlugin } from "./discover.js";
import type { Target } from "./targets.js";

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
    case "cursor":
      await installToCursor(plugins, repoPath, source);
      break;
    default:
      throw new Error(`Unsupported target: ${target.id}`);
  }
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
  console.log("\nPreparing plugins for Claude Code...");
  await prepareForClaudeCode(plugins, repoPath, marketplaceName);

  // 2. Add the marketplace from the local path
  console.log(`Adding marketplace from local path: ${repoPath}`);
  try {
    execSync(`claude plugin marketplace add ${repoPath}`, {
      encoding: "utf-8",
      stdio: "pipe",
    });
    console.log("  Marketplace added.");
  } catch (err: any) {
    const stderr = err.stderr?.toString().trim() ?? "";
    const stdout = err.stdout?.toString().trim() ?? "";
    if (stderr.includes("already") || stdout.includes("already")) {
      console.log("  Marketplace already registered.");
    } else {
      console.error(`Failed to add marketplace: ${stderr || stdout}`);
      process.exit(1);
    }
  }

  // 3. Install each plugin
  for (const plugin of plugins) {
    const pluginRef = `${plugin.name}@${marketplaceName}`;
    console.log(`\nInstalling ${pluginRef}...`);

    try {
      execSync(`claude plugin install ${pluginRef} --scope ${scope}`, {
        encoding: "utf-8",
        stdio: "pipe",
      });
      console.log(`  Installed.`);
    } catch (err: any) {
      const stderr = err.stderr?.toString().trim() ?? "";
      const stdout = err.stdout?.toString().trim() ?? "";
      if (stderr.includes("already") || stdout.includes("already")) {
        console.log(`  Already installed.`);
      } else {
        console.error(`  Failed: ${stderr || stdout}`);
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
    owner: { name: "add-plugin" },
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
  console.log("  Generated .claude-plugin/marketplace.json");

  for (const plugin of plugins) {
    await preparePluginDirForVendor(plugin, ".claude-plugin", "CLAUDE_PLUGIN_ROOT");
  }
}

// ---------------------------------------------------------------------------
// Cursor installer
// ---------------------------------------------------------------------------
//
// Cursor discovers installed plugins by scanning:
//   ~/.cursor/plugins/cache/<marketplace>/<plugin-name>/<commit-sha>/
//
// Each plugin directory must contain .cursor-plugin/plugin.json.
// There is no CLI command for plugin installation — Cursor reads from the
// filesystem directly.
//
// So we:
// 1. Prepare each plugin (ensure .cursor-plugin/plugin.json, translate env vars)
// 2. Copy the plugin directory into the Cursor cache at the expected path

async function installToCursor(
  plugins: DiscoveredPlugin[],
  repoPath: string,
  source: string,
): Promise<void> {
  const marketplaceName = plugins[0]?.marketplace ?? deriveMarketplaceName(source);
  const cursorCacheDir = join(homedir(), ".cursor", "plugins", "cache", marketplaceName);

  console.log("\nPreparing plugins for Cursor...");

  for (const plugin of plugins) {
    // 1. Compute a stable hash for the cache directory name.
    //    Cursor uses git commit SHAs. We derive one from source + plugin name
    //    so that re-installs overwrite the same directory.
    const sha = computePluginHash(source, plugin.name);

    // 2. Copy into Cursor's plugin cache first, then prepare the copy.
    //    This avoids mutating the shared source directory (which Claude Code's
    //    installer may have already modified with its own env vars).
    const destDir = join(cursorCacheDir, plugin.name, sha);
    await mkdir(destDir, { recursive: true });
    await cp(plugin.path, destDir, { recursive: true });

    // 3. Prepare the copied plugin (vendor dir, env vars) on the destination
    const destPlugin = { ...plugin, path: destDir };
    await preparePluginDirForVendor(destPlugin, ".cursor-plugin", "CURSOR_PLUGIN_ROOT");

    console.log(`  ${plugin.name}: installed to ${destDir}`);
  }
}

/**
 * Compute a stable hash for a plugin installation.
 * Cursor uses git commit SHAs for versioning in its cache path.
 * We derive a deterministic hash from the source + plugin name so that
 * repeated installs from the same source overwrite cleanly.
 */
function computePluginHash(source: string, pluginName: string): string {
  return createHash("sha1").update(`${source}:${pluginName}`).digest("hex");
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
    console.log(`  ${plugin.name}: translated .plugin/ -> ${vendorDir}/`);
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
    console.log(`  ${plugin.name}: generated ${vendorDir}/plugin.json`);
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
      console.log(
        `  ${pluginName}: translated plugin root -> \${${envVar}} in ${filePath.split("/").pop()}`,
      );
    }
  }
}

/**
 * Derive the marketplace name from the source string.
 *
 * Claude Code and Cursor both use marketplace names derived from the repo owner/name.
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
