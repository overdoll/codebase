#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

echo $DOCKER_CONFIG

python3.6 ./.buildkite/lib/main.py "$@"