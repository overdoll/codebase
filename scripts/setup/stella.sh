echo "stella: running setup commands"
kubectl exec -it deployments.apps/stella -n default -- /bin/bash -c "./applications/stella/internal/local-image.binary_/local-image.binary db migrate && ./applications/stella/internal/local-image.binary_/local-image.binary db seed"
