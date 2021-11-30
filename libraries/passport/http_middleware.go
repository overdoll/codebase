package passport

import (
	"bytes"
	"github.com/gin-gonic/gin"
)

func GinPassportRequestMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// first, add passport to context
		newCtx := toContext(c.Request.Context(), fromRequest(c.Request))
		c.Request = c.Request.WithContext(newCtx)

		blw := &bodyLogWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer, ctx: c.Request.Context()}

		c.Writer = blw

		c.Next()
	}
}
