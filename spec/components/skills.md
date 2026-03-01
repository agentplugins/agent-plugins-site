# Skills

**Component of the [Open Plugin Specification](../specification.md)**

Skills provide slash-command shortcuts and agent-invocable capabilities within a plugin.

Both skill formats described below are fundamentally the same mechanism: markdown instructions loaded into the agent's context when invoked. The two formats differ only in packaging complexity — command skills are flat markdown files, while agent skills are directories that can bundle supporting scripts, references, and assets alongside their instructions.

## Relationship to Agent Skills

The skill file format follows the [Agent Skills](https://agentskills.io) specification. This document describes how skills are discovered, namespaced, and loaded within the plugin context. For the `SKILL.md` file format itself — frontmatter fields, body content, optional directories — refer to the [Agent Skills Specification](https://agentskills.io/specification).

## Skill Types

Plugins support two skill formats:

### Agent Skills (`skills/` directory)

Agent Skills are directories containing a `SKILL.md` file following the [Agent Skills](https://agentskills.io) format. These are the RECOMMENDED format for new skills. Use this format when a skill needs supporting files (scripts, references, assets) or richer metadata.

```
my-plugin/
└── skills/
    ├── code-review/
    │   ├── SKILL.md
    │   ├── scripts/        # Optional
    │   └── references/     # Optional
    └── pdf-processor/
        ├── SKILL.md
        └── scripts/
```

Each subdirectory of `skills/` that contains a `SKILL.md` file is treated as a skill. The directory name MUST match the `name` field in the `SKILL.md` frontmatter.

### Command Skills (`commands/` directory)

Command skills are simple markdown files that define slash commands. They are the same mechanism as agent skills — markdown loaded into context — in a simpler, flatter format suitable for commands that don't need supporting files. New plugins SHOULD prefer Agent Skills in `skills/` when the skill needs bundled resources.

```
my-plugin/
└── commands/
    ├── deploy.md
    └── status.md
```

Each `.md` file in `commands/` is treated as a command. The filename (without extension) becomes the command name. Tools MAY additionally discover `.mdc`, `.markdown`, and `.txt` files.

#### Command File Format

Command files are markdown with optional YAML frontmatter:

```markdown
---
description: Deploy the current project to staging
---

# Deploy Command

Deploy the project to the staging environment. Follow these steps:

1. Run the test suite first
2. Build the project
3. Deploy to staging using the deploy script

Use "$ARGUMENTS" as the deployment target if provided.
```

| Frontmatter Field | Required | Description |
|---|---|---|
| `description` | RECOMMENDED | Short description for help text and auto-invocation matching. |
| `disable-model-invocation` | No | If `true`, the command can only be invoked explicitly by the user, not automatically by the agent. Defaults to `false`. |

#### Arguments

The placeholder `$ARGUMENTS` in the markdown body is replaced with any text the user provides after the command name:

```
/my-plugin:deploy production
```

In this example, `$ARGUMENTS` resolves to `production`.

## Discovery

Tools MUST discover skills in these locations:

1. `skills/` at the plugin root — each subdirectory containing `SKILL.md`
2. `commands/` at the plugin root — each `.md` file
3. Any additional paths declared in the manifest's `commands` or `skills` fields

## Namespacing

All skills are namespaced with the plugin name:

| Plugin Name | Skill Directory/File | User-Facing Name |
|---|---|---|
| `deploy-tools` | `skills/deploy/` | `/deploy-tools:deploy` |
| `deploy-tools` | `commands/status.md` | `/deploy-tools:status` |

## Progressive Disclosure

Skills SHOULD be structured for efficient context usage:

1. **Metadata** (~100 tokens): The `name` and `description` fields are loaded at startup for all installed skills, enabling the tool to match tasks to relevant skills.
2. **Instructions** (recommended < 5000 tokens): The full `SKILL.md` body or command markdown is loaded when the skill is activated.
3. **Resources** (as needed): Files in `scripts/`, `references/`, and `assets/` are loaded only when required during execution.

## Root SKILL.md

If a plugin has no `skills/` directory and no `skills` field in the manifest, tools MAY treat a `SKILL.md` file at the plugin root as a single-skill plugin. In this case, the skill name is derived from the plugin name.

This is a convenience for simple plugins that provide exactly one skill and nothing else.

## Integration Behavior

- Skills and commands MUST be automatically discovered when the plugin is installed.
- Tools SHOULD present skills to the agent so it can invoke them automatically based on task context (unless `disable-model-invocation` is `true`).
- Skills MAY include supporting files (scripts, references, assets) alongside `SKILL.md` as defined by the Agent Skills spec.
