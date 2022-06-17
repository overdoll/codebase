package probe

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func ReadyZ() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
		c.Abort()
	}
}
