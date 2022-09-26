workspace(
    name = "overdoll",
    managed_directories = {
        "@npm_orca": ["applications/orca/node_modules"],
    },
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

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
    name = "rules_rust",
    sha256 = "0cc7e6b39e492710b819e00d48f2210ae626b717a3ab96e048c43ab57e61d204",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_rust/releases/download/0.10.0/rules_rust-v0.10.0.tar.gz",
        "https://github.com/bazelbuild/rules_rust/releases/download/0.10.0/rules_rust-v0.10.0.tar.gz",
    ],
)

load("@rules_rust//rust:repositories.bzl", "rules_rust_dependencies", "rust_register_toolchains")

rules_rust_dependencies()
rust_register_toolchains(version = "1.62.1", edition="2021")

load("@rules_rust//crate_universe:repositories.bzl", "crate_universe_dependencies")

crate_universe_dependencies()

load("@rules_rust//crate_universe:defs.bzl", "crates_repository", "crate", "render_config")

# download rusty_v8 dependency
load("//third_party/rusty_v8:rusty_v8_repositories.bzl", "rusty_v8_repositories")

rusty_v8_repositories()

crates_repository(
    name = "crates",
    lockfile = "//:cargo_bazel_lock.json",
    cargo_lockfile = "//:Cargo.lock",
    manifests = ["//:Cargo.toml", "//applications/orca:Cargo.toml", "//applications/orca:xtask/Cargo.toml"],
    annotations = {
              "v8": [crate.annotation(
                   data = [
                       "@rusty_v8//file"
                   ],
                   compile_data = [
                       "@rusty_v8//file"
                   ],
                   data_glob = [],
                   compile_data_glob = [],
                   build_script_data = [
                       "@rusty_v8//file"
                   ],
                   rustc_flags = [
                       "-Lall=external/rusty_v8/file"
                   ],
                )],
            "opentelemetry-otlp": [crate.annotation(
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@rules_rust//rust/toolchain:current_rustfmt_files",
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)",
                    "RUSTFMT": "$(execpath @rules_rust//rust/toolchain:current_rustfmt_files)",
                    "BUILD_WORKSPACE_DIRECTORY": "."
               },
            )],
            "apollo-router": [crate.annotation(
               version = "1.0.0-rc.1",
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@rules_rust//rust/toolchain:current_rustfmt_files",
                    "@com_google_protobuf//:well_known_protos",
               ],
               build_script_env = {
                    "PROTOC_INCLUDE": "$${pwd}/external/com_google_protobuf/src",
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)",
                    "RUSTFMT": "$(execpath @rules_rust//rust/toolchain:current_rustfmt_files)",
                    "BUILD_WORKSPACE_DIRECTORY": "."
               }
            )],
            "tonic-build": [crate.annotation(
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@com_google_protobuf//:well_known_protos",
               ],
               data = [
                    "@com_google_protobuf//:protoc",
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)"
               },
            )],
            "prost-build": [crate.annotation(
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@com_google_protobuf//:well_known_protos",
               ],
               data = [
                    "@com_google_protobuf//:protoc",
                    "@com_google_protobuf//:well_known_protos",
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)"
               },
            )],
    }
)

load("@crates//:defs.bzl", "crate_repositories")

crate_repositories()

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "099a9fb96a376ccbbb7d291ed4ecbdfd42f6bc822ab77ae6f1b5cb9e914e94fa",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.35.0/rules_go-v0.35.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.35.0/rules_go-v0.35.0.zip",
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
    tag = "1.62.1",
)

container_pull(
    name = "go_ffmpeg_image",
    registry = DOCKER_REGISTRY,
    repository = "base-images/resource-processing",
    tag = "v1.8.0",
    digest = "sha256:c92407e3823c23e3dbe5f0d62f7b48218262fe43412aebc9feba507a16bb21d9",
)
