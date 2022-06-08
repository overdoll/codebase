package sentry_support

import "github.com/getsentry/sentry-go"

func SetServerType(tp string) {
	if hub := sentry.CurrentHub(); hub != nil {
		hub.Scope().SetTag("server_type", tp)
	}
}
