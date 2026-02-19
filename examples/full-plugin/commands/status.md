---
description: Show project health — git status, test results, and lint issues.
---

# Status

Check the health of the current project. Run these steps and report a summary:

1. **Git status** — Run `git status` to show branch, uncommitted changes, and untracked files.
2. **Recent commits** — Run `git log --oneline -5` to show the last 5 commits.
3. **Tests** — If a test runner is configured (package.json scripts, pytest, etc.), run the tests and report pass/fail counts.
4. **Lint** — If a linter is configured, run it and report the number of issues.

Present results as a concise dashboard. Flag anything that needs attention.
