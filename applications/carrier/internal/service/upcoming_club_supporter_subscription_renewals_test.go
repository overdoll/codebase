package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
)

func TestUpcomingClubSupporterSubscriptionRenewals(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier-upcoming_club_supporter_subscription_renewals")

	_, err := client.UpcomingClubSupporterSubscriptionRenewals(context.Background(), &carrier.UpcomingClubSupporterSubscriptionRenewalsRequest{
		Account:  &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"},
		Renewals: []*carrier.SubscriptionRenewal{{Subscription: &carrier.Subscription{Id: uuid.New().String()}}},
	})

	require.NoError(t, err, "no error for sending upcoming club supporter subscription renewals")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Upcoming Subscription Renewals", title.Text(), "has the correct email title")
}
