import { parseArgs } from "util";
import { resolve, join } from "path";
import { execSync } from "child_process";
import { existsSync, rmSync, mkdirSync } from "fs";
import { createInterface } from "readline";
import { discover, type DiscoveredPlugin } from "./lib/discover.js";
import { getTargets, type Target } from "./lib/targets.js";
import { installPlugins } from "./lib/install.js";
import { c, S, banner, header, footer, step, stepDone, stepActive, stepError, barLine, barEmpty, error } from "./lib/ui.js";
import { setVersion, track } from "./lib/telemetry.js";

setVersion("1.0.1");

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
${c.bold("plugins")} — Install open-plugin format plugins into agent tools

${c.dim("Usage:")}
  ${c.cyan("plugins add")} <repo-path-or-url>          Install plugins from a repo
  ${c.cyan("plugins discover")} <repo-path-or-url>     Discover plugins in a repo
  ${c.cyan("plugins targets")}                         List available install targets
  ${c.cyan("plugins")} <repo-path-or-url>              Shorthand for add

${c.dim("Options:")}
  ${c.yellow("-t, --target")} <target>   Target tool (e.g. claude-code). Default: auto-detect
  ${c.yellow("-s, --scope")} <scope>     Install scope: user, project, local. Default: user
  ${c.yellow("-y, --yes")}               Skip confirmation prompts
  ${c.yellow("-h, --help")}              Show this help
`);
}

async function cmdDiscover(source?: string) {
  if (!source) {
    error("Provide a repo path or URL");
    process.exit(1);
  }

  banner();
  header("plugins");

  const repoPath = resolveSource(source);
  const plugins = await discover(repoPath);

  if (plugins.length === 0) {
    barEmpty();
    step("No plugins found.");
    footer();
    return;
  }

  barEmpty();
  step(`Found ${c.bold(String(plugins.length))} plugin(s) in ${c.dim(source)}`);
  barEmpty();
  for (const p of plugins) {
    printPlugin(p);
  }

  footer();
}

async function cmdTargets() {
  const targets = await getTargets();

  banner();
  header("plugins");

  if (targets.length === 0) {
    barEmpty();
    step("No supported targets detected.");
    footer();
    return;
  }

  barEmpty();
  step("Available install targets");
  barEmpty();

  for (const t of targets) {
    barLine(`  ${c.bold(t.name)}`);
    barLine(`  ${c.dim(t.description)}`);
    barLine(`  Config: ${c.dim(t.configPath)}`);
    barLine(`  Status: ${t.detected ? c.green("detected") : c.dim("not found")}`);
    barEmpty();
  }

  footer();
}

async function cmdInstall(source: string | undefined, opts: typeof values) {
  if (!source) {
    error("Provide a repo path or URL");
    process.exit(1);
  }

  banner();
  header("plugins");

  const repoPath = resolveSource(source);
  const plugins = await discover(repoPath);

  if (plugins.length === 0) {
    barEmpty();
    step("No plugins found.");
    footer();
    return;
  }

  // Resolve targets
  const targets = await getTargets();
  const detectedTargets = targets.filter((t) => t.detected);

  let installTargets: Target[];
  if (opts.target) {
    const found = targets.find((t) => t.id === opts.target);
    if (!found) {
      barEmpty();
      stepError(`Unknown target: ${c.bold(opts.target!)}`);
      barLine(c.dim(`Available: ${targets.map((t) => t.id).join(", ")}`));
      footer();
      process.exit(1);
    }
    installTargets = [found];
  } else if (detectedTargets.length === 0) {
    barEmpty();
    stepError("No supported targets detected.");
    barLine(c.dim("Use --target to specify one."));
    footer();
    process.exit(1);
  } else {
    installTargets = detectedTargets;
  }

  barEmpty();
  step(`Found ${c.bold(String(plugins.length))} plugin(s)`);
  barEmpty();

  for (const p of plugins) {
    printPlugin(p);
  }

  barLine(`${c.dim("Targets:")}  ${installTargets.map((t) => c.cyan(t.name)).join(c.dim(", "))}`);
  barLine(`${c.dim("Scope:")}    ${c.cyan(opts.scope ?? "user")}`);
  barEmpty();

  if (!opts.yes) {
    const response = await readLine(`${c.cyan(S.stepActive)}  Install? ${c.dim("[Y/n]")} `);
    if (response.trim().toLowerCase() === "n") {
      step("Aborted.");
      footer();
      return;
    }
  }

  const scope = opts.scope ?? "user";
  for (const target of installTargets) {
    await installPlugins(plugins, target, scope, repoPath, source);
  }

  track({
    event: "install",
    source,
    plugins: plugins.map((p) => p.name).join(","),
    pluginCount: String(plugins.length),
    targets: installTargets.map((t) => t.id).join(","),
    scope,
  });

  barEmpty();
  stepDone(c.green("Done.") + "  Restart your agent tools to load the plugins.");
  footer();
}

function printPlugin(p: DiscoveredPlugin) {
  barLine(`${c.bold(p.name)} ${p.version ? c.dim(`(v${p.version})`) : ""}`);
  if (p.description) barLine(`${c.dim(p.description)}`);
  const parts: string[] = [];
  if (p.skills.length) parts.push(`${p.skills.length} skill(s)`);
  if (p.commands.length) parts.push(`${p.commands.length} command(s)`);
  if (p.agents.length) parts.push(`${p.agents.length} agent(s)`);
  if (p.rules.length) parts.push(`${p.rules.length} rule(s)`);
  if (p.hasHooks) parts.push("hooks");
  if (p.hasMcp) parts.push("MCP servers");
  if (p.hasLsp) parts.push("LSP servers");
  if (parts.length) barLine(`${c.dim("Components:")} ${parts.join(c.dim(", "))}`);
  barEmpty();
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
    const slug = url
      .replace(/^https?:\/\//, "")
      .replace(/^git@/, "")
      .replace(/\.git$/, "")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const tmpDir = join(cacheDir, slug);

    if (existsSync(join(tmpDir, ".git", "HEAD"))) {
      rmSync(tmpDir, { recursive: true, force: true });
    }

    step(`Source: ${c.dim(url)}`);
    barEmpty();

    try {
      execSync(`git clone --depth 1 -q ${url} ${tmpDir}`, { stdio: "pipe" });
    } catch (err: any) {
      const stderr = err.stderr?.toString() ?? "";

      if (url.startsWith("git@") && stderr.includes("Permission denied")) {
        const httpsUrl = sshToHttps(url);
        if (httpsUrl) {
          barLine(c.yellow("SSH authentication failed. Retrying over HTTPS..."));
          step(`Source: ${c.dim(httpsUrl)}`);
          barEmpty();
          try {
            execSync(`git clone --depth 1 -q ${httpsUrl} ${tmpDir}`, { stdio: "inherit" });
            stepDone("Repository cloned");
            barEmpty();
            return tmpDir;
          } catch {
            // fall through to the error message below
          }
        }
      }

      if (existsSync(tmpDir)) {
        rmSync(tmpDir, { recursive: true, force: true });
      }

      if (stderr.includes("Permission denied") || stderr.includes("Could not read from remote repository")) {
        barEmpty();
        stepError(`Could not access ${c.bold(url)}`);
        barEmpty();
        barLine(c.dim("Make sure you have access to this repository. For private repos, try:"));
        barLine(`  ${c.dim("HTTPS:")} plugins add https://github.com/owner/repo`);
        barLine(`  ${c.dim("       (uses git credential helper / browser auth)")}`);
        barLine(`  ${c.dim("SSH:")}   plugins add git@github.com:owner/repo.git`);
        barLine(`  ${c.dim("       (requires SSH keys)")}`);
      } else if (stderr.includes("not found") || stderr.includes("does not exist") || err.status === 128) {
        barEmpty();
        stepError(`Repository not found: ${c.bold(url)}`);
        barLine(c.dim("Check that the URL is correct and the repository exists."));
      } else {
        barEmpty();
        stepError("git clone failed.");
        if (stderr.trim()) barLine(c.dim(stderr.trim()));
      }
      footer();
      process.exit(1);
    }

    stepDone("Repository cloned");
    barEmpty();
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
      // Ensure newline after answer (piped stdin may not echo one)
      if (!process.stdin.isTTY) process.stdout.write("\n");
      resolve(answer);
    });
  });
}
