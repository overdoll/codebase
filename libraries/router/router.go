package router

import (
	"context"
	"os"

	"github.com/gin-gonic/gin"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

type CassandraQueryObserverContextType string

const (
	QueryObserverKey = "QueryObserverKey"
)

func QueryObserverFromContext(ctx context.Context) *bootstrap.CassandraQueryObserver {
	raw := ctx.Value(CassandraQueryObserverContextType(QueryObserverKey))

	if raw != nil {
		return raw.(*bootstrap.CassandraQueryObserver)
	}

	return nil
}

func PassportToContext() gin.HandlerFunc {
	return func(c *gin.Context) {
		req := passport.BodyToContext(c)
		if req != nil {
			c.Request = req
		}
		c.Next()
	}
}

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), helpers.GinContextType(helpers.GinKey), c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func CassandraQueryObserverToContext() gin.HandlerFunc {
	return func(c *gin.Context) {
		observer := bootstrap.NewCassandraQueryObserver()
		ctx := context.WithValue(c.Request.Context(), CassandraQueryObserverContextType(QueryObserverKey), observer)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func CassandraQueryObserverGetMetrics() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		observer := QueryObserverFromContext(c.Request.Context())
		observer.GetMetrics()
	}
}

func NewGinRouter() *gin.Engine {

	router := gin.Default()

	if os.Getenv("APP_DEBUG") == "true" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Add gin context to context
	router.Use(PassportToContext())
	router.Use(GinContextToContextMiddleware())
	router.Use(CassandraQueryObserverToContext())
	router.Use(CassandraQueryObserverGetMetrics())

	return router
}
