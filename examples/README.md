# Example Plugins

This directory contains example plugins demonstrating the Open Plugin format.

## Structure

```
examples/
├── minimal-plugin/                  # A simple plugin (one skill)
│   ├── .plugin/plugin.json
│   └── skills/greet/SKILL.md
└── full-plugin/                     # Every component type (reference)
    ├── .plugin/plugin.json
    ├── skills/
    ├── commands/
    ├── agents/
    ├── rules/
    ├── hooks/
    ├── .mcp.json
    └── .lsp.json
```

## Try it

```bash
# Load a plugin directly:
claude --plugin-dir ./examples/minimal-plugin
claude --plugin-dir ./examples/full-plugin
```

## Plugins

### minimal-plugin

One skill, nothing else. The simplest possible plugin. See [minimal-plugin/README.md](minimal-plugin/README.md).

### devtools (full-plugin)

Every component type — skills, commands, agents, rules, hooks, MCP server, LSP server. A reference for what's possible. See [full-plugin/README.md](full-plugin/README.md).
