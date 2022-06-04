package sentry_support

import (
	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net"
	"net/http"
	"os"
	"overdoll/libraries/errors/graphql"
	"overdoll/libraries/zap_support"
	"strings"
)

func SentryToContextGinMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		if hub := sentrygin.GetHubFromContext(c); hub != nil {
			c.Request = c.Request.WithContext(sentry.SetHubOnContext(c.Request.Context(), hub))
		}
		c.Next()
	}
}

func SentryRecoveryGinMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Check for a broken connection, as it is not really a
				// condition that warrants a panic stack trace.
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					if se, ok := ne.Err.(*os.SyscallError); ok {
						if strings.Contains(strings.ToLower(se.Error()), "broken pipe") || strings.Contains(strings.ToLower(se.Error()), "connection reset by peer") {
							brokenPipe = true
						}
					}
				}

				if brokenPipe {
					c.Error(err.(error))
					c.Abort()
					return
				}

				zap_support.SafePanic("panic during http request", zap.Any("stack", err))

				if c.Request.URL.Path == "/api/graphql" {
					c.AbortWithStatusJSON(http.StatusOK, graphql.InternalServerError)
				} else {
					c.Data(http.StatusInternalServerError, "text", []byte("internal server error"))
				}
			}
		}()
		c.Next()
	}
}
