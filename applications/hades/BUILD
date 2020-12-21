# Bazel BUILD file

load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library")
load("@io_bazel_rules_docker//go:image.bzl", "go_image")
load("@bazel_gazelle//:def.bzl", "gazelle")

package(default_visibility = ["//visibility:public"])

# gazelle:prefix application/hades
gazelle(name = "gazelle")

web_sources = []

go_binary(
    name = "hades",
    data = web_sources,
    embed = [":go_default_library"],
    importpath = "application/hades",
)

go_image(
    name = "hades-image",
    base = "@go_base_image//image",
    data = web_sources,
    embed = [":go_default_library"],
    importpath = "application/hades",
)

go_library(
    name = "go_default_library",
    srcs = ["server.go"],
    importpath = "application/hades",
    deps = [
        "//applications/hades/graph:go_default_library",
        "//applications/hades/graph/generated:go_default_library",
        "@com_github_99designs_gqlgen//graphql/handler:go_default_library",
        "@com_github_99designs_gqlgen//graphql/playground:go_default_library",
    ],
)
