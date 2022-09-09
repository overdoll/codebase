#!/bin/bash
parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cd ../

echo "running gqlgen eva"
cp ./libraries/graphql/standard_gqlgen.yml ./applications/eva/gqlgen.yml

cd ./applications/eva

gqlgen

cd ../../

echo "running gqlgen hades"
cp ./libraries/graphql/standard_gqlgen.yml ./applications/hades/gqlgen.yml

cd ./applications/hades

gqlgen

cd ../../

echo "running gqlgen loader"
cp ./libraries/graphql/standard_gqlgen.yml ./applications/loader/gqlgen.yml

cd ./applications/loader

gqlgen

cd ../../

echo "running gqlgen parley"
cp ./libraries/graphql/standard_gqlgen.yml ./applications/parley/gqlgen.yml

cd ./applications/parley

gqlgen

cd ../../

echo "running gqlgen ringer"
cp ./libraries/graphql/standard_gqlgen.yml ./applications/ringer/gqlgen.yml

cd ./applications/ringer

gqlgen

cd ../../

echo "running gqlgen sting"
cp ./libraries/graphql/standard_gqlgen.yml ./applications/sting/gqlgen.yml

cd ./applications/sting

gqlgen

cd ../../
