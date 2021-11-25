package bootstrap

import (
	"context"
	"log"
	"overdoll/libraries/helpers"

	"go.uber.org/zap"
)

func NewBootstrap(ctx context.Context) {

	logger, err := zap.NewProduction()

	if helpers.IsDebug() {
		logger, err = zap.NewDevelopment()
	}

	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
	}

	zap.ReplaceGlobals(logger)
}
