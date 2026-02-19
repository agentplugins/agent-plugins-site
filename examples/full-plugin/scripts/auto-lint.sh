#!/bin/bash
# auto-lint.sh — Runs after file writes/edits to catch lint issues early.
#
# Receives tool context as JSON on stdin.
# Extracts the file path and runs the appropriate linter.

set -euo pipefail

# Read the tool input from stdin
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
  exit 0
fi

EXTENSION="${FILE##*.}"

case "$EXTENSION" in
  js|jsx|ts|tsx)
    if command -v eslint &>/dev/null; then
      eslint --fix "$FILE" 2>/dev/null || true
    fi
    ;;
  py)
    if command -v ruff &>/dev/null; then
      ruff check --fix "$FILE" 2>/dev/null || true
    fi
    ;;
  *)
    # No linter for this file type
    ;;
esac
