#!/bin/bash
# check-env.sh — Runs at session start to verify the development environment.
#
# Checks for required tools and reports any that are missing.

set -euo pipefail

MISSING=()

for cmd in git node npm; do
  if ! command -v "$cmd" &>/dev/null; then
    MISSING+=("$cmd")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "Warning: missing tools: ${MISSING[*]}" >&2
fi
