package helpers

import (
	"context"
	"net/http/httptest"

	"github.com/gin-gonic/gin"
)

type GinContextType string

const (
	GinKey = "GinContextKey"
)

func GinContextFromContext(ctx context.Context) *gin.Context {
	raw := ctx.Value(GinContextType(GinKey))

	if raw != nil {
		return raw.(*gin.Context)
	}

	return nil
}

func GinContextWithTesting(ctx context.Context) context.Context {
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest("POST", "/asd", nil)
	return context.WithValue(ctx, GinContextType(GinKey), c)
}
