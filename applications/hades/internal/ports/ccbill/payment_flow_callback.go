package ccbill

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/domain/ccbill"
)

func PaymentFlowCallback(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		// see query variables
		query := c.Request.URL.Query()

		templatedString, err := app.Commands.ParseCCBillFlexFormsResponseAndGenerateTemplate.Handle(c.Request.Context(),
			command.ParseCCBillFlexFormsResponseAndGenerateTemplate{
				PaymentToken:         query.Get("overdollPaymentToken"),
				CCBillSubscriptionId: query.Get("ccbillSubscriptionId"),
				CCBillResponseDigest: query.Get("ccbillResponseDigest"),
				CCBillDeclineCode:    query.Get("ccbillDeclineCode"),
				CCBillDenialId:       query.Get("ccbillDenialId"),
				CCBillDeclineReason:  query.Get("ccbillDeclineReason"),
			},
		)

		if err != nil {

			if err == ccbill.ErrSignatureCheckFailed {
				c.Data(http.StatusBadRequest, "text", []byte("bad signature"))
				return
			}

			fmt.Println(err.Error())
			c.Data(http.StatusInternalServerError, "text", []byte("error"))
			return
		}

		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(*templatedString))
		return
	}
}
