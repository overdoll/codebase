package router

import (
	sentrygin "github.com/getsentry/sentry-go/gin"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
)

func init() {
	gin.SetMode(gin.ReleaseMode)
}

func NewGinRouter(principalService principal.HttpServicePrincipalFunc) *gin.Engine {
	router := NewRawGinRouter()
	router.Use(passport.GinPassportRequestMiddleware())
	router.Use(sentry_support.PassportHttpMiddleware())
	router.Use(principal.GinPrincipalRequestMiddleware(principalService))
	router.Use(sentry_support.PrincipalHttpMiddleware())
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
		router.Use(customLogger(zap.L()))
		router.Use(ginzap.RecoveryWithZap(zap.L(), true))
	}

	router.Use(sentrygin.New(sentrygin.Options{
		Repanic: true,
	}))

	// add sentry to our gin middleware using sentry gin
	router.Use(sentry_support.SentryGinMiddleware())

	return router
}

func customLogger(logger *zap.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		if len(c.Errors) > 0 {
			// Append error field if this is an erroneous request.
			for _, e := range c.Errors.Errors() {
				logger.Error(e)
			}
		}
	}
}
