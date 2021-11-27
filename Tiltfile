load("./development/helpers.Tiltfile", "bazel_buildfile_deps", "bazel_sourcefile_deps", "build_applications")

applications = {
    "eva": {
        "type": "go",
        "directory": "eva",
        "image_reference": "eva-image",
        "image_target": "//applications/eva/internal:local-image",
        "binary_target": "//applications/eva/internal:internal",
        "binary_output": "applications/eva/internal/internal_/internal",
        "container_workdir": "/app/applications/eva/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/eva/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/eva/internal:local-image",
        "dependencies": [
            "applications/eva/.env",
            "applications/eva/config.toml",
            "applications/eva/database",
        ],
        "live_update": [
            sync("applications/eva/database", "/app/applications/eva/internal/local-image.binary.runfiles/overdoll/applications/eva/database"),
            sync("applications/eva/config.toml", "/app/applications/eva/internal/local-image.binary.runfiles/overdoll/applications/eva/config.toml"),
            sync("applications/eva/.env", "/app/applications/eva/internal/local-image.binary.runfiles/overdoll/applications/eva/.env"),
        ],
    },
    "sting": {
        "type": "go",
        "directory": "sting",
        "image_reference": "sting-image",
        "image_target": "//applications/sting/internal:local-image",
        "binary_target": "//applications/sting/internal:internal",
        "binary_output": "applications/sting/internal/internal_/internal",
        "container_workdir": "/app/applications/sting/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/sting/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/sting/internal:local-image",
        "dependencies": [
            "applications/sting/.env",
            "applications/sting/config.toml",
            "applications/sting/database",
        ],
        "live_update": [
            sync("applications/sting/.env", "/app/applications/sting/internal/local-image.binary.runfiles/overdoll/applications/sting/.env"),
            sync("applications/sting/config.toml", "/app/applications/sting/internal/local-image.binary.runfiles/overdoll/applications/sting/config.toml"),
            sync("applications/sting/database", "/app/applications/sting/internal/local-image.binary.runfiles/overdoll/applications/sting/database"),
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
    "puppy": {
        "type": "go",
        "directory": "puppy",
        "image_reference": "puppy-image",
        "image_target": "//applications/puppy/internal:local-image",
        "binary_target": "//applications/puppy/internal:internal",
        "binary_output": "applications/puppy/internal/internal_/internal",
        "container_workdir": "/app/applications/puppy/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/puppy/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/puppy/internal:local-image",
        "dependencies": [
            "applications/puppy/.env",
            "applications/puppy/config.toml",
        ],
        "live_update": [
            sync("applications/puppy/.env", "/app/applications/puppy/internal/local-image.binary.runfiles/overdoll/applications/puppy/.env"),
            sync("applications/puppy/config.toml", "/app/applications/puppy/internal/local-image.binary.runfiles/overdoll/applications/puppy/config.toml"),
        ],
    },
}

k8s_yaml("./development/traefik/ingress.yaml")

# Build applications with our helper function
build_applications(applications, [])
