echo "cleaning up all elasticsearch indexes"
kubectl exec -it quick-es-default-0 -n elasticsearch -c elasticsearch -- curl -X DELETE http://elastic:overdoll123@localhost:9200/*,-temporal_visibility_v1_dev && curl -X DELETE http://elastic:overdoll123@localhost:9200/_alias/*,-temporal_visibility_v1_dev
echo
