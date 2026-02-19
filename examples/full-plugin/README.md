# devtools

A full-featured development toolkit plugin demonstrating every Open Plugin component type.

## What's included

| Component | Files | What it does |
|---|---|---|
| **Skills** | `skills/code-review/`, `skills/explain-error/` | Code review checklist and error explainer |
| **Commands** | `commands/status.md`, `commands/deploy.md` | Project health dashboard and deployment |
| **Agents** | `agents/security-reviewer.md`, `agents/docs-writer.md` | Security audit and documentation writing |
| **Rules** | `rules/prefer-const.mdc`, `rules/error-handling.mdc` | Coding standards enforced automatically |
| **Hooks** | `hooks/hooks.json` | Auto-lint on file edits, env check on session start |
| **MCP Server** | `.mcp.json` | Postgres database access via MCP |
| **LSP Server** | `.lsp.json` | TypeScript language server for code intelligence |

## Structure

```
devtools/
├── .plugin/
│   └── plugin.json
├── skills/
│   ├── code-review/
│   │   ├── SKILL.md
│   │   └── scripts/review-helper.sh
│   └── explain-error/
│       └── SKILL.md
├── commands/
│   ├── status.md
│   └── deploy.md
├── agents/
│   ├── security-reviewer.md
│   └── docs-writer.md
├── rules/
│   ├── prefer-const.mdc
│   └── error-handling.mdc
├── hooks/
│   └── hooks.json
├── scripts/
│   ├── auto-lint.sh
│   └── check-env.sh
├── .mcp.json
├── .lsp.json
└── assets/
    └── logo.svg
```

## Try it

```bash
claude --plugin-dir ./examples/full-plugin
```

Then try:
- `/devtools:status` — project health check
- `/devtools:deploy staging` — deploy to staging
- The `code-review` and `explain-error` skills activate automatically based on task context
- The `security-reviewer` and `docs-writer` agents are available via `/agents`

## Prerequisites

Some components require external tools:
- **MCP server**: Requires `POSTGRES_URL` environment variable
- **LSP server**: Requires `typescript-language-server` (`npm install -g typescript-language-server typescript`)
- **Hooks**: `eslint` and/or `ruff` for auto-linting (optional — hooks degrade gracefully)
