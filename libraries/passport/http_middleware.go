package passport

import (
	"bytes"
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
					scope.AddBreadcrumb(&sentry.Breadcrumb{
						Category: "Passport",
						Data: map[string]interface{}{
							"IP":        pass.IP(),
							"AccountId": pass.SafeAccountID(),
							"UserAgent": pass.UserAgent(),
							"DeviceId":  pass.DeviceID(),
							"SessionId": pass.SessionID(),
						},
						Level: sentry.LevelInfo,
					}, 1)
				})
			}
		}

		blw := &bodyLogWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer, ctx: c.Request.Context()}

		c.Writer = blw

		c.Next()
	}
}
