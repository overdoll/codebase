package ccbill

import (
	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
	"net/http"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/domain/ccbill"
)

func PaymentFlow(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		paymentLink, err := app.Commands.GenerateCCBillFlexFormsPaymentLink.Handle(c.Request.Context(), command.GenerateCCBillFlexFormsPaymentLink{
			PaymentToken: c.Request.URL.Query().Get("token"),
		})

		if err != nil {
			if err == ccbill.ErrFlexFormsPaymentLinkExpired {
				c.Data(http.StatusBadRequest, "text", []byte("expired link"))
				return
			}

			if hub := sentrygin.GetHubFromContext(c); hub != nil {
				hub.WithScope(func(scope *sentry.Scope) {
					hub.CaptureException(err)
				})
			}

			c.Data(http.StatusInternalServerError, "text", []byte("error"))
			return
		}

		link := paymentLink.GenerateFlexFormsPaymentUrl()

		// redirect to ccbill payment flow
		c.Redirect(http.StatusFound, link)

		return
	}
}
