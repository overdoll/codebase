package principal

import (
	"context"
	"go.uber.org/zap"
	"overdoll/libraries/passport"

	"github.com/gin-gonic/gin"
)

type HttpServicePrincipalFunc interface {
	PrincipalById(ctx context.Context, id string) (*Principal, error)
}

func GinPrincipalRequestMiddleware(srv HttpServicePrincipalFunc) gin.HandlerFunc {
	return func(c *gin.Context) {

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
			zap.S().Error("unable to get account ", zap.Error(err))
			c.Abort()
			return
		}

		if principal != nil {
			c.Request = c.Request.WithContext(toContext(c.Request.Context(), principal))
		}

		c.Next()
	}
}
