echo "stella: running cleanup commands"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "drop keyspace if exists stella;"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE stella WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};"

echo "stella: running setup commands"
kubectl exec -it deployments.apps/stella -- /bin/bash -c "./applications/stella/internal/local-image.binary_/local-image.binary db migrate && ./applications/stella/internal/local-image.binary_/local-image.binary index all"
