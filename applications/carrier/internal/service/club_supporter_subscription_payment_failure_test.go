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

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.ClubSupporterSubscriptionPaymentFailure(context.Background(), &carrier.ClubSupporterSubscriptionPaymentFailureRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: uuid.New().String()},
	})

	require.NoError(t, err, "no error for sending club supporter subscription payment failure")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Subscription Payment Failure", title.Text(), "has the correct email title")
}
