#!/bin/bash
set -e

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

rover supergraph compose --config ./supergraph.yaml >./schema/schema.graphql
