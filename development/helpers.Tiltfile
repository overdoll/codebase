# -*- mode: Python -*-

# Bazel helpers & Configuration
BAZEL_SOURCES_CMD_TEMPLATE = """
  bazel query 'filter("^//", kind("source file", deps(set(%s))))' --order_output=no
  """.strip()

BAZEL_BUILDFILES_CMD = """
  bazel query 'filter("^//", buildfiles(deps(set(%s))))' --order_output=no
  """.strip()

def bazel_labels_to_files(labels):
    files = {}
    for l in labels:
        if l.startswith("//external/") or l.startswith("//external:"):
            continue
        elif l.startswith("//"):
            l = l[2:]

        path = l.replace(":", "/")
        if path.startswith("/"):
            path = path[1:]

        files[path] = None

    return files.keys()

def bazel_sourcefile_deps(target):
    return bazel_labels_to_files(str(local(BAZEL_SOURCES_CMD_TEMPLATE % target)).splitlines())

def bazel_buildfile_deps(target):
    return bazel_labels_to_files(str(local(BAZEL_BUILDFILES_CMD % target)).splitlines())
