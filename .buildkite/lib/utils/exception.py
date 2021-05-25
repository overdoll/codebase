def handle_bazel_failure(exception, action):
    raise BuildkiteException("bazel {0} failed with exit code {1}".format(action, exception.returncode))


class BuildkiteException(Exception):
    """
    Raised whenever something goes wrong and we should exit with an error.
    """

    pass
