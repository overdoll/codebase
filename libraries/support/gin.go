package support

import (
	"context"

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
