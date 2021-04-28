package helpers

import (
	"context"

	"github.com/gin-gonic/gin"
)

func GinContextFromContext(ctx context.Context) *gin.Context {
	raw, _ := ctx.Value("GinContextKey").(*gin.Context)
	return raw
}
