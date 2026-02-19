import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ManifestSchema, PluginNameSchema } from "./manifest.js";
import { inspect } from "./parser.js";
import type { ValidationProblem } from "./types.js";

/**
 * Validate a plugin directory against the Open Plugin specification.
 * Returns an array of problems (empty if the plugin is valid).
 */
export async function validate(pluginPath: string): Promise<ValidationProblem[]> {
  const problems: ValidationProblem[] = [];
  const resolvedPath = path.resolve(pluginPath);

  // Check directory exists
  try {
    const stat = await fs.stat(resolvedPath);
    if (!stat.isDirectory()) {
      problems.push({ level: "error", message: "Path is not a directory", path: resolvedPath });
      return problems;
    }
  } catch {
    problems.push({ level: "error", message: "Path does not exist", path: resolvedPath });
    return problems;
  }

  // Validate manifest if present
  const manifestPath = path.join(resolvedPath, ".plugin", "plugin.json");
  try {
    const content = await fs.readFile(manifestPath, "utf-8");
    let data: unknown;
    try {
      data = JSON.parse(content);
    } catch (err) {
      problems.push({
        level: "error",
        message: `Invalid JSON in plugin.json: ${err instanceof Error ? err.message : String(err)}`,
        path: manifestPath,
      });
      return problems;
    }

    const result = ManifestSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        problems.push({
          level: "error",
          message: `Manifest: ${issue.path.join(".")}: ${issue.message}`,
          path: manifestPath,
        });
      }
    }
  } catch (err: unknown) {
    if (isNodeError(err) && err.code === "ENOENT") {
      // No manifest is fine — check if directory name is a valid plugin name
      const dirName = path.basename(resolvedPath);
      const nameResult = PluginNameSchema.safeParse(dirName);
      if (!nameResult.success) {
        problems.push({
          level: "warning",
          message: `No manifest found. Directory name "${dirName}" is not a valid plugin name.`,
          path: resolvedPath,
        });
      }
    } else {
      throw err;
    }
  }

  // Check for misplaced components inside .plugin/
  const misplacedDirs = ["commands", "agents", "skills", "rules", "hooks"];
  for (const dir of misplacedDirs) {
    const badPath = path.join(resolvedPath, ".plugin", dir);
    try {
      await fs.access(badPath);
      problems.push({
        level: "error",
        message: `"${dir}/" is inside .plugin/ — it must be at the plugin root.`,
        path: badPath,
      });
    } catch {
      // Good — not there
    }
  }

  // Discover components and check for issues
  const info = await inspect(resolvedPath);

  // Check skill name matches directory name
  for (const skill of info.skills) {
    const dirName = path.basename(path.dirname(skill.path));
    // Skip root SKILL.md check (parent dir is plugin root, not skills/)
    if (path.dirname(skill.path) === resolvedPath) continue;
    if (skill.name !== dirName) {
      problems.push({
        level: "warning",
        message: `Skill name "${skill.name}" does not match directory name "${dirName}".`,
        path: skill.path,
      });
    }
    if (!skill.description) {
      problems.push({
        level: "warning",
        message: `Skill "${skill.name}" has no description.`,
        path: skill.path,
      });
    }
  }

  // Check agent files have required frontmatter
  const agentsDir = path.join(resolvedPath, "agents");
  try {
    const entries = await fs.readdir(agentsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !/\.(md|mdc|markdown)$/.test(entry.name)) continue;
      const filePath = path.join(agentsDir, entry.name);
      const found = info.agents.find((a) => a.path === filePath);
      if (!found) {
        problems.push({
          level: "warning",
          message: `Agent file "${entry.name}" is missing required frontmatter (name and description).`,
          path: filePath,
        });
      }
    }
  } catch {
    // No agents dir, that's fine
  }

  // Check rules have descriptions
  for (const rule of info.rules) {
    if (!rule.description) {
      problems.push({
        level: "warning",
        message: `Rule "${rule.name}" has no description.`,
        path: rule.path,
      });
    }
  }

  // Warn if no components found at all
  const totalComponents =
    info.skills.length +
    info.commands.length +
    info.agents.length +
    info.rules.length +
    info.hooks.length +
    Object.keys(info.mcpServers).length +
    Object.keys(info.lspServers).length;

  if (totalComponents === 0) {
    problems.push({
      level: "warning",
      message: "No components discovered. Plugin has no skills, commands, agents, rules, hooks, MCP servers, or LSP servers.",
      path: resolvedPath,
    });
  }

  return problems;
}

function isNodeError(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && "code" in err;
}
