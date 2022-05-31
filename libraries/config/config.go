package config

import (
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
	"path"
	"strings"
)

func Read(root string) {
	// need to use bazel runfiles path - most accurate
	dir, err := bazel.RunfilesPath()

	if err != nil {
		panic(err)
	}

	rt := path.Join(dir, root)

	viper.Set("root_directory", rt)

	err = godotenv.Load(rt + "/.env")

	viper.SetConfigFile(rt + "/config.toml")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			// Config file not found; ignore error if desired
			panic(err)
		} else {
			// Config file was found but another error was produced
			panic(err)
		}
	}
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
