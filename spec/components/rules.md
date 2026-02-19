# Rules

**Component of the [Open Plugin Specification](../specification.md)**

Rules provide persistent AI guidance — coding standards, best practices, and constraints that the agent follows throughout a session. Unlike skills (which activate on demand), rules are always present in the agent's context.

## File Format

Rule files are markdown with YAML frontmatter, using the `.mdc` extension.

```markdown
---
description: Prefer const over let. Never use var.
alwaysApply: true
globs: "**/*.{js,ts,jsx,tsx}"
---

Always use `const` for variables that are never reassigned. Use `let` only when reassignment is necessary. Never use `var`.

When reviewing or writing code:
- Default to `const`
- Only switch to `let` if you need to reassign the variable
- If you see `var`, replace it with `const` or `let`
```

## Frontmatter Schema

| Field | Required | Type | Description |
|---|---|---|---|
| `description` | Yes | string | Brief description of what the rule enforces. Used for display and for the agent to understand the rule's purpose. |
| `alwaysApply` | No | boolean | If `true`, the rule is active for all files in all sessions. If `false` or omitted, the rule is available but the agent or user decides when to apply it. Defaults to `false`. |
| `globs` | No | string \| string[] | File glob patterns the rule applies to (e.g., `"**/*.ts"`, `["**/*.py", "**/*.pyi"]`). When specified, the rule is only active when working with matching files. |

### Activation Modes

Rules can operate in three modes, determined by the `alwaysApply` and `globs` fields:

| `alwaysApply` | `globs` | Behavior |
|---|---|---|
| `true` | not set | Rule applies to everything, always active |
| `true` | set | Rule always active but only when working with matching files |
| `false` / omitted | not set | Rule is available; agent or user decides when to apply it |
| `false` / omitted | set | Rule is available for matching files; agent or user decides |

Tools MAY present non-`alwaysApply` rules to users as toggleable options (e.g., "Always", "Agent Decides", "Manual").

## Body Content

The markdown body after the frontmatter contains the rule text. This is injected into the agent's context when the rule is active.

Rules SHOULD be concise. Unlike skills (which can be longer and load on demand), rules may be present in context for the entire session. Keep rule bodies under 500 tokens.

Good rules are:
- **Specific**: "Use `const` by default, `let` only for reassignment, never `var`"
- **Actionable**: Tell the agent what to do, not just what to avoid
- **Scoped**: Use `globs` to limit rules to relevant file types

## Location

Rule files MUST be placed in the `rules/` directory at the plugin root:

```
my-plugin/
└── rules/
    ├── prefer-const.mdc
    ├── error-handling.mdc
    └── naming-conventions.mdc
```

Additional rule file locations MAY be specified in the manifest's `rules` field.

## Discovery

Tools MUST discover rules by scanning for `.mdc` files in:
1. `rules/` at the plugin root
2. Any additional paths declared in the manifest's `rules` field

Tools MAY additionally discover `.md` and `.markdown` files in these locations.

The filename (without extension) is used as the rule identifier for display and management purposes.

## Namespacing

Rules are namespaced with the plugin name:

| Plugin Name | Rule File | Namespaced Name |
|---|---|---|
| `code-standards` | `rules/prefer-const.mdc` | `code-standards:prefer-const` |

## Integration Behavior

- Rules with `alwaysApply: true` SHOULD be loaded into the agent's context automatically when the plugin is enabled.
- Rules with `alwaysApply: false` (or omitted) SHOULD be available for the agent or user to activate.
- When `globs` is specified, rules SHOULD only be active when the agent is working with files that match the pattern.
- Tools that do not support rules MUST ignore the `rules/` directory and any `rules` manifest field. The plugin loads normally with rules omitted.

## Relationship to Other Configuration

Rules in plugins serve the same purpose as tool-specific configuration files (e.g., `CLAUDE.md` for Claude Code, `.cursorrules` for Cursor). Plugin rules are additive — they work alongside any project-level or user-level rules the tool already supports.

If a plugin rule conflicts with a project-level rule, the tool's existing precedence rules apply. This spec does not define rule conflict resolution.
