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
    "indigo": {
        "type": "go",
        "directory": "indigo",
        "image_reference": "indigo-image",
        "image_target": "//applications/indigo:indigo-image",
        "binary_target": "//applications/indigo:indigo",
        "binary_output": "applications/indigo/indigo_/indigo",
        "container_workdir": "/app/applications/indigo/indigo-image.binary.runfiles/overdoll/",
        "container_binary": "applications/indigo/indigo-image.binary_/indigo-image.binary",
        "bazel_image": "bazel/applications/indigo:indigo-image",
        "dependencies": [
            "applications/indigo/.env",
        ],
        "live_update": [],
    },
    "pox": {
        "type": "go",
        "directory": "pox",
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
    "medusa-production": {
        "type": "node",
        "directory": "medusa",
        "manual": True,
        "image_reference": "medusa-production-image",
        "image_target": "//applications/medusa:medusa-production-image",
        "binary_target": "//applications/medusa:medusa-production",
        "binary_output": "applications/medusa/medusa-production_/medusa-production",
        "container_workdir": "/app/applications/medusa-production/medusa-production-image.binary.runfiles/overdoll/",
        "container_binary": "applications/medusa-production/medusa-production-image.binary_/medusa-production-image.binary",
        "bazel_image": "bazel/applications/medusa:medusa-production-image",
        "entrypoint": "/app/applications/medusa/medusa-production",
        "dependencies": [],
        "live_update": [],
    },
}

# Ingress (Traefik)
k8s_yaml("development/traefik/ingress.yaml")

# Build applications with our helper function
build_applications(applications, [])
