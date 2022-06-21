#!/bin/bash
set -e
echo "setting up for the first time"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

# setup services' tables
sh ../cleanup/eva.sh
sh ../cleanup/loader.sh
sh ../cleanup/parley.sh
sh ../cleanup/sting.sh
sh ../cleanup/hades.sh
sh ../cleanup/ringer.sh

kubectl exec -it quick-es-default-0 -n elasticsearch -c elasticsearch -- curl -X PUT http://elastic:overdoll123@localhost:9200/_cluster/settings -H "Content-Type: application/json" -d '{ "persistent": { "action.auto_create_index": false, "cluster.routing.allocation.disk.threshold_enabled": false } }'

echo

# create temporal namespace "default"
kubectl exec -it -n temporal deployment/temporal-admintools -- /usr/local/bin/tctl --namespace default namespace register
