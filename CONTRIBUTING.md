# Contributing to the Agent Plugins Site

Thank you for helping improve the Agent Plugins documentation.

This repository presents the portable contract defined by the [Agent Plugins
specification](https://github.com/agentplugins/agent-plugins-spec). Proposed
features or material behavior changes belong in the specification repository
and should follow its [contribution
guide](https://github.com/agentplugins/agent-plugins-spec/blob/main/CONTRIBUTING.md).

## Compatible Client Submissions

The [Compatible Clients](https://agent-plugins.org/compatible-clients) page is a
curated compatibility reference, not a comprehensive directory. Technical
compatibility alone does not guarantee inclusion. Maintainers may consider
whether a client is publicly available, actively maintained, demonstrably used
beyond its authors, and relevant to the broader Agent Plugins ecosystem.

### Eligibility

- Agent Plugins support must be available to users when the listing is
  published. Announced or planned support alone is not sufficient.
- The claimed support must be verifiable. Public documentation is preferred,
  but maintainers may accept other concrete evidence such as release notes,
  reproducible steps, screenshots, or a demo.
- Listings are for user-facing clients. An SDK or library is not a client by
  itself.
- Prefer one listing for a recognizable product family. Separate IDE, CLI, or
  app surfaces only when their branding or compatibility materially differs.

### Submit a Client

Submit a focused pull request that:

1. Adds a client record to
   [`lib/compatible-clients.ts`](lib/compatible-clients.ts).
2. Adds official logo assets under `public/images/logos/<client>/`.
3. Describes the evidence for each claimed capability and MCP transport in the
   pull request.

The pull request should identify the supported product surfaces and versions,
link the product homepage and any available setup documentation or release
notes, and provide the source or provenance of the logo assets. Maintainers may
ask for a screenshot or demo to verify the implementation.

Client records are type-checked. Follow the existing entries and use the
capability and transport values accepted by `CompatibleClient`. Run the
production build before submitting:

```sh
pnpm build
```

### Client Data

- Write a short, neutral description as a plain text string. Do not include
  Markdown, HTML, links, emoji, or promotional formatting.
- List only component types supported through Agent Plugins, not capabilities
  the client supports through an unrelated configuration mechanism.
- For MCP, list only transports supported when loading MCP configuration from
  an Agent Plugin.
- Use the existing capability vocabulary. Propose new portable component types
  through the specification process before adding them to a client record.
- Enumerate only supported capabilities; omit unsupported capabilities.

### Logos

- Use official SVG assets when available. Transparent raster assets are
  acceptable when they have sufficient resolution.
- Provide light and dark variants when a single asset does not work in both
  themes.
- Use the optional positive `scale` value only when a logo needs optical size
  adjustment. The rendered logo remains constrained to a fixed maximum area.

Listings are informational, not endorsements. They may be corrected or removed
when compatibility or product availability changes.

## Development

Install dependencies and start the local documentation site:

```sh
pnpm install
pnpm dev
```

Keep pull requests focused on one independently reviewable change. Run
`pnpm build` before submitting.

Contributions are licensed under the terms described in
[`LICENSE.md`](LICENSE.md). Third-party logos and other materials remain subject
to their owners' terms.
