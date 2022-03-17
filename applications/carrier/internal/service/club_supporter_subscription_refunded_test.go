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

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.ClubSupporterSubscriptionRefunded(context.Background(), &carrier.ClubSupporterSubscriptionRefundedRequest{
		Account:      &carrier.Account{Id: accountId},
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
