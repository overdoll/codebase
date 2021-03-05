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
        "live_update": [],
    },
    "sting": {
        "type": "go",
        "image_reference": "sting-image",
        "image_target": "//applications/sting:sting-image",
        "binary_target": "//applications/sting:sting",
        "binary_output": "applications/sting/sting_/sting",
        "container_workdir": "/app/applications/sting/sting-image.binary.runfiles/overdoll/",
        "container_binary": "applications/sting/sting-image.binary_/sting-image.binary",
        "bazel_image": "bazel/applications/sting:sting-image",
        "dependencies": [
            "applications/sting/.env",
            "applications/sting/migrations",
        ],
        "live_update": [],
    },
    "pox": {
        "type": "go",
        "image_reference": "pox-image",
        "image_target": "//applications/pox:pox-image",
        "binary_target": "//applications/pox:pox",
        "binary_output": "applications/pox/pox_/pox",
        "container_workdir": "/app/applications/pox/pox-image.binary.runfiles/overdoll/",
        "container_binary": "applications/pox/pox-image.binary_/pox-image.binary",
        "bazel_image": "bazel/applications/pox:pox-image",
        "dependencies": [
            "applications/pox/.env",
        ],
        "live_update": [],
    },
    "buffer": {
        "type": "go",
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

# Ingress (Traefik)
k8s_yaml("development/traefik/ingress.yaml")

# Build applications with our helper function
build_applications(applications, [])

# GraphQL generator
local_resource(
    "generate-graphql",
    cmd = "NODE_TLS_REJECT_UNAUTHORIZED=0 yarn run graphql",
    trigger_mode = TRIGGER_MODE_MANUAL,
    auto_init = False,
)

# Relay Compiler
local_resource("relay-compiler", serve_cmd = "yarn run relay")
