# Marketplaces

**Part of the [Open Plugin Specification](specification.md)**

A marketplace is a directory (typically a git repository) that indexes one or more plugins for discovery and installation.

## Marketplace Structure

A marketplace is a directory containing a `marketplace.json` file and one or more plugin directories:

```
my-marketplace/
├── marketplace.json          # Marketplace index
├── formatter/                # A plugin directory
│   ├── .plugin/
│   │   └── plugin.json
│   ├── skills/
│   └── hooks/
├── linter/                   # Another plugin
│   └── ...
└── README.md                 # Optional
```

## Marketplace Index Location

Tools MUST check for `marketplace.json` at the repository root.

Tools MAY additionally check `.plugin/marketplace.json` at the repository root. This allows tool-specific marketplace directories (e.g., `.cursor-plugin/marketplace.json`, `.claude-plugin/marketplace.json`) to coexist in a single repository.

When both locations exist, `marketplace.json` at the root takes precedence.

## `marketplace.json` Schema

The marketplace index file lists all available plugins.

```json
{
  "name": "my-marketplace",
  "owner": {
    "name": "ACME DevTools",
    "email": "plugins@acme.com"
  },
  "metadata": {
    "description": "A collection of developer tool plugins"
  },
  "plugins": [
    {
      "name": "formatter",
      "description": "Auto-formats code on save using project-specific rules.",
      "version": "1.2.0",
      "source": "./formatter",
      "logo": "assets/formatter-logo.svg",
      "category": "code-quality",
      "tags": ["formatting", "prettier", "eslint"]
    },
    {
      "name": "linter",
      "description": "Runs ESLint and reports issues inline.",
      "version": "2.0.1",
      "source": "./linter"
    }
  ]
}
```

### Top-Level Fields

| Field | Required | Type | Description |
|---|---|---|---|
| `name` | Yes | string | Marketplace identifier. Used in `plugin-name@marketplace-name` references. |
| `plugins` | Yes | PluginEntry[] | Array of plugin entries. |
| `owner` | No | object | Marketplace owner: `name` (string, RECOMMENDED), `email` (string, optional). |
| `metadata` | No | object | Additional marketplace metadata: `description` (string), `version` (string), `pluginRoot` (string — prefix path for all plugin sources). |

### Plugin Entry Fields

| Field | Required | Type | Description |
|---|---|---|---|
| `name` | Yes | string | Plugin name. MUST match the plugin's manifest `name` (if present) or directory name. |
| `description` | Yes | string | Brief description for discovery and browsing. |
| `version` | RECOMMENDED | string | Semantic version. If also set in the plugin's `plugin.json`, the `plugin.json` value takes priority. |
| `source` | Yes | string \| object | Relative path from `marketplace.json` to the plugin directory (string), or an object with `path` (string) and additional options. String values MUST start with `./`. |
| `logo` | No | string | Relative path to a logo file, or an absolute URL. Used in marketplace UIs. |
| `category` | No | string | Plugin category for marketplace organization (e.g., `"code-quality"`, `"deployment"`, `"testing"`). |
| `tags` | No | string[] | Additional tags for search and filtering. |
| `author` | No | object | Author info (same schema as manifest `author`). Overridden by the plugin manifest if present. |
| `homepage` | No | string | URL to plugin homepage. Overridden by plugin manifest if present. |
| `repository` | No | string | URL to plugin repository. Overridden by plugin manifest if present. |
| `license` | No | string | License identifier. Overridden by plugin manifest if present. |
| `keywords` | No | string[] | Discovery keywords. Merged with plugin manifest keywords. |

### Name Constraints

The marketplace `name` field follows the same constraints as plugin names:
- 1-64 characters
- Lowercase alphanumeric, hyphens, and periods
- Must start and end with an alphanumeric character
- Must not contain consecutive hyphens or periods

## Version Management

Versions can be specified in two places:

1. The `version` field in the marketplace entry (`marketplace.json`)
2. The `version` field in the plugin manifest (`.plugin/plugin.json`)

If both are set, the plugin manifest value takes priority. You only need to set the version in one place.

Tools use the version to:
- Determine whether an update is available
- Decide whether to refresh the plugin cache

If the version is not set in either location, tools cannot determine whether a plugin has been updated. Authors SHOULD always set a version in at least one location.

## Marketplace Entry Resolution

When a plugin has both a marketplace entry and a per-plugin manifest (`.plugin/plugin.json`):

1. The tool reads the marketplace entry to find the plugin's `source` path.
2. The `source` path is resolved to the plugin directory.
3. The per-plugin manifest is loaded from the plugin directory.
4. Manifest values take precedence over marketplace entry values for shared fields (`version`, `description`, `author`, `homepage`, `repository`, `license`).
5. Marketplace-only fields (`source`, `logo`, `category`, `tags`) are used from the marketplace entry.
6. Component discovery runs within the plugin directory using the plugin manifest paths or folder-based discovery as fallback.

## Discovery

Tools discover marketplaces through configuration. The exact mechanism is tool-defined, but typically:

1. **Built-in marketplaces**: Tools MAY ship with default marketplace URLs.
2. **User-configured marketplaces**: Users add marketplace paths or URLs to their settings.
3. **Project-configured marketplaces**: Projects declare marketplaces in their project settings (e.g., for team-internal plugins).

### Marketplace Configuration Example

```json
{
  "pluginMarketplaces": [
    "https://github.com/org/plugin-marketplace",
    "/path/to/local/marketplace"
  ]
}
```

The exact settings key and format are tool-defined.

## Installation Flow

When a user installs a plugin from a marketplace:

1. The tool reads `marketplace.json` to find the plugin entry.
2. The `source` path is resolved relative to `marketplace.json`.
3. The plugin directory is copied to the local [plugin cache](installation.md#plugin-caching).
4. The plugin is added to `enabledPlugins` in the appropriate [scope](installation.md#installation-scopes).

## Plugin References

Plugins installed from marketplaces are referenced as `plugin-name@marketplace-name`:

```
formatter@my-marketplace
```

This allows the same plugin name to exist in different marketplaces without conflict.

When a plugin name is unique across all configured marketplaces, tools SHOULD allow referencing it without the marketplace qualifier:

```
formatter
```

## Git-Based Marketplaces

The most common marketplace distribution method is a git repository. Tools SHOULD support cloning and updating git-based marketplaces.

For git-based marketplaces:
- The repository is cloned locally (or fetched periodically).
- `marketplace.json` is at the repository root.
- Plugin versions and updates are tracked via git.

## Validation

Tools SHOULD validate marketplace entries on load:
- Each plugin entry has a `name`, `description`, and `source`.
- The `source` path resolves to an existing directory.
- The resolved directory is a valid plugin (contains components or a manifest).
- If the plugin has a manifest, the `name` matches the marketplace entry `name`.

Validation errors SHOULD be logged but MUST NOT prevent other valid plugins from loading.
