#!/bin/bash
# review-helper.sh — Run automated checks during code review
#
# This script runs available linters and reports findings.
# It's called by the code-review skill when automated checks are needed.

set -euo pipefail

FILE="${1:-}"

if [ -z "$FILE" ]; then
  echo "Usage: review-helper.sh <file>" >&2
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "File not found: $FILE" >&2
  exit 1
fi

echo "Running checks on $FILE..."

# Check for common issues
echo "--- Hardcoded secrets ---"
grep -n -i -E '(password|secret|api_key|token)\s*=\s*["\x27][^"\x27]+["\x27]' "$FILE" 2>/dev/null || echo "None found."

echo ""
echo "--- TODO/FIXME/HACK comments ---"
grep -n -E '(TODO|FIXME|HACK|XXX):' "$FILE" 2>/dev/null || echo "None found."

echo ""
echo "--- Long lines (>120 chars) ---"
awk 'length > 120 { printf "%d: %s\n", NR, $0 }' "$FILE" || echo "None found."

echo ""
echo "Done."
