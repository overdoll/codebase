#!/usr/bin/env python3
# a stolen copy of https://github.com/bazelbuild/continuous-integration/blob/master/buildkite/bazelci.py
# modified for us

import argparse
import glob
import os
import random
import shutil
import stat
import tempfile
import threading
import urllib.request

import sys
import yaml

import utils.bazel as bazel
import utils.exception as exception
import utils.exec as exec
import utils.flags as flags
import utils.format as format
import utils.network as network
import utils.parse_config as parse_config
import utils.pipeline as pipeline
import utils.terminal_print as terminal_print
import utils.test_logs as test_logs

random.seed()


def wait_for_network_dependencies(targets):
    for connection in targets:
        host = connection["host"]
        port = connection["port"]

        terminal_print.print_collapsed_group(":suspect: Waiting for {}:{} to be available".format(host, port))
        network.wait_for_port(host, port, 120)


# execute commands to run integration tests
def execute_integration_tests_commands(configs):
    wait_for_network_dependencies(configs.get("integration_test", {}).get("network_dependencies", []))

    tmpdir = tempfile.mkdtemp()

    try:
        test_env_vars = ["HOME"]

        test_flags, json_profile_out_test = flags.calculate_flags(
            "test_flags", "test", tmpdir, test_env_vars
        )

        test_bep_file = os.path.join(tmpdir, "test_bep.json")
        stop_request = threading.Event()
        upload_thread = threading.Thread(
            target=test_logs.upload_test_logs_from_bep, args=(test_bep_file, stop_request)
        )

        additional_test_env = format.format_env_vars(
            configs.get("integration_test", {}).get("setup", {}).get("env", {}))

        for env in additional_test_env:
            test_flags += ["--test_env={}".format(env)]

        try:
            upload_thread.start()
            test_targets = configs.get("integration_test", {}).get("targets", [])

            # integration test MAY be flaky because of external dependencies, so we will attempt retries
            test_flags += ["--flaky_test_attempts=default"]

            try:
                bazel.execute_bazel_test(":bazel: Running integration tests", test_flags, test_targets, test_bep_file,
                                         [])
            finally:
                upload_execution_artifacts(json_profile_out_test, tmpdir, test_bep_file)

        finally:
            stop_request.set()
            upload_thread.join()

        execute_coverage_command(configs.get("integration_test", {}).get("coverage", []))

    finally:
        if tmpdir:
            shutil.rmtree(tmpdir)


def execute_coverage_command(configs):
    urllib.request.urlretrieve("https://uploader.codecov.io/latest/linux/codecov", "codecov")
    st = os.stat('codecov')
    os.chmod('codecov', st.st_mode | stat.S_IEXEC)

    coverage_flags = dict()

    # grab all files, group by "name", and get all files matching the glob pattern
    for target in configs:

        files = []

        for file in target["paths"]:
            # use glob matching
            files.extend(glob.glob(file, recursive=True))

        flag = target["name"]

        if target["name"] not in coverage_flags:
            if len(files) > 0:
                coverage_flags[flag] = files
        else:
            coverage_flags[flag].extend(files)

    for flag in coverage_flags:

        cmd = ["./codecov", "-t", os.getenv("CODECOV_API_KEY", ""), "-F", flag]

        # add each file
        for file in coverage_flags[flag]:
            cmd.extend(["-f", file])

        terminal_print.print_collapsed_group(":codecov: Uploading code coverage for {}".format(flag))

        exec.execute_command(cmd)


def execute_e2e_tests_commands(configs):
    # grab all network deps (these services need to be running first),
    # and sort by priority (some services need to be started first)
    deps = sorted(configs.get("e2e_test", {}).get("network_dependencies", []), key=lambda k: k['priority'])

    wait_for_network_dependencies(deps)

    cwd = os.getcwd()

    # need to be in the correct directory
    os.chdir('./applications/medusa')

    terminal_print.print_expanded_group(":cypress: Running test suite")

    exec.execute_command([
        "cypress",
        "run",
        "--config-file=cypress.ci.json",
        "--record",
        "--parallel",
        "--key={}".format(os.getenv("CYPRESS_API_KEY")),
        "--ci-build-id={}".format(os.getenv("BUILDKITE_BUILD_ID")),
    ])

    os.chdir(cwd)

    execute_coverage_command(configs.get("e2e_test", {}).get("coverage", []))


def upload_execution_artifacts(json_profile_path, tmpdir, json_bep_file=None, ):
    terminal_print.print_collapsed_group(":speedboat: Uploading Execution Profile")

    if os.path.exists(json_profile_path):
        exec.execute_command(["buildkite-agent", "artifact", "upload", json_profile_path], cwd=tmpdir)

    if json_bep_file and os.path.exists(json_bep_file):
        exec.execute_command(["buildkite-agent", "artifact", "upload", json_bep_file], cwd=tmpdir)


def execute_build_commands_custom(configs):
    commands = configs.get("build", {}).get("commands", [])

    terminal_print.print_expanded_group(":lua: Executing custom commands")

    for i in commands:
        exec.execute_command([i])


def execute_build_commands(configs):
    tmpdir = tempfile.mkdtemp()

    try:
        test_env_vars = ["HOME"]

        build_flags, json_profile_out_build = flags.calculate_flags(
            "build_flags", "build", tmpdir, test_env_vars
        )

        build_targets = configs.get("build", {}).get("targets", [])

        try:
            bazel.execute_bazel_build(":bazel: Building applications", build_flags, build_targets, None, [])
        finally:
            upload_execution_artifacts(json_profile_out_build, tmpdir)

        test_flags, json_profile_out_test = flags.calculate_flags(
            "test_flags", "test", tmpdir, test_env_vars
        )

        test_bep_file = os.path.join(tmpdir, "test_bep.json")
        stop_request = threading.Event()
        upload_thread = threading.Thread(
            target=test_logs.upload_test_logs_from_bep, args=(test_bep_file, stop_request)
        )

        try:
            upload_thread.start()
            test_targets = configs.get("unit_test", {}).get("targets", [])

            # unit tests are not flaky
            test_flags += ["--flaky_test_attempts=default"]

            try:
                bazel.execute_bazel_test(":bazel: Running unit tests", test_flags, test_targets, test_bep_file, [])
            finally:
                upload_execution_artifacts(json_profile_out_test, tmpdir, test_bep_file)

        finally:
            stop_request.set()
            upload_thread.join()

        # We execute our coverage config in tmpdir because that's where the bazel coverage results are stored
        execute_coverage_command(configs.get("unit_test", {}).get("coverage", []))

        push_images(configs.get("push_image", {}).get("targets", []), tmpdir)

    finally:
        if tmpdir:
            shutil.rmtree(tmpdir)


def print_project_pipeline():
    pipeline_steps = []

    configs = parse_config.load_configs()

    steps = configs.get("steps", None)
    if not steps:
        raise exception.BuildkiteException("pipeline configuration is empty")

    build = steps.get("build", None)
    if not build:
        raise exception.BuildkiteException("build step is empty")

    pipeline_steps.append(
        pipeline.create_step(
            label=":bazel: Build & Unit Test",
            commands=[".buildkite/pipeline.sh build"],
            # Run tests inside of a docker container
            platform="docker",
            cache=True,
        )
    )

    # unit tests + build must complete first before integration tests
    pipeline_steps.append("wait")

    default_docker_compose = ["./.buildkite/config/docker-compose.yaml"]

    integration = steps.get("integration_test", None)
    if not integration:
        raise exception.BuildkiteException("integration step is empty")

    pipeline_steps.append(
        pipeline.create_step(
            label=":test_tube: Integration Test",
            commands=[".buildkite/pipeline.sh integration_test"],
            platform="docker-compose",
            # No cache for int tests - these dont include FE tests
            cache=False,
            # Include docker-compose configs from all configurations, plus our custom one - the container in which the
            # integration tests will actually be ran
            configs=default_docker_compose + integration.get("setup", {}).get("dockerfile", []) + [
                "./.buildkite/config/docker/docker-compose.integration.yaml"]
        )
    )

    e2e = steps.get("e2e_test", None)
    if not e2e:
        raise exception.BuildkiteException("e2e step is empty")

    # Integration tests should be ran first - they will ensure the backend works as expected before proceeding with the
    # front-end
    pipeline_steps.append("wait")

    pipeline_steps.append(
        pipeline.create_step(
            label=':cypress: :chromium: End-to-End Test',
            # grab commands to run inside of our container (it will be medusa)
            commands=[".buildkite/pipeline.sh e2e_test"],
            # E2E tests dont require node-modules cache (our image is preinstalled with everything required)
            cache=True,
            shards=1,
            platform="docker-compose",
            artifacts=e2e.get("artifacts", []),
            configs=default_docker_compose + e2e.get("setup", {}).get("dockerfile", []) + [
                "./.buildkite/config/docker/docker-compose.e2e.yaml"]
        )
    )

    # publish when the branch is master
    if os.getenv("BUILDKITE_BRANCH") == "master":
        pipeline_steps.append("wait")

        # must complete all steps before publishing
        pipeline_steps.append(
            pipeline.create_step(
                label=":aws: Publish Images",
                commands=[".buildkite/pipeline.sh publish"],
                # Does not require a cache because we already
                # built our dependencies once - we just publishing to a diff repo
                cache=False,
                platform="docker",
            )
        )

    print(yaml.dump({"steps": pipeline_steps}))


def push_images(targets, tmpdir):
    test_env_vars = ["HOME"]

    run_flags, json_profile_out_test = flags.calculate_flags(
        "run_flags", "run", tmpdir, test_env_vars
    )

    run_flags += ["--define=CONTAINER_TAG={}".format(os.getenv("BUILDKITE_COMMIT", ""))]
    run_flags += ["--define=CONTAINER_REGISTRY={}".format(os.getenv("CONTAINER_REGISTRY", ""))]

    for img in targets:
        bazel.execute_bazel_run(":docker: Pushing docker image {}".format(img), run_flags, img, [])


def execute_publish_commands(configs):
    tmpdir = tempfile.mkdtemp()
    try:
        push_images(configs.get("publish_image", {}).get("targets", []), tmpdir)
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
    subparsers.add_parser("e2e_test")
    subparsers.add_parser("project_pipeline")
    subparsers.add_parser("publish")

    args = parser.parse_args(argv)

    try:
        configs = parse_config.load_configs().get("steps", {})

        if args.subparsers_name == "build":
            # execute any custom build commands before we run bazel targets
            execute_build_commands_custom(configs)
            execute_build_commands(configs)
        elif args.subparsers_name == "integration_test":
            execute_integration_tests_commands(configs)
        elif args.subparsers_name == "e2e_test":
            execute_e2e_tests_commands(configs)
        elif args.subparsers_name == "project_pipeline":
            print_project_pipeline()
        elif args.subparsers_name == "publish":
            execute_publish_commands(configs)

    except exception.BuildkiteException as e:
        terminal_print.eprint(str(e))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
