/**
 * Target tool detection and configuration.
 *
 * Each target represents an agent tool that can consume plugins
 * (Claude Code, Cursor, OpenCode, etc.)
 */

import { join } from "path";
import { homedir } from "os";
import { execSync } from "child_process";

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
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-powered code editor",
    configPath: join(HOME, ".cursor"),
  },
  // Future targets can be added here:
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
    const detected = detectTarget(def);
    targets.push({ ...def, detected });
  }

  return targets;
}

function detectTarget(def: Omit<Target, "detected">): boolean {
  switch (def.id) {
    case "claude-code":
      return detectBinary("claude");
    case "cursor":
      // Cursor reads "Imported" plugins from the Claude Code plugin cache.
      // The claude CLI is preferred but not required — we can write directly
      // to the cache directory when it's unavailable.
      return detectBinary("cursor");
    default:
      return false;
  }
}

function detectBinary(name: string): boolean {
  try {
    execSync(`which ${name}`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}
