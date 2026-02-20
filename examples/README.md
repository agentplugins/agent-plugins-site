# Example Marketplace

This directory is a working **marketplace** — a collection of plugins indexed by a marketplace config.

This is exactly how you'd structure a real marketplace repository for distribution.

## Structure

```
examples/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace index (Claude Code)
├── marketplace.json              # Marketplace index (vendor-neutral)
├── minimal-plugin/               # A simple plugin (one skill)
│   ├── .claude-plugin/plugin.json
│   ├── .plugin/plugin.json
│   └── skills/greet/SKILL.md
└── full-plugin/                  # A full-featured plugin (every component type)
    ├── .claude-plugin/plugin.json
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

## Cross-tool compatibility

This example includes both vendor-neutral and Claude Code-specific paths:

| File | Purpose |
|---|---|
| `.claude-plugin/marketplace.json` | Marketplace index for Claude Code |
| `.plugin/plugin.json` | Plugin manifest (vendor-neutral) |
| `.claude-plugin/plugin.json` | Plugin manifest (Claude Code) |
| `marketplace.json` | Marketplace index (vendor-neutral fallback) |

In practice, you only need the paths for the tools you're targeting. If you only target Claude Code, you only need the `.claude-plugin/` files.

## Try it

### With Claude Code

```bash
# Add this directory as a marketplace
/plugin marketplace add ./examples

# Install a plugin
/plugin install minimal-plugin@open-plugin-examples
/plugin install devtools@open-plugin-examples
```

### Development mode (any tool)

```bash
# Load a single plugin directly without a marketplace:
claude --plugin-dir ./examples/minimal-plugin
claude --plugin-dir ./examples/full-plugin
```

## Plugins

### minimal-plugin

One skill, nothing else. The simplest possible plugin. See [minimal-plugin/README.md](minimal-plugin/README.md).

### devtools (full-plugin)

Every component type — skills, commands, agents, rules, hooks, MCP server, LSP server. See [full-plugin/README.md](full-plugin/README.md).
