echo "hades: running setup commands"
kubectl exec -it deployments.apps/hades -n default -- /bin/bash -c "./applications/hades/internal/local-image.binary_/local-image.binary db migrate && ./applications/hades/internal/local-image.binary_/local-image.binary db seed"
