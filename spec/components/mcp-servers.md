# MCP Servers

**Component of the [Open Plugin Specification](../specification.md)**

Plugins can bundle [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) servers to provide the agent with additional tools and data sources.

## Configuration Format

MCP servers are configured in a JSON file. The default location is `.mcp.json` at the plugin root.

```json
{
  "mcpServers": {
    "plugin-database": {
      "command": "${PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_PATH": "${PLUGIN_ROOT}/data"
      }
    },
    "plugin-api": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${PLUGIN_ROOT}"
    }
  }
}
```

MCP servers MAY also be declared inline in the manifest's `mcpServers` field using the same schema.

## Top-Level Schema

The configuration file MUST contain an `mcpServers` object. Each key is the server name (unique within the plugin), and each value is a server configuration.

```json
{
  "mcpServers": {
    "<server-name>": { <ServerConfig> },
    "<server-name>": { <ServerConfig> }
  }
}
```

## Server Configuration Schema

| Field | Required | Type | Description |
|---|---|---|---|
| `command` | Yes | string | The executable to run. May be an absolute path, a `${PLUGIN_ROOT}` path, or a command on `$PATH`. |
| `args` | No | string[] | Command-line arguments. `${PLUGIN_ROOT}` is expanded in each argument. |
| `env` | No | object | Environment variables to set when starting the server. Values support `${PLUGIN_ROOT}` expansion. |
| `cwd` | No | string | Working directory for the server process. Supports `${PLUGIN_ROOT}` expansion. |

## Path Expansion

All string values in the server configuration MUST have `${PLUGIN_ROOT}` expanded to the absolute path of the plugin's root directory at load time.

## Lifecycle

- Plugin MCP servers MUST start automatically when the plugin is enabled.
- Plugin MCP servers MUST stop when the plugin is disabled or the session ends.
- If a server fails to start, the tool SHOULD log the error and continue loading other components.
- Tools MAY restart servers that crash during a session.

## Integration Behavior

- MCP server tools appear alongside the agent's built-in tools.
- Plugin MCP servers are managed independently of any user-configured MCP servers.
- Tools SHOULD namespace MCP server names to prevent conflicts between plugins (e.g., `plugin-name:server-name`).

## Discovery

Tools MUST discover MCP server configurations in:
1. `.mcp.json` at the plugin root
2. Inline in the manifest's `mcpServers` field (if it is an object)
3. Any additional paths declared in the manifest's `mcpServers` field (if it is a string or string array)

If multiple sources define the same server name, the behavior is tool-defined. Tools SHOULD warn about conflicts.

## Compatibility

This spec does not redefine the MCP protocol. Plugin MCP servers MUST implement the [Model Context Protocol](https://modelcontextprotocol.io/) as specified by that project. This component spec only defines how MCP servers are **bundled and configured** within a plugin.
