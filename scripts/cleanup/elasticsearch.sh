echo "cleaning up all elasticsearch indexes"
kubectl exec -it quick-es-default-0 -c elasticsearch -- curl -X DELETE http://elastic:overdoll123@localhost:9200/_all