package ccbill

import (
	"bytes"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
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
		{net.ParseIP("127.0.0.1"), net.ParseIP("127.0.0.1")},
		{net.ParseIP("172.16.0.0"), net.ParseIP("172.31.255.255")},
		{net.ParseIP("10.0.0.0"), net.ParseIP("10.255.255.255")},
	}
)

func Webhook(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		ip := support.GetIPFromRequest(c.Request)

		trial := net.ParseIP(ip)
		if trial.To4() == nil {
			zap.S().Info("invalid ip header", zap.String("ip", ip))
			c.Data(http.StatusBadRequest, "text", []byte("invalid ip header"))
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
			zap.S().Info("bad ip", zap.String("ip", ip))
			c.Data(http.StatusBadRequest, "text", []byte("bad ip"))
			return
		}

		// valid IP ranges, proceed
		var buf bytes.Buffer
		tee := io.TeeReader(c.Request.Body, &buf)
		body, _ := ioutil.ReadAll(tee)

		eventType := c.Request.URL.Query()["eventType"][0]

		zap.S().Infow("incoming ccbill webhook", zap.String("payload", string(body)), zap.String("event", eventType))

		if err := app.Commands.ProcessCCBillWebhook.Handle(c.Request.Context(), command.ProcessCCBillWebhook{
			Payload:   body,
			EventType: eventType,
		}); err != nil {
			zap.S().Errorw("ccbill webhook failed", zap.Error(err))
			if hub := sentrygin.GetHubFromContext(c); hub != nil {
				hub.CaptureException(err)
			}
			c.Data(http.StatusInternalServerError, "text", []byte("internal server error"))
			return
		}

		c.Data(http.StatusOK, "text", []byte("success"))
		return
	}
}
