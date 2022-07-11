package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func probeReadyZ() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
		c.Abort()
	}
}
