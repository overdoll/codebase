echo "sting: running cleanup commands"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "drop keyspace if exists sting;"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE sting WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};"

echo "sting: running setup commands"
kubectl exec -it deployments.apps/sting -- /bin/bash -c "./applications/sting/internal/local-image.binary_/local-image.binary db migrate && ./applications/sting/internal/local-image.binary_/local-image.binary db seed && ./applications/sting/internal/local-image.binary_/local-image.binary index all"
