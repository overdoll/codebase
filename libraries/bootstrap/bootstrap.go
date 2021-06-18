package bootstrap

import (
	"context"
	"log"
	"os"
	"path"

	"go.uber.org/zap"
	"overdoll/libraries/helpers"
)

type Bootstrap struct {
	context   context.Context
	directory string
}

func NewBootstrap(ctx context.Context) (Bootstrap, error) {

	dir, err := helpers.GetBinaryDirectory()

	if err != nil {
		log.Fatal("error loading directory")
	}

	directory := path.Dir(dir)

	logger, err := zap.NewProduction()

	if os.Getenv("APP_DEBUG") == "true" {
		logger, err = zap.NewDevelopment()
	}

	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
	}

	defer logger.Sync()

	zap.ReplaceGlobals(logger)

	return Bootstrap{
		context:   ctx,
		directory: directory,
	}, nil
}

func (b Bootstrap) GetCurrentDirectory() string {
	return b.directory
}
