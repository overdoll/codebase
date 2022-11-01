#!/bin/bash

echo "updating orca image"

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

docker pull 771779017151.dkr.ecr.us-east-1.amazonaws.com/orca/dev:$1
docker tag 771779017151.dkr.ecr.us-east-1.amazonaws.com/orca/dev:$1 localhost:37393/orca-image:$1

docker push localhost:37393/orca-image:$1

cd ../

cat development/local/other/orca_manual.yaml | sed "s|{{ORCA_IMAGE}}|localhost:37393/orca-image:$1|g" | kubectl apply -f -
