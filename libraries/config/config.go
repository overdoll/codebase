package config

import (
	"github.com/getsentry/sentry-go"
	"go.uber.org/zap"
	"os"
	"path"
	"strings"
	"time"

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

	if err := sentry.Init(sentry.ClientOptions{
		Dsn: os.Getenv("SENTRY_DSN"),
	}); err != nil {
		zap.S().Errorf("Sentry initialization failed: %v\n", err)
	}

	defer sentry.Flush(5 * time.Second)
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
