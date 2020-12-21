load("@io_bazel_rules_k8s//k8s:object.bzl", "k8s_object")
load("@io_bazel_rules_k8s//k8s:objects.bzl", "k8s_objects")

k8s_objects(
    name = "objects",
    objects = [
        ":medusa-service",
        ":medusa-deployment",
    ],
)

k8s_object(
    name = "medusa-service",
    kind = "service",
    template = ":medusa-service.yaml",
)

k8s_object(
    name = "medusa-deployment",
    kind = "deployment",
    template = ":medusa-deployment.yaml",
)
