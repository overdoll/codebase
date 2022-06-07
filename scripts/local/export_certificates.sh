#!/bin/bash

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

kubectl get secret -n default overdoll-tls-secret -o json | jq -r '.data."ca.crt"' | base64 -d >../../development/local-files/CA.crt
