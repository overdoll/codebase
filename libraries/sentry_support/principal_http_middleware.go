package sentry_support

import (
	"fmt"
	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
	"overdoll/libraries/errors/graphql"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
)

func PrincipalHttpMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		// check for principal error and parse + catch it
		value, exists := c.Get(principal.HttpMiddlewareErrorKey)

		if exists {
			err := value.(error)
			zap.S().Errorw("unable to resolve principal by id", zap.Error(err))

			if hub := sentry.GetHubFromContext(c.Request.Context()); hub != nil {
				hub.CaptureException(err)
			}

			if c.Request.URL.Path == "/api/graphql" {
				c.AbortWithStatusJSON(http.StatusOK, graphql.InternalServerError)
			} else {
				c.Data(http.StatusInternalServerError, "text", []byte("internal server error"))
			}
		}

		if prin := principal.FromContext(c.Request.Context()); prin != nil {
			// add principal to context
			if hub := sentry.GetHubFromContext(c.Request.Context()); hub != nil {
				hub.Scope().SetUser(sentry.User{
					Email:     prin.Email(),
					ID:        prin.AccountId(),
					IPAddress: support.GetIPFromRequest(c.Request),
					Username:  prin.Username(),
				})

				var clubExtensions interface{}

				if prin.ClubExtension() != nil {
					clubExtensions = map[string]interface{}{
						"supportedClubIds":  prin.ClubExtension().SupportedClubIds(),
						"clubMembershipIds": prin.ClubExtension().SupportedClubIds(),
						"ownerClubIds":      prin.ClubExtension().OwnerClubIds(),
					}
				}

				hub.Scope().SetExtra("principal", map[string]interface{}{
					"accountId":     prin.AccountId(),
					"secure":        prin.IsSecure(),
					"locked":        prin.IsLocked(),
					"deleting":      prin.IsDeleting(),
					"roles":         prin.Roles(),
					"username":      prin.Username(),
					"email":         prin.Email(),
					"clubExtension": clubExtensions,
				})

				hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
					Category: "context.principal",
					Type:     "default",
					Message:  fmt.Sprintf("principal context with account id %s", prin.AccountId()),
					Level:    sentry.LevelInfo,
				}, 10)
			}
		}

		c.Next()
	}
}
