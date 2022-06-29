echo "parley: running setup commands"
kubectl exec -it deployments.apps/parley -n default -- /bin/bash -c "./applications/parley/internal/local-image.binary_/local-image.binary db migrate && ./applications/parley/internal/local-image.binary_/local-image.binary cache register && ./applications/parley/internal/local-image.binary_/local-image.binary db seed && ./applications/parley/internal/local-image.binary_/local-image.binary cache reindex"
