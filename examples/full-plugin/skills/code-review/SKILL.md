---
name: code-review
description: Reviews code for bugs, style issues, and improvements. Use when the user asks to review code, check a PR, or audit code quality.
---

# Code Review

When reviewing code, follow this checklist:

## Correctness
- Logic errors and edge cases
- Off-by-one errors
- Null/undefined handling
- Race conditions in async code

## Style
- Naming conventions (descriptive, consistent)
- Function length (flag functions > 50 lines)
- Dead code or unused imports

## Security
- Input validation
- SQL injection / XSS risks
- Hardcoded secrets

## Performance
- Unnecessary allocations in loops
- Missing pagination for large datasets
- N+1 query patterns

## Output Format

For each issue found, report:
1. **File and line** — where the issue is
2. **Severity** — critical, warning, or suggestion
3. **Description** — what's wrong and why
4. **Fix** — concrete suggestion

If the code looks good, say so. Don't invent problems.

You can run the review helper script for automated checks:
```
scripts/review-helper.sh
```
