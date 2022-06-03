#!/bin/bash

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

ctlptl delete clusters kind-overdoll
ctlptl apply -f ../../development/local/kind.yaml
