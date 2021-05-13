#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

echo whoami

sudo usermod -a -G docker $USER

python3.6 ./.buildkite/lib/main.py "$@"