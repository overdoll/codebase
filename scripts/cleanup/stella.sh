echo "stella: running cleanup commands"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "drop keyspace if exists stella;"
kubectl exec -it simple-cluster-us-east-1-us-east-1a-0 -c scylla -- /bin/cqlsh -e "CREATE KEYSPACE stella WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};"