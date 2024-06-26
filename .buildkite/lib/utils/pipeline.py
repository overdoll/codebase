from . import format

DEFAULT_IMAGE = "771779017151.dkr.ecr.us-east-1.amazonaws.com/ci@sha256:b817981816a4e196909e72f9eb7b7463321be0ed3eb0b5f5593023c187e3b7d2"


def create_step(label, commands, platform, configs=None, artifacts=None, cache=None, additional_env_vars=None, shards=1,
                soft_fail=None, skip=None):
    if platform == "docker":
        step = create_docker_step(label, commands, additional_env_vars, cache)
    elif platform == "docker-compose":
        step = create_docker_compose_step(label, commands, additional_env_vars, configs, cache, skip)
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


def create_docker_step(label, commands, additional_env_vars=None, cache=None):
    vars = [
        "CONTAINER_REGISTRY",
        "DOCKER_CONFIG",
        "CODECOV_API_KEY",
        "BUILDKITE_COMMIT",
        "AWS_ACCESS_KEY",
        "AWS_ACCESS_SECRET",
        "AWS_ENDPOINT",
        "AWS_REGION",
        "FORCE_COLOR=1",
        "SENTRY_AUTH_TOKEN",
        "SENTRY_ORG",
        "STATIC_ASSETS_URL",
        "AWS_STATIC_ASSETS_BUCKET",
        "NEXT_PUBLIC_SENTRY_DSN",
        "NEXT_PUBLIC_POSTHOG_TRACKING_CODE",
        "NEXT_PUBLIC_POSTHOG_DOMAIN",
        "APOLLO_KEY",
    ]

    step = {
        "label": label,
        "command": commands,
        "agents": {"queue": "default"},
        "plugins": [
            {
                "docker#v3.5.0": {
                    "shell": ["/bin/bash", "-e", "-c"],
                    "environment": format.format_env_vars(additional_env_vars) + vars,
                    "image": DEFAULT_IMAGE,
                    "user": "root",
                    "propagate-aws-auth-tokens": True,
                    "network": "host",
                    "privileged": True,
                    "propagate-environment": True,
                    "volumes": [
                        "/etc/group:/etc/group:ro",
                        "/etc/passwd:/etc/passwd:ro",
                        "/opt:/opt:ro",
                        "/var/lib/buildkite-agent:/var/lib/buildkite-agent",
                        "/var/run/docker.sock:/var/run/docker.sock",
                        "/tmp:/tmp",
                    ],
                }

            },
        ],
    }

    if cache:
        step["plugins"] = step["plugins"] + cache

    return step


def create_docker_compose_step(label, commands, additional_env_vars=None, configs=None, cache=None, skip=None):
    vars = [
        "CCBILL_FLEXFORMS_URL",
        "CCBILL_SALT_KEY",
        "CCBILL_ACCOUNT_NUMBER",
        "CCBILL_SUB_ACCOUNT_NUMBER",
        "CCBILL_DATALINK_USERNAME",
        "CCBILL_DATALINK_PASSWORD",
        "AWS_PRIVATE_MEDIA_KEY_PAIR_ID",
        "AWS_PRIVATE_MEDIA_KEY_PAIR_PRIVATE_KEY",
        "BUILDKITE_JOB_ID",
        "BUILDKITE_BUILD_ID",
        "BUILDKITE_AGENT_ACCESS_TOKEN",
        "CONTAINER_REGISTRY",
        "BUILDKITE_BUILD_NUMBER",
        "CYPRESS_API_KEY",
        "CYPRESS_TESTMAIL_NAMESPACE",
        "CYPRESS_TESTMAIL_API_KEY",
        "TESTMAIL_NAMESPACE",
        "TESTMAIL_API_KEY",
        "CODECOV_API_KEY",
        "AWS_ACCESS_KEY",
        "AWS_ACCESS_SECRET",
        "AWS_ENDPOINT",
        "AWS_REGION",
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
        "CI",
        "FORCE_COLOR=1",
        "SENTRY_AUTH_TOKEN",
        "SENTRY_ORG",
        "STATIC_ASSETS_URL",
        "AWS_STATIC_ASSETS_BUCKET",
        "NEXT_PUBLIC_SENTRY_DSN",
        "NEXT_PUBLIC_POSTHOG_TRACKING_CODE",
        "NEXT_PUBLIC_POSTHOG_DOMAIN",
        "APOLLO_KEY"
    ]

    step = {
        "label": label,
        "command": commands,
        "agents": {"queue": "default"},
        "plugins": [
            {
                "docker-compose#v3.7.0": {
                    "shell": ["/bin/bash", "-e", "-c"],
                    "env": format.format_env_vars(additional_env_vars) + vars,
                    "run": "run",
                    "config": configs,
                    "workdir": "/workdir",
                    "skip-checkout": False,
                    "dependencies": True,
                    "build-parallel": True,
                    "upload-container-logs": "always",
                },
            }
        ],
    }

    if skip:
        step["if"] = skip

    if cache:
        step["plugins"] = step["plugins"] + cache

    return step
