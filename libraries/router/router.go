package router

import (
	"overdoll/libraries/helpers"

	"github.com/gin-gonic/gin"
)

func NewGinRouter() *gin.Engine {

	router := gin.Default()

	if helpers.IsDebug() {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	router.Use(GinContextToContextMiddleware())
	router.Use(LanguageToContext())
	router.Use(PassportToContext())
	router.Use(CassandraQueryObserverToContext())
	router.Use(CassandraQueryObserverGetMetrics())

	return router
}
