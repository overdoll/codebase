load("./development/helpers.Tiltfile", "get_namespace")
load("ext://helm_remote", "helm_remote")
load("ext://namespace", "namespace_create", "namespace_inject")

namespace_create(get_namespace())

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

k8s_yaml(namespace_inject(read_file("./development/scylla/role.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/scylla/scylla-config.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/scylla/cluster.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/minio/minio.yaml"), get_namespace()))
k8s_yaml(namespace_inject(read_file("./development/kafka/persistent.yaml"), get_namespace()))

k8s_yaml(
    helm(
        "./development/service",
        name = "eva",
        values = ["./development/services/eva.yaml"],
        namespace = get_namespace(),
    ),
)

k8s_yaml(
    helm(
        "./development/service",
        name = "sting",
        values = ["./development/services/sting.yaml"],
        namespace = get_namespace(),
    ),
)

k8s_yaml(
    helm(
        "./development/service",
        name = "buffer",
        values = ["./development/services/buffer.yaml"],
        namespace = get_namespace(),
    ),
)

k8s_yaml(
    helm(
        "./development/service",
        name = "medusa",
        values = ["./development/services/medusa.yaml"],
        namespace = get_namespace(),
    ),
)
