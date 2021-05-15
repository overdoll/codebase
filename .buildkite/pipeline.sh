#!/bin/bash

# exit immediately on failure, or if an undefined variable is used
set -eu

if [ "$1" == "integration_test" ]
  then
    docker logs "$(docker ps | grep "scylladb/scylla:4.3.1" | awk '{ print $1 }')"
fi

python3 ./.buildkite/lib/main.py "$@"