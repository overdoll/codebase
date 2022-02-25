package ccbill

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
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
			fmt.Println(err.Error())
			c.JSON(http.StatusInternalServerError, "error")
			return
		}

		c.Writer.Header().Set("Content-Type", "text/html; charset=utf-8")

		if _, err := c.Writer.Write([]byte(*templatedString)); err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusInternalServerError, "error")
			return
		}

		c.JSON(http.StatusOK, nil)
		return
	}
}
