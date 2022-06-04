package bootstrap

import (
	"github.com/getsentry/sentry-go"
	"go.uber.org/zap"
	"log"
	"os"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/zap_support"
)

func NewBootstrap() {

	logger, err := zap_support.NewCustomZap()

	if err != nil {
		log.Fatalf("zap logger initialization failed: %v", err)
	}

	zap.ReplaceGlobals(logger)

	if err := sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		TracesSampleRate: 0.0,
		Release:          os.Getenv("APP_VERSION"),
		Environment:      os.Getenv("APP_ENV"),
		BeforeSend:       sentry_support.BeforeSendHook,
	}); err != nil {
		zap.S().Fatalw("sentry initialization failed", zap.Error(err))
	}
}
