#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# need to copy docker config from instance to here, so it's accessible
cp /var/lib/buildkite-agent/$DOCKER_CONFIG/config.json ~/.docker/config.json

python3.6 ./.buildkite/lib/main.py "$@"