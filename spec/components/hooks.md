# Hooks

**Component of the [Open Plugin Specification](../specification.md)**

Hooks are event handlers that respond to lifecycle events in the agent tool. They enable plugins to automate actions like formatting code after edits, running linters, validating outputs, or enforcing policies.

## Configuration Format

Hooks are configured in a JSON file. The default location is `hooks/hooks.json` at the plugin root.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

Hooks MAY also be declared inline in the manifest's `hooks` field using the same schema.

## Top-Level Schema

The hook configuration file MUST contain a `hooks` object. Each key in this object is an event name, and each value is an array of hook rules.

```json
{
  "hooks": {
    "<EventName>": [ <HookRule>, ... ],
    "<EventName>": [ <HookRule>, ... ]
  }
}
```

## Hook Rules

A hook rule matches events and dispatches to one or more hook actions.

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    { "type": "command", "command": "..." }
  ]
}
```

| Field | Required | Type | Description |
|---|---|---|---|
| `matcher` | No | string | Regex pattern to filter events. If omitted, the rule matches all events of that type. |
| `hooks` | Yes | HookAction[] | One or more actions to execute when the rule matches. |

### Matcher

The `matcher` field is a regex pattern tested against event-specific context. What the matcher tests against depends on the event type:

- For tool use events (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`): matched against the tool name
- For file events (`BeforeReadFile`, `AfterFileEdit`): matched against the file path
- For shell events (`BeforeShellExecution`, `AfterShellExecution`): matched against the command
- For other events: matched against event-specific data as defined by the tool implementation

If no `matcher` is provided, the rule matches all events of its type.

## Events

The following events are defined by this specification. Tools MAY support a subset of these events and MAY define additional events.

### Event Naming

The canonical event names in this spec use **PascalCase**. For interoperability with tools that use camelCase event names, tools SHOULD accept both forms. For example, `PostToolUse` and `postToolUse` SHOULD be treated as the same event.

### Core Events

These events SHOULD be supported by all conformant tools that implement hooks:

| Event | When It Fires | Matcher Context |
|---|---|---|
| `PreToolUse` | Before the agent uses a tool | Tool name |
| `PostToolUse` | After a tool is used successfully | Tool name |
| `PostToolUseFailure` | After a tool use fails | Tool name |
| `SessionStart` | At the beginning of a session | — |
| `SessionEnd` | At the end of a session | — |

### Extended Events

These events MAY be supported by tools. Not all tools will have corresponding concepts.

#### Tool and File Events

| Event | When It Fires | Matcher Context |
|---|---|---|
| `BeforeReadFile` | Before reading a file | File path |
| `AfterFileEdit` | After a file is written or edited | File path |
| `BeforeShellExecution` | Before executing a shell command | Command string |
| `AfterShellExecution` | After a shell command completes | Command string |
| `BeforeMCPExecution` | Before calling an MCP tool | Tool name |
| `AfterMCPExecution` | After an MCP tool call completes | Tool name |

#### Agent Lifecycle Events

| Event | When It Fires | Matcher Context |
|---|---|---|
| `UserPromptSubmit` | When the user submits a prompt | — |
| `Stop` | When the agent attempts to stop | — |
| `SubagentStart` | When a sub-agent is started | — |
| `SubagentStop` | When a sub-agent attempts to stop | — |
| `PreCompact` | Before conversation history is compacted | — |
| `TeammateIdle` | When a team member agent is about to go idle | — |
| `TaskCompleted` | When a task is marked as completed | — |

#### UI and System Events

| Event | When It Fires | Matcher Context |
|---|---|---|
| `Notification` | When the tool sends a notification | — |
| `PermissionRequest` | When a permission dialog is shown | — |
| `AfterAgentResponse` | After the agent produces a response | — |
| `AfterAgentThought` | After the agent produces a reasoning step | — |

Tools MUST ignore event names they do not recognize. This allows plugins to define hooks for events that only some tools support, without breaking on tools that don't.

## Hook Action Types

### `command`

Execute a shell command or script.

```json
{
  "type": "command",
  "command": "${PLUGIN_ROOT}/scripts/lint.sh"
}
```

| Field | Required | Type | Description |
|---|---|---|---|
| `type` | Yes | `"command"` | Action type identifier. |
| `command` | Yes | string | Shell command to execute. `${PLUGIN_ROOT}` is expanded. |

**Input**: The hook receives event context as JSON on **stdin**. The schema of this JSON is event-specific and defined by the tool.

**Output**: The command's exit code determines success (0) or failure (non-zero). Tools MAY use stdout/stderr for logging or feedback.

**Environment**: The command runs with `PLUGIN_ROOT` set as an environment variable, plus any event-specific variables the tool provides.

### `prompt`

Evaluate a prompt using an LLM.

```json
{
  "type": "prompt",
  "prompt": "Review the following change for security issues: $ARGUMENTS"
}
```

| Field | Required | Type | Description |
|---|---|---|---|
| `type` | Yes | `"prompt"` | Action type identifier. |
| `prompt` | Yes | string | Prompt text. `$ARGUMENTS` is replaced with event context. |

The tool sends the prompt to its LLM and uses the response to influence the agent's behavior. The exact mechanism is tool-defined.

### `agent`

Run an agentic verifier with tool access for complex verification tasks.

```json
{
  "type": "agent",
  "prompt": "Verify that the code changes follow the project's style guide and pass all linting rules. Check the actual files."
}
```

| Field | Required | Type | Description |
|---|---|---|---|
| `type` | Yes | `"agent"` | Action type identifier. |
| `prompt` | Yes | string | Instructions for the verification agent. `$ARGUMENTS` is replaced with event context. |

Unlike `prompt` hooks, `agent` hooks have access to tools (file reading, command execution, etc.) and can perform multi-step verification.

## Location

Hook configuration files MUST be placed at:
1. `hooks/hooks.json` at the plugin root (default)
2. Any additional paths declared in the manifest's `hooks` field

## Script Requirements

Hook scripts MUST:
- Be executable (`chmod +x`)
- Include a shebang line (e.g., `#!/bin/bash`, `#!/usr/bin/env python3`)
- Use `${PLUGIN_ROOT}` for all internal path references

Hook scripts SHOULD:
- Exit with code 0 on success
- Write errors to stderr
- Handle missing or malformed stdin gracefully

## Execution Model

- Multiple hook rules MAY match the same event. All matching rules are executed.
- Within a single rule, hooks SHOULD be executed in array order.
- Hook execution MUST NOT block indefinitely. Tools SHOULD enforce timeouts.
- Hook failures SHOULD be logged but MUST NOT crash the host tool.
- Tools MAY run hooks from different rules concurrently.
