package helpers

import "os"

func IsDebug() bool {
	return os.Getenv("APP_DEBUG") == "true"
}
