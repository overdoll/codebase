package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func CaptureActivityError(ctx context.Context, err error) {

	if hub := sentry.GetHubFromContext(ctx); hub != nil {

	}

}
