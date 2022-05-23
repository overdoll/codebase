#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu
python3 ./.buildkite/lib/main.py "$@"
