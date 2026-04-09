/**
 * Plugin installation logic.
 *
 * For Claude Code: prepares a local marketplace directory that Claude Code
 * understands, then shells out to `claude plugin marketplace add` + `claude plugin install`.
 *
 * For Cursor: installs via the Claude Code CLI when available. When the claude
 * CLI is not installed, writes directly to the Claude plugin cache directory
 * (~/.claude/plugins/) which Cursor reads for "Imported" plugins.
 */

import { join, relative } from "path";
import { mkdir, cp, readFile, writeFile, rm } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import { homedir } from "os";
import { createHash } from "crypto";
import type { DiscoveredPlugin } from "./discover.js";
import type { Target } from "./targets.js";
import { c, step, stepDone, stepError, barLine, barEmpty, barDebug } from "./ui.js";

/**
 * Track whether the plugin cache has already been populated (by the Claude Code
 * CLI installer or the direct file installer). When both claude-code and cursor
 * targets are present, the first successful installation populates the cache
 * and the second can skip.
 */
let cachePopulated = false;

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
    case "claude-code": {
      const workspace = await stageInstallWorkspace(plugins, repoPath, target.id);
      await installToClaudeCode(workspace.plugins, scope, workspace.repoPath, source);
      break;
    }
    case "cursor": {
      if (cachePopulated) return;
      const workspace = await stageInstallWorkspace(plugins, repoPath, target.id);
      await installToCursor(workspace.plugins, scope, workspace.repoPath, source);
      break;
    }
    case "codex": {
      const workspace = await stageInstallWorkspace(plugins, repoPath, target.id);
      await installToCodex(workspace.plugins, scope, workspace.repoPath, source);
      break;
    }
    default:
      throw new Error(`Unsupported target: ${target.id}`);
  }
}

interface InstallWorkspace {
  repoPath: string;
  plugins: DiscoveredPlugin[];
}

export async function stageInstallWorkspace(
  plugins: DiscoveredPlugin[],
  repoPath: string,
  targetId: string,
  stagingBaseDir = join(homedir(), ".cache", "plugins", ".install-staging"),
): Promise<InstallWorkspace> {
  const stageKey = createHash("sha1").update(repoPath).digest("hex");
  const stageRoot = join(stagingBaseDir, stageKey, targetId);
  const stagedRepoPath = join(stageRoot, "repo");

  await mkdir(stageRoot, { recursive: true });
  await rm(stagedRepoPath, { recursive: true, force: true });
  await cp(repoPath, stagedRepoPath, { recursive: true });

  const stagedPlugins = plugins.map((plugin) => {
    const relPath = relative(repoPath, plugin.path);
    return {
      ...plugin,
      path: relPath === "" ? stagedRepoPath : join(stagedRepoPath, relPath),
    };
  });

  return {
    repoPath: stagedRepoPath,
    plugins: stagedPlugins,
  };
}

// ---------------------------------------------------------------------------
// Claude Code installer (uses the `claude` CLI)
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
  // Install directly to the plugin cache using git SHA-based paths (matches
  // the official Claude installer convention). We no longer shell out to the
  // `claude` CLI because it uses semver-based paths instead of commit hashes.
  await installToPluginCache(plugins, scope, repoPath, source);
}

// ---------------------------------------------------------------------------
// Cursor installer
// ---------------------------------------------------------------------------
//
// Cursor reads "Imported" plugins from the Claude Code plugin cache directory
// (~/.claude/plugins/). We write directly to the cache using git SHA-based
// paths. On Windows, Cursor reads from ~/.cursor/extensions/ instead.

async function installToCursor(
  plugins: DiscoveredPlugin[],
  scope: string,
  repoPath: string,
  source: string,
): Promise<void> {
  // If the Claude Code installer already ran successfully, the cache is
  // populated and Cursor will pick it up — nothing more to do.
  if (cachePopulated) return;

  if (process.platform === "win32") {
    // Windows: Cursor reads from ~/.cursor/extensions/
    await installToCursorExtensions(plugins, scope, repoPath, source);
    return;
  }

  // macOS/Linux: write directly to ~/.claude/plugins/ cache with git SHA paths.
  await installToPluginCache(plugins, scope, repoPath, source);
}

// ---------------------------------------------------------------------------
// Direct file-based installer (no claude CLI required)
// ---------------------------------------------------------------------------
//
// Replicates what `claude plugin marketplace add` + `claude plugin install`
// does under the hood: writes to ~/.claude/plugins/{cache, known_marketplaces,
// installed_plugins}.

async function installToPluginCache(
  plugins: DiscoveredPlugin[],
  scope: string,
  repoPath: string,
  source: string,
): Promise<void> {
  const marketplaceName = plugins[0]?.marketplace ?? deriveMarketplaceName(source);
  const home = homedir();
  const pluginsDir = join(home, ".claude", "plugins");
  const cacheDir = join(pluginsDir, "cache");

  // 1. Prepare the repo directory for Claude Code format
  step("Preparing plugins for Cursor...");
  barEmpty();
  await prepareForClaudeCode(plugins, repoPath, marketplaceName);

  // 2. Register the marketplace in known_marketplaces.json
  step("Registering marketplace");
  await mkdir(pluginsDir, { recursive: true });

  const knownPath = join(pluginsDir, "known_marketplaces.json");
  let knownMarketplaces: Record<string, unknown> = {};
  if (existsSync(knownPath)) {
    try {
      knownMarketplaces = JSON.parse(await readFile(knownPath, "utf-8"));
    } catch {
      // corrupted — start fresh
    }
  }

  // Determine the marketplace source format to match what the official
  // Claude installer writes:
  //   - GitHub repos  → { source: "github", repo: "owner/repo" }
  //   - Other git URLs → { source: "git", url: "https://..." }
  //   - Local paths    → { source: "directory", path: "/abs/path" }
  const githubRepo = extractGitHubRepo(source);
  const marketplacesDir = join(pluginsDir, "marketplaces");
  const marketplaceInstallLocation = join(marketplacesDir, marketplaceName);

  // Copy the repo to the marketplaces directory so Claude Code can find
  // plugins when validating against the marketplace.
  await mkdir(marketplacesDir, { recursive: true });
  if (existsSync(marketplaceInstallLocation)) {
    await rm(marketplaceInstallLocation, { recursive: true });
  }
  await cp(repoPath, marketplaceInstallLocation, { recursive: true });
  barDebug(c.dim(`Marketplace copied to ${marketplaceInstallLocation}`));

  if (knownMarketplaces[marketplaceName]) {
    stepDone(`Marketplace ${c.dim("'" + marketplaceName + "'")} already registered`);
  } else {
    let marketplaceSource: Record<string, string>;
    if (githubRepo) {
      marketplaceSource = { source: "github", repo: githubRepo };
    } else if (isRemoteSource(source)) {
      const gitUrl = normalizeGitUrl(source);
      marketplaceSource = { source: "git", url: gitUrl.endsWith(".git") ? gitUrl : gitUrl + ".git" };
    } else {
      marketplaceSource = { source: "directory", path: repoPath };
    }
    knownMarketplaces[marketplaceName] = {
      source: marketplaceSource,
      installLocation: marketplaceInstallLocation,
      lastUpdated: new Date().toISOString(),
    };
    await writeFile(knownPath, JSON.stringify(knownMarketplaces, null, 2));
    stepDone("Marketplace registered");
  }

  barEmpty();

  // 3. Copy each plugin into the cache and register in installed_plugins.json
  const installedPath = join(pluginsDir, "installed_plugins.json");
  let installedData: { version: number; plugins: Record<string, unknown[]> } = { version: 2, plugins: {} };
  if (existsSync(installedPath)) {
    try {
      installedData = JSON.parse(await readFile(installedPath, "utf-8"));
    } catch {
      // corrupted — start fresh
    }
  }

  // Read the git commit sha from the repo (if available)
  let gitSha: string | undefined;
  try {
    gitSha = execSync("git rev-parse HEAD", { cwd: repoPath, encoding: "utf-8", stdio: "pipe" }).trim();
  } catch {
    // not a git repo or git not available
  }

  for (const plugin of plugins) {
    const pluginRef = `${plugin.name}@${marketplaceName}`;
    const version = plugin.version ?? "0.0.0";
    // Use truncated git SHA for cache path (matches official Claude installer),
    // falling back to semver for non-git sources.
    const versionKey = gitSha ? gitSha.slice(0, 12) : version;
    step(`Installing ${c.bold(pluginRef)}...`);

    // Copy plugin directory to cache
    const cacheDest = join(cacheDir, marketplaceName, plugin.name, versionKey);
    await mkdir(cacheDest, { recursive: true });
    await cp(plugin.path, cacheDest, { recursive: true });
    barDebug(c.dim(`Cached to ${cacheDest}`));

    // Register in installed_plugins.json
    const pluginKey = `${plugin.name}@${marketplaceName}`;
    const now = new Date().toISOString();
    const entry: Record<string, unknown> = {
      scope,
      installPath: cacheDest,
      version,
      installedAt: now,
      lastUpdated: now,
    };
    if (gitSha) entry.gitCommitSha = gitSha;

    // Replace existing entries for this plugin key with the new one
    installedData.plugins[pluginKey] = [entry];

    stepDone(`Installed ${c.cyan(pluginRef)}`);
  }

  await writeFile(installedPath, JSON.stringify(installedData, null, 2));
  barDebug(c.dim("Updated installed_plugins.json"));

  // 4. Enable plugins in ~/.claude/settings.json
  //    Claude Code uses the `enabledPlugins` map in settings.json to determine
  //    which installed plugins are actually active. Without this, plugins show
  //    in "Discover" but not in "Installed".
  const settingsPath = join(home, ".claude", "settings.json");
  let settings: Record<string, unknown> = {};
  if (existsSync(settingsPath)) {
    try {
      settings = JSON.parse(await readFile(settingsPath, "utf-8"));
    } catch {
      // corrupted — start fresh
    }
  }

  const enabled = (settings.enabledPlugins ?? {}) as Record<string, boolean>;
  for (const plugin of plugins) {
    const pluginKey = `${plugin.name}@${marketplaceName}`;
    enabled[pluginKey] = true;
  }
  settings.enabledPlugins = enabled;

  await writeFile(settingsPath, JSON.stringify(settings, null, 2));
  barDebug(c.dim("Updated settings.json enabledPlugins"));

  cachePopulated = true;
}

// ---------------------------------------------------------------------------
// Cursor extensions installer (no claude CLI required)
// ---------------------------------------------------------------------------
//
// On Windows, Cursor reads extensions from %USERPROFILE%\.cursor\extensions\
// rather than the ~/.claude/plugins/ cache that macOS/Linux Cursor uses.
// On macOS/Linux, falls back to the Claude plugin cache (existing behavior).

async function installToCursorExtensions(
  plugins: DiscoveredPlugin[],
  scope: string,
  repoPath: string,
  source: string,
): Promise<void> {
  // Windows: install to ~/.cursor/extensions/
  const marketplaceName = plugins[0]?.marketplace ?? deriveMarketplaceName(source);
  const home = homedir();
  const extensionsDir = join(home, ".cursor", "extensions");

  step("Preparing plugins for Cursor...");
  barEmpty();
  await prepareForClaudeCode(plugins, repoPath, marketplaceName);

  await mkdir(extensionsDir, { recursive: true });

  // Read existing extensions.json
  const extensionsJsonPath = join(extensionsDir, "extensions.json");
  let extensions: unknown[] = [];
  if (existsSync(extensionsJsonPath)) {
    try {
      const parsed = JSON.parse(await readFile(extensionsJsonPath, "utf-8"));
      if (Array.isArray(parsed)) extensions = parsed;
    } catch {
      // corrupted — start fresh
    }
  }

  // Read git commit sha (if available)
  let gitSha: string | undefined;
  try {
    gitSha = execSync("git rev-parse HEAD", { cwd: repoPath, encoding: "utf-8", stdio: "pipe" }).trim();
  } catch {
    // not a git repo or git not available
  }

  for (const plugin of plugins) {
    const pluginRef = `${plugin.name}@${marketplaceName}`;
    const version = plugin.version ?? "0.0.0";
    // Use git SHA in folder name to match official installer conventions,
    // falling back to semver for non-git sources.
    const versionKey = gitSha ? gitSha.slice(0, 12) : version;
    const folderName = `${marketplaceName}.${plugin.name}-${versionKey}`;
    const destDir = join(extensionsDir, folderName);

    step(`Installing ${c.bold(pluginRef)}...`);

    // Copy plugin directory into the extensions folder
    await mkdir(destDir, { recursive: true });
    await cp(plugin.path, destDir, { recursive: true });
    barDebug(c.dim(`Copied to ${destDir}`));

    // Remove any existing entry for this plugin, then add the new one
    const identifier = `${marketplaceName}.${plugin.name}`;
    extensions = extensions.filter(
      (e: any) => e?.identifier?.id !== identifier,
    );

    // VS Code/Cursor URI format requires forward slashes with a leading "/"
    // prefix on Windows (e.g. /C:/Users/...) rather than native backslash paths.
    const uriPath = "/" + destDir.replace(/\\/g, "/");

    extensions.push({
      identifier: { id: identifier },
      version,
      location: { $mid: 1, path: uriPath, scheme: "file" },
      relativeLocation: folderName,
      metadata: {
        installedTimestamp: Date.now(),
        ...(gitSha ? { gitCommitSha: gitSha } : {}),
      },
    });

    stepDone(`Installed ${c.cyan(pluginRef)}`);
  }

  await writeFile(extensionsJsonPath, JSON.stringify(extensions, null, 2));
  barDebug(c.dim("Updated extensions.json"));

  cachePopulated = true;
}

// ---------------------------------------------------------------------------
// Codex installer (direct file-based — no CLI equivalent)
// ---------------------------------------------------------------------------
//
// Codex discovers plugins through marketplace JSON files and stores installed
// plugin data in a cache directory. Three things must happen for a plugin to
// appear in the Codex UI:
//
// 1. Plugin files are copied to ~/.codex/plugins/cache/<marketplace>/<plugin>/<git-sha>/
//    with a .codex-plugin/plugin.json manifest (richer than .claude-plugin).
// 2. A personal marketplace at ~/.agents/plugins/marketplace.json references
//    the cached plugin via a relative source.path entry.
// 3. The plugin is enabled in ~/.codex/config.toml under [plugins."name@marketplace"].
//
// The .codex-plugin/plugin.json is a superset of the open-plugin manifest,
// adding explicit component paths (skills, mcpServers, apps) and an interface
// block for marketplace presentation. We generate these from the base manifest
// when converting from .plugin/ or .claude-plugin/.

async function installToCodex(
  plugins: DiscoveredPlugin[],
  scope: string,
  repoPath: string,
  source: string,
): Promise<void> {
  const marketplaceName = plugins[0]?.marketplace ?? deriveMarketplaceName(source);
  const home = homedir();
  const cacheDir = join(home, ".codex", "plugins", "cache");
  const configPath = join(home, ".codex", "config.toml");
  // Personal marketplace: ~/.agents/plugins/marketplace.json
  // Codex resolves source.path relative to the grandparent of the marketplace
  // file — i.e. the directory that contains .agents/. For the personal
  // marketplace that is $HOME.
  const marketplaceDir = join(home, ".agents", "plugins");
  const marketplacePath = join(marketplaceDir, "marketplace.json");
  const marketplaceRoot = home;

  // 1. Prepare plugin directories for Codex format
  step("Preparing plugins for Codex...");
  barEmpty();

  for (const plugin of plugins) {
    await preparePluginDirForVendor(plugin, ".codex-plugin", "CODEX_PLUGIN_ROOT");
    await enrichForCodex(plugin);
  }

  // 2. Get git commit SHA for cache key
  let gitSha: string | undefined;
  try {
    gitSha = execSync("git rev-parse HEAD", { cwd: repoPath, encoding: "utf-8", stdio: "pipe" }).trim();
  } catch {
    // not a git repo — use "local" as version key (matches Codex convention for local installs)
  }
  const versionKey = gitSha ?? "local";

  // 3. Copy each plugin into the cache
  const pluginPaths: Record<string, string> = {};
  for (const plugin of plugins) {
    const pluginRef = `${plugin.name}@${marketplaceName}`;
    step(`Installing ${c.bold(pluginRef)}...`);

    const cacheDest = join(cacheDir, marketplaceName, plugin.name, versionKey);
    await mkdir(cacheDest, { recursive: true });
    await cp(plugin.path, cacheDest, { recursive: true });
    pluginPaths[plugin.name] = cacheDest;
    barDebug(c.dim(`Cached to ${cacheDest}`));

    stepDone(`Installed ${c.cyan(pluginRef)}`);
  }

  // 4. Register in the personal marketplace (~/.agents/plugins/marketplace.json)
  step("Updating marketplace...");
  await mkdir(marketplaceDir, { recursive: true });

  interface CodexMarketplaceEntry {
    name: string;
    source: { source: string; path: string };
    policy: { installation: string; authentication: string };
    category: string;
  }
  interface CodexMarketplace {
    name: string;
    interface?: { displayName: string };
    plugins: CodexMarketplaceEntry[];
  }

  let marketplace: CodexMarketplace = {
    name: "plugins-cli",
    interface: { displayName: "Plugins CLI" },
    plugins: [],
  };

  if (existsSync(marketplacePath)) {
    try {
      const existing = JSON.parse(await readFile(marketplacePath, "utf-8"));
      if (existing && typeof existing === "object" && Array.isArray(existing.plugins)) {
        marketplace = existing as CodexMarketplace;
      }
    } catch {
      // corrupted — start fresh
    }
  }

  for (const plugin of plugins) {
    const cacheDest = pluginPaths[plugin.name]!;
    // source.path is relative to the marketplace root ($HOME)
    const relPath = relative(marketplaceRoot, cacheDest);

    // Remove any existing entry for this plugin
    marketplace.plugins = marketplace.plugins.filter(
      (e: CodexMarketplaceEntry) => e.name !== plugin.name,
    );

    marketplace.plugins.push({
      name: plugin.name,
      source: {
        source: "local",
        path: `./${relPath}`,
      },
      policy: {
        installation: "AVAILABLE",
        authentication: "ON_INSTALL",
      },
      category: "Coding",
    });
  }

  await writeFile(marketplacePath, JSON.stringify(marketplace, null, 2));
  stepDone("Marketplace updated");

  // 5. Enable plugins in ~/.codex/config.toml
  step("Updating config.toml...");
  await mkdir(join(home, ".codex"), { recursive: true });

  let configContent = "";
  if (existsSync(configPath)) {
    configContent = await readFile(configPath, "utf-8");
  }

  let configChanged = false;
  for (const plugin of plugins) {
    const pluginKey = `${plugin.name}@plugins-cli`;
    const tomlSection = `[plugins."${pluginKey}"]`;

    if (configContent.includes(tomlSection)) {
      barDebug(c.dim(`${pluginKey} already in config.toml`));
      continue;
    }

    // Append the plugin entry
    const entry = `\n${tomlSection}\nenabled = true\n`;
    configContent += entry;
    configChanged = true;
    barDebug(c.dim(`Added ${pluginKey} to config.toml`));
  }

  if (configChanged) {
    await writeFile(configPath, configContent);
  }

  stepDone("Config updated");
}

/**
 * Enrich a .codex-plugin/plugin.json with Codex-specific fields.
 *
 * If the plugin already ships a handcrafted .codex-plugin/plugin.json with an
 * `interface` block, this is a no-op. Otherwise we generate the Codex-specific
 * fields (component paths + minimal interface block) from the base manifest
 * and discovered plugin metadata.
 */
async function enrichForCodex(plugin: DiscoveredPlugin): Promise<void> {
  const codexManifestPath = join(plugin.path, ".codex-plugin", "plugin.json");
  if (!existsSync(codexManifestPath)) return;

  let manifest: Record<string, unknown>;
  try {
    manifest = JSON.parse(await readFile(codexManifestPath, "utf-8"));
  } catch {
    return;
  }

  // If already has an interface block, the plugin author crafted it — leave it alone
  if (manifest.interface) return;

  let changed = false;

  // Add explicit component paths that Codex expects
  if (!manifest.skills && existsSync(join(plugin.path, "skills"))) {
    manifest.skills = "./skills/";
    changed = true;
  }
  if (!manifest.mcpServers && existsSync(join(plugin.path, ".mcp.json"))) {
    manifest.mcpServers = "./.mcp.json";
    changed = true;
  }
  if (!manifest.apps && existsSync(join(plugin.path, ".app.json"))) {
    manifest.apps = "./.app.json";
    changed = true;
  }

  // Generate a minimal interface block from existing metadata
  const name = (manifest.name as string) ?? plugin.name;
  const description = (manifest.description as string) ?? plugin.description ?? "";
  const author = manifest.author as Record<string, string> | undefined;

  const iface: Record<string, unknown> = {
    displayName: name.charAt(0).toUpperCase() + name.slice(1),
    shortDescription: description,
    developerName: author?.name ?? "Unknown",
    category: "Coding",
    capabilities: ["Interactive", "Write"],
  };

  // Carry over homepage/repository as websiteURL if available
  if (manifest.homepage) iface.websiteURL = manifest.homepage;
  else if (manifest.repository) iface.websiteURL = manifest.repository;

  // Check for logo/icon assets
  const assetCandidates = ["assets/app-icon.png", "assets/icon.png", "assets/logo.png", "assets/logo.svg"];
  for (const candidate of assetCandidates) {
    if (existsSync(join(plugin.path, candidate))) {
      iface.logo = `./${candidate}`;
      iface.composerIcon = `./${candidate}`;
      break;
    }
  }

  manifest.interface = iface;
  changed = true;

  if (changed) {
    await writeFile(codexManifestPath, JSON.stringify(manifest, null, 2));
    barDebug(c.dim(`${plugin.name}: enriched .codex-plugin/plugin.json for Codex`));
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
  barDebug(c.dim("Generated .claude-plugin/marketplace.json"));

  for (const plugin of plugins) {
    await preparePluginDirForVendor(plugin, ".claude-plugin", "CLAUDE_PLUGIN_ROOT");
  }
}

// ---------------------------------------------------------------------------
// Claude CLI resolution
// ---------------------------------------------------------------------------

/**
 * Find the claude binary. Returns null if not found anywhere.
 */
function findClaudeOrNull(): string | null {
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

  return null;
}

/**
 * Find the claude binary, preferring the newest version if multiple exist.
 * Returns the full path to avoid PATH-order issues across shell environments.
 * Falls back to bare "claude" as a last resort.
 */
function findClaude(): string {
  return findClaudeOrNull() ?? "claude";
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
export async function preparePluginDirForVendor(
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
    barDebug(c.dim(`${plugin.name}: translated .plugin/ → ${vendorDir}/`));
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
    barDebug(c.dim(`${plugin.name}: generated ${vendorDir}/plugin.json`));
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
  "CODEX_PLUGIN_ROOT",
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
      barDebug(
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
 * Extract a GitHub "owner/repo" string from a source, or null if the source
 * is not a GitHub reference.
 */
function extractGitHubRepo(source: string): string | null {
  // Shorthand: owner/repo
  const shorthand = source.match(/^([\w-]+\/[\w.-]+)$/);
  if (shorthand) return shorthand[1]!;
  // HTTPS: https://github.com/owner/repo[.git]
  const httpsMatch = source.match(/^https?:\/\/github\.com\/([\w.-]+\/[\w.-]+?)(?:\.git)?$/);
  if (httpsMatch) return httpsMatch[1]!;
  // SSH: git@github.com:owner/repo[.git]
  const sshMatch = source.match(/^git@github\.com:([\w.-]+\/[\w.-]+?)(?:\.git)?$/);
  if (sshMatch) return sshMatch[1]!;
  return null;
}

/**
 * Check if a source string is a remote git source (URL or owner/repo shorthand)
 * rather than a local file path.
 */
function isRemoteSource(source: string): boolean {
  // GitHub shorthand: owner/repo
  if (source.match(/^[\w-]+\/[\w.-]+$/)) return true;
  // SSH URL
  if (source.startsWith("git@")) return true;
  // HTTPS/HTTP URL
  if (source.startsWith("https://") || source.startsWith("http://")) return true;
  return false;
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
