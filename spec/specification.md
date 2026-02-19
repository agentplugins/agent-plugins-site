# Open Plugin Specification

**Spec Version: 1.0.0**

This document defines the Open Plugin format — a standard for packaging agent extensions into distributable units.

## Overview

A **plugin** is a self-contained directory that bundles one or more components — skills, agents, rules, hooks, MCP servers, and LSP servers — into a single unit that agent tools can discover, install, and run.

Plugins solve the distribution problem: instead of manually configuring individual skills, hooks, and servers, authors package them together with a manifest and users install them in one step.

## Plugin Directory Structure

A plugin is a directory. At minimum, it contains one or more components in their default locations. An optional manifest provides metadata and custom component paths.

### Standard Layout

```
my-plugin/
├── .plugin/                  # Metadata directory (optional)
│   └── plugin.json             # Plugin manifest
├── commands/                 # Slash-command skills (markdown files)
├── agents/                   # Agent definitions (markdown files)
├── skills/                   # Agent Skills (subdirectories with SKILL.md)
├── rules/                    # Persistent AI rules (.mdc files)
├── hooks/                    # Hook configurations
│   └── hooks.json              # Main hook config
├── .mcp.json                 # MCP server definitions
├── .lsp.json                 # LSP server configurations
├── scripts/                  # Hook and utility scripts
├── assets/                   # Logos and static assets
├── LICENSE                   # License file
└── CHANGELOG.md              # Version history
```

### Directory Rules

1. The `.plugin/` directory MUST contain only `plugin.json`. All component directories (commands, agents, skills, rules, hooks) MUST be at the plugin root, not inside `.plugin/`.
2. All paths within a plugin MUST be relative to the plugin root.
3. All relative paths MUST start with `./`.
4. A plugin MUST NOT reference files outside its own directory tree via `../` traversal.

## Plugin Manifest

The manifest file at `.plugin/plugin.json` defines a plugin's metadata and configuration.

### Manifest Presence

The manifest is OPTIONAL. If omitted:
- The plugin name is derived from the directory name
- Components are discovered in their default locations only
- No version, author, or other metadata is available

If present, `name` is the only REQUIRED field.

### Schema

```json
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": {
    "name": "Author Name",
    "email": "author@example.com",
    "url": "https://github.com/author"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "logo": "assets/logo.svg",
  "keywords": ["keyword1", "keyword2"],
  "commands": ["./custom/commands/special.md"],
  "agents": "./custom/agents/",
  "skills": "./custom/skills/",
  "rules": "./custom/rules/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "lspServers": "./.lsp.json",
  "outputStyles": "./styles/"
}
```

### Required Fields

| Field | Type | Constraints | Description |
|---|---|---|---|
| `name` | string | 1-64 chars. Lowercase alphanumeric, hyphens, and periods (`a-z`, `0-9`, `-`, `.`). Must start and end with an alphanumeric character. Must not contain `--` or `..`. | Unique identifier. Used for namespacing components. |

### Metadata Fields

All metadata fields are OPTIONAL.

| Field | Type | Description |
|---|---|---|
| `version` | string | Semantic version (e.g., `"2.1.0"`). Used by tools to determine update availability. |
| `description` | string | Brief explanation of plugin purpose. |
| `author` | object | Author information: `name` (string), `email` (string), `url` (string). All sub-fields optional. |
| `homepage` | string | URL to documentation or landing page. |
| `repository` | string | URL to source code repository. |
| `license` | string | SPDX license identifier (e.g., `"MIT"`, `"Apache-2.0"`). |
| `logo` | string | Relative path to a logo file in the plugin (e.g., `"assets/logo.svg"`), or an absolute URL. |
| `keywords` | string[] | Tags for discovery and search. |

### Component Path Fields

Component path fields specify additional locations for components. By default, custom paths **supplement** default directories — they do not replace them. If a `commands/` directory exists at the plugin root, it is always loaded regardless of whether `commands` appears in the manifest.

Tools MAY support an `exclusive` option that replaces default discovery instead of supplementing it. When `exclusive` is used, only the specified paths are scanned for that component type:

```json
{
  "skills": { "paths": ["./custom-skills/"], "exclusive": true }
}
```

When the value is a plain string or string array, it is treated as supplemental (the default behavior).

| Field | Type | Description |
|---|---|---|
| `commands` | string \| string[] \| object | Additional command files or directories. |
| `agents` | string \| string[] \| object | Additional agent files or directories. |
| `skills` | string \| string[] \| object | Additional skill directories. |
| `rules` | string \| string[] \| object | Additional rule files or directories. |
| `hooks` | string \| string[] \| object | Hook config paths or inline hook configuration. |
| `mcpServers` | string \| string[] \| object | MCP config paths or inline MCP configuration. |
| `lspServers` | string \| string[] \| object | LSP config paths or inline LSP configuration. |
| `outputStyles` | string \| string[] | Additional output style files or directories. |

When a component path field's `object` value contains a `hooks` key (for hooks) or `mcpServers` key (for MCP), it is treated as inline configuration. Otherwise, if it contains `paths` and optionally `exclusive`, it is treated as a path configuration.

### Name Constraints

The `name` field:
- MUST be 1-64 characters
- MUST contain only lowercase alphanumeric characters, hyphens, and periods (`a-z`, `0-9`, `-`, `.`)
- MUST start and end with an alphanumeric character
- MUST NOT contain consecutive hyphens (`--`) or consecutive periods (`..`)

Valid: `deployment-tools`, `code-reviewer`, `my-plugin`, `prompts.chat`
Invalid: `My-Plugin`, `-tools`, `tools-`, `my--plugin`, `my..plugin`, `.plugin`

## Component Discovery

Tools implementing this spec MUST discover components in the following default locations, in addition to any custom paths declared in the manifest (unless `exclusive` mode is used for that component):

| Component | Default Location | File Pattern |
|---|---|---|
| Commands | `commands/` | `.md` files. Tools MAY also discover `.mdc`, `.markdown`, and `.txt` files. |
| Agents | `agents/` | `.md` files with frontmatter. Tools MAY also discover `.mdc` and `.markdown` files. |
| Skills | `skills/` | Subdirectories containing `SKILL.md` |
| Rules | `rules/` | `.mdc` files. Tools MAY also discover `.md` and `.markdown` files. |
| Hooks | `hooks/hooks.json` | JSON configuration |
| MCP Servers | `.mcp.json` | JSON configuration |
| LSP Servers | `.lsp.json` | JSON configuration |

If a default location does not exist, the tool MUST NOT treat this as an error. Components are optional.

### Root SKILL.md

If a plugin has no `skills/` directory and no `skills` field in the manifest, tools MAY treat a `SKILL.md` file at the plugin root as a single-skill plugin. The skill name is derived from the plugin name. This is a convenience for simple single-skill plugins.

## Component Namespacing

All components provided by a plugin MUST be namespaced using the plugin name to prevent conflicts when multiple plugins are installed.

The namespace format is: `{plugin-name}:{component-name}`

For example, a plugin named `deploy-tools` with a command `status` produces the command `/deploy-tools:status`.

Tools SHOULD display the full namespaced name in user-facing interfaces.

## Environment Variables

The following environment variables MUST be available to plugin scripts, hook commands, and MCP/LSP server configurations:

| Variable | Description |
|---|---|
| `PLUGIN_ROOT` | Absolute path to the plugin's root directory. |

Tools MAY provide additional environment variables. The `PLUGIN_ROOT` variable MUST be the canonical way to reference files within the plugin.

In configuration files (manifest, hook configs, MCP configs), the placeholder `${PLUGIN_ROOT}` MUST be expanded to the plugin root path at load time.

```json
{
  "command": "${PLUGIN_ROOT}/scripts/format.sh"
}
```

## Version Management

Plugins SHOULD use [Semantic Versioning](https://semver.org/) for their `version` field.

- **MAJOR**: Breaking changes (incompatible modifications)
- **MINOR**: New features (backward-compatible additions)
- **PATCH**: Bug fixes (backward-compatible fixes)

Tools use the version to determine whether a plugin update is available. If a plugin's code changes but the version does not change, tools MAY serve the cached previous version.

## Conformance

A tool is a **conformant plugin host** if it:

1. Can discover and load plugins from a directory
2. Parses the `.plugin/plugin.json` manifest when present
3. Discovers components in default locations
4. Expands `${PLUGIN_ROOT}` in configuration values
5. Namespaces plugin components to prevent conflicts
6. Supports at least one component type (skills, agents, rules, hooks, MCP servers, or LSP servers)

A tool is NOT required to support all component types. A tool that only supports skills and agents is conformant. A tool that only supports hooks and MCP servers is conformant. The spec is designed for incremental adoption.

Tools MUST ignore component types they do not support. A plugin containing rules MUST load correctly on a tool that does not support rules — the rules are simply not registered.

## Component Specifications

Each component type has its own specification:

- [Skills](components/skills.md) — Slash-command and agent-invoked skills
- [Agents](components/agents.md) — Specialized sub-agents
- [Rules](components/rules.md) — Persistent AI guidance and coding standards
- [Hooks](components/hooks.md) — Event-driven automation
- [MCP Servers](components/mcp-servers.md) — Model Context Protocol tool servers
- [LSP Servers](components/lsp-servers.md) — Language Server Protocol code intelligence

## See Also

- [Installation](installation.md) — Scopes, caching, and resolution
- [Marketplaces](marketplaces.md) — Distribution format
