workspace(
    name = "overdoll",
    managed_directories = {
        "@npm": ["node_modules"],
    },
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Foreigncc is used to build OpenSSL
http_archive(
    name = "rules_foreign_cc",
    sha256 = "1df78c7d7eed2dc21b8b325a2853c31933a81e7b780f9a59a5d078be9008b13a",
    strip_prefix = "rules_foreign_cc-0.7.0",
    url = "https://github.com/bazelbuild/rules_foreign_cc/archive/0.7.0.tar.gz",
)

load("@rules_foreign_cc//foreign_cc:repositories.bzl", "rules_foreign_cc_dependencies")

rules_foreign_cc_dependencies()

# Load OpenSSL and other 3rd party dependencies
load("//third_party/openssl:openssl_repositories.bzl", "openssl_repositories")

openssl_repositories()

# perl is used to build openssl
http_archive(
    name = "rules_perl",
    sha256 = "55fbe071971772758ad669615fc9aac9b126db6ae45909f0f36de499f6201dd3",
    strip_prefix = "rules_perl-2f4f36f454375e678e81e5ca465d4d497c5c02da",
    urls = [
        "https://github.com/bazelbuild/rules_perl/archive/2f4f36f454375e678e81e5ca465d4d497c5c02da.tar.gz",
    ],
)

load("@rules_perl//perl:deps.bzl", "perl_register_toolchains", "perl_rules_dependencies")

perl_rules_dependencies()

perl_register_toolchains()

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

rust_register_toolchains()

load("@rules_rust//crate_universe:repositories.bzl", "crate_universe_dependencies")

crate_universe_dependencies()

load("@rules_rust//crate_universe:defs.bzl", "crates_repository", "crate")

crates_repository(
    name = "crate_index",
    lockfile = "//:Cargo.Bazel.lock",
    manifests = ["//:Cargo.toml", "//applications/orca:Cargo.toml"],
    packages = {
        "router-bridge": crate.spec(
            package = "router-bridge",
            git = "https://github.com/apollographql/federation-rs",
            rev = "645ef8b66b14ee6d13e8e24ddd4aba29389031a1"
        )
    },
    annotations = {
            "openssl-sys": [crate.annotation(
                build_script_data = [
                    "@openssl//:gen_dir",
                    "@openssl//:openssl",
                ],
                build_script_data_glob = ["build/**/*.c"],
                build_script_env = {
                    "OPENSSL_DIR": "$(execpath @openssl//:gen_dir)",
                    "OPENSSL_STATIC": "1",
                },
                data = ["@openssl"],
                deps = ["@openssl"],
            )],
            "v8": [crate.annotation(
               gen_build_script = False,
               data = [
                   "@overdoll//third_party/v8:librusty_v8.a"
               ],
               rustc_flags = [
                   "-Lall=third_party/v8"
               ]
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
            "rover-client": [crate.annotation(
               gen_build_script = False,
               data = [
                   "@overdoll//third_party/rover_client:files"
               ],
               rustc_env = {
                   "STATIC_DIR": "${pwd}/third_party/rover_client",
               },
               patch_args = ["-p1"],
               patches = ["@overdoll//.patches:rover_client.patch"],
            )],
            "opentelemetry-otlp": [crate.annotation(
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@rules_rust//tools/rustfmt"
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)",
                    "RUSTFMT": "/home/nikita/.cargo/bin/rustfmt",
                    "BUILD_WORKSPACE_DIRECTORY": "."
               },
            )],
            "apollo-spaceport": [crate.annotation(
               version = "0.1.0-preview.1",
               build_script_data = [
                    "@com_google_protobuf//:protoc",
                    "@crate_index__prost-build-0.9.0//:third-party",
               ],
               build_script_env = {
                    "PROTOC": "$(execpath @com_google_protobuf//:protoc)",
                    "PROTOC_INCLUDE": "${pwd}/external/crate_index__prost-build-0.9.0/third-party/protobuf/include",
                    "RUSTFMT": "/home/nikita/.cargo/bin/rustfmt",
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

load("@crate_index//:defs.bzl", "crate_repositories")

crate_repositories()

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
