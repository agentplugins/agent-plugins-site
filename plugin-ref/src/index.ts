/**
 * plugin-ref — Reference library for the Open Plugin specification.
 *
 * @example
 * ```typescript
 * import { validate, inspect, parseManifest } from "plugin-ref";
 *
 * const problems = await validate("./my-plugin");
 * const info = await inspect("./my-plugin");
 * const manifest = await parseManifest("./my-plugin");
 * ```
 */

export { validate } from "./validator.js";
export { inspect, parseManifest } from "./parser.js";
export { parseManifestObject, validateName, ManifestSchema, PluginNameSchema } from "./manifest.js";
export type {
  PluginManifest,
  HookConfig,
  HookRule,
  HookAction,
  CommandHookAction,
  PromptHookAction,
  AgentHookAction,
  MCPConfig,
  MCPServerEntry,
  LSPConfig,
  LSPServerEntry,
  SkillMetadata,
  AgentMetadata,
  CommandMetadata,
  RuleMetadata,
  PluginInfo,
  DiscoveredSkill,
  DiscoveredCommand,
  DiscoveredAgent,
  DiscoveredRule,
  ValidationProblem,
} from "./types.js";
