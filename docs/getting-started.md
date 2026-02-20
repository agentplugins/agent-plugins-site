# Getting Started

> This is a non-normative guide. For the formal specification, see [spec/specification.md](../spec/specification.md).

This guide walks you through creating a plugin, packaging it in a marketplace, and distributing it.

## Prerequisites

- A conformant plugin host tool installed (e.g., [Claude Code](https://code.claude.com), [Cursor](https://cursor.com), [OpenCode](https://opencode.ai))

## Overview

The workflow is:

1. **Create a plugin** — a directory with a manifest and components
2. **Create a marketplace** — a `marketplace.json` that indexes your plugin(s)
3. **Test** — load the plugin directly during development
4. **Distribute** — push the marketplace repo to GitHub; users install from it

## Step 1: Create a plugin

### Create the directory structure

```bash
mkdir -p my-marketplace/my-plugin/.plugin
mkdir -p my-marketplace/my-plugin/skills/hello
```

### Write the manifest

Create `my-marketplace/my-plugin/.plugin/plugin.json`:

```json
{
  "name": "my-plugin",
  "description": "My first plugin",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

### Add a skill

Create `my-marketplace/my-plugin/skills/hello/SKILL.md`:

```markdown
---
name: hello
description: Greet the user with a friendly message.
---

Greet the user warmly and ask how you can help them today.
```

## Step 2: Create a marketplace

Plugins are distributed through marketplaces. A marketplace is a `marketplace.json` file that indexes the plugins in the repo.

Create `my-marketplace/marketplace.json`:

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

Your repo now looks like this:

```
my-marketplace/
├── marketplace.json             # Marketplace index (required)
└── my-plugin/                   # Your plugin
    ├── .plugin/
    │   └── plugin.json          # Plugin manifest
    └── skills/
        └── hello/
            └── SKILL.md         # A skill
```

This is a complete, distributable marketplace.

## Step 3: Test it

During development, load the plugin directly without going through the marketplace:

```bash
claude --plugin-dir ./my-marketplace/my-plugin

# Then invoke the skill
/my-plugin:hello
```

## Step 4: Distribute

Push to GitHub. Users configure your repo as a marketplace and install plugins from it:

```bash
# Install from your marketplace
claude plugin install my-plugin@my-marketplace
```

## Add more components

Once your basic plugin works, you can add more component types.

### Add an agent

Create `my-plugin/agents/reviewer.md`:

```markdown
---
name: reviewer
description: Reviews code changes for correctness, style, and potential bugs.
---

You are a thorough code reviewer. When reviewing changes:

1. Check for logical errors and edge cases
2. Verify error handling is complete
3. Look for performance issues
4. Ensure naming and style are consistent
5. Suggest specific improvements with examples
```

### Add a rule

Create `my-plugin/rules/prefer-const.mdc`:

```markdown
---
description: Prefer const over let. Never use var.
alwaysApply: true
globs: "**/*.{js,ts,jsx,tsx}"
---

Always use `const` for variables that are never reassigned.
Use `let` only when reassignment is necessary. Never use `var`.
```

### Add a hook

Create `my-plugin/hooks/hooks.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/lint.sh"
          }
        ]
      }
    ]
  }
}
```

Create the script:

```bash
mkdir -p my-plugin/scripts
cat > my-plugin/scripts/lint.sh << 'EOF'
#!/bin/bash
FILE=$(jq -r '.tool_input.file_path // empty')
if [ -n "$FILE" ] && [ -f "$FILE" ]; then
  echo "Linting $FILE..." >&2
fi
EOF
chmod +x my-plugin/scripts/lint.sh
```

### Add an MCP server

Create `my-plugin/.mcp.json`:

```json
{
  "mcpServers": {
    "my-tools": {
      "command": "npx",
      "args": ["@my-org/mcp-server"],
      "cwd": "${PLUGIN_ROOT}"
    }
  }
}
```

## Full plugin structure

After adding all components:

```
my-plugin/
├── .plugin/
│   └── plugin.json          # Manifest
├── skills/
│   └── hello/
│       └── SKILL.md         # Agent skill
├── agents/
│   └── reviewer.md          # Sub-agent
├── rules/
│   └── prefer-const.mdc     # Coding standard
├── hooks/
│   └── hooks.json           # Event hooks
├── scripts/
│   └── lint.sh              # Hook script
├── .mcp.json                # MCP servers
└── README.md                # Documentation
```

Remember to update `marketplace.json` when you bump the version.

## Multi-plugin marketplaces

A single marketplace can contain many plugins. Just add more entries:

```json
{
  "name": "my-org-plugins",
  "plugins": [
    {
      "name": "formatter",
      "description": "Auto-format on save",
      "version": "1.0.0",
      "source": "./formatter"
    },
    {
      "name": "linter",
      "description": "Lint on save",
      "version": "1.2.0",
      "source": "./linter"
    },
    {
      "name": "security-scanner",
      "description": "Security audit tools",
      "version": "2.0.0",
      "source": "./security-scanner"
    }
  ]
}
```

See [`examples/`](../examples/) for a working multi-plugin marketplace.

## Next steps

- [Specification](../spec/specification.md) — Full spec for all fields and behaviors
- [Component specs](../spec/specification.md#component-specifications) — Deep dive into each component type
- [Marketplaces](../spec/marketplaces.md) — Distribution format details
- [Examples](../examples/) — Working marketplace with two plugins
