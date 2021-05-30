package helpers

import (
	"os"
	"path/filepath"
)

// Instead of having to define a directory string, we get the current binary directory, which
// is much easier to work with since all services have the same binary directory, meaning
// we only have to work with relative paths
func GetBinaryDirectory() (string, error) {

	ex, err := os.Executable()
	if err != nil {
		return "", err
	}

	exPath := filepath.Dir(ex)

	return exPath, nil
}
