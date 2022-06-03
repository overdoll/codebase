package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func CaptureException(ctx context.Context, err error) {
	if hub := sentry.GetHubFromContext(ctx); hub != nil {
		hub.CaptureException(err)
	}
}
