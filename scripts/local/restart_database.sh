#!/bin/bash

set -eu

kubectl delete pod simple-cluster-us-east-1-us-east-1a-0 simple-cluster-us-east-1-us-east-1a-1 simple-cluster-us-east-1-us-east-1a-2 -n scylla

kubectl wait --for=condition=Ready --timeout=500s -n scylla pod/simple-cluster-us-east-1-us-east-1a-0
kubectl wait --for=condition=Ready --timeout=500s -n scylla pod/simple-cluster-us-east-1-us-east-1a-1
kubectl wait --for=condition=Ready --timeout=500s -n scylla pod/simple-cluster-us-east-1-us-east-1a-2

kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-admintools
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-web
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-frontend
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-matching
kubectl wait --for=condition=Available --timeout=500s -n temporal deployment/temporal-history

kubectl wait --for=condition=Available --timeout=500s deployment/eva
kubectl wait --for=condition=Available --timeout=500s deployment/sting
kubectl wait --for=condition=Available --timeout=500s deployment/ringer
kubectl wait --for=condition=Available --timeout=500s deployment/parley
kubectl wait --for=condition=Available --timeout=500s deployment/hades
kubectl wait --for=condition=Available --timeout=500s deployment/loader
