package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/club_supporter_subscription_refunded_test.html
var clubSupporterSubscriptionRefundedHtml string

//go:embed file_fixtures/club_supporter_subscription_refunded_test.txt
var clubSupporterSubscriptionRefundedText string

func TestClubSupporterSubscriptionRefunded(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_refunded"
	email := generateEmail("carrier-" + accountId)

	_, err := client.ClubSupporterSubscriptionRefunded(context.Background(), &carrier.ClubSupporterSubscriptionRefundedRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Refund: &carrier.Payment{
			Amount:   10,
			Currency: "USD",
		},
		Transaction: &carrier.Transaction{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
	})

	require.NoError(t, err, "no error for sending club supporter subscription refunded")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Subscription refunded 25WqY2AZfmlykwqKhQagxmI9gtd", content.Subject, "correct subject for the email")
	//	require.Equal(t, clubSupporterSubscriptionRefundedHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubSupporterSubscriptionRefundedText, content.Text, "correct content for the email text")
}
