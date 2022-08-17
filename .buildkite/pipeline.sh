#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

# install redis if not available
if ! python3 -c "import redis" &>/dev/null; then
  apt install -y python3-redis
fi

if ! python3 -c "import yaml" &>/dev/null; then
  apt install -y python3-yaml
fi

if ! python3 -c "import requests" &>/dev/null; then
  apt install -y python3-requests
fi

python3 ./.buildkite/lib/main.py "$@"
