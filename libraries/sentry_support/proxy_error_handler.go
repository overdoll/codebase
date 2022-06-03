package sentry_support

import (
	"github.com/getsentry/sentry-go"
	"net/http"
)

func ProxyErrorHandler(res http.ResponseWriter, req *http.Request, err error) {

	if hub := sentry.GetHubFromContext(req.Context()); err != nil {
		hub.CaptureException(err)
	}

	res.WriteHeader(http.StatusInternalServerError)
}
