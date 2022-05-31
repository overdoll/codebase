package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func CaptureActivityError(ctx context.Context, err error) {

	if hub := sentry.GetHubFromContext(ctx); hub != nil {

		if r := recover(); r != nil {
			hub.RecoverWithContext(ctx, r)
			panic(r)
		}

		if err != nil {
			hub.CaptureException(err)
		}

	}

}
