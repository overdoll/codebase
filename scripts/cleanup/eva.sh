echo "eva: running cleanup commands"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -n scylla -c scylla -- /bin/cqlsh -e "drop keyspace if exists eva;"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -n scylla -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE eva WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};"
