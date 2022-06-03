package bootstrap

import (
	"context"
	"github.com/getsentry/sentry-go"
	"go.uber.org/zap"
	"log"
	"os"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/zap_support"
)

func NewBootstrap(ctx context.Context) {

	logger, err := zap_support.NewCustomZap()

	if err != nil {
		log.Fatalf("can't initialize zap logger: %v", err)
	}

	zap.ReplaceGlobals(logger)

	if err := sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		TracesSampleRate: 0.0,
		Release:          os.Getenv("APP_VERSION"),
		Environment:      os.Getenv("APP_ENV"),
		BeforeSend:       sentry_support.BeforeSendHook,
	}); err != nil {
		zap.S().Errorf("sentry initialization failed: %v\n", err)
	}
}
