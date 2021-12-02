package passport

import (
	"bytes"
	"github.com/gin-gonic/gin"
)

func GinPassportRequestMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// first, add passport to context

		pass := fromRequest(c.Request)

		if pass != nil {
			newCtx := WithContext(c.Request.Context(), pass)
			c.Request = c.Request.WithContext(newCtx)
		}

		blw := &bodyLogWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer, ctx: c.Request.Context()}

		c.Writer = blw

		c.Next()
	}
}
