load("@io_bazel_rules_k8s//k8s:object.bzl", "k8s_object")
load("@io_bazel_rules_k8s//k8s:objects.bzl", "k8s_objects")

k8s_objects(
    name = "objects",
    objects = [
        ":deployments",
        ":services",
        ":ingress",
    ],
)

k8s_objects(
    name = "deployments",
    objects = [
        ":example-go-deployment",
        ":example-node-deployment",
    ],
)

k8s_objects(
    name = "services",
    objects = [
        ":example-node-service",
        ":example-go-service",
    ],
)

k8s_objects(
    name = "ingress",
    objects = [
        ":example-ingress",
    ],
)

k8s_object(
    name = "example-ingress",
    kind = "ingress",
    template = ":example-ingress.yaml",
)

k8s_object(
    name = "example-node-service",
    kind = "service",
    template = ":example-node-service.yaml",
)

k8s_object(
    name = "example-go-service",
    kind = "service",
    template = ":example-go-service.yaml",
)

k8s_object(
    name = "example-go-deployment",
    kind = "deployment",
    template = ":example-go.yaml",
)

k8s_object(
    name = "example-node-deployment",
    kind = "deployment",
    template = ":example-node.yaml",
)
