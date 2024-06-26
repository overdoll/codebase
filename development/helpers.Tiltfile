settings = read_json("../tilt_options.json", default={})

#allow_k8s_contexts("autobot")
allow_k8s_contexts("kind-overdoll")

default_registry(settings.get("registry", "localhost:37393"), single_name = "t/dev")
#default_registry('ttl.sh/overdoll-adg4tasdfasd')
#default_registry('771779017151.dkr.ecr.us-east-1.amazonaws.com',single_name='autobot/dev')

# ns = "user-%s" % user
ns = "default"

load("ext://restart_process", "custom_build_with_restart")

# Bazel helpers & Configuration
BAZEL_SOURCES_CMD_TEMPLATE = """
  bazel query 'filter("^//", kind("source file", deps(set(%s))))' --order_output=no
  """.strip()

BAZEL_BUILDFILES_CMD = """
  bazel query 'filter("^//", buildfiles(deps(set(%s))))' --order_output=no
  """.strip()

# Tilt works better if we watch the bazel output tree
# directly instead of the ./bazel-bin symlinks.
bazel_bin = str(local("bazel info bazel-bin")).strip()


def bazel_labels_to_files(labels):
    files = {}
    for l in labels:
        if l.startswith("//external/") or l.startswith("//external:"):
            continue
        elif l.startswith("//"):
            l = l[2:]

        path = l.replace(":", "/")
        if path.startswith("/"):
            path = path[1:]

        files[path] = None

    return files.keys()


def bazel_sourcefile_deps(target):
    return bazel_labels_to_files(str(local(BAZEL_SOURCES_CMD_TEMPLATE % target)).splitlines())


def bazel_buildfile_deps(target):
    return bazel_labels_to_files(str(local(BAZEL_BUILDFILES_CMD % target)).splitlines())


def build_applications(applications, dependencies):
    for item in applications.keys():
        application = applications[item]

        k8s_yaml(
            helm(
                "development/service",
                name=item,
                values=["development/services/" + item + ".yaml"],
               # set=[
               #     "toleration="+os.getenv("OVERDOLL_DEV_NAMESPACE", ""),
               #     "node="+os.getenv("OVERDOLL_DEV_NODE", ""),
               # ]
            ),
            allow_duplicates=True,
        )

        image_target = application["image_target"]
        bazel_image = application["bazel_image"]
        container_workdir = application["container_workdir"]

        # Where go_image puts the Go binary in the container. You can determine this
        # by shelling into the container with `kubectl exec -it [pod name] -- sh`
        binary_target_container = container_workdir + application["container_binary"]

        if (application["type"] == "go"):
            # The go_image
            binary_target = application["binary_target"]

            # Where go_binary puts the binary. You can determine this by building the
            # go_binary target and reading the output log.
            binary_target_local = os.path.join(bazel_bin, application["binary_output"])

            local_resource(
                name=item + "-compile",
                cmd="bazel build {binary_target}".format(binary_target=binary_target),
                deps=bazel_sourcefile_deps(binary_target),
            )

            cmd = "bazel run {image_target} -- --norun && "

            custom_build_with_restart(
                ref=application["image_reference"],
                command=(
                        cmd +
                        "docker tag {bazel_image} $EXPECTED_REF"
                ).format(image_target=image_target, bazel_image=bazel_image),
                deps=[binary_target_local] + application["dependencies"],
                entrypoint=binary_target_container,
                live_update=application["live_update"] + [
                    sync(binary_target_local, binary_target_container),
                ],
            )

            k8s_resource(item, resource_deps=[item + "-compile"])

        elif (application["type"] == "node"):
            cmd = "bazel run {image_target} -- --norun && "
            if application["docker_sandbox"] == "true":
               cmd = "bazel run --experimental_enable_docker_sandbox --experimental_docker_image=771779017151.dkr.ecr.us-east-1.amazonaws.com/ci@sha256:5403ce7233c8c6ab0057de063f35572ddf3e9eab313bfb72998aa1e9fd45bc63 --spawn_strategy=docker --strategy=Javac=docker --genrule_strategy=docker {image_target} -- --norun && "

            custom_build(
                ref=application["image_reference"],
                command=(
                        cmd +
                        "docker tag {bazel_image} $EXPECTED_REF"
                ).format(image_target=image_target, bazel_image=bazel_image),
                deps=application["dependencies"],
                entrypoint=application["entrypoint"],
                live_update=application["live_update"],
            )

            if "manual" in application and application["manual"]:
                k8s_resource(item, resource_deps=[], trigger_mode=TRIGGER_MODE_MANUAL, auto_init=False)
            else:
                k8s_resource(item, resource_deps=[])
