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
