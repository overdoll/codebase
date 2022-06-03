package passport

import (
	"bytes"
	"fmt"
	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
)

func GinPassportRequestMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// first, add passport to context

		pass := fromRequest(c.Request)

		if pass != nil {
			newCtx := withContext(c.Request.Context(), pass)
			c.Request = c.Request.WithContext(newCtx)

			// add sentry data to context
			if hub := sentry.GetHubFromContext(c.Request.Context()); hub != nil {
				passportData := map[string]interface{}{
					"ip":        pass.IP(),
					"userAgent": pass.UserAgent(),
					"deviceId":  pass.DeviceID(),
				}

				if err := pass.Authenticated(); err == nil {
					passportData["sessionId"] = pass.SessionID()
					passportData["accountId"] = pass.AccountID()
				}

				hub.Scope().SetExtra("passport", passportData)

				hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
					Category: "context.passport",
					Type:     "default",
					Message:  fmt.Sprintf("passport context with device id %s", pass.DeviceID()),
					Level:    sentry.LevelInfo,
				}, 10)
			}
		}

		blw := &bodyLogWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer, ctx: c.Request.Context()}

		c.Writer = blw

		c.Next()
	}
}
