#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# install redis if not available
if ! python3 -c "import redis" &>/dev/null; then
  apt install python3-redis
fi

python3 ./.buildkite/lib/main.py "$@"
