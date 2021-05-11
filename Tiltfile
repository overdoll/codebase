# For more on Extensions, see: https://docs.tilt.dev/extensions.html
allow_k8s_contexts("overdoll")

docker_prune_settings(
    disable = False,
    max_age_mins = 360,
    num_builds = 0,
    interval_hrs = 1,
    keep_recent = 2,
)

load("./development/helpers.Tiltfile", "bazel_buildfile_deps", "bazel_sourcefile_deps", "build_applications")
load("ext://helm_remote", "helm_remote")

helm_remote(
    "redis",
    repo_name = "redis",
    repo_url = "https://charts.helm.sh/stable",
    version = "12.2.4",
    values = ["./development/redis/values.yaml"],
)

helm_remote(
    "elasticsearch",
    repo_name = "elasticsearch",
    repo_url = "https://helm.elastic.co",
    values = ["./development/elastic/elasticsearch.yaml"],
)

k8s_yaml("./development/scylla/scylla-config.yaml")
k8s_yaml("./development/scylla/cluster.yaml")
k8s_yaml("./development/minio/minio.yaml")
k8s_yaml("./development/kafka/persistent.yaml")

applications = {
    "eva": {
        "type": "go",
        "directory": "eva",
        "image_reference": "eva-image",
        "image_target": "//applications/eva:eva-image",
        "binary_target": "//applications/eva:eva",
        "binary_output": "applications/eva/eva_/eva",
        "container_workdir": "/app/applications/eva/eva-image.binary.runfiles/overdoll/",
        "container_binary": "applications/eva/eva-image.binary_/eva-image.binary",
        "bazel_image": "bazel/applications/eva:eva-image",
        "dependencies": [
            "applications/eva/.env",
            "applications/eva/database",
        ],
        "live_update": [
            sync("applications/eva/database", "/app/applications/eva/eva-image.binary.runfiles/overdoll/applications/eva/database"),
        ],
    },
    "sting": {
        "type": "go",
        "directory": "sting",
        "image_reference": "sting-image",
        "image_target": "//applications/sting:sting-image",
        "binary_target": "//applications/sting:sting",
        "binary_output": "applications/sting/sting_/sting",
        "container_workdir": "/app/applications/sting/sting-image.binary.runfiles/overdoll/",
        "container_binary": "applications/sting/sting-image.binary_/sting-image.binary",
        "bazel_image": "bazel/applications/sting:sting-image",
        "dependencies": [
            "applications/sting/.env",
            "applications/sting/database",
        ],
        "live_update": [
            sync("applications/sting/database", "/app/applications/sting/sting-image.binary.runfiles/overdoll/applications/sting/database"),
        ],
    },
    "buffer": {
        "type": "go",
        "directory": "buffer",
        "image_reference": "buffer-image",
        "image_target": "//applications/buffer:buffer-image",
        "binary_target": "//applications/buffer:buffer",
        "binary_output": "applications/buffer/buffer_/buffer",
        "container_workdir": "/app/applications/buffer/buffer-image.binary.runfiles/overdoll/",
        "container_binary": "applications/buffer/buffer-image.binary_/buffer-image.binary",
        "bazel_image": "bazel/applications/buffer:buffer-image",
        "dependencies": [
            "applications/buffer/.env",
        ],
        "live_update": [],
    },
}

# Build applications with our helper function
build_applications(applications, [])
