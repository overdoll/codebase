#!/bin/bash
set -e
echo "building email templates"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cd ../applications/carrier/internal/domain/mailing/theme/templates

find . -name email.mjml -printf '%h\n'
