package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	"time"
)

func CaptureException(ctx context.Context, err error) {
	if hub := sentry.GetHubFromContext(ctx); hub != nil {
		hub.CaptureException(err)
	}
}

func MustCaptureException(err error) {
	hub := sentry.CurrentHub().Clone()
	hub.CaptureException(err)
	defer hub.Flush(time.Second * 2)
}
