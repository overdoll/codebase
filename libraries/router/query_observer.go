package router

import (
	"context"

	"github.com/gin-gonic/gin"
	"overdoll/libraries/bootstrap"
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
