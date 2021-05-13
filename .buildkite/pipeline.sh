#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

whoami

usermod -a -G docker buildkite-agent

python3.6 ./.buildkite/lib/main.py "$@"