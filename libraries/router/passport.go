package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"overdoll/libraries/passport"
)

func PassportToContext() gin.HandlerFunc {
	return func(c *gin.Context) {
		// first, add passport to context
		req := passport.BodyToContext(c)
		if req != nil {
			c.Request = req
		}

		c.Next()

		c.Writer.Header().Add("test", "test")

		// then read passport from context and add it to the response
		pass := passport.FromContext(c.Request.Context())
		if err := pass.Authenticated(); err == nil {
			fmt.Println(pass.AccountID())
		}
	}
}
