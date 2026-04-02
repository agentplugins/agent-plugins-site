import { parseArgs } from "util";
import { resolve, join } from "path";
import { execSync } from "child_process";
import { existsSync, rmSync, mkdirSync } from "fs";
import { homedir } from "os";
import { createInterface } from "readline";
import { discover, type DiscoveredPlugin, type RemotePlugin } from "./lib/discover.js";
import { getTargets, type Target } from "./lib/targets.js";
import { installPlugins } from "./lib/install.js";
import { c, S, banner, header, footer, step, stepDone, stepActive, stepError, barLine, barEmpty, barDebug, error, multiSelect, setDebug, type MultiSelectOption } from "./lib/ui.js";
import { setVersion, track } from "./lib/telemetry.js";

setVersion("1.0.1");

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    help: { type: "boolean", short: "h" },
    target: { type: "string", short: "t" },
    scope: { type: "string", short: "s", default: "user" },
    yes: { type: "boolean", short: "y" },
    remote: { type: "boolean" },
    debug: { type: "boolean" },
  },
  allowPositionals: true,
  strict: true,
});

const [command, ...rest] = positionals;

if (values.debug) setDebug(true);

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
  ${c.yellow("--remote")}                Include remote-source plugins in output
  ${c.yellow("--debug")}                 Show verbose installation output
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
  const { plugins, remotePlugins, missingPaths } = await discover(repoPath);

  if (plugins.length === 0 && remotePlugins.length === 0) {
    barEmpty();
    step("No plugins found.");
    footer();
    return;
  }

  if (plugins.length > 0) {
    barEmpty();
    step(`Found ${c.bold(String(plugins.length))} local plugin(s)`);
    barEmpty();
    printPluginTable(plugins);
  }

  if (remotePlugins.length > 0) {
    if (values.remote) {
      barEmpty();
      step(`${c.bold(String(remotePlugins.length))} remote plugin(s) ${c.dim("(hosted in external repos)")}`);
      barEmpty();
      printRemotePluginTable(remotePlugins);
    } else {
      barEmpty();
      barLine(
        c.dim(`${remotePlugins.length} remote plugin(s) not shown. Run:`),
      );
      barLine(`  ${c.cyan(`npx plugins discover ${source} --remote`)}`);
    }
    printMissingPaths(missingPaths);
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
  const { plugins, remotePlugins, missingPaths } = await discover(repoPath);

  if (plugins.length === 0) {
    barEmpty();
    step("No plugins found.");
    if (remotePlugins.length > 0) {
      barLine(
        c.dim(`${remotePlugins.length} remote plugin(s) not shown. Run:`),
      );
      barLine(`  ${c.cyan(`npx plugins discover ${source} --remote`)}`);
      printMissingPaths(missingPaths);
    }
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
    if (!found.detected) {
      barEmpty();
      barLine(c.yellow(`Warning: ${found.name} was not detected on this system.`));
    }
    installTargets = [found];
  } else if (detectedTargets.length === 0) {
    barEmpty();
    stepError("No supported targets detected.");
    barLine(c.dim("Neither 'claude', 'cursor', nor 'codex' binaries were found on PATH."));
    barLine(c.dim("Use --target to specify one manually."));
    footer();
    process.exit(1);
  } else {
    installTargets = detectedTargets;
  }

  barEmpty();

  // Single plugin or --yes: skip selection, install all
  let selectedPlugins: DiscoveredPlugin[];

  if (plugins.length === 1 || opts.yes) {
    step(`Found ${c.bold(String(plugins.length))} plugin(s)`);
    barEmpty();
    printPluginTable(plugins);

    if (remotePlugins.length > 0) {
      barEmpty();
      barLine(
        c.dim(`+ ${remotePlugins.length} remote plugin(s) not included. Run:`),
      );
      barLine(`  ${c.cyan(`npx plugins discover ${source} --remote`)}`);
      printMissingPaths(missingPaths);
    }

    barEmpty();
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

    selectedPlugins = plugins;
  } else {
    // Multiple plugins: interactive multi-select
    step(`Found ${c.bold(String(plugins.length))} plugin(s)`);
    barEmpty();

    const options: MultiSelectOption[] = plugins.map((p) => {
      const parts = pluginComponents(p);
      const hint = parts.length ? parts.join(", ") : undefined;
      return { label: p.name, value: p.name, hint };
    });

    const selected = await multiSelect("Select plugins to install", options);

    if (!selected || selected.length === 0) {
      step("Aborted.");
      footer();
      return;
    }

    selectedPlugins = plugins.filter((p) => selected.includes(p.name));

    if (remotePlugins.length > 0) {
      barLine(
        c.dim(`+ ${remotePlugins.length} remote plugin(s) not included. Run:`),
      );
      barLine(`  ${c.cyan(`npx plugins discover ${source} --remote`)}`);
      printMissingPaths(missingPaths);
    }

    barEmpty();
    barLine(`${c.dim("Targets:")}  ${installTargets.map((t) => c.cyan(t.name)).join(c.dim(", "))}`);
    barLine(`${c.dim("Scope:")}    ${c.cyan(opts.scope ?? "user")}`);
    barEmpty();
  }

  const scope = opts.scope ?? "user";
  for (const target of installTargets) {
    await installPlugins(selectedPlugins, target, scope, repoPath, source);
  }

  track({
    event: "install",
    source,
    plugins: selectedPlugins.map((p) => p.name).join(","),
    pluginCount: String(selectedPlugins.length),
    targets: installTargets.map((t) => t.id).join(","),
    scope,
  });

  barEmpty();
  stepDone(c.green("Done.") + "  Restart your agent tools to load the plugins.");
  footer();
}

function pluginComponents(p: DiscoveredPlugin): string[] {
  const parts: string[] = [];
  if (p.skills.length) parts.push(`${p.skills.length} ${p.skills.length === 1 ? "skill" : "skills"}`);
  if (p.commands.length) parts.push(`${p.commands.length} ${p.commands.length === 1 ? "cmd" : "cmds"}`);
  if (p.agents.length) parts.push(`${p.agents.length} ${p.agents.length === 1 ? "agent" : "agents"}`);
  if (p.rules.length) parts.push(`${p.rules.length} ${p.rules.length === 1 ? "rule" : "rules"}`);
  if (p.hasHooks) parts.push("hooks");
  if (p.hasMcp) parts.push("mcp");
  if (p.hasLsp) parts.push("lsp");
  return parts;
}

function printPluginTable(plugins: DiscoveredPlugin[]) {
  const nameWidth = Math.max(...plugins.map((p) => p.name.length), 4);
  // Pre-compute component strings to measure width (plain text, no ANSI)
  const compStrs = plugins.map((p) => pluginComponents(p).join(", "));
  const compWidth = Math.max(...compStrs.map((s) => s.length), 0);
  const termWidth = process.stdout.columns || 80;
  // bar(1) + spacing(2) + name + gap(2) + comp + gap(2) + desc
  const descWidth = Math.max(termWidth - 3 - nameWidth - 2 - compWidth - 2, 20);

  for (let i = 0; i < plugins.length; i++) {
    const p = plugins[i]!;
    const name = p.name.padEnd(nameWidth);
    const comp = compStrs[i]!;
    const desc = truncate(p.description ?? "", descWidth);

    barLine(`${c.bold(name)}  ${comp ? c.cyan(comp.padEnd(compWidth)) : " ".repeat(compWidth)}  ${c.dim(desc)}`);
  }
}

function printRemotePluginTable(plugins: RemotePlugin[]) {
  const nameWidth = Math.max(...plugins.map((p) => p.name.length), 4);
  const termWidth = process.stdout.columns || 80;
  const descWidth = Math.max(termWidth - 3 - nameWidth - 2, 20);

  for (const p of plugins) {
    const name = p.name.padEnd(nameWidth);
    const desc = truncate(p.description ?? "", descWidth);
    barLine(`${c.bold(name)}  ${c.dim(desc)}`);
  }
}

function printMissingPaths(paths: string[]) {
  if (paths.length === 0) return;
  for (const p of paths) {
    barLine(c.dim(`  source not found: ${p}`));
  }
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "\u2026";
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
    const cacheDir = join(homedir(), ".cache", "plugins");
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
      execSync(`git clone --depth 1 -q "${url}" "${tmpDir}"`, { stdio: "pipe" });
    } catch (err: any) {
      const stderr = err.stderr?.toString() ?? "";

      if (url.startsWith("git@") && stderr.includes("Permission denied")) {
        const httpsUrl = sshToHttps(url);
        if (httpsUrl) {
          barLine(c.yellow("SSH authentication failed. Retrying over HTTPS..."));
          step(`Source: ${c.dim(httpsUrl)}`);
          barEmpty();
          try {
            execSync(`git clone --depth 1 -q "${httpsUrl}" "${tmpDir}"`, { stdio: "inherit" });
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
    let answered = false;
    rl.on("close", () => {
      if (!answered) {
        // Ctrl+C or EOF — exit cleanly without the unsettled await warning
        process.stdout.write("\n");
        process.exit(0);
      }
    });
    rl.question(prompt, (answer) => {
      answered = true;
      rl.close();
      // Ensure newline after answer (piped stdin may not echo one)
      if (!process.stdin.isTTY) process.stdout.write("\n");
      resolve(answer);
    });
  });
}
