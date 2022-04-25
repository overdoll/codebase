echo "ringer: running setup commands"
kubectl exec -it deployments.apps/ringer -- /bin/bash -c "./applications/ringer/internal/local-image.binary_/local-image.binary db migrate && ./applications/ringer/internal/local-image.binary_/local-image.binary db seed && ./applications/ringer/internal/local-image.binary_/local-image.binary index all"
