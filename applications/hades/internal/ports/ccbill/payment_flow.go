package ccbill

import (
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
		}

		link := paymentLink.GenerateFlexFormsPaymentUrl()

		// redirect to ccbill payment flow
		c.Redirect(http.StatusFound, link)

		return
	}
}
