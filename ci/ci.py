#!/usr/bin/env python3

import sys


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
    print_collapsed_group(":bazel: Test test test!!!")

    return 0


if __name__ == "__main__":
    sys.exit(main())
