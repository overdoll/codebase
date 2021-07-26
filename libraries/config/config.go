package config

import (
	"path"

	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

func Read(root string) {
	// need to use bazel runfiles path - most accurate
	dir, err := bazel.RunfilesPath()

	if err != nil {
		panic(err)
	}

	err = godotenv.Load(path.Join(dir, root) + "/.env")

	viper.SetConfigFile(path.Join(dir, root) + "/config.toml")

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
