# Example Plugins

This directory contains two example plugins. The marketplace index is at the **repo root** in [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json) — that's where Claude Code looks for it.

## Structure

```
open-plugin/                             # Repo root
├── .claude-plugin/
│   └── marketplace.json                 # Marketplace index (at repo root)
├── examples/
│   ├── minimal-plugin/                  # A simple plugin (one skill)
│   │   ├── .claude-plugin/plugin.json
│   │   └── skills/greet/SKILL.md
│   └── full-plugin/                     # Every component type
│       ├── .claude-plugin/plugin.json
│       ├── skills/
│       ├── commands/
│       ├── agents/
│       ├── rules/
│       ├── hooks/
│       ├── .mcp.json
│       ├── .lsp.json
│       └── assets/logo.svg
└── ...
```

The marketplace.json `source` fields point to these directories:

```json
"source": "./examples/minimal-plugin"
"source": "./examples/full-plugin"
```

## Try it

### Install from the marketplace

```bash
# Add this repo as a marketplace
/plugin marketplace add vercel-labs/open-plugin

# Install a plugin
/plugin install minimal-plugin@open-plugin-examples
/plugin install devtools@open-plugin-examples
```

### Development mode

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
