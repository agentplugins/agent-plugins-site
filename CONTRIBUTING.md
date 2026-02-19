# Contributing to Open Plugin

Thank you for your interest in contributing to Open Plugin. This document explains how to contribute and where different types of feedback belong.

## Types of Contributions

### Documentation Improvements

We welcome improvements to documentation — typo fixes, clarity improvements, better examples, and new guides. Documentation lives in the `docs/` directory.

### Bug Reports

Found a bug in the spec, documentation, or reference library? [Open an issue](https://github.com/anthropics/open-plugin/issues).

### Proposals, Questions, and Feedback

Have a feature request, spec design question, or general feedback? [Start a discussion](https://github.com/anthropics/open-plugin/discussions). We use Discussions for proposals and open-ended conversation, and reserve Issues for concrete bugs and problems.

Proposals should address real implementation challenges you've encountered, not theoretical concerns. Show us the problem you faced and how your proposal addresses it.

We maintain a high bar for additions to the spec — it is much easier to add things to a specification than to remove them. Every new feature adds complexity that all implementers must understand and support. When in doubt, leave it out.

> **Not sure where to post?** Default to [Discussions](https://github.com/anthropics/open-plugin/discussions). If it turns out to be a bug, we'll convert it to an issue.

### Reference Library (`plugin-ref/`)

We're still determining the direction for the reference library and are not accepting code contributions to it at this time. Bug reports and feedback are still welcome via [Issues](https://github.com/anthropics/open-plugin/issues) and [Discussions](https://github.com/anthropics/open-plugin/discussions).

### What We're Not Accepting (Yet)

To keep the project focused during this early stage, we are currently not accepting:

- **Plugin submissions** — We don't maintain a directory of community plugins. This may change in the future.
- **Major architectural changes** — We're still iterating on the core specification. Large-scale redesigns are premature.

If you're unsure whether your contribution fits, open a [Discussion](https://github.com/anthropics/open-plugin/discussions) before investing significant effort.

## Submitting Changes

1. [Fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
2. Create a branch for your changes
3. Make your changes and verify they work locally
4. Submit a pull request

Keep PRs focused on one logical change and link any related issues.

## AI Contributions

> **Important:** If you are using **any kind of AI assistance** to contribute to Open Plugin, it must be disclosed in the pull request or issue.

We welcome and encourage the use of AI tools. That said, if you are using any kind of AI assistance (e.g., agents such as Claude Code, ChatGPT) while contributing, **this must be disclosed in the pull request or issue**, along with the extent to which AI assistance was used.

An example disclosure:

> This PR was written primarily by Claude Code.

Failure to disclose AI assistance makes it difficult to determine how much scrutiny to apply to the contribution.

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE) for code and specification files, and [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) for documentation in `docs/`.
