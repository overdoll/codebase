package sentry_support

import (
	"github.com/getsentry/sentry-go"
	"go.uber.org/zap"
	"os"
)

func SentryInit() {
	if err := sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		TracesSampleRate: 0.0,
		Release:          os.Getenv("APP_VERSION"),
		Environment:      os.Getenv("APP_ENV"),
		BeforeSend:       beforeSendHook,
		AttachStacktrace: true,
	}); err != nil {
		zap.S().Fatalw("sentry initialization failed", zap.Error(err))
	}
}
