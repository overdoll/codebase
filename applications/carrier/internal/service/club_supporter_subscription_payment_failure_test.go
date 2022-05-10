package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/account_deleted_test.html
var clubSupporterSubscriptionPaymentFailureHtml string

//go:embed file_fixtures/account_deleted_test.txt
var clubSupporterSubscriptionPaymentFailureText string

func TestClubSupporterSubscriptionPaymentFailure(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_payment_failure"
	email := generateEmail("carrier-" + accountId)

	_, err := client.ClubSupporterSubscriptionPaymentFailure(context.Background(), &carrier.ClubSupporterSubscriptionPaymentFailureRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
	})

	require.NoError(t, err, "no error for sending club supporter subscription payment failure")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Subscription renewal failure", content.Subject, "correct subject for the email")
	require.Equal(t, clubSupporterSubscriptionPaymentFailureHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubSupporterSubscriptionPaymentFailureText, content.Text, "correct content for the email text")
}
