load("./development/helpers.Tiltfile", "bazel_buildfile_deps", "bazel_sourcefile_deps", "build_applications")

applications = {
    "eva": {
        "type": "go",
        "directory": "eva",
        "image_reference": "eva-image",
        "image_target": "//applications/eva:local-image",
        "binary_target": "//applications/eva:eva",
        "binary_output": "applications/eva/eva_/eva",
        "container_workdir": "/app/applications/eva/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/eva/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/eva:local-image",
        "dependencies": [
            "applications/eva/.env",
            "applications/eva/config.toml",
            "applications/eva/database",
        ],
        "live_update": [
            sync("applications/eva/database", "/app/applications/eva/local-image.binary.runfiles/overdoll/applications/eva/database"),
            sync("applications/eva/config.toml", "/app/applications/eva/local-image.binary.runfiles/overdoll/applications/eva/config.toml"),
            sync("applications/eva/.env", "/app/applications/eva/local-image.binary.runfiles/overdoll/applications/eva/.env"),
        ],
    },
    "sting": {
        "type": "go",
        "directory": "sting",
        "image_reference": "sting-image",
        "image_target": "//applications/sting:local-image",
        "binary_target": "//applications/sting:sting",
        "binary_output": "applications/sting/sting_/sting",
        "container_workdir": "/app/applications/sting/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/sting/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/sting:local-image",
        "dependencies": [
            "applications/sting/.env",
            "applications/sting/config.toml",
            "applications/sting/database",
        ],
        "live_update": [
            sync("applications/sting/.env", "/app/applications/sting/local-image.binary.runfiles/overdoll/applications/sting/.env"),
            sync("applications/sting/config.toml", "/app/applications/sting/local-image.binary.runfiles/overdoll/applications/sting/config.toml"),
            sync("applications/sting/database", "/app/applications/sting/local-image.binary.runfiles/overdoll/applications/sting/database"),
        ],
    },
    "buffer": {
        "type": "go",
        "directory": "buffer",
        "image_reference": "buffer-image",
        "image_target": "//applications/buffer:local-image",
        "binary_target": "//applications/buffer:buffer",
        "binary_output": "applications/buffer/buffer_/buffer",
        "container_workdir": "/app/applications/buffer/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/buffer/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/buffer:local-image",
        "dependencies": [
            "applications/buffer/.env",
        ],
        "live_update": [],
    },
}

k8s_yaml("./development/traefik/ingress.yaml")

# Build applications with our helper function
build_applications(applications, [])
