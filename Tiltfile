load("./development/helpers.Tiltfile", "bazel_buildfile_deps", "bazel_sourcefile_deps", "build_applications")
load("ext://restart_process", "custom_build_with_restart")

config.define_string_list("to-run", args=True)
cfg = config.parse()
resources = {}
to_run = cfg.get('to-run', [])
is_raw = len(to_run) == 0

applications = {}

if "ringer" in to_run or is_raw:
    applications["ringer"] = {
        "type": "go",
        "directory": "ringer",
        "image_reference": "ringer-image",
        "image_target": "//applications/ringer/internal:local-image",
        "binary_target": "//applications/ringer/internal:internal",
        "binary_output": "applications/ringer/internal/internal_/internal",
        "container_workdir": "/app/applications/ringer/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/ringer/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/ringer/internal:local-image",
        "dependencies": [
            "applications/ringer/.env",
            "applications/ringer/config.toml",
            "applications/ringer/database",
        ],
        "live_update": [
            sync("applications/ringer/.env", "/app/applications/ringer/internal/local-image.binary.runfiles/overdoll/applications/ringer/.env"),
            sync("applications/ringer/config.toml", "/app/applications/ringer/internal/local-image.binary.runfiles/overdoll/applications/ringer/config.toml"),
            sync("applications/ringer/database", "/app/applications/ringer/internal/local-image.binary.runfiles/overdoll/applications/ringer/database"),
        ],
    }

if "orca" in to_run or is_raw:
    applications["orca"] = {
        "type": "node",
        "directory": "orca",
        "image_reference": "orca-image",
        "image_target": "//applications/orca:local-image",
        "bazel_image": "bazel/applications/orca:local-image",
        "container_workdir": "",
        "container_binary": "",
        "entrypoint": "/app/applications/orca/local-image_binary",
        "dependencies": [
            "applications/orca/apollo-gateway.ts",
            "applications/orca/.env",
        ],
        "live_update": [],
    }

if "hades" in to_run or is_raw:
    applications["hades"] = {
        "type": "go",
        "directory": "hades",
        "image_reference": "hades-image",
        "image_target": "//applications/hades/internal:local-image",
        "binary_target": "//applications/hades/internal:internal",
        "binary_output": "applications/hades/internal/internal_/internal",
        "container_workdir": "/app/applications/hades/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/hades/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/hades/internal:local-image",
        "dependencies": [
            "applications/hades/.env",
            "applications/hades/config.toml",
            "applications/hades/database",
        ],
        "live_update": [
            sync("applications/hades/.env", "/app/applications/hades/internal/local-image.binary.runfiles/overdoll/applications/hades/.env"),
            sync("applications/hades/config.toml", "/app/applications/hades/internal/local-image.binary.runfiles/overdoll/applications/hades/config.toml"),
            sync("applications/hades/database", "/app/applications/hades/internal/local-image.binary.runfiles/overdoll/applications/hades/database"),
        ],
    }

if "loader" in to_run or is_raw:
    applications["loader"] = {
        "type": "go",
        "directory": "loader",
        "image_reference": "loader-image",
        "image_target": "//applications/loader/internal:local-image",
        "binary_target": "//applications/loader/internal:internal",
        "binary_output": "applications/loader/internal/internal_/internal",
        "container_workdir": "/app/applications/loader/internal/local-image.binary.runfiles/overdoll/",
        "container_binary": "applications/loader/internal/local-image.binary_/local-image.binary",
        "bazel_image": "bazel/applications/loader/internal:local-image",
        "dependencies": [
            "applications/loader/.env",
            "applications/loader/config.toml",
            "applications/loader/database",
        ],
        "live_update": [
            sync("applications/loader/.env", "/app/applications/loader/internal/local-image.binary.runfiles/overdoll/applications/loader/.env"),
            sync("applications/loader/config.toml", "/app/applications/loader/internal/local-image.binary.runfiles/overdoll/applications/loader/config.toml"),
            sync("applications/loader/database", "/app/applications/loader/internal/local-image.binary.runfiles/overdoll/applications/loader/database"),
        ],
    }

if "puppy" in to_run or is_raw:
   applications["puppy"] = {
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
        ],
        "live_update": [
            sync("applications/puppy/.env", "/app/applications/puppy/internal/local-image.binary.runfiles/overdoll/applications/puppy/.env"),
        ],
   }

if "parley" in to_run or is_raw:
   applications["parley"] = {
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
   }

if "carrier" in to_run or is_raw:
    applications["carrier"] = {
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
    }

if "sting" in to_run or is_raw:
    applications["sting"] = {
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
    }

if "eva" in to_run or is_raw:
    applications["eva"] = {
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
    }

build_applications(applications, [])
