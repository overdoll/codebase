package principal

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"net/http"
	"overdoll/libraries/passport"
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

			// for not found error, special case
			if e, ok := status.FromError(err); ok {
				switch e.Code() {
				case codes.NotFound:
					c.Next()
					return
				}
			}

			zap.S().Error("unable to get account ", zap.Error(err))
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "unable to resolve principal"})
			return
		}

		if principal != nil {
			c.Request = c.Request.WithContext(toContext(c.Request.Context(), principal))
		}

		c.Next()
	}
}
