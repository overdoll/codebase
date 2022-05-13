echo "sting: running setup commands"
kubectl exec -it deployments.apps/sting -- /bin/bash -c "./applications/sting/internal/local-image.binary_/local-image.binary db migrate && ./applications/sting/internal/local-image.binary_/local-image.binary db seed"
