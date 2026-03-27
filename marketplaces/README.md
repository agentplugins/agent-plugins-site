# Marketplaces

A marketplace is a named collection of one or more plugins. The `marketplace.json` format is defined in the [Marketplace specification](../spec/open-plugins-v1.md#13-marketplace-index).

## How it works

A `marketplace.json` at the root of a repository or directory declares the plugins it contains:

```json
{
  "name": "my-org-plugins",
  "plugins": [
    { "name": "code-quality", "source": "./code-quality/", "description": "Linting and review." },
    { "name": "deployment", "source": "./deployment/", "description": "Deploy workflows." }
  ]
}
```

Tools use this index to discover and install plugins from the collection.

## Tool-Specific Registries

Each adopter may also operate its own registry for distributing plugins:

- **Claude Code** — [Claude Code plugins](https://docs.anthropic.com/en/docs/claude-code)
- **Cursor** — [Cursor plugin marketplace](https://cursor.com)
- **OpenCode** — [OpenCode plugins](https://opencode.ai)

The `marketplace.json` format is the interchange format. Tool-specific registries may build additional discovery, search, and publishing features on top of it.
