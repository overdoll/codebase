package config

import (
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
	"path"
	"strings"
)

func Read(root string) {

	// need to use bazel run files path - most accurate
	dir, _ := bazel.RunfilesPath()

	rt := path.Join(dir, root)

	viper.Set("root_directory", rt)

	_ = godotenv.Load(rt + "/.env")

	viper.SetConfigFile(rt + "/config.toml")

	_ = viper.ReadInConfig()
}

// GetFilePath - get file path
// if path is prefixed with "/", will not use root directory
// otherwise, it's relative
func GetFilePath(file string) string {
	if strings.HasPrefix(file, "/") {
		return file
	}

	return viper.GetString("root_directory") + "/" + file
}
