import os
import subprocess

from . import terminal_print


def execute_command(args, shell=False, fail_if_nonzero=True, cwd=None, print_output=True, env=None):
    if env is None:
        env = {}

    env_copy = os.environ.copy()
    env_copy.update(dict(env))

    if print_output:
        terminal_print.eprint(" ".join(args))
    return subprocess.run(
        args=args, shell=shell, check=fail_if_nonzero, env=env_copy, cwd=cwd,
    ).returncode


def execute_command_and_get_output(args, shell=False, fail_if_nonzero=True, print_output=True):
    terminal_print.eprint(" ".join(args))
    process = subprocess.run(
        args=args,
        shell=shell,
        check=fail_if_nonzero,
        env=os.environ,
        stdout=subprocess.PIPE,
        errors="replace",
        universal_newlines=True,
    )
    if print_output:
        terminal_print.eprint(process.stdout)

    return process.stdout
