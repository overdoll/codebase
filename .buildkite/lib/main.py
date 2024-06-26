#!/usr/bin/env python3
# a stolen copy of https://github.com/bazelbuild/continuous-integration/blob/master/buildkite/bazelci.py
# modified for us

import argparse
import glob
import json
import os
import random
import shutil
import stat
import string
import tempfile
import threading
import urllib.request

import redis
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

default_vars = [
    "HOME"
]

test_env_vars = [
    "CCBILL_FLEXFORMS_URL",
    "CCBILL_SALT_KEY",
    "CCBILL_ACCOUNT_NUMBER",
    "CCBILL_SUB_ACCOUNT_NUMBER",
    "CCBILL_DATALINK_USERNAME",
    "CCBILL_DATALINK_PASSWORD",
    "AWS_ACCESS_KEY",
    "AWS_ACCESS_SECRET",
    "AWS_ENDPOINT",
    "AWS_REGION",
    "TESTMAIL_API_KEY",
    "TESTMAIL_NAMESPACE",
    "AWS_PRIVATE_MEDIA_KEY_PAIR_ID",
    "LD_LIBRARY_PATH",
    "AWS_PRIVATE_MEDIA_KEY_PAIR_PRIVATE_KEY",
]


def wait_for_network_dependencies(targets):
    for connection in targets:
        host = connection["host"]
        port = connection["port"]

        terminal_print.print_collapsed_group(":suspect: Waiting for {}:{} to be available".format(host, port))
        network.wait_for_port(host, port, 500)


# execute commands to run integration tests
def execute_integration_tests_commands(configs):
    tmpdir = tempfile.mkdtemp()

    try:
        run_flags, json_profile_out_test = flags.calculate_flags(
            "run_flags", "run", tmpdir, default_vars
        )

        new_flags = []

        env_variables = configs.get("integration_test", {}).get("setup", {}).get("env", {})

        additional_test_env = format.format_env_vars(env_variables)

        for env in additional_test_env:
            new_flags += ["--test_env={}".format(env)]

        for img in configs.get("integration_test", {}).get("pre_hook", []):
            target = img.split()
            bazel.execute_bazel_run(":bazel: Executing hook before integration test {}".format(img), run_flags, target,
                                    [], env=env_variables)

        test_flags, json_profile_out_test = flags.calculate_flags(
            "test_flags", "test", tmpdir, test_env_vars + default_vars
        )

        test_bep_file = os.path.join(tmpdir, "test_bep.json")
        stop_request = threading.Event()
        upload_thread = threading.Thread(
            target=test_logs.upload_test_logs_from_bep, args=(test_bep_file, stop_request)
        )

        test_flags += new_flags

        try:
            upload_thread.start()
            test_targets = configs.get("integration_test", {}).get("targets", [])

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
    return
    opener = urllib.request.URLopener()
    opener.addheader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0')
    opener.retrieve("https://uploader.codecov.io/latest/linux/codecov", "codecov")

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


def push_all_queries():
    r = redis.Redis(host='redis', port=6379, db=2)

    f = open('./applications/medusa/src/queries.json')
    data = json.load(f)

    for i in data:
        r.mset({"query:" + i: data[i]})
        terminal_print.eprint("pushed query with id {}".format(i))

    f.close()


def execute_e2e_tests_commands(configs):
    # we first need to push all queries into the local redis instance
    push_all_queries()

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
        "--key={}".format(os.getenv("CYPRESS_API_KEY")),
        # TODO: when we have cypress parallel tests working, use this
        # "--parallel",
        # "--ci-build-id={}".format(os.getenv("BUILDKITE_BUILD_ID")),
    ])

    os.chdir(cwd)

    execute_coverage_command(configs.get("e2e_test", {}).get("coverage", []))


def upload_execution_artifacts(json_profile_path, tmpdir, json_bep_file=None, ):
    terminal_print.print_collapsed_group(":speedboat: Uploading Execution Profile")

    if os.path.exists(json_profile_path):
        exec.execute_command(["buildkite-agent", "artifact", "upload", json_profile_path], cwd=tmpdir)

    if json_bep_file and os.path.exists(json_bep_file):
        exec.execute_command(["buildkite-agent", "artifact", "upload", json_bep_file], cwd=tmpdir)


def execute_check_commands_custom(configs):
    cwd = os.getcwd()

    workdir = configs.get("check", {}).get("workdir", None)

    if workdir:
        os.chdir(workdir)

    commands = configs.get("check", {}).get("commands", [])

    terminal_print.print_expanded_group(":one-does-not-simply: Running checks before tests")

    for i in commands:
        exec.execute_command(i.split())

    os.chdir(cwd)

    # need to clear cache for eslint + typescript to ensure it updates
    for f in glob.glob("v1-cache-medusa-nextjs*"):
        os.remove(f)


def execute_unit_test_commands(configs):
    cwd = os.getcwd()

    workdir = configs.get("unit_test", {}).get("workdir", None)

    if workdir:
        os.chdir(workdir)

    commands = configs.get("unit_test", {}).get("commands", [])

    terminal_print.print_expanded_group(":test_tube: Running unit tests")

    for i in commands:
        exec.execute_command(i.split())

    execute_coverage_command(configs.get("unit_test", {}).get("coverage", []))

    os.chdir(cwd)


def execute_build_commands_custom(configs):
    cwd = os.getcwd()

    is_production = os.getenv("BUILDKITE_BRANCH") == "master"

    workdir = configs.get("build", {}).get("workdir", None)

    if workdir:
        os.chdir(workdir)

    commands = configs.get("build", {}).get("commands", [])

    terminal_print.print_expanded_group(":hammer: Running build commands")

    env = {
        "NEXT_PUBLIC_SENTRY_DSN": os.getenv("NEXT_PUBLIC_SENTRY_DSN"),
        "NEXT_PUBLIC_POSTHOG_TRACKING_CODE": os.getenv("NEXT_PUBLIC_POSTHOG_TRACKING_CODE"),
        "NEXT_PUBLIC_POSTHOG_DOMAIN": os.getenv("NEXT_PUBLIC_POSTHOG_DOMAIN"),

        "STATIC_ASSETS_URL": os.getenv("STATIC_ASSETS_URL"),
        "SENTRY_AUTH_TOKEN": os.getenv("SENTRY_AUTH_TOKEN"),
        "SENTRY_ORG": os.getenv("SENTRY_ORG"),

        "NEXT_PUBLIC_APP_VERSION": os.getenv("BUILDKITE_COMMIT"),
        "NEXT_PUBLIC_APP_ENV": "production",
        "APP_VERSION": os.getenv("BUILDKITE_COMMIT"),
        "APP_ENV": "production",
        "SENTRY_PROJECT": "medusa"
    }

    # make sure we set up the correct variables for the production build - this will inline the production JS with a
    # CDN prefix + upload sourcemaps to sentry
    if is_production:
        env["PRODUCTION_DEPLOYMENT"] = "true"

    for i in commands:
        exec.execute_command(i.split(), env=env)

    os.chdir(cwd)

    # need to clear cache for nextjs to ensure it's updated
    for f in glob.glob("v1-cache-medusa-nextjs*"):
        os.remove(f)


def execute_custom_e2e_commands_custom(configs):
    commands = configs.get("e2e_test", {}).get("commands", [])

    terminal_print.print_expanded_group(":lua: Executing custom commands")

    for i in commands:
        exec.execute_command(i.split())


# upload medusa's assets to cloudfront
def execute_cdn_upload(configs):
    terminal_print.print_expanded_group(":docker: Pulling docker image & extracting assets")

    exec.execute_command(["mkdir", "medusa-assets"])
    exec.execute_command(["mkdir", "medusa-public"])

    commit = os.getenv("BUILDKITE_COMMIT", "")
    registry = os.getenv("CONTAINER_REGISTRY", "")

    container_name = ''.join(random.choice(string.ascii_letters) for i in range(10))

    tag = "{}/{}:{}".format(registry, "medusa/dev", commit)
    exec.execute_command(["docker", "pull", tag])
    exec.execute_command(["docker", "run", "--name", container_name, "-d", tag])
    exec.execute_command(["docker", "cp", "{}:/app/build/static".format(container_name), "medusa-assets"])
    exec.execute_command(["docker", "cp", "{}:/app/public".format(container_name), "medusa-public"])

    exec.execute_command(["docker", "stop", container_name, "-t", "0"])

    terminal_print.print_expanded_group(":cloudfront: Uploading assets to cloudfront")

    env = {
        "AWS_ACCESS_KEY_ID": os.getenv("AWS_ACCESS_KEY"),
        "AWS_SECRET_ACCESS_KEY": os.getenv("AWS_ACCESS_SECRET"),
        "AWS_DEFAULT_REGION": os.getenv("AWS_REGION"),
    }

    # copy static assets to a _next folder
    exec.execute_command([
        "aws",
        "s3",
        "cp",
        "medusa-assets",
        "s3://{}/_next".format(os.getenv("AWS_STATIC_ASSETS_BUCKET")),
        "--recursive",
        "--cache-control",
        "public,max-age=31536000,immutable"
    ], env=env)

    # copy everything from the public folder right into the bucket
    exec.execute_command([
        "aws",
        "s3",
        "cp",
        "medusa-public/public",
        "s3://{}".format(os.getenv("AWS_STATIC_ASSETS_BUCKET")),
        "--recursive"
    ], env=env)


def execute_push_images_commands(configs):
    cwd = os.getcwd()

    workdir = configs.get("push_image", {}).get("workdir", None)

    if workdir:
        os.chdir(workdir)

    commands = configs.get("push_image", {}).get("build", [])

    for i in commands:
        commit = os.getenv("BUILDKITE_COMMIT", "")
        registry = os.getenv("CONTAINER_REGISTRY", "")

        tag = "{}/{}:{}".format(registry, i.get("repo"), commit)

        terminal_print.print_expanded_group(":docker: Building Image {}".format(tag))

        exec.execute_command(["docker", "build", "-t", tag, "."])

        terminal_print.print_expanded_group(":docker: Pushing Image {}".format(tag))

        exec.execute_command(["docker", "push", tag])

    os.chdir(cwd)


def execute_push_images(configs):
    tmpdir = tempfile.mkdtemp()
    try:
        push_images(configs.get("push_image", {}).get("targets", []), tmpdir)
    finally:
        if tmpdir:
            shutil.rmtree(tmpdir)


def execute_build_commands(configs):
    terminal_print.print_collapsed_group(":bazel: Waiting for bazel remote cache to start up")
    network.wait_for_port("bazel.remote", "8080", 180, check_ready=False)

    tmpdir = tempfile.mkdtemp()

    try:
        build_flags, json_profile_out_build = flags.calculate_flags(
            "build_flags", "build", tmpdir, default_vars
        )

        build_targets = configs.get("build", {}).get("targets", [])

        try:
            bazel.execute_bazel_build(":bazel: Building applications", build_flags, build_targets, None, [])
        finally:
            upload_execution_artifacts(json_profile_out_build, tmpdir)

        test_flags, json_profile_out_test = flags.calculate_flags(
            "test_flags", "test", tmpdir, default_vars
        )

        test_bep_file = os.path.join(tmpdir, "test_bep.json")
        stop_request = threading.Event()
        upload_thread = threading.Thread(
            target=test_logs.upload_test_logs_from_bep, args=(test_bep_file, stop_request)
        )

        try:
            upload_thread.start()
            test_targets = configs.get("unit_test", {}).get("targets", [])

            try:
                bazel.execute_bazel_test(":bazel: Running unit tests", test_flags, test_targets, test_bep_file, [])
            finally:
                upload_execution_artifacts(json_profile_out_test, tmpdir, test_bep_file)

        finally:
            stop_request.set()
            upload_thread.join()

        # We execute our coverage config in tmpdir because that's where the bazel coverage results are stored
        execute_coverage_command(configs.get("unit_test", {}).get("coverage", []))

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

    default_docker_compose = ["./.buildkite/config/docker-compose.yaml"]

    integration = steps.get("integration_test", None)
    if not integration:
        raise exception.BuildkiteException("integration step is empty")

    pipeline_steps.append(
        pipeline.create_step(
            label=":typescript: Build & Test Front-End",
            commands=[".buildkite/pipeline.sh frontend_build_test"],
            platform="docker",
            cache=[
                {
                    "gencer/cache#v2.4.10": {
                        "id": "medusa-node_modules",
                        "backend": "s3",
                        "key": "v1-cache-{{ id }}-{{ checksum 'applications/medusa/yarn.lock' }}",
                        "compress": "true",
                        "paths": [
                            "applications/medusa/node_modules",
                        ],
                        "s3": {
                            "bucket": "buildkite-runner-cache"
                        },
                        "continue_on_error": "true"
                    }
                },
                {
                    "gencer/cache#v2.4.10": {
                        "id": "medusa-nextjs",
                        "backend": "s3",
                        "key": "v1-cache-{{ id }}-$BUILDKITE_COMMIT",
                        "restore-keys": [
                            "v1-cache-{{ id }}-",
                        ],
                        "compress": "true",
                        "paths": [
                            "applications/medusa/build/cache"
                        ],
                        "s3": {
                            "bucket": "buildkite-runner-cache"
                        },
                    }
                },
                {
                    "gencer/cache#v2.4.10": {
                        "id": "medusa-cache_eslint_typescript",
                        "backend": "s3",
                        "key": "v1-cache-{{ id }}-$BUILDKITE_COMMIT",
                        "restore-keys": [
                            "v1-cache-{{ id }}-",
                        ],
                        "compress": "true",
                        "paths": [
                            "applications/medusa/cache"
                        ],
                        "s3": {
                            "bucket": "buildkite-runner-cache"
                        },
                    }
                }
            ],
        )
    )

    pipeline_steps.append(
        pipeline.create_step(
            label=":bazel: Build & Test Services",
            commands=[".buildkite/pipeline.sh services_build_test"],
            platform="docker-compose",
            cache=[
                {
                    "gencer/cache#v2.4.10": {
                        "id": "orca-node_modules",
                        "backend": "s3",
                        "key": "v1-cache-{{ id }}-{{ runner.os }}-{{ checksum 'applications/orca/yarn.lock' }}",
                        "compress": "true",
                        "paths": [
                            "applications/orca/node_modules"
                        ],
                        "s3": {
                            "bucket": "buildkite-runner-cache"
                        },
                    }
                },
                {
                    "gencer/cache#v2.4.10": {
                        "id": "bazel-repositories",
                        "backend": "s3",
                        "key": "v1-cache-{{ id }}-{{ checksum 'go_repositories.bzl' }}-{{ checksum 'Cargo.Bazel.lock' }}",
                        "compress": "true",
                        "paths": [
                            ".bazel_repository_cache"
                        ],
                        "s3": {
                            "bucket": "buildkite-runner-cache"
                        },
                    }
                },
            ],
            configs=default_docker_compose + integration.get("setup", {}).get("dockerfile", []) + [
                "./.buildkite/config/docker/docker-compose.integration.yaml"]
        )
    )

    # unit tests + build must complete first before e2e testing
    pipeline_steps.append("wait")

    if os.getenv("BUILDKITE_BRANCH") == "master":
        # will upload front-end static assets to cloudfront in this step
        pipeline_steps.append(
            pipeline.create_step(
                label=":cloudfront: Upload Front-End to CloudFront",
                commands=[".buildkite/pipeline.sh frontend_upload_cdn"],
                platform="docker",
            )
        )
        pipeline_steps.append("wait")

    e2e = steps.get("e2e_test", None)
    if not e2e:
        raise exception.BuildkiteException("e2e step is empty")

    # Integration tests should be ran first - they will ensure the backend works as expected before proceeding with the
    # front-end
    pipeline_steps.append("wait")

    pipeline_steps.append(
        pipeline.create_step(
            label=':cypress: :chromium: End-to-End Test',
            commands=[".buildkite/pipeline.sh e2e_test"],
            shards=1,
            platform="docker-compose",
            skip="build.message !~ /skip e2e/",
            cache=[
                {
                    "gencer/cache#v2.4.10": {
                        "id": "medusa-node_modules",
                        "backend": "s3",
                        "key": "v1-cache-{{ id }}-{{ checksum 'applications/medusa/yarn.lock' }}",
                        "compress": "true",
                        "paths": [
                            "applications/medusa/node_modules",
                        ],
                        "s3": {
                            "bucket": "buildkite-runner-cache"
                        }
                    }
                },
            ],
            artifacts=e2e.get("artifacts", []),
            configs=default_docker_compose + e2e.get("setup", {}).get("dockerfile", []) + [
                "./.buildkite/config/docker-compose.e2e.yaml",
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
                platform="docker",
            )
        )

    print(yaml.dump({"steps": pipeline_steps}))


def push_images(targets, tmpdir):
    run_flags, json_profile_out_test = flags.calculate_flags(
        "run_flags", "run", tmpdir, test_env_vars
    )

    run_flags += ["--define=CONTAINER_TAG={}".format(os.getenv("BUILDKITE_COMMIT", ""))]
    run_flags += ["--define=CONTAINER_REGISTRY={}".format(os.getenv("CONTAINER_REGISTRY", ""))]

    for img in targets:
        target = img.split()
        bazel.execute_bazel_run(":docker: Pushing docker image {}".format(img), run_flags, target, [])


def execute_publish_schema_commands(configs):
    publish = configs.get("publish_subgraph", {}).get("graphs", [])
    for img in publish:
        service = img.get("service")
        file = img.get("file")
        routing_url = img.get("routing_url")

        terminal_print.print_expanded_group(":graphql: Publishing subgraph schema for {}".format(service))

        exec.execute_command([
            "/root/.rover/bin/rover",
            "subgraph",
            "publish",
            "od-prod@current",
            "--schema",
            file,
            "--name",
            service,
            "--routing-url",
            routing_url,
        ])


def execute_publish_commands(configs):
    publish = configs.get("publish_image", {}).get("copy", [])
    for img in publish:
        from_repo = img.get("from_repo")
        to_repo = img.get("to_repo")

        terminal_print.print_expanded_group(":docker: Copying image from {} to {}".format(from_repo, to_repo))

        commit = os.getenv("BUILDKITE_COMMIT", "")
        registry = os.getenv("CONTAINER_REGISTRY", "")

        existing_tag = "{}/{}:{}".format(registry, from_repo, commit)

        # grab our current digest
        digest = exec.execute_command_and_get_output(["crane", "digest", existing_tag]).rstrip("\n")

        new_tag = "{}/{}@{}".format(registry, to_repo, digest)
        new_tag_with_commit = "{}/{}:{}".format(registry, to_repo, commit)

        # then, check
        returncode = exec.execute_command(["crane", "digest", new_tag], fail_if_nonzero=False)

        # return code is not 0, it means the digest was not found
        if returncode != 0:
            terminal_print.eprint("\033[93m Digest Not Found, Copying Image \033[0m")
            copy_return = exec.execute_command(["crane", "cp", existing_tag, new_tag_with_commit])

            if copy_return != 0:
                raise exception.BuildkiteException(
                    "failed to copy image from {} to {}".format(existing_tag, new_tag_with_commit))
        else:
            terminal_print.eprint("\033[92m Digest Found, Skipping Copy \033[0m")


def main(argv=None):
    if argv is None:
        argv = sys.argv[1:]

    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest="subparsers_name")
    subparsers.add_parser("services_build_test")
    subparsers.add_parser("frontend_build_test")
    subparsers.add_parser("frontend_upload_cdn")

    subparsers.add_parser("e2e_test")
    subparsers.add_parser("project_pipeline")
    subparsers.add_parser("publish")

    args = parser.parse_args(argv)

    try:
        configs = parse_config.load_configs().get("steps", {})
        # execute any custom build commands before we run bazel targets
        # execute_build_commands_custom(configs)
        if args.subparsers_name == "services_build_test":
            execute_build_commands(configs)
            execute_integration_tests_commands(configs)
            execute_push_images(configs)
        elif args.subparsers_name == "frontend_upload_cdn":
            execute_cdn_upload(configs)
        elif args.subparsers_name == "frontend_build_test":
            frontend_config = parse_config.load_configs().get("frontend_steps", {})
            execute_check_commands_custom(frontend_config)
            execute_unit_test_commands(frontend_config)
            execute_build_commands_custom(frontend_config)
            execute_push_images_commands(frontend_config)
        elif args.subparsers_name == "e2e_test":
            execute_custom_e2e_commands_custom(configs)
            execute_e2e_tests_commands(configs)
        elif args.subparsers_name == "project_pipeline":
            print_project_pipeline()
        elif args.subparsers_name == "publish":
            execute_publish_commands(configs)
            execute_publish_schema_commands(configs)

    except exception.BuildkiteException as e:
        terminal_print.eprint(str(e))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
