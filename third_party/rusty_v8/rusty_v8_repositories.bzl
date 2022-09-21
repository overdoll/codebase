load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_file")
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")

def rusty_v8_repositories():
    maybe(
        http_file,
        name = "rusty_v8",
        downloaded_file_path = "librusty_v8.a",
        sha256 = "d25d394167d62021534ad07401518c033076f0c14e7b8907ed8e664fa0b1bc67",
        urls = [
            "https://github.com/denoland/rusty_v8/releases/download/v0.44.3/librusty_v8_release_x86_64-unknown-linux-gnu.a",
        ],
    )
