# Bazel BUILD.bazel file

load("@io_bazel_rules_docker//go:image.bzl", "go_image")
load("@bazel_gazelle//:def.bzl", "gazelle")

package(default_visibility = ["//visibility:public"])

# gazelle:prefix application/users
gazelle(name = "gazelle")

web_sources = []
