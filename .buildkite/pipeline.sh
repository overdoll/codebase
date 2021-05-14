#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

chmod 666 /var/run/docker.sock

groups

docker ps

python3.6 ./.buildkite/lib/main.py "$@"