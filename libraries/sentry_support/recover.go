package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func Recover(ctx context.Context, err interface{}) {
	if hub := sentry.GetHubFromContext(ctx); hub != nil {
		defer hub.RecoverWithContext(ctx, err)
	}
}
