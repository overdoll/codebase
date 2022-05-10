package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/new_club_supporter_subscription_test.html
var newClubSupporterSubscriptionHtml string

//go:embed file_fixtures/new_club_supporter_subscription_test.txt
var newClubSupporterSubscriptionText string

func TestNewClubSupporterSubscription(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_new_subscription"
	email := generateEmail("carrier-" + accountId)

	tm, err := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")
	require.NoError(t, err, "no error parsing time")

	_, err = client.NewClubSupporterSubscription(context.Background(), &carrier.NewClubSupporterSubscriptionRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Payment: &carrier.Payment{
			Amount:   10,
			Currency: "USD",
		},
		BillingDate:     timestamppb.New(tm),
		NextBillingDate: timestamppb.New(tm.Add(time.Hour * 24)),
	})

	require.NoError(t, err, "no error for sending new club supporter subscription")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Email confirmation for subscription 25WqY2AZfmlykwqKhQagxmI9gtd", content.Subject, "correct subject for the email")
	//require.Equal(t, newClubSupporterSubscriptionHtml, content.Html, "correct content for the email html")
	require.Equal(t, newClubSupporterSubscriptionText, content.Text, "correct content for the email text")
}
