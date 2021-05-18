load("@npm//jest-cli:index.bzl", "jest", _jest_test = "jest_test")

def jest_test(name, srcs, deps, jest_config, file_extension, **kwargs):
    "A macro around the autogenerated jest_test rule"
    templated_args = [
        "--no-cache",
        "--no-watchman",
        "--ci",
        "--colors",
        "--verbose",
        "--node_options=--require=./$(rootpath chdir.js)",
        "--maxWorkers",
        "1",
    ]

    for src in srcs:
        if src.endswith(file_extension):
            templated_args.extend(["--runTestsByPath", "%s" % src])

    data = srcs + deps
    _jest_test(
        name = name,
        data = data,
        templated_args = templated_args,
        **kwargs
    )

    # This rule is used specifically to update snapshots via `bazel run`
    jest(
        name = "%s.update" % name,
        data = data,
        templated_args = templated_args + ["-u"],
        **kwargs
    )
