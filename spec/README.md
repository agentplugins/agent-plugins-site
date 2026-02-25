# Open Plugin Specification

**Version: 1.0.0**

This directory contains the normative specification for the Open Plugin format.

## Documents

| Document | Description |
|---|---|
| [specification.md](specification.md) | Core spec: manifest schema, directory structure, path resolution |
| [components/skills.md](components/skills.md) | Skills component (references [Agent Skills](https://agentskills.io) format) |
| [components/agents.md](components/agents.md) | Agent definitions |
| [components/rules.md](components/rules.md) | Persistent AI guidance and coding standards |
| [components/hooks.md](components/hooks.md) | Hook event system |
| [components/mcp-servers.md](components/mcp-servers.md) | MCP server bundling |
| [components/lsp-servers.md](components/lsp-servers.md) | LSP server bundling |
| [installation.md](installation.md) | Installation scopes, caching, resolution |

## Versioning

This specification uses [Semantic Versioning](https://semver.org/).

- **MAJOR**: Breaking changes to the format that require implementer updates
- **MINOR**: New optional features or fields that are backward-compatible
- **PATCH**: Clarifications, typo fixes, and non-functional changes

The version is declared in this file and in the spec header of [specification.md](specification.md).

## Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in these documents are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## License

This specification is licensed under [Apache 2.0](../LICENSE).
