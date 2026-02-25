/**
 * Target tool detection and configuration.
 *
 * Each target represents an agent tool that can consume plugins
 * (Claude Code, Cursor, OpenCode, etc.)
 */

import { join } from "path";
import { homedir } from "os";

export interface Target {
  id: string;
  name: string;
  description: string;
  /** Path to the tool's config directory */
  configPath: string;
  /** Whether the tool was detected on this system */
  detected: boolean;
}

const HOME = homedir();

const TARGET_DEFS: Omit<Target, "detected">[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic's CLI coding agent",
    configPath: join(HOME, ".claude"),
  },
  // Future targets can be added here:
  // {
  //   id: "cursor",
  //   name: "Cursor",
  //   description: "AI-powered code editor",
  //   configPath: join(HOME, ".cursor"),
  // },
  // {
  //   id: "opencode",
  //   name: "OpenCode",
  //   description: "Open-source coding agent",
  //   configPath: join(HOME, ".config", "opencode"),
  // },
];

/**
 * Detect which supported agent tools are installed.
 */
export async function getTargets(): Promise<Target[]> {
  const targets: Target[] = [];

  for (const def of TARGET_DEFS) {
    const detected = await detectTarget(def);
    targets.push({ ...def, detected });
  }

  return targets;
}

async function detectTarget(def: Omit<Target, "detected">): Promise<boolean> {
  switch (def.id) {
    case "claude-code":
      return detectClaudeCode();
    default:
      return false;
  }
}

async function detectClaudeCode(): Promise<boolean> {
  // Check if `claude` binary is available in PATH
  const { exitCode } = await Bun.$`which claude`.quiet().nothrow();
  return exitCode === 0;
}
