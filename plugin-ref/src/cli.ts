#!/usr/bin/env node

import * as fs from "node:fs/promises";
import * as path from "node:path";
import { validate } from "./validator.js";
import { inspect } from "./parser.js";

const HELP = `plugin-ref — Open Plugin reference library

Usage:
  plugin-ref validate <path>     Validate a plugin directory
  plugin-ref inspect <path>      Inspect discovered components
  plugin-ref scaffold <name>     Create a new plugin skeleton
  plugin-ref help                Show this help message

Examples:
  plugin-ref validate ./my-plugin
  plugin-ref inspect ./my-plugin
  plugin-ref scaffold my-new-plugin
`;

async function main() {
  const [command, arg] = process.argv.slice(2);

  if (!command || command === "help" || command === "--help" || command === "-h") {
    console.log(HELP);
    process.exit(0);
  }

  switch (command) {
    case "validate":
      await runValidate(arg);
      break;
    case "inspect":
      await runInspect(arg);
      break;
    case "scaffold":
      await runScaffold(arg);
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(HELP);
      process.exit(1);
  }
}

async function runValidate(pluginPath?: string) {
  if (!pluginPath) {
    console.error("Usage: plugin-ref validate <path>");
    process.exit(1);
  }

  const problems = await validate(pluginPath);

  if (problems.length === 0) {
    console.log("Valid plugin.");
    return;
  }

  for (const p of problems) {
    const prefix = p.level === "error" ? "ERROR" : "WARN ";
    const location = p.path ? ` (${p.path})` : "";
    console.log(`  ${prefix}  ${p.message}${location}`);
  }

  const errors = problems.filter((p) => p.level === "error");
  const warnings = problems.filter((p) => p.level === "warning");
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);

  if (errors.length > 0) process.exit(1);
}

async function runInspect(pluginPath?: string) {
  if (!pluginPath) {
    console.error("Usage: plugin-ref inspect <path>");
    process.exit(1);
  }

  const info = await inspect(pluginPath);

  console.log(`Plugin: ${info.name}`);
  if (info.manifest?.version) console.log(`Version: ${info.manifest.version}`);
  if (info.manifest?.description) console.log(`Description: ${info.manifest.description}`);
  console.log();

  if (info.skills.length > 0) {
    console.log(`Skills (${info.skills.length}):`);
    for (const s of info.skills) {
      console.log(`  ${info.name}:${s.name} — ${s.description || "(no description)"}`);
    }
    console.log();
  }

  if (info.commands.length > 0) {
    console.log(`Commands (${info.commands.length}):`);
    for (const c of info.commands) {
      console.log(`  /${info.name}:${c.name} — ${c.description || "(no description)"}`);
    }
    console.log();
  }

  if (info.agents.length > 0) {
    console.log(`Agents (${info.agents.length}):`);
    for (const a of info.agents) {
      console.log(`  ${info.name}:${a.name} — ${a.description || "(no description)"}`);
    }
    console.log();
  }

  if (info.rules.length > 0) {
    console.log(`Rules (${info.rules.length}):`);
    for (const r of info.rules) {
      const mode = r.alwaysApply ? "always" : "on-demand";
      const globs = r.globs ? ` [${Array.isArray(r.globs) ? r.globs.join(", ") : r.globs}]` : "";
      console.log(`  ${info.name}:${r.name} (${mode})${globs} — ${r.description || "(no description)"}`);
    }
    console.log();
  }

  if (info.hooks.length > 0) {
    console.log(`Hook rules: ${info.hooks.length}`);
    console.log();
  }

  const mcpCount = Object.keys(info.mcpServers).length;
  if (mcpCount > 0) {
    console.log(`MCP Servers (${mcpCount}):`);
    for (const [name, server] of Object.entries(info.mcpServers)) {
      console.log(`  ${name} — ${server.command} ${(server.args ?? []).join(" ")}`);
    }
    console.log();
  }

  const lspCount = Object.keys(info.lspServers).length;
  if (lspCount > 0) {
    console.log(`LSP Servers (${lspCount}):`);
    for (const [name, server] of Object.entries(info.lspServers)) {
      const exts = Object.keys(server.extensionToLanguage).join(", ");
      console.log(`  ${name} — ${server.command} (${exts})`);
    }
    console.log();
  }
}

async function runScaffold(name?: string) {
  if (!name) {
    console.error("Usage: plugin-ref scaffold <name>");
    process.exit(1);
  }

  const pluginDir = path.resolve(name);
  const pluginName = path.basename(pluginDir);

  // Create directory structure
  await fs.mkdir(path.join(pluginDir, ".plugin"), { recursive: true });
  await fs.mkdir(path.join(pluginDir, "skills", "hello"), { recursive: true });
  await fs.mkdir(path.join(pluginDir, "agents"), { recursive: true });
  await fs.mkdir(path.join(pluginDir, "rules"), { recursive: true });
  await fs.mkdir(path.join(pluginDir, "hooks"), { recursive: true });
  await fs.mkdir(path.join(pluginDir, "scripts"), { recursive: true });

  // Write manifest
  await fs.writeFile(
    path.join(pluginDir, ".plugin", "plugin.json"),
    JSON.stringify(
      {
        name: pluginName,
        description: `The ${pluginName} plugin`,
        version: "1.0.0",
        author: { name: "Your Name" },
      },
      null,
      2,
    ) + "\n",
  );

  // Write a starter skill
  await fs.writeFile(
    path.join(pluginDir, "skills", "hello", "SKILL.md"),
    `---
name: hello
description: Greet the user with a friendly message.
---

Greet the user warmly and ask how you can help them today.
`,
  );

  // Write an empty hooks config
  await fs.writeFile(
    path.join(pluginDir, "hooks", "hooks.json"),
    JSON.stringify({ hooks: {} }, null, 2) + "\n",
  );

  console.log(`Created plugin at ${pluginDir}/`);
  console.log();
  console.log("  .plugin/plugin.json     — manifest");
  console.log("  skills/hello/SKILL.md   — starter skill");
  console.log("  agents/                 — add agent .md files here");
  console.log("  rules/                  — add rule .mdc files here");
  console.log("  hooks/hooks.json        — hook configuration");
  console.log("  scripts/                — hook scripts");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
