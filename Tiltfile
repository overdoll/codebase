# -*- mode: Python -*-

docker_prune_settings(
    disable = False,
    max_age_mins = 360,
    num_builds = 0,
    interval_hrs = 1,
    keep_recent = 2,
)

# For more on Extensions, see: https://docs.tilt.dev/extensions.html
load("ext://restart_process", "custom_build_with_restart")
load("./bazel.Tiltfile", "bazel_sourcefile_deps")

# Use Bazel to generate the Kubernetes YAML
for f in bazel_sourcefile_deps("//deployments:example-go"):
    watch_file(f)

for f in bazel_sourcefile_deps("//deployments:example-node"):
    watch_file(f)

k8s_yaml(local("bazel run //deployments:example-go"))
k8s_yaml(local("bazel run //deployments:example-node"))

# Use Bazel to build the image

# The go_image BUILD rule
image_target = "//applications/service:example-go-image"
binary_target = "//applications/service:example-go"

# Tilt works better if we watch the bazel output tree
# directly instead of the ./bazel-bin symlinks.
bazel_bin = str(local("bazel info bazel-bin")).strip()

# Where go_binary puts the binary. You can determine this by building the
# go_binary target and reading the output log.
binary_target_local = os.path.join(bazel_bin, "applications/service/example-go_/example-go")

# Where go_image puts the Go binary in the container. You can determine this
# by shelling into the container with `kubectl exec -it [pod name] -- sh`
container_workdir = "/app/applications/service/example-go-image.binary.runfiles/project01101000/"
binary_target_container = container_workdir + "applications/service/example-go-image.binary_/example-go-image.binary"

# Where go_image puts the image in Docker (bazel/path/to/target:name)
bazel_image = "bazel/applications/service:example-go-image"

local_resource(
    name = "example-go-compile",
    cmd = "bazel build --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 {binary_target}".format(binary_target = binary_target),
    deps = bazel_sourcefile_deps(binary_target),
)

custom_build_with_restart(
    ref = "example-go-image",
    command = (
        "bazel run --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 {image_target} -- --norun && " +
        "docker tag {bazel_image} $EXPECTED_REF"
    ).format(image_target = image_target, bazel_image = bazel_image),
    deps = ["applications/service/web", binary_target_local],
    entrypoint = binary_target_container,
    live_update = [
        sync("applications/service/web", container_workdir + "applications/service/web"),
        sync(binary_target_local, binary_target_container),
    ],
)

image_target = "//applications/gateway:example-node-image"

container_workdir = "/app/applications/gateway/nodemon.runfiles/project01101000"
binary_target_container = container_workdir + "/applications/gateway/nodemon.sh"

bazel_image = "bazel/applications/gateway:example-node-image"

custom_build_with_restart(
    ref = "example-node-image",
    command = (
        "bazel run --platforms=@build_bazel_rules_nodejs//toolchains/node:linux_amd64 {image_target} -- --norun && " +
        "docker tag {bazel_image} $EXPECTED_REF"
    ).format(image_target = image_target, bazel_image = bazel_image),
    deps = bazel_sourcefile_deps("//applications/gateway:dependencies") + ["applications/gateway"],
    entrypoint = "/app/applications/gateway/nodemon",
    live_update = [
        sync("applications/gateway/index.js", container_workdir + "/applications/gateway/index.js"),
    ],
)

k8s_resource("example-go", port_forwards = 8000, resource_deps = ["example-go-compile"])

k8s_resource("example-node", port_forwards = 9000)

load("ext://helm_remote", "helm_remote")

helm_remote(
    "traefik",
    release_name = "traefik",
    repo_name = "traefik",
    version = "9.11.0",
)
