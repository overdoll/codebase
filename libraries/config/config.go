package config

import (
	"path"

	"github.com/spf13/viper"
	"overdoll/libraries/helpers"
)

const (
	CONFIG_FILE   = "config"
	CONFIG_FORMAT = "toml"
)

func Read() {
	dir, err := helpers.GetBinaryDirectory()

	if err != nil {
		panic(err)
	}

	directory := path.Dir(*dir)

	viper.SetConfigFile(directory + "/config.toml")

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
