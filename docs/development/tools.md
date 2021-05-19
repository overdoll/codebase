---
description: This section will show some common commands used during development
---

# Tools

### Adding a new Go dependency

To add a new Go dependency, first run your `go get` command

Then, when the new dependency is added, you must tell Bazel about this new dependency. To do this, run the following command from the root of the repository:

```text
bazel run :gazelle -- update-repos -from_file=go.mod
```

This will add the new dependency to Bazel, and you may now use it in your code

### Importing a new Go dependency or adding a new file

When you import a new dependency or add a new .go file, you must run the gazelle command so that Bazel knows to build it:

```text
bazel run :gazelle
```

###
