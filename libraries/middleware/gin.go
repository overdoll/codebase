package middleware

import (
	"context"

	"github.com/gin-gonic/gin"
	"overdoll/libraries/helpers"
)

type Body struct {
	Query     string
	Variables interface{}
}

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), helpers.GinContextType(helpers.GinKey), c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
