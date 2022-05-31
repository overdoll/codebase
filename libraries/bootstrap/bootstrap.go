package bootstrap

import (
	"context"
	"github.com/getsentry/sentry-go"
	"go.uber.org/zap"
	"log"
	"os"
	"overdoll/libraries/support"
)

func NewBootstrap(ctx context.Context) {

	logger, err := zap.NewProduction()

	if support.IsDebug() {
		logger, err = zap.NewDevelopment()
	}

	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
	}

	zap.ReplaceGlobals(logger)

	if err := sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		TracesSampleRate: 0.0,
	}); err != nil {
		zap.S().Errorf("Sentry initialization failed: %v\n", err)
	}
}
