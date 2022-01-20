#!/bin/bash
echo "running setup commands for all services"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

sh eva.sh

sh loader.sh

sh parley.sh

sh stella.sh

sh sting.sh
