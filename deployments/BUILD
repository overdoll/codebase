load("@io_bazel_rules_k8s//k8s:object.bzl", "k8s_object")
load("@io_bazel_rules_k8s//k8s:objects.bzl", "k8s_objects")

k8s_objects(
    name = "objects",
    objects = [
        "//deployments/hades:objects",
        "//deployments/medusa:objects",
        "//deployments/eva:objects",
        ":ingress",
    ],
)

k8s_object(
    name = "ingress",
    kind = "ingress",
    template = ":ingress.yaml",
)
