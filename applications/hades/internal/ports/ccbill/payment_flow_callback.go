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

			zap.S().Errorw("error parsing ccbill FlexForm and generating template", zap.Error(err))
			sentry_support.CaptureException(c.Request.Context(), err)
			c.Data(http.StatusInternalServerError, "text", []byte("error"))
			return
		}

		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(*templatedString))
		return
	}
}
