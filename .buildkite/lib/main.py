#!/usr/bin/env python3.6
# a stolen copy of https://github.com/bazelbuild/continuous-integration/blob/master/buildkite/bazelci.py
# modified for us

import argparse
import glob
import os
import random
import shutil
import sys
import tempfile
import threading

import utils.bazel as bazel
import utils.exception as exception
import utils.flags as flags
import utils.terminal_print as terminal_print
import utils.test_logs as test_logs
import yaml

random.seed()


class YamlReaderError(Exception):
    pass


def data_merge(a, b):
    """merges b into a and return merged result

    NOTE: tuples and arbitrary objects are not handled as it is totally ambiguous what should happen"""
    key = None
    # ## debug output
    # sys.stderr.write("DEBUG: %s to %s\n" %(b,a))
    try:
        if a is None or isinstance(a, str) or isinstance(a, int) or isinstance(a, float):
            # border case for first run or if a is a primitive
            a = b
        elif isinstance(a, list):
            # lists can be only appended
            if isinstance(b, list):
                # merge lists
                a.extend(b)
            else:
                # append to list
                a.append(b)
        elif isinstance(a, dict):
            # dicts must be merged
            if isinstance(b, dict):
                for key in b:
                    if key in a:
                        a[key] = data_merge(a[key], b[key])
                    else:
                        a[key] = b[key]
            else:
                raise YamlReaderError('Cannot merge non-dict "%s" into dict "%s"' % (b, a))
        else:
            raise YamlReaderError('NOT IMPLEMENTED "%s" into "%s"' % (b, a))
    except TypeError as e:
        raise YamlReaderError('TypeError "%s" in key "%s" when merging "%s" into "%s"' % (e, key, b, a))
    return a


def load_configs():
    config = dict()

    # Load each pipeline.yaml, and merge them into a dict
    for filename in glob.iglob('./applications/**/pipeline.yaml', recursive=True):
        if os.path.isfile(filename):
            with open(filename, "r") as fd:
                config = data_merge(config, yaml.safe_load(fd))

    return config


def create_step(label, commands, platform, configs=None, additional_env_vars=None, shards=1, soft_fail=None):
    if platform == "docker":
        step = create_docker_step(label, commands, additional_env_vars)
    elif platform == "docker-compose":
        step = create_docker_compose_step(label, commands, additional_env_vars, configs)
    else:
        step = {
            "label": label,
            "command": commands,
            "agents": {"queue": "default"},
        }

    if shards > 1:
        step["label"] += " (shard %n)"
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


def format_env_vars(variables):
    if variables:
        return ["{}={}".format(k, v) for k, v in variables.items()]
    return []


def create_docker_step(label, commands, additional_env_vars=None):
    return {
        "label": label,
        "command": commands,
        "agents": {"queue": "default"},
        "plugins": {
            "docker#v3.5.0": {
                "always-pull": True,
                "environment": format_env_vars(additional_env_vars),
                "image": "gcr.io/bazel-public/ubuntu1804-java11",
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
                ],
            }
        },
    }


def create_docker_compose_step(label, commands, additional_env_vars=None, configs=None):
    return {
        "label": label,
        "command": commands,
        "agents": {"queue": "default"},
        "plugins": {
            "docker-compose#v3.7.0": {
                "env": format_env_vars(additional_env_vars),
                "run": "run",
                "config": configs,
            }
        },
    }


def print_project_pipeline():
    pipeline_steps = []

    configs = load_configs()

    steps = configs.get("steps", None)
    if not steps:
        raise exception.BuildkiteException("pipeline configuration is empty")

    build = steps.get("build", None)
    if not build:
        raise exception.BuildkiteException("build step is empty")

    pipeline_steps.append(
        create_step(
            label=":bazel: Build & Unit Test",
            commands=[".buildkite/pipeline.sh build"],
            # Run tests inside of a docker container
            platform="docker",
        )
    )

    # unit tests + build must complete first before integration tests && e2e tests start
    pipeline_steps.append("wait")

    integration = steps.get("integration_test", None)
    if not integration:
        raise exception.BuildkiteException("integration step is empty")

    pipeline_steps.append(
        create_step(
            label=":test_tube: Integration Test",
            commands=[".buildkite/pipeline.sh integration_test"],
            platform="docker-compose",
            # Include docker-compose configs from all configurations, plus our custom one - the container in which the
            # integration tests will actually be ran
            configs=integration.get("setup", {}).get("dockerfile", []) + [
                "./.buildkite/config/docker/docker-compose.integration.yaml"]
        )
    )

    e2e = steps.get("e2e_test", None)
    if not e2e:
        raise exception.BuildkiteException("e2e step is empty")

    pipeline_steps.append(
        create_step(
            label=":cypress: E2E Test",
            # grab commands to run inside of our container (it will be medusa)
            commands=e2e.get("commands"),
            platform="docker-compose",
            configs=e2e.get("setup", {}).get("dockerfile", []) + [
                "./.buildkite/config/docker/docker-compose.e2e.yaml"]
        )
    )

    # TODO: a publish step for publishing images to a production repo

    print(yaml.dump({"steps": pipeline_steps}))


# execute commands to run integration tests
def execute_integration_tests_commands(configs):
    tmpdir = tempfile.mkdtemp()

    try:
        test_env_vars = ["HOME"]

        test_flags, json_profile_out_test = flags.calculate_flags(
            "test_flags", "test", tmpdir, test_env_vars
        )

        test_bep_file = os.path.join(tmpdir, "test_bep.json")
        stop_request = threading.Event()
        upload_thread = threading.Thread(
            target=test_logs.upload_test_logs_from_bep, args=(test_bep_file, tmpdir, stop_request)
        )

        # add user-defined environment variables
        test_flags += ["--test_env={}".format(
            format_env_vars(configs.get("integration_test", {}).get("config", {}).get("env", {})))]

        try:
            upload_thread.start()
            test_targets = configs.get("integration_test", {}).get("targets", [])

            # integration test MAY be flaky because of external dependencies, so we will attempt retries
            test_flags += ["--flaky_test_attempts=3"]
            bazel.execute_bazel_test(":bazel: Running integration tests", test_flags, test_targets, test_bep_file, [])
        finally:
            stop_request.set()
            upload_thread.join()

    finally:
        if tmpdir:
            shutil.rmtree(tmpdir)


# Execute commands to build binaries, & unit test them
def execute_build_commands(configs):
    tmpdir = tempfile.mkdtemp()

    try:
        test_env_vars = ["HOME", "BUILDKITE_COMMIT", "CONTAINER_REGISTRY"]

        build_flags, json_profile_out_build = flags.calculate_flags(
            "build_flags", "build", tmpdir, test_env_vars
        )

        build_targets = configs.get("build", {}).get("targets", [])

        bazel.execute_bazel_build(":bazel: Building applications", build_flags, build_targets, None, [])

        test_flags, json_profile_out_test = flags.calculate_flags(
            "test_flags", "test", tmpdir, test_env_vars
        )

        test_bep_file = os.path.join(tmpdir, "test_bep.json")
        stop_request = threading.Event()
        upload_thread = threading.Thread(
            target=test_logs.upload_test_logs_from_bep, args=(test_bep_file, tmpdir, stop_request)
        )

        try:
            upload_thread.start()
            test_targets = configs.get("unit_test", {}).get("targets", [])

            # unit tests are not flaky
            test_flags += ["--flaky_test_attempts=default"]
            bazel.execute_bazel_test(":bazel: Running unit tests", test_flags, test_targets, test_bep_file, [])
        finally:
            stop_request.set()
            upload_thread.join()

        run_flags, json_profile_out_test = flags.calculate_flags(
            "run_flags", "run", tmpdir, test_env_vars
        )

        docker_targets = configs.get("push_image", {}).get("targets", [])

        # flags that will allow the image to be pushed
        run_flags += ["--define=CONTAINER_TAG={}".format(os.getenv("BUILDKITE_COMMIT", "")),
                      "--define=CONTAINER_REGISTRY={}".format(os.getenv("CONTAINER_REGISTRY", ""))]

        for img in docker_targets:
            bazel.execute_bazel_run(":docker: Pushing docker image {}".format(img), run_flags, img, [])

    finally:
        if tmpdir:
            shutil.rmtree(tmpdir)


def main(argv=None):
    if argv is None:
        argv = sys.argv[1:]

    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest="subparsers_name")
    subparsers.add_parser("build")
    subparsers.add_parser("integration_test")
    subparsers.add_parser("project_pipeline")

    args = parser.parse_args(argv)

    try:
        configs = load_configs().get("steps", {})

        if args.subparsers_name == "build":
            execute_build_commands(configs)
        elif args.subparsers_name == "integration_test":
            execute_integration_tests_commands(configs)
        elif args.subparsers_name == "project_pipeline":
            print_project_pipeline()

    except exception.BuildkiteException as e:
        terminal_print.eprint(str(e))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
