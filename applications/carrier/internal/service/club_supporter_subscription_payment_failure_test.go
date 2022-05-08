package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestClubSupporterSubscriptionPaymentFailure(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.ClubSupporterSubscriptionPaymentFailure(context.Background(), &carrier.ClubSupporterSubscriptionPaymentFailureRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: uuid.New().String()},
	})

	require.NoError(t, err, "no error for sending club supporter subscription payment failure")

	doc := waitForEmailAndGetDocument(t, email, timestampFrom)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Subscription Failed", title.Text(), "has the correct email title")
}
