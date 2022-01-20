echo "eva: running setup commands"
kubectl exec -it deployments.apps/eva -- /bin/bash -c "./applications/eva/internal/local-image.binary_/local-image.binary db migrate && ./applications/eva/internal/local-image.binary_/local-image.binary db seed && ./applications/eva/internal/local-image.binary_/local-image.binary index all"
