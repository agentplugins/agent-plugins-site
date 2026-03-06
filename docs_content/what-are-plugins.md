# What Are Plugins?

> This is a non-normative guide. For the formal specification, see [spec/specification.md](../spec/specification.md).

A plugin is a directory that bundles multiple agent extension types into a single installable package. Instead of configuring skills, hooks, and servers individually, authors package them together and users install them in one step.

```
my-plugin/
├── .plugin/
│   └── plugin.json       # Manifest: name, version, metadata
├── skills/                # Agent Skills (SKILL.md format)
├── agents/                # Specialized sub-agents
├── hooks/                 # Event-driven automation
├── .mcp.json              # MCP tool servers
└── .lsp.json              # Language server configs
```

## What plugins can contain

A single plugin can include any combination of these components:

**Skills** give agents new capabilities — from processing PDFs to reviewing code. Skills follow the [Agent Skills](https://agentskills.io) format and are loaded on demand based on task context.

**Agents** are specialized sub-agents with focused expertise. A security reviewer agent, a performance testing agent, a documentation writer. The host tool can invoke them automatically or users can call them directly.

**Hooks** automate responses to events. Format code after every edit. Run a linter when files are written. Enforce policies before commits. Hooks fire on lifecycle events like tool use, session start, and prompt submission.

**MCP Servers** connect agents to external tools and data via the [Model Context Protocol](https://modelcontextprotocol.io/). Bundle a database query server, an API client, or any MCP-compatible tool server.

**LSP Servers** provide real-time code intelligence — diagnostics, go-to-definition, find references. Configure language server connections so agents see type errors and warnings instantly after edits.

## How plugins work

1. **Install**: A user installs a plugin or loads it from a directory. The plugin is cached locally.
2. **Discover**: The host tool scans the plugin directory, discovers components in their default locations, and registers them.
3. **Namespace**: All components are prefixed with the plugin name (e.g., `/deploy-tools:status`) to prevent conflicts between plugins.
4. **Activate**: Components are loaded and activated — skills become available, hooks start listening, servers start running.

## When to use plugins

Plugins are the right choice when you want to:

- **Share functionality** with teammates or the community
- **Reuse the same extensions** across multiple projects
- **Distribute versioned releases** that can be updated
- **Bundle related components** that work together (e.g., a skill + hook + MCP server that form a complete workflow)

For personal, project-specific customizations that don't need sharing, you can configure skills and hooks directly in your project without a plugin.

## Relationship to Agent Skills

The [Agent Skills](https://agentskills.io) specification defines a format for individual skills (`SKILL.md` files). Open Plugin uses Agent Skills as the format for its skills component, but adds:

- **Packaging**: Bundle skills with agents, hooks, servers, and metadata
- **Namespacing**: Prevent conflicts when multiple plugins provide skills
- **Distribution**: Install and update as versioned packages
- **Lifecycle**: Manage enabled/disabled state, caching, and scoping

Think of it this way: Agent Skills defines the skill format. Open Plugin defines the packaging format.

## Next steps

- [Getting started](getting-started.md) — Create your first plugin
- [Specification](../spec/specification.md) — The formal spec
- [Integrate plugins](integrate-plugins.md) — Add plugin support to your tool
