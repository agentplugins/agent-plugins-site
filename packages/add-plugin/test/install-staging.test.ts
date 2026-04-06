import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import type { DiscoveredPlugin } from "../lib/discover.js";
import { preparePluginDirForVendor, stageInstallWorkspace } from "../lib/install.js";

function createPlugin(repoPath: string, pluginPath: string): DiscoveredPlugin {
  return {
    name: "claude-hooks",
    version: "1.0.0",
    description: "Regression test fixture",
    path: pluginPath,
    marketplace: undefined,
    skills: [],
    commands: [],
    agents: [],
    rules: [],
    hasHooks: true,
    hasMcp: false,
    hasLsp: false,
    manifest: null,
    explicitSkillPaths: undefined,
    marketplaceEntry: undefined,
  };
}

test("staged installs isolate plugin-root rewrites per target", async () => {
  const root = await mkdtemp(join(tmpdir(), "add-plugin-install-test-"));

  try {
    const repoPath = join(root, "repo");
    const pluginPath = join(repoPath, "plugins", "claude-hooks");
    const hooksPath = join(pluginPath, "hooks", "hooks.json");

    await mkdir(join(pluginPath, ".plugin"), { recursive: true });
    await mkdir(join(pluginPath, "hooks"), { recursive: true });

    await writeFile(
      join(pluginPath, ".plugin", "plugin.json"),
      JSON.stringify(
        {
          name: "claude-hooks",
          version: "1.0.0",
          description: "Regression test fixture",
        },
        null,
        2,
      ),
    );

    await writeFile(
      hooksPath,
      JSON.stringify(
        {
          hooks: {
            SessionStart: [
              {
                hooks: [
                  {
                    type: "command",
                    command: "${PLUGIN_ROOT}/hooks/inject-claude-md.mjs",
                  },
                ],
              },
            ],
          },
        },
        null,
        2,
      ),
    );

    const plugin = createPlugin(repoPath, pluginPath);
    const stagingBase = join(root, "staging");

    const claudeWorkspace = await stageInstallWorkspace([plugin], repoPath, "claude-code", stagingBase);
    const codexWorkspace = await stageInstallWorkspace([plugin], repoPath, "codex", stagingBase);

    await preparePluginDirForVendor(
      claudeWorkspace.plugins[0]!,
      ".claude-plugin",
      "CLAUDE_PLUGIN_ROOT",
    );
    await preparePluginDirForVendor(
      codexWorkspace.plugins[0]!,
      ".codex-plugin",
      "CODEX_PLUGIN_ROOT",
    );

    const originalHooks = await readFile(hooksPath, "utf-8");
    const claudeHooks = await readFile(
      join(claudeWorkspace.plugins[0]!.path, "hooks", "hooks.json"),
      "utf-8",
    );
    const codexHooks = await readFile(
      join(codexWorkspace.plugins[0]!.path, "hooks", "hooks.json"),
      "utf-8",
    );

    assert.match(originalHooks, /\$\{PLUGIN_ROOT\}/);
    assert.doesNotMatch(originalHooks, /\$\{CLAUDE_PLUGIN_ROOT\}|\$\{CODEX_PLUGIN_ROOT\}/);

    assert.match(claudeHooks, /\$\{CLAUDE_PLUGIN_ROOT\}/);
    assert.doesNotMatch(claudeHooks, /\$\{CODEX_PLUGIN_ROOT\}/);

    assert.match(codexHooks, /\$\{CODEX_PLUGIN_ROOT\}/);
    assert.doesNotMatch(codexHooks, /\$\{CLAUDE_PLUGIN_ROOT\}/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
