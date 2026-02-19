import { z } from "zod";
import type { PluginManifest } from "./types.js";

/**
 * Name constraints from the spec:
 * - 1-64 characters
 * - Lowercase alphanumeric, hyphens, and periods
 * - Must start and end with an alphanumeric character
 * - Must not contain consecutive hyphens (--) or consecutive periods (..)
 */
const namePattern = /^[a-z0-9]([a-z0-9]|[-.](?![-.])){0,62}[a-z0-9]$|^[a-z0-9]$/;

export const PluginNameSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(namePattern, "Must be lowercase alphanumeric with single hyphens/periods, not starting/ending with hyphen or period");

const AuthorSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  url: z.string().url().optional(),
}).optional();

const StringOrArray = z.union([z.string(), z.array(z.string())]);
const StringArrayOrObject = z.union([z.string(), z.array(z.string()), z.record(z.unknown())]);

/**
 * Zod schema for .plugin/plugin.json
 */
export const ManifestSchema = z.object({
  name: PluginNameSchema,
  version: z.string().optional(),
  description: z.string().optional(),
  author: AuthorSchema,
  homepage: z.string().url().optional(),
  repository: z.string().url().optional(),
  license: z.string().optional(),
  logo: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  commands: StringArrayOrObject.optional(),
  agents: StringArrayOrObject.optional(),
  skills: StringArrayOrObject.optional(),
  rules: StringArrayOrObject.optional(),
  hooks: StringArrayOrObject.optional(),
  mcpServers: StringArrayOrObject.optional(),
  lspServers: StringArrayOrObject.optional(),
  outputStyles: StringOrArray.optional(),
});

/**
 * Parse and validate a manifest JSON object.
 */
export function parseManifestObject(data: unknown): PluginManifest {
  return ManifestSchema.parse(data) as PluginManifest;
}

/**
 * Validate a plugin name.
 * Returns null if valid, or an error message if invalid.
 */
export function validateName(name: string): string | null {
  const result = PluginNameSchema.safeParse(name);
  if (result.success) return null;
  return result.error.issues[0]?.message ?? "Invalid name";
}
