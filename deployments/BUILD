load("@io_bazel_rules_k8s//k8s:object.bzl", "k8s_object")
load("@io_bazel_rules_k8s//k8s:objects.bzl", "k8s_objects")

k8s_objects(
    name = "objects",
    objects = [
        "hades:objects",
        "medusa:objects",
        ":ingress",
    ],
)

k8s_object(
    name = "ingress",
    kind = "ingress",
    template = ":ingress.yaml",
)
