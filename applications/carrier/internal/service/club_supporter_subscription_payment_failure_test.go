package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
)

func TestClubSupporterSubscriptionPaymentFailure(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier-club_supporter_subscription_payment_failure")

	_, err := client.ClubSupporterSubscriptionPaymentFailure(context.Background(), &carrier.ClubSupporterSubscriptionPaymentFailureRequest{
		Account:      &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: uuid.New().String()},
	})

	require.NoError(t, err, "no error for sending club supporter subscription payment failure")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Subscription Payment Failure", title.Text(), "has the correct email title")
}
