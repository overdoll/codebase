#!/usr/bin/env python3
# a stolen copy of https://github.com/bazelbuild/continuous-integration/blob/master/buildkite/bazelci.py
# modified for us

import multiprocessing
import os
import subprocess
import sys


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
        # "--disk_cache=",
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


def compute_flags(flags, incompatible_flags, bazel_binary, enable_remote_cache=False):
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
                [bazel_binary] + ["info", "output_base"],
                print_output=False,
            ).strip()
            aggregated_flags[i] = flag.replace("$OUTPUT_BASE", output_base)

    return aggregated_flags


def execute_bazel_build(
        bazel_version, bazel_binary, flags, targets, incompatible_flags
):
    print_collapsed_group(":bazel: Computing flags for build step")
    aggregated_flags = compute_flags(
        flags,
        incompatible_flags,
        bazel_binary,
        enable_remote_cache=True,
    )

    print_expanded_group(":bazel: Build ({})".format(bazel_version))
    try:
        execute_command(
            [bazel_binary]
            + ["build"]
            + aggregated_flags
            + ["--"]
            + targets
        )
    except subprocess.CalledProcessError as e:
        handle_bazel_failure(e, "build")


def handle_bazel_failure(exception, action):
    BuildkiteException("bazel {0} failed with exit code {1}".format(action, exception.returncode))


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
        execute_bazel_build(None, "bazel", [], ["//applications/eva:eva"], [])
    except BuildkiteException as e:
        eprint(str(e))
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
