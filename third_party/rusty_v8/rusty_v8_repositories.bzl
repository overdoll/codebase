load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_file")
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")

def rusty_v8_repositories():
    maybe(
        http_file,
        name = "rusty_v8",
        downloaded_file_path = "librusty_v8.a",
        sha256 = "7f91d62ded7017a9c0f9ee52c1677e0f05ed6273ab71723c90b230762f2c7268",
        urls = [
            "https://github.com/denoland/rusty_v8/releases/download/v0.41.0/librusty_v8_release_x86_64-unknown-linux-gnu.a",
        ],
    )
