import subprocess

from . import exception
from . import exec
from . import flags
from . import terminal_print


def execute_bazel_build(
        label, additive_flags, targets, bep_file, incompatible_flags
):
    aggregated_flags = flags.compute_flags(
        additive_flags,
        incompatible_flags,
        bep_file,
        enable_remote_cache=True,
    )

    terminal_print.print_expanded_group(label)
    try:
        exec.execute_command(
            ["bazel", "build"]
            + aggregated_flags
            + ["--"]
            + targets
        )
    except subprocess.CalledProcessError as e:
        exception.handle_bazel_failure(e, "build")


def execute_bazel_test(
        label,
        additive_flags,
        targets,
        bep_file,
        incompatible_flags,
):
    aggregated_flags = flags.compute_flags(
        additive_flags,
        incompatible_flags,
        bep_file,
        enable_remote_cache=True,
        is_test=True
    )

    terminal_print.print_expanded_group(label)
    try:
        exec.execute_command(
            ["bazel", "coverage"]
            + aggregated_flags
            + ["--"]
            + targets
        )
    except subprocess.CalledProcessError as e:
        exception.handle_bazel_failure(e, "test")


def execute_bazel_run(
        label,
        additive_flags,
        target,
        incompatible_flags,
):
    aggregated_flags = flags.compute_flags(
        additive_flags,
        incompatible_flags,
        None,
        enable_remote_cache=True,
        is_test=False
    )

    terminal_print.print_expanded_group(label)
    try:
        exec.execute_command(
            ["bazel", "run"]
            + aggregated_flags
            + target
        )
    except subprocess.CalledProcessError as e:
        exception.handle_bazel_failure(e, "run")
