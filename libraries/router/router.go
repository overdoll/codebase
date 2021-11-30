package router

import (
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"

	"github.com/gin-gonic/gin"
)

func NewGinRouter() *gin.Engine {

	router := NewRawGinRouter()

	router.Use(GinContextToContextMiddleware())
	router.Use(LanguageToContext())
	router.Use(passport.GinPassportRequestMiddleware())
	router.Use(CassandraQueryObserverToContext())
	router.Use(CassandraQueryObserverGetMetrics())

	return router
}

// Gin router, but without middleware
func NewRawGinRouter() *gin.Engine {

	router := gin.Default()

	if helpers.IsDebug() {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	return router
}
