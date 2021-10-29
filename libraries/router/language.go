package router

import (
	"github.com/gin-gonic/gin"
	"overdoll/libraries/translations"
)

func LanguageToContext() gin.HandlerFunc {
	return func(c *gin.Context) {
		req := translations.LanguageToContext(c)
		if req != nil {
			c.Request = req
		}
		c.Next()
	}
}
