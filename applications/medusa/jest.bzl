load("@npm//jest-cli:index.bzl", "jest", _jest_test = "jest_test")

def jest_test(name, srcs, deps, **kwargs):
    "A macro around the autogenerated jest_test rule"
    templated_args = [
        "--node_options=--require=./$(rootpath chdir.js)",
        "--no-cache",
        "--no-watchman",
        "--ci",
        "--colors",
        "--config jest.config.js",
    ]

    for src in srcs:
        templated_args.extend(["--runTestsByPath", "%s" % src])

    data = srcs + deps + ["reporter.js"]
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
