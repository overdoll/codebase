echo "eva: running cleanup commands"
kubectl exec -it prod-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "drop keyspace if exists eva;"
kubectl exec -it prod-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE eva WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};"
