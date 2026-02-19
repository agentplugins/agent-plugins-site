# minimal-plugin

The simplest possible Open Plugin — one skill, nothing else.

## Structure

```
minimal-plugin/
├── .plugin/
│   └── plugin.json
├── skills/
│   └── greet/
│       └── SKILL.md
└── README.md
```

## Try it

```bash
claude --plugin-dir ./examples/minimal-plugin
```

Then type `/minimal-plugin:greet` or `/minimal-plugin:greet Alex`.
