package router

import (
	"context"

	"github.com/gin-gonic/gin"
	"overdoll/libraries/support"
)

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), support.GinContextType(support.GinKey), c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
