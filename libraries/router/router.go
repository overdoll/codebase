package router

import (
	"os"

	"github.com/gin-gonic/gin"
	"overdoll/libraries/middleware"
)

func NewGinRouter() *gin.Engine {

	router := gin.Default()

	if os.Getenv("APP_DEBUG") == "true" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Add gin context to context
	router.Use(middleware.GinContextToContextMiddleware())
	router.Use(middleware.PassportToContext())

	return router
}
