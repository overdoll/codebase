#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# a hack to install the yaml package, if it's not available
if ! python -c "import yaml" &>/dev/null; then
  apt install python3-yaml
fi

python3 ./.buildkite/lib/main.py "$@"
