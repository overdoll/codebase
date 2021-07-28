package principal

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Helpers for adding and getting the principal from context.
// Note that each service should define their own way of grabbing the current principal by
// implementing a middleware that calls a function

type principalContextType string

const (
	key = "PrincipalContextKey"
)

func AddPrincipalToRequest(c *gin.Context, principal *Principal) *http.Request {
	return c.Request.WithContext(context.WithValue(c.Request.Context(), principalContextType(key), principal))
}

func FromContext(ctx context.Context) *Principal {
	return ctx.Value(principalContextType(key)).(*Principal)
}
