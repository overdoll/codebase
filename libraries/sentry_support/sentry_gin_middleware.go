package sentry_support

import (
	"context"
	"fmt"
	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net"
	"net/http"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/graphql"
	"overdoll/libraries/support"
	"overdoll/libraries/zap_support"
	"strings"
	"time"
)

// Check for a broken connection, as this is what Gin does already.
func isBrokenPipeError(err interface{}) bool {
	if netErr, ok := err.(*net.OpError); ok {
		if sysErr, ok := netErr.Err.(*os.SyscallError); ok {
			if strings.Contains(strings.ToLower(sysErr.Error()), "broken pipe") ||
				strings.Contains(strings.ToLower(sysErr.Error()), "connection reset by peer") {
				return true
			}
		}
	}
	return false
}

func SentryGinMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		hub := sentry.GetHubFromContext(c.Request.Context())
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
		}
		hub.Scope().SetRequest(c.Request)
		c.Request = c.Request.WithContext(sentry.SetHubOnContext(c.Request.Context(), hub))

		if r := recover(); r != nil {
			if !isBrokenPipeError(r) {
				var err error
				errors.RecoverPanic(r, &err)

				if support.IsDebug() {
					fmt.Println(err)
					zap_support.SafePanic("panic during http request")
				} else {
					zap_support.SafePanic("panic during http request", zap.Error(err))
				}

				eventID := hub.RecoverWithContext(
					context.WithValue(c.Request.Context(), sentry.RequestContextKey, r),
					err,
				)

				if eventID != nil {
					hub.Flush(time.Second * 2)
				}

				if c.Request.URL.Path == "/api/graphql" {
					c.AbortWithStatusJSON(http.StatusOK, graphql.InternalServerError)
				} else {
					c.Data(http.StatusInternalServerError, "text", []byte("internal server error"))
				}
			}
		}

		c.Next()
	}
}
