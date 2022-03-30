"""
@generated
cargo-raze generated Bazel file.

DO NOT EDIT! Replaced on runs of cargo-raze
"""

load("@bazel_tools//tools/build_defs/repo:git.bzl", "new_git_repository")  # buildifier: disable=load
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")  # buildifier: disable=load
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")  # buildifier: disable=load

# EXPERIMENTAL -- MAY CHANGE AT ANY TIME: A mapping of package names to a set of normal dependencies for the Rust targets of that package.
_DEPENDENCIES = {
    "applications/orca": {
        "apollo-router": "@raze__apollo_router__0_1_0_preview_1//:apollo_router",
    },
}

# EXPERIMENTAL -- MAY CHANGE AT ANY TIME: A mapping of package names to a set of proc_macro dependencies for the Rust targets of that package.
_PROC_MACRO_DEPENDENCIES = {
    "applications/orca": {
    },
}

# EXPERIMENTAL -- MAY CHANGE AT ANY TIME: A mapping of package names to a set of normal dev dependencies for the Rust targets of that package.
_DEV_DEPENDENCIES = {
    "applications/orca": {
    },
}

# EXPERIMENTAL -- MAY CHANGE AT ANY TIME: A mapping of package names to a set of proc_macro dev dependencies for the Rust targets of that package.
_DEV_PROC_MACRO_DEPENDENCIES = {
    "applications/orca": {
    },
}

def crate_deps(deps, package_name = None):
    """EXPERIMENTAL -- MAY CHANGE AT ANY TIME: Finds the fully qualified label of the requested crates for the package where this macro is called.

    WARNING: This macro is part of an expeirmental API and is subject to change.

    Args:
        deps (list): The desired list of crate targets.
        package_name (str, optional): The package name of the set of dependencies to look up.
            Defaults to `native.package_name()`.
    Returns:
        list: A list of labels to cargo-raze generated targets (str)
    """

    if not package_name:
        package_name = native.package_name()

    # Join both sets of dependencies
    dependencies = _flatten_dependency_maps([
        _DEPENDENCIES,
        _PROC_MACRO_DEPENDENCIES,
        _DEV_DEPENDENCIES,
        _DEV_PROC_MACRO_DEPENDENCIES,
    ])

    if not deps:
        return []

    missing_crates = []
    crate_targets = []
    for crate_target in deps:
        if crate_target not in dependencies[package_name]:
            missing_crates.append(crate_target)
        else:
            crate_targets.append(dependencies[package_name][crate_target])

    if missing_crates:
        fail("Could not find crates `{}` among dependencies of `{}`. Available dependencies were `{}`".format(
            missing_crates,
            package_name,
            dependencies[package_name],
        ))

    return crate_targets

def all_crate_deps(normal = False, normal_dev = False, proc_macro = False, proc_macro_dev = False, package_name = None):
    """EXPERIMENTAL -- MAY CHANGE AT ANY TIME: Finds the fully qualified label of all requested direct crate dependencies \
    for the package where this macro is called.

    If no parameters are set, all normal dependencies are returned. Setting any one flag will
    otherwise impact the contents of the returned list.

    Args:
        normal (bool, optional): If True, normal dependencies are included in the
            output list. Defaults to False.
        normal_dev (bool, optional): If True, normla dev dependencies will be
            included in the output list. Defaults to False.
        proc_macro (bool, optional): If True, proc_macro dependencies are included
            in the output list. Defaults to False.
        proc_macro_dev (bool, optional): If True, dev proc_macro dependencies are
            included in the output list. Defaults to False.
        package_name (str, optional): The package name of the set of dependencies to look up.
            Defaults to `native.package_name()`.

    Returns:
        list: A list of labels to cargo-raze generated targets (str)
    """

    if not package_name:
        package_name = native.package_name()

    # Determine the relevant maps to use
    all_dependency_maps = []
    if normal:
        all_dependency_maps.append(_DEPENDENCIES)
    if normal_dev:
        all_dependency_maps.append(_DEV_DEPENDENCIES)
    if proc_macro:
        all_dependency_maps.append(_PROC_MACRO_DEPENDENCIES)
    if proc_macro_dev:
        all_dependency_maps.append(_DEV_PROC_MACRO_DEPENDENCIES)

    # Default to always using normal dependencies
    if not all_dependency_maps:
        all_dependency_maps.append(_DEPENDENCIES)

    dependencies = _flatten_dependency_maps(all_dependency_maps)

    if not dependencies:
        return []

    return dependencies[package_name].values()

def _flatten_dependency_maps(all_dependency_maps):
    """Flatten a list of dependency maps into one dictionary.

    Dependency maps have the following structure:

    ```python
    DEPENDENCIES_MAP = {
        # The first key in the map is a Bazel package
        # name of the workspace this file is defined in.
        "package_name": {

            # An alias to a crate target.     # The label of the crate target the
            # Aliases are only crate names.   # alias refers to.
            "alias":                          "@full//:label",
        }
    }
    ```

    Args:
        all_dependency_maps (list): A list of dicts as described above

    Returns:
        dict: A dictionary as described above
    """
    dependencies = {}

    for dep_map in all_dependency_maps:
        for pkg_name in dep_map:
            if pkg_name not in dependencies:
                # Add a non-frozen dict to the collection of dependencies
                dependencies.setdefault(pkg_name, dict(dep_map[pkg_name].items()))
                continue

            duplicate_crate_aliases = [key for key in dependencies[pkg_name] if key in dep_map[pkg_name]]
            if duplicate_crate_aliases:
                fail("There should be no duplicate crate aliases: {}".format(duplicate_crate_aliases))

            dependencies[pkg_name].update(dep_map[pkg_name])

    return dependencies

def raze_fetch_remote_crates():
    """This function defines a collection of repos and should be called in a WORKSPACE file"""
    maybe(
        http_archive,
        name = "raze__addr2line__0_17_0",
        url = "https://crates.io/api/v1/crates/addr2line/0.17.0/download",
        type = "tar.gz",
        sha256 = "b9ecd88a8c8378ca913a680cd98f0f13ac67383d35993f86c90a70e3f137816b",
        strip_prefix = "addr2line-0.17.0",
        build_file = Label("//cargo/remote:BUILD.addr2line-0.17.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__adler__1_0_2",
        url = "https://crates.io/api/v1/crates/adler/1.0.2/download",
        type = "tar.gz",
        sha256 = "f26201604c87b1e01bd3d98f8d5d9a8fcbb815e8cedb41ffccbeb4bf593a35fe",
        strip_prefix = "adler-1.0.2",
        build_file = Label("//cargo/remote:BUILD.adler-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ahash__0_7_6",
        url = "https://crates.io/api/v1/crates/ahash/0.7.6/download",
        type = "tar.gz",
        sha256 = "fcb51a0695d8f838b1ee009b3fbf66bda078cd64590202a864a8f3e8c4315c47",
        strip_prefix = "ahash-0.7.6",
        build_file = Label("//cargo/remote:BUILD.ahash-0.7.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__aho_corasick__0_7_18",
        url = "https://crates.io/api/v1/crates/aho-corasick/0.7.18/download",
        type = "tar.gz",
        sha256 = "1e37cfd5e7657ada45f742d6e99ca5788580b5c529dc78faf11ece6dc702656f",
        strip_prefix = "aho-corasick-0.7.18",
        build_file = Label("//cargo/remote:BUILD.aho-corasick-0.7.18.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__alloc_no_stdlib__2_0_3",
        url = "https://crates.io/api/v1/crates/alloc-no-stdlib/2.0.3/download",
        type = "tar.gz",
        sha256 = "35ef4730490ad1c4eae5c4325b2a95f521d023e5c885853ff7aca0a6a1631db3",
        strip_prefix = "alloc-no-stdlib-2.0.3",
        build_file = Label("//cargo/remote:BUILD.alloc-no-stdlib-2.0.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__alloc_stdlib__0_2_1",
        url = "https://crates.io/api/v1/crates/alloc-stdlib/0.2.1/download",
        type = "tar.gz",
        sha256 = "697ed7edc0f1711de49ce108c541623a0af97c6c60b2f6e2b65229847ac843c2",
        strip_prefix = "alloc-stdlib-0.2.1",
        build_file = Label("//cargo/remote:BUILD.alloc-stdlib-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ansi_term__0_12_1",
        url = "https://crates.io/api/v1/crates/ansi_term/0.12.1/download",
        type = "tar.gz",
        sha256 = "d52a9bb7ec0cf484c551830a7ce27bd20d67eac647e1befb56b0be4ee39a55d2",
        strip_prefix = "ansi_term-0.12.1",
        build_file = Label("//cargo/remote:BUILD.ansi_term-0.12.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__anyhow__1_0_56",
        url = "https://crates.io/api/v1/crates/anyhow/1.0.56/download",
        type = "tar.gz",
        sha256 = "4361135be9122e0870de935d7c439aef945b9f9ddd4199a553b5270b49c82a27",
        strip_prefix = "anyhow-1.0.56",
        build_file = Label("//cargo/remote:BUILD.anyhow-1.0.56.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__apollo_encoder__0_1_0",
        url = "https://crates.io/api/v1/crates/apollo-encoder/0.1.0/download",
        type = "tar.gz",
        sha256 = "c1da9c412262c1dd533a84c9b867dcb4e68ab852a0936e235d75242585dda631",
        strip_prefix = "apollo-encoder-0.1.0",
        build_file = Label("//cargo/remote:BUILD.apollo-encoder-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__apollo_federation_types__0_1_0",
        url = "https://crates.io/api/v1/crates/apollo-federation-types/0.1.0/download",
        type = "tar.gz",
        sha256 = "98a9c68b5f69d903740cdfda32b6dcdac1ce6944448fa4d5439d938bb21dc68d",
        strip_prefix = "apollo-federation-types-0.1.0",
        build_file = Label("//cargo/remote:BUILD.apollo-federation-types-0.1.0.bazel"),
    )

    maybe(
        new_git_repository,
        name = "raze__apollo_parser__0_2_4",
        remote = "https://github.com/apollographql/apollo-rs.git",
        commit = "e707e0f78f41ace1c3ecfe69bc10f4144ffbf7ac",
        build_file = Label("//cargo/remote:BUILD.apollo-parser-0.2.4.bazel"),
        init_submodules = True,
    )

    maybe(
        http_archive,
        name = "raze__apollo_parser__0_2_4",
        url = "https://crates.io/api/v1/crates/apollo-parser/0.2.4/download",
        type = "tar.gz",
        sha256 = "027e04c63b91ac33053684910a90018a0e96d45d52c4489cf4c12b4cb240802d",
        strip_prefix = "apollo-parser-0.2.4",
        build_file = Label("//cargo/remote:BUILD.apollo-parser-0.2.4.bazel"),
    )

    maybe(
        new_git_repository,
        name = "raze__apollo_router__0_1_0_preview_1",
        remote = "https://github.com/apollographql/router",
        commit = "eeaa16f1a521a2161679850ee32391882fcc62f8",
        build_file = Label("//cargo/remote:BUILD.apollo-router-0.1.0-preview.1.bazel"),
        init_submodules = True,
    )

    maybe(
        new_git_repository,
        name = "raze__apollo_router_core__0_1_0_preview_1",
        remote = "https://github.com/apollographql/router",
        commit = "eeaa16f1a521a2161679850ee32391882fcc62f8",
        build_file = Label("//cargo/remote:BUILD.apollo-router-core-0.1.0-preview.1.bazel"),
        init_submodules = True,
    )

    maybe(
        new_git_repository,
        name = "raze__apollo_spaceport__0_1_0_preview_1",
        remote = "https://github.com/apollographql/router",
        commit = "eeaa16f1a521a2161679850ee32391882fcc62f8",
        build_file = Label("//cargo/remote:BUILD.apollo-spaceport-0.1.0-preview.1.bazel"),
        init_submodules = True,
    )

    maybe(
        new_git_repository,
        name = "raze__apollo_uplink__0_1_0_preview_1",
        remote = "https://github.com/apollographql/router",
        commit = "eeaa16f1a521a2161679850ee32391882fcc62f8",
        build_file = Label("//cargo/remote:BUILD.apollo-uplink-0.1.0-preview.1.bazel"),
        init_submodules = True,
    )

    maybe(
        http_archive,
        name = "raze__arrayref__0_3_6",
        url = "https://crates.io/api/v1/crates/arrayref/0.3.6/download",
        type = "tar.gz",
        sha256 = "a4c527152e37cf757a3f78aae5a06fbeefdb07ccc535c980a3208ee3060dd544",
        strip_prefix = "arrayref-0.3.6",
        build_file = Label("//cargo/remote:BUILD.arrayref-0.3.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__arrayvec__0_5_2",
        url = "https://crates.io/api/v1/crates/arrayvec/0.5.2/download",
        type = "tar.gz",
        sha256 = "23b62fc65de8e4e7f52534fb52b0f3ed04746ae267519eef2a83941e8085068b",
        strip_prefix = "arrayvec-0.5.2",
        build_file = Label("//cargo/remote:BUILD.arrayvec-0.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ascii__0_9_3",
        url = "https://crates.io/api/v1/crates/ascii/0.9.3/download",
        type = "tar.gz",
        sha256 = "eab1c04a571841102f5345a8fc0f6bb3d31c315dec879b5c6e42e40ce7ffa34e",
        strip_prefix = "ascii-0.9.3",
        build_file = Label("//cargo/remote:BUILD.ascii-0.9.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_compression__0_3_12",
        url = "https://crates.io/api/v1/crates/async-compression/0.3.12/download",
        type = "tar.gz",
        sha256 = "f2bf394cfbbe876f0ac67b13b6ca819f9c9f2fb9ec67223cceb1555fbab1c31a",
        strip_prefix = "async-compression-0.3.12",
        build_file = Label("//cargo/remote:BUILD.async-compression-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_io__1_6_0",
        url = "https://crates.io/api/v1/crates/async-io/1.6.0/download",
        type = "tar.gz",
        sha256 = "a811e6a479f2439f0c04038796b5cfb3d2ad56c230e0f2d3f7b04d68cfee607b",
        strip_prefix = "async-io-1.6.0",
        build_file = Label("//cargo/remote:BUILD.async-io-1.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_lock__2_5_0",
        url = "https://crates.io/api/v1/crates/async-lock/2.5.0/download",
        type = "tar.gz",
        sha256 = "e97a171d191782fba31bb902b14ad94e24a68145032b7eedf871ab0bc0d077b6",
        strip_prefix = "async-lock-2.5.0",
        build_file = Label("//cargo/remote:BUILD.async-lock-2.5.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_stream__0_3_3",
        url = "https://crates.io/api/v1/crates/async-stream/0.3.3/download",
        type = "tar.gz",
        sha256 = "dad5c83079eae9969be7fadefe640a1c566901f05ff91ab221de4b6f68d9507e",
        strip_prefix = "async-stream-0.3.3",
        build_file = Label("//cargo/remote:BUILD.async-stream-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_stream_impl__0_3_3",
        url = "https://crates.io/api/v1/crates/async-stream-impl/0.3.3/download",
        type = "tar.gz",
        sha256 = "10f203db73a71dfa2fb6dd22763990fa26f3d2625a6da2da900d23b87d26be27",
        strip_prefix = "async-stream-impl-0.3.3",
        build_file = Label("//cargo/remote:BUILD.async-stream-impl-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__async_trait__0_1_53",
        url = "https://crates.io/api/v1/crates/async-trait/0.1.53/download",
        type = "tar.gz",
        sha256 = "ed6aa3524a2dfcf9fe180c51eae2b58738348d819517ceadf95789c51fff7600",
        strip_prefix = "async-trait-0.1.53",
        build_file = Label("//cargo/remote:BUILD.async-trait-0.1.53.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__atty__0_2_14",
        url = "https://crates.io/api/v1/crates/atty/0.2.14/download",
        type = "tar.gz",
        sha256 = "d9b39be18770d11421cdb1b9947a45dd3f37e93092cbf377614828a319d5fee8",
        strip_prefix = "atty-0.2.14",
        build_file = Label("//cargo/remote:BUILD.atty-0.2.14.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__autocfg__1_1_0",
        url = "https://crates.io/api/v1/crates/autocfg/1.1.0/download",
        type = "tar.gz",
        sha256 = "d468802bab17cbc0cc575e9b053f41e72aa36bfa6b7f55e3529ffa43161b97fa",
        strip_prefix = "autocfg-1.1.0",
        build_file = Label("//cargo/remote:BUILD.autocfg-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__backoff__0_4_0",
        url = "https://crates.io/api/v1/crates/backoff/0.4.0/download",
        type = "tar.gz",
        sha256 = "b62ddb9cb1ec0a098ad4bbf9344d0713fa193ae1a80af55febcff2627b6a00c1",
        strip_prefix = "backoff-0.4.0",
        build_file = Label("//cargo/remote:BUILD.backoff-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__backtrace__0_3_64",
        url = "https://crates.io/api/v1/crates/backtrace/0.3.64/download",
        type = "tar.gz",
        sha256 = "5e121dee8023ce33ab248d9ce1493df03c3b38a659b240096fcbd7048ff9c31f",
        strip_prefix = "backtrace-0.3.64",
        build_file = Label("//cargo/remote:BUILD.backtrace-0.3.64.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__base64__0_13_0",
        url = "https://crates.io/api/v1/crates/base64/0.13.0/download",
        type = "tar.gz",
        sha256 = "904dfeac50f3cdaba28fc6f57fdcddb75f49ed61346676a78c4ffe55877802fd",
        strip_prefix = "base64-0.13.0",
        build_file = Label("//cargo/remote:BUILD.base64-0.13.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bitflags__1_3_2",
        url = "https://crates.io/api/v1/crates/bitflags/1.3.2/download",
        type = "tar.gz",
        sha256 = "bef38d45163c2f1dde094a7dfd33ccf595c92905c8f8f4fdc18d06fb1037718a",
        strip_prefix = "bitflags-1.3.2",
        build_file = Label("//cargo/remote:BUILD.bitflags-1.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__blake2b_simd__0_5_11",
        url = "https://crates.io/api/v1/crates/blake2b_simd/0.5.11/download",
        type = "tar.gz",
        sha256 = "afa748e348ad3be8263be728124b24a24f268266f6f5d58af9d75f6a40b5c587",
        strip_prefix = "blake2b_simd-0.5.11",
        build_file = Label("//cargo/remote:BUILD.blake2b_simd-0.5.11.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__block_buffer__0_10_2",
        url = "https://crates.io/api/v1/crates/block-buffer/0.10.2/download",
        type = "tar.gz",
        sha256 = "0bf7fe51849ea569fd452f37822f606a5cabb684dc918707a0193fd4664ff324",
        strip_prefix = "block-buffer-0.10.2",
        build_file = Label("//cargo/remote:BUILD.block-buffer-0.10.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__brotli__3_3_3",
        url = "https://crates.io/api/v1/crates/brotli/3.3.3/download",
        type = "tar.gz",
        sha256 = "f838e47a451d5a8fa552371f80024dd6ace9b7acdf25c4c3d0f9bc6816fb1c39",
        strip_prefix = "brotli-3.3.3",
        build_file = Label("//cargo/remote:BUILD.brotli-3.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__brotli_decompressor__2_3_2",
        url = "https://crates.io/api/v1/crates/brotli-decompressor/2.3.2/download",
        type = "tar.gz",
        sha256 = "59ad2d4653bf5ca36ae797b1f4bb4dbddb60ce49ca4aed8a2ce4829f60425b80",
        strip_prefix = "brotli-decompressor-2.3.2",
        build_file = Label("//cargo/remote:BUILD.brotli-decompressor-2.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bstr__0_2_17",
        url = "https://crates.io/api/v1/crates/bstr/0.2.17/download",
        type = "tar.gz",
        sha256 = "ba3569f383e8f1598449f1a423e72e99569137b47740b1da11ef19af3d5c3223",
        strip_prefix = "bstr-0.2.17",
        build_file = Label("//cargo/remote:BUILD.bstr-0.2.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bumpalo__3_9_1",
        url = "https://crates.io/api/v1/crates/bumpalo/3.9.1/download",
        type = "tar.gz",
        sha256 = "a4a45a46ab1f2412e53d3a0ade76ffad2025804294569aae387231a0cd6e0899",
        strip_prefix = "bumpalo-3.9.1",
        build_file = Label("//cargo/remote:BUILD.bumpalo-3.9.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bytecount__0_6_2",
        url = "https://crates.io/api/v1/crates/bytecount/0.6.2/download",
        type = "tar.gz",
        sha256 = "72feb31ffc86498dacdbd0fcebb56138e7177a8cc5cea4516031d15ae85a742e",
        strip_prefix = "bytecount-0.6.2",
        build_file = Label("//cargo/remote:BUILD.bytecount-0.6.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__byteorder__1_4_3",
        url = "https://crates.io/api/v1/crates/byteorder/1.4.3/download",
        type = "tar.gz",
        sha256 = "14c189c53d098945499cdfa7ecc63567cf3886b3332b312a5b4585d8d3a6a610",
        strip_prefix = "byteorder-1.4.3",
        build_file = Label("//cargo/remote:BUILD.byteorder-1.4.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__bytes__1_1_0",
        url = "https://crates.io/api/v1/crates/bytes/1.1.0/download",
        type = "tar.gz",
        sha256 = "c4872d67bab6358e59559027aa3b9157c53d9358c51423c17554809a8858e0f8",
        strip_prefix = "bytes-1.1.0",
        build_file = Label("//cargo/remote:BUILD.bytes-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cache_padded__1_2_0",
        url = "https://crates.io/api/v1/crates/cache-padded/1.2.0/download",
        type = "tar.gz",
        sha256 = "c1db59621ec70f09c5e9b597b220c7a2b43611f4710dc03ceb8748637775692c",
        strip_prefix = "cache-padded-1.2.0",
        build_file = Label("//cargo/remote:BUILD.cache-padded-1.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__camino__1_0_7",
        url = "https://crates.io/api/v1/crates/camino/1.0.7/download",
        type = "tar.gz",
        sha256 = "6f3132262930b0522068049f5870a856ab8affc80c70d08b6ecb785771a6fc23",
        strip_prefix = "camino-1.0.7",
        build_file = Label("//cargo/remote:BUILD.camino-1.0.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cargo_platform__0_1_2",
        url = "https://crates.io/api/v1/crates/cargo-platform/0.1.2/download",
        type = "tar.gz",
        sha256 = "cbdb825da8a5df079a43676dbe042702f1707b1109f713a01420fbb4cc71fa27",
        strip_prefix = "cargo-platform-0.1.2",
        build_file = Label("//cargo/remote:BUILD.cargo-platform-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cargo_metadata__0_14_2",
        url = "https://crates.io/api/v1/crates/cargo_metadata/0.14.2/download",
        type = "tar.gz",
        sha256 = "4acbb09d9ee8e23699b9634375c72795d095bf268439da88562cf9b501f181fa",
        strip_prefix = "cargo_metadata-0.14.2",
        build_file = Label("//cargo/remote:BUILD.cargo_metadata-0.14.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cc__1_0_73",
        url = "https://crates.io/api/v1/crates/cc/1.0.73/download",
        type = "tar.gz",
        sha256 = "2fff2a6927b3bb87f9595d67196a70493f627687a71d87a0d692242c33f58c11",
        strip_prefix = "cc-1.0.73",
        build_file = Label("//cargo/remote:BUILD.cc-1.0.73.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cfg_if__0_1_10",
        url = "https://crates.io/api/v1/crates/cfg-if/0.1.10/download",
        type = "tar.gz",
        sha256 = "4785bdd1c96b2a846b2bd7cc02e86b6b3dbf14e7e53446c4f54c92a361040822",
        strip_prefix = "cfg-if-0.1.10",
        build_file = Label("//cargo/remote:BUILD.cfg-if-0.1.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cfg_if__1_0_0",
        url = "https://crates.io/api/v1/crates/cfg-if/1.0.0/download",
        type = "tar.gz",
        sha256 = "baf1de4339761588bc0619e3cbc0120ee582ebb74b53b4efbf79117bd2da40fd",
        strip_prefix = "cfg-if-1.0.0",
        build_file = Label("//cargo/remote:BUILD.cfg-if-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__chrono__0_4_19",
        url = "https://crates.io/api/v1/crates/chrono/0.4.19/download",
        type = "tar.gz",
        sha256 = "670ad68c9088c2a963aaa298cb369688cf3f9465ce5e2d4ca10e6e0098a1ce73",
        strip_prefix = "chrono-0.4.19",
        build_file = Label("//cargo/remote:BUILD.chrono-0.4.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__clap__2_34_0",
        url = "https://crates.io/api/v1/crates/clap/2.34.0/download",
        type = "tar.gz",
        sha256 = "a0610544180c38b88101fecf2dd634b174a62eef6946f84dfc6a7127512b381c",
        strip_prefix = "clap-2.34.0",
        build_file = Label("//cargo/remote:BUILD.clap-2.34.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__clap__3_1_6",
        url = "https://crates.io/api/v1/crates/clap/3.1.6/download",
        type = "tar.gz",
        sha256 = "d8c93436c21e4698bacadf42917db28b23017027a4deccb35dbe47a7e7840123",
        strip_prefix = "clap-3.1.6",
        build_file = Label("//cargo/remote:BUILD.clap-3.1.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__clap_derive__3_1_4",
        url = "https://crates.io/api/v1/crates/clap_derive/3.1.4/download",
        type = "tar.gz",
        sha256 = "da95d038ede1a964ce99f49cbe27a7fb538d1da595e4b4f70b8c8f338d17bf16",
        strip_prefix = "clap_derive-3.1.4",
        build_file = Label("//cargo/remote:BUILD.clap_derive-3.1.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__color_eyre__0_5_11",
        url = "https://crates.io/api/v1/crates/color-eyre/0.5.11/download",
        type = "tar.gz",
        sha256 = "1f1885697ee8a177096d42f158922251a41973117f6d8a234cee94b9509157b7",
        strip_prefix = "color-eyre-0.5.11",
        build_file = Label("//cargo/remote:BUILD.color-eyre-0.5.11.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__color_spantrace__0_1_6",
        url = "https://crates.io/api/v1/crates/color-spantrace/0.1.6/download",
        type = "tar.gz",
        sha256 = "b6eee477a4a8a72f4addd4de416eb56d54bc307b284d6601bafdee1f4ea462d1",
        strip_prefix = "color-spantrace-0.1.6",
        build_file = Label("//cargo/remote:BUILD.color-spantrace-0.1.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__combine__3_8_1",
        url = "https://crates.io/api/v1/crates/combine/3.8.1/download",
        type = "tar.gz",
        sha256 = "da3da6baa321ec19e1cc41d31bf599f00c783d0517095cdaf0332e3fe8d20680",
        strip_prefix = "combine-3.8.1",
        build_file = Label("//cargo/remote:BUILD.combine-3.8.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__concurrent_queue__1_2_2",
        url = "https://crates.io/api/v1/crates/concurrent-queue/1.2.2/download",
        type = "tar.gz",
        sha256 = "30ed07550be01594c6026cff2a1d7fe9c8f683caa798e12b68694ac9e88286a3",
        strip_prefix = "concurrent-queue-1.2.2",
        build_file = Label("//cargo/remote:BUILD.concurrent-queue-1.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__constant_time_eq__0_1_5",
        url = "https://crates.io/api/v1/crates/constant_time_eq/0.1.5/download",
        type = "tar.gz",
        sha256 = "245097e9a4535ee1e3e3931fcfcd55a796a44c643e8596ff6566d68f09b87bbc",
        strip_prefix = "constant_time_eq-0.1.5",
        build_file = Label("//cargo/remote:BUILD.constant_time_eq-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__convert_case__0_4_0",
        url = "https://crates.io/api/v1/crates/convert_case/0.4.0/download",
        type = "tar.gz",
        sha256 = "6245d59a3e82a7fc217c5828a6692dbc6dfb63a0c8c90495621f7b9d79704a0e",
        strip_prefix = "convert_case-0.4.0",
        build_file = Label("//cargo/remote:BUILD.convert_case-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__core_foundation__0_9_3",
        url = "https://crates.io/api/v1/crates/core-foundation/0.9.3/download",
        type = "tar.gz",
        sha256 = "194a7a9e6de53fa55116934067c844d9d749312f75c6f6d0980e8c252f8c2146",
        strip_prefix = "core-foundation-0.9.3",
        build_file = Label("//cargo/remote:BUILD.core-foundation-0.9.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__core_foundation_sys__0_8_3",
        url = "https://crates.io/api/v1/crates/core-foundation-sys/0.8.3/download",
        type = "tar.gz",
        sha256 = "5827cebf4670468b8772dd191856768aedcb1b0278a04f989f7766351917b9dc",
        strip_prefix = "core-foundation-sys-0.8.3",
        build_file = Label("//cargo/remote:BUILD.core-foundation-sys-0.8.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__countme__2_0_4",
        url = "https://crates.io/api/v1/crates/countme/2.0.4/download",
        type = "tar.gz",
        sha256 = "328b822bdcba4d4e402be8d9adb6eebf269f969f8eadef977a553ff3c4fbcb58",
        strip_prefix = "countme-2.0.4",
        build_file = Label("//cargo/remote:BUILD.countme-2.0.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__cpufeatures__0_2_2",
        url = "https://crates.io/api/v1/crates/cpufeatures/0.2.2/download",
        type = "tar.gz",
        sha256 = "59a6001667ab124aebae2a495118e11d30984c3a653e99d86d58971708cf5e4b",
        strip_prefix = "cpufeatures-0.2.2",
        build_file = Label("//cargo/remote:BUILD.cpufeatures-0.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crc32fast__1_3_2",
        url = "https://crates.io/api/v1/crates/crc32fast/1.3.2/download",
        type = "tar.gz",
        sha256 = "b540bd8bc810d3885c6ea91e2018302f68baba2129ab3e88f32389ee9370880d",
        strip_prefix = "crc32fast-1.3.2",
        build_file = Label("//cargo/remote:BUILD.crc32fast-1.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_channel__0_5_4",
        url = "https://crates.io/api/v1/crates/crossbeam-channel/0.5.4/download",
        type = "tar.gz",
        sha256 = "5aaa7bd5fb665c6864b5f963dd9097905c54125909c7aa94c9e18507cdbe6c53",
        strip_prefix = "crossbeam-channel-0.5.4",
        build_file = Label("//cargo/remote:BUILD.crossbeam-channel-0.5.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_epoch__0_8_2",
        url = "https://crates.io/api/v1/crates/crossbeam-epoch/0.8.2/download",
        type = "tar.gz",
        sha256 = "058ed274caafc1f60c4997b5fc07bf7dc7cca454af7c6e81edffe5f33f70dace",
        strip_prefix = "crossbeam-epoch-0.8.2",
        build_file = Label("//cargo/remote:BUILD.crossbeam-epoch-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_utils__0_7_2",
        url = "https://crates.io/api/v1/crates/crossbeam-utils/0.7.2/download",
        type = "tar.gz",
        sha256 = "c3c7c73a2d1e9fc0886a08b93e98eb643461230d5f1925e4036204d5f2e261a8",
        strip_prefix = "crossbeam-utils-0.7.2",
        build_file = Label("//cargo/remote:BUILD.crossbeam-utils-0.7.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crossbeam_utils__0_8_8",
        url = "https://crates.io/api/v1/crates/crossbeam-utils/0.8.8/download",
        type = "tar.gz",
        sha256 = "0bf124c720b7686e3c2663cf54062ab0f68a88af2fb6a030e87e30bf721fcb38",
        strip_prefix = "crossbeam-utils-0.8.8",
        build_file = Label("//cargo/remote:BUILD.crossbeam-utils-0.8.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__crypto_common__0_1_3",
        url = "https://crates.io/api/v1/crates/crypto-common/0.1.3/download",
        type = "tar.gz",
        sha256 = "57952ca27b5e3606ff4dd79b0020231aaf9d6aa76dc05fd30137538c50bd3ce8",
        strip_prefix = "crypto-common-0.1.3",
        build_file = Label("//cargo/remote:BUILD.crypto-common-0.1.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__csv__1_1_6",
        url = "https://crates.io/api/v1/crates/csv/1.1.6/download",
        type = "tar.gz",
        sha256 = "22813a6dc45b335f9bade10bf7271dc477e81113e89eb251a0bc2a8a81c536e1",
        strip_prefix = "csv-1.1.6",
        build_file = Label("//cargo/remote:BUILD.csv-1.1.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__csv_core__0_1_10",
        url = "https://crates.io/api/v1/crates/csv-core/0.1.10/download",
        type = "tar.gz",
        sha256 = "2b2466559f260f48ad25fe6317b3c8dac77b5bdb5763ac7d9d6103530663bc90",
        strip_prefix = "csv-core-0.1.10",
        build_file = Label("//cargo/remote:BUILD.csv-core-0.1.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__dashmap__5_2_0",
        url = "https://crates.io/api/v1/crates/dashmap/5.2.0/download",
        type = "tar.gz",
        sha256 = "4c8858831f7781322e539ea39e72449c46b059638250c14344fec8d0aa6e539c",
        strip_prefix = "dashmap-5.2.0",
        build_file = Label("//cargo/remote:BUILD.dashmap-5.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__deno_core__0_118_0",
        url = "https://crates.io/api/v1/crates/deno_core/0.118.0/download",
        type = "tar.gz",
        sha256 = "68be6990e070141d1413797b84d8a05d3eb426fa18a9962ecf21d2f045014db4",
        strip_prefix = "deno_core-0.118.0",
        build_file = Label("//cargo/remote:BUILD.deno_core-0.118.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__derivative__2_2_0",
        url = "https://crates.io/api/v1/crates/derivative/2.2.0/download",
        type = "tar.gz",
        sha256 = "fcc3dd5e9e9c0b295d6e1e4d811fb6f157d5ffd784b8d202fc62eac8035a770b",
        strip_prefix = "derivative-2.2.0",
        build_file = Label("//cargo/remote:BUILD.derivative-2.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__derive_more__0_99_17",
        url = "https://crates.io/api/v1/crates/derive_more/0.99.17/download",
        type = "tar.gz",
        sha256 = "4fb810d30a7c1953f91334de7244731fc3f3c10d7fe163338a35b9f640960321",
        strip_prefix = "derive_more-0.99.17",
        build_file = Label("//cargo/remote:BUILD.derive_more-0.99.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__difflib__0_4_0",
        url = "https://crates.io/api/v1/crates/difflib/0.4.0/download",
        type = "tar.gz",
        sha256 = "6184e33543162437515c2e2b48714794e37845ec9851711914eec9d308f6ebe8",
        strip_prefix = "difflib-0.4.0",
        build_file = Label("//cargo/remote:BUILD.difflib-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__digest__0_10_3",
        url = "https://crates.io/api/v1/crates/digest/0.10.3/download",
        type = "tar.gz",
        sha256 = "f2fb860ca6fafa5552fb6d0e816a69c8e49f0908bf524e30a90d97c85892d506",
        strip_prefix = "digest-0.10.3",
        build_file = Label("//cargo/remote:BUILD.digest-0.10.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__directories__4_0_1",
        url = "https://crates.io/api/v1/crates/directories/4.0.1/download",
        type = "tar.gz",
        sha256 = "f51c5d4ddabd36886dd3e1438cb358cdcb0d7c499cb99cb4ac2e38e18b5cb210",
        strip_prefix = "directories-4.0.1",
        build_file = Label("//cargo/remote:BUILD.directories-4.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__directories_next__2_0_0",
        url = "https://crates.io/api/v1/crates/directories-next/2.0.0/download",
        type = "tar.gz",
        sha256 = "339ee130d97a610ea5a5872d2bbb130fdf68884ff09d3028b81bec8a1ac23bbc",
        strip_prefix = "directories-next-2.0.0",
        build_file = Label("//cargo/remote:BUILD.directories-next-2.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__dirs__1_0_5",
        url = "https://crates.io/api/v1/crates/dirs/1.0.5/download",
        type = "tar.gz",
        sha256 = "3fd78930633bd1c6e35c4b42b1df7b0cbc6bc191146e512bb3bedf243fcc3901",
        strip_prefix = "dirs-1.0.5",
        build_file = Label("//cargo/remote:BUILD.dirs-1.0.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__dirs_sys__0_3_7",
        url = "https://crates.io/api/v1/crates/dirs-sys/0.3.7/download",
        type = "tar.gz",
        sha256 = "1b1d1d91c932ef41c0f2663aa8b0ca0342d444d842c06914aa0a7e352d0bada6",
        strip_prefix = "dirs-sys-0.3.7",
        build_file = Label("//cargo/remote:BUILD.dirs-sys-0.3.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__dirs_sys_next__0_1_2",
        url = "https://crates.io/api/v1/crates/dirs-sys-next/0.1.2/download",
        type = "tar.gz",
        sha256 = "4ebda144c4fe02d1f7ea1a7d9641b6fc6b580adcfa024ae48797ecdeb6825b4d",
        strip_prefix = "dirs-sys-next-0.1.2",
        build_file = Label("//cargo/remote:BUILD.dirs-sys-next-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__displaydoc__0_2_3",
        url = "https://crates.io/api/v1/crates/displaydoc/0.2.3/download",
        type = "tar.gz",
        sha256 = "3bf95dc3f046b9da4f2d51833c0d3547d8564ef6910f5c1ed130306a75b92886",
        strip_prefix = "displaydoc-0.2.3",
        build_file = Label("//cargo/remote:BUILD.displaydoc-0.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__downcast__0_11_0",
        url = "https://crates.io/api/v1/crates/downcast/0.11.0/download",
        type = "tar.gz",
        sha256 = "1435fa1053d8b2fbbe9be7e97eca7f33d37b28409959813daefc1446a14247f1",
        strip_prefix = "downcast-0.11.0",
        build_file = Label("//cargo/remote:BUILD.downcast-0.11.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__dyn_clone__1_0_5",
        url = "https://crates.io/api/v1/crates/dyn-clone/1.0.5/download",
        type = "tar.gz",
        sha256 = "21e50f3adc76d6a43f5ed73b698a87d0760ca74617f60f7c3b879003536fdd28",
        strip_prefix = "dyn-clone-1.0.5",
        build_file = Label("//cargo/remote:BUILD.dyn-clone-1.0.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__either__1_6_1",
        url = "https://crates.io/api/v1/crates/either/1.6.1/download",
        type = "tar.gz",
        sha256 = "e78d4f1cc4ae33bbfc157ed5d5a5ef3bc29227303d595861deb238fcec4e9457",
        strip_prefix = "either-1.6.1",
        build_file = Label("//cargo/remote:BUILD.either-1.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__encode_unicode__0_3_6",
        url = "https://crates.io/api/v1/crates/encode_unicode/0.3.6/download",
        type = "tar.gz",
        sha256 = "a357d28ed41a50f9c765dbfe56cbc04a64e53e5fc58ba79fbc34c10ef3df831f",
        strip_prefix = "encode_unicode-0.3.6",
        build_file = Label("//cargo/remote:BUILD.encode_unicode-0.3.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__encoding_rs__0_8_30",
        url = "https://crates.io/api/v1/crates/encoding_rs/0.8.30/download",
        type = "tar.gz",
        sha256 = "7896dc8abb250ffdda33912550faa54c88ec8b998dec0b2c55ab224921ce11df",
        strip_prefix = "encoding_rs-0.8.30",
        build_file = Label("//cargo/remote:BUILD.encoding_rs-0.8.30.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__error_chain__0_12_4",
        url = "https://crates.io/api/v1/crates/error-chain/0.12.4/download",
        type = "tar.gz",
        sha256 = "2d2f06b9cac1506ece98fe3231e3cc9c4410ec3d5b1f24ae1c8946f0742cdefc",
        strip_prefix = "error-chain-0.12.4",
        build_file = Label("//cargo/remote:BUILD.error-chain-0.12.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__event_listener__2_5_2",
        url = "https://crates.io/api/v1/crates/event-listener/2.5.2/download",
        type = "tar.gz",
        sha256 = "77f3309417938f28bf8228fcff79a4a37103981e3e186d2ccd19c74b38f4eb71",
        strip_prefix = "event-listener-2.5.2",
        build_file = Label("//cargo/remote:BUILD.event-listener-2.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__eyre__0_6_7",
        url = "https://crates.io/api/v1/crates/eyre/0.6.7/download",
        type = "tar.gz",
        sha256 = "9289ed2c0440a6536e65119725cf91fc2c6b5e513bfd2e36e1134d7cca6ca12f",
        strip_prefix = "eyre-0.6.7",
        build_file = Label("//cargo/remote:BUILD.eyre-0.6.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__failure__0_1_8",
        url = "https://crates.io/api/v1/crates/failure/0.1.8/download",
        type = "tar.gz",
        sha256 = "d32e9bd16cc02eae7db7ef620b392808b89f6a5e16bb3497d159c6b92a0f4f86",
        strip_prefix = "failure-0.1.8",
        build_file = Label("//cargo/remote:BUILD.failure-0.1.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__failure_derive__0_1_8",
        url = "https://crates.io/api/v1/crates/failure_derive/0.1.8/download",
        type = "tar.gz",
        sha256 = "aa4da3c766cd7a0db8242e326e9e4e081edd567072893ed320008189715366a4",
        strip_prefix = "failure_derive-0.1.8",
        build_file = Label("//cargo/remote:BUILD.failure_derive-0.1.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fastrand__1_7_0",
        url = "https://crates.io/api/v1/crates/fastrand/1.7.0/download",
        type = "tar.gz",
        sha256 = "c3fcf0cee53519c866c09b5de1f6c56ff9d647101f81c1964fa632e148896cdf",
        strip_prefix = "fastrand-1.7.0",
        build_file = Label("//cargo/remote:BUILD.fastrand-1.7.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__filetime__0_2_15",
        url = "https://crates.io/api/v1/crates/filetime/0.2.15/download",
        type = "tar.gz",
        sha256 = "975ccf83d8d9d0d84682850a38c8169027be83368805971cc4f238c2b245bc98",
        strip_prefix = "filetime-0.2.15",
        build_file = Label("//cargo/remote:BUILD.filetime-0.2.15.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fixedbitset__0_4_1",
        url = "https://crates.io/api/v1/crates/fixedbitset/0.4.1/download",
        type = "tar.gz",
        sha256 = "279fb028e20b3c4c320317955b77c5e0c9701f05a1d309905d6fc702cdc5053e",
        strip_prefix = "fixedbitset-0.4.1",
        build_file = Label("//cargo/remote:BUILD.fixedbitset-0.4.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__flate2__1_0_22",
        url = "https://crates.io/api/v1/crates/flate2/1.0.22/download",
        type = "tar.gz",
        sha256 = "1e6988e897c1c9c485f43b47a529cef42fde0547f9d8d41a7062518f1d8fc53f",
        strip_prefix = "flate2-1.0.22",
        build_file = Label("//cargo/remote:BUILD.flate2-1.0.22.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__float_cmp__0_9_0",
        url = "https://crates.io/api/v1/crates/float-cmp/0.9.0/download",
        type = "tar.gz",
        sha256 = "98de4bbd547a563b716d8dfa9aad1cb19bfab00f4fa09a6a4ed21dbcf44ce9c4",
        strip_prefix = "float-cmp-0.9.0",
        build_file = Label("//cargo/remote:BUILD.float-cmp-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fnv__1_0_7",
        url = "https://crates.io/api/v1/crates/fnv/1.0.7/download",
        type = "tar.gz",
        sha256 = "3f9eec918d3f24069decb9af1554cad7c880e2da24a9afd88aca000531ab82c1",
        strip_prefix = "fnv-1.0.7",
        build_file = Label("//cargo/remote:BUILD.fnv-1.0.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__foreign_types__0_3_2",
        url = "https://crates.io/api/v1/crates/foreign-types/0.3.2/download",
        type = "tar.gz",
        sha256 = "f6f339eb8adc052cd2ca78910fda869aefa38d22d5cb648e6485e4d3fc06f3b1",
        strip_prefix = "foreign-types-0.3.2",
        build_file = Label("//cargo/remote:BUILD.foreign-types-0.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__foreign_types_shared__0_1_1",
        url = "https://crates.io/api/v1/crates/foreign-types-shared/0.1.1/download",
        type = "tar.gz",
        sha256 = "00b0228411908ca8685dba7fc2cdd70ec9990a6e753e89b6ac91a84c40fbaf4b",
        strip_prefix = "foreign-types-shared-0.1.1",
        build_file = Label("//cargo/remote:BUILD.foreign-types-shared-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__form_urlencoded__1_0_1",
        url = "https://crates.io/api/v1/crates/form_urlencoded/1.0.1/download",
        type = "tar.gz",
        sha256 = "5fc25a87fa4fd2094bffb06925852034d90a17f0d1e05197d4956d3555752191",
        strip_prefix = "form_urlencoded-1.0.1",
        build_file = Label("//cargo/remote:BUILD.form_urlencoded-1.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fragile__1_2_0",
        url = "https://crates.io/api/v1/crates/fragile/1.2.0/download",
        type = "tar.gz",
        sha256 = "e9d758e60b45e8d749c89c1b389ad8aee550f86aa12e2b9298b546dda7a82ab1",
        strip_prefix = "fragile-1.2.0",
        build_file = Label("//cargo/remote:BUILD.fragile-1.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fsevent__0_4_0",
        url = "https://crates.io/api/v1/crates/fsevent/0.4.0/download",
        type = "tar.gz",
        sha256 = "5ab7d1bd1bd33cc98b0889831b72da23c0aa4df9cec7e0702f46ecea04b35db6",
        strip_prefix = "fsevent-0.4.0",
        build_file = Label("//cargo/remote:BUILD.fsevent-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fsevent_sys__2_0_1",
        url = "https://crates.io/api/v1/crates/fsevent-sys/2.0.1/download",
        type = "tar.gz",
        sha256 = "f41b048a94555da0f42f1d632e2e19510084fb8e303b0daa2816e733fb3644a0",
        strip_prefix = "fsevent-sys-2.0.1",
        build_file = Label("//cargo/remote:BUILD.fsevent-sys-2.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fslock__0_1_8",
        url = "https://crates.io/api/v1/crates/fslock/0.1.8/download",
        type = "tar.gz",
        sha256 = "57eafdd0c16f57161105ae1b98a1238f97645f2f588438b2949c99a2af9616bf",
        strip_prefix = "fslock-0.1.8",
        build_file = Label("//cargo/remote:BUILD.fslock-0.1.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fuchsia_zircon__0_3_3",
        url = "https://crates.io/api/v1/crates/fuchsia-zircon/0.3.3/download",
        type = "tar.gz",
        sha256 = "2e9763c69ebaae630ba35f74888db465e49e259ba1bc0eda7d06f4a067615d82",
        strip_prefix = "fuchsia-zircon-0.3.3",
        build_file = Label("//cargo/remote:BUILD.fuchsia-zircon-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__fuchsia_zircon_sys__0_3_3",
        url = "https://crates.io/api/v1/crates/fuchsia-zircon-sys/0.3.3/download",
        type = "tar.gz",
        sha256 = "3dcaa9ae7725d12cdb85b3ad99a434db70b468c09ded17e012d86b5c1010f7a7",
        strip_prefix = "fuchsia-zircon-sys-0.3.3",
        build_file = Label("//cargo/remote:BUILD.fuchsia-zircon-sys-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures__0_3_21",
        url = "https://crates.io/api/v1/crates/futures/0.3.21/download",
        type = "tar.gz",
        sha256 = "f73fe65f54d1e12b726f517d3e2135ca3125a437b6d998caf1962961f7172d9e",
        strip_prefix = "futures-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_channel__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-channel/0.3.21/download",
        type = "tar.gz",
        sha256 = "c3083ce4b914124575708913bca19bfe887522d6e2e6d0952943f5eac4a74010",
        strip_prefix = "futures-channel-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-channel-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_core__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-core/0.3.21/download",
        type = "tar.gz",
        sha256 = "0c09fd04b7e4073ac7156a9539b57a484a8ea920f79c7c675d05d289ab6110d3",
        strip_prefix = "futures-core-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-core-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_executor__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-executor/0.3.21/download",
        type = "tar.gz",
        sha256 = "9420b90cfa29e327d0429f19be13e7ddb68fa1cccb09d65e5706b8c7a749b8a6",
        strip_prefix = "futures-executor-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-executor-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_io__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-io/0.3.21/download",
        type = "tar.gz",
        sha256 = "fc4045962a5a5e935ee2fdedaa4e08284547402885ab326734432bed5d12966b",
        strip_prefix = "futures-io-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-io-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_lite__1_12_0",
        url = "https://crates.io/api/v1/crates/futures-lite/1.12.0/download",
        type = "tar.gz",
        sha256 = "7694489acd39452c77daa48516b894c153f192c3578d5a839b62c58099fcbf48",
        strip_prefix = "futures-lite-1.12.0",
        build_file = Label("//cargo/remote:BUILD.futures-lite-1.12.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_macro__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-macro/0.3.21/download",
        type = "tar.gz",
        sha256 = "33c1e13800337f4d4d7a316bf45a567dbcb6ffe087f16424852d97e97a91f512",
        strip_prefix = "futures-macro-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-macro-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_sink__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-sink/0.3.21/download",
        type = "tar.gz",
        sha256 = "21163e139fa306126e6eedaf49ecdb4588f939600f0b1e770f4205ee4b7fa868",
        strip_prefix = "futures-sink-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-sink-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_task__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-task/0.3.21/download",
        type = "tar.gz",
        sha256 = "57c66a976bf5909d801bbef33416c41372779507e7a6b3a5e25e4749c58f776a",
        strip_prefix = "futures-task-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-task-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__futures_util__0_3_21",
        url = "https://crates.io/api/v1/crates/futures-util/0.3.21/download",
        type = "tar.gz",
        sha256 = "d8b7abd5d659d9b90c8cba917f6ec750a74e2dc23902ef9cd4cc8c8b22e6036a",
        strip_prefix = "futures-util-0.3.21",
        build_file = Label("//cargo/remote:BUILD.futures-util-0.3.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__generic_array__0_14_5",
        url = "https://crates.io/api/v1/crates/generic-array/0.14.5/download",
        type = "tar.gz",
        sha256 = "fd48d33ec7f05fbfa152300fdad764757cbded343c1aa1cff2fbaf4134851803",
        strip_prefix = "generic-array-0.14.5",
        build_file = Label("//cargo/remote:BUILD.generic-array-0.14.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__getrandom__0_1_16",
        url = "https://crates.io/api/v1/crates/getrandom/0.1.16/download",
        type = "tar.gz",
        sha256 = "8fc3cb4d91f53b50155bdcfd23f6a4c39ae1969c2ae85982b135750cccaf5fce",
        strip_prefix = "getrandom-0.1.16",
        build_file = Label("//cargo/remote:BUILD.getrandom-0.1.16.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__getrandom__0_2_6",
        url = "https://crates.io/api/v1/crates/getrandom/0.2.6/download",
        type = "tar.gz",
        sha256 = "9be70c98951c83b8d2f8f60d7065fa6d5146873094452a1008da8c2f1e4205ad",
        strip_prefix = "getrandom-0.2.6",
        build_file = Label("//cargo/remote:BUILD.getrandom-0.2.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__gimli__0_26_1",
        url = "https://crates.io/api/v1/crates/gimli/0.26.1/download",
        type = "tar.gz",
        sha256 = "78cc372d058dcf6d5ecd98510e7fbc9e5aec4d21de70f65fea8fecebcd881bd4",
        strip_prefix = "gimli-0.26.1",
        build_file = Label("//cargo/remote:BUILD.gimli-0.26.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__git_url_parse__0_4_0",
        url = "https://crates.io/api/v1/crates/git-url-parse/0.4.0/download",
        type = "tar.gz",
        sha256 = "4b223a4c4957b1b46e7bd24cb361bef01dbedff634463e57dfb1b1863dff704c",
        strip_prefix = "git-url-parse-0.4.0",
        build_file = Label("//cargo/remote:BUILD.git-url-parse-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__git2__0_13_25",
        url = "https://crates.io/api/v1/crates/git2/0.13.25/download",
        type = "tar.gz",
        sha256 = "f29229cc1b24c0e6062f6e742aa3e256492a5323365e5ed3413599f8a5eff7d6",
        strip_prefix = "git2-0.13.25",
        build_file = Label("//cargo/remote:BUILD.git2-0.13.25.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__glob__0_3_0",
        url = "https://crates.io/api/v1/crates/glob/0.3.0/download",
        type = "tar.gz",
        sha256 = "9b919933a397b79c37e33b77bb2aa3dc8eb6e165ad809e58ff75bc7db2e34574",
        strip_prefix = "glob-0.3.0",
        build_file = Label("//cargo/remote:BUILD.glob-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__graphql_introspection_query__0_2_0",
        url = "https://crates.io/api/v1/crates/graphql-introspection-query/0.2.0/download",
        type = "tar.gz",
        sha256 = "7f2a4732cf5140bd6c082434494f785a19cfb566ab07d1382c3671f5812fed6d",
        strip_prefix = "graphql-introspection-query-0.2.0",
        build_file = Label("//cargo/remote:BUILD.graphql-introspection-query-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__graphql_parser__0_2_3",
        url = "https://crates.io/api/v1/crates/graphql-parser/0.2.3/download",
        type = "tar.gz",
        sha256 = "a5613c31f18676f164112732202124f373bb2103ff017b3b85ca954ea6a66ada",
        strip_prefix = "graphql-parser-0.2.3",
        build_file = Label("//cargo/remote:BUILD.graphql-parser-0.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__graphql_client__0_10_0",
        url = "https://crates.io/api/v1/crates/graphql_client/0.10.0/download",
        type = "tar.gz",
        sha256 = "a9b58571cfc3cc42c3e8ff44fc6cfbb6c0dea17ed22d20f9d8f1efc4e8209a3f",
        strip_prefix = "graphql_client-0.10.0",
        build_file = Label("//cargo/remote:BUILD.graphql_client-0.10.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__graphql_client_codegen__0_10_0",
        url = "https://crates.io/api/v1/crates/graphql_client_codegen/0.10.0/download",
        type = "tar.gz",
        sha256 = "b4bf9cd823359d74ad3d3ecf1afd4a975f4ff2f891cdf9a66744606daf52de8c",
        strip_prefix = "graphql_client_codegen-0.10.0",
        build_file = Label("//cargo/remote:BUILD.graphql_client_codegen-0.10.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__graphql_query_derive__0_10_0",
        url = "https://crates.io/api/v1/crates/graphql_query_derive/0.10.0/download",
        type = "tar.gz",
        sha256 = "e56b093bfda71de1da99758b036f4cc811fd2511c8a76f75680e9ffbd2bb4251",
        strip_prefix = "graphql_query_derive-0.10.0",
        build_file = Label("//cargo/remote:BUILD.graphql_query_derive-0.10.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__h2__0_3_12",
        url = "https://crates.io/api/v1/crates/h2/0.3.12/download",
        type = "tar.gz",
        sha256 = "62eeb471aa3e3c9197aa4bfeabfe02982f6dc96f750486c0bb0009ac58b26d2b",
        strip_prefix = "h2-0.3.12",
        build_file = Label("//cargo/remote:BUILD.h2-0.3.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hashbrown__0_11_2",
        url = "https://crates.io/api/v1/crates/hashbrown/0.11.2/download",
        type = "tar.gz",
        sha256 = "ab5ef0d4909ef3724cc8cce6ccc8572c5c817592e9285f5464f8e86f8bd3726e",
        strip_prefix = "hashbrown-0.11.2",
        build_file = Label("//cargo/remote:BUILD.hashbrown-0.11.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hdrhistogram__7_5_0",
        url = "https://crates.io/api/v1/crates/hdrhistogram/7.5.0/download",
        type = "tar.gz",
        sha256 = "31672b7011be2c4f7456c4ddbcb40e7e9a4a9fad8efe49a6ebaf5f307d0109c0",
        strip_prefix = "hdrhistogram-7.5.0",
        build_file = Label("//cargo/remote:BUILD.hdrhistogram-7.5.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__headers__0_3_7",
        url = "https://crates.io/api/v1/crates/headers/0.3.7/download",
        type = "tar.gz",
        sha256 = "4cff78e5788be1e0ab65b04d306b2ed5092c815ec97ec70f4ebd5aee158aa55d",
        strip_prefix = "headers-0.3.7",
        build_file = Label("//cargo/remote:BUILD.headers-0.3.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__headers_core__0_2_0",
        url = "https://crates.io/api/v1/crates/headers-core/0.2.0/download",
        type = "tar.gz",
        sha256 = "e7f66481bfee273957b1f20485a4ff3362987f85b2c236580d81b4eb7a326429",
        strip_prefix = "headers-core-0.2.0",
        build_file = Label("//cargo/remote:BUILD.headers-core-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__heck__0_3_3",
        url = "https://crates.io/api/v1/crates/heck/0.3.3/download",
        type = "tar.gz",
        sha256 = "6d621efb26863f0e9924c6ac577e8275e5e6b77455db64ffa6c65c904e9e132c",
        strip_prefix = "heck-0.3.3",
        build_file = Label("//cargo/remote:BUILD.heck-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__heck__0_4_0",
        url = "https://crates.io/api/v1/crates/heck/0.4.0/download",
        type = "tar.gz",
        sha256 = "2540771e65fc8cb83cd6e8a237f70c319bd5c29f78ed1084ba5d50eeac86f7f9",
        strip_prefix = "heck-0.4.0",
        build_file = Label("//cargo/remote:BUILD.heck-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hermit_abi__0_1_19",
        url = "https://crates.io/api/v1/crates/hermit-abi/0.1.19/download",
        type = "tar.gz",
        sha256 = "62b467343b94ba476dcb2500d242dadbb39557df889310ac77c5d99100aaac33",
        strip_prefix = "hermit-abi-0.1.19",
        build_file = Label("//cargo/remote:BUILD.hermit-abi-0.1.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hex__0_4_3",
        url = "https://crates.io/api/v1/crates/hex/0.4.3/download",
        type = "tar.gz",
        sha256 = "7f24254aa9a54b5c858eaee2f5bccdb46aaf0e486a595ed5fd8f86ba55232a70",
        strip_prefix = "hex-0.4.3",
        build_file = Label("//cargo/remote:BUILD.hex-0.4.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hotwatch__0_4_6",
        url = "https://crates.io/api/v1/crates/hotwatch/0.4.6/download",
        type = "tar.gz",
        sha256 = "39301670a6f5798b75f36a1b149a379a50df5aa7c71be50f4b41ec6eab445cb8",
        strip_prefix = "hotwatch-0.4.6",
        build_file = Label("//cargo/remote:BUILD.hotwatch-0.4.6.bazel"),
    )

    maybe(
        new_git_repository,
        name = "raze__houston__0_0_0",
        remote = "https://github.com/apollographql/rover.git",
        commit = "c650649682ab891a3b718b5277c3b2e9a5fc5224",
        build_file = Label("//cargo/remote:BUILD.houston-0.0.0.bazel"),
        init_submodules = True,
    )

    maybe(
        http_archive,
        name = "raze__http__0_2_6",
        url = "https://crates.io/api/v1/crates/http/0.2.6/download",
        type = "tar.gz",
        sha256 = "31f4c6746584866f0feabcc69893c5b51beef3831656a968ed7ae254cdc4fd03",
        strip_prefix = "http-0.2.6",
        build_file = Label("//cargo/remote:BUILD.http-0.2.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__http_body__0_4_4",
        url = "https://crates.io/api/v1/crates/http-body/0.4.4/download",
        type = "tar.gz",
        sha256 = "1ff4f84919677303da5f147645dbea6b1881f368d03ac84e1dc09031ebd7b2c6",
        strip_prefix = "http-body-0.4.4",
        build_file = Label("//cargo/remote:BUILD.http-body-0.4.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__http_range_header__0_3_0",
        url = "https://crates.io/api/v1/crates/http-range-header/0.3.0/download",
        type = "tar.gz",
        sha256 = "0bfe8eed0a9285ef776bb792479ea3834e8b94e13d615c2f66d03dd50a435a29",
        strip_prefix = "http-range-header-0.3.0",
        build_file = Label("//cargo/remote:BUILD.http-range-header-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__httparse__1_6_0",
        url = "https://crates.io/api/v1/crates/httparse/1.6.0/download",
        type = "tar.gz",
        sha256 = "9100414882e15fb7feccb4897e5f0ff0ff1ca7d1a86a23208ada4d7a18e6c6c4",
        strip_prefix = "httparse-1.6.0",
        build_file = Label("//cargo/remote:BUILD.httparse-1.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__httpdate__1_0_2",
        url = "https://crates.io/api/v1/crates/httpdate/1.0.2/download",
        type = "tar.gz",
        sha256 = "c4a1e36c821dbe04574f602848a19f742f4fb3c98d40449f11bcad18d6b17421",
        strip_prefix = "httpdate-1.0.2",
        build_file = Label("//cargo/remote:BUILD.httpdate-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__humantime__2_1_0",
        url = "https://crates.io/api/v1/crates/humantime/2.1.0/download",
        type = "tar.gz",
        sha256 = "9a3a5bfb195931eeb336b2a7b4d761daec841b97f947d34394601737a7bba5e4",
        strip_prefix = "humantime-2.1.0",
        build_file = Label("//cargo/remote:BUILD.humantime-2.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hyper__0_14_18",
        url = "https://crates.io/api/v1/crates/hyper/0.14.18/download",
        type = "tar.gz",
        sha256 = "b26ae0a80afebe130861d90abf98e3814a4f28a4c6ffeb5ab8ebb2be311e0ef2",
        strip_prefix = "hyper-0.14.18",
        build_file = Label("//cargo/remote:BUILD.hyper-0.14.18.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hyper_timeout__0_4_1",
        url = "https://crates.io/api/v1/crates/hyper-timeout/0.4.1/download",
        type = "tar.gz",
        sha256 = "bbb958482e8c7be4bc3cf272a766a2b0bf1a6755e7a6ae777f017a31d11b13b1",
        strip_prefix = "hyper-timeout-0.4.1",
        build_file = Label("//cargo/remote:BUILD.hyper-timeout-0.4.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__hyper_tls__0_5_0",
        url = "https://crates.io/api/v1/crates/hyper-tls/0.5.0/download",
        type = "tar.gz",
        sha256 = "d6183ddfa99b85da61a140bea0efc93fdf56ceaa041b37d553518030827f9905",
        strip_prefix = "hyper-tls-0.5.0",
        build_file = Label("//cargo/remote:BUILD.hyper-tls-0.5.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__idna__0_2_3",
        url = "https://crates.io/api/v1/crates/idna/0.2.3/download",
        type = "tar.gz",
        sha256 = "418a0a6fab821475f634efe3ccc45c013f742efe03d853e8d3355d5cb850ecf8",
        strip_prefix = "idna-0.2.3",
        build_file = Label("//cargo/remote:BUILD.idna-0.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__include_dir__0_7_2",
        url = "https://crates.io/api/v1/crates/include_dir/0.7.2/download",
        type = "tar.gz",
        sha256 = "482a2e29200b7eed25d7fdbd14423326760b7f6658d21a4cf12d55a50713c69f",
        strip_prefix = "include_dir-0.7.2",
        build_file = Label("//cargo/remote:BUILD.include_dir-0.7.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__include_dir_macros__0_7_2",
        url = "https://crates.io/api/v1/crates/include_dir_macros/0.7.2/download",
        type = "tar.gz",
        sha256 = "5e074c19deab2501407c91ba1860fa3d6820bfde307db6d8cb851b55a10be89b",
        strip_prefix = "include_dir_macros-0.7.2",
        build_file = Label("//cargo/remote:BUILD.include_dir_macros-0.7.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__indenter__0_3_3",
        url = "https://crates.io/api/v1/crates/indenter/0.3.3/download",
        type = "tar.gz",
        sha256 = "ce23b50ad8242c51a442f3ff322d56b02f08852c77e4c0b4d3fd684abc89c683",
        strip_prefix = "indenter-0.3.3",
        build_file = Label("//cargo/remote:BUILD.indenter-0.3.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__indexmap__1_8_1",
        url = "https://crates.io/api/v1/crates/indexmap/1.8.1/download",
        type = "tar.gz",
        sha256 = "0f647032dfaa1f8b6dc29bd3edb7bbef4861b8b8007ebb118d6db284fd59f6ee",
        strip_prefix = "indexmap-1.8.1",
        build_file = Label("//cargo/remote:BUILD.indexmap-1.8.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__inotify__0_7_1",
        url = "https://crates.io/api/v1/crates/inotify/0.7.1/download",
        type = "tar.gz",
        sha256 = "4816c66d2c8ae673df83366c18341538f234a26d65a9ecea5c348b453ac1d02f",
        strip_prefix = "inotify-0.7.1",
        build_file = Label("//cargo/remote:BUILD.inotify-0.7.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__inotify_sys__0_1_5",
        url = "https://crates.io/api/v1/crates/inotify-sys/0.1.5/download",
        type = "tar.gz",
        sha256 = "e05c02b5e89bff3b946cedeca278abc628fe811e604f027c45a8aa3cf793d0eb",
        strip_prefix = "inotify-sys-0.1.5",
        build_file = Label("//cargo/remote:BUILD.inotify-sys-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__instant__0_1_12",
        url = "https://crates.io/api/v1/crates/instant/0.1.12/download",
        type = "tar.gz",
        sha256 = "7a5bbe824c507c5da5956355e86a746d82e0e1464f65d862cc5e71da70e94b2c",
        strip_prefix = "instant-0.1.12",
        build_file = Label("//cargo/remote:BUILD.instant-0.1.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__integer_encoding__3_0_3",
        url = "https://crates.io/api/v1/crates/integer-encoding/3.0.3/download",
        type = "tar.gz",
        sha256 = "0e85a1509a128c855368e135cffcde7eac17d8e1083f41e2b98c58bc1a5074be",
        strip_prefix = "integer-encoding-3.0.3",
        build_file = Label("//cargo/remote:BUILD.integer-encoding-3.0.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__iovec__0_1_4",
        url = "https://crates.io/api/v1/crates/iovec/0.1.4/download",
        type = "tar.gz",
        sha256 = "b2b3ea6ff95e175473f8ffe6a7eb7c00d054240321b84c57051175fe3c1e075e",
        strip_prefix = "iovec-0.1.4",
        build_file = Label("//cargo/remote:BUILD.iovec-0.1.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ipnet__2_4_0",
        url = "https://crates.io/api/v1/crates/ipnet/2.4.0/download",
        type = "tar.gz",
        sha256 = "35e70ee094dc02fd9c13fdad4940090f22dbd6ac7c9e7094a46cf0232a50bc7c",
        strip_prefix = "ipnet-2.4.0",
        build_file = Label("//cargo/remote:BUILD.ipnet-2.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__is_ci__1_1_1",
        url = "https://crates.io/api/v1/crates/is_ci/1.1.1/download",
        type = "tar.gz",
        sha256 = "616cde7c720bb2bb5824a224687d8f77bfd38922027f01d825cd7453be5099fb",
        strip_prefix = "is_ci-1.1.1",
        build_file = Label("//cargo/remote:BUILD.is_ci-1.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__itertools__0_10_3",
        url = "https://crates.io/api/v1/crates/itertools/0.10.3/download",
        type = "tar.gz",
        sha256 = "a9a9d19fa1e79b6215ff29b9d6880b706147f16e9b1dbb1e4e5947b5b02bc5e3",
        strip_prefix = "itertools-0.10.3",
        build_file = Label("//cargo/remote:BUILD.itertools-0.10.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__itoa__0_4_8",
        url = "https://crates.io/api/v1/crates/itoa/0.4.8/download",
        type = "tar.gz",
        sha256 = "b71991ff56294aa922b450139ee08b3bfc70982c6b2c7562771375cf73542dd4",
        strip_prefix = "itoa-0.4.8",
        build_file = Label("//cargo/remote:BUILD.itoa-0.4.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__itoa__1_0_1",
        url = "https://crates.io/api/v1/crates/itoa/1.0.1/download",
        type = "tar.gz",
        sha256 = "1aab8fc367588b89dcee83ab0fd66b72b50b72fa1904d7095045ace2b0c81c35",
        strip_prefix = "itoa-1.0.1",
        build_file = Label("//cargo/remote:BUILD.itoa-1.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__jobserver__0_1_24",
        url = "https://crates.io/api/v1/crates/jobserver/0.1.24/download",
        type = "tar.gz",
        sha256 = "af25a77299a7f711a01975c35a6a424eb6862092cc2d6c72c4ed6cbc56dfc1fa",
        strip_prefix = "jobserver-0.1.24",
        build_file = Label("//cargo/remote:BUILD.jobserver-0.1.24.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__js_sys__0_3_56",
        url = "https://crates.io/api/v1/crates/js-sys/0.3.56/download",
        type = "tar.gz",
        sha256 = "a38fc24e30fd564ce974c02bf1d337caddff65be6cc4735a1f7eab22a7440f04",
        strip_prefix = "js-sys-0.3.56",
        build_file = Label("//cargo/remote:BUILD.js-sys-0.3.56.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__kernel32_sys__0_2_2",
        url = "https://crates.io/api/v1/crates/kernel32-sys/0.2.2/download",
        type = "tar.gz",
        sha256 = "7507624b29483431c0ba2d82aece8ca6cdba9382bff4ddd0f7490560c056098d",
        strip_prefix = "kernel32-sys-0.2.2",
        build_file = Label("//cargo/remote:BUILD.kernel32-sys-0.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__lazy_static__1_4_0",
        url = "https://crates.io/api/v1/crates/lazy_static/1.4.0/download",
        type = "tar.gz",
        sha256 = "e2abad23fbc42b3700f2f279844dc832adb2b2eb069b2df918f455c4e18cc646",
        strip_prefix = "lazy_static-1.4.0",
        build_file = Label("//cargo/remote:BUILD.lazy_static-1.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__lazycell__1_3_0",
        url = "https://crates.io/api/v1/crates/lazycell/1.3.0/download",
        type = "tar.gz",
        sha256 = "830d08ce1d1d941e6b30645f1a0eb5643013d835ce3779a5fc208261dbe10f55",
        strip_prefix = "lazycell-1.3.0",
        build_file = Label("//cargo/remote:BUILD.lazycell-1.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__libc__0_2_121",
        url = "https://crates.io/api/v1/crates/libc/0.2.121/download",
        type = "tar.gz",
        sha256 = "efaa7b300f3b5fe8eb6bf21ce3895e1751d9665086af2d64b42f19701015ff4f",
        strip_prefix = "libc-0.2.121",
        build_file = Label("//cargo/remote:BUILD.libc-0.2.121.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__libgit2_sys__0_12_26_1_3_0",
        url = "https://crates.io/api/v1/crates/libgit2-sys/0.12.26+1.3.0/download",
        type = "tar.gz",
        sha256 = "19e1c899248e606fbfe68dcb31d8b0176ebab833b103824af31bddf4b7457494",
        strip_prefix = "libgit2-sys-0.12.26+1.3.0",
        build_file = Label("//cargo/remote:BUILD.libgit2-sys-0.12.26+1.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__libz_sys__1_1_5",
        url = "https://crates.io/api/v1/crates/libz-sys/1.1.5/download",
        type = "tar.gz",
        sha256 = "6f35facd4a5673cb5a48822be2be1d4236c1c99cb4113cab7061ac720d5bf859",
        strip_prefix = "libz-sys-1.1.5",
        build_file = Label("//cargo/remote:BUILD.libz-sys-1.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__linked_hash_map__0_5_4",
        url = "https://crates.io/api/v1/crates/linked-hash-map/0.5.4/download",
        type = "tar.gz",
        sha256 = "7fb9b38af92608140b86b693604b9ffcc5824240a484d1ecd4795bacb2fe88f3",
        strip_prefix = "linked-hash-map-0.5.4",
        build_file = Label("//cargo/remote:BUILD.linked-hash-map-0.5.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__lock_api__0_4_7",
        url = "https://crates.io/api/v1/crates/lock_api/0.4.7/download",
        type = "tar.gz",
        sha256 = "327fa5b6a6940e4699ec49a9beae1ea4845c6bab9314e4f84ac68742139d8c53",
        strip_prefix = "lock_api-0.4.7",
        build_file = Label("//cargo/remote:BUILD.lock_api-0.4.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__log__0_4_16",
        url = "https://crates.io/api/v1/crates/log/0.4.16/download",
        type = "tar.gz",
        sha256 = "6389c490849ff5bc16be905ae24bc913a9c8892e19b2341dbc175e14c341c2b8",
        strip_prefix = "log-0.4.16",
        build_file = Label("//cargo/remote:BUILD.log-0.4.16.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__lru__0_7_3",
        url = "https://crates.io/api/v1/crates/lru/0.7.3/download",
        type = "tar.gz",
        sha256 = "fcb87f3080f6d1d69e8c564c0fcfde1d7aa8cc451ce40cae89479111f03bc0eb",
        strip_prefix = "lru-0.7.3",
        build_file = Label("//cargo/remote:BUILD.lru-0.7.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mach__0_3_2",
        url = "https://crates.io/api/v1/crates/mach/0.3.2/download",
        type = "tar.gz",
        sha256 = "b823e83b2affd8f40a9ee8c29dbc56404c1e34cd2710921f2801e2cf29527afa",
        strip_prefix = "mach-0.3.2",
        build_file = Label("//cargo/remote:BUILD.mach-0.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__matchers__0_1_0",
        url = "https://crates.io/api/v1/crates/matchers/0.1.0/download",
        type = "tar.gz",
        sha256 = "8263075bb86c5a1b1427b5ae862e8889656f126e9f77c484496e8b47cf5c5558",
        strip_prefix = "matchers-0.1.0",
        build_file = Label("//cargo/remote:BUILD.matchers-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__matches__0_1_9",
        url = "https://crates.io/api/v1/crates/matches/0.1.9/download",
        type = "tar.gz",
        sha256 = "a3e378b66a060d48947b590737b30a1be76706c8dd7b8ba0f2fe3989c68a853f",
        strip_prefix = "matches-0.1.9",
        build_file = Label("//cargo/remote:BUILD.matches-0.1.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__maybe_uninit__2_0_0",
        url = "https://crates.io/api/v1/crates/maybe-uninit/2.0.0/download",
        type = "tar.gz",
        sha256 = "60302e4db3a61da70c0cb7991976248362f30319e88850c487b9b95bbf059e00",
        strip_prefix = "maybe-uninit-2.0.0",
        build_file = Label("//cargo/remote:BUILD.maybe-uninit-2.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__memchr__2_4_1",
        url = "https://crates.io/api/v1/crates/memchr/2.4.1/download",
        type = "tar.gz",
        sha256 = "308cc39be01b73d0d18f82a0e7b2a3df85245f84af96fdddc5d202d27e47b86a",
        strip_prefix = "memchr-2.4.1",
        build_file = Label("//cargo/remote:BUILD.memchr-2.4.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__memoffset__0_5_6",
        url = "https://crates.io/api/v1/crates/memoffset/0.5.6/download",
        type = "tar.gz",
        sha256 = "043175f069eda7b85febe4a74abbaeff828d9f8b448515d3151a14a3542811aa",
        strip_prefix = "memoffset-0.5.6",
        build_file = Label("//cargo/remote:BUILD.memoffset-0.5.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__memoffset__0_6_5",
        url = "https://crates.io/api/v1/crates/memoffset/0.6.5/download",
        type = "tar.gz",
        sha256 = "5aa361d4faea93603064a027415f07bd8e1d5c88c9fbf68bf56a285428fd79ce",
        strip_prefix = "memoffset-0.6.5",
        build_file = Label("//cargo/remote:BUILD.memoffset-0.6.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miette__4_3_0",
        url = "https://crates.io/api/v1/crates/miette/4.3.0/download",
        type = "tar.gz",
        sha256 = "4afec44177a962a5948032c536831a17344fccb8e8769e02c89fb3acf063e792",
        strip_prefix = "miette-4.3.0",
        build_file = Label("//cargo/remote:BUILD.miette-4.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miette_derive__4_3_0",
        url = "https://crates.io/api/v1/crates/miette-derive/4.3.0/download",
        type = "tar.gz",
        sha256 = "540d28289be098c316992556bb264d58f62c13270f02044bea33fe8d67f91ff4",
        strip_prefix = "miette-derive-4.3.0",
        build_file = Label("//cargo/remote:BUILD.miette-derive-4.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mime__0_3_16",
        url = "https://crates.io/api/v1/crates/mime/0.3.16/download",
        type = "tar.gz",
        sha256 = "2a60c7ce501c71e03a9c9c0d35b861413ae925bd979cc7a4e30d060069aaac8d",
        strip_prefix = "mime-0.3.16",
        build_file = Label("//cargo/remote:BUILD.mime-0.3.16.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mime_guess__2_0_4",
        url = "https://crates.io/api/v1/crates/mime_guess/2.0.4/download",
        type = "tar.gz",
        sha256 = "4192263c238a5f0d0c6bfd21f336a313a4ce1c450542449ca191bb657b4642ef",
        strip_prefix = "mime_guess-2.0.4",
        build_file = Label("//cargo/remote:BUILD.mime_guess-2.0.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__minimal_lexical__0_2_1",
        url = "https://crates.io/api/v1/crates/minimal-lexical/0.2.1/download",
        type = "tar.gz",
        sha256 = "68354c5c6bd36d73ff3feceb05efa59b6acb7626617f4962be322a825e61f79a",
        strip_prefix = "minimal-lexical-0.2.1",
        build_file = Label("//cargo/remote:BUILD.minimal-lexical-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miniz_oxide__0_4_4",
        url = "https://crates.io/api/v1/crates/miniz_oxide/0.4.4/download",
        type = "tar.gz",
        sha256 = "a92518e98c078586bc6c934028adcca4c92a53d6a958196de835170a01d84e4b",
        strip_prefix = "miniz_oxide-0.4.4",
        build_file = Label("//cargo/remote:BUILD.miniz_oxide-0.4.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mio__0_6_23",
        url = "https://crates.io/api/v1/crates/mio/0.6.23/download",
        type = "tar.gz",
        sha256 = "4afd66f5b91bf2a3bc13fad0e21caedac168ca4c707504e75585648ae80e4cc4",
        strip_prefix = "mio-0.6.23",
        build_file = Label("//cargo/remote:BUILD.mio-0.6.23.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mio__0_8_2",
        url = "https://crates.io/api/v1/crates/mio/0.8.2/download",
        type = "tar.gz",
        sha256 = "52da4364ffb0e4fe33a9841a98a3f3014fb964045ce4f7a45a398243c8d6b0c9",
        strip_prefix = "mio-0.8.2",
        build_file = Label("//cargo/remote:BUILD.mio-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mio_extras__2_0_6",
        url = "https://crates.io/api/v1/crates/mio-extras/2.0.6/download",
        type = "tar.gz",
        sha256 = "52403fe290012ce777c4626790c8951324a2b9e3316b3143779c72b029742f19",
        strip_prefix = "mio-extras-2.0.6",
        build_file = Label("//cargo/remote:BUILD.mio-extras-2.0.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miow__0_2_2",
        url = "https://crates.io/api/v1/crates/miow/0.2.2/download",
        type = "tar.gz",
        sha256 = "ebd808424166322d4a38da87083bfddd3ac4c131334ed55856112eb06d46944d",
        strip_prefix = "miow-0.2.2",
        build_file = Label("//cargo/remote:BUILD.miow-0.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__miow__0_3_7",
        url = "https://crates.io/api/v1/crates/miow/0.3.7/download",
        type = "tar.gz",
        sha256 = "b9f1c5b025cda876f66ef43a113f91ebc9f4ccef34843000e0adf6ebbab84e21",
        strip_prefix = "miow-0.3.7",
        build_file = Label("//cargo/remote:BUILD.miow-0.3.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mockall__0_11_0",
        url = "https://crates.io/api/v1/crates/mockall/0.11.0/download",
        type = "tar.gz",
        sha256 = "3d4d70639a72f972725db16350db56da68266ca368b2a1fe26724a903ad3d6b8",
        strip_prefix = "mockall-0.11.0",
        build_file = Label("//cargo/remote:BUILD.mockall-0.11.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__mockall_derive__0_11_0",
        url = "https://crates.io/api/v1/crates/mockall_derive/0.11.0/download",
        type = "tar.gz",
        sha256 = "79ef208208a0dea3f72221e26e904cdc6db2e481d9ade89081ddd494f1dbaa6b",
        strip_prefix = "mockall_derive-0.11.0",
        build_file = Label("//cargo/remote:BUILD.mockall_derive-0.11.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__moka__0_7_2",
        url = "https://crates.io/api/v1/crates/moka/0.7.2/download",
        type = "tar.gz",
        sha256 = "26e1a0803406a47496169480f26cab92e78936c1180ad439ee18d36478c1509c",
        strip_prefix = "moka-0.7.2",
        build_file = Label("//cargo/remote:BUILD.moka-0.7.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__multimap__0_8_3",
        url = "https://crates.io/api/v1/crates/multimap/0.8.3/download",
        type = "tar.gz",
        sha256 = "e5ce46fe64a9d73be07dcbe690a38ce1b293be448fd8ce1e6c1b8062c9f72c6a",
        strip_prefix = "multimap-0.8.3",
        build_file = Label("//cargo/remote:BUILD.multimap-0.8.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__native_tls__0_2_10",
        url = "https://crates.io/api/v1/crates/native-tls/0.2.10/download",
        type = "tar.gz",
        sha256 = "fd7e2f3618557f980e0b17e8856252eee3c97fa12c54dff0ca290fb6266ca4a9",
        strip_prefix = "native-tls-0.2.10",
        build_file = Label("//cargo/remote:BUILD.native-tls-0.2.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__net2__0_2_37",
        url = "https://crates.io/api/v1/crates/net2/0.2.37/download",
        type = "tar.gz",
        sha256 = "391630d12b68002ae1e25e8f974306474966550ad82dac6886fb8910c19568ae",
        strip_prefix = "net2-0.2.37",
        build_file = Label("//cargo/remote:BUILD.net2-0.2.37.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__nom__7_1_1",
        url = "https://crates.io/api/v1/crates/nom/7.1.1/download",
        type = "tar.gz",
        sha256 = "a8903e5a29a317527874d0402f867152a3d21c908bb0b933e416c65e301d4c36",
        strip_prefix = "nom-7.1.1",
        build_file = Label("//cargo/remote:BUILD.nom-7.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__normalize_line_endings__0_3_0",
        url = "https://crates.io/api/v1/crates/normalize-line-endings/0.3.0/download",
        type = "tar.gz",
        sha256 = "61807f77802ff30975e01f4f071c8ba10c022052f98b3294119f3e615d13e5be",
        strip_prefix = "normalize-line-endings-0.3.0",
        build_file = Label("//cargo/remote:BUILD.normalize-line-endings-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__notify__4_0_17",
        url = "https://crates.io/api/v1/crates/notify/4.0.17/download",
        type = "tar.gz",
        sha256 = "ae03c8c853dba7bfd23e571ff0cff7bc9dceb40a4cd684cd1681824183f45257",
        strip_prefix = "notify-4.0.17",
        build_file = Label("//cargo/remote:BUILD.notify-4.0.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ntapi__0_3_7",
        url = "https://crates.io/api/v1/crates/ntapi/0.3.7/download",
        type = "tar.gz",
        sha256 = "c28774a7fd2fbb4f0babd8237ce554b73af68021b5f695a3cebd6c59bac0980f",
        strip_prefix = "ntapi-0.3.7",
        build_file = Label("//cargo/remote:BUILD.ntapi-0.3.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_integer__0_1_44",
        url = "https://crates.io/api/v1/crates/num-integer/0.1.44/download",
        type = "tar.gz",
        sha256 = "d2cc698a63b549a70bc047073d2949cce27cd1c7b0a4a862d08a8031bc2801db",
        strip_prefix = "num-integer-0.1.44",
        build_file = Label("//cargo/remote:BUILD.num-integer-0.1.44.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_traits__0_2_14",
        url = "https://crates.io/api/v1/crates/num-traits/0.2.14/download",
        type = "tar.gz",
        sha256 = "9a64b1ec5cda2586e284722486d802acf1f7dbdc623e2bfc57e65ca1cd099290",
        strip_prefix = "num-traits-0.2.14",
        build_file = Label("//cargo/remote:BUILD.num-traits-0.2.14.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__num_cpus__1_13_1",
        url = "https://crates.io/api/v1/crates/num_cpus/1.13.1/download",
        type = "tar.gz",
        sha256 = "19e64526ebdee182341572e50e9ad03965aa510cd94427a4549448f285e957a1",
        strip_prefix = "num_cpus-1.13.1",
        build_file = Label("//cargo/remote:BUILD.num_cpus-1.13.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__object__0_27_1",
        url = "https://crates.io/api/v1/crates/object/0.27.1/download",
        type = "tar.gz",
        sha256 = "67ac1d3f9a1d3616fd9a60c8d74296f22406a238b6a72f5cc1e6f314df4ffbf9",
        strip_prefix = "object-0.27.1",
        build_file = Label("//cargo/remote:BUILD.object-0.27.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__once_cell__1_9_0",
        url = "https://crates.io/api/v1/crates/once_cell/1.9.0/download",
        type = "tar.gz",
        sha256 = "da32515d9f6e6e489d7bc9d84c71b060db7247dc035bbe44eac88cf87486d8d5",
        strip_prefix = "once_cell-1.9.0",
        build_file = Label("//cargo/remote:BUILD.once_cell-1.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__online__3_0_1",
        url = "https://crates.io/api/v1/crates/online/3.0.1/download",
        type = "tar.gz",
        sha256 = "7680985bd550795c0161707f51f9abada87c63a5409114ed818a8618d18ec5e5",
        strip_prefix = "online-3.0.1",
        build_file = Label("//cargo/remote:BUILD.online-3.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__openssl__0_10_38",
        url = "https://crates.io/api/v1/crates/openssl/0.10.38/download",
        type = "tar.gz",
        sha256 = "0c7ae222234c30df141154f159066c5093ff73b63204dcda7121eb082fc56a95",
        strip_prefix = "openssl-0.10.38",
        build_file = Label("//cargo/remote:BUILD.openssl-0.10.38.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__openssl_probe__0_1_5",
        url = "https://crates.io/api/v1/crates/openssl-probe/0.1.5/download",
        type = "tar.gz",
        sha256 = "ff011a302c396a5197692431fc1948019154afc178baf7d8e37367442a4601cf",
        strip_prefix = "openssl-probe-0.1.5",
        build_file = Label("//cargo/remote:BUILD.openssl-probe-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__openssl_src__111_18_0_1_1_1n",
        url = "https://crates.io/api/v1/crates/openssl-src/111.18.0+1.1.1n/download",
        type = "tar.gz",
        sha256 = "7897a926e1e8d00219127dc020130eca4292e5ca666dd592480d72c3eca2ff6c",
        strip_prefix = "openssl-src-111.18.0+1.1.1n",
        build_file = Label("//cargo/remote:BUILD.openssl-src-111.18.0+1.1.1n.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__openssl_sys__0_9_72",
        url = "https://crates.io/api/v1/crates/openssl-sys/0.9.72/download",
        type = "tar.gz",
        sha256 = "7e46109c383602735fa0a2e48dd2b7c892b048e1bf69e5c3b1d804b7d9c203cb",
        strip_prefix = "openssl-sys-0.9.72",
        build_file = Label("//cargo/remote:BUILD.openssl-sys-0.9.72.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__opentelemetry__0_17_0",
        url = "https://crates.io/api/v1/crates/opentelemetry/0.17.0/download",
        type = "tar.gz",
        sha256 = "6105e89802af13fdf48c49d7646d3b533a70e536d818aae7e78ba0433d01acb8",
        strip_prefix = "opentelemetry-0.17.0",
        build_file = Label("//cargo/remote:BUILD.opentelemetry-0.17.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__opentelemetry_http__0_6_0",
        url = "https://crates.io/api/v1/crates/opentelemetry-http/0.6.0/download",
        type = "tar.gz",
        sha256 = "449048140ee61e28f57abe6e9975eedc1f3a29855c7407bd6c12b18578863379",
        strip_prefix = "opentelemetry-http-0.6.0",
        build_file = Label("//cargo/remote:BUILD.opentelemetry-http-0.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__opentelemetry_jaeger__0_16_0",
        url = "https://crates.io/api/v1/crates/opentelemetry-jaeger/0.16.0/download",
        type = "tar.gz",
        sha256 = "f8c0b12cd9e3f9b35b52f6e0dac66866c519b26f424f4bbf96e3fe8bfbdc5229",
        strip_prefix = "opentelemetry-jaeger-0.16.0",
        build_file = Label("//cargo/remote:BUILD.opentelemetry-jaeger-0.16.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__opentelemetry_otlp__0_10_0",
        url = "https://crates.io/api/v1/crates/opentelemetry-otlp/0.10.0/download",
        type = "tar.gz",
        sha256 = "9d1a6ca9de4c8b00aa7f1a153bd76cb263287155cec642680d79d98706f3d28a",
        strip_prefix = "opentelemetry-otlp-0.10.0",
        build_file = Label("//cargo/remote:BUILD.opentelemetry-otlp-0.10.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__opentelemetry_semantic_conventions__0_9_0",
        url = "https://crates.io/api/v1/crates/opentelemetry-semantic-conventions/0.9.0/download",
        type = "tar.gz",
        sha256 = "985cc35d832d412224b2cffe2f9194b1b89b6aa5d0bef76d080dce09d90e62bd",
        strip_prefix = "opentelemetry-semantic-conventions-0.9.0",
        build_file = Label("//cargo/remote:BUILD.opentelemetry-semantic-conventions-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ordered_float__1_1_1",
        url = "https://crates.io/api/v1/crates/ordered-float/1.1.1/download",
        type = "tar.gz",
        sha256 = "3305af35278dd29f46fcdd139e0b1fbfae2153f0e5928b39b035542dd31e37b7",
        strip_prefix = "ordered-float-1.1.1",
        build_file = Label("//cargo/remote:BUILD.ordered-float-1.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__os_str_bytes__6_0_0",
        url = "https://crates.io/api/v1/crates/os_str_bytes/6.0.0/download",
        type = "tar.gz",
        sha256 = "8e22443d1643a904602595ba1cd8f7d896afe56d26712531c5ff73a15b2fbf64",
        strip_prefix = "os_str_bytes-6.0.0",
        build_file = Label("//cargo/remote:BUILD.os_str_bytes-6.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__owo_colors__1_3_0",
        url = "https://crates.io/api/v1/crates/owo-colors/1.3.0/download",
        type = "tar.gz",
        sha256 = "2386b4ebe91c2f7f51082d4cefa145d030e33a1842a96b12e4885cc3c01f7a55",
        strip_prefix = "owo-colors-1.3.0",
        build_file = Label("//cargo/remote:BUILD.owo-colors-1.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__owo_colors__3_3_0",
        url = "https://crates.io/api/v1/crates/owo-colors/3.3.0/download",
        type = "tar.gz",
        sha256 = "5e72e30578e0d0993c8ae20823dd9cff2bc5517d2f586a8aef462a581e8a03eb",
        strip_prefix = "owo-colors-3.3.0",
        build_file = Label("//cargo/remote:BUILD.owo-colors-3.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__parking__2_0_0",
        url = "https://crates.io/api/v1/crates/parking/2.0.0/download",
        type = "tar.gz",
        sha256 = "427c3892f9e783d91cc128285287e70a59e206ca452770ece88a76f7a3eddd72",
        strip_prefix = "parking-2.0.0",
        build_file = Label("//cargo/remote:BUILD.parking-2.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__parking_lot__0_11_2",
        url = "https://crates.io/api/v1/crates/parking_lot/0.11.2/download",
        type = "tar.gz",
        sha256 = "7d17b78036a60663b797adeaee46f5c9dfebb86948d1255007a1d6be0271ff99",
        strip_prefix = "parking_lot-0.11.2",
        build_file = Label("//cargo/remote:BUILD.parking_lot-0.11.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__parking_lot__0_12_0",
        url = "https://crates.io/api/v1/crates/parking_lot/0.12.0/download",
        type = "tar.gz",
        sha256 = "87f5ec2493a61ac0506c0f4199f99070cbe83857b0337006a30f3e6719b8ef58",
        strip_prefix = "parking_lot-0.12.0",
        build_file = Label("//cargo/remote:BUILD.parking_lot-0.12.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__parking_lot_core__0_8_5",
        url = "https://crates.io/api/v1/crates/parking_lot_core/0.8.5/download",
        type = "tar.gz",
        sha256 = "d76e8e1493bcac0d2766c42737f34458f1c8c50c0d23bcb24ea953affb273216",
        strip_prefix = "parking_lot_core-0.8.5",
        build_file = Label("//cargo/remote:BUILD.parking_lot_core-0.8.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__parking_lot_core__0_9_2",
        url = "https://crates.io/api/v1/crates/parking_lot_core/0.9.2/download",
        type = "tar.gz",
        sha256 = "995f667a6c822200b0433ac218e05582f0e2efa1b922a3fd2fbaadc5f87bab37",
        strip_prefix = "parking_lot_core-0.9.2",
        build_file = Label("//cargo/remote:BUILD.parking_lot_core-0.9.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__paste__1_0_7",
        url = "https://crates.io/api/v1/crates/paste/1.0.7/download",
        type = "tar.gz",
        sha256 = "0c520e05135d6e763148b6426a837e239041653ba7becd2e538c076c738025fc",
        strip_prefix = "paste-1.0.7",
        build_file = Label("//cargo/remote:BUILD.paste-1.0.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__percent_encoding__2_1_0",
        url = "https://crates.io/api/v1/crates/percent-encoding/2.1.0/download",
        type = "tar.gz",
        sha256 = "d4fd5641d01c8f18a23da7b6fe29298ff4b55afcccdf78973b24cf3175fee32e",
        strip_prefix = "percent-encoding-2.1.0",
        build_file = Label("//cargo/remote:BUILD.percent-encoding-2.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__petgraph__0_6_0",
        url = "https://crates.io/api/v1/crates/petgraph/0.6.0/download",
        type = "tar.gz",
        sha256 = "4a13a2fa9d0b63e5f22328828741e523766fff0ee9e779316902290dff3f824f",
        strip_prefix = "petgraph-0.6.0",
        build_file = Label("//cargo/remote:BUILD.petgraph-0.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project__1_0_10",
        url = "https://crates.io/api/v1/crates/pin-project/1.0.10/download",
        type = "tar.gz",
        sha256 = "58ad3879ad3baf4e44784bc6a718a8698867bb991f8ce24d1bcbe2cfb4c3a75e",
        strip_prefix = "pin-project-1.0.10",
        build_file = Label("//cargo/remote:BUILD.pin-project-1.0.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project_internal__1_0_10",
        url = "https://crates.io/api/v1/crates/pin-project-internal/1.0.10/download",
        type = "tar.gz",
        sha256 = "744b6f092ba29c3650faf274db506afd39944f48420f6c86b17cfe0ee1cb36bb",
        strip_prefix = "pin-project-internal-1.0.10",
        build_file = Label("//cargo/remote:BUILD.pin-project-internal-1.0.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_project_lite__0_2_8",
        url = "https://crates.io/api/v1/crates/pin-project-lite/0.2.8/download",
        type = "tar.gz",
        sha256 = "e280fbe77cc62c91527259e9442153f4688736748d24660126286329742b4c6c",
        strip_prefix = "pin-project-lite-0.2.8",
        build_file = Label("//cargo/remote:BUILD.pin-project-lite-0.2.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pin_utils__0_1_0",
        url = "https://crates.io/api/v1/crates/pin-utils/0.1.0/download",
        type = "tar.gz",
        sha256 = "8b870d8c151b6f2fb93e84a13146138f05d02ed11c7e7c54f8826aaaf7c9f184",
        strip_prefix = "pin-utils-0.1.0",
        build_file = Label("//cargo/remote:BUILD.pin-utils-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pkg_config__0_3_24",
        url = "https://crates.io/api/v1/crates/pkg-config/0.3.24/download",
        type = "tar.gz",
        sha256 = "58893f751c9b0412871a09abd62ecd2a00298c6c83befa223ef98c52aef40cbe",
        strip_prefix = "pkg-config-0.3.24",
        build_file = Label("//cargo/remote:BUILD.pkg-config-0.3.24.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__polling__2_2_0",
        url = "https://crates.io/api/v1/crates/polling/2.2.0/download",
        type = "tar.gz",
        sha256 = "685404d509889fade3e86fe3a5803bca2ec09b0c0778d5ada6ec8bf7a8de5259",
        strip_prefix = "polling-2.2.0",
        build_file = Label("//cargo/remote:BUILD.polling-2.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ppv_lite86__0_2_16",
        url = "https://crates.io/api/v1/crates/ppv-lite86/0.2.16/download",
        type = "tar.gz",
        sha256 = "eb9f9e6e233e5c4a35559a617bf40a4ec447db2e84c20b55a6f83167b7e57872",
        strip_prefix = "ppv-lite86-0.2.16",
        build_file = Label("//cargo/remote:BUILD.ppv-lite86-0.2.16.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__predicates__2_1_1",
        url = "https://crates.io/api/v1/crates/predicates/2.1.1/download",
        type = "tar.gz",
        sha256 = "a5aab5be6e4732b473071984b3164dbbfb7a3674d30ea5ff44410b6bcd960c3c",
        strip_prefix = "predicates-2.1.1",
        build_file = Label("//cargo/remote:BUILD.predicates-2.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__predicates_core__1_0_3",
        url = "https://crates.io/api/v1/crates/predicates-core/1.0.3/download",
        type = "tar.gz",
        sha256 = "da1c2388b1513e1b605fcec39a95e0a9e8ef088f71443ef37099fa9ae6673fcb",
        strip_prefix = "predicates-core-1.0.3",
        build_file = Label("//cargo/remote:BUILD.predicates-core-1.0.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__predicates_tree__1_0_5",
        url = "https://crates.io/api/v1/crates/predicates-tree/1.0.5/download",
        type = "tar.gz",
        sha256 = "4d86de6de25020a36c6d3643a86d9a6a9f552107c0559c60ea03551b5e16c032",
        strip_prefix = "predicates-tree-1.0.5",
        build_file = Label("//cargo/remote:BUILD.predicates-tree-1.0.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__prettytable_rs__0_8_0",
        url = "https://crates.io/api/v1/crates/prettytable-rs/0.8.0/download",
        type = "tar.gz",
        sha256 = "0fd04b170004fa2daccf418a7f8253aaf033c27760b5f225889024cf66d7ac2e",
        strip_prefix = "prettytable-rs-0.8.0",
        build_file = Label("//cargo/remote:BUILD.prettytable-rs-0.8.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro_error__1_0_4",
        url = "https://crates.io/api/v1/crates/proc-macro-error/1.0.4/download",
        type = "tar.gz",
        sha256 = "da25490ff9892aab3fcf7c36f08cfb902dd3e71ca0f9f9517bea02a73a5ce38c",
        strip_prefix = "proc-macro-error-1.0.4",
        build_file = Label("//cargo/remote:BUILD.proc-macro-error-1.0.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro_error_attr__1_0_4",
        url = "https://crates.io/api/v1/crates/proc-macro-error-attr/1.0.4/download",
        type = "tar.gz",
        sha256 = "a1be40180e52ecc98ad80b184934baf3d0d29f979574e439af5a55274b35f869",
        strip_prefix = "proc-macro-error-attr-1.0.4",
        build_file = Label("//cargo/remote:BUILD.proc-macro-error-attr-1.0.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__proc_macro2__1_0_36",
        url = "https://crates.io/api/v1/crates/proc-macro2/1.0.36/download",
        type = "tar.gz",
        sha256 = "c7342d5883fbccae1cc37a2353b09c87c9b0f3afd73f5fb9bba687a1f733b029",
        strip_prefix = "proc-macro2-1.0.36",
        build_file = Label("//cargo/remote:BUILD.proc-macro2-1.0.36.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__prost__0_9_0",
        url = "https://crates.io/api/v1/crates/prost/0.9.0/download",
        type = "tar.gz",
        sha256 = "444879275cb4fd84958b1a1d5420d15e6fcf7c235fe47f053c9c2a80aceb6001",
        strip_prefix = "prost-0.9.0",
        build_file = Label("//cargo/remote:BUILD.prost-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__prost_build__0_9_0",
        url = "https://crates.io/api/v1/crates/prost-build/0.9.0/download",
        type = "tar.gz",
        sha256 = "62941722fb675d463659e49c4f3fe1fe792ff24fe5bbaa9c08cd3b98a1c354f5",
        strip_prefix = "prost-build-0.9.0",
        build_file = Label("//cargo/remote:BUILD.prost-build-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__prost_derive__0_9_0",
        url = "https://crates.io/api/v1/crates/prost-derive/0.9.0/download",
        type = "tar.gz",
        sha256 = "f9cc1a3263e07e0bf68e96268f37665207b49560d98739662cdfaae215c720fe",
        strip_prefix = "prost-derive-0.9.0",
        build_file = Label("//cargo/remote:BUILD.prost-derive-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__prost_types__0_9_0",
        url = "https://crates.io/api/v1/crates/prost-types/0.9.0/download",
        type = "tar.gz",
        sha256 = "534b7a0e836e3c482d2693070f982e39e7611da9695d4d1f5a4b186b51faef0a",
        strip_prefix = "prost-types-0.9.0",
        build_file = Label("//cargo/remote:BUILD.prost-types-0.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__pulldown_cmark__0_9_1",
        url = "https://crates.io/api/v1/crates/pulldown-cmark/0.9.1/download",
        type = "tar.gz",
        sha256 = "34f197a544b0c9ab3ae46c359a7ec9cbbb5c7bf97054266fecb7ead794a181d6",
        strip_prefix = "pulldown-cmark-0.9.1",
        build_file = Label("//cargo/remote:BUILD.pulldown-cmark-0.9.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__quanta__0_9_3",
        url = "https://crates.io/api/v1/crates/quanta/0.9.3/download",
        type = "tar.gz",
        sha256 = "20afe714292d5e879d8b12740aa223c6a88f118af41870e8b6196e39a02238a8",
        strip_prefix = "quanta-0.9.3",
        build_file = Label("//cargo/remote:BUILD.quanta-0.9.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__quote__1_0_17",
        url = "https://crates.io/api/v1/crates/quote/1.0.17/download",
        type = "tar.gz",
        sha256 = "632d02bff7f874a36f33ea8bb416cd484b90cc66c1194b1a1110d067a7013f58",
        strip_prefix = "quote-1.0.17",
        build_file = Label("//cargo/remote:BUILD.quote-1.0.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand__0_8_5",
        url = "https://crates.io/api/v1/crates/rand/0.8.5/download",
        type = "tar.gz",
        sha256 = "34af8d1a0e25924bc5b7c43c079c942339d8f0a8b57c39049bef581b46327404",
        strip_prefix = "rand-0.8.5",
        build_file = Label("//cargo/remote:BUILD.rand-0.8.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_chacha__0_3_1",
        url = "https://crates.io/api/v1/crates/rand_chacha/0.3.1/download",
        type = "tar.gz",
        sha256 = "e6c10a63a0fa32252be49d21e7709d4d4baf8d231c2dbce1eaa8141b9b127d88",
        strip_prefix = "rand_chacha-0.3.1",
        build_file = Label("//cargo/remote:BUILD.rand_chacha-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rand_core__0_6_3",
        url = "https://crates.io/api/v1/crates/rand_core/0.6.3/download",
        type = "tar.gz",
        sha256 = "d34f1408f55294453790c48b2f1ebbb1c5b4b7563eb1f418bcfcfdbb06ebb4e7",
        strip_prefix = "rand_core-0.6.3",
        build_file = Label("//cargo/remote:BUILD.rand_core-0.6.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__raw_cpuid__10_3_0",
        url = "https://crates.io/api/v1/crates/raw-cpuid/10.3.0/download",
        type = "tar.gz",
        sha256 = "738bc47119e3eeccc7e94c4a506901aea5e7b4944ecd0829cbebf4af04ceda12",
        strip_prefix = "raw-cpuid-10.3.0",
        build_file = Label("//cargo/remote:BUILD.raw-cpuid-10.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__redox_syscall__0_1_57",
        url = "https://crates.io/api/v1/crates/redox_syscall/0.1.57/download",
        type = "tar.gz",
        sha256 = "41cc0f7e4d5d4544e8861606a285bb08d3e70712ccc7d2b84d7c0ccfaf4b05ce",
        strip_prefix = "redox_syscall-0.1.57",
        build_file = Label("//cargo/remote:BUILD.redox_syscall-0.1.57.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__redox_syscall__0_2_13",
        url = "https://crates.io/api/v1/crates/redox_syscall/0.2.13/download",
        type = "tar.gz",
        sha256 = "62f25bc4c7e55e0b0b7a1d43fb893f4fa1361d0abe38b9ce4f323c2adfe6ef42",
        strip_prefix = "redox_syscall-0.2.13",
        build_file = Label("//cargo/remote:BUILD.redox_syscall-0.2.13.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__redox_users__0_3_5",
        url = "https://crates.io/api/v1/crates/redox_users/0.3.5/download",
        type = "tar.gz",
        sha256 = "de0737333e7a9502c789a36d7c7fa6092a49895d4faa31ca5df163857ded2e9d",
        strip_prefix = "redox_users-0.3.5",
        build_file = Label("//cargo/remote:BUILD.redox_users-0.3.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__redox_users__0_4_3",
        url = "https://crates.io/api/v1/crates/redox_users/0.4.3/download",
        type = "tar.gz",
        sha256 = "b033d837a7cf162d7993aded9304e30a83213c648b6e389db233191f891e5c2b",
        strip_prefix = "redox_users-0.4.3",
        build_file = Label("//cargo/remote:BUILD.redox_users-0.4.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__regex__1_5_5",
        url = "https://crates.io/api/v1/crates/regex/1.5.5/download",
        type = "tar.gz",
        sha256 = "1a11647b6b25ff05a515cb92c365cec08801e83423a235b51e231e1808747286",
        strip_prefix = "regex-1.5.5",
        build_file = Label("//cargo/remote:BUILD.regex-1.5.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__regex_automata__0_1_10",
        url = "https://crates.io/api/v1/crates/regex-automata/0.1.10/download",
        type = "tar.gz",
        sha256 = "6c230d73fb8d8c1b9c0b3135c5142a8acee3a0558fb8db5cf1cb65f8d7862132",
        strip_prefix = "regex-automata-0.1.10",
        build_file = Label("//cargo/remote:BUILD.regex-automata-0.1.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__regex_syntax__0_6_25",
        url = "https://crates.io/api/v1/crates/regex-syntax/0.6.25/download",
        type = "tar.gz",
        sha256 = "f497285884f3fcff424ffc933e56d7cbca511def0c9831a7f9b5f6153e3cc89b",
        strip_prefix = "regex-syntax-0.6.25",
        build_file = Label("//cargo/remote:BUILD.regex-syntax-0.6.25.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__remove_dir_all__0_5_3",
        url = "https://crates.io/api/v1/crates/remove_dir_all/0.5.3/download",
        type = "tar.gz",
        sha256 = "3acd125665422973a33ac9d3dd2df85edad0f4ae9b00dafb1a05e43a9f5ef8e7",
        strip_prefix = "remove_dir_all-0.5.3",
        build_file = Label("//cargo/remote:BUILD.remove_dir_all-0.5.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__reqwest__0_11_10",
        url = "https://crates.io/api/v1/crates/reqwest/0.11.10/download",
        type = "tar.gz",
        sha256 = "46a1f7aa4f35e5e8b4160449f51afc758f0ce6454315a9fa7d0d113e958c41eb",
        strip_prefix = "reqwest-0.11.10",
        build_file = Label("//cargo/remote:BUILD.reqwest-0.11.10.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__reqwest_middleware__0_1_5",
        url = "https://crates.io/api/v1/crates/reqwest-middleware/0.1.5/download",
        type = "tar.gz",
        sha256 = "3b58621b8223cfc85b63d38b8d335c69b96a666d9b7561aa30a3b070ce1df31c",
        strip_prefix = "reqwest-middleware-0.1.5",
        build_file = Label("//cargo/remote:BUILD.reqwest-middleware-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__reqwest_tracing__0_2_1",
        url = "https://crates.io/api/v1/crates/reqwest-tracing/0.2.1/download",
        type = "tar.gz",
        sha256 = "03f32bd53de59d66d157bd974bafbb69fbb9e98f665d14218b5b991e7dba8d75",
        strip_prefix = "reqwest-tracing-0.2.1",
        build_file = Label("//cargo/remote:BUILD.reqwest-tracing-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rhai__1_6_0",
        url = "https://crates.io/api/v1/crates/rhai/1.6.0/download",
        type = "tar.gz",
        sha256 = "c0a10b3f41db25733e2e953811858dd90c1e96cd618606ddf6961d34b3910b18",
        strip_prefix = "rhai-1.6.0",
        build_file = Label("//cargo/remote:BUILD.rhai-1.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rhai_codegen__1_4_0",
        url = "https://crates.io/api/v1/crates/rhai_codegen/1.4.0/download",
        type = "tar.gz",
        sha256 = "faa0ff1c9dc19c9f8bba510a2a75d3f0449f6233570c2672c7e31c692a11a59a",
        strip_prefix = "rhai_codegen-1.4.0",
        build_file = Label("//cargo/remote:BUILD.rhai_codegen-1.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ring__0_16_20",
        url = "https://crates.io/api/v1/crates/ring/0.16.20/download",
        type = "tar.gz",
        sha256 = "3053cf52e236a3ed746dfc745aa9cacf1b791d846bdaf412f60a8d7d6e17c8fc",
        strip_prefix = "ring-0.16.20",
        build_file = Label("//cargo/remote:BUILD.ring-0.16.20.bazel"),
    )

    maybe(
        new_git_repository,
        name = "raze__router_bridge__0_1_0",
        remote = "https://github.com/apollographql/federation-rs.git",
        commit = "645ef8b66b14ee6d13e8e24ddd4aba29389031a1",
        build_file = Label("//cargo/remote:BUILD.router-bridge-0.1.0.bazel"),
        init_submodules = True,
    )

    maybe(
        new_git_repository,
        name = "raze__rover_client__0_0_0",
        remote = "https://github.com/apollographql/rover.git",
        commit = "c650649682ab891a3b718b5277c3b2e9a5fc5224",
        build_file = Label("//cargo/remote:BUILD.rover-client-0.0.0.bazel"),
        init_submodules = True,
    )

    maybe(
        http_archive,
        name = "raze__rowan__0_13_2",
        url = "https://crates.io/api/v1/crates/rowan/0.13.2/download",
        type = "tar.gz",
        sha256 = "4a938f42b9c73aeece236481f37adb3debb7dfe3ae347cd6a45b5797d9ce4250",
        strip_prefix = "rowan-0.13.2",
        build_file = Label("//cargo/remote:BUILD.rowan-0.13.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rust_argon2__0_8_3",
        url = "https://crates.io/api/v1/crates/rust-argon2/0.8.3/download",
        type = "tar.gz",
        sha256 = "4b18820d944b33caa75a71378964ac46f58517c92b6ae5f762636247c09e78fb",
        strip_prefix = "rust-argon2-0.8.3",
        build_file = Label("//cargo/remote:BUILD.rust-argon2-0.8.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rustc_demangle__0_1_21",
        url = "https://crates.io/api/v1/crates/rustc-demangle/0.1.21/download",
        type = "tar.gz",
        sha256 = "7ef03e0a2b150c7a90d01faf6254c9c48a41e95fb2a8c2ac1c6f0d2b9aefc342",
        strip_prefix = "rustc-demangle-0.1.21",
        build_file = Label("//cargo/remote:BUILD.rustc-demangle-0.1.21.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rustc_hash__1_1_0",
        url = "https://crates.io/api/v1/crates/rustc-hash/1.1.0/download",
        type = "tar.gz",
        sha256 = "08d43f7aa6b08d49f382cde6a7982047c3426db949b1424bc4b7ec9ae12c6ce2",
        strip_prefix = "rustc-hash-1.1.0",
        build_file = Label("//cargo/remote:BUILD.rustc-hash-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rustc_version__0_4_0",
        url = "https://crates.io/api/v1/crates/rustc_version/0.4.0/download",
        type = "tar.gz",
        sha256 = "bfa0f585226d2e68097d4f95d113b15b83a82e819ab25717ec0590d9584ef366",
        strip_prefix = "rustc_version-0.4.0",
        build_file = Label("//cargo/remote:BUILD.rustc_version-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__rustls__0_19_1",
        url = "https://crates.io/api/v1/crates/rustls/0.19.1/download",
        type = "tar.gz",
        sha256 = "35edb675feee39aec9c99fa5ff985081995a06d594114ae14cbe797ad7b7a6d7",
        strip_prefix = "rustls-0.19.1",
        build_file = Label("//cargo/remote:BUILD.rustls-0.19.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ryu__1_0_9",
        url = "https://crates.io/api/v1/crates/ryu/1.0.9/download",
        type = "tar.gz",
        sha256 = "73b4b750c782965c211b42f022f59af1fbceabdd026623714f104152f1ec149f",
        strip_prefix = "ryu-1.0.9",
        build_file = Label("//cargo/remote:BUILD.ryu-1.0.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__same_file__1_0_6",
        url = "https://crates.io/api/v1/crates/same-file/1.0.6/download",
        type = "tar.gz",
        sha256 = "93fc1dc3aaa9bfed95e02e6eadabb4baf7e3078b0bd1b4d7b6b0b68378900502",
        strip_prefix = "same-file-1.0.6",
        build_file = Label("//cargo/remote:BUILD.same-file-1.0.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__schannel__0_1_19",
        url = "https://crates.io/api/v1/crates/schannel/0.1.19/download",
        type = "tar.gz",
        sha256 = "8f05ba609c234e60bee0d547fe94a4c7e9da733d1c962cf6e59efa4cd9c8bc75",
        strip_prefix = "schannel-0.1.19",
        build_file = Label("//cargo/remote:BUILD.schannel-0.1.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__scheduled_thread_pool__0_2_5",
        url = "https://crates.io/api/v1/crates/scheduled-thread-pool/0.2.5/download",
        type = "tar.gz",
        sha256 = "dc6f74fd1204073fa02d5d5d68bec8021be4c38690b61264b2fdb48083d0e7d7",
        strip_prefix = "scheduled-thread-pool-0.2.5",
        build_file = Label("//cargo/remote:BUILD.scheduled-thread-pool-0.2.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__schemars__0_8_8",
        url = "https://crates.io/api/v1/crates/schemars/0.8.8/download",
        type = "tar.gz",
        sha256 = "c6b5a3c80cea1ab61f4260238409510e814e38b4b563c06044edf91e7dc070e3",
        strip_prefix = "schemars-0.8.8",
        build_file = Label("//cargo/remote:BUILD.schemars-0.8.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__schemars_derive__0_8_8",
        url = "https://crates.io/api/v1/crates/schemars_derive/0.8.8/download",
        type = "tar.gz",
        sha256 = "41ae4dce13e8614c46ac3c38ef1c0d668b101df6ac39817aebdaa26642ddae9b",
        strip_prefix = "schemars_derive-0.8.8",
        build_file = Label("//cargo/remote:BUILD.schemars_derive-0.8.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__scoped_tls__1_0_0",
        url = "https://crates.io/api/v1/crates/scoped-tls/1.0.0/download",
        type = "tar.gz",
        sha256 = "ea6a9290e3c9cf0f18145ef7ffa62d68ee0bf5fcd651017e586dc7fd5da448c2",
        strip_prefix = "scoped-tls-1.0.0",
        build_file = Label("//cargo/remote:BUILD.scoped-tls-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__scopeguard__1_1_0",
        url = "https://crates.io/api/v1/crates/scopeguard/1.1.0/download",
        type = "tar.gz",
        sha256 = "d29ab0c6d3fc0ee92fe66e2d99f700eab17a8d57d1c1d3b748380fb20baa78cd",
        strip_prefix = "scopeguard-1.1.0",
        build_file = Label("//cargo/remote:BUILD.scopeguard-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__sct__0_6_1",
        url = "https://crates.io/api/v1/crates/sct/0.6.1/download",
        type = "tar.gz",
        sha256 = "b362b83898e0e69f38515b82ee15aa80636befe47c3b6d3d89a911e78fc228ce",
        strip_prefix = "sct-0.6.1",
        build_file = Label("//cargo/remote:BUILD.sct-0.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__security_framework__2_6_1",
        url = "https://crates.io/api/v1/crates/security-framework/2.6.1/download",
        type = "tar.gz",
        sha256 = "2dc14f172faf8a0194a3aded622712b0de276821addc574fa54fc0a1167e10dc",
        strip_prefix = "security-framework-2.6.1",
        build_file = Label("//cargo/remote:BUILD.security-framework-2.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__security_framework_sys__2_6_1",
        url = "https://crates.io/api/v1/crates/security-framework-sys/2.6.1/download",
        type = "tar.gz",
        sha256 = "0160a13a177a45bfb43ce71c01580998474f556ad854dcbca936dd2841a5c556",
        strip_prefix = "security-framework-sys-2.6.1",
        build_file = Label("//cargo/remote:BUILD.security-framework-sys-2.6.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__semver__1_0_7",
        url = "https://crates.io/api/v1/crates/semver/1.0.7/download",
        type = "tar.gz",
        sha256 = "d65bd28f48be7196d222d95b9243287f48d27aca604e08497513019ff0502cc4",
        strip_prefix = "semver-1.0.7",
        build_file = Label("//cargo/remote:BUILD.semver-1.0.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde__1_0_136",
        url = "https://crates.io/api/v1/crates/serde/1.0.136/download",
        type = "tar.gz",
        sha256 = "ce31e24b01e1e524df96f1c2fdd054405f8d7376249a5110886fb4b658484789",
        strip_prefix = "serde-1.0.136",
        build_file = Label("//cargo/remote:BUILD.serde-1.0.136.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_bytes__0_11_5",
        url = "https://crates.io/api/v1/crates/serde_bytes/0.11.5/download",
        type = "tar.gz",
        sha256 = "16ae07dd2f88a366f15bd0632ba725227018c69a1c8550a927324f8eb8368bb9",
        strip_prefix = "serde_bytes-0.11.5",
        build_file = Label("//cargo/remote:BUILD.serde_bytes-0.11.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_derive__1_0_136",
        url = "https://crates.io/api/v1/crates/serde_derive/1.0.136/download",
        type = "tar.gz",
        sha256 = "08597e7152fcd306f41838ed3e37be9eaeed2b61c42e2117266a554fab4662f9",
        strip_prefix = "serde_derive-1.0.136",
        build_file = Label("//cargo/remote:BUILD.serde_derive-1.0.136.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_derive_internals__0_25_0",
        url = "https://crates.io/api/v1/crates/serde_derive_internals/0.25.0/download",
        type = "tar.gz",
        sha256 = "1dbab34ca63057a1f15280bdf3c39f2b1eb1b54c17e98360e511637aef7418c6",
        strip_prefix = "serde_derive_internals-0.25.0",
        build_file = Label("//cargo/remote:BUILD.serde_derive_internals-0.25.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_json__1_0_79",
        url = "https://crates.io/api/v1/crates/serde_json/1.0.79/download",
        type = "tar.gz",
        sha256 = "8e8d9fa5c3b304765ce1fd9c4c8a3de2c8db365a5b91be52f186efc675681d95",
        strip_prefix = "serde_json-1.0.79",
        build_file = Label("//cargo/remote:BUILD.serde_json-1.0.79.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_json_bytes__0_2_0",
        url = "https://crates.io/api/v1/crates/serde_json_bytes/0.2.0/download",
        type = "tar.gz",
        sha256 = "d07cc85f924551185aa24952d5bf52c8433ffd040eeeff3908bb684c55035002",
        strip_prefix = "serde_json_bytes-0.2.0",
        build_file = Label("//cargo/remote:BUILD.serde_json_bytes-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_urlencoded__0_7_1",
        url = "https://crates.io/api/v1/crates/serde_urlencoded/0.7.1/download",
        type = "tar.gz",
        sha256 = "d3491c14715ca2294c4d6a88f15e84739788c1d030eed8c110436aafdaa2f3fd",
        strip_prefix = "serde_urlencoded-0.7.1",
        build_file = Label("//cargo/remote:BUILD.serde_urlencoded-0.7.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_v8__0_29_0",
        url = "https://crates.io/api/v1/crates/serde_v8/0.29.0/download",
        type = "tar.gz",
        sha256 = "27266c014ef9b11fcf7f1a248f25603529432aab4d0ce777d6c6f6aea2b367bb",
        strip_prefix = "serde_v8-0.29.0",
        build_file = Label("//cargo/remote:BUILD.serde_v8-0.29.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__serde_yaml__0_8_23",
        url = "https://crates.io/api/v1/crates/serde_yaml/0.8.23/download",
        type = "tar.gz",
        sha256 = "a4a521f2940385c165a24ee286aa8599633d162077a54bdcae2a6fd5a7bfa7a0",
        strip_prefix = "serde_yaml-0.8.23",
        build_file = Label("//cargo/remote:BUILD.serde_yaml-0.8.23.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__sha_1__0_10_0",
        url = "https://crates.io/api/v1/crates/sha-1/0.10.0/download",
        type = "tar.gz",
        sha256 = "028f48d513f9678cda28f6e4064755b3fbb2af6acd672f2c209b62323f7aea0f",
        strip_prefix = "sha-1-0.10.0",
        build_file = Label("//cargo/remote:BUILD.sha-1-0.10.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__sha2__0_10_2",
        url = "https://crates.io/api/v1/crates/sha2/0.10.2/download",
        type = "tar.gz",
        sha256 = "55deaec60f81eefe3cce0dc50bda92d6d8e88f2a27df7c5033b42afeb1ed2676",
        strip_prefix = "sha2-0.10.2",
        build_file = Label("//cargo/remote:BUILD.sha2-0.10.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__sharded_slab__0_1_4",
        url = "https://crates.io/api/v1/crates/sharded-slab/0.1.4/download",
        type = "tar.gz",
        sha256 = "900fba806f70c630b0a382d0d825e17a0f19fcd059a2ade1ff237bcddf446b31",
        strip_prefix = "sharded-slab-0.1.4",
        build_file = Label("//cargo/remote:BUILD.sharded-slab-0.1.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__signal_hook_registry__1_4_0",
        url = "https://crates.io/api/v1/crates/signal-hook-registry/1.4.0/download",
        type = "tar.gz",
        sha256 = "e51e73328dc4ac0c7ccbda3a494dfa03df1de2f46018127f60c693f2648455b0",
        strip_prefix = "signal-hook-registry-1.4.0",
        build_file = Label("//cargo/remote:BUILD.signal-hook-registry-1.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__skeptic__0_13_7",
        url = "https://crates.io/api/v1/crates/skeptic/0.13.7/download",
        type = "tar.gz",
        sha256 = "16d23b015676c90a0f01c197bfdc786c20342c73a0afdda9025adb0bc42940a8",
        strip_prefix = "skeptic-0.13.7",
        build_file = Label("//cargo/remote:BUILD.skeptic-0.13.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__slab__0_4_5",
        url = "https://crates.io/api/v1/crates/slab/0.4.5/download",
        type = "tar.gz",
        sha256 = "9def91fd1e018fe007022791f865d0ccc9b3a0d5001e01aabb8b40e46000afb5",
        strip_prefix = "slab-0.4.5",
        build_file = Label("//cargo/remote:BUILD.slab-0.4.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__smallvec__1_8_0",
        url = "https://crates.io/api/v1/crates/smallvec/1.8.0/download",
        type = "tar.gz",
        sha256 = "f2dd574626839106c320a323308629dcb1acfc96e32a8cba364ddc61ac23ee83",
        strip_prefix = "smallvec-1.8.0",
        build_file = Label("//cargo/remote:BUILD.smallvec-1.8.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__smartstring__1_0_1",
        url = "https://crates.io/api/v1/crates/smartstring/1.0.1/download",
        type = "tar.gz",
        sha256 = "3fb72c633efbaa2dd666986505016c32c3044395ceaf881518399d2f4127ee29",
        strip_prefix = "smartstring-1.0.1",
        build_file = Label("//cargo/remote:BUILD.smartstring-1.0.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__smawk__0_3_1",
        url = "https://crates.io/api/v1/crates/smawk/0.3.1/download",
        type = "tar.gz",
        sha256 = "f67ad224767faa3c7d8b6d91985b78e70a1324408abcb1cfcc2be4c06bc06043",
        strip_prefix = "smawk-0.3.1",
        build_file = Label("//cargo/remote:BUILD.smawk-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__socket2__0_4_4",
        url = "https://crates.io/api/v1/crates/socket2/0.4.4/download",
        type = "tar.gz",
        sha256 = "66d72b759436ae32898a2af0a14218dbf55efde3feeb170eb623637db85ee1e0",
        strip_prefix = "socket2-0.4.4",
        build_file = Label("//cargo/remote:BUILD.socket2-0.4.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__spin__0_5_2",
        url = "https://crates.io/api/v1/crates/spin/0.5.2/download",
        type = "tar.gz",
        sha256 = "6e63cff320ae2c57904679ba7cb63280a3dc4613885beafb148ee7bf9aa9042d",
        strip_prefix = "spin-0.5.2",
        build_file = Label("//cargo/remote:BUILD.spin-0.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__stable_deref_trait__1_2_0",
        url = "https://crates.io/api/v1/crates/stable_deref_trait/1.2.0/download",
        type = "tar.gz",
        sha256 = "a8f112729512f8e442d81f95a8a7ddf2b7c6b8a1a6f509a95864142b30cab2d3",
        strip_prefix = "stable_deref_trait-1.2.0",
        build_file = Label("//cargo/remote:BUILD.stable_deref_trait-1.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__startup__0_1_1",
        url = "https://crates.io/api/v1/crates/startup/0.1.1/download",
        type = "tar.gz",
        sha256 = "6e4b82fbe497696de0a02ab63e42cf58b4d64333da2b550494eaa676c98d932f",
        strip_prefix = "startup-0.1.1",
        build_file = Label("//cargo/remote:BUILD.startup-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__static_assertions__1_1_0",
        url = "https://crates.io/api/v1/crates/static_assertions/1.1.0/download",
        type = "tar.gz",
        sha256 = "a2eb9349b6444b326872e140eb1cf5e7c522154d69e7a0ffb0fb81c06b37543f",
        strip_prefix = "static_assertions-1.1.0",
        build_file = Label("//cargo/remote:BUILD.static_assertions-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__strsim__0_10_0",
        url = "https://crates.io/api/v1/crates/strsim/0.10.0/download",
        type = "tar.gz",
        sha256 = "73473c0e59e6d5812c5dfe2a064a6444949f089e20eec9a2e5506596494e4623",
        strip_prefix = "strsim-0.10.0",
        build_file = Label("//cargo/remote:BUILD.strsim-0.10.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__strsim__0_8_0",
        url = "https://crates.io/api/v1/crates/strsim/0.8.0/download",
        type = "tar.gz",
        sha256 = "8ea5119cdb4c55b55d432abb513a0429384878c15dde60cc77b1c99de1a95a6a",
        strip_prefix = "strsim-0.8.0",
        build_file = Label("//cargo/remote:BUILD.strsim-0.8.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__structopt__0_3_26",
        url = "https://crates.io/api/v1/crates/structopt/0.3.26/download",
        type = "tar.gz",
        sha256 = "0c6b5c64445ba8094a6ab0c3cd2ad323e07171012d9c98b0b15651daf1787a10",
        strip_prefix = "structopt-0.3.26",
        build_file = Label("//cargo/remote:BUILD.structopt-0.3.26.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__structopt_derive__0_4_18",
        url = "https://crates.io/api/v1/crates/structopt-derive/0.4.18/download",
        type = "tar.gz",
        sha256 = "dcb5ae327f9cc13b68763b5749770cb9e048a99bd9dfdfa58d0cf05d5f64afe0",
        strip_prefix = "structopt-derive-0.4.18",
        build_file = Label("//cargo/remote:BUILD.structopt-derive-0.4.18.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__strum__0_22_0",
        url = "https://crates.io/api/v1/crates/strum/0.22.0/download",
        type = "tar.gz",
        sha256 = "f7ac893c7d471c8a21f31cfe213ec4f6d9afeed25537c772e08ef3f005f8729e",
        strip_prefix = "strum-0.22.0",
        build_file = Label("//cargo/remote:BUILD.strum-0.22.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__strum_macros__0_22_0",
        url = "https://crates.io/api/v1/crates/strum_macros/0.22.0/download",
        type = "tar.gz",
        sha256 = "339f799d8b549e3744c7ac7feb216383e4005d94bdb22561b3ab8f3b808ae9fb",
        strip_prefix = "strum_macros-0.22.0",
        build_file = Label("//cargo/remote:BUILD.strum_macros-0.22.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__supports_color__1_3_0",
        url = "https://crates.io/api/v1/crates/supports-color/1.3.0/download",
        type = "tar.gz",
        sha256 = "4872ced36b91d47bae8a214a683fe54e7078875b399dfa251df346c9b547d1f9",
        strip_prefix = "supports-color-1.3.0",
        build_file = Label("//cargo/remote:BUILD.supports-color-1.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__supports_hyperlinks__1_2_0",
        url = "https://crates.io/api/v1/crates/supports-hyperlinks/1.2.0/download",
        type = "tar.gz",
        sha256 = "590b34f7c5f01ecc9d78dba4b3f445f31df750a67621cf31626f3b7441ce6406",
        strip_prefix = "supports-hyperlinks-1.2.0",
        build_file = Label("//cargo/remote:BUILD.supports-hyperlinks-1.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__supports_unicode__1_0_2",
        url = "https://crates.io/api/v1/crates/supports-unicode/1.0.2/download",
        type = "tar.gz",
        sha256 = "a8b945e45b417b125a8ec51f1b7df2f8df7920367700d1f98aedd21e5735f8b2",
        strip_prefix = "supports-unicode-1.0.2",
        build_file = Label("//cargo/remote:BUILD.supports-unicode-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__syn__1_0_90",
        url = "https://crates.io/api/v1/crates/syn/1.0.90/download",
        type = "tar.gz",
        sha256 = "704df27628939572cd88d33f171cd6f896f4eaca85252c6e0a72d8d8287ee86f",
        strip_prefix = "syn-1.0.90",
        build_file = Label("//cargo/remote:BUILD.syn-1.0.90.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__synstructure__0_12_6",
        url = "https://crates.io/api/v1/crates/synstructure/0.12.6/download",
        type = "tar.gz",
        sha256 = "f36bdaa60a83aca3921b5259d5400cbf5e90fc51931376a9bd4a0eb79aa7210f",
        strip_prefix = "synstructure-0.12.6",
        build_file = Label("//cargo/remote:BUILD.synstructure-0.12.6.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__sys_info__0_9_1",
        url = "https://crates.io/api/v1/crates/sys-info/0.9.1/download",
        type = "tar.gz",
        sha256 = "0b3a0d0aba8bf96a0e1ddfdc352fc53b3df7f39318c71854910c3c4b024ae52c",
        strip_prefix = "sys-info-0.9.1",
        build_file = Label("//cargo/remote:BUILD.sys-info-0.9.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tagptr__0_2_0",
        url = "https://crates.io/api/v1/crates/tagptr/0.2.0/download",
        type = "tar.gz",
        sha256 = "7b2093cf4c8eb1e67749a6762251bc9cd836b6fc171623bd0a9d324d37af2417",
        strip_prefix = "tagptr-0.2.0",
        build_file = Label("//cargo/remote:BUILD.tagptr-0.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__task_local_extensions__0_1_1",
        url = "https://crates.io/api/v1/crates/task-local-extensions/0.1.1/download",
        type = "tar.gz",
        sha256 = "36794203e10c86e5998179e260869d156e0674f02d5451b4a3fb9fd86d02aaab",
        strip_prefix = "task-local-extensions-0.1.1",
        build_file = Label("//cargo/remote:BUILD.task-local-extensions-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tempfile__3_3_0",
        url = "https://crates.io/api/v1/crates/tempfile/3.3.0/download",
        type = "tar.gz",
        sha256 = "5cdb1ef4eaeeaddc8fbd371e5017057064af0911902ef36b39801f67cc6d79e4",
        strip_prefix = "tempfile-3.3.0",
        build_file = Label("//cargo/remote:BUILD.tempfile-3.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__term__0_5_2",
        url = "https://crates.io/api/v1/crates/term/0.5.2/download",
        type = "tar.gz",
        sha256 = "edd106a334b7657c10b7c540a0106114feadeb4dc314513e97df481d5d966f42",
        strip_prefix = "term-0.5.2",
        build_file = Label("//cargo/remote:BUILD.term-0.5.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__termcolor__1_1_3",
        url = "https://crates.io/api/v1/crates/termcolor/1.1.3/download",
        type = "tar.gz",
        sha256 = "bab24d30b911b2376f3a13cc2cd443142f0c81dda04c118693e35b3835757755",
        strip_prefix = "termcolor-1.1.3",
        build_file = Label("//cargo/remote:BUILD.termcolor-1.1.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__terminal_size__0_1_17",
        url = "https://crates.io/api/v1/crates/terminal_size/0.1.17/download",
        type = "tar.gz",
        sha256 = "633c1a546cee861a1a6d0dc69ebeca693bf4296661ba7852b9d21d159e0506df",
        strip_prefix = "terminal_size-0.1.17",
        build_file = Label("//cargo/remote:BUILD.terminal_size-0.1.17.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__termtree__0_2_4",
        url = "https://crates.io/api/v1/crates/termtree/0.2.4/download",
        type = "tar.gz",
        sha256 = "507e9898683b6c43a9aa55b64259b721b52ba226e0f3779137e50ad114a4c90b",
        strip_prefix = "termtree-0.2.4",
        build_file = Label("//cargo/remote:BUILD.termtree-0.2.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__text_size__1_1_0",
        url = "https://crates.io/api/v1/crates/text-size/1.1.0/download",
        type = "tar.gz",
        sha256 = "288cb548dbe72b652243ea797201f3d481a0609a967980fcc5b2315ea811560a",
        strip_prefix = "text-size-1.1.0",
        build_file = Label("//cargo/remote:BUILD.text-size-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__textwrap__0_11_0",
        url = "https://crates.io/api/v1/crates/textwrap/0.11.0/download",
        type = "tar.gz",
        sha256 = "d326610f408c7a4eb6f51c37c330e496b08506c9457c9d34287ecc38809fb060",
        strip_prefix = "textwrap-0.11.0",
        build_file = Label("//cargo/remote:BUILD.textwrap-0.11.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__textwrap__0_15_0",
        url = "https://crates.io/api/v1/crates/textwrap/0.15.0/download",
        type = "tar.gz",
        sha256 = "b1141d4d61095b28419e22cb0bbf02755f5e54e0526f97f1e3d1d160e60885fb",
        strip_prefix = "textwrap-0.15.0",
        build_file = Label("//cargo/remote:BUILD.textwrap-0.15.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__thiserror__1_0_30",
        url = "https://crates.io/api/v1/crates/thiserror/1.0.30/download",
        type = "tar.gz",
        sha256 = "854babe52e4df1653706b98fcfc05843010039b406875930a70e4d9644e5c417",
        strip_prefix = "thiserror-1.0.30",
        build_file = Label("//cargo/remote:BUILD.thiserror-1.0.30.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__thiserror_impl__1_0_30",
        url = "https://crates.io/api/v1/crates/thiserror-impl/1.0.30/download",
        type = "tar.gz",
        sha256 = "aa32fd3f627f367fe16f893e2597ae3c05020f8bba2666a4e6ea73d377e5714b",
        strip_prefix = "thiserror-impl-1.0.30",
        build_file = Label("//cargo/remote:BUILD.thiserror-impl-1.0.30.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__thread_local__1_1_4",
        url = "https://crates.io/api/v1/crates/thread_local/1.1.4/download",
        type = "tar.gz",
        sha256 = "5516c27b78311c50bf42c071425c560ac799b11c30b31f87e3081965fe5e0180",
        strip_prefix = "thread_local-1.1.4",
        build_file = Label("//cargo/remote:BUILD.thread_local-1.1.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__threadpool__1_8_1",
        url = "https://crates.io/api/v1/crates/threadpool/1.8.1/download",
        type = "tar.gz",
        sha256 = "d050e60b33d41c19108b32cea32164033a9013fe3b46cbd4457559bfbf77afaa",
        strip_prefix = "threadpool-1.8.1",
        build_file = Label("//cargo/remote:BUILD.threadpool-1.8.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__thrift__0_15_0",
        url = "https://crates.io/api/v1/crates/thrift/0.15.0/download",
        type = "tar.gz",
        sha256 = "b82ca8f46f95b3ce96081fe3dd89160fdea970c254bb72925255d1b62aae692e",
        strip_prefix = "thrift-0.15.0",
        build_file = Label("//cargo/remote:BUILD.thrift-0.15.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__time__0_1_43",
        url = "https://crates.io/api/v1/crates/time/0.1.43/download",
        type = "tar.gz",
        sha256 = "ca8a50ef2360fbd1eeb0ecd46795a87a19024eb4b53c5dc916ca1fd95fe62438",
        strip_prefix = "time-0.1.43",
        build_file = Label("//cargo/remote:BUILD.time-0.1.43.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tinyvec__1_5_1",
        url = "https://crates.io/api/v1/crates/tinyvec/1.5.1/download",
        type = "tar.gz",
        sha256 = "2c1c1d5a42b6245520c249549ec267180beaffcc0615401ac8e31853d4b6d8d2",
        strip_prefix = "tinyvec-1.5.1",
        build_file = Label("//cargo/remote:BUILD.tinyvec-1.5.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tinyvec_macros__0_1_0",
        url = "https://crates.io/api/v1/crates/tinyvec_macros/0.1.0/download",
        type = "tar.gz",
        sha256 = "cda74da7e1a664f795bb1f8a87ec406fb89a02522cf6e50620d016add6dbbf5c",
        strip_prefix = "tinyvec_macros-0.1.0",
        build_file = Label("//cargo/remote:BUILD.tinyvec_macros-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio__1_17_0",
        url = "https://crates.io/api/v1/crates/tokio/1.17.0/download",
        type = "tar.gz",
        sha256 = "2af73ac49756f3f7c01172e34a23e5d0216f6c32333757c2c61feb2bbff5a5ee",
        strip_prefix = "tokio-1.17.0",
        build_file = Label("//cargo/remote:BUILD.tokio-1.17.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_io_timeout__1_2_0",
        url = "https://crates.io/api/v1/crates/tokio-io-timeout/1.2.0/download",
        type = "tar.gz",
        sha256 = "30b74022ada614a1b4834de765f9bb43877f910cc8ce4be40e89042c9223a8bf",
        strip_prefix = "tokio-io-timeout-1.2.0",
        build_file = Label("//cargo/remote:BUILD.tokio-io-timeout-1.2.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_macros__1_7_0",
        url = "https://crates.io/api/v1/crates/tokio-macros/1.7.0/download",
        type = "tar.gz",
        sha256 = "b557f72f448c511a979e2564e55d74e6c4432fc96ff4f6241bc6bded342643b7",
        strip_prefix = "tokio-macros-1.7.0",
        build_file = Label("//cargo/remote:BUILD.tokio-macros-1.7.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_native_tls__0_3_0",
        url = "https://crates.io/api/v1/crates/tokio-native-tls/0.3.0/download",
        type = "tar.gz",
        sha256 = "f7d995660bd2b7f8c1568414c1126076c13fbb725c40112dc0120b78eb9b717b",
        strip_prefix = "tokio-native-tls-0.3.0",
        build_file = Label("//cargo/remote:BUILD.tokio-native-tls-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_rustls__0_22_0",
        url = "https://crates.io/api/v1/crates/tokio-rustls/0.22.0/download",
        type = "tar.gz",
        sha256 = "bc6844de72e57df1980054b38be3a9f4702aba4858be64dd700181a8a6d0e1b6",
        strip_prefix = "tokio-rustls-0.22.0",
        build_file = Label("//cargo/remote:BUILD.tokio-rustls-0.22.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_socks__0_5_1",
        url = "https://crates.io/api/v1/crates/tokio-socks/0.5.1/download",
        type = "tar.gz",
        sha256 = "51165dfa029d2a65969413a6cc96f354b86b464498702f174a4efa13608fd8c0",
        strip_prefix = "tokio-socks-0.5.1",
        build_file = Label("//cargo/remote:BUILD.tokio-socks-0.5.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_stream__0_1_8",
        url = "https://crates.io/api/v1/crates/tokio-stream/0.1.8/download",
        type = "tar.gz",
        sha256 = "50145484efff8818b5ccd256697f36863f587da82cf8b409c53adf1e840798e3",
        strip_prefix = "tokio-stream-0.1.8",
        build_file = Label("//cargo/remote:BUILD.tokio-stream-0.1.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_test__0_4_2",
        url = "https://crates.io/api/v1/crates/tokio-test/0.4.2/download",
        type = "tar.gz",
        sha256 = "53474327ae5e166530d17f2d956afcb4f8a004de581b3cae10f12006bc8163e3",
        strip_prefix = "tokio-test-0.4.2",
        build_file = Label("//cargo/remote:BUILD.tokio-test-0.4.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_util__0_6_9",
        url = "https://crates.io/api/v1/crates/tokio-util/0.6.9/download",
        type = "tar.gz",
        sha256 = "9e99e1983e5d376cd8eb4b66604d2e99e79f5bd988c3055891dcd8c9e2604cc0",
        strip_prefix = "tokio-util-0.6.9",
        build_file = Label("//cargo/remote:BUILD.tokio-util-0.6.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tokio_util__0_7_1",
        url = "https://crates.io/api/v1/crates/tokio-util/0.7.1/download",
        type = "tar.gz",
        sha256 = "0edfdeb067411dba2044da6d1cb2df793dd35add7888d73c16e3381ded401764",
        strip_prefix = "tokio-util-0.7.1",
        build_file = Label("//cargo/remote:BUILD.tokio-util-0.7.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__toml__0_5_8",
        url = "https://crates.io/api/v1/crates/toml/0.5.8/download",
        type = "tar.gz",
        sha256 = "a31142970826733df8241ef35dc040ef98c679ab14d7c3e54d827099b3acecaa",
        strip_prefix = "toml-0.5.8",
        build_file = Label("//cargo/remote:BUILD.toml-0.5.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tonic__0_6_2",
        url = "https://crates.io/api/v1/crates/tonic/0.6.2/download",
        type = "tar.gz",
        sha256 = "ff08f4649d10a70ffa3522ca559031285d8e421d727ac85c60825761818f5d0a",
        strip_prefix = "tonic-0.6.2",
        build_file = Label("//cargo/remote:BUILD.tonic-0.6.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tonic_build__0_6_2",
        url = "https://crates.io/api/v1/crates/tonic-build/0.6.2/download",
        type = "tar.gz",
        sha256 = "9403f1bafde247186684b230dc6f38b5cd514584e8bec1dd32514be4745fa757",
        strip_prefix = "tonic-build-0.6.2",
        build_file = Label("//cargo/remote:BUILD.tonic-build-0.6.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tower__0_4_12",
        url = "https://crates.io/api/v1/crates/tower/0.4.12/download",
        type = "tar.gz",
        sha256 = "9a89fd63ad6adf737582df5db40d286574513c69a11dac5214dc3b5603d6713e",
        strip_prefix = "tower-0.4.12",
        build_file = Label("//cargo/remote:BUILD.tower-0.4.12.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tower_http__0_2_5",
        url = "https://crates.io/api/v1/crates/tower-http/0.2.5/download",
        type = "tar.gz",
        sha256 = "aba3f3efabf7fb41fae8534fc20a817013dd1c12cb45441efb6c82e6556b4cd8",
        strip_prefix = "tower-http-0.2.5",
        build_file = Label("//cargo/remote:BUILD.tower-http-0.2.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tower_layer__0_3_1",
        url = "https://crates.io/api/v1/crates/tower-layer/0.3.1/download",
        type = "tar.gz",
        sha256 = "343bc9466d3fe6b0f960ef45960509f84480bf4fd96f92901afe7ff3df9d3a62",
        strip_prefix = "tower-layer-0.3.1",
        build_file = Label("//cargo/remote:BUILD.tower-layer-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tower_service__0_3_1",
        url = "https://crates.io/api/v1/crates/tower-service/0.3.1/download",
        type = "tar.gz",
        sha256 = "360dfd1d6d30e05fda32ace2c8c70e9c0a9da713275777f5a4dbb8a1893930c6",
        strip_prefix = "tower-service-0.3.1",
        build_file = Label("//cargo/remote:BUILD.tower-service-0.3.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tower_test__0_4_0",
        url = "https://crates.io/api/v1/crates/tower-test/0.4.0/download",
        type = "tar.gz",
        sha256 = "a4546773ffeab9e4ea02b8872faa49bb616a80a7da66afc2f32688943f97efa7",
        strip_prefix = "tower-test-0.4.0",
        build_file = Label("//cargo/remote:BUILD.tower-test-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing__0_1_32",
        url = "https://crates.io/api/v1/crates/tracing/0.1.32/download",
        type = "tar.gz",
        sha256 = "4a1bdf54a7c28a2bbf701e1d2233f6c77f473486b94bee4f9678da5a148dca7f",
        strip_prefix = "tracing-0.1.32",
        build_file = Label("//cargo/remote:BUILD.tracing-0.1.32.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_attributes__0_1_20",
        url = "https://crates.io/api/v1/crates/tracing-attributes/0.1.20/download",
        type = "tar.gz",
        sha256 = "2e65ce065b4b5c53e73bb28912318cb8c9e9ad3921f1d669eb0e68b4c8143a2b",
        strip_prefix = "tracing-attributes-0.1.20",
        build_file = Label("//cargo/remote:BUILD.tracing-attributes-0.1.20.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_core__0_1_23",
        url = "https://crates.io/api/v1/crates/tracing-core/0.1.23/download",
        type = "tar.gz",
        sha256 = "aa31669fa42c09c34d94d8165dd2012e8ff3c66aca50f3bb226b68f216f2706c",
        strip_prefix = "tracing-core-0.1.23",
        build_file = Label("//cargo/remote:BUILD.tracing-core-0.1.23.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_error__0_1_2",
        url = "https://crates.io/api/v1/crates/tracing-error/0.1.2/download",
        type = "tar.gz",
        sha256 = "b4d7c0b83d4a500748fa5879461652b361edf5c9d51ede2a2ac03875ca185e24",
        strip_prefix = "tracing-error-0.1.2",
        build_file = Label("//cargo/remote:BUILD.tracing-error-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_futures__0_2_5",
        url = "https://crates.io/api/v1/crates/tracing-futures/0.2.5/download",
        type = "tar.gz",
        sha256 = "97d095ae15e245a057c8e8451bab9b3ee1e1f68e9ba2b4fbc18d0ac5237835f2",
        strip_prefix = "tracing-futures-0.2.5",
        build_file = Label("//cargo/remote:BUILD.tracing-futures-0.2.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_log__0_1_2",
        url = "https://crates.io/api/v1/crates/tracing-log/0.1.2/download",
        type = "tar.gz",
        sha256 = "a6923477a48e41c1951f1999ef8bb5a3023eb723ceadafe78ffb65dc366761e3",
        strip_prefix = "tracing-log-0.1.2",
        build_file = Label("//cargo/remote:BUILD.tracing-log-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_opentelemetry__0_17_2",
        url = "https://crates.io/api/v1/crates/tracing-opentelemetry/0.17.2/download",
        type = "tar.gz",
        sha256 = "1f9378e96a9361190ae297e7f3a8ff644aacd2897f244b1ff81f381669196fa6",
        strip_prefix = "tracing-opentelemetry-0.17.2",
        build_file = Label("//cargo/remote:BUILD.tracing-opentelemetry-0.17.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_serde__0_1_3",
        url = "https://crates.io/api/v1/crates/tracing-serde/0.1.3/download",
        type = "tar.gz",
        sha256 = "bc6b213177105856957181934e4920de57730fc69bf42c37ee5bb664d406d9e1",
        strip_prefix = "tracing-serde-0.1.3",
        build_file = Label("//cargo/remote:BUILD.tracing-serde-0.1.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_subscriber__0_2_25",
        url = "https://crates.io/api/v1/crates/tracing-subscriber/0.2.25/download",
        type = "tar.gz",
        sha256 = "0e0d2eaa99c3c2e41547cfa109e910a68ea03823cccad4a0525dcbc9b01e8c71",
        strip_prefix = "tracing-subscriber-0.2.25",
        build_file = Label("//cargo/remote:BUILD.tracing-subscriber-0.2.25.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__tracing_subscriber__0_3_9",
        url = "https://crates.io/api/v1/crates/tracing-subscriber/0.3.9/download",
        type = "tar.gz",
        sha256 = "9e0ab7bdc962035a87fba73f3acca9b8a8d0034c2e6f60b84aeaaddddc155dce",
        strip_prefix = "tracing-subscriber-0.3.9",
        build_file = Label("//cargo/remote:BUILD.tracing-subscriber-0.3.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__triomphe__0_1_5",
        url = "https://crates.io/api/v1/crates/triomphe/0.1.5/download",
        type = "tar.gz",
        sha256 = "c45e322b26410d7260e00f64234810c2f17d7ece356182af4df8f7ff07890f09",
        strip_prefix = "triomphe-0.1.5",
        build_file = Label("//cargo/remote:BUILD.triomphe-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__try_lock__0_2_3",
        url = "https://crates.io/api/v1/crates/try-lock/0.2.3/download",
        type = "tar.gz",
        sha256 = "59547bce71d9c38b83d9c0e92b6066c4253371f15005def0c30d9657f50c7642",
        strip_prefix = "try-lock-0.2.3",
        build_file = Label("//cargo/remote:BUILD.try-lock-0.2.3.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__typed_builder__0_10_0",
        url = "https://crates.io/api/v1/crates/typed-builder/0.10.0/download",
        type = "tar.gz",
        sha256 = "89851716b67b937e393b3daa8423e67ddfc4bbbf1654bcf05488e95e0828db0c",
        strip_prefix = "typed-builder-0.10.0",
        build_file = Label("//cargo/remote:BUILD.typed-builder-0.10.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__typenum__1_15_0",
        url = "https://crates.io/api/v1/crates/typenum/1.15.0/download",
        type = "tar.gz",
        sha256 = "dcf81ac59edc17cc8697ff311e8f5ef2d99fcbd9817b34cec66f90b6c3dfd987",
        strip_prefix = "typenum-1.15.0",
        build_file = Label("//cargo/remote:BUILD.typenum-1.15.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__uname__0_1_1",
        url = "https://crates.io/api/v1/crates/uname/0.1.1/download",
        type = "tar.gz",
        sha256 = "b72f89f0ca32e4db1c04e2a72f5345d59796d4866a1ee0609084569f73683dc8",
        strip_prefix = "uname-0.1.1",
        build_file = Label("//cargo/remote:BUILD.uname-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicase__2_6_0",
        url = "https://crates.io/api/v1/crates/unicase/2.6.0/download",
        type = "tar.gz",
        sha256 = "50f37be617794602aabbeee0be4f259dc1778fabe05e2d67ee8f79326d5cb4f6",
        strip_prefix = "unicase-2.6.0",
        build_file = Label("//cargo/remote:BUILD.unicase-2.6.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_bidi__0_3_7",
        url = "https://crates.io/api/v1/crates/unicode-bidi/0.3.7/download",
        type = "tar.gz",
        sha256 = "1a01404663e3db436ed2746d9fefef640d868edae3cceb81c3b8d5732fda678f",
        strip_prefix = "unicode-bidi-0.3.7",
        build_file = Label("//cargo/remote:BUILD.unicode-bidi-0.3.7.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_linebreak__0_1_2",
        url = "https://crates.io/api/v1/crates/unicode-linebreak/0.1.2/download",
        type = "tar.gz",
        sha256 = "3a52dcaab0c48d931f7cc8ef826fa51690a08e1ea55117ef26f89864f532383f",
        strip_prefix = "unicode-linebreak-0.1.2",
        build_file = Label("//cargo/remote:BUILD.unicode-linebreak-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_normalization__0_1_19",
        url = "https://crates.io/api/v1/crates/unicode-normalization/0.1.19/download",
        type = "tar.gz",
        sha256 = "d54590932941a9e9266f0832deed84ebe1bf2e4c9e4a3554d393d18f5e854bf9",
        strip_prefix = "unicode-normalization-0.1.19",
        build_file = Label("//cargo/remote:BUILD.unicode-normalization-0.1.19.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_segmentation__1_9_0",
        url = "https://crates.io/api/v1/crates/unicode-segmentation/1.9.0/download",
        type = "tar.gz",
        sha256 = "7e8820f5d777f6224dc4be3632222971ac30164d4a258d595640799554ebfd99",
        strip_prefix = "unicode-segmentation-1.9.0",
        build_file = Label("//cargo/remote:BUILD.unicode-segmentation-1.9.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_width__0_1_9",
        url = "https://crates.io/api/v1/crates/unicode-width/0.1.9/download",
        type = "tar.gz",
        sha256 = "3ed742d4ea2bd1176e236172c8429aaf54486e7ac098db29ffe6529e0ce50973",
        strip_prefix = "unicode-width-0.1.9",
        build_file = Label("//cargo/remote:BUILD.unicode-width-0.1.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unicode_xid__0_2_2",
        url = "https://crates.io/api/v1/crates/unicode-xid/0.2.2/download",
        type = "tar.gz",
        sha256 = "8ccb82d61f80a663efe1f787a51b16b5a51e3314d6ac365b08639f52387b33f3",
        strip_prefix = "unicode-xid-0.2.2",
        build_file = Label("//cargo/remote:BUILD.unicode-xid-0.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__unreachable__1_0_0",
        url = "https://crates.io/api/v1/crates/unreachable/1.0.0/download",
        type = "tar.gz",
        sha256 = "382810877fe448991dfc7f0dd6e3ae5d58088fd0ea5e35189655f84e6814fa56",
        strip_prefix = "unreachable-1.0.0",
        build_file = Label("//cargo/remote:BUILD.unreachable-1.0.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__untrusted__0_7_1",
        url = "https://crates.io/api/v1/crates/untrusted/0.7.1/download",
        type = "tar.gz",
        sha256 = "a156c684c91ea7d62626509bce3cb4e1d9ed5c4d978f7b4352658f96a4c26b4a",
        strip_prefix = "untrusted-0.7.1",
        build_file = Label("//cargo/remote:BUILD.untrusted-0.7.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__url__2_2_2",
        url = "https://crates.io/api/v1/crates/url/2.2.2/download",
        type = "tar.gz",
        sha256 = "a507c383b2d33b5fc35d1861e77e6b383d158b2da5e14fe51b83dfedf6fd578c",
        strip_prefix = "url-2.2.2",
        build_file = Label("//cargo/remote:BUILD.url-2.2.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__urlencoding__2_1_0",
        url = "https://crates.io/api/v1/crates/urlencoding/2.1.0/download",
        type = "tar.gz",
        sha256 = "68b90931029ab9b034b300b797048cf23723400aa757e8a2bfb9d748102f9821",
        strip_prefix = "urlencoding-2.1.0",
        build_file = Label("//cargo/remote:BUILD.urlencoding-2.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__uuid__0_8_2",
        url = "https://crates.io/api/v1/crates/uuid/0.8.2/download",
        type = "tar.gz",
        sha256 = "bc5cf98d8186244414c848017f0e2676b3fcb46807f6668a97dfe67359a3c4b7",
        strip_prefix = "uuid-0.8.2",
        build_file = Label("//cargo/remote:BUILD.uuid-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__v8__0_38_1",
        url = "https://crates.io/api/v1/crates/v8/0.38.1/download",
        type = "tar.gz",
        sha256 = "684e95fe02e0acfeaf630df3a1623f6ad02145f9a92c54ceae8a1923319d3273",
        strip_prefix = "v8-0.38.1",
        build_file = Label("//cargo/remote:BUILD.v8-0.38.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__valuable__0_1_0",
        url = "https://crates.io/api/v1/crates/valuable/0.1.0/download",
        type = "tar.gz",
        sha256 = "830b7e5d4d90034032940e4ace0d9a9a057e7a45cd94e6c007832e39edb82f6d",
        strip_prefix = "valuable-0.1.0",
        build_file = Label("//cargo/remote:BUILD.valuable-0.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__vcpkg__0_2_15",
        url = "https://crates.io/api/v1/crates/vcpkg/0.2.15/download",
        type = "tar.gz",
        sha256 = "accd4ea62f7bb7a82fe23066fb0957d48ef677f6eeb8215f372f52e48bb32426",
        strip_prefix = "vcpkg-0.2.15",
        build_file = Label("//cargo/remote:BUILD.vcpkg-0.2.15.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__vec_map__0_8_2",
        url = "https://crates.io/api/v1/crates/vec_map/0.8.2/download",
        type = "tar.gz",
        sha256 = "f1bddf1187be692e79c5ffeab891132dfb0f236ed36a43c7ed39f1165ee20191",
        strip_prefix = "vec_map-0.8.2",
        build_file = Label("//cargo/remote:BUILD.vec_map-0.8.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__version_check__0_9_4",
        url = "https://crates.io/api/v1/crates/version_check/0.9.4/download",
        type = "tar.gz",
        sha256 = "49874b5167b65d7193b8aba1567f5c7d93d001cafc34600cee003eda787e483f",
        strip_prefix = "version_check-0.9.4",
        build_file = Label("//cargo/remote:BUILD.version_check-0.9.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__void__1_0_2",
        url = "https://crates.io/api/v1/crates/void/1.0.2/download",
        type = "tar.gz",
        sha256 = "6a02e4885ed3bc0f2de90ea6dd45ebcbb66dacffe03547fadbb0eeae2770887d",
        strip_prefix = "void-1.0.2",
        build_file = Label("//cargo/remote:BUILD.void-1.0.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__waker_fn__1_1_0",
        url = "https://crates.io/api/v1/crates/waker-fn/1.1.0/download",
        type = "tar.gz",
        sha256 = "9d5b2c62b4012a3e1eca5a7e077d13b3bf498c4073e33ccd58626607748ceeca",
        strip_prefix = "waker-fn-1.1.0",
        build_file = Label("//cargo/remote:BUILD.waker-fn-1.1.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__walkdir__2_3_2",
        url = "https://crates.io/api/v1/crates/walkdir/2.3.2/download",
        type = "tar.gz",
        sha256 = "808cf2735cd4b6866113f648b791c6adc5714537bc222d9347bb203386ffda56",
        strip_prefix = "walkdir-2.3.2",
        build_file = Label("//cargo/remote:BUILD.walkdir-2.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__want__0_3_0",
        url = "https://crates.io/api/v1/crates/want/0.3.0/download",
        type = "tar.gz",
        sha256 = "1ce8a968cb1cd110d136ff8b819a556d6fb6d919363c61534f6860c7eb172ba0",
        strip_prefix = "want-0.3.0",
        build_file = Label("//cargo/remote:BUILD.want-0.3.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__warp__0_3_2",
        url = "https://crates.io/api/v1/crates/warp/0.3.2/download",
        type = "tar.gz",
        sha256 = "3cef4e1e9114a4b7f1ac799f16ce71c14de5778500c5450ec6b7b920c55b587e",
        strip_prefix = "warp-0.3.2",
        build_file = Label("//cargo/remote:BUILD.warp-0.3.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasi__0_10_2_wasi_snapshot_preview1",
        url = "https://crates.io/api/v1/crates/wasi/0.10.2+wasi-snapshot-preview1/download",
        type = "tar.gz",
        sha256 = "fd6fbd9a79829dd1ad0cc20627bf1ed606756a7f77edff7b66b7064f9cb327c6",
        strip_prefix = "wasi-0.10.2+wasi-snapshot-preview1",
        build_file = Label("//cargo/remote:BUILD.wasi-0.10.2+wasi-snapshot-preview1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasi__0_11_0_wasi_snapshot_preview1",
        url = "https://crates.io/api/v1/crates/wasi/0.11.0+wasi-snapshot-preview1/download",
        type = "tar.gz",
        sha256 = "9c8d87e72b64a3b4db28d11ce29237c246188f4f51057d65a7eab63b7987e423",
        strip_prefix = "wasi-0.11.0+wasi-snapshot-preview1",
        build_file = Label("//cargo/remote:BUILD.wasi-0.11.0+wasi-snapshot-preview1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasi__0_9_0_wasi_snapshot_preview1",
        url = "https://crates.io/api/v1/crates/wasi/0.9.0+wasi-snapshot-preview1/download",
        type = "tar.gz",
        sha256 = "cccddf32554fecc6acb585f82a32a72e28b48f8c4c1883ddfeeeaa96f7d8e519",
        strip_prefix = "wasi-0.9.0+wasi-snapshot-preview1",
        build_file = Label("//cargo/remote:BUILD.wasi-0.9.0+wasi-snapshot-preview1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen__0_2_79",
        url = "https://crates.io/api/v1/crates/wasm-bindgen/0.2.79/download",
        type = "tar.gz",
        sha256 = "25f1af7423d8588a3d840681122e72e6a24ddbcb3f0ec385cac0d12d24256c06",
        strip_prefix = "wasm-bindgen-0.2.79",
        build_file = Label("//cargo/remote:BUILD.wasm-bindgen-0.2.79.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_backend__0_2_79",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-backend/0.2.79/download",
        type = "tar.gz",
        sha256 = "8b21c0df030f5a177f3cba22e9bc4322695ec43e7257d865302900290bcdedca",
        strip_prefix = "wasm-bindgen-backend-0.2.79",
        build_file = Label("//cargo/remote:BUILD.wasm-bindgen-backend-0.2.79.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_futures__0_4_29",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-futures/0.4.29/download",
        type = "tar.gz",
        sha256 = "2eb6ec270a31b1d3c7e266b999739109abce8b6c87e4b31fcfcd788b65267395",
        strip_prefix = "wasm-bindgen-futures-0.4.29",
        build_file = Label("//cargo/remote:BUILD.wasm-bindgen-futures-0.4.29.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_macro__0_2_79",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-macro/0.2.79/download",
        type = "tar.gz",
        sha256 = "2f4203d69e40a52ee523b2529a773d5ffc1dc0071801c87b3d270b471b80ed01",
        strip_prefix = "wasm-bindgen-macro-0.2.79",
        build_file = Label("//cargo/remote:BUILD.wasm-bindgen-macro-0.2.79.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_macro_support__0_2_79",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-macro-support/0.2.79/download",
        type = "tar.gz",
        sha256 = "bfa8a30d46208db204854cadbb5d4baf5fcf8071ba5bf48190c3e59937962ebc",
        strip_prefix = "wasm-bindgen-macro-support-0.2.79",
        build_file = Label("//cargo/remote:BUILD.wasm-bindgen-macro-support-0.2.79.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wasm_bindgen_shared__0_2_79",
        url = "https://crates.io/api/v1/crates/wasm-bindgen-shared/0.2.79/download",
        type = "tar.gz",
        sha256 = "3d958d035c4438e28c70e4321a2911302f10135ce78a9c7834c0cab4123d06a2",
        strip_prefix = "wasm-bindgen-shared-0.2.79",
        build_file = Label("//cargo/remote:BUILD.wasm-bindgen-shared-0.2.79.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__web_sys__0_3_56",
        url = "https://crates.io/api/v1/crates/web-sys/0.3.56/download",
        type = "tar.gz",
        sha256 = "c060b319f29dd25724f09a2ba1418f142f539b2be99fbf4d2d5a8f7330afb8eb",
        strip_prefix = "web-sys-0.3.56",
        build_file = Label("//cargo/remote:BUILD.web-sys-0.3.56.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__webpki__0_21_4",
        url = "https://crates.io/api/v1/crates/webpki/0.21.4/download",
        type = "tar.gz",
        sha256 = "b8e38c0608262c46d4a56202ebabdeb094cef7e560ca7a226c6bf055188aa4ea",
        strip_prefix = "webpki-0.21.4",
        build_file = Label("//cargo/remote:BUILD.webpki-0.21.4.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__wepoll_ffi__0_1_2",
        url = "https://crates.io/api/v1/crates/wepoll-ffi/0.1.2/download",
        type = "tar.gz",
        sha256 = "d743fdedc5c64377b5fc2bc036b01c7fd642205a0d96356034ae3404d49eb7fb",
        strip_prefix = "wepoll-ffi-0.1.2",
        build_file = Label("//cargo/remote:BUILD.wepoll-ffi-0.1.2.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__which__4_2_5",
        url = "https://crates.io/api/v1/crates/which/4.2.5/download",
        type = "tar.gz",
        sha256 = "5c4fb54e6113b6a8772ee41c3404fb0301ac79604489467e0a9ce1f3e97c24ae",
        strip_prefix = "which-4.2.5",
        build_file = Label("//cargo/remote:BUILD.which-4.2.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi__0_2_8",
        url = "https://crates.io/api/v1/crates/winapi/0.2.8/download",
        type = "tar.gz",
        sha256 = "167dc9d6949a9b857f3451275e911c3f44255842c1f7a76f33c55103a909087a",
        strip_prefix = "winapi-0.2.8",
        build_file = Label("//cargo/remote:BUILD.winapi-0.2.8.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi__0_3_9",
        url = "https://crates.io/api/v1/crates/winapi/0.3.9/download",
        type = "tar.gz",
        sha256 = "5c839a674fcd7a98952e593242ea400abe93992746761e38641405d28b00f419",
        strip_prefix = "winapi-0.3.9",
        build_file = Label("//cargo/remote:BUILD.winapi-0.3.9.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_build__0_1_1",
        url = "https://crates.io/api/v1/crates/winapi-build/0.1.1/download",
        type = "tar.gz",
        sha256 = "2d315eee3b34aca4797b2da6b13ed88266e6d612562a0c46390af8299fc699bc",
        strip_prefix = "winapi-build-0.1.1",
        build_file = Label("//cargo/remote:BUILD.winapi-build-0.1.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_i686_pc_windows_gnu__0_4_0",
        url = "https://crates.io/api/v1/crates/winapi-i686-pc-windows-gnu/0.4.0/download",
        type = "tar.gz",
        sha256 = "ac3b87c63620426dd9b991e5ce0329eff545bccbbb34f3be09ff6fb6ab51b7b6",
        strip_prefix = "winapi-i686-pc-windows-gnu-0.4.0",
        build_file = Label("//cargo/remote:BUILD.winapi-i686-pc-windows-gnu-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_util__0_1_5",
        url = "https://crates.io/api/v1/crates/winapi-util/0.1.5/download",
        type = "tar.gz",
        sha256 = "70ec6ce85bb158151cae5e5c87f95a8e97d2c0c4b001223f33a334e3ce5de178",
        strip_prefix = "winapi-util-0.1.5",
        build_file = Label("//cargo/remote:BUILD.winapi-util-0.1.5.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winapi_x86_64_pc_windows_gnu__0_4_0",
        url = "https://crates.io/api/v1/crates/winapi-x86_64-pc-windows-gnu/0.4.0/download",
        type = "tar.gz",
        sha256 = "712e227841d057c1ee1cd2fb22fa7e5a5461ae8e48fa2ca79ec42cfc1931183f",
        strip_prefix = "winapi-x86_64-pc-windows-gnu-0.4.0",
        build_file = Label("//cargo/remote:BUILD.winapi-x86_64-pc-windows-gnu-0.4.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__windows_sys__0_34_0",
        url = "https://crates.io/api/v1/crates/windows-sys/0.34.0/download",
        type = "tar.gz",
        sha256 = "5acdd78cb4ba54c0045ac14f62d8f94a03d10047904ae2a40afa1e99d8f70825",
        strip_prefix = "windows-sys-0.34.0",
        build_file = Label("//cargo/remote:BUILD.windows-sys-0.34.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__windows_aarch64_msvc__0_34_0",
        url = "https://crates.io/api/v1/crates/windows_aarch64_msvc/0.34.0/download",
        type = "tar.gz",
        sha256 = "17cffbe740121affb56fad0fc0e421804adf0ae00891205213b5cecd30db881d",
        strip_prefix = "windows_aarch64_msvc-0.34.0",
        build_file = Label("//cargo/remote:BUILD.windows_aarch64_msvc-0.34.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__windows_i686_gnu__0_34_0",
        url = "https://crates.io/api/v1/crates/windows_i686_gnu/0.34.0/download",
        type = "tar.gz",
        sha256 = "2564fde759adb79129d9b4f54be42b32c89970c18ebf93124ca8870a498688ed",
        strip_prefix = "windows_i686_gnu-0.34.0",
        build_file = Label("//cargo/remote:BUILD.windows_i686_gnu-0.34.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__windows_i686_msvc__0_34_0",
        url = "https://crates.io/api/v1/crates/windows_i686_msvc/0.34.0/download",
        type = "tar.gz",
        sha256 = "9cd9d32ba70453522332c14d38814bceeb747d80b3958676007acadd7e166956",
        strip_prefix = "windows_i686_msvc-0.34.0",
        build_file = Label("//cargo/remote:BUILD.windows_i686_msvc-0.34.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__windows_x86_64_gnu__0_34_0",
        url = "https://crates.io/api/v1/crates/windows_x86_64_gnu/0.34.0/download",
        type = "tar.gz",
        sha256 = "cfce6deae227ee8d356d19effc141a509cc503dfd1f850622ec4b0f84428e1f4",
        strip_prefix = "windows_x86_64_gnu-0.34.0",
        build_file = Label("//cargo/remote:BUILD.windows_x86_64_gnu-0.34.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__windows_x86_64_msvc__0_34_0",
        url = "https://crates.io/api/v1/crates/windows_x86_64_msvc/0.34.0/download",
        type = "tar.gz",
        sha256 = "d19538ccc21819d01deaf88d6a17eae6596a12e9aafdbb97916fb49896d89de9",
        strip_prefix = "windows_x86_64_msvc-0.34.0",
        build_file = Label("//cargo/remote:BUILD.windows_x86_64_msvc-0.34.0.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__winreg__0_10_1",
        url = "https://crates.io/api/v1/crates/winreg/0.10.1/download",
        type = "tar.gz",
        sha256 = "80d0f4e272c85def139476380b12f9ac60926689dd2e01d4923222f40580869d",
        strip_prefix = "winreg-0.10.1",
        build_file = Label("//cargo/remote:BUILD.winreg-0.10.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__ws2_32_sys__0_2_1",
        url = "https://crates.io/api/v1/crates/ws2_32-sys/0.2.1/download",
        type = "tar.gz",
        sha256 = "d59cefebd0c892fa2dd6de581e937301d8552cb44489cdff035c6187cb63fa5e",
        strip_prefix = "ws2_32-sys-0.2.1",
        build_file = Label("//cargo/remote:BUILD.ws2_32-sys-0.2.1.bazel"),
    )

    maybe(
        http_archive,
        name = "raze__yaml_rust__0_4_5",
        url = "https://crates.io/api/v1/crates/yaml-rust/0.4.5/download",
        type = "tar.gz",
        sha256 = "56c1936c4cc7a1c9ab21a1ebb602eb942ba868cbd44a99cb7cdc5892335e1c85",
        strip_prefix = "yaml-rust-0.4.5",
        build_file = Label("//cargo/remote:BUILD.yaml-rust-0.4.5.bazel"),
    )
