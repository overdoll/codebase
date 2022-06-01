package sentry_support

import (
	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
)

func SentryGinMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		if hub := sentrygin.GetHubFromContext(c); hub != nil {
			c.Request = c.Request.WithContext(sentry.SetHubOnContext(c.Request.Context(), hub))
		}
		c.Next()
	}
}
