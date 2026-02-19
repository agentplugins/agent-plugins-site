# LSP Servers

**Component of the [Open Plugin Specification](../specification.md)**

Plugins can provide [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) server configurations to give agents real-time code intelligence — diagnostics, go-to-definition, find references, and hover information.

## Important: Binary Not Bundled

LSP plugins configure how the host tool connects to a language server. They do **not** bundle the language server binary itself. Users MUST install the required language server separately.

## Configuration Format

LSP servers are configured in a JSON file. The default location is `.lsp.json` at the plugin root.

```json
{
  "go": {
    "command": "gopls",
    "args": ["serve"],
    "extensionToLanguage": {
      ".go": "go"
    }
  },
  "python": {
    "command": "pyright-langserver",
    "args": ["--stdio"],
    "extensionToLanguage": {
      ".py": "python",
      ".pyi": "python"
    }
  }
}
```

LSP servers MAY also be declared inline in the manifest's `lspServers` field using the same schema.

## Top-Level Schema

The configuration file is an object where each key is the language server name and each value is a server configuration.

```json
{
  "<server-name>": { <LSPServerConfig> },
  "<server-name>": { <LSPServerConfig> }
}
```

Note: unlike MCP servers, the top-level object does not have a wrapping key. The keys are the server names directly.

## Server Configuration Schema

### Required Fields

| Field | Required | Type | Description |
|---|---|---|---|
| `command` | Yes | string | The LSP binary to execute. Must be available on `$PATH`. |
| `extensionToLanguage` | Yes | object | Maps file extensions (including the dot) to language identifiers. |

### Optional Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `args` | string[] | `[]` | Command-line arguments for the LSP server. |
| `transport` | `"stdio"` \| `"socket"` | `"stdio"` | Communication transport. |
| `env` | object | `{}` | Environment variables to set when starting the server. |
| `initializationOptions` | object | `{}` | Options passed to the server during LSP initialization. |
| `settings` | object | `{}` | Settings passed via `workspace/didChangeConfiguration`. |
| `workspaceFolder` | string | — | Workspace folder path for the server. |
| `startupTimeout` | number | — | Max milliseconds to wait for server startup. |
| `shutdownTimeout` | number | — | Max milliseconds to wait for graceful shutdown. |
| `restartOnCrash` | boolean | `false` | Whether to automatically restart if the server crashes. |
| `maxRestarts` | number | — | Maximum restart attempts before giving up. |

## `extensionToLanguage` Mapping

This field maps file extensions to LSP language identifiers. The keys MUST include the leading dot.

```json
{
  "extensionToLanguage": {
    ".ts": "typescript",
    ".tsx": "typescriptreact",
    ".js": "javascript",
    ".jsx": "javascriptreact"
  }
}
```

Language identifiers SHOULD follow the conventions used by the language server. Common identifiers include: `python`, `typescript`, `javascript`, `go`, `rust`, `java`, `c`, `cpp`, `csharp`.

## Lifecycle

- LSP servers MUST start when the plugin is enabled and files matching the configured extensions are present in the workspace.
- LSP servers MUST stop when the plugin is disabled or the session ends.
- If the binary is not found on `$PATH`, the tool MUST log a clear error message and continue loading other components.
- If `restartOnCrash` is `true`, the tool SHOULD restart the server up to `maxRestarts` times.

## Discovery

Tools MUST discover LSP server configurations in:
1. `.lsp.json` at the plugin root
2. Inline in the manifest's `lspServers` field
3. Any additional paths declared in the manifest's `lspServers` field

## Capabilities

LSP integration provides agents with:

| Capability | LSP Method | Description |
|---|---|---|
| Diagnostics | `textDocument/publishDiagnostics` | Errors and warnings after edits |
| Go to definition | `textDocument/definition` | Navigate to symbol definitions |
| Find references | `textDocument/references` | Find all usages of a symbol |
| Hover | `textDocument/hover` | Type information and documentation |

Tools MAY support additional LSP methods beyond this core set.

## Compatibility

This spec does not redefine the Language Server Protocol. Plugin LSP servers MUST communicate using the [LSP specification](https://microsoft.github.io/language-server-protocol/specifications/specification-current/). This component spec only defines how LSP servers are **configured** within a plugin.
