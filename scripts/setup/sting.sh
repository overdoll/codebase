echo "sting: running setup commands"
kubectl exec -it deployments.apps/sting -n default -- /bin/bash -c "./applications/sting/internal/local-image.binary_/local-image.binary db migrate && ./applications/sting/internal/local-image.binary_/local-image.binary db seed"
