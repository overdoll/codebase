package ccbill

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/sentry_support"
)

func PaymentFlow(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		paymentToken := c.Request.URL.Query().Get("token")

		if paymentToken == "" {
			c.Data(http.StatusBadRequest, "text", []byte("payment token not present"))
			return
		}

		paymentLink, err := app.Commands.GenerateCCBillFlexFormsPaymentLink.Handle(c.Request.Context(), command.GenerateCCBillFlexFormsPaymentLink{
			PaymentToken: paymentToken,
		})

		if err != nil {
			if err == ccbill.ErrFlexFormsPaymentLinkExpired {
				c.Data(http.StatusBadRequest, "text", []byte("expired link"))
				return
			}

			zap.S().Errorw("error running payment flow", zap.Error(err))
			sentry_support.CaptureException(c.Request.Context(), err)
			c.Data(http.StatusInternalServerError, "text", []byte("internal server error"))
			return
		}

		link := paymentLink.GenerateFlexFormsPaymentUrl()

		// redirect to ccbill payment flow
		c.Redirect(http.StatusFound, link)

		return
	}
}
