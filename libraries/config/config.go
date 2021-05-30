package config

import (
	"path"

	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/spf13/viper"
	"overdoll/libraries/helpers"
)

func Read(pt string) {

	dir, err := bazel.RunfilesPath()

	if err != nil {

		dir, err = helpers.GetBinaryDirectory()

		if err != nil {
			panic(err)
		}

		dir = path.Dir(dir)
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
