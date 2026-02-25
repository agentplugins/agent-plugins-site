# Installation

**Part of the [Open Plugin Specification](specification.md)**

This document defines how plugins are installed, scoped, cached, and resolved by conformant tools.

## Installation Scopes

When a plugin is installed, it is associated with a **scope** that determines where it is available and who can use it.

| Scope | Typical Settings File | Use Case |
|---|---|---|
| `user` | `~/.config/<tool>/settings.json` | Personal plugins available across all projects. Default scope. |
| `project` | `.config/<tool>/settings.json` in project root | Team plugins shared via version control. |
| `local` | `.config/<tool>/settings.local.json` in project root | Project-specific plugins, not committed to version control. |
| `managed` | Managed by external tooling | Organization-managed plugins. Read-only for end users. |

Tools MUST support at least the `user` scope. Tools SHOULD support `project` and `local` scopes. The `managed` scope is OPTIONAL.

### Scope Precedence

When the same plugin is installed at multiple scopes, tools MUST apply the following precedence (highest to lowest):

1. `local`
2. `project`
3. `managed`
4. `user`

A plugin disabled at a higher-precedence scope overrides it being enabled at a lower-precedence scope.

### Settings File Format

Each scope stores its plugin configuration in a settings file. The relevant section:

```json
{
  "enabledPlugins": [
    "plugin-name",
    "another-plugin"
  ],
  "disabledPlugins": [
    "disabled-plugin"
  ]
}
```

The exact settings file location and name are tool-defined. The `enabledPlugins` and `disabledPlugins` arrays MUST use the plugin name.

## Plugin Caching

For security and stability, tools SHOULD copy installed plugins to a local **plugin cache** rather than using them in-place from their source directory.

### Cache Behavior

1. When a plugin is installed, the tool copies the plugin directory to the cache.
2. Subsequent loads use the cached copy.
3. The `version` field in the manifest is used to determine whether the cache is stale.
4. If the plugin version has not changed, the tool MAY serve the cached copy without checking the source.

### Cache Location

The cache location is tool-defined. A RECOMMENDED location is:

```
~/.config/<tool>/plugins/cache/<plugin-name>/
```

### Symlink Handling

When copying a plugin to the cache, tools MUST follow symbolic links. If a plugin contains symlinks to files outside its directory, the linked content is copied into the cache. This allows plugins to reference shared resources during development.

### Path Traversal

Installed plugins MUST NOT reference files outside their directory tree. Paths containing `../` that would escape the plugin root MUST be rejected.

This restriction applies after caching: since external files are not copied to the cache (only symlink targets are), references using `../` will fail.

## Plugin Resolution

When loading plugins, tools resolve them in this order:

1. **Direct directory** (`--plugin-dir` flag or equivalent): Load the plugin directly from the specified directory. No caching. Used for development.
2. **Cache**: Load from the plugin cache if a cached version exists and is up-to-date.
3. **Source**: Copy from the source directory to the cache, then load from cache.

## Enabling and Disabling

- Plugins can be enabled and disabled independently per scope.
- A disabled plugin's components MUST NOT be loaded.
- Disabling a plugin does not uninstall it — it remains in the cache and can be re-enabled.

## Development Mode

Tools SHOULD support loading plugins directly from a directory for development purposes, bypassing the cache system entirely.

```bash
# Example: load a plugin in development
<tool> --plugin-dir ./my-plugin
```

In development mode:
- The plugin is loaded directly from the specified path.
- No caching is performed.
- Changes to plugin files take effect on restart.
- Multiple plugins MAY be loaded simultaneously.

## Uninstallation

When a plugin is uninstalled:
1. It is removed from the scope's `enabledPlugins` list.
2. The cached copy MAY be deleted.
3. Any running MCP or LSP servers from the plugin MUST be stopped.

## Update Flow

When updating a plugin:
1. The tool checks the source for a newer version (comparing `version` fields).
2. If a newer version exists, the cache is refreshed with the new copy.
3. Running servers from the plugin MAY need to be restarted.

Tools SHOULD provide a command or interface for checking and applying updates.
