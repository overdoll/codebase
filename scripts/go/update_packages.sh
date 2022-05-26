bazel run //:gazelle -- update-repos -from_file=go.mod -prune=true -build_file_proto_mode=disable -to_macro=go_repositories.bzl%go_repositories
