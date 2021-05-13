#!/usr/bin/env python3.6
# a stolen copy of https://github.com/bazelbuild/continuous-integration/blob/master/buildkite/bazelci.py
# modified for us

import argparse
import os
import random
import shutil
import sys
import tempfile
import threading

import utils.bazel as bazel
import utils.exception as exception
import utils.exec as exec
import utils.flags as flags
import utils.terminal_print as terminal_print
import utils.test_logs as test_logs

random.seed()


def execute_commands():
    tmpdir = tempfile.mkdtemp()

    try:
        exec.execute_command(["docker-compose", "-v"])

        build_targets = [
            "//applications/eva:eva",
            "//applications/buffer:buffer",
            "//applications/sting:sting",
            "//applications/medusa:bundle"
        ]

        test_env_vars = ["HOME"]

        build_flags, json_profile_out_build = flags.calculate_flags(
            "build_flags", "build", tmpdir, test_env_vars
        )

        bazel.execute_bazel_build(":bazel: Building applications", build_flags, build_targets, None, [])

        # Regular build
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
            bazel.execute_bazel_test(":bazel: Running unit tests", test_flags, test_targets, test_bep_file, [])
        finally:
            stop_request.set()
            upload_thread.join()


    finally:
        if tmpdir:
            shutil.rmtree(tmpdir)


def main(argv=None):
    if argv is None:
        argv = sys.argv[1:]

    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest="subparsers_name")
    subparsers.add_parser("run")

    args = parser.parse_args(argv)

    try:
        if args.subparsers_name == "run":
            execute_commands()
    except exception.BuildkiteException as e:
        terminal_print.eprint(str(e))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
