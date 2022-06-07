package principal

import (
	"context"
	"github.com/gin-gonic/gin"
	"overdoll/libraries/passport"
)

const (
	HttpMiddlewareErrorKey = "PrincipalError"
)

type HttpServicePrincipalFunc interface {
	PrincipalById(ctx context.Context, id string) (*Principal, error)
}

func GinPrincipalRequestMiddleware(srv HttpServicePrincipalFunc) gin.HandlerFunc {
	return func(c *gin.Context) {

		if srv == nil {
			c.Next()
			return
		}

		ctx := c.Request.Context()

		pass := passport.FromContext(ctx)

		if pass == nil {
			c.Next()
			return
		}

		if err := pass.Authenticated(); err != nil {
			c.Next()
			return
		}

		principal, err := srv.PrincipalById(ctx, pass.AccountID())

		if err != nil {
			c.Set(HttpMiddlewareErrorKey, err)
			return
		}

		if principal != nil {
			c.Request = c.Request.WithContext(toContext(c.Request.Context(), principal))
		}

		c.Next()
	}
}
