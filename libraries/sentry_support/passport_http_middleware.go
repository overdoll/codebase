package sentry_support

import (
	"fmt"
	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
	"overdoll/libraries/passport"
)

func PassportHttpMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		if pass := passport.FromContext(c.Request.Context()); pass != nil {
			if hub := sentry.GetHubFromContext(c.Request.Context()); hub != nil {
				passportData := map[string]interface{}{
					"userAgent": pass.UserAgent(),
					"deviceId":  pass.DeviceID(),
				}

				if err := pass.Authenticated(); err == nil {
					passportData["sessionId"] = pass.SessionID()
					passportData["accountId"] = pass.AccountID()
				}

				hub.Scope().SetExtra("Passport", passportData)

				hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
					Category: "context.passport",
					Type:     "default",
					Message:  fmt.Sprintf("passport context with device id %s", pass.DeviceID()),
					Level:    sentry.LevelInfo,
				}, 10)
			}
		}

		c.Next()
	}
}
