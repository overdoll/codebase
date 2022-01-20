echo "parley: running cleanup commands"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "drop keyspace if exists parley;"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE parley WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};"

echo "parley: running setup commands"
kubectl exec -it deployments.apps/parley -- /bin/bash -c "./applications/parley/internal/local-image.binary_/local-image.binary db migrate && ./applications/parley/internal/local-image.binary_/local-image.binary db seed"
