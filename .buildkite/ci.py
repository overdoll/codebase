#!/usr/bin/env python3.6
# a stolen copy of https://github.com/bazelbuild/continuous-integration/blob/master/buildkite/bazelci.py
# modified for us

import multiprocessing
import os
import subprocess
import sys

BAZEL_VERSION = "4.0.0"
BAZEL_BINARY = "bazel"


class BuildkiteException(Exception):
    """
    Raised whenever something goes wrong and we should exit with an error.
    """

    pass


def concurrent_jobs():
    return str(multiprocessing.cpu_count())


def common_build_flags():
    flags = [
        "--show_progress_rate_limit=5",
        "--curses=yes",
        "--color=yes",
        "--terminal_columns=143",
        "--show_timestamps",
        "--verbose_failures",
        "--jobs=" + concurrent_jobs(),
        "--announce_rc",
        "--experimental_repository_cache_hardlinks",
        "--disk_cache=",
        "--sandbox_tmpfs_path=/tmp"
    ]

    return flags


def remote_enabled(flags):
    # Detect if the project configuration enabled its own remote caching / execution.
    remote_flags = ["--remote_executor", "--remote_cache", "--remote_http_cache"]
    for flag in flags:
        for remote_flag in remote_flags:
            if flag.startswith(remote_flag):
                return True
    return False


def remote_caching_flags():
    return []


def execute_command(args, shell=False, fail_if_nonzero=True, cwd=None, print_output=True):
    if print_output:
        eprint(" ".join(args))
    return subprocess.run(
        args, shell=shell, check=fail_if_nonzero, env=os.environ, cwd=cwd
    ).returncode


def execute_command_and_get_output(args, shell=False, fail_if_nonzero=True, print_output=True):
    eprint(" ".join(args))
    process = subprocess.run(
        args,
        shell=shell,
        check=fail_if_nonzero,
        env=os.environ,
        stdout=subprocess.PIPE,
        errors="replace",
        universal_newlines=True,
    )
    if print_output:
        eprint(process.stdout)

    return process.stdout


def compute_flags(flags, incompatible_flags, enable_remote_cache=False):
    aggregated_flags = common_build_flags()
    if not remote_enabled(flags):
        aggregated_flags += remote_caching_flags()
    aggregated_flags += flags
    if incompatible_flags:
        aggregated_flags += incompatible_flags

    for i, flag in enumerate(aggregated_flags):
        if "$HOME" in flag:
            home = "/var/lib/buildkite-agent"
            aggregated_flags[i] = flag.replace("$HOME", home)
        if "$OUTPUT_BASE" in flag:
            output_base = execute_command_and_get_output(
                [BAZEL_BINARY] + ["info", "output_base"],
                print_output=False,
            ).strip()
            aggregated_flags[i] = flag.replace("$OUTPUT_BASE", output_base)

    return aggregated_flags


def execute_bazel_build(
        flags, targets, incompatible_flags
):
    aggregated_flags = compute_flags(
        flags,
        incompatible_flags,
        enable_remote_cache=True,
    )

    print_expanded_group(":bazel: Build ({})".format(BAZEL_VERSION))
    try:
        execute_command(
            [BAZEL_BINARY]
            + ["build"]
            + aggregated_flags
            + ["--"]
            + targets
        )
    except subprocess.CalledProcessError as e:
        handle_bazel_failure(e, "build")
    finally:
        handle_bazel_failure_generic("build")


def execute_bazel_test(
        flags,
        targets,
        incompatible_flags,
):
    aggregated_flags = [
        "--flaky_test_attempts=default",
        "--build_tests_only",
        "--test_output=errors",
        "--local_test_jobs=" + concurrent_jobs(),
    ]

    aggregated_flags += compute_flags(
        flags,
        incompatible_flags,
        enable_remote_cache=True,
    )

    print_expanded_group(":bazel: Test ({})".format(BAZEL_VERSION))
    try:
        execute_command(
            [BAZEL_BINARY]
            + ["test"]
            + aggregated_flags
            + ["--"]
            + targets
        )
    except subprocess.CalledProcessError as e:
        handle_bazel_failure(e, "test")
    finally:
        handle_bazel_failure_generic("build")


def handle_bazel_failure(exception, action):
    BuildkiteException("bazel {0} failed with exit code {1}".format(action, exception.returncode))


def handle_bazel_failure_generic(action):
    BuildkiteException("bazel {0} failed".format(action))


def eprint(*args, **kwargs):
    """
    Print to stderr and flush (just in case).
    """
    print(*args, flush=True, file=sys.stderr, **kwargs)


def print_collapsed_group(name):
    eprint("\n\n--- {0}\n\n".format(name))


def print_expanded_group(name):
    eprint("\n\n+++ {0}\n\n".format(name))


def main(argv=None):
    try:
        build_targets = [
            "//applications/eva:eva",
            "//applications/buffer:buffer",
            "//applications/sting:sting",
            "//applications/medusa:bundle"
        ]

        # Regular build
        execute_bazel_build([], build_targets, [])

        test_targets = [
            "//applications/eva/src/app/...",
            "//applications/eva/src/domain/...",
            "//applications/eva/src/ports/...",

            "//applications/buffer/src/app/...",
            "//applications/buffer/src/domain/...",
            "//applications/buffer/src/ports/...",

            "//applications/sting/src/app/...",
            "//applications/sting/src/domain/...",
            "//applications/sting/src/ports/...",

            "//applications/medusa:unit",
            "//applications/medusa:integration",
        ]

        # unit + integration tests for frontend, unit tests for golang
        execute_bazel_test([], test_targets, [])

        # tests under 'adapters' and 'service' usually require 3rd party deps (other services, db, etc...)
        test_targets_integration = [
            "//applications/eva/src/adapters/...",
            "//applications/eva/src/service/...",

            "//applications/buffer/src/adapters/...",
            "//applications/buffer/src/service/...",

            "//applications/sting/src/adapters/...",
            "//applications/sting/src/service/...",
        ]


    except BuildkiteException as e:
        eprint(str(e))
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
