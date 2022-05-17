package router

import (
	"overdoll/libraries/passport"
	"overdoll/libraries/support"

	"github.com/gin-gonic/gin"
)

func NewGinRouter() *gin.Engine {
	router := NewRawGinRouter()
	router.Use(passport.GinPassportRequestMiddleware())
	return router
}

// NewRawGinRouter Gin router, but without middleware
func NewRawGinRouter() *gin.Engine {

	router := gin.Default()

	if support.IsDebug() {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	return router
}
