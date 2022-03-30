workspace(
    name = "overdoll",
    managed_directories = {
        "@npm": ["node_modules"],
    },
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "rules_rust",
    sha256 = "7453856d239a004c9e29cde2e45903a068446e4a69501ee7393faf08e1a30403",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_rust/releases/download/0.1.0/rules_rust-v0.1.0.tar.gz",
        "https://github.com/bazelbuild/rules_rust/releases/download/0.1.0/rules_rust-v0.1.0.tar.gz",
    ],
)

load("@rules_rust//rust:repositories.bzl", "rules_rust_dependencies", "rust_register_toolchains")

rules_rust_dependencies()

rust_register_toolchains()

http_archive(
    name = "cargo_raze",
    sha256 = "58ecdbae2680b71edc19a0f563cdb73e66c8914689b6edab258c8b90a93b13c7",
    strip_prefix = "cargo-raze-0.15.0",
    url = "https://github.com/google/cargo-raze/archive/v0.15.0.tar.gz",
)

load("@cargo_raze//:repositories.bzl", "cargo_raze_repositories")

cargo_raze_repositories()

load("@cargo_raze//:transitive_deps.bzl", "cargo_raze_transitive_deps")

cargo_raze_transitive_deps()

# load cargo dependencies
load("//cargo:crates.bzl", "raze_fetch_remote_crates")

raze_fetch_remote_crates()

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "d6b2513456fe2229811da7eb67a444be7785f5323c6708b38d851d2b51e54d83",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.30.0/rules_go-v0.30.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.30.0/rules_go-v0.30.0.zip",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "de69a09dc70417580aabf20a28619bb3ef60d038470c7cf8442fafcf627c21cb",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_download_sdk", "go_register_toolchains", "go_rules_dependencies")
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")
load("//:repositories.bzl", "go_repositories")

# gazelle:repository_macro repositories.bzl%go_repositories
go_repositories()

go_rules_dependencies()

go_register_toolchains(version = "1.17.6")

gazelle_dependencies()

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "85ffff62a4c22a74dbd98d05da6cf40f497344b3dbf1e1ab0a37ab2a1a6ca014",
    strip_prefix = "rules_docker-0.23.0",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.23.0/rules_docker-v0.23.0.tar.gz"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)
container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

http_archive(
    name = "com_google_protobuf",
    sha256 = "6aff9834fd7c540875e1836967c8d14c6897e3785a2efac629f69860fb7834ff",
    strip_prefix = "protobuf-3.15.0",
    urls = [
        "https://mirror.bazel.build/github.com/protocolbuffers/protobuf/archive/v3.15.0.tar.gz",
        "https://github.com/protocolbuffers/protobuf/archive/v3.15.0.tar.gz",
    ],
)

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

http_archive(
    name = "build_bazel_rules_nodejs",
    patch_args = ["-p1"],
    patches = ["//.patches:coverage.patch"],
    sha256 = "65067dcad93a61deb593be7d3d9a32a4577d09665536d8da536d731da5cd15e2",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/3.4.2/rules_nodejs-3.4.2.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    node_version = "16.0.0",
    yarn_version = "1.19.1",
)

load("@io_bazel_rules_docker//go:image.bzl", go_image_repos = "repositories")

go_image_repos()

load(
    "@io_bazel_rules_docker//rust:image.bzl",
    rust_image_repos = "repositories",
)

rust_image_repos()

load(
    "@io_bazel_rules_docker//nodejs:image.bzl",
    nodejs_image_repos = "repositories",
)

load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

nodejs_image_repos()

yarn_install(
    name = "npm",
    args = [
        "--target_arch=x64",
        "--target_platform=linux",
    ],
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

container_pull(
    name = "go_base_image",
    registry = "docker.io",
    repository = "library/golang",
    tag = "1.16",
)

container_pull(
    name = "go_ffmpeg_image",
    registry = "docker.io",
    repository = "jrottenberg/ffmpeg",
    tag = "3.4.9-ubuntu1804",
)
