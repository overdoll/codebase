package helpers

import (
	"context"
	"net/http/httptest"

	"github.com/gin-gonic/gin"
)

func GinContextFromContext(ctx context.Context) *gin.Context {
	raw, _ := ctx.Value("GinContextKey").(*gin.Context)
	return raw
}

func GinContextWithTesting(ctx context.Context) context.Context {
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest("POST", "/asd", nil)
	return context.WithValue(ctx, "GinContextKey", c)
}
