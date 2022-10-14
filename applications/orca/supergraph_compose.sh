#!/bin/bash
set -e

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

rover subgraph introspect http://eva:8000/api/graphql >./schema/services/eva.graphql
rover subgraph introspect http://sting:8000/api/graphql >./schema/services/sting.graphql
rover subgraph introspect http://parley:8000/api/graphql >./schema/services/parley.graphql
rover subgraph introspect http://hades:8000/api/graphql >./schema/services/hades.graphql
rover subgraph introspect http://ringer:8000/api/graphql >./schema/services/ringer.graphql
rover subgraph introspect http://loader:8000/api/graphql >./schema/services/loader.graphql

rover supergraph compose --config ./supergraph.yaml >./schema/schema.graphql
