echo "eva: running setup commands"
kubectl exec -it deployments.apps/eva -n default -- /bin/bash -c "./applications/eva/internal/local-image.binary_/local-image.binary db migrate && ./applications/eva/internal/local-image.binary_/local-image.binary db seed"
