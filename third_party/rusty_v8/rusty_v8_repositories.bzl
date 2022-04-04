load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_file")
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")

def rusty_v8_repositories():
    maybe(
        http_file,
        name = "rusty_v8",
        downloaded_file_path = "librusty_v8.a",
        sha256 = "bd191be59ac839848a6bce146ec243f8eb9ad30bdeedfd587f790c83f9246126",
        urls = [
            "https://github.com/denoland/rusty_v8/releases/download/v0.38.1/librusty_v8_release_x86_64-unknown-linux-gnu.a",
        ],
    )
