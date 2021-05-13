#!/usr/bin/env python3.6
# a stolen copy of https://github.com/bazelbuild/continuous-integration/blob/master/buildkite/bazelci.py
# modified for us

import json
import multiprocessing
import os
import random
import subprocess
import sys
import tempfile
import threading
import time
from shutil import copyfile
from urllib.parse import urlparse
from urllib.request import url2pathname

random.seed()

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


def get_json_profile_flags(out_file):
    return [
        "--experimental_generate_json_trace_profile",
        "--experimental_profile_cpu_usage",
        "--experimental_json_trace_compression",
        "--profile={}".format(out_file),
    ]


def calculate_flags(task_config_key, json_profile_key, tmpdir, test_env_vars):
    json_profile_out = os.path.join(tmpdir, "{}.profile.gz".format(json_profile_key))
    json_profile_flags = get_json_profile_flags(json_profile_out)

    flags = []
    flags += json_profile_flags
    # We have to add --test_env flags to `build`, too, otherwise Bazel
    # discards its analysis cache between `build` and `test`.
    if test_env_vars:
        flags += ["--test_env={}".format(v) for v in test_env_vars]

    return flags, json_profile_out


def execute_bazel_build(
        label, flags, targets, incompatible_flags
):
    aggregated_flags = compute_flags(
        flags,
        incompatible_flags,
        enable_remote_cache=True,
    )

    print_expanded_group(label)
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
        label,
        flags,
        targets,
        incompatible_flags,
):
    aggregated_flags = [
        "--flaky_test_attempts=default",
        "--build_tests_only",
        "--local_test_jobs=" + concurrent_jobs(),
    ]

    aggregated_flags += compute_flags(
        flags,
        incompatible_flags,
        enable_remote_cache=True,
    )

    print_expanded_group(label)
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


def test_label_to_path(tmpdir, label, attempt):
    # remove leading //
    path = label[2:]
    path = path.replace("/", os.sep)
    path = path.replace(":", os.sep)
    if attempt == 0:
        path = os.path.join(path, "test.log")
    else:
        path = os.path.join(path, "attempt_" + str(attempt) + ".log")
    return os.path.join(tmpdir, path)


def rename_test_logs_for_upload(test_logs, tmpdir):
    # Rename the test.log files to the target that created them
    # so that it's easy to associate test.log and target.
    new_paths = []
    for label, files in test_logs:
        attempt = 0
        if len(files) > 1:
            attempt = 1
        for test_log in files:
            try:
                new_path = test_label_to_path(tmpdir, label, attempt)
                os.makedirs(os.path.dirname(new_path), exist_ok=True)
                copyfile(test_log, new_path)
                new_paths.append(new_path)
                attempt += 1
            except IOError as err:
                # Log error and ignore.
                eprint(err)
    return new_paths


def test_logs_for_status(bep_file, status):
    targets = []
    with open(bep_file, encoding="utf-8") as f:
        raw_data = f.read()
    decoder = json.JSONDecoder()

    pos = 0
    while pos < len(raw_data):
        try:
            bep_obj, size = decoder.raw_decode(raw_data[pos:])
        except ValueError as e:
            eprint("JSON decoding error: " + str(e))
            return targets
        if "testSummary" in bep_obj:
            test_target = bep_obj["id"]["testSummary"]["label"]
            test_status = bep_obj["testSummary"]["overallStatus"]
            if test_status in status:
                outputs = bep_obj["testSummary"]["failed"]
                test_logs = []
                for output in outputs:
                    test_logs.append(url2pathname(urlparse(output["uri"]).path))
                targets.append((test_target, test_logs))
        pos += size + 1
    return targets


def upload_test_logs_from_bep(bep_file, tmpdir, stop_request):
    uploaded_targets = set()
    while True:
        done = stop_request.isSet()
        if os.path.exists(bep_file):
            all_test_logs = test_logs_for_status(bep_file, status=["FAILED", "TIMEOUT", "FLAKY"])
            test_logs_to_upload = [
                (target, files) for target, files in all_test_logs if target not in uploaded_targets
            ]

            if test_logs_to_upload:
                files_to_upload = rename_test_logs_for_upload(test_logs_to_upload, tmpdir)
                cwd = os.getcwd()
                try:
                    os.chdir(tmpdir)
                    test_logs = [os.path.relpath(file, tmpdir) for file in files_to_upload]
                    test_logs = sorted(test_logs)
                    execute_command(["buildkite-agent", "artifact", "upload", ";".join(test_logs)])
                finally:
                    uploaded_targets.update([target for target, _ in test_logs_to_upload])
                    os.chdir(cwd)
        if done:
            break
        time.sleep(5)


def eprint(*args, **kwargs):
    """
    Print to stderr and flush (just in case).
    """
    print(*args, flush=True, file=sys.stderr, **kwargs)


def print_collapsed_group(name):
    eprint("\n\n--- {0}\n\n".format(name))


def print_expanded_group(name):
    eprint("\n\n+++ {0}\n\n".format(name))


def get_bazelisk_cache_directory():
    return os.path.join(os.environ.get("HOME"), ".cache", "bazelisk")


def upload_json_profile(json_profile_path, tmpdir):
    if not os.path.exists(json_profile_path):
        return
    print_collapsed_group(":gcloud: Uploading JSON Profile")
    execute_command(["buildkite-agent", "artifact", "upload", json_profile_path], cwd=tmpdir)


def main(argv=None):
    try:
        tmpdir = tempfile.mkdtemp()

        build_targets = [
            "//applications/eva:eva",
            "//applications/buffer:buffer",
            "//applications/sting:sting",
            "//applications/medusa:bundle"
        ]

        test_env_vars = ["HOME"]

        build_flags, json_profile_out_build = calculate_flags(
            "build_flags", "build", tmpdir, test_env_vars
        )

        # Regular build
        execute_bazel_build(":bazel: Building binaries & bundling application", build_flags, build_targets, [])

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

        test_flags, json_profile_out_test = calculate_flags(
            "test_flags", "test", tmpdir, test_env_vars
        )

        bazelisk_cache_dir = get_bazelisk_cache_directory()
        os.makedirs(bazelisk_cache_dir, mode=0o755, exist_ok=True)
        test_flags.append("--sandbox_writable_path={}".format(bazelisk_cache_dir))

        test_bep_file = os.path.join(tmpdir, "test_bep.json")
        stop_request = threading.Event()
        upload_thread = threading.Thread(
            target=upload_test_logs_from_bep, args=(test_bep_file, tmpdir, stop_request)
        )

        try:
            upload_thread.start()
            try:
                # unit + integration tests for frontend, unit tests for golang
                execute_bazel_test(":bazel: Running unit tests", test_flags, test_targets, [])
            finally:
                if json_profile_out_test:
                    upload_json_profile(json_profile_out_test, tmpdir)
        finally:
            stop_request.set()
            upload_thread.join()

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
