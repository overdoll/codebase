package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
)

func TestClubSupporterSubscriptionRefunded(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier-club_supporter_subscription_refunded")

	_, err := client.ClubSupporterSubscriptionRefunded(context.Background(), &carrier.ClubSupporterSubscriptionRefundedRequest{
		Account:      &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: uuid.New().String()},
		Refund: &carrier.Payment{
			Amount:   10,
			Currency: "USD",
		},
		Transaction: &carrier.Transaction{Id: uuid.New().String()},
	})

	require.NoError(t, err, "no error for sending club supporter subscription refunded")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Subscription Refunded", title.Text(), "has the correct email title")
}
