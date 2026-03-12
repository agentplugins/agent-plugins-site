import { parseArgs } from "util";
import { resolve, join } from "path";
import { execSync } from "child_process";
import { existsSync, rmSync, mkdirSync } from "fs";
import { createInterface } from "readline";
import { discover, type DiscoveredPlugin } from "./lib/discover.js";
import { getTargets, type Target } from "./lib/targets.js";
import { installPlugins } from "./lib/install.js";

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
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
  case "add":
    await cmdInstall(rest[0], values);
    break;
  case "discover":
    await cmdDiscover(rest[0]);
    break;
  case "targets":
    await cmdTargets();
    break;
  default:
    // If no subcommand, treat the first positional as a repo path/url
    await cmdInstall(command, values);
}

function printUsage() {
  console.log(`
plugins - Install open-plugin format plugins into agent tools

Usage:
  plugins add <repo-path-or-url>          Install plugins from a repo
  plugins discover <repo-path-or-url>     Discover plugins in a repo
  plugins targets                         List available install targets
  plugins <repo-path-or-url>              Shorthand for add

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

  const repoPath = resolveSource(source);
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

  const repoPath = resolveSource(source);
  const plugins = await discover(repoPath);

  if (plugins.length === 0) {
    console.log("No plugins found.");
    return;
  }

  // Resolve targets — install to all detected targets unless --target is specified
  const targets = await getTargets();
  const detectedTargets = targets.filter((t) => t.detected);

  let installTargets: Target[];
  if (opts.target) {
    const found = targets.find((t) => t.id === opts.target);
    if (!found) {
      console.error(`Unknown target: ${opts.target}`);
      console.error(`Available: ${targets.map((t) => t.id).join(", ")}`);
      process.exit(1);
    }
    installTargets = [found];
  } else if (detectedTargets.length === 0) {
    console.error("No supported targets detected. Use --target to specify one.");
    process.exit(1);
  } else {
    installTargets = detectedTargets;
  }

  console.log(`Found ${plugins.length} plugin(s):\n`);
  for (const p of plugins) {
    printPlugin(p);
  }

  console.log(`Targets: ${installTargets.map((t) => t.name).join(", ")}`);
  console.log(`Scope: ${opts.scope ?? "user"}\n`);

  if (!opts.yes) {
    const response = await readLine("Install? [y/N] ");
    if (response.trim().toLowerCase() !== "y") {
      console.log("Aborted.");
      return;
    }
  }

  const scope = opts.scope ?? "user";
  for (const target of installTargets) {
    await installPlugins(plugins, target, scope, repoPath, source);
  }

  console.log("\nDone. Restart your agent tools to load the plugins.");
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

/**
 * Convert an SSH git URL to its HTTPS equivalent.
 * e.g. "git@github.com:vercel-labs/open-plugin.git" -> "https://github.com/vercel-labs/open-plugin.git"
 */
function sshToHttps(sshUrl: string): string | null {
  const m = sshUrl.match(/^git@([^:]+):(.+)$/);
  if (!m) return null;
  return `https://${m[1]}/${m[2]}`;
}

function resolveSource(source: string): string {
  // GitHub URL - clone to temp dir
  if (source.startsWith("https://") || source.startsWith("git@") || source.match(/^[\w-]+\/[\w.-]+$/)) {
    const url = source.match(/^[\w-]+\/[\w.-]+$/) ? `https://github.com/${source}` : source;
    const cacheDir = join(process.env.HOME ?? "~", ".cache", "plugins");
    mkdirSync(cacheDir, { recursive: true });
    // Derive a filesystem-safe directory name from the URL
    // e.g. "https://github.com/vercel-labs/open-plugin" -> "vercel-labs-open-plugin"
    //       "git@github.com:vercel-labs/open-plugin.git" -> "github.com-vercel-labs-open-plugin"
    const slug = url
      .replace(/^https?:\/\//, "")
      .replace(/^git@/, "")
      .replace(/\.git$/, "")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const tmpDir = join(cacheDir, slug);

    // Always do a fresh shallow clone — previous runs may have modified the tree
    // (e.g. generated .claude-plugin/), and shallow clones don't pull cleanly.
    if (existsSync(join(tmpDir, ".git", "HEAD"))) {
      rmSync(tmpDir, { recursive: true, force: true });
    }

    console.log(`Cloning ${url}...`);
    try {
      execSync(`git clone --depth 1 -q ${url} ${tmpDir}`, { stdio: "pipe" });
    } catch (err: any) {
      const stderr = err.stderr?.toString() ?? "";

      // SSH auth failure — retry over HTTPS so git credential helpers / browser
      // auth can kick in (works for private repos without SSH keys configured).
      if (url.startsWith("git@") && stderr.includes("Permission denied")) {
        const httpsUrl = sshToHttps(url);
        if (httpsUrl) {
          console.log(`SSH authentication failed. Retrying over HTTPS...`);
          console.log(`Cloning ${httpsUrl}...`);
          try {
            execSync(`git clone --depth 1 -q ${httpsUrl} ${tmpDir}`, { stdio: "inherit" });
            return tmpDir;
          } catch {
            // fall through to the error message below
          }
        }
      }

      // Clean up the failed clone directory
      if (existsSync(tmpDir)) {
        rmSync(tmpDir, { recursive: true, force: true });
      }

      if (stderr.includes("Permission denied") || stderr.includes("Could not read from remote repository")) {
        console.error(`\nError: Could not access ${url}`);
        console.error(`\nMake sure you have access to this repository. For private repos, try:`);
        console.error(`  - HTTPS: plugins add https://github.com/owner/repo`);
        console.error(`    (uses git credential helper / browser auth)`);
        console.error(`  - SSH:   plugins add git@github.com:owner/repo.git`);
        console.error(`    (requires SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh)`);
      } else if (stderr.includes("not found") || stderr.includes("does not exist") || err.status === 128) {
        console.error(`\nError: Repository not found: ${url}`);
        console.error(`Check that the URL is correct and the repository exists.`);
      } else {
        console.error(`\nError: git clone failed.`);
        if (stderr.trim()) console.error(stderr.trim());
      }
      process.exit(1);
    }
    return tmpDir;
  }

  // Local path
  return resolve(source);
}

function readLine(prompt: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
