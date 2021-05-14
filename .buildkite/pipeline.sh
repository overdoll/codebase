#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

cat ~/.docker/config.json

ls $DOCKER_CONFIG

python3.6 ./.buildkite/lib/main.py "$@"