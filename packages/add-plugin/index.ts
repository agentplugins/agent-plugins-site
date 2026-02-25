#!/usr/bin/env bun

import { parseArgs } from "util";
import { resolve, join, basename } from "path";
import { discover, type DiscoveredPlugin } from "./lib/discover";
import { getTargets, type Target } from "./lib/targets";
import { installPlugins } from "./lib/install";

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    help: { type: "boolean", short: "h" },
    target: { type: "string", short: "t" },
    scope: { type: "string", short: "s", default: "user" },
    yes: { type: "boolean", short: "y" },
  },
  allowPositionals: true,
  strict: true,
});

const [command, ...rest] = positionals;

if (values.help || !command) {
  printUsage();
  process.exit(0);
}

switch (command) {
  case "discover":
    await cmdDiscover(rest[0]);
    break;
  case "targets":
    await cmdTargets();
    break;
  case "install":
    await cmdInstall(rest[0], values);
    break;
  default:
    // If no subcommand, treat the first positional as a repo path/url
    await cmdInstall(command, values);
}

function printUsage() {
  console.log(`
add-plugin - Install open-plugin format plugins into agent tools

Usage:
  add-plugin discover <repo-path-or-url>    Discover plugins in a repo
  add-plugin targets                        List available install targets
  add-plugin install <repo-path-or-url>     Install plugins from a repo
  add-plugin <repo-path-or-url>             Shorthand for install

Options:
  -t, --target <target>   Target tool (e.g. claude-code). Default: auto-detect
  -s, --scope <scope>     Install scope: user, project, local. Default: user
  -y, --yes               Skip confirmation prompts
  -h, --help              Show this help
`);
}

async function cmdDiscover(source?: string) {
  if (!source) {
    console.error("Error: provide a repo path or URL");
    process.exit(1);
  }

  const repoPath = await resolveSource(source);
  const plugins = await discover(repoPath);

  if (plugins.length === 0) {
    console.log("No plugins found.");
    return;
  }

  console.log(`Found ${plugins.length} plugin(s) in ${source}:\n`);
  for (const p of plugins) {
    printPlugin(p);
  }
}

async function cmdTargets() {
  const targets = await getTargets();
  if (targets.length === 0) {
    console.log("No supported targets detected.");
    return;
  }
  console.log("Available install targets:\n");
  for (const t of targets) {
    console.log(`  ${t.name}`);
    console.log(`    ${t.description}`);
    console.log(`    Config: ${t.configPath}`);
    console.log(`    Status: ${t.detected ? "detected" : "not found"}`);
    console.log();
  }
}

async function cmdInstall(source: string | undefined, opts: typeof values) {
  if (!source) {
    console.error("Error: provide a repo path or URL");
    process.exit(1);
  }

  const repoPath = await resolveSource(source);
  const plugins = await discover(repoPath);

  if (plugins.length === 0) {
    console.log("No plugins found.");
    return;
  }

  // Resolve target
  const targets = await getTargets();
  const detectedTargets = targets.filter((t) => t.detected);

  let target: Target;
  if (opts.target) {
    const found = targets.find((t) => t.id === opts.target);
    if (!found) {
      console.error(`Unknown target: ${opts.target}`);
      console.error(`Available: ${targets.map((t) => t.id).join(", ")}`);
      process.exit(1);
    }
    target = found;
  } else if (detectedTargets.length === 1) {
    target = detectedTargets[0]!;
  } else if (detectedTargets.length === 0) {
    console.error("No supported targets detected. Use --target to specify one.");
    process.exit(1);
  } else {
    // Multiple targets detected, pick first for now
    console.log(`Multiple targets detected: ${detectedTargets.map((t) => t.id).join(", ")}`);
    console.log(`Using: ${detectedTargets[0]!.id} (use --target to override)\n`);
    target = detectedTargets[0]!;
  }

  console.log(`Found ${plugins.length} plugin(s):\n`);
  for (const p of plugins) {
    printPlugin(p);
  }

  console.log(`Target: ${target.name}`);
  console.log(`Scope: ${opts.scope ?? "user"}\n`);

  if (!opts.yes) {
    process.stdout.write("Install? [y/N] ");
    const response = await readLine();
    if (response.trim().toLowerCase() !== "y") {
      console.log("Aborted.");
      return;
    }
  }

  const scope = opts.scope ?? "user";
  await installPlugins(plugins, target, scope, repoPath, source);

  console.log("\nDone. Restart your agent tool to load the plugins.");
}

function printPlugin(p: DiscoveredPlugin) {
  console.log(`  ${p.name} (v${p.version ?? "0.0.0"})`);
  if (p.description) console.log(`    ${p.description}`);
  const parts: string[] = [];
  if (p.skills.length) parts.push(`${p.skills.length} skill(s)`);
  if (p.commands.length) parts.push(`${p.commands.length} command(s)`);
  if (p.agents.length) parts.push(`${p.agents.length} agent(s)`);
  if (p.rules.length) parts.push(`${p.rules.length} rule(s)`);
  if (p.hasHooks) parts.push("hooks");
  if (p.hasMcp) parts.push("MCP servers");
  if (p.hasLsp) parts.push("LSP servers");
  if (parts.length) console.log(`    Components: ${parts.join(", ")}`);
  console.log();
}

async function resolveSource(source: string): Promise<string> {
  // GitHub URL - clone to temp dir
  if (source.startsWith("https://") || source.startsWith("git@") || source.match(/^[\w-]+\/[\w.-]+$/)) {
    const url = source.match(/^[\w-]+\/[\w.-]+$/) ? `https://github.com/${source}` : source;
    const tmpDir = join(
      await Bun.file(join(process.env.HOME ?? "~", ".cache", "add-plugin", ".keep")).exists()
        ? join(process.env.HOME ?? "~", ".cache", "add-plugin")
        : await (async () => {
            const dir = join(process.env.HOME ?? "~", ".cache", "add-plugin");
            await Bun.$`mkdir -p ${dir}`;
            return dir;
          })(),
      encodeURIComponent(url),
    );

    // Always do a fresh shallow clone — previous runs may have modified the tree
    // (e.g. generated .claude-plugin/), and shallow clones don't pull cleanly.
    if (await Bun.file(join(tmpDir, ".git", "HEAD")).exists()) {
      await Bun.$`rm -rf ${tmpDir}`.quiet();
    }
    console.log(`Cloning ${url}...`);
    await Bun.$`git clone --depth 1 -q ${url} ${tmpDir}`;
    return tmpDir;
  }

  // Local path
  return resolve(source);
}

async function readLine(): Promise<string> {
  const buf = Buffer.alloc(256);
  const fd = Bun.stdin.stream().getReader();
  const { value } = await fd.read();
  fd.releaseLock();
  return new TextDecoder().decode(value ?? buf);
}
