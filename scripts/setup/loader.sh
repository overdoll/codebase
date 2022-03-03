echo "loader: running setup commands"
kubectl exec -it deployments.apps/loader -- /bin/bash -c "./applications/loader/internal/local-image.binary_/local-image.binary db migrate && ./applications/loader/internal/local-image.binary_/local-image.binary db seed"
