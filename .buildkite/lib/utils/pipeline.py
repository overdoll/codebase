from . import format

DEFAULT_IMAGE = "gcr.io/bazel-public/ubuntu1804-java11@sha256:54af0180aaa595b2a10edce51e3ec71923b2e21c3964ffc0938c6f599f0b35e3"


def create_step(label, commands, platform, configs=None, artifacts=None, cache=True, additional_env_vars=None, shards=1,
                soft_fail=None):
    if platform == "docker":
        step = create_docker_step(label, commands, additional_env_vars)
    elif platform == "docker-compose":
        step = create_docker_compose_step(label, commands, additional_env_vars, configs, cache)
    else:
        step = {
            "label": label,
            "command": commands,
            "agents": {"queue": "default"},
        }

    if artifacts:
        step["artifact_paths"] = artifacts

    if shards > 1:
        step["parallelism"] = shards

    if soft_fail is not None:
        step["soft_fail"] = soft_fail

    # Enforce a global 8 hour job timeout.
    step["timeout_in_minutes"] = 8 * 60

    # Automatically retry when an agent got lost (usually due to an infra flake).
    step["retry"] = {
        "automatic": [
            {"exit_status": -1, "limit": 3},  # Buildkite internal "agent lost" exit code
            {"exit_status": 137, "limit": 3},  # SIGKILL
            {"exit_status": 143, "limit": 3},  # SIGTERM
        ]
    }

    return step


def get_cache_plugin():
    return {
        "id": "node",
        "backend": "s3",
        "key": "v1-cache-{{ id }}-{{ runner.os }}-{{ checksum 'yarn.lock' }}",
        "restore-keys": [
            "v1-cache-{{ id }}-{{ runner.os }}-",
            "v1-cache-{{ id }}-",
        ],
        "compress": "true",
        "paths": [
            "node_modules"
        ],
        "s3": {
            "bucket": "buildkite-runner-cache"
        },
    }


def create_docker_step(label, commands, additional_env_vars=None):
    vars = [
        "CONTAINER_REGISTRY",
        "DOCKER_CONFIG",
        "CODECOV_API_KEY",
    ]

    step = {
        "label": label,
        "command": commands,
        "agents": {"queue": "default"},
        "plugins": {
            "gencer/cache#v2.4.8": get_cache_plugin(),
            "docker#v3.5.0": {
                "always-pull": True,
                "environment": format.format_env_vars(additional_env_vars) + vars,
                "image": DEFAULT_IMAGE,
                "network": "host",
                "privileged": True,
                "propagate-environment": True,
                "propagate-uid-gid": True,
                "volumes": [
                    "/etc/group:/etc/group:ro",
                    "/etc/passwd:/etc/passwd:ro",
                    "/opt:/opt:ro",
                    "/var/lib/buildkite-agent:/var/lib/buildkite-agent",
                    "/var/run/docker.sock:/var/run/docker.sock",
                    "/tmp:/tmp",
                ],
            },
        },
    }

    return step


def create_docker_compose_step(label, commands, additional_env_vars=None, configs=None, cache=True):
    vars = [
        "BUILDKITE_JOB_ID",
        "BUILDKITE_BUILD_ID",
        "BUILDKITE_AGENT_ACCESS_TOKEN",
        "CONTAINER_REGISTRY",
        "BUILDKITE_BUILD_NUMBER",
        "CYPRESS_API_KEY",
        "CODECOV_API_KEY",
        "DOCKER_CONFIG",
        "BUILDKITE_BRANCH",
        "BUILDKITE_COMMAND",
        "BUILDKITE_MESSAGE",
        "BUILDKITE_AGENT_META_DATA_AWS_AMI_ID",
        "BUILDKITE_AGENT_META_DATA_DOCKER",
        "BUILDKITE_STEP_KEY",
        "BUILDKITE_STEP_ID",
        "BUILDKITE_LABEL",
        "BUILDKITE_PIPELINE_PROVIDER",
        "BUILDKITE_SCRIPT_PATH",
        "BUILDKITE_TRIGGERED_FROM_BUILD_ID",
        "BUILDKITE_AGENT_NAME",
        "BUILDKITE_REPO",
        "BUILDKITE",
        "BUILDKITE_BUILD_URL",
        "BUILDKITE_TAG",
        "BUILDKITE_PIPELINE_SLUG",
        "BUILDKITE_ORGANIZATION_SLUG",
        "BUILDKITE_SOURCE",
        "BUILDKITE_PIPELINE_ID",
        "BUILDKITE_PULL_REQUEST_REPO",
        "BUILDKITE_PIPELINE_DEFAULT_BRANCH",
        "BUILDKITE_PROJECT_SLUG",
        "BUILDKITE_PROJECT_PROVIDER",
        "BUILDKITE_BUILD_CREATOR_EMAIL",
        "BUILDKITE_PULL_REQUEST_BASE_BRANCH",
        "BUILDKITE_COMMIT",
        "BUILDKITE_BUILD_AUTHOR",
        "BUILDKITE_PULL_REQUEST",
        "BUILDKITE_AGENT_ID",
        "CI"
    ]

    step = {
        "label": label,
        "command": commands,
        "agents": {"queue": "default"},
        "plugins": {
            "docker-compose#v3.7.0": {
                "env": format.format_env_vars(additional_env_vars) + vars,
                "run": "run",
                "config": configs,
                "workdir": "/workdir",
                "skip-checkout": False,
                "dependencies": True,
                "build-parallel": True,
                "upload-container-logs": "always",
            },
        },
    }

    if cache:
        step["plugins"]["gencer/cache#v2.4.8"] = get_cache_plugin()

    return step
