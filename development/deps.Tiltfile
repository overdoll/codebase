load("./development/helpers.Tiltfile", "get_namespace")
load("ext://helm_remote", "helm_remote")
load("ext://namespace", "namespace_create", "namespace_inject")

# TODO: eventually this will be handled by a spinnaker pipeline

namespace_create(get_namespace())

# Should be done first
# helm install traefik traefik/traefik --values ./development/traefik/values.yaml - needs to be done initially

helm_remote(
    "redis",
    repo_name = "bitnami",
    repo_url = "https://charts.bitnami.com/bitnami",
    version = "12.2.4",
    values = ["./development/redis/values.yaml"],
    namespace = get_namespace(),
)

helm_remote(
    "elasticsearch",
    repo_name = "elasticsearch",
    repo_url = "https://helm.elastic.co",
    values = ["./development/elastic/elasticsearch.yaml"],
    namespace = get_namespace(),
)

k8s_yaml(namespace_inject(read_file("./development/certs/issuer.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/certs/certificate.yaml"), get_namespace()))

k8s_yaml(namespace_inject(read_file("./development/scylla/role.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/scylla/scylla-config.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/scylla/cluster.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/minio/minio.yaml"), get_namespace()))
#k8s_yaml(namespace_inject(read_file("./development/kafka/persistent.yaml"), get_namespace()))

k8s_yaml(namespace_inject(read_file("./development/traefik/ingress.yaml"), get_namespace()))
