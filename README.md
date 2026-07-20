# Agent Plugins Site

The documentation site for [Agent Plugins](https://github.com/agentplugins/agent-plugins-spec), an open, vendor-neutral specification for packaging reusable components that extend AI agents into distributable plugins.

Documentation is published at [agent-plugins.org](https://agent-plugins.org).

The versioned specification is authoritative. This repository presents that material as guides, reference documentation, canonical schemas, and machine-readable Markdown endpoints while preserving links to the source specification.

[`specification-source.json`](specification-source.json) records the exact specification revision used for the current documentation rewrite. Before release, regenerate the embedded specification from the published `1.0.0` tag so its source revision and publication status are current.

## Development

```sh
pnpm install
pnpm dev
```

Run a production build with:

```sh
pnpm build
```

The site uses [Next.js](https://nextjs.org), [Fumadocs](https://fumadocs.dev), and the Vercel Geistdocs template. Documentation pages live in `content/docs/`; canonical schemas are published from `public/schemas/`.

## Licensing

Documentation and authored assets are available under CC-BY-4.0. Source code, configuration, schemas, and scripts are available under Apache-2.0. See [LICENSE.md](LICENSE.md) for the complete mapping.
