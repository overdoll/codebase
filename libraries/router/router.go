package router

import (
	sentrygin "github.com/getsentry/sentry-go/gin"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"overdoll/libraries/passport"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
	"time"
)

func init() {
	gin.SetMode(gin.ReleaseMode)
}

func NewGinRouter() *gin.Engine {
	router := NewRawGinRouter()
	router.Use(passport.GinPassportRequestMiddleware())
	return router
}

// NewRawGinRouter Gin router, but without middleware
func NewRawGinRouter() *gin.Engine {

	router := gin.New()

	if support.IsDebug() {
		// gin's default loggers are easier to read on the CLI for panic recoveries
		router.Use(gin.Recovery())
		// we also don't log API routes because there's really no point since most of them are graphql calls anyways
	} else {
		router.Use(ginzap.Ginzap(zap.L(), time.RFC3339, true))
		router.Use(ginzap.RecoveryWithZap(zap.L(), true))
	}

	router.Use(sentrygin.New(sentrygin.Options{
		Repanic: true,
	}))

	// add sentry to our gin middleware using sentry gin
	router.Use(sentry_support.SentryGinMiddleware())

	return router
}
