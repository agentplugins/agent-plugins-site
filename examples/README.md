# Example Marketplace

This directory is a working **marketplace** — a collection of plugins indexed by `marketplace.json`.

This is exactly how you'd structure a real marketplace repository for distribution.

## Structure

```
examples/
├── marketplace.json              # Marketplace index (required)
├── minimal-plugin/               # A simple plugin (one skill)
│   ├── .plugin/plugin.json
│   └── skills/greet/SKILL.md
└── full-plugin/                  # A full-featured plugin (every component type)
    ├── .plugin/plugin.json
    ├── skills/
    ├── commands/
    ├── agents/
    ├── rules/
    ├── hooks/
    ├── .mcp.json
    ├── .lsp.json
    └── assets/logo.svg
```

## How it works

The `marketplace.json` at the root lists each plugin with its name, description, version, and source path:

```json
{
  "name": "open-plugin-examples",
  "plugins": [
    {
      "name": "minimal-plugin",
      "description": "The simplest possible plugin.",
      "version": "1.0.0",
      "source": "./minimal-plugin"
    },
    {
      "name": "devtools",
      "description": "Full-featured development toolkit.",
      "version": "2.0.0",
      "source": "./full-plugin"
    }
  ]
}
```

When a user points their tool at this marketplace, it reads `marketplace.json`, discovers the plugins, and makes them available for installation.

## Try it

### Install from the marketplace

```bash
# Configure this directory as a marketplace (tool-specific)
# Then install a plugin:
claude plugin install minimal-plugin@open-plugin-examples
claude plugin install devtools@open-plugin-examples
```

### Test a plugin directly (development mode)

```bash
# Load a single plugin without a marketplace:
claude --plugin-dir ./examples/minimal-plugin
claude --plugin-dir ./examples/full-plugin
```

## Plugins

### minimal-plugin

One skill, nothing else. The simplest possible plugin. See [minimal-plugin/README.md](minimal-plugin/README.md).

### devtools (full-plugin)

Every component type — skills, commands, agents, rules, hooks, MCP server, LSP server. See [full-plugin/README.md](full-plugin/README.md).
