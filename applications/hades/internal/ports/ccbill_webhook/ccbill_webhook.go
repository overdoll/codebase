package ccbill_webhook

import (
	"bytes"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"io/ioutil"
	"net"
	"net/http"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/libraries/support"
)

var (
	ipRangeFirstOne = net.ParseIP("64.38.212.1")
	ipRangeFirstTwo = net.ParseIP("64.38.212.254")

	ipRangeSecondOne = net.ParseIP("64.38.215.1")
	ipRangeSecondTwo = net.ParseIP("64.38.215.254")

	ipRangeThirdOne = net.ParseIP("64.38.240.1")
	ipRangeThirdTwo = net.ParseIP("64.38.240.254")

	ipRangeFourthOne = net.ParseIP("64.38.241.1")
	ipRangeFourthTwo = net.ParseIP("64.38.241.254")

	ipRangeFifthOne = net.ParseIP("192.168.1.1")
	ipRangeFifthTwo = net.ParseIP("192.168.255.255")
)

func CCBillWebhook(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		trial := net.ParseIP(support.GetIPFromRequest(c.Request))
		if trial.To4() == nil {
			c.JSON(http.StatusBadRequest, map[string]string{"message": "invalid ip header"})
			return
		}

		if (bytes.Compare(trial, ipRangeFirstOne) >= 0 && bytes.Compare(trial, ipRangeFirstTwo) <= 0) ||
			(bytes.Compare(trial, ipRangeSecondOne) >= 0 && bytes.Compare(trial, ipRangeSecondTwo) <= 0) ||
			(bytes.Compare(trial, ipRangeThirdOne) >= 0 && bytes.Compare(trial, ipRangeThirdTwo) <= 0) ||
			(bytes.Compare(trial, ipRangeFourthOne) >= 0 && bytes.Compare(trial, ipRangeFourthTwo) <= 0) ||
			(bytes.Compare(trial, ipRangeFifthOne) >= 0 && bytes.Compare(trial, ipRangeFifthTwo) <= 0) {

			// valid IP ranges, proceed

			var buf bytes.Buffer
			tee := io.TeeReader(c.Request.Body, &buf)
			body, _ := ioutil.ReadAll(tee)

			if err := app.Commands.ProcessCCBillWebhook.Handle(c.Request.Context(), command.ProcessCCBillWebhook{
				Payload:   body,
				EventType: c.Request.URL.Query()["eventType"][0],
			}); err != nil {
				fmt.Println(err)
				c.JSON(http.StatusBadRequest, map[string]string{"message": "error processing webhook"})
				return
			}

			c.JSON(http.StatusOK, map[string]string{"message": "success"})
		}

		c.JSON(http.StatusBadRequest, map[string]string{"message": "invalid ip"})
	}
}
