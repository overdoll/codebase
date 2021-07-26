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
        "image_target": "//applications/buffer/internal:local-image",
        "binary_target": "//applications/buffer/internal:internal",
        "binary_output": "applications/buffer/internal/internal_/internal",
        "container_workdir": "/app/applications/buffer/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/buffer/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/buffer/internal:local-image",
        "dependencies": [
            "applications/buffer/.env",
        ],
        "live_update": [
            sync("applications/buffer/.env", "/app/applications/buffer/internal/local-image.binary.runfiles/overdoll/applications/buffer/.env"),
        ],
    },
    "carrier": {
        "type": "go",
        "directory": "carrier",
        "image_reference": "carrier-image",
        "image_target": "//applications/carrier/internal:local-image",
        "binary_target": "//applications/carrier/internal:internal",
        "binary_output": "applications/carrier/internal/internal_/internal",
        "container_workdir": "/app/applications/carrier/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/carrier/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/carrier/internal:local-image",
        "dependencies": [
            "applications/carrier/.env",
        ],
        "live_update": [
            sync("applications/carrier/.env", "/app/applications/carrier/internal/local-image.binary.runfiles/overdoll/applications/carrier/.env"),
        ],
    },
    "parley": {
        "type": "go",
        "directory": "parley",
        "image_reference": "parley-image",
        "image_target": "//applications/parley/internal:local-image",
        "binary_target": "//applications/parley/internal:internal",
        "binary_output": "applications/parley/internal/internal_/internal",
        "container_workdir": "/app/applications/parley/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/parley/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/parley/internal:local-image",
        "dependencies": [
            "applications/parley/.env",
            "applications/parley/config.toml",
            "applications/parley/database",
        ],
        "live_update": [
            sync("applications/parley/.env", "/app/applications/parley/internal/local-image.binary.runfiles/overdoll/applications/parley/.env"),
            sync("applications/parley/config.toml", "/app/applications/parley/internal/local-image.binary.runfiles/overdoll/applications/parley/config.toml"),
            sync("applications/parley/database", "/app/applications/parley/internal/local-image.binary.runfiles/overdoll/applications/parley/database"),
        ],
    },
}

k8s_yaml("./development/traefik/ingress.yaml")

# Build applications with our helper function
build_applications(applications, [])
