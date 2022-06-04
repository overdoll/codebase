package router

import (
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/sentry_support"
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

	// log any errors that occurred
	router.Use(customLogger(zap.S()))

	// recover errors during panics (sentry will panic when errors are caught, so we can log them and move on afterwards)
	router.Use(sentry_support.SentryRecoveryGinMiddleware())

	router.Use(sentrygin.New(sentrygin.Options{
		Repanic: true,
	}))

	// add sentry to our gin middleware using sentry gin
	router.Use(sentry_support.SentryToContextGinMiddleware())

	return router
}

func customLogger(logger *zap.SugaredLogger) gin.HandlerFunc {
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
