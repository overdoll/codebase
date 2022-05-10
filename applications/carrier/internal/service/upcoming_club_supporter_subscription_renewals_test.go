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

//go:embed file_fixtures/upcoming_club_supporter_subscription_renewals_test.html
var upcomingClubSupporterSubscriptionRenewalsHtml string

//go:embed file_fixtures/upcoming_club_supporter_subscription_renewals_test.txt
var upcomingClubSupporterSubscriptionRenewalsText string

func TestUpcomingClubSupporterSubscriptionRenewals(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_renewals"
	email := generateEmail("carrier-" + accountId)

	tm, err := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")
	require.NoError(t, err, "no error parsing time")

	_, err = client.UpcomingClubSupporterSubscriptionRenewals(context.Background(), &carrier.UpcomingClubSupporterSubscriptionRenewalsRequest{
		Account: &carrier.Account{Id: accountId},
		Renewals: []*carrier.SubscriptionRenewal{{
			Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
			Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
			Payment: &carrier.Payment{
				Amount:   699,
				Currency: "USD",
			},
			BillingDate: timestamppb.New(tm),
		}},
	})

	require.NoError(t, err, "no error for sending upcoming club supporter subscription renewals")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Upcoming Subscription Renewals", content.Subject, "correct subject for the email")
	require.Equal(t, upcomingClubSupporterSubscriptionRenewalsHtml, content.Html, "correct content for the email html")
	require.Equal(t, upcomingClubSupporterSubscriptionRenewalsText, content.Text, "correct content for the email text")
}
