#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

cat /var/lib/buildkite-agent/$DOCKER_CONFIG/config.json

python3.6 ./.buildkite/lib/main.py "$@"