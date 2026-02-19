# Open Plugin

An open format for packaging agent extensions. Supported by [Claude Code](https://code.claude.com), [Cursor](https://cursor.com), and [OpenCode](https://opencode.ai).

A plugin is a folder. Put skills, agents, hooks, rules, MCP servers, or LSP servers inside it. Agent tools discover and run them automatically.

## Make a plugin in 60 seconds

```bash
mkdir -p my-plugin/.plugin
mkdir -p my-plugin/skills/hello
```

Write the manifest — `my-plugin/.plugin/plugin.json`:

```json
{
  "name": "my-plugin",
  "description": "My first plugin",
  "version": "1.0.0"
}
```

Write a skill — `my-plugin/skills/hello/SKILL.md`:

```markdown
---
name: hello
description: Greet the user warmly.
---

Greet the user and ask how you can help them today.
```

Test it:

```bash
# Claude Code
claude --plugin-dir ./my-plugin

# Then run your skill
/my-plugin:hello
```

That's it. You have a working plugin.

## What can go in a plugin

| Component | Directory | Format | What it does |
|---|---|---|---|
| **Skills** | `skills/` | Folders with `SKILL.md` | Give agents new capabilities |
| **Commands** | `commands/` | `.md` files | Slash commands users can invoke |
| **Agents** | `agents/` | `.md` files | Specialized sub-agents |
| **Rules** | `rules/` | `.mdc` files | Persistent AI guidance and coding standards |
| **Hooks** | `hooks/` | `hooks.json` | Scripts that run on events (file edits, session start, etc.) |
| **MCP Servers** | `.mcp.json` | JSON config | Connect agents to external tools via [MCP](https://modelcontextprotocol.io/) |
| **LSP Servers** | `.lsp.json` | JSON config | Real-time code intelligence (diagnostics, go-to-definition) |

Everything is optional. A plugin with just one skill works. A plugin with all seven component types works.

## Plugin structure

```
my-plugin/
├── .plugin/
│   └── plugin.json          # Name, version, description
├── skills/                   # Agent skills (SKILL.md in subdirs)
├── commands/                 # Slash commands (.md files)
├── agents/                   # Sub-agents (.md files)
├── rules/                    # AI rules (.mdc files)
├── hooks/
│   └── hooks.json            # Event-driven automation
├── scripts/                  # Scripts used by hooks
├── .mcp.json                 # MCP server configs
└── .lsp.json                 # LSP server configs
```

Drop files into the right directories and they're discovered automatically. No config needed beyond the manifest.

## Examples

See [`examples/`](examples/) for complete working plugins:

- [`minimal-plugin`](examples/minimal-plugin/) — One skill, nothing else. The simplest possible plugin.
- [`full-plugin`](examples/full-plugin/) — Every component type. A reference for what's possible.

## Distribute your plugin

Put your plugin in a git repo. Create a `marketplace.json` to index one or more plugins:

```json
{
  "name": "my-marketplace",
  "plugins": [
    {
      "name": "my-plugin",
      "description": "My first plugin",
      "version": "1.0.0",
      "source": "./my-plugin"
    }
  ]
}
```

Users install from the marketplace using their tool's plugin install command.

## Specification

The full spec lives in [`spec/`](spec/):

- [Core specification](spec/specification.md) — Manifest schema, directory structure, naming, discovery
- [Skills](spec/components/skills.md) — Agent Skills and slash commands
- [Agents](spec/components/agents.md) — Sub-agent definitions
- [Rules](spec/components/rules.md) — Persistent AI guidance
- [Hooks](spec/components/hooks.md) — Event-driven automation
- [MCP Servers](spec/components/mcp-servers.md) — External tool integration
- [LSP Servers](spec/components/lsp-servers.md) — Code intelligence
- [Installation](spec/installation.md) — Scopes, caching, resolution
- [Marketplaces](spec/marketplaces.md) — Distribution format

Guides for plugin authors and tool implementers are in [`docs/`](docs/).

## Reference Library

The [`plugin-ref/`](plugin-ref/) TypeScript library validates and inspects plugins:

```bash
npx plugin-ref validate ./my-plugin
npx plugin-ref inspect ./my-plugin
npx plugin-ref scaffold new-plugin
```

## Adopters

- [Claude Code](https://code.claude.com) — CLI coding agent by Anthropic
- [Cursor](https://cursor.com) — AI-powered code editor
- [OpenCode](https://opencode.ai) — Open-source coding agent

## License

Code and specification: [Apache 2.0](LICENSE). Documentation: [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).
