import multiprocessing
import os

from . import exec


def concurrent_jobs():
    return str(multiprocessing.cpu_count())


def concurrent_test_jobs():
    return str(multiprocessing.cpu_count())


def get_bazelisk_cache_directory():
    return os.path.join(os.environ.get("HOME"), ".cache", "bazelisk")


def common_build_flags(bep_file, is_test):
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
        "--sandbox_tmpfs_path=/tmp",
        "--flaky_test_attempts=default",
        "--repository_cache=/workdir/.bazel_repository_cache",
        "--remote_cache=http://localhost:8080"
    ]

    if is_test:
        bazelisk_cache_dir = get_bazelisk_cache_directory()
        os.makedirs(bazelisk_cache_dir, mode=0o755, exist_ok=True)

        flags += [
            "--build_tests_only",
            "--local_test_jobs=" + concurrent_test_jobs(),
            "--sandbox_writable_path={}".format(bazelisk_cache_dir),
            # instrumentation filter will make sure that any code that's touched by tests or functions
            # will be considered uncovered
            # otherwise, it just scopes the coverage to the package, but we want to make sure we have
            # dependencies covered as well
            "--instrumentation_filter=^//"
        ]

    if bep_file:
        flags += [
            "--experimental_build_event_json_file_path_conversion=false",
            "--build_event_json_file=" + bep_file,
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


def compute_flags(flags, incompatible_flags, bep_file, enable_remote_cache=False, is_test=False):
    aggregated_flags = common_build_flags(bep_file, is_test)
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
            output_base = exec.execute_command_and_get_output(
                ["bazel", "info", "output_base"],
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
