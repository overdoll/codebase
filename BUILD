# Bazel BUILD.bazel file

load("@io_bazel_rules_docker//go:image.bzl", "go_image")
load("@bazel_gazelle//:def.bzl", "gazelle")

package(default_visibility = ["//visibility:public"])

# gazelle:prefix project01101000/codebase
# gazelle:proto package
# gazelle:proto_group go_package
gazelle(
    name = "gazelle",
)
