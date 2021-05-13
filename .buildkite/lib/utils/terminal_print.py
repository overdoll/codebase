import sys


def eprint(*args, **kwargs):
    """
    Print to stderr and flush (just in case).
    """
    print(*args, flush=True, file=sys.stderr, **kwargs)


def print_collapsed_group(name):
    eprint("\n--- {0}\n".format(name))


def print_expanded_group(name):
    eprint("\n+++ {0}\n".format(name))
