# Marketplace

**Part of the [Open Plugin Specification](specification.md)**

This document defines the marketplace format — a way to group multiple plugins into a single distributable collection.

## Overview

A **marketplace** is a named collection of one or more plugins. It acts as an index: it declares which plugins are available, where they live, and basic metadata about each one.

Marketplaces solve the multi-plugin distribution problem. A single GitHub repository, directory, or registry endpoint can contain multiple plugins. The marketplace index tells tools what's inside without requiring them to scan the filesystem.

## Marketplace Index

The marketplace index is a `marketplace.json` file. It lists the plugins in the collection and their locations.

### Location

Tools MUST check for the marketplace index in the following locations, in order:

| Path | Priority |
|---|---|
| `marketplace.json` | First (root of repository or directory) |
| `.plugin/marketplace.json` | Second |
| `.<tool-name>-plugin/marketplace.json`/`.github/plugin/marketplace.json` | Third (vendor-specific) |

The first match wins. If no marketplace index is found, the tool falls back to plugin-level discovery (scanning for `plugin.json` manifests and default component directories).

### Schema

```json
{
  "name": "my-marketplace",
  "owner": {
    "name": "Author or Organization"
  },
  "metadata": {
    "pluginRoot": "./plugins"
  },
  "plugins": [
    {
      "name": "plugin-one",
      "source": "./plugin-one/",
      "description": "First plugin in the collection.",
      "version": "1.0.0"
    },
    {
      "name": "plugin-two",
      "source": "./plugin-two/",
      "description": "Second plugin in the collection.",
      "version": "2.1.0"
    }
  ]
}
```

### Required Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the marketplace. Used to identify the source when plugins are installed. |
| `plugins` | array | List of plugin entries. Must contain at least one entry. |

### Optional Fields

| Field | Type | Description |
|---|---|---|
| `owner` | object | Author or organization. Contains `name` (string), and optionally `email` (string) and `url` (string). |
| `metadata` | object | Additional marketplace-level configuration. |
| `metadata.pluginRoot` | string | Base path for resolving plugin `source` paths. Defaults to `"."` (the directory containing `marketplace.json`). |

### Plugin Entry Fields

Each object in the `plugins` array describes one plugin in the collection.

| Field | Required | Type | Description |
|---|---|---|---|
| `name` | Yes | string | Plugin name. Must follow the same [name constraints](specification.md#name-constraints) as the plugin manifest `name` field. |
| `source` | Yes | string | Relative path from `metadata.pluginRoot` (or the marketplace root) to the plugin directory. Must start with `./`. |
| `description` | No | string | Brief description of the plugin. Overrides the plugin manifest's description for marketplace display. |
| `version` | No | string | Semantic version. Overrides the plugin manifest's version for update checks. |
| `author` | No | object | Author information (same format as the plugin manifest `author` field). |
| `license` | No | string | SPDX license identifier. |
| `keywords` | No | string[] | Tags for discovery and search. |
| `skills` | No | string[] | Explicit skill paths relative to the marketplace root. When present, only these paths are used for skill discovery instead of scanning the plugin's `skills/` directory. |

When a plugin entry includes metadata fields (`description`, `version`, `author`, `license`, `keywords`), these values take precedence over the corresponding fields in the plugin's own `plugin.json` manifest for marketplace-level operations (display, search, update checks). The plugin manifest remains the source of truth at runtime.

## Multi-Plugin Repositories

A common use case is a single repository containing multiple plugins:

```
my-org-plugins/
├── marketplace.json
├── code-quality/
│   ├── .plugin/plugin.json
│   ├── skills/
│   └── rules/
├── deployment/
│   ├── .plugin/plugin.json
│   ├── skills/
│   ├── hooks/
│   └── .mcp.json
└── documentation/
    ├── .plugin/plugin.json
    ├── agents/
    └── skills/
```

With `marketplace.json`:

```json
{
  "name": "my-org-plugins",
  "owner": { "name": "My Organization" },
  "plugins": [
    { "name": "code-quality", "source": "./code-quality/", "description": "Linting, review, and code standards." },
    { "name": "deployment", "source": "./deployment/", "description": "Deploy workflows and automation." },
    { "name": "documentation", "source": "./documentation/", "description": "Doc generation and maintenance." }
  ]
}
```

### Using `pluginRoot`

For repositories where plugins are nested under a subdirectory:

```
my-repo/
├── marketplace.json
├── src/
└── plugins/
    ├── plugin-a/
    └── plugin-b/
```

```json
{
  "name": "my-repo",
  "metadata": { "pluginRoot": "./plugins" },
  "plugins": [
    { "name": "plugin-a", "source": "./plugin-a/" },
    { "name": "plugin-b", "source": "./plugin-b/" }
  ]
}
```

The `source` paths are resolved relative to `pluginRoot`, so `plugin-a` resolves to `./plugins/plugin-a/`.

## Discovery Without a Marketplace Index

If no `marketplace.json` is found, tools SHOULD fall back to filesystem-based discovery:

1. Check if the root directory itself is a plugin (has a manifest or default component directories).
2. Scan immediate subdirectories (up to 2 levels deep) for plugin directories.

This ensures standalone plugins work without requiring a marketplace index.

## Marketplace Name Derivation

When installing from a source that does not provide an explicit marketplace name, tools SHOULD derive one:

| Source | Derived Name |
|---|---|
| GitHub shorthand (`owner/repo`) | `owner-repo` |
| Git URL | Last two path segments joined by `-` |
| Local directory path | Directory basename |

## Relationship to Tool-Specific Registries

The `marketplace.json` format is an interchange format for declaring plugin collections. Individual tools may operate their own registries, storefronts, or discovery mechanisms on top of this format.

Tools that support plugin installation from Git repositories or local directories SHOULD support `marketplace.json` discovery. Tools with their own native registry format MAY also accept `marketplace.json` as an import/sync source.
