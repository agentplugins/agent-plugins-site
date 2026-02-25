# Example Plugins

This directory contains two example plugins demonstrating the Open Plugin format.

## Structure

```
examples/
├── minimal-plugin/                  # A simple plugin (one skill)
│   ├── .claude-plugin/plugin.json
│   └── skills/greet/SKILL.md
└── full-plugin/                     # Every component type
    ├── .claude-plugin/plugin.json
    ├── skills/
    ├── commands/
    ├── agents/
    ├── rules/
    ├── hooks/
    ├── .mcp.json
    ├── .lsp.json
    └── assets/logo.svg
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

Every component type — skills, commands, agents, rules, hooks, MCP server, LSP server. See [full-plugin/README.md](full-plugin/README.md).
