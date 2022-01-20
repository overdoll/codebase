echo "eva: running cleanup commands"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "drop keyspace if exists eva;"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE eva WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};"

echo "eva: running setup commands"
kubectl exec -it deployments.apps/eva -- /bin/bash -c "./applications/eva/internal/local-image.binary_/local-image.binary db migrate && ./applications/eva/internal/local-image.binary_/local-image.binary db seed && ./applications/eva/internal/local-image.binary_/local-image.binary index all"
