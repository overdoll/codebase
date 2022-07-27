workspace(
    name = "overdoll",
    managed_directories = {
        "@npm_orca": ["applications/orca/node_modules"],
    },
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "rules_rust",
    sha256 = "39655ab175e3c6b979f362f55f58085528f1647957b0e9b3a07f81d8a9c3ea0a",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_rust/releases/download/0.2.0/rules_rust-v0.2.0.tar.gz",
        "https://github.com/bazelbuild/rules_rust/releases/download/0.2.0/rules_rust-v0.2.0.tar.gz",
    ],
)

load("@rules_rust//rust:repositories.bzl", "rules_rust_dependencies", "rust_register_toolchains")

rules_rust_dependencies()

rust_register_toolchains(version = "1.59.0", edition="2021", rustfmt_version = "1.59.0")

load("@rules_rust//crate_universe:repositories.bzl", "crate_universe_dependencies")

crate_universe_dependencies()

load("@rules_rust//crate_universe:defs.bzl", "crates_repository", "crate", "render_config")

# download rusty_v8 dependency
load("//third_party/rusty_v8:rusty_v8_repositories.bzl", "rusty_v8_repositories")

rusty_v8_repositories()

crates_repository(
    name = "crates",
    lockfile = "//:Cargo.Bazel.lock",
    manifests = ["//:Cargo.toml", "//applications/orca:Cargo.toml"],
    annotations = {
            "v8": [crate.annotation(
               data = [
                   "@rusty_v8//file"
               ],
               compile_data = [
                   "@rusty_v8//file"
               ],
               build_script_data = [
                   "@rusty_v8//file"
               ],
               rustc_flags = [
                   "-Lall=external/rusty_v8/file"
               ],
            )],
            "router-bridge": [crate.annotation(
               gen_build_script = False,
               data = [
                   "@overdoll//third_party/router_bridge:files"
               ],
               rustc_env = {
                   "STATIC_DIR": "${pwd}/third_party/router_bridge",
               },
               patch_args = ["-p1"],
               patches = ["@overdoll//.patches:router_bridge.patch"],
            )],
            "opentelemetry-otlp": [crate.annotation(
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@rules_rust//rust/toolchain:current_exec_rustfmt_files",
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)",
                    "RUSTFMT": "$(execpath @rules_rust//rust/toolchain:current_exec_rustfmt_files)",
                    "BUILD_WORKSPACE_DIRECTORY": "."
               },
            )],
            "apollo-spaceport": [crate.annotation(
               version = "0.1.0-preview.1",
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@crates__prost-build-0.9.0//:third-party",
                    "@rules_rust//rust/toolchain:current_exec_rustfmt_files",
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)",
                    "PROTOC_INCLUDE": "${pwd}/external/crates__prost-build-0.9.0/third-party/protobuf/include",
                    "RUSTFMT": "$(execpath @rules_rust//rust/toolchain:current_exec_rustfmt_files)",
                    "BUILD_WORKSPACE_DIRECTORY": "."
               },
            )],
            "prost-build": [crate.annotation(
               additive_build_file_content = "filegroup(name=\"third-party\", srcs = glob([\"third-party/**\"]))",
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    ":third-party",
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)"
               },
            )],
        },
)

load("@crates//:defs.bzl", "crate_repositories")

crate_repositories()

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "ab21448cef298740765f33a7f5acee0607203e4ea321219f2a4c85a6e0fb0a27",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.32.0/rules_go-v0.32.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.32.0/rules_go-v0.32.0.zip",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "5982e5463f171da99e3bdaeff8c0f48283a7a5f396ec5282910b9e8a49c0dd7e",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.25.0/bazel-gazelle-v0.25.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.25.0/bazel-gazelle-v0.25.0.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_download_sdk", "go_register_toolchains", "go_rules_dependencies")
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")
load("//:go_repositories.bzl", "go_repositories")

# gazelle:repository_macro go_repositories.bzl%go_repositories
go_repositories()

go_rules_dependencies()

go_register_toolchains(version = "1.18.3")

gazelle_dependencies()

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "b1e80761a8a8243d03ebca8845e9cc1ba6c82ce7c5179ce2b295cd36f7e394bf",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.25.0/rules_docker-v0.25.0.tar.gz"],
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
    sha256 = "c78216f5be5d451a42275b0b7dc809fb9347e2b04a68f68bad620a2b01f5c774",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.5.2/rules_nodejs-5.5.2.tar.gz"],
)

load("@build_bazel_rules_nodejs//:repositories.bzl", "build_bazel_rules_nodejs_dependencies")
build_bazel_rules_nodejs_dependencies()

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
    name = "npm_orca",
    args = [
        "--target_arch=x64",
        "--target_platform=linux",
    ],
    package_json = "//applications/orca:package.json",
    yarn_lock = "//applications/orca:yarn.lock",
)

DOCKER_REGISTRY = "771779017151.dkr.ecr.us-east-1.amazonaws.com"

container_pull(
    name = "go_base_image",
    registry = DOCKER_REGISTRY,
    repository = "base-images/go",
    tag = "v1.1.0",
    digest = "sha256:23ca6013c3a6b868df167960c685cdcfb03d1656d6e2feda00757031b9538935",
)

container_pull(
    name = "eva_base_image",
    registry = DOCKER_REGISTRY,
    repository = "base-images/eva",
    tag = "v1.0.0",
    digest = "sha256:bc40ed87fc5e154d8ae7d8d72fa0787fa035e3cf89686e8e08f1d0489f47b5d3",
)

container_pull(
    name = "rust_base_image",
    registry = "docker.io",
    repository = "library/rust",
    tag = "1.59.0",
)

container_pull(
    name = "go_ffmpeg_image",
    registry = DOCKER_REGISTRY,
    repository = "base-images/resource-processing",
    tag = "v1.2.0",
    digest = "sha256:766208b943c294739827b2507f4be82c0140ed7429f284fb428b2bda36005a3e",
)
