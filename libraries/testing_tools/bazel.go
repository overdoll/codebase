package testing_tools

import (
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"path"
)

func NormalizedPathFromBazelTarget(filePath string) (string, error) {
	dir, err := bazel.RunfilesPath()
	if err != nil {
		return "", err
	}

	return path.Join(dir, filePath), nil
}
