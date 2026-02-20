# Open Plugin

An open format for packaging agent extensions. Supported by [Claude Code](https://code.claude.com), [Cursor](https://cursor.com), and [OpenCode](https://opencode.ai).

A plugin is a folder with skills, agents, hooks, rules, MCP servers, or LSP servers inside it. Plugins are distributed through **marketplaces** — git repos with a `marketplace.json` that indexes the plugins inside.

## How it works

```
my-marketplace/                      # A git repo
├── marketplace.json                 # Lists the plugins in this repo
├── my-plugin/                       # A plugin
│   ├── .plugin/plugin.json          #   Plugin manifest
│   └── skills/hello/SKILL.md        #   A skill
└── another-plugin/                  # Another plugin
    └── ...
```

Users install plugins from a marketplace:

```bash
claude plugin install my-plugin@my-marketplace
```

## Make a plugin

### 1. Create the plugin

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

### 2. Create a marketplace

Add a `marketplace.json` at the root of your repo:

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

### 3. Test it

```bash
# Test the plugin directly during development
claude --plugin-dir ./my-plugin

# Run your skill
/my-plugin:hello
```

Push the repo to GitHub and users can install from it as a marketplace.

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

## Examples

The [`examples/`](examples/) directory is a working marketplace with `marketplace.json` and two plugins:

- [`minimal-plugin`](examples/minimal-plugin/) — One skill, nothing else. The simplest possible plugin.
- [`full-plugin`](examples/full-plugin/) — Every component type. A reference for what's possible.

See [`examples/marketplace.json`](examples/marketplace.json) for the marketplace index.

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
