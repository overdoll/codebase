#!/bin/bash
set -e

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cp /tmp/carrier_file_fixtures/* internal/service/file_fixtures
