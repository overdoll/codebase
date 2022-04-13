#!/bin/bash
set -e
echo "swapping .env with .env.backup"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cd ../

mv applications/carrier/.env applications/carrier/.env.backup2
mv applications/carrier/.env.backup applications/carrier/.env
mv applications/carrier/.env.backup2 applications/carrier/.env.backup

mv applications/eva/.env applications/eva/.env.backup2
mv applications/eva/.env.backup applications/eva/.env
mv applications/eva/.env.backup2 applications/eva/.env.backup

mv applications/hades/.env applications/hades/.env.backup2
mv applications/hades/.env.backup applications/hades/.env
mv applications/hades/.env.backup2 applications/hades/.env.backup

mv applications/loader/.env applications/loader/.env.backup2
mv applications/loader/.env.backup applications/loader/.env
mv applications/loader/.env.backup2 applications/loader/.env.backup

mv applications/parley/.env applications/parley/.env.backup2
mv applications/parley/.env.backup applications/parley/.env
mv applications/parley/.env.backup2 applications/parley/.env.backup

mv applications/puppy/.env applications/puppy/.env.backup2
mv applications/puppy/.env.backup applications/puppy/.env
mv applications/puppy/.env.backup2 applications/puppy/.env.backup

mv applications/stella/.env applications/stella/.env.backup2
mv applications/stella/.env.backup applications/stella/.env
mv applications/stella/.env.backup2 applications/stella/.env.backup

mv applications/sting/.env applications/sting/.env.backup2
mv applications/sting/.env.backup applications/sting/.env
mv applications/sting/.env.backup2 applications/sting/.env.backup
