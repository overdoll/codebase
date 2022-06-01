package config

import (
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"log"
	"overdoll/libraries/support"
	"path"
	"strings"
)

func Read(root string) {

	logger, err := zap.NewProduction()

	if support.IsDebug() {
		logger, err = zap.NewDevelopment()
	}

	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
	}

	zap.ReplaceGlobals(logger)

	// need to use bazel runfiles path - most accurate
	dir, _ := bazel.RunfilesPath()

	rt := path.Join(dir, root)

	viper.Set("root_directory", rt)

	_ = godotenv.Load(rt + "/.env")

	viper.SetConfigFile(rt + "/config.toml")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			// Config file not found; ignore error if desired
			zap.S().Fatalw("failed to read config - not found", zap.Error(err))
		} else {
			zap.S().Fatalw("failed to read config", zap.Error(err))
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
