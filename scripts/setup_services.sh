#!/bin/bash
set -e
echo "running cleanup && setup commands for all services"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

sh cleanup/elasticsearch.sh

sh cleanup/eva.sh
sh setup/eva.sh

sh cleanup/loader.sh
sh setup/loader.sh

sh cleanup/parley.sh
sh setup/parley.sh

sh cleanup/stella.sh
sh setup/stella.sh

sh cleanup/sting.sh
sh setup/sting.sh

sh cleanup/hades.sh
sh setup/hades.sh

sh cleanup/ringer.sh
sh setup/ringer.sh
