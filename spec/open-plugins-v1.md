# Open Plugin Specification

**Spec Version: 1.0.0**

This document defines the canonical Open Plugin Specification v1.0.0. It is a self-contained specification for packaging agent extensions into distributable plugins. Everything in sections 1–14 is required for conformance.

## Quick Start (for context only — not required for conformance)

The smallest useful plugin is a directory with one skill.

```text
hello-plugin/
├── .plugin/
│   └── plugin.json
└── skills/
    └── greet/
        └── SKILL.md
```

`./.plugin/plugin.json`

```json
{
  "name": "hello-plugin"
}
```

`./skills/greet/SKILL.md`

```markdown
---
name: greet
description: Greet the user and offer help.
---

Greet the user. If `$ARGUMENTS` is present, include it in the greeting.
```

A host that supports skills can load this plugin by reading `.plugin/plugin.json`, discovering `skills/greet/SKILL.md`, and surfacing `/hello-plugin:greet`.

> **Note:**
> The Core Profile reading path in this document is package layout (§4), manifest loading (§5–6), discovery (§7), skills, commands, agents (§8.1–8.2), namespacing (§9), `${PLUGIN_ROOT}` expansion (§10), and minimum host conformance (§14). Rules, hooks, MCP servers, LSP servers, output styles, installation scopes, and marketplaces are extended surfaces.

## Table of contents

1. [Status and version](#1-status-and-version)
2. [Conformance language](#2-conformance-language)
3. [Terminology](#3-terminology)
4. [Plugin package model](#4-plugin-package-model)
5. [Manifest location and precedence](#5-manifest-location-and-precedence)
6. [Manifest schema](#6-manifest-schema)
7. [Component discovery](#7-component-discovery)
8. [Component definitions](#8-component-definitions)
9. [Namespacing](#9-namespacing)
10. [Environment variables and placeholder expansion](#10-environment-variables-and-placeholder-expansion)
11. [Installation, scopes, caching, and resolution](#11-installation-scopes-caching-and-resolution)
12. [Versioning](#12-versioning)
13. [Marketplace index and discovery](#13-marketplace-index-and-discovery)
14. [Host conformance](#14-host-conformance)

**Appendices (not required for conformance)**

- [Conformance Checklist](#conformance-checklist)
- [Design Decisions](#design-decisions)
- [Future Considerations](#future-considerations)

## 1. Status and version

This specification defines version `1.0.0` of the Open Plugin format.

Plugin hosts and plugin packages claiming conformance to Open Plugin v1 MUST implement or follow the requirements in this document.

## 2. Conformance language

The key words MUST, MUST NOT, REQUIRED, SHOULD, SHOULD NOT, RECOMMENDED, MAY, and OPTIONAL in this document are to be interpreted as described in RFC 2119 and RFC 8174 when, and only when, they appear in all capitals.

## 3. Terminology

| Term               | Meaning                    | Description                                                                                                                                  |
| ------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin             | Package unit               | A self-contained directory that bundles one or more components and optional metadata.                                                        |
| Plugin root        | Filesystem root            | The top-level directory of a plugin package.                                                                                                 |
| Manifest           | Metadata document          | A `plugin.json` file in a metadata directory at the plugin root.                                                                             |
| Component          | Plugin-provided capability | A command skill, agent skill, agent, rule, hook configuration, MCP server configuration, LSP server configuration, or output style resource. |
| Host               | Plugin runtime             | A tool that discovers, installs, loads, and executes plugin components.                                                                      |
| Discovery source   | Scan location              | A default location, manifest-declared path, inline configuration object, or marketplace entry from which a host loads components.            |
| Path config        | Discovery object           | An object with `paths` and optional `exclusive` that controls scanning for a component type.                                                 |
| Inline hook config | Hook definition object     | A `hooks` manifest field whose object value contains a `hooks` key.                                                                          |
| Inline MCP config  | MCP definition object      | A `mcpServers` manifest field whose object value contains an `mcpServers` key.                                                               |
| Inline LSP config  | LSP definition object      | An `lspServers` manifest field whose object value uses direct server-name keys rather than `paths`.                                          |
| Marketplace        | Plugin collection          | A named collection of one or more plugins declared by `marketplace.json`.                                                                    |

## 4. Plugin package model

### 4.1 General requirements

1. A plugin is a directory rooted at a single filesystem location.
2. A plugin MAY omit the manifest.
3. A plugin MUST contain zero or more supported components. A directory with only a manifest is valid but may not be useful on hosts that require at least one supported component at runtime.
4. All relative paths declared by the plugin MUST be interpreted relative to the plugin root.
5. All relative paths declared by the plugin MUST start with `./`.
6. A plugin MUST NOT reference files outside its own directory tree by using `../` traversal.
7. Hosts MUST reject any configured path that escapes the plugin root after path normalization.

Example: valid and invalid relative paths

```json
{
  "commands": "./commands/",
  "hooks": "./config/hooks.json",
  "logo": "./assets/logo.svg"
}
```

```json
{
  "commands": "../shared-commands/",
  "hooks": "config/hooks.json"
}
```

The first example is valid — all paths start with `./` and stay within the plugin root. The second is invalid — `../shared-commands/` escapes the plugin root and `config/hooks.json` does not start with `./`.

### 4.2 Standard layout

```text
my-plugin/
├── .plugin/
│   └── plugin.json
├── commands/
├── agents/
├── skills/
├── output-styles/
├── rules/
├── hooks/
│   └── hooks.json
├── .mcp.json
├── .lsp.json
├── scripts/
├── assets/
├── LICENSE
└── CHANGELOG.md
```

Example: Core Profile layout (minimal)

```text
code-assistant/
├── .plugin/
│   └── plugin.json
├── skills/
│   └── summarize/
│       └── SKILL.md
├── commands/
│   └── lint.md
└── agents/
    └── reviewer.md
```

Example: full plugin with all component types

```text
devtools/
├── .plugin/
│   └── plugin.json
├── commands/
│   ├── deploy.md
│   └── status.md
├── skills/
│   └── code-review/
│       ├── SKILL.md
│       ├── scripts/
│       │   └── analyze.sh
│       └── references/
│           └── checklist.md
├── agents/
│   └── security-reviewer.md
├── rules/
│   └── prefer-const.mdc
├── hooks/
│   └── hooks.json
├── .mcp.json
├── .lsp.json
├── scripts/
│   ├── format.sh
│   └── check-env.sh
├── assets/
│   └── logo.svg
├── LICENSE
└── CHANGELOG.md
```

<!-- DISCUSSION: standard-layout-extensions — Should the standard layout include additional well-known directories such as `tests/` or `docs/`? -->

> **See also:** [§5 Manifest location and precedence](#5-manifest-location-and-precedence) for how the metadata directory relates to manifest discovery, and [§7 Component discovery](#7-component-discovery) for how component directories are scanned.

### 4.3 Directory rules

1. The metadata directory MUST contain `plugin.json` when a manifest is present.
2. The metadata directory MAY also contain `marketplace.json` when the same directory root is both a plugin root and a marketplace root.
3. Component directories such as `commands/`, `agents/`, `skills/`, `rules/`, and `hooks/`, when present, MUST exist at the plugin root, not inside the metadata directory.
4. Missing component directories are not errors.

Example:

```text
my-plugin/
└── .plugin/
    ├── plugin.json
    └── marketplace.json
```

## 5. Manifest location and precedence

### 5.1 Manifest locations

Hosts MUST check for a manifest at `.plugin/plugin.json`.

A host that defines a vendor-prefixed manifest location such as `.<tool-name>-plugin/plugin.json` MUST also check that location and SHOULD prefer it over `.plugin/plugin.json` when both are present.

| Path                              | Description              | Notes                                   |
| --------------------------------- | ------------------------ | --------------------------------------- |
| `.plugin/plugin.json`             | Vendor-neutral manifest  | REQUIRED. RECOMMENDED for new multi-host plugins. |
| `.<tool-name>-plugin/plugin.json` | Vendor-specific manifest | Preferred by the matching host when present.      |

Example:

```text
my-plugin/
├── .plugin/plugin.json
└── .claude-plugin/plugin.json
```

A Claude-like host selects `.claude-plugin/plugin.json`. A host with no vendor-prefixed manifest location selects `.plugin/plugin.json`.

<!-- DISCUSSION: vendor-prefix-discovery — Should the spec define a registry or convention for vendor prefixes, or leave it entirely host-defined? -->

> **See also:** [§6 Manifest schema](#6-manifest-schema) for the structure of the manifest file, and [§14 Host conformance](#14-host-conformance) for requirements around supporting `.plugin/plugin.json`.

### 5.2 Multiple manifest locations

1. A plugin MAY provide identical manifest content in multiple locations.
2. When multiple manifest locations exist, a host SHOULD prefer its own vendor-prefixed manifest and SHOULD otherwise fall back to `.plugin/plugin.json`.
3. When both locations exist and contain different content, the selected manifest is authoritative for that host.
4. Hosts MAY warn when multiple manifest locations contain inconsistent content.

> **Implementer note:**
> Example user-facing message: `Plugin "devtools": manifest at ".plugin/plugin.json" differs from "claude/plugin.json". Using ".plugin/plugin.json" as authoritative.`
>
> Example machine-readable record:
> ```json
> {"level":"warn","event":"open_plugin.manifest.inconsistent","plugin":"devtools","selected":".plugin/plugin.json","other":"claude/plugin.json","action":"used_selected"}
> ```

### 5.3 No manifest present

If no manifest is present:

1. The plugin name MUST be derived from the plugin root directory basename.
2. Components MUST be discovered only from default locations.
3. No manifest metadata other than the derived name is available.

Example: manifest-less plugin

```text
my-linter/
├── commands/
│   └── lint.md
└── rules/
    └── prefer-const.mdc
```

No `.plugin/` directory exists. The host derives the plugin name `my-linter` from the directory basename, discovers `/my-linter:lint` from `commands/`, and discovers `my-linter:prefer-const` from `rules/`.

## 6. Manifest schema

<!-- DISCUSSION: manifest-required-fields — Should `name` be REQUIRED in the manifest, or should directory-basename derivation always suffice? -->

> **See also:** [§5 Manifest location and precedence](#5-manifest-location-and-precedence) for where the manifest is loaded from, and [§7 Component discovery](#7-component-discovery) for how manifest fields control discovery paths.

### 6.1 Manifest object

If present, the manifest MUST be JSON and MUST contain a top-level object.

```json
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": {
    "name": "Author Name",
    "email": "author@example.com",
    "url": "https://example.com"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/example/plugin",
  "license": "MIT",
  "logo": "./assets/logo.svg",
  "keywords": ["keyword1", "keyword2"],
  "commands": ["./custom/commands/"],
  "agents": "./custom/agents/",
  "skills": "./custom/skills/",
  "rules": "./custom/rules/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "lspServers": "./.lsp.json",
  "outputStyles": "./styles/",
  "userConfig": {
    "api_key": {
      "description": "API key for the backend service",
      "sensitive": true
    },
    "output_format": {
      "description": "Preferred output format (json or text)"
    }
  }
}
```

Example: minimal manifest

```json
{
  "name": "minimal-plugin",
  "version": "1.0.0",
  "description": "The simplest possible plugin."
}
```

Example: full manifest

```json
{
  "name": "devtools",
  "version": "2.0.0",
  "description": "Full-featured development toolkit.",
  "author": {
    "name": "Open Plugin Examples"
  },
  "license": "Apache-2.0",
  "logo": "./assets/logo.svg",
  "keywords": ["devtools", "code-review", "linting", "security"],
  "commands": "./commands/",
  "skills": {
    "paths": ["./skills/"]
  },
  "hooks": "./hooks/hooks.json",
  "mcpServers": "./.mcp.json",
  "lspServers": "./.lsp.json"
}
```

### 6.2 Required field

| Field  | Type   | Description                                                      |
| ------ | ------ | ---------------------------------------------------------------- |
| `name` | string | Unique plugin identifier used for namespacing and settings keys. |

### 6.3 Metadata fields

| Field         | Type     | Description                                                           |
| ------------- | -------- | --------------------------------------------------------------------- |
| `version`     | string   | Semantic version string used for update checks and cache freshness.   |
| `description` | string   | Short description of plugin purpose.                                  |
| `author`      | object   | Author object with optional `name`, `email`, and `url` string fields. |
| `homepage`    | string   | Documentation or homepage URL.                                        |
| `repository`  | string   | Source repository URL.                                                |
| `license`     | string   | SPDX license identifier.                                              |
| `logo`        | string   | Relative path within the plugin or an absolute URL.                   |
| `keywords`    | string[] | Search and discovery tags.                                            |

### 6.4 Component path fields

| Field          | Type                         | Path mode | Description                                                |
| -------------- | ---------------------------- | --------- | ---------------------------------------------------------- |
| `commands`     | string \| string[] \| object | Replace   | Command files or directories, or a path config. Custom paths REPLACE the default `commands/` directory. |
| `agents`       | string \| string[] \| object | Replace   | Agent files or directories, or a path config. Custom paths REPLACE the default `agents/` directory. |
| `skills`       | string \| string[] \| object | Replace   | Skill directories, or a path config. Custom paths REPLACE the default `skills/` directory. |
| `rules`        | string \| string[] \| object | Replace   | Rule files or directories, or a path config. Custom paths REPLACE the default `rules/` directory. |
| `hooks`        | string \| string[] \| object | Additive  | Hook config paths, a path config, or inline hook config. Custom paths are ADDITIVE with the default `hooks/hooks.json`. |
| `mcpServers`   | string \| string[] \| object | Additive  | MCP config paths, a path config, or inline MCP config. Custom paths are ADDITIVE with the default `.mcp.json`. |
| `lspServers`   | string \| string[] \| object | Additive  | LSP config paths, a path config, or inline LSP config. Custom paths are ADDITIVE with the default `.lsp.json`. |
| `outputStyles` | string \| string[]           | Replace   | Output style files or directories. Custom paths REPLACE the default `output-styles/` directory. |

**Replace vs Additive path modes:**

- **Replace** (`commands`, `agents`, `skills`, `rules`, `outputStyles`): When the manifest specifies custom paths for these fields, the default directory is NOT scanned. To keep the default directory AND add custom paths, include the default in the array (e.g., `"commands": ["./commands/", "./extras/"]`).
- **Additive** (`hooks`, `mcpServers`, `lspServers`): Custom manifest paths combine with (are added to) the default location. Multiple sources merge.

### 6.5 Path config schema

The object form for discovery paths is:

| Field       | Type     | Description                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------- |
| `paths`     | string[] | Relative files or directories to scan.                                                            |
| `exclusive` | boolean  | For additive fields (`hooks`, `mcpServers`, `lspServers`) only: if `true`, replace default discovery for that component type. Has no effect on replace-mode fields. |

For **replace-mode fields** (`commands`, `agents`, `skills`, `rules`, `outputStyles`): when the manifest declares custom paths — whether as a plain string, string array, or path config object — the default location is NOT scanned. Only the declared paths are used. To retain the default directory, include it explicitly in the array.

For **additive-mode fields** (`hooks`, `mcpServers`, `lspServers`): custom paths are combined with the default location. Both sources are loaded and merged. The `exclusive` flag MAY be used to override this and replace default discovery.

Example: replace-mode field (default location replaced)

```json
{
  "commands": "./custom-commands/"
}
```

The host scans only `custom-commands/`; the default `commands/` directory is NOT scanned.

Example: replace-mode field retaining the default

```json
{
  "commands": ["./commands/", "./extra-commands/"]
}
```

The host scans both `commands/` and `extra-commands/`, because the default directory is explicitly included.

Example: additive-mode field (default location preserved)

```json
{
  "hooks": "./config/extra-hooks.json"
}
```

The host loads both `hooks/hooks.json` (default) and `config/extra-hooks.json`.

Example: additive-mode field with exclusive override

```json
{
  "hooks": {
    "paths": ["./config/hooks.json"],
    "exclusive": true
  }
}
```

The host loads only `config/hooks.json`; the default `hooks/hooks.json` is NOT loaded.

### 6.6 Object-field disambiguation

Hosts MUST interpret object values for component path fields as follows:

| Field          | Object shape                                         | Interpretation      |
| -------------- | ---------------------------------------------------- | ------------------- |
| `hooks`        | Object containing `hooks`                            | Inline hook config. |
| `mcpServers`   | Object containing `mcpServers`                       | Inline MCP config.  |
| `lspServers`   | Object using direct server-name keys and not `paths` | Inline LSP config.  |
| Any path field | Object containing `paths` and optional `exclusive`   | Path config.        |

If an object matches none of the shapes above, the host SHOULD treat the field as invalid and SHOULD warn.

> **Implementer note:**
> Example user-facing message: `Plugin "devtools": manifest field "mcpServers" has an unrecognized shape (expected path config or inline server config). Field ignored; plugin load continues.`
>
> Example machine-readable record:
> ```json
> {"level":"warn","event":"open_plugin.manifest.invalid_object","plugin":"devtools","field":"mcpServers","action":"ignored","continue":true}
> ```

Example: path config

```json
{
  "skills": {
    "paths": ["./skills/", "./extra-skills/"],
    "exclusive": true
  }
}
```

Example: inline hook config

```json
{
  "hooks": {
    "hooks": {
      "SessionStart": [
        {
          "hooks": [
            {
              "type": "command",
              "command": "${PLUGIN_ROOT}/scripts/check-env.sh"
            }
          ]
        }
      ]
    }
  }
}
```

Example: inline MCP config

```json
{
  "mcpServers": {
    "mcpServers": {
      "database": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres"]
      }
    }
  }
}
```

Example: inline LSP config

```json
{
  "lspServers": {
    "typescript": {
      "command": "typescript-language-server",
      "args": ["--stdio"],
      "extensionToLanguage": {
        ".ts": "typescript"
      }
    }
  }
}
```

Example: invalid ambiguous object

```json
{
  "mcpServers": {
    "database": {
      "command": "npx"
    }
  }
}
```

This is invalid because it is neither a path config with `paths` nor an inline MCP config with a top-level `mcpServers` key.

### 6.7 Plugin name constraints

The manifest `name` value, and a derived directory name used in place of it, MUST satisfy all of the following:

| Constraint    | Requirement            | Description                                                   |
| ------------- | ---------------------- | ------------------------------------------------------------- |
| Length        | 1-64 characters        | The name MUST be between 1 and 64 characters inclusive.       |
| Character set | `a-z`, `0-9`, `-`, `.` | Lowercase alphanumeric characters, hyphens, and periods only. |
| Start and end | Alphanumeric           | The first and last characters MUST be alphanumeric.           |
| Repetition    | No `--` or `..`        | Consecutive hyphens and consecutive periods are not allowed.  |

Periods are allowed in plugin names. Periods are not allowed in agent names.

Valid names: `my-plugin`, `acme.tools`, `lint3r`, `a`

Invalid names: `My-Plugin` (uppercase), `-start` (leading hyphen), `has--double` (consecutive hyphens), `too.many..dots` (consecutive periods), `` (empty)

### 6.8 User configuration

*User configuration is still under discussion and not required for v1 conformance. See [Appendix C: User Configuration](#appendix-c-user-configuration) for the current draft. Hosts MAY implement `userConfig` but conformant hosts are not required to.*

## 7. Component discovery

> **See also:** [§4 Plugin package model](#4-plugin-package-model) for directory layout conventions, [§6 Manifest schema](#6-manifest-schema) for how manifest fields declare discovery paths, and [§9 Namespacing](#9-namespacing) for how discovered components are named.

### 7.1 Default locations

Hosts MUST discover components in the following default locations when no manifest field overrides discovery for that component type. For replace-mode fields, the default is not scanned when custom paths are declared. For additive-mode fields, the default is always scanned unless `exclusive: true` is set. See [§6.4](#64-component-path-fields) for path mode details.

| Component     | Default location   | Default pattern                      |
| ------------- | ------------------ | ------------------------------------ |
| Commands      | `commands/`        | `.md` files                          |
| Agents        | `agents/`          | `.md` files with frontmatter         |
| Skills        | `skills/`          | Subdirectories containing `SKILL.md` |
| Rules         | `rules/`           | `.mdc` files                         |
| Output styles | `output-styles/`   | `.md` files                          |
| Hooks         | `hooks/hooks.json` | JSON configuration                   |
| MCP servers   | `.mcp.json`        | JSON configuration                   |
| LSP servers   | `.lsp.json`        | JSON configuration                   |

Example: given a plugin `reports-plugin` with this layout:

```text
reports-plugin/
├── commands/status.md
├── skills/summarize/SKILL.md
└── .mcp.json
```

The host discovers command `status`, skill `summarize`, and MCP servers from `.mcp.json` — all from default locations.

### 7.2 Supplemental extensions

Hosts MAY additionally discover these file extensions:

| Component | Additional extensions       | Description                            |
| --------- | --------------------------- | -------------------------------------- |
| Commands  | `.mdc`, `.markdown`, `.txt` | Optional supplemental command formats. |
| Agents    | `.mdc`, `.markdown`         | Optional supplemental agent formats.   |
| Rules     | `.md`, `.markdown`          | Optional supplemental rule formats.    |

Example: a host supporting supplemental extensions discovers both `rules/lint.mdc` and `rules/style.md` from the default `rules/` directory.

### 7.3 Missing locations

1. If a default location is absent, the host MUST NOT treat that as an error.
2. For **replace-mode fields** (`commands`, `agents`, `skills`, `rules`, `outputStyles`): when the manifest declares custom paths, the default location is NOT scanned. Only the declared paths are used.
3. For **additive-mode fields** (`hooks`, `mcpServers`, `lspServers`): manifest-declared paths are combined with the default location. Both sources are loaded and merged. The `exclusive` flag on additive fields overrides this and replaces default discovery.
4. When no manifest field is declared for a component type, the default location is scanned normally regardless of path mode.

Example: a plugin declares `"agents": "./custom-agents/"` but has no `agents/` directory. Because `agents` is a replace-mode field, the host scans only `custom-agents/` and does not error on the missing default `agents/` path. If the plugin also has `commands/` at the root but no `commands` manifest field, that default location is still scanned normally.

Example: a plugin declares `"hooks": "./config/hooks.json"`. Because `hooks` is an additive-mode field, the host loads both `hooks/hooks.json` (default) and `config/hooks.json`.

### 7.4 Root `SKILL.md` fallback

If a plugin has no `skills/` directory and no manifest `skills` field, a host MAY treat `SKILL.md` at the plugin root as a single Agent Skill. In that case, the skill name MUST be derived from the plugin name.

> **Note:** Not all hosts implement the root `SKILL.md` fallback. Claude Code, for example, requires skills to be in `skills/` subdirectories. Plugin authors targeting multiple hosts SHOULD use the standard `skills/` directory layout.

Example:

```text
solo-skill/
├── .plugin/plugin.json
└── SKILL.md
```

If there is no `skills/` directory and no manifest `skills` field, a host MAY surface the root skill as `/solo-skill:solo-skill`.

### 7.5 Discovery examples

Example: default discovery only

```text
reports-plugin/
├── .plugin/plugin.json
├── commands/status.md
└── skills/summarize/SKILL.md
```

The host discovers `/reports-plugin:status` and `/reports-plugin:summarize` from default locations.

Example: replace-mode discovery (commands)

`./.plugin/plugin.json`

```json
{
  "name": "reports-plugin",
  "commands": "./custom-commands/"
}
```

```text
reports-plugin/
├── commands/status.md
└── custom-commands/deploy.md
```

Because `commands` is a replace-mode field, the host discovers only `/reports-plugin:deploy` from `custom-commands/`. The default `commands/status.md` is NOT discovered.

Example: replace-mode with default retained

`./.plugin/plugin.json`

```json
{
  "name": "reports-plugin",
  "commands": ["./commands/", "./custom-commands/"]
}
```

The host discovers both `/reports-plugin:status` and `/reports-plugin:deploy` because the default directory is explicitly included.

Example: additive-mode discovery (hooks)

`./.plugin/plugin.json`

```json
{
  "name": "reports-plugin",
  "hooks": "./config/extra-hooks.json"
}
```

Because `hooks` is an additive-mode field, the host loads both `hooks/hooks.json` (default) and `config/extra-hooks.json`. Hook handlers from both sources are merged.

## 8. Component definitions

> **See also:** [§7 Component discovery](#7-component-discovery) for how component files are located, and [§9 Namespacing](#9-namespacing) for how component names are surfaced to users and models.

### 8.1 Skills

Plugins support two skill forms.

#### 8.1.1 Agent Skills

1. Agent Skills are directories containing `SKILL.md`.
2. Each subdirectory in a discovered skill location that contains `SKILL.md` MUST be treated as one skill.
3. The skill directory name MUST match the `name` field in `SKILL.md`.
4. Supporting directories such as `scripts/`, `references/`, and `assets/` MAY be present alongside `SKILL.md`.
5. Hosts SHOULD load only skill metadata at startup and SHOULD defer loading the full body and supporting resources until activation.

Example: a skill directory named `deploy` inside `skills/`:

```text
skills/
  deploy/
    SKILL.md          # name: deploy
    scripts/
      rollback.sh
    references/
      runbook.md
```

The `name` field inside `SKILL.md` MUST be `deploy` to match the directory name.

#### 8.1.2 Command skills

1. Command skills are markdown files discovered from `commands/` and supplemental command locations.
2. The filename without extension is the command name.
3. Command files MAY contain YAML frontmatter.

| Field                      | Type    | Description                                                                                                          |
| -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `description`              | string  | RECOMMENDED short description for display and matching.                                                              |
| `disable-model-invocation` | boolean | If `true`, the host MUST require explicit user invocation and MUST NOT auto-invoke the command. Defaults to `false`. |

The markdown body is the command instruction body.

The placeholder `$ARGUMENTS` in a command body MUST be replaced with the user-provided text after the command name. If no argument text is provided, the host SHOULD replace `$ARGUMENTS` with the empty string.

Example:

```text
/deploy-tools:deploy production
```

In this example, `$ARGUMENTS` resolves to `production`.

#### 8.1.3 Skill discovery and activation

1. Hosts MUST discover skills from default locations and manifest-declared locations.
2. Skills and commands MUST be automatically discovered when the plugin is loaded.
3. Hosts SHOULD present skills to the model for automatic activation when context matches, except where `disable-model-invocation` is `true`.

Example — startup vs activation:

```text
Startup:   Host reads skills/deploy/SKILL.md frontmatter (name, description).
           Full body and scripts/ are NOT loaded yet.

Activation: User triggers /my-plugin:deploy or model selects the skill.
            Host now loads the full SKILL.md body, scripts/, and references/.
```

### 8.2 Agents

Agent definitions are markdown files with YAML frontmatter.

| Field         | Type   | Description                                                  |
| ------------- | ------ | ------------------------------------------------------------ |
| `name`        | string | Required agent identifier.                                   |
| `description` | string | Required description used for discovery and auto-invocation. |

Agent `name` values MUST satisfy all of the following:

| Constraint    | Requirement       | Description                                                |
| ------------- | ----------------- | ---------------------------------------------------------- |
| Length        | 1-64 characters   | Agent names MUST be between 1 and 64 characters inclusive. |
| Character set | `a-z`, `0-9`, `-` | Lowercase alphanumeric characters and hyphens only.        |
| Start and end | Alphanumeric      | Agent names MUST not start or end with `-`.                |
| Repetition    | No `--`           | Consecutive hyphens are not allowed.                       |

Agent names MUST be unique within a plugin. The filename without extension SHOULD match the `name` field.

The `description` field MUST be no more than 1024 characters.

The markdown body after frontmatter is the agent system prompt. When invoked, the host SHOULD use that body as the system prompt for the sub-agent context.

Example: `agents/security-reviewer.md`

```markdown
---
name: security-reviewer
description: Reviews code changes for common security vulnerabilities.
---

You are a security reviewer. Analyze the provided code for:

- SQL injection
- Cross-site scripting (XSS)
- Path traversal
- Hardcoded credentials

Report findings as a numbered list with severity (high/medium/low).
```

### 8.3 Rules

Rule files are markdown with YAML frontmatter. The default extension is `.mdc`.

| Field         | Type               | Description                                                       |
| ------------- | ------------------ | ----------------------------------------------------------------- |
| `description` | string             | Required summary of the rule.                                     |
| `alwaysApply` | boolean            | If `true`, the rule is active automatically. Defaults to `false`. |
| `globs`       | string \| string[] | Optional file glob or glob list limiting rule applicability.      |

Rule activation modes are defined as follows:

| `alwaysApply`      | `globs` | Behavior                                            |
| ------------------ | ------- | --------------------------------------------------- |
| `true`             | not set | Rule applies to all work and is always active.      |
| `true`             | set     | Rule is always active only for matching files.      |
| `false` or omitted | not set | Rule is available for host or user activation.      |
| `false` or omitted | set     | Rule is available when matching files are in scope. |

The markdown body is the rule text injected when the rule is active.

Example: `rules/prefer-const.mdc`

```markdown
---
description: Prefer const over let when the variable is never reassigned.
alwaysApply: false
globs: "*.ts"
---

When reviewing or writing TypeScript code, use `const` for all variables that are
never reassigned. Only use `let` when reassignment is necessary.
```

This rule activates when `.ts` files are in scope and can be toggled by the user.

Hosts SHOULD load rules with `alwaysApply: true` automatically. Hosts MAY expose non-`alwaysApply` rules as toggleable options. Hosts that do not support rules MUST ignore rule files and manifest `rules` entries without failing the plugin load.

### 8.4 Hooks

The default hook configuration path is `hooks/hooks.json`. Hooks MAY also be declared inline in the manifest `hooks` field.

#### 8.4.1 Hook schema

The hook configuration MUST contain a top-level `hooks` object.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/format.sh"
          }
        ]
      }
    ]
  }
}
```

Each event key maps to an array of hook rules.

| Field     | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| `matcher` | string | Optional regular expression matched against event-specific context. |
| `hooks`   | array  | Required list of hook actions.                                      |

#### 8.4.2 Hook events

Canonical event names use PascalCase. Hosts SHOULD accept both PascalCase and camelCase spellings for the same event.

Core hook events that a hooks-capable host SHOULD support are:

| Event                | Matcher context | Description                      |
| -------------------- | --------------- | -------------------------------- |
| `PreToolUse`         | Tool name       | Fires before tool use.           |
| `PostToolUse`        | Tool name       | Fires after successful tool use. |
| `PostToolUseFailure` | Tool name       | Fires after failed tool use.     |
| `SessionStart`       | None            | Fires at session start.          |
| `SessionEnd`         | None            | Fires at session end.            |

Hosts MAY support additional events beyond the core set. See [Appendix D: Extended Hook Events](#appendix-d-extended-hook-events) for a catalog of events implemented by existing hosts. The extended events list is for reference only and not required for v1 conformance.

Hosts MUST ignore unsupported or unknown hook events.

Example — event spelling and unknown events:

```json
{
  "hooks": {
    "PreToolUse": [{ "type": "command", "command": "echo pre" }],
    "preToolUse":  [{ "type": "command", "command": "echo pre" }],
    "FutureEvent": [{ "type": "command", "command": "echo future" }]
  }
}
```

`PreToolUse` and `preToolUse` SHOULD resolve to the same event. `FutureEvent` is not
a recognized event; the host MUST ignore it and continue loading the plugin normally.

#### 8.4.3 Hook action types

| Type      | Required field | Description                               |
| --------- | -------------- | ----------------------------------------- |
| `command` | `command`      | Execute a shell command or script.        |
| `http`    | `url`          | POST event context as JSON to a URL.      |
| `prompt`  | `prompt`       | Evaluate a prompt using the host LLM.     |
| `agent`   | `prompt`       | Run an agentic verifier with tool access. |

For `command` actions:

1. `command` is REQUIRED.
2. The host MUST pass event context as JSON on stdin.
3. Exit code `0` indicates success; non-zero indicates failure.
4. The host MUST provide `PLUGIN_ROOT` in the environment and MAY provide additional event variables.

For `http` actions:

1. `url` is REQUIRED.
2. The host MUST POST the same event context JSON that would be passed on stdin for `command` hooks.
3. A 2xx response indicates success; non-2xx indicates a non-blocking error.
4. The host MAY support optional `headers` and `timeout` fields.

For `prompt` and `agent` actions, `$ARGUMENTS` MUST be replaced with event context as defined by the host.

Example: complete `hooks/hooks.json` with all action types

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/check-env.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/format.sh"
          },
          {
            "type": "http",
            "url": "https://hooks.example.com/file-changed"
          },
          {
            "type": "prompt",
            "prompt": "Check the file that was just written for any syntax errors: $ARGUMENTS"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Review all changes made in this session and produce a summary: $ARGUMENTS"
          }
        ]
      }
    ]
  }
}
```

This configuration runs an environment check at session start, formats files after writes, posts a webhook notification, asks the LLM to check syntax after edits, and uses an agentic reviewer at session end.

#### 8.4.4 Hook scripts and execution

Hook scripts MUST:

1. Be executable.
2. Include a shebang.
3. Use `${PLUGIN_ROOT}` for internal path references.

Hook execution requirements:

1. Multiple hook rules MAY match one event.
2. All matching hook rules MUST be executed.
3. Within a rule, hooks SHOULD execute in array order.
4. Hosts SHOULD enforce timeouts and MUST NOT allow hook execution to block indefinitely.
5. Hook failures SHOULD be logged and MUST NOT crash the host.

> **Implementer note:**
> Example user-facing message: `Plugin "devtools": hook "lint-check" for event "on_file_save" failed (exit code 2). Continuing without hook result.`
>
> Example machine-readable record:
> ```json
> {"level":"warn","event":"open_plugin.hook.execution_failed","plugin":"devtools","hook":"lint-check","trigger_event":"on_file_save","exit_code":2,"action":"continue_without_result"}
> ```

6. Hosts MAY run hooks from different rules concurrently.

### 8.5 MCP servers

The default MCP configuration path is `.mcp.json`. MCP servers MAY also be declared inline in the manifest `mcpServers` field.

#### 8.5.1 MCP schema

The configuration MUST contain a top-level `mcpServers` object.

| Field     | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| `command` | string   | Required executable path or command. |
| `args`    | string[] | Optional command-line arguments.     |
| `env`     | object   | Optional environment variables.      |
| `cwd`     | string   | Optional working directory.          |

All string values in MCP server configuration MUST support `${PLUGIN_ROOT}` expansion.

Each key in `mcpServers` is the server name and MUST be unique within the plugin after source resolution.

Example: complete `.mcp.json`

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_URL": "postgresql://localhost:5432/mydb"
      }
    },
    "filesystem": {
      "command": "${PLUGIN_ROOT}/bin/fs-server",
      "args": ["--root", "${PLUGIN_ROOT}/data"],
      "cwd": "${PLUGIN_ROOT}"
    }
  }
}
```

#### 8.5.2 MCP lifecycle and discovery

1. Plugin MCP servers MUST start automatically when the plugin is enabled.
2. Plugin MCP servers MUST stop when the plugin is disabled or the session ends.
3. If a server fails to start, the host SHOULD log the error and continue loading other components.
4. Hosts MAY restart crashed MCP servers.
5. Hosts MUST discover MCP configuration from `.mcp.json`, inline manifest config, and manifest-declared paths. MCP paths are additive — all sources are merged.

If multiple discovery sources define the same MCP server name, behavior is implementation-defined. Hosts SHOULD warn and SHOULD resolve conflicts deterministically. Conflicting MCP server names across discovery sources MUST NOT crash plugin loading.

> **Implementer note:**
> For MCP startup failures — Example user-facing message: `Plugin "devtools": MCP server "db-tools" failed to start (exit code 1). Other plugin components remain available.`
>
> Example machine-readable record:
> ```json
> {"level":"error","event":"open_plugin.mcp.start_failed","plugin":"devtools","server":"db-tools","exit_code":1,"action":"continue_without_server"}
> ```
>
> For MCP name conflicts — Example user-facing message: `Plugin "devtools": MCP server name "shared-tools" conflicts across .mcp.json and manifest. Using .mcp.json definition.`
>
> Example machine-readable record:
> ```json
> {"level":"warn","event":"open_plugin.mcp.name_conflict","plugin":"devtools","server":"shared-tools","sources":[".mcp.json","manifest"],"resolution":"first_source","action":"continue"}
> ```

### 8.6 LSP servers

The default LSP configuration path is `.lsp.json`. LSP servers MAY also be declared inline in the manifest `lspServers` field.

#### 8.6.1 Binary requirement

An LSP plugin configures how a host connects to a language server. It does not bundle the language server binary itself. Users MUST install the required LSP server separately.

Example — manifest referencing an externally installed binary:

```json
{
  "lsp": {
    "pyright": {
      "command": "pyright-langserver",
      "args": ["--stdio"],
      "extensionToLanguage": { ".py": "python" }
    }
  }
}
```

The host expects `pyright-langserver` to already exist on `$PATH`. If the binary is
missing, the host SHOULD report a clear diagnostic and continue loading other components.

#### 8.6.2 LSP schema

Unlike MCP, the top-level LSP object uses direct server-name keys.

Required fields:

| Field                 | Type   | Description                                                                              |
| --------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `command`             | string | LSP executable. It MUST be available on `$PATH`.                                         |
| `extensionToLanguage` | object | Required mapping from file extension, including the leading dot, to language identifier. |

Optional fields:

| Field                   | Type     | Description                                               |
| ----------------------- | -------- | --------------------------------------------------------- |
| `args`                  | string[] | Command-line arguments.                                   |
| `transport`             | string   | Transport. `stdio` and `socket` are defined by this spec. |
| `env`                   | object   | Environment variables.                                    |
| `initializationOptions` | object   | LSP initialization options.                               |
| `settings`              | object   | Workspace configuration settings.                         |
| `workspaceFolder`       | string   | Workspace folder path.                                    |
| `startupTimeout`        | number   | Startup timeout in milliseconds.                          |
| `shutdownTimeout`       | number   | Shutdown timeout in milliseconds.                         |
| `restartOnCrash`        | boolean  | Whether to restart after crash. Defaults to `false`.      |
| `maxRestarts`           | number   | Maximum crash restarts.                                   |

Each top-level key is the LSP server name and MUST be unique within that configuration source.

Example: complete `.lsp.json`

```json
{
  "typescript": {
    "command": "typescript-language-server",
    "args": ["--stdio"],
    "extensionToLanguage": {
      ".ts": "typescript",
      ".tsx": "typescriptreact"
    },
    "restartOnCrash": true,
    "maxRestarts": 3,
    "startupTimeout": 10000
  },
  "python": {
    "command": "pylsp",
    "args": [],
    "extensionToLanguage": {
      ".py": "python"
    },
    "settings": {
      "pylsp.plugins.pycodestyle.enabled": false
    }
  }
}
```

#### 8.6.3 LSP lifecycle and capability notes

1. LSP servers MUST start when the plugin is enabled and matching files are present in the workspace.
2. LSP servers MUST stop when the plugin is disabled or the session ends.
3. If the configured binary is missing, the host MUST log a clear error and continue loading other components.

> **Implementer note:**
> Example user-facing message: `Plugin "devtools": LSP server "typescript" was not started because "typescript-language-server" was not found on PATH. Other plugin components remain available.`
>
> Example machine-readable record:
> ```json
> {"level":"error","event":"open_plugin.lsp.binary_missing","plugin":"devtools","server":"typescript","command":"typescript-language-server","action":"continue_without_lsp"}
> ```

4. If `restartOnCrash` is `true`, the host SHOULD restart the server up to `maxRestarts` times.
5. Hosts MUST discover LSP configuration from `.lsp.json`, inline manifest config, and manifest-declared paths. LSP paths are additive — all sources are merged.

Core LSP-backed capabilities MAY include diagnostics, go-to-definition, references, and hover. Hosts MAY support additional LSP methods.

### 8.7 Output styles

`outputStyles` is an optional discovery field for host-defined output style resources.

1. Hosts that support output styles MAY load files or directories declared by `outputStyles`.
2. This specification does not define output style runtime semantics beyond discovery.
3. Hosts that do not support output styles MUST ignore `outputStyles`.

Example — a host ignoring `outputStyles`:

```json
{
  "name": "theme-pack",
  "version": "1.0.0",
  "outputStyles": { "paths": ["styles/"] }
}
```

A host that does not implement output-style rendering loads this plugin normally,
discovers its skills, agents, and other components, and silently skips `outputStyles`.
The plugin remains fully conformant and usable.

## 9. Namespacing

<!-- DISCUSSION: namespacing-separator — The colon separator `plugin:component` was chosen over `/` and `__` for general components. Should MCP tool namespacing also use colons, or does underscore-based `mcp__plugin_...` remain necessary for model compatibility? -->

> **See also:** [§6.7 Plugin name constraints](#67-plugin-name-constraints) for allowed characters in plugin names, and [§8 Component definitions](#8-component-definitions) for the naming rules of each component type.

### 9.1 General component namespacing

All plugin-provided components MUST be namespaced as:

```text
{plugin-name}:{component-name}
```

Example:

```text
/deploy-tools:status
```

Hosts SHOULD display the full namespaced identifier in user-facing interfaces.

### 9.2 MCP tool identifier namespacing

When surfacing MCP tools to a model, the host MUST include both the plugin name and the server name to avoid collisions.

The RECOMMENDED surfaced identifier format is:

```text
mcp__plugin_{plugin-name}_{server-name}__{tool-name}
```

Example:

| Plugin         | Server     | Tool    | Identifier                                 |
| -------------- | ---------- | ------- | ------------------------------------------ |
| `deploy-tools` | `database` | `query` | `mcp__plugin_deploy-tools_database__query` |

Hosts that use a different MCP tool naming convention MAY adapt this format, but the plugin name and server name MUST both remain present in the surfaced identifier.

Example: component namespacing

| Source file | Component name | Surfaced identifier |
| --- | --- | --- |
| `commands/deploy.md` | `deploy` | `/devtools:deploy` |
| `skills/code-review/SKILL.md` | `code-review` | `/devtools:code-review` |
| `agents/security-reviewer.md` | `security-reviewer` | `devtools:security-reviewer` |
| `rules/prefer-const.mdc` | `prefer-const` | `devtools:prefer-const` |

Example: MCP tool namespacing

| Plugin | Server | Tool | Surfaced identifier |
| --- | --- | --- | --- |
| `devtools` | `database` | `query` | `mcp__plugin_devtools_database__query` |
| `devtools` | `database` | `migrate` | `mcp__plugin_devtools_database__migrate` |
| `deploy-tools` | `kubernetes` | `rollout_status` | `mcp__plugin_deploy-tools_kubernetes__rollout_status` |

## 10. Environment variables and placeholder expansion

> **See also:** [§8.4 Hooks](#84-hooks) and [§8.5 MCP servers](#85-mcp-servers) for the fields where `${PLUGIN_ROOT}` expansion applies, and [§4.1 General requirements](#41-general-requirements) for path safety rules.

### 10.1 Required variables

Hosts MUST provide an environment variable containing the absolute plugin root path.

| Variable                                                | Description                     | Notes                                                                 |
| ------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------- |
| `PLUGIN_ROOT`                                           | Vendor-neutral plugin root path | REQUIRED.                                                             |
| Vendor-prefixed equivalent such as `CLAUDE_PLUGIN_ROOT` | Host-specific plugin root path  | OPTIONAL but RECOMMENDED when the host has an established convention. |

### 10.1.1 Persistent data directory

Hosts that provide persistent plugin storage SHOULD set a data directory variable.

| Variable                                                | Description                             | Notes                                                                 |
| ------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------- |
| `PLUGIN_DATA`                                           | Vendor-neutral persistent data path     | RECOMMENDED.                                                          |
| Vendor-prefixed equivalent such as `CLAUDE_PLUGIN_DATA` | Host-specific persistent data path      | OPTIONAL but RECOMMENDED when the host has an established convention. |

`PLUGIN_DATA` is the absolute path to a host-managed persistent data directory for the plugin. This directory SHOULD survive plugin updates and reinstalls. The host SHOULD create the directory on first reference and SHOULD delete it when the plugin is uninstalled from the last scope.

Use `PLUGIN_DATA` for: installed dependencies (node_modules, virtual environments), generated code, caches, and other plugin state that should persist across updates. Use `PLUGIN_ROOT` for referencing bundled scripts, binaries, and config files that ship with the plugin.

Example: a host loading the plugin `devtools` from `/home/alex/.agents/plugins/devtools` sets:

```text
PLUGIN_ROOT=/home/alex/.agents/plugins/devtools
CLAUDE_PLUGIN_ROOT=/home/alex/.agents/plugins/devtools   # vendor-prefixed twin
PLUGIN_DATA=/home/alex/.agents/plugins/data/devtools
CLAUDE_PLUGIN_DATA=/home/alex/.agents/plugins/data/devtools   # vendor-prefixed twin
```

Plugin authors use `${PLUGIN_ROOT}` and `${PLUGIN_DATA}` for portability; host-specific scripts MAY use vendor-prefixed equivalents.

### 10.2 Placeholder expansion

Hosts MUST expand `${PLUGIN_ROOT}`. Hosts that provide a persistent data directory SHOULD expand `${PLUGIN_DATA}`. Hosts that provide vendor-prefixed equivalents SHOULD also expand the corresponding vendor-prefixed placeholders.

Examples of equivalent placeholders include `${PLUGIN_ROOT}` and `${CLAUDE_PLUGIN_ROOT}`, and `${PLUGIN_DATA}` and `${CLAUDE_PLUGIN_DATA}`.

Hosts that support user configuration ([§6.8](#68-user-configuration)) MUST expand `${user_config.KEY}` placeholders in the same contexts.

Expansion MUST apply anywhere this specification allows plugin-controlled executable paths or environment-bearing strings, including:

| Location                     | Fields                                                                                       | Description                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Manifest path-bearing config | `commands`, `agents`, `skills`, `rules`, `hooks`, `mcpServers`, `lspServers`, `outputStyles` | Relative manifest paths are resolved from plugin root. |
| Hook config                  | `command`                                                                                    | Hook command strings support plugin-root expansion.    |
| MCP config                   | `command`, `args`, `env`, `cwd`                                                              | All string values support plugin-root expansion.       |
| LSP config                   | `args`, `env`, `workspaceFolder`                                                             | String values SHOULD support plugin-root expansion.    |

Hosts MAY provide additional environment variables beyond the plugin root variables.

Example: `${PLUGIN_ROOT}` expansion in hooks

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/check-env.sh"
          }
        ]
      }
    ]
  }
}
```

If the plugin root is `/Users/alex/.agents/plugins/devtools`, the command above resolves to `/Users/alex/.agents/plugins/devtools/scripts/check-env.sh`.

Example: `${PLUGIN_ROOT}` expansion in MCP

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["--config", "${PLUGIN_ROOT}/config/db.json"],
      "cwd": "${PLUGIN_ROOT}",
      "env": {
        "DATA_DIR": "${PLUGIN_ROOT}/data"
      }
    }
  }
}
```

Example: `${PLUGIN_ROOT}` expansion in LSP

```json
{
  "typescript": {
    "command": "typescript-language-server",
    "args": ["--stdio"],
    "extensionToLanguage": {
      ".ts": "typescript"
    },
    "workspaceFolder": "${PLUGIN_ROOT}"
  }
}
```

## 11. Installation, scopes, caching, and resolution

<!-- DISCUSSION: installation-security — Should this section define permission prompts or trust levels for plugin installation, or is that deferred to a future security model? -->

> **See also:** [§14 Host conformance](#14-host-conformance) for which scopes a host MUST support, and [§13 Marketplace index and discovery](#13-marketplace-index-and-discovery) for how plugins are discovered before installation.

### 11.1 Installation scopes

| Scope     | Typical settings location                      | Description                                                    |
| --------- | ---------------------------------------------- | -------------------------------------------------------------- |
| `user`    | `~/.<tool>/settings.json`                      | Personal plugins across projects.                              |
| `project` | `<project>/.<tool>/settings.json`              | Shared project plugins.                                        |
| `local`   | `<project>/.<tool>/settings.local.json`        | Uncommitted local project plugins.                             |
| `managed` | Host-defined                                   | Externally managed plugins, typically read-only for end users. |

> **Note:** Hosts define their own settings paths. The paths above show one common pattern (`~/.<tool>/`). Some hosts may use `~/.config/<tool>/` or other conventions.

Hosts MUST support `user`. Hosts SHOULD support `project` and `local`. `managed` is OPTIONAL.

Example: a developer has the same plugin `lint-rules` installed at three scopes:

```text
user:    ~/.agents/plugins/lint-rules/          ← personal install
project: myapp/.agents/plugins/lint-rules/      ← shared via repo
local:   myapp/.acme-host/settings.local.json   ← local override disables it
```

The host discovers all three. Scope precedence ([§11.2](#112-scope-precedence)) determines which one governs runtime behavior — in this case `local` wins, so `lint-rules` is disabled for this developer in this project but still active elsewhere.

### 11.2 Scope precedence

Hosts MUST apply this precedence order, highest to lowest:

1. `local`
2. `project`
3. `managed`
4. `user`

A higher-scope disable overrides a lower-scope enable.

Example: scope precedence scenario

A team shares a project that enables `code-review-plugin` at the `project` scope:

```json
// <project>/.acme-host/settings.json  (project scope)
{
  "enabledPlugins": ["code-review-plugin", "deploy-tools"]
}
```

A developer disables `deploy-tools` locally because they don't have deploy credentials:

```json
// <project>/.acme-host/settings.local.json  (local scope)
{
  "disabledPlugins": ["deploy-tools"]
}
```

The same developer also has a personal plugin enabled at the `user` scope:

```json
// ~/.acme-host/settings.json  (user scope)
{
  "enabledPlugins": ["my-snippets"]
}
```

Effective plugin state for this developer:

| Plugin               | Resolved state | Reason                                           |
| -------------------- | -------------- | ------------------------------------------------ |
| `code-review-plugin` | **enabled**    | Enabled at `project`, not overridden.             |
| `deploy-tools`       | **disabled**   | Enabled at `project`, disabled at `local` (wins). |
| `my-snippets`        | **enabled**    | Enabled at `user`, not overridden.                |

### 11.3 Settings keys

Hosts MUST use these settings keys for per-scope plugin state:

```json
{
  "enabledPlugins": ["plugin-name"],
  "disabledPlugins": ["other-plugin"]
}
```

`enabledPlugins` and `disabledPlugins` entries MUST use the plugin name.

### 11.4 Storage paths

Installed plugins SHOULD be stored under `.agents/plugins/`.

| Scope     | Recommended location                            | Description                                  |
| --------- | ----------------------------------------------- | -------------------------------------------- |
| `user`    | `~/.agents/plugins/<plugin-name>/`              | Recommended user cache and install location. |
| `project` | `<project-root>/.agents/plugins/<plugin-name>/` | Recommended shared project location.         |

Hosts MAY use tool-specific storage paths (e.g., `~/.<tool>/plugins/`). When both `.agents/plugins/` and a tool-specific path contain the same plugin, the tool-specific path takes precedence.

Hosts that provide a persistent data directory ([§10.1.1](#1011-persistent-data-directory)) SHOULD store plugin data separately from the plugin installation directory, so that data survives plugin updates and reinstalls.

Example: after installing `code-review` at user scope, the host stores it at:

```text
~/.agents/plugins/code-review/
├── .plugin/
│   └── plugin.json
└── skills/
    └── review/
        └── SKILL.md
```

### 11.5 Caching and source freshness

1. Hosts SHOULD copy installed plugins into a local cache instead of executing from the original source.
2. Hosts SHOULD use the manifest `version` field to determine cache freshness.
3. If the source changes without a version change, the host MAY continue serving the cached copy.
4. Hosts SHOULD provide an explicit refresh, reinstall, or update flow for unchanged-version source changes.
5. Direct-directory development mode bypasses caching.

Example: a plugin source changes a skill's prompt but keeps `version` at `1.2.0`. The host's cache still contains the old copy. The host MAY continue serving the cached copy until the user runs an explicit refresh command such as `acme-host plugin reinstall code-review`.

### 11.6 Symlinks and traversal

1. When copying a plugin, hosts MUST follow symbolic links.
2. If a symlink targets content outside the source plugin directory, the linked content MAY be copied into the cache.
3. After installation or caching, path references that escape the plugin root via `../` MUST be rejected.

Example: a plugin source contains `skills/shared -> /opt/common-skills/shared` (a symlink). During install the host follows the symlink and copies the target contents into the cache at `~/.agents/plugins/my-plugin/skills/shared/`. After copying, any remaining `../` path references inside the cached plugin are rejected.

### 11.7 Resolution order

Hosts MUST resolve plugins in this order:

1. Direct directory supplied by `--plugin-dir` or equivalent.
2. Cached plugin copy, if present and current.
3. Source directory, copied into cache before load.

In direct-directory development mode:

1. The host loads the plugin directly from the provided directory.
2. No cache copy is required.
3. Changes take effect on host restart.
4. Multiple direct-directory plugins MAY be loaded simultaneously.

Example: a developer is actively editing a plugin:

```bash
# Direct-directory mode — no cache, changes take effect on restart
acme-host --plugin-dir ./my-plugin-dev
```

The host loads `./my-plugin-dev` directly. No copy is made. Editing `./my-plugin-dev/skills/greet/SKILL.md` and restarting the host picks up the change immediately.

### 11.8 Enable, disable, uninstall, and update

1. Disabled plugins MUST NOT have their components loaded.
2. Disabling a plugin does not uninstall it.
3. Uninstall removes the plugin from `enabledPlugins`.
4. A host MAY delete the cached copy during uninstall.
5. Running MCP and LSP servers from an uninstalled plugin MUST be stopped.
6. Update flow compares available source version to installed version, refreshes the cache when newer, and MAY restart running servers from that plugin.

Example: uninstalling a plugin that runs an MCP server:

```text
1. User runs:  acme-host plugin uninstall db-tools
2. Host removes "db-tools" from enabledPlugins.
3. Host stops the running MCP server process "db-tools/database".
4. Host deletes ~/.agents/plugins/db-tools/ (cached copy).
```

The host MUST stop MCP and LSP servers before or during removal to avoid orphaned processes.

## 12. Versioning

Plugins SHOULD use Semantic Versioning for `version`.

| Segment | Meaning                     | Description                                            |
| ------- | --------------------------- | ------------------------------------------------------ |
| Major   | Breaking change             | Incompatible behavior or schema change.                |
| Minor   | Backward-compatible feature | New behavior without breaking existing hosts or users. |
| Patch   | Backward-compatible fix     | Corrective change without intended behavioral break.   |

Hosts MAY use `version` to determine whether updates are available and whether caches are stale.

## 13. Reserved

*Section 13 is reserved for a future marketplace specification. See [Appendix B: Marketplace Index and Discovery](#appendix-b-marketplace-index-and-discovery) for the current draft.*

## 14. Host conformance

### 14.1 Minimum host requirements

A host is conformant to Open Plugin v1 if it:

1. Can discover and load plugins from a directory.
2. Parses `.plugin/plugin.json` when present.
3. Discovers components in default locations.
4. Resolves replace-mode and additive-mode discovery paths.
5. Expands `${PLUGIN_ROOT}` in configuration values as defined by this spec.
6. Namespaces plugin components to prevent conflicts.
7. Supports at least one component type defined by this specification.

Support for a vendor-prefixed manifest location such as `.<tool-name>-plugin/plugin.json` is supplemental. A host that defines such a location MUST still support `.plugin/plugin.json`.

Example: a skills-only host is conformant. It only needs to:

```text
1. Accept a plugin directory path.
2. Read .plugin/plugin.json (if present) for the plugin name.
3. Scan skills/ for SKILL.md files (default location discovery).
4. Respect manifest-declared skill paths (replace-mode: custom paths replace default).
5. Expand ${PLUGIN_ROOT} in any path config values.
6. Namespace each skill as /<plugin-name>:<skill-name>.
```

A host that only supports skills — and ignores hooks, MCP servers, LSP servers, agents, rules, and output styles — is fully conformant to Open Plugin v1 as long as it meets all seven requirements above.

### 14.2 Incremental adoption

A host is not required to support every component type. Incremental adoption is conformant.

### 14.3 Unsupported features

1. Hosts MUST ignore unsupported component types.
2. Hosts MUST ignore unsupported hook events.
3. Hosts MUST continue loading a plugin when an optional component fails independently, such as a missing LSP binary or an MCP server startup failure, unless the host explicitly treats that failure as fatal for that component only.
4. Hosts SHOULD warn when configuration is invalid, conflicting, or partially unsupported.

> **Implementer note:**
> Example user-facing message: `Plugin "devtools": hook event "on_save" is not supported by this host and will be ignored. Other hooks remain active.`
>
> Example machine-readable record:
> ```json
> {"level":"warn","event":"open_plugin.host.unsupported_hook_event","plugin":"devtools","hook_event":"on_save","action":"ignored","continue":true}
> ```

---

## Conformance Checklist

*This checklist is for convenience only — when it conflicts with the spec text above, the spec governs.*

### Plugin loader

- [ ] Parse `.plugin/plugin.json` when present ([§5.1](#51-manifest-locations))
- [ ] Support vendor-prefixed manifest locations if applicable ([§5.1](#51-manifest-locations))
- [ ] Derive plugin name from directory basename when no manifest is present ([§5.3](#53-no-manifest-present))
- [ ] Validate plugin name against naming constraints ([§6.7](#67-plugin-name-constraints))
- [ ] Reject paths that escape the plugin root via `../` ([§4.1](#41-general-requirements))

### Component discovery

- [ ] Scan default locations for each supported component type ([§7.1](#71-default-locations))
- [ ] Support replace-mode discovery for commands, agents, skills, rules, outputStyles ([§6.4](#64-component-path-fields), [§7.3](#73-missing-locations))
- [ ] Support additive-mode discovery for hooks, mcpServers, lspServers ([§6.4](#64-component-path-fields), [§7.3](#73-missing-locations))
- [ ] Ignore missing default directories without error ([§7.3](#73-missing-locations))

### Namespacing

- [ ] Namespace all components as `{plugin-name}:{component-name}` ([§9.1](#91-general-component-namespacing))
- [ ] Include both plugin name and server name in MCP tool identifiers ([§9.2](#92-mcp-tool-identifier-namespacing))

### Environment and expansion

- [ ] Provide `PLUGIN_ROOT` environment variable ([§10.1](#101-required-variables))
- [ ] Expand `${PLUGIN_ROOT}` in all supported configuration fields ([§10.2](#102-placeholder-expansion))

### Installation

- [ ] Support the `user` installation scope ([§11.1](#111-installation-scopes))
- [ ] Apply scope precedence: `local` > `project` > `managed` > `user` ([§11.2](#112-scope-precedence))

### Resilience

- [ ] Ignore unsupported component types ([§14.3](#143-unsupported-features))
- [ ] Ignore unsupported hook events ([§14.3](#143-unsupported-features))
- [ ] Continue loading when optional components fail ([§14.3](#143-unsupported-features))
- [ ] Support at least one component type ([§14.1](#141-minimum-host-requirements))

### Diagnostics matrix

*This table consolidates the failure-handling behaviors defined throughout the spec into a single reference. All behaviors listed below restate existing requirements — no new requirements are introduced. Host implementers can use this matrix to verify that their diagnostic output covers every specified failure site.*

<!-- DISCUSSION: diagnostics-contract -->

| Decision point | Existing spec behavior | Human-readable example | JSON example | Fatal? | Verification |
| --- | --- | --- | --- | --- | --- |
| Inconsistent manifest content | Hosts MAY warn when multiple manifest locations contain inconsistent content ([§5.2](#52-multiple-manifest-locations)) | `WARN open-plugin: plugin "devtools" has inconsistent manifests across .plugin/plugin.json and .claude-plugin/plugin.json; using .claude-plugin/plugin.json` | `{"level":"warn","event":"open_plugin.manifest.inconsistent","plugin":"devtools","selected":".claude-plugin/plugin.json","other":".plugin/plugin.json","action":"used_selected"}` | No | Check that the host selects one manifest and continues |
| Invalid ambiguous object field | Hosts SHOULD treat unrecognized object shapes as invalid and SHOULD warn ([§6.6](#66-object-field-disambiguation)) | `WARN open-plugin: plugin "devtools" manifest field "mcpServers" is invalid: expected either a path config with "paths" key or an inline config with "mcpServers" key; field ignored, plugin load continues` | `{"level":"warn","event":"open_plugin.manifest.invalid_object","plugin":"devtools","field":"mcpServers","action":"ignored","continue":true}` | No | Check that the invalid field is skipped and remaining components load |
| Hook command failure | Exit code `0` indicates success; non-zero indicates failure ([§8.4.3](#843-hook-action-types)). Hosts MUST continue loading when optional components fail ([§14.3](#143-unsupported-features)) | `WARN open-plugin: plugin "devtools" hook command "${PLUGIN_ROOT}/scripts/check-env.sh" exited with code 1 for event "SessionStart"` | `{"level":"warn","event":"open_plugin.hook.command_failed","plugin":"devtools","hook_event":"SessionStart","command":"${PLUGIN_ROOT}/scripts/check-env.sh","exit_code":1,"action":"continue"}` | No | Check that the session continues despite hook failure |
| MCP server startup failure | If a server fails to start, the host SHOULD log the error and continue loading other components ([§8.5.2](#852-mcp-lifecycle-and-discovery)) | `ERROR open-plugin: plugin "devtools" MCP server "database" failed to start: connection refused on port 5432. Other plugin components remain available.` | `{"level":"error","event":"open_plugin.mcp.start_failed","plugin":"devtools","server":"database","error":"connection refused on port 5432","action":"continue_without_mcp"}` | No | Check that other components (hooks, skills, LSP) still load |
| MCP server name conflict | Hosts SHOULD warn and SHOULD resolve conflicts deterministically. Conflicting names MUST NOT crash plugin loading ([§8.5.2](#852-mcp-lifecycle-and-discovery)) | `WARN open-plugin: plugin "devtools" MCP server name "filesystem" conflicts across .mcp.json and inline manifest config; using .mcp.json definition` | `{"level":"warn","event":"open_plugin.mcp.name_conflict","plugin":"devtools","server":"filesystem","sources":[".mcp.json","manifest_inline"],"resolved":".mcp.json","action":"used_first"}` | No | Check that one definition wins deterministically and loading continues |
| Missing LSP binary | If the configured binary is missing, the host MUST log a clear error and continue loading other components ([§8.6.3](#863-lsp-lifecycle-and-capability-notes)) | `ERROR open-plugin: plugin "devtools" LSP server "typescript" was not started because "typescript-language-server" was not found on PATH. Other plugin components remain available.` | `{"level":"error","event":"open_plugin.lsp.binary_missing","plugin":"devtools","server":"typescript","command":"typescript-language-server","action":"continue_without_lsp"}` | No | Check that plugin loads without LSP functionality |
| Unsupported component type | Hosts MUST ignore unsupported component types ([§14.3](#143-unsupported-features)) | `INFO open-plugin: plugin "devtools" declares component type "agents" which is not supported by this host; ignored` | `{"level":"info","event":"open_plugin.host.unsupported_component","plugin":"devtools","component_type":"agents","action":"ignored"}` | No | Check that supported components still load |
| Unsupported hook event | Hosts MUST ignore unsupported hook events ([§14.3](#143-unsupported-features)) | `INFO open-plugin: plugin "devtools" declares hook event "SubagentStart" which is not supported by this host; ignored` | `{"level":"info","event":"open_plugin.host.unsupported_hook_event","plugin":"devtools","hook_event":"SubagentStart","action":"ignored"}` | No | Check that other hook events in the same plugin still fire |
| Partial host support | Hosts SHOULD warn when configuration is invalid, conflicting, or partially unsupported ([§14.3](#143-unsupported-features)) | `WARN open-plugin: plugin "devtools" is partially supported: this host supports skills and hooks but not mcpServers or lspServers` | `{"level":"warn","event":"open_plugin.host.partial_support","plugin":"devtools","supported":["skills","hooks"],"unsupported":["mcpServers","lspServers"],"action":"loaded_partial"}` | No | Check that supported components are functional |

> **Implementer note:** The `event` field values above (e.g., `open_plugin.manifest.invalid_object`) are *suggested* stable identifiers — not required by this spec. Hosts that adopt them gain a machine-readable diagnostic surface that agents, CI pipelines, and plugin validators can consume deterministically. The recommended fields for every diagnostic record are: `level`, `event`, `plugin` (plugin name), the relevant component identifier (e.g., `server`, `field`, `hook_event`), and `action` (what the host did in response).

---

## Design Decisions

*This section explains why key design choices were made. It is for context only — the binding rules are in sections 1–14 above.*

### Why directory-based discovery?

Plugins use filesystem directories as the package unit rather than archive formats (`.zip`, `.tar.gz`) or registry-fetched bundles. This keeps plugins inspectable with standard tools (`ls`, `cat`, `git`), editable in-place during development, and compatible with version control without special tooling.

### Why colon-separated namespacing for components?

The `plugin-name:component-name` format was chosen because colons are visually distinct, rarely appear in filenames, and align with existing conventions in tools like Claude Code's slash commands (`/plugin:command`). Alternatives considered included `/` (conflicts with filesystem paths) and `__` (less readable for user-facing identifiers).

### Why underscore-based namespacing for MCP tools?

MCP tool identifiers are consumed by language models, which may tokenize or interpret colons and slashes unpredictably. The `mcp__plugin_{plugin}_{server}__{tool}` format uses only characters that models handle reliably. The double-underscore separators provide unambiguous parsing boundaries even when plugin or tool names contain single underscores.

### Why `.plugin/plugin.json` is the conformance floor

Every conformant host MUST check `.plugin/plugin.json` as the vendor-neutral manifest location ([§5.1](#51-manifest-locations)). This gives plugin authors a single guaranteed path that works across all hosts without vendor-specific knowledge. Vendor-prefixed manifests (e.g., `.claude-plugin/plugin.json`) are supplemental overrides — they let a plugin customize behavior for a specific host, but a plugin that ships only `.plugin/plugin.json` is portable by default. Making the vendor-neutral path mandatory and vendor-prefixed paths optional keeps the ecosystem interoperable while allowing per-host specialization where needed.

### Why `.plugin/` instead of a dotfile manifest?

A metadata directory (`.plugin/`) allows the manifest to coexist with future metadata files (e.g., `marketplace.json`, lock files) without polluting the plugin root with multiple dotfiles. A single well-known directory is also easier for hosts to check than scanning for multiple dotfile patterns.

### Why replace-mode and additive-mode discovery

Component path fields are split into two modes ([§6.4](#64-component-path-fields)): **replace-mode** (`commands`, `agents`, `skills`, `rules`, `outputStyles`) and **additive-mode** (`hooks`, `mcpServers`, `lspServers`).

Replace-mode fields give plugin authors precise control over what is exposed. When a manifest declares custom paths for commands, agents, skills, rules, or output styles, only those paths are scanned — the default directory is not. This prevents development-only or internal components from being accidentally surfaced in production. To retain the default directory, the author explicitly includes it in the array.

Additive-mode fields reflect a different reality: hooks, MCP servers, and LSP servers naturally accumulate from multiple sources (plugin defaults, manifest declarations, settings files, managed policies). Merging these sources is the expected behavior, so custom paths combine with rather than replace the default. The `exclusive` flag on additive fields provides an escape hatch for plugins that need tight control.

### Why MCP tool IDs include both plugin and server names

The namespaced MCP tool identifier `mcp__plugin_{plugin}_{server}__{tool}` embeds both the plugin name and the server name ([§9.2](#92-mcp-tool-identifier-namespacing)). Including the plugin name prevents collisions when two plugins ship servers with the same name. Including the server name prevents collisions when a single plugin ships multiple servers that expose tools with the same base name. Both segments are necessary for unambiguous identification in hosts that load many plugins concurrently.

### Why `${PLUGIN_ROOT}` over relative paths in configs?

Hook commands, MCP server arguments, and LSP configurations often need absolute paths at runtime. Relative paths from the config file location would be ambiguous when configs are loaded from different directories. `${PLUGIN_ROOT}` provides an unambiguous, host-resolved anchor that works regardless of the current working directory.

### Why optional manifests?

Requiring a manifest raises the barrier to entry. A plugin that is just a `SKILL.md` file in a directory should work without boilerplate. The manifest becomes necessary only when a plugin needs custom discovery paths, metadata, or inline configurations.

### Why optional-component failures are non-fatal

When an MCP server fails to start, an LSP binary is missing, or a hook command exits non-zero, the host continues loading the remaining components ([§14.3](#143-unsupported-features)). This design reflects the reality that plugins bundle heterogeneous components with different runtime dependencies — a plugin that provides skills, hooks, *and* an MCP server should not become entirely unusable because one server's port is occupied. Non-fatal failures also make plugins more resilient in constrained environments (CI runners, containers, minimal installs) where not every runtime dependency is available. The spec pairs this with diagnostic requirements so that failures are visible rather than silent.

<!-- DISCUSSION: diagnostics-contract -->

---

## Future Considerations

*Everything in this section is deferred from v1.0.0. Nothing here is required for conformance. These items may be addressed in future versions.*

### Permission and approval UX

v1.0.0 does not define a trust model, permission system, or sandboxing requirements for plugins. A future version should address:

- Permission declarations in the manifest (e.g., filesystem access, network access, tool access)
- Host-enforced capability restrictions per plugin
- User consent flows for plugin installation and capability grants
- Approval UX for hooks and MCP servers that execute arbitrary commands or access external services
- Graduated trust levels (e.g., "sandboxed", "user-approved", "organization-approved")

### Provenance verification

v1.0.0 does not specify how hosts or users can verify the origin or integrity of a plugin. A future version may define:

- Cryptographic signature verification for published plugins
- Attestation chains linking a published plugin to its source repository and build
- Host-side policies for requiring signatures from trusted publishers

### Secret and sensitive value handling

Plugin components (hooks, MCP servers, LSP servers) often need credentials or API keys at runtime. v1.0.0 does not specify how sensitive values should be provided, stored, or scoped. A future version may define:

- A `secrets` manifest field or separate secrets configuration
- Host-mediated secret injection that avoids plaintext in config files
- Scoping rules that prevent one plugin from accessing another plugin's secrets
- Rotation and revocation semantics for plugin-held credentials

### Enterprise controls

Organizations deploying plugins at scale need policy enforcement that v1.0.0 does not address. A future version may define:

- Allowlist and blocklist policies for plugin installation by name, publisher, or signature
- Organization-scoped plugin registries with approval workflows
- Centralized configuration overrides that take precedence over user-level plugin settings
- Compliance reporting hooks for plugin installation and usage events

### Audit-trail standardization

v1.0.0 defines diagnostic events for failure sites but does not standardize lifecycle audit events. A future version may define:

- A standard event schema for plugin install, enable, disable, update, and uninstall actions
- Recommended fields: timestamp, actor (user or automation), plugin name, plugin version, action, outcome
- Integration points for forwarding audit events to external logging or SIEM systems
- Retention and access policies for audit records

### Dependency resolution

Plugins currently cannot declare dependencies on other plugins. A future version may define:

- A `dependencies` manifest field with version constraints
- Resolution order and conflict handling for transitive dependencies
- Peer dependency semantics for shared components

### Binary distribution

v1.0.0 assumes plugins are source-distributable (scripts, markdown, JSON configs). A future version may address:

- Precompiled binary distribution for MCP and LSP servers
- Platform-specific binary selection
- Integrity verification for binary artifacts

### Message channels

Some hosts support a `channels` manifest field for message channel injection (e.g., Telegram, Slack, Discord style integrations) bound to MCP servers. This feature is host-specific and too specialized for v1 core. A future version may define:

- A `channels` manifest field with per-channel MCP server bindings
- Per-channel user configuration for credentials and settings
- A standard protocol for channel message injection into conversations

### Output styles runtime semantics

The `outputStyles` field is defined only at the discovery level. A future version should specify the runtime format and rendering contract for output style resources.

### Plugin testing and validation

No test harness or validation tool is specified. A future version may define:

- A `test` manifest field or convention
- A standard plugin linter or validator command
- Conformance test suites for host implementations

---

## Appendix B: Marketplace Index and Discovery

*This appendix is not required for v1 conformance. It describes a marketplace indexing mechanism implemented by some hosts. A future version of the spec may promote this to a required section after cross-tool validation.*

### B.1 Marketplace discovery order

Hosts that support marketplaces SHOULD search for `marketplace.json` in this order:

| Path                                   | Priority | Description                         |
| -------------------------------------- | -------- | ----------------------------------- |
| `marketplace.json`                     | First    | Marketplace root index.             |
| `.plugin/marketplace.json`             | Second   | Vendor-neutral metadata directory.  |
| `.<tool-name>-plugin/marketplace.json` | Third    | Vendor-specific metadata directory. |

The first match wins.

### B.2 Marketplace schema

Required fields:

| Field     | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| `name`    | string | Marketplace identifier.            |
| `plugins` | array  | Non-empty array of plugin entries. |

Optional fields:

| Field                 | Type   | Description                                                   |
| --------------------- | ------ | ------------------------------------------------------------- |
| `owner`               | object | Marketplace owner with `name` and optional `email` and `url`. |
| `metadata`            | object | Marketplace-level metadata.                                   |
| `metadata.pluginRoot` | string | Base path for plugin `source` resolution. Defaults to `.`.    |

### B.3 Plugin entries

| Field         | Type     | Description                                                                                  |
| ------------- | -------- | -------------------------------------------------------------------------------------------- |
| `name`        | string   | Required plugin name. Must satisfy plugin name constraints.                                  |
| `source`      | string   | Required relative path from `metadata.pluginRoot` or marketplace root. Must start with `./`. |
| `description` | string   | Optional marketplace description override.                                                   |
| `version`     | string   | Optional marketplace version override for update checks.                                     |
| `author`      | object   | Optional marketplace author override.                                                        |
| `license`     | string   | Optional marketplace license override.                                                       |
| `keywords`    | string[] | Optional marketplace keywords override.                                                      |
| `skills`      | string[] | Optional explicit skill paths relative to the marketplace root.                              |

For marketplace-level operations such as display, search, and update checks, plugin-entry metadata overrides manifest metadata. Runtime plugin behavior continues to use the plugin manifest and plugin contents.

Example:

```json
{
  "name": "acme-plugins",
  "owner": { "name": "Acme Corp", "url": "https://acme.example.com" },
  "metadata": { "pluginRoot": "./plugins" },
  "plugins": [
    {
      "name": "code-review",
      "source": "./code-review",
      "description": "Automated code review with security checks.",
      "version": "2.1.0",
      "keywords": ["review", "security"]
    },
    {
      "name": "deploy-tools",
      "source": "./deploy-tools",
      "version": "1.0.3",
      "license": "Apache-2.0"
    }
  ]
}
```

### B.4 `pluginRoot` resolution

`metadata.pluginRoot` defines the base directory for resolving each plugin entry `source`. If omitted, `source` is resolved relative to the directory containing `marketplace.json`.

### B.5 Fallback scanning without an index

If no marketplace index is found, hosts SHOULD check whether the root directory itself is a plugin, scan immediate subdirectories, and scan one additional level deep.

### B.6 Marketplace name derivation

| Source                        | Derived name                         |
| ----------------------------- | ------------------------------------ |
| GitHub shorthand `owner/repo` | `owner-repo`                         |
| Git URL                       | Last two path segments joined by `-` |
| Local directory path          | Directory basename                   |

---

## Appendix C: User Configuration

*This appendix is not required for v1 conformance. It describes a user configuration mechanism implemented by some hosts. Hosts MAY implement `userConfig`. A future version of the spec may promote this to a required section.*

### C.1 Schema

The optional `userConfig` manifest field allows plugins to declare user-configurable values that the host prompts for when the plugin is enabled.

Each key in `userConfig` maps to a config descriptor:

| Field         | Type    | Description                                                                                       |
| ------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `description` | string  | Required human-readable description of the configuration value.                                   |
| `sensitive`   | boolean | If `true`, the host SHOULD store this value securely (e.g., system keychain). Defaults to `false`. |

Configuration keys MUST be valid identifiers (alphanumeric characters and underscores).

Example:

```json
{
  "userConfig": {
    "api_key": {
      "description": "API key for the backend service",
      "sensitive": true
    },
    "output_format": {
      "description": "Preferred output format (json or text)"
    }
  }
}
```

### C.2 Value substitution

User config values are available as `${user_config.KEY}` placeholders in MCP/LSP server configurations, hook commands, and (for non-sensitive values only) skill and agent content.

### C.3 Environment variable export

Hosts SHOULD export user config values to plugin subprocesses as environment variables using the pattern `PLUGIN_OPTION_<KEY>`. Hosts MAY additionally export vendor-prefixed equivalents such as `CLAUDE_PLUGIN_OPTION_<KEY>`.

### C.4 Storage

Non-sensitive values SHOULD be stored in the host's settings file. Sensitive values SHOULD be stored in a secure credential store (e.g., system keychain).

---

## Appendix D: Extended Hook Events

*This appendix is not required for v1 conformance. It catalogs hook events implemented by existing hosts beyond the core set in [§8.4.2](#842-hook-events). Hosts MAY support any subset of these. Plugin authors should check host documentation for supported events.*

| Event                | Matcher context   | Description                                       | Known hosts  |
| -------------------- | ----------------- | ------------------------------------------------- | ------------ |
| `UserPromptSubmit`   | None              | Fires when a user prompt is submitted.            | Claude Code  |
| `Stop`               | None              | Fires when the agent finishes responding.         | Claude Code  |
| `StopFailure`        | Error type        | Fires when a turn ends due to an API error.       | Claude Code  |
| `SubagentStart`      | Agent type        | Fires when a sub-agent starts.                    | Claude Code  |
| `SubagentStop`       | Agent type        | Fires when a sub-agent stops.                     | Claude Code  |
| `PreCompact`         | Trigger           | Fires before context compaction.                  | Claude Code  |
| `PostCompact`        | Trigger           | Fires after context compaction completes.         | Claude Code  |
| `TeammateIdle`       | None              | Fires when a teammate agent is about to idle.     | Claude Code  |
| `TaskCreated`        | None              | Fires when a task is created.                     | Claude Code  |
| `TaskCompleted`      | None              | Fires when a task is marked completed.            | Claude Code  |
| `Notification`       | Notification type | Fires when the host sends a notification.         | Claude Code  |
| `PermissionRequest`  | None              | Fires when a permission dialog is shown.          | Claude Code  |
| `InstructionsLoaded` | Load reason       | Fires when instruction files are loaded.          | Claude Code  |
| `ConfigChange`       | Config source     | Fires when a configuration file changes.          | Claude Code  |
| `CwdChanged`         | None              | Fires when the working directory changes.         | Claude Code  |
| `FileChanged`        | Filename          | Fires when a watched file changes on disk.        | Claude Code  |
| `WorktreeCreate`     | None              | Fires when a worktree is being created.           | Claude Code  |
| `WorktreeRemove`     | None              | Fires when a worktree is being removed.           | Claude Code  |
| `Elicitation`        | MCP server name   | Fires when an MCP server requests user input.     | Claude Code  |
| `ElicitationResult`  | MCP server name   | Fires when a user responds to an MCP elicitation. | Claude Code  |

As additional hosts adopt the Open Plugin format, this table will be updated with cross-host event support information. Events supported by multiple hosts are candidates for promotion to the core set in future spec versions.
