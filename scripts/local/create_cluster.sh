#!/bin/bash

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

k3d cluster create overdoll --port "80:80@loadbalancer" --port "443:443@loadbalancer" --registry-create registry:127.0.0.1:37393
