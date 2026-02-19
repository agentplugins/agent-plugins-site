# plugin-ref

Reference library for Open Plugin.

> **Note**: This library is intended for demonstration and validation purposes. It is not meant to be a production runtime.

## Installation

```bash
npm install plugin-ref
```

Or for development:

```bash
git clone https://github.com/anthropics/open-plugin
cd open-plugin/plugin-ref
npm install
npm run build
```

## Usage

### CLI

```bash
# Validate a plugin directory
npx plugin-ref validate ./my-plugin

# Inspect discovered components
npx plugin-ref inspect ./my-plugin

# Scaffold a new plugin
npx plugin-ref scaffold my-new-plugin
```

### Library

```typescript
import { validate, inspect, parseManifest } from "plugin-ref";

// Validate a plugin directory
const problems = await validate("./my-plugin");
if (problems.length > 0) {
  console.error("Validation errors:", problems);
}

// Inspect discovered components
const info = await inspect("./my-plugin");
console.log(`Plugin: ${info.name}`);
console.log(`Skills: ${info.skills.length}`);
console.log(`Agents: ${info.agents.length}`);
console.log(`Hooks: ${info.hooks.length}`);

// Parse a manifest
const manifest = await parseManifest("./my-plugin/.plugin/plugin.json");
console.log(manifest.name, manifest.version);
```

## Commands

### `validate <path>`

Validates a plugin directory against the Open Plugin specification. Checks:

- Manifest schema (if present)
- Directory structure
- Component file formats
- Name constraints
- Path validity

### `inspect <path>`

Lists all discovered components in a plugin:

- Skills (from `skills/` and `commands/`)
- Agents (from `agents/`)
- Hooks (from `hooks/hooks.json`)
- MCP servers (from `.mcp.json`)
- LSP servers (from `.lsp.json`)

### `scaffold <name>`

Creates a new plugin directory with the standard structure and a minimal manifest.

## License

Apache 2.0
