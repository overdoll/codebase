# For more on Extensions, see: https://docs.tilt.dev/extensions.html
allow_k8s_contexts("overdoll")

load("ext://helm_remote", "helm_remote")
load("./development/helpers.Tiltfile", "bazel_buildfile_deps", "bazel_sourcefile_deps", "build_applications")

applications = {
    "hades": {
        "type": "go",
        "image_reference": "hades-image",
        "image_target": "//applications/hades:hades-image",
        "binary_target": "//applications/hades:hades",
        "binary_output": "applications/hades/hades_/hades",
        "container_workdir": "/app/applications/hades/hades-image.binary.runfiles/overdoll/",
        "container_binary": "applications/hades/hades-image.binary_/hades-image.binary",
        "bazel_image": "bazel/applications/hades:hades-image",
        "dependencies": [
            "applications/hades/.env",
            "applications/hades/queries.json",
        ],
        "live_update": [
            sync("applications/hades/.env", "/app/applications/hades/hades-image.binary.runfiles/overdoll/applications/hades/.env"),
            sync("applications/hades/queries.json", "/app/applications/hades/hades-image.binary.runfiles/overdoll/applications/hades/queries.json"),
        ],
    },
    "eva": {
        "type": "go",
        "image_reference": "eva-image",
        "image_target": "//applications/eva:eva-image",
        "binary_target": "//applications/eva:eva",
        "binary_output": "applications/eva/eva_/eva",
        "container_workdir": "/app/applications/eva/eva-image.binary.runfiles/overdoll/",
        "container_binary": "applications/eva/eva-image.binary_/eva-image.binary",
        "bazel_image": "bazel/applications/eva:eva-image",
        "dependencies": [
            "applications/eva/.env",
            "applications/eva/migrations",
        ],
        "live_update": [
            sync("applications/eva/migrations", "/app/applications/hades/hades-image.binary.runfiles/overdoll/applications/eva/migrations"),
            sync("applications/eva/.env", "/app/applications/hades/hades-image.binary.runfiles/overdoll/applications/eva/.env"),
        ],
    },
    "medusa": {
        "type": "node",
        "image_reference": "medusa-image",
        "image_target": "//applications/medusa:medusa-image",
        "binary_target": "//applications/medusa:medusa",
        "binary_output": "applications/medusa/medusa_/medusa",
        "container_workdir": "/app/applications/medusa/eva-image.binary.runfiles/overdoll/",
        "container_binary": "applications/medusa/medusa-image.binary_/medusa-image.binary",
        "bazel_image": "bazel/applications/medusa:medusa-image",
        "entrypoint": "/app/applications/medusa/medusa",
        "dependencies": [
            "applications/medusa/src",
            "applications/medusa/public",
            "applications/medusa/.env",
        ],
        "live_update": [
            sync("applications/medusa/src", "/app/applications/medusa/medusa.runfiles/overdoll/applications/medusa/src"),
            sync("applications/medusa/.env", "/app/applications/medusa/medusa.runfiles/overdoll/applications/medusa/.env"),
            sync("applications/medusa/public", "/app/applications/medusa/medusa.runfiles/overdoll/applications/medusa/public"),
        ],
    },
}

docker_prune_settings(
    disable = False,
    max_age_mins = 360,
    num_builds = 0,
    interval_hrs = 1,
    keep_recent = 2,
)

# Watch YAML kubernetes files
for f in bazel_sourcefile_deps("//development:objects"):
    watch_file(f)

for f in bazel_buildfile_deps("//development:objects"):
    watch_file(f)

# Deploy YAML files
k8s_yaml(local("bazel run //development:objects"))

# Setup cluster - Need to group some resources or it wil be messy!
k8s_kind("Cluster", api_version = "scylla.scylladb.com/v1alpha1")
k8s_resource("simple-cluster", extra_pod_selectors = {"scylla/cluster": "simple-cluster"})

# Build applications with our helper function
build_applications(applications, ["simple-cluster", "redis-master"])

local_resource(
    "generate-graphql",
    cmd = "NODE_TLS_REJECT_UNAUTHORIZED=0 yarn run graphql",
    trigger_mode = TRIGGER_MODE_MANUAL,
    auto_init = False,
)

local_resource("relay-compiler", serve_cmd = "yarn run relay")

helm_remote(
    "traefik",
    release_name = "traefik",
    repo_name = "traefik",
    version = "9.11.0",
)

helm_remote(
    "redis",
    release_name = "redis",
    repo_name = "bitnami",
    version = "12.2.4",
    set = ["cluster.enabled=false", "cluster.slaveCount=0", "usePassword=false"],
)

helm_remote(
    "rabbitmq",
    release_name = "rabbitmq",
    repo_name = "bitnami",
    version = "7.6.8",
    set = ["auth.username=test", "auth.password=test"],
)

k8s_resource(workload = "redis-master", port_forwards = [6379])
k8s_resource(workload = "rabbitmq", port_forwards = [15672])
