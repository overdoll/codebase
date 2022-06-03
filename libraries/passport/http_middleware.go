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
				hub.WithScope(func(scope *sentry.Scope) {

					passportData := map[string]interface{}{
						"IP":        pass.IP(),
						"UserAgent": pass.UserAgent(),
						"DeviceId":  pass.DeviceID(),
					}

					if err := pass.Authenticated(); err == nil {
						passportData["SessionId"] = pass.SessionID()
						passportData["AccountId"] = pass.AccountID()
					}

					scope.SetExtra("passport", passportData)

					scope.AddBreadcrumb(&sentry.Breadcrumb{
						Category: "transport.passport",
						Type:     "default",
						Message:  fmt.Sprintf("passport transport with device id %s", pass.DeviceID()),
						Level:    sentry.LevelInfo,
					}, 10)
				})
			}
		}

		blw := &bodyLogWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer, ctx: c.Request.Context()}

		c.Writer = blw

		c.Next()
	}
}
