#!/bin/bash
set -e
echo "building email templates"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cd ./internal/domain/mailing/theme/templates

while IFS= read -r -d '' file; do
  directory=$(dirname "$file")
  echo "building template $directory"
  mkdir -p ../../views/templates/"$directory"
  mjml "$directory"/email.mjml -o ../../views/templates/"$directory"/email.gohtml
done < <(find . -name email.mjml -print0)
