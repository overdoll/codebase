applications = {
    "hades": {
        "type": "go",
        "image_reference": "hades-image",
        "image_target": "//applications/hades:hades-image",
        "binary_target": "//applications/hades:hades",
        "binary_output": "applications/hades/hades_/hades",
        "container_workdir": "/app/applications/hades/hades-image.binary.runfiles/project01101000/",
        "container_binary": "applications/hades/hades-image.binary_/hades-image.binary",
        "bazel_image": "bazel/applications/hades:hades-image",
        "dependencies": [],
        "live_update": [],
    },
    "eva": {
        "type": "go",
        "image_reference": "eva-image",
        "image_target": "//applications/eva:eva-image",
        "binary_target": "//applications/eva:eva",
        "binary_output": "applications/eva/eva_/eva",
        "container_workdir": "/app/applications/eva/eva-image.binary.runfiles/project01101000/",
        "container_binary": "applications/eva/eva-image.binary_/eva-image.binary",
        "bazel_image": "bazel/applications/eva:eva-image",
        "dependencies": [],
        "live_update": [],
    },
    "medusa": {
        "type": "node",
        "image_reference": "medusa-image",
        "image_target": "//applications/medusa:medusa-image",
        "binary_target": "//applications/medusa:medusa",
        "binary_output": "applications/medusa/medusa_/medusa",
        "container_workdir": "/app/applications/medusa/eva-image.binary.runfiles/project01101000/",
        "container_binary": "applications/medusa/medusa-image.binary_/medusa-image.binary",
        "bazel_image": "bazel/applications/medusa:medusa-image",
        "entrypoint": "/app/applications/medusa/medusa",
        "dependencies": [
            "applications/medusa/src",
            "applications/medusa/server",
            "applications/medusa/public",
        ],
        "live_update": [
            sync("applications/medusa/src", "/app/applications/medusa/medusa.runfiles/project01101000/applications/medusa/src"),
            sync("applications/medusa/server", "/app/applications/medusa/medusa.runfiles/project01101000/applications/medusa/server"),
            sync("applications/medusa/public", "/app/applications/medusa/medusa.runfiles/project01101000/applications/medusa/public"),
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

# For more on Extensions, see: https://docs.tilt.dev/extensions.html
load("ext://restart_process", "custom_build_with_restart")
load("./bazel.Tiltfile", "bazel_buildfile_deps", "bazel_sourcefile_deps")
load("ext://cert_manager", "deploy_cert_manager")

# Deploy cert-manager
deploy_cert_manager()

k8s_yaml("deployments/scylla-operator.yaml")

# Watch YAML kubernetes files
for f in bazel_sourcefile_deps("//deployments:objects"):
    watch_file(f)

for f in bazel_buildfile_deps("//deployments:objects"):
    watch_file(f)

# Deploy YAML files
k8s_yaml(local("bazel run //deployments:objects"))

# Tilt works better if we watch the bazel output tree
# directly instead of the ./bazel-bin symlinks.
bazel_bin = str(local("bazel info bazel-bin")).strip()

# Build services with above config
for item in applications.keys():
    application = applications[item]

    if (application["type"] == "go"):
        # The go_image BUILD.bazel.bazel.bazel.bazel.bazel.bazel.bazel rule
        image_target = application["image_target"]
        binary_target = application["binary_target"]

        # Where go_binary puts the binary. You can determine this by building the
        # go_binary target and reading the output log.
        binary_target_local = os.path.join(bazel_bin, application["binary_output"])

        # Where go_image puts the Go binary in the container. You can determine this
        # by shelling into the container with `kubectl exec -it [pod name] -- sh`
        container_workdir = application["container_workdir"]
        binary_target_container = container_workdir + application["container_binary"]

        # Where go_image puts the image in Docker (bazel/path/to/target:name)
        bazel_image = application["bazel_image"]

        local_resource(
            name = item + "-compile",
            cmd = "bazel build --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 {binary_target}".format(binary_target = binary_target),
            deps = bazel_sourcefile_deps(binary_target),
        )

        custom_build_with_restart(
            ref = application["image_reference"],
            command = (
                "bazel run --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 {image_target} -- --norun && " +
                "docker tag {bazel_image} $EXPECTED_REF"
            ).format(image_target = image_target, bazel_image = bazel_image),
            deps = [binary_target_local] + application["dependencies"],
            entrypoint = binary_target_container,
            live_update = application["live_update"] + [
                sync(binary_target_local, binary_target_container),
            ],
        )

        k8s_resource(item, resource_deps = [item + "-compile"])

    elif (application["type"] == "node"):
        image_target = application["image_target"]

        container_workdir = application["container_workdir"]
        binary_target_container = container_workdir + application["container_binary"]

        bazel_image = application["bazel_image"]

        custom_build(
            ref = application["image_reference"],
            command = (
                "bazel run --platforms=@build_bazel_rules_nodejs//toolchains/node:linux_amd64 {image_target} -- --norun && " +
                "docker tag {bazel_image} $EXPECTED_REF"
            ).format(image_target = image_target, bazel_image = bazel_image),
            deps = application["dependencies"],
            #deps = bazel_sourcefile_deps("//applications/gateway:dependencies") + ["applications/gateway"],
            entrypoint = application["entrypoint"],
            live_update = application["live_update"],
            #live_update = [
            #    sync("applications/gateway/index.js", container_workdir + "/applications/gateway/index.js"),
            #],
        )

        k8s_resource(item)

local_resource(
    "generate-graphql",
    cmd = "yarn run graphql",
    trigger_mode = TRIGGER_MODE_MANUAL,
    auto_init = False,
)

local_resource("relay-compiler", serve_cmd = "yarn run relay")

load("ext://helm_remote", "helm_remote")

helm_remote(
    "traefik",
    release_name = "traefik",
    repo_name = "traefik",
    version = "9.11.0",
)

k8s_resource("scylla-operator-controller-manager", pod_readiness = "wait", objects = ["scylla-operator-cluster-webhook:MutatingWebhookConfiguration:default"])

# Have
k8s_kind("Cluster", api_version = "scylla.scylladb.com/v1alpha1")
k8s_resource("simple-cluster", extra_pod_selectors = {"scylla/cluster": "simple-cluster"}, resource_deps = ["scylla-operator-controller-manager"])
