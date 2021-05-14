#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

docker ps

python3.6 ./.buildkite/lib/main.py "$@"