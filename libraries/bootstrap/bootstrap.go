package bootstrap

import (
	"context"
	"log"
	"os"

	"go.uber.org/zap"
)

func NewBootstrap(ctx context.Context) {

	logger, err := zap.NewProduction()

	if os.Getenv("APP_DEBUG") == "true" {
		logger, err = zap.NewDevelopment()
	}

	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
	}

	zap.ReplaceGlobals(logger)
}
