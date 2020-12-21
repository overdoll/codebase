load("@io_bazel_rules_k8s//k8s:object.bzl", "k8s_object")
load("@io_bazel_rules_k8s//k8s:objects.bzl", "k8s_objects")

package(default_visibility = ["//visibility:public"])

k8s_objects(
    name = "objects",
    objects = [
        ":eva-service",
        ":eva-deployment",
    ],
)

k8s_object(
    name = "eva-service",
    kind = "service",
    template = ":eva-service.yaml",
)

k8s_object(
    name = "eva-deployment",
    kind = "deployment",
    template = ":eva.yaml",
)
