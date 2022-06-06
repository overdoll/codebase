#!/bin/bash

set -eu

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$parent_path"

cd ../../development/local/dependencies

# Apply cert-manager and wait
kubectl apply -f cert-manager.yaml

kubectl wait --for condition=established crd/certificates.cert-manager.io crd/issuers.cert-manager.io
kubectl -n cert-manager rollout status deployment.apps/cert-manager-webhook

# Apply elasticsearch operator
kubectl create -f https://download.elastic.co/downloads/eck/2.2.0/crds.yaml
kubectl apply -f https://download.elastic.co/downloads/eck/2.2.0/operator.yaml

# Apply scylla operator & wait
kubectl apply -f scylla-operator.yaml

kubectl wait --for condition=established crd/scyllaclusters.scylla.scylladb.com
kubectl wait --for condition=established crd/nodeconfigs.scylla.scylladb.com
kubectl wait --for condition=established crd/scyllaoperatorconfigs.scylla.scylladb.com
kubectl -n scylla-operator rollout status deployment.apps/scylla-operator
kubectl -n scylla-operator rollout status deployment.apps/webhook-server

# Apply TLS certificate
kubectl apply -f issuer.yaml
kubectl apply -f certificate.yaml

kubectl create namespace scylla

kubectl create configmap scylla-config -n scylla --from-file=scylla-config.yaml

# Apply scylla cluster
kubectl apply -f scylla-cluster.yaml

kubectl wait --for=condition=Ready --timeout=500s -n scylla pod/simple-cluster-us-east-1-us-east-1a-0
kubectl wait --for=condition=Ready --timeout=500s -n scylla pod/simple-cluster-us-east-1-us-east-1a-1
kubectl wait --for=condition=Ready --timeout=500s -n scylla pod/simple-cluster-us-east-1-us-east-1a-2

# Apply redis
kubectl apply -f redis.yaml

kubectl create namespace elasticsearch

# Apply elasticsearch
kubectl apply -f elasticsearch.yaml

kubectl create namespace temporal
kubectl config set-context --current --namespace=temporal

# need to create a secret for docker registry in ECR in order to be able to pull our custom temporal images with patches
kubectl create secret docker-registry regcred \
  --docker-server=771779017151.dkr.ecr.us-east-1.amazonaws.com \
  --docker-username=AWS \
  --docker-password=$(aws ecr get-login-password --region us-east-1) \
  --namespace=temporal

# Apply temporal
kubectl apply -f temporal.yaml

kubectl config set-context --current --namespace=default

# apply a dummy medusa container to be intercepted
kubectl apply -f medusa.yaml

# Apply ingress
kubectl apply -f ingress.yaml

# wait for temporal to be available
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-admintools
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-web
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-frontend
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-matching
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-history
