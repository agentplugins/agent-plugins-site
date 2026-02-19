# Getting Started

> This is a non-normative guide. For the formal specification, see [spec/specification.md](../spec/specification.md).

This guide walks you through creating a plugin from scratch, testing it locally, and preparing it for distribution.

## Prerequisites

- A conformant plugin host tool installed (e.g., [Claude Code](https://code.claude.com), [OpenCode](https://opencode.ai))

## Create your first plugin

### 1. Create the plugin directory

```bash
mkdir -p my-plugin/.plugin
```

### 2. Create the manifest

Create `my-plugin/.plugin/plugin.json`:

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

### 3. Add a skill

Create a skill directory and `SKILL.md`:

```bash
mkdir -p my-plugin/skills/hello
```

Create `my-plugin/skills/hello/SKILL.md`:

```markdown
---
name: hello
description: Greet the user with a friendly message
---

Greet the user warmly and ask how you can help them today.
```

### 4. Test it

Load the plugin directly using your tool's development flag:

```bash
# Claude Code
claude --plugin-dir ./my-plugin

# Then invoke the skill
/my-plugin:hello
```

## Add more components

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
# Read the tool input from stdin
FILE=$(jq -r '.tool_input.file_path // empty')
if [ -n "$FILE" ] && [ -f "$FILE" ]; then
  echo "Linting $FILE..." >&2
  # Run your linter here
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

## Plugin structure review

After adding all components, your plugin looks like this:

```
my-plugin/
├── .plugin/
│   └── plugin.json          # Manifest
├── skills/
│   └── hello/
│       └── SKILL.md         # Agent skill
├── agents/
│   └── reviewer.md          # Sub-agent
├── hooks/
│   └── hooks.json           # Event hooks
├── scripts/
│   └── lint.sh              # Hook script
├── .mcp.json                # MCP servers
└── README.md                # Documentation (optional)
```

## Prepare for distribution

### 1. Version your plugin

Update the `version` in `.plugin/plugin.json` whenever you make changes:

```json
{
  "version": "1.1.0"
}
```

### 2. Add a README

Document what your plugin does, what components it includes, and any setup required.

### 3. Add a license

Include a `LICENSE` file.

### 4. Create or join a marketplace

To distribute your plugin, add it to a [marketplace](../spec/marketplaces.md). A marketplace is a directory (usually a git repo) with a `marketplace.json` index.

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

Users can then install your plugin:

```bash
# Tool-specific install command
<tool> plugin install my-plugin@my-marketplace
```

## Next steps

- [Specification](../spec/specification.md) — Full spec for all fields and behaviors
- [Component specs](../spec/specification.md#component-specifications) — Deep dive into each component type
- [Marketplaces](../spec/marketplaces.md) — Distribution format details
