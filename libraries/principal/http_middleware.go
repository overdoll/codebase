package principal

import (
	"context"
	"fmt"
	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"net/http"
	"overdoll/libraries/passport"
	"overdoll/libraries/support"
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

			// add principal to context
			if hub := sentry.GetHubFromContext(c.Request.Context()); hub != nil {
				hub.Scope().SetUser(sentry.User{
					Email:     principal.Email(),
					ID:        principal.AccountId(),
					IPAddress: support.GetIPFromRequest(c.Request),
					Username:  principal.Username(),
				})

				var clubExtensions interface{}

				if principal.clubExtension != nil {
					clubExtensions = map[string]interface{}{
						"supportedClubIds":  principal.clubExtension.supportedClubIds,
						"clubMembershipIds": principal.clubExtension.clubMembershipIds,
						"ownerClubIds":      principal.clubExtension.ownerClubIds,
					}
				}

				hub.Scope().SetExtra("principal", map[string]interface{}{
					"accountId":     principal.accountId,
					"secure":        principal.secure,
					"locked":        principal.locked,
					"deleting":      principal.deleting,
					"roles":         principal.roles,
					"username":      principal.username,
					"email":         principal.email,
					"clubExtension": clubExtensions,
				})

				hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
					Category: "context.principal",
					Type:     "default",
					Message:  fmt.Sprintf("principal context with account id %s", principal.accountId),
					Level:    sentry.LevelInfo,
				}, 10)
			}
		}

		c.Next()
	}
}
