package ccbill

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
	ipRanges = [][]net.IP{
		{net.ParseIP("64.38.212.1"), net.ParseIP("64.38.212.254")},
		{net.ParseIP("64.38.215.1"), net.ParseIP("64.38.215.254")},
		{net.ParseIP("64.38.240.1"), net.ParseIP("64.38.240.254")},
		{net.ParseIP("64.38.241.1"), net.ParseIP("64.38.241.254")},
		{net.ParseIP("192.168.1.1"), net.ParseIP("192.168.255.255")},

		// TODO: temporary ip range of my machine for testing
		{net.ParseIP("184.146.205.157"), net.ParseIP("184.146.205.157")},
	}
)

func Webhook(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		ip := support.GetIPFromRequest(c.Request)

		trial := net.ParseIP(ip)
		if trial.To4() == nil {
			c.Data(http.StatusBadRequest, "text", nil)
			return
		}

		validIp := false

		for _, ipRange := range ipRanges {

			firstIp := ipRange[0]
			secondIp := ipRange[1]

			if bytes.Compare(trial, firstIp) >= 0 && bytes.Compare(trial, secondIp) <= 0 {
				validIp = true
				break
			}
		}

		if !validIp {
			c.Data(http.StatusBadRequest, "text", []byte("bad ip"))
			return
		}

		// valid IP ranges, proceed
		var buf bytes.Buffer
		tee := io.TeeReader(c.Request.Body, &buf)
		body, _ := ioutil.ReadAll(tee)

		fmt.Println(string(body))

		if err := app.Commands.ProcessCCBillWebhook.Handle(c.Request.Context(), command.ProcessCCBillWebhook{
			Payload:   body,
			EventType: c.Request.URL.Query()["eventType"][0],
		}); err != nil {
			fmt.Println(err)
			c.Data(http.StatusInternalServerError, "text", []byte("internal server error"))
			return
		}

		c.Data(http.StatusOK, "text", []byte("success"))
		return
	}
}
