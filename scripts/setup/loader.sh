echo "loader: running cleanup commands"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "drop keyspace if exists loader;"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE loader WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};"

echo "loader: running setup commands"
kubectl exec -it deployments.apps/loader -- /bin/bash -c "./applications/loader/internal/local-image.binary_/local-image.binary db migrate"
