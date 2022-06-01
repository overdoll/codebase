package bootstrap

import (
	"context"
	"github.com/getsentry/sentry-go"
	"go.uber.org/zap"
	"os"
)

func NewBootstrap(ctx context.Context) {
	if err := sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		TracesSampleRate: 0.0,
	}); err != nil {
		zap.S().Errorf("sentry initialization failed: %v\n", err)
	}
}
