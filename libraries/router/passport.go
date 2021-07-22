package router

import (
	"github.com/gin-gonic/gin"
	"overdoll/libraries/passport"
)

func PassportToContext() gin.HandlerFunc {
	return func(c *gin.Context) {
		req := passport.BodyToContext(c)
		if req != nil {
			c.Request = req
		}
		c.Next()
	}
}
