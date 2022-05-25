#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# install redis if not available
if ! python -c "import redis" &>/dev/null; then
  python3 -m pip install redis
fi

python3 ./.buildkite/lib/main.py "$@"
