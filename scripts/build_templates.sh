#!/bin/bash
set -e
echo "building email templates"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cd ../applications/carrier/internal/domain/mailing/theme/templates

while IFS= read -r -d '' file; do
  directory=$(dirname "$file")
  mkdir -p ../../views/templates/"$directory"
  ../../../../../../../node_modules/.bin/mjml "$directory"/email.mjml -o ../../views/templates/"$directory"/email.gohtml
done < <(find . -name email.mjml -print0)
