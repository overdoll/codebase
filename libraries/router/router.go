package router

import (
	"os"

	"github.com/gin-gonic/gin"
)

func NewGinRouter() *gin.Engine {

	router := gin.Default()

	if os.Getenv("APP_DEBUG") == "true" {
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
