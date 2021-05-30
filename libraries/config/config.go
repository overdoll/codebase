package config

import (
	"path"

	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/spf13/viper"
)

func Read(pt string) {

	// need to use bazel runfiles path - most accurate
	dir, err := bazel.RunfilesPath()

	if err != nil {
		panic(err)
	}

	viper.SetConfigFile(path.Join(dir, pt))

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
