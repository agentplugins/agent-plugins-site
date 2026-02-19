# Agents

**Component of the [Open Plugin Specification](../specification.md)**

Agents are specialized sub-agents that a plugin provides for specific tasks. The host tool can invoke them automatically based on task context, or users can invoke them manually.

## File Format

Agent definitions are markdown files with YAML frontmatter.

```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities, OWASP issues, and unsafe patterns. Use when reviewing code for security, auditing dependencies, or checking for common vulnerabilities.
---

You are a security review specialist. When reviewing code:

1. Check for injection vulnerabilities (SQL, XSS, command injection)
2. Review authentication and authorization logic
3. Identify insecure data handling (hardcoded secrets, unencrypted storage)
4. Check dependency versions against known CVE databases
5. Flag unsafe deserialization or file operations

Always provide specific line references and severity ratings (critical, high, medium, low).
```

## Frontmatter Schema

| Field | Required | Type | Constraints | Description |
|---|---|---|---|---|
| `name` | Yes | string | 1-64 chars, kebab-case. | Agent identifier. Must be unique within the plugin. |
| `description` | Yes | string | Max 1024 chars. | What the agent specializes in and when to invoke it. Should include trigger keywords. |

### `name` field

The `name` field follows the same constraints as the plugin `name` field:
- 1-64 characters
- Lowercase alphanumeric and hyphens only (`a-z`, `0-9`, `-`)
- Must not start or end with a hyphen
- Must not contain consecutive hyphens

The filename (without `.md` extension) SHOULD match the `name` field.

### `description` field

The `description` field serves two purposes:
1. **Discovery**: Displayed to users when browsing available agents
2. **Auto-invocation**: Used by the host tool to determine when to automatically invoke the agent based on task context

Write descriptions that include specific task keywords. For example:

Good: `"Reviews code for security vulnerabilities, OWASP issues, and unsafe patterns. Use when reviewing code for security, auditing dependencies, or checking for common vulnerabilities."`

Poor: `"Helps with security stuff."`

## Body Content

The markdown body after the frontmatter is the agent's **system prompt**. This content is injected into the agent's context when it is invoked.

There are no format restrictions on the body. Write whatever instructions help the agent perform its task effectively. Recommended content:

- Role description and expertise area
- Step-by-step methodology
- Output format expectations
- Edge cases and constraints
- Examples of good output

## Location

Agent files MUST be placed in the `agents/` directory at the plugin root:

```
my-plugin/
└── agents/
    ├── security-reviewer.md
    ├── performance-tester.md
    └── compliance-checker.md
```

Additional agent file locations MAY be specified in the manifest's `agents` field.

## Discovery

Tools MUST discover agents by scanning for `.md` files in:
1. `agents/` at the plugin root
2. Any additional paths declared in the manifest's `agents` field

Each `.md` file with valid frontmatter (`name` and `description`) is registered as an agent.

## Namespacing

Agents are namespaced with the plugin name:

| Plugin Name | Agent File | Namespaced Name |
|---|---|---|
| `code-quality` | `agents/security-reviewer.md` | `code-quality:security-reviewer` |

## Integration Behavior

- Tools SHOULD present available agents to users (e.g., via an `/agents` interface or listing).
- Tools SHOULD allow the host agent to invoke plugin agents automatically when the task context matches the agent's description.
- Tools SHOULD allow users to invoke agents manually.
- Plugin agents work alongside any built-in agents the tool provides.
- When an agent is invoked, the tool SHOULD create a sub-agent context using the agent's body content as the system prompt.
