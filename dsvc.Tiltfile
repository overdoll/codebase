load("./development/helpers.Tiltfile", "get_namespace")

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
