---
description: Node.js CLI tool built with tsup. Published to npm as `add-plugin`.
globs: "*.ts, *.tsx, *.js, *.jsx, package.json"
alwaysApply: false
---

This is a Node.js CLI tool that discovers and installs open-plugin format plugins into agent tools.

## Build

- `npm run build` — builds to `dist/` using tsup (single bundled ESM file)
- `npm run start` — runs the built CLI
- `node dist/index.js --help` — test locally

## Publishing

- `npm publish` — publishes the `dist/` folder to npm
- Users run: `npx add-plugin <repo-or-url>`

## Code style

- Use Node.js standard library APIs (`fs/promises`, `child_process`, `path`, `os`, `util`)
- No Bun-specific APIs — this must run on Node.js 18+
- TypeScript source in `index.ts` and `lib/`, built output in `dist/`
