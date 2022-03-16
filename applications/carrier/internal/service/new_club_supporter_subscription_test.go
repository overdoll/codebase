package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestNewClubSupporterSubscription(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier-new_club_supporter_subscription")

	_, err := client.NewClubSupporterSubscription(context.Background(), &carrier.NewClubSupporterSubscriptionRequest{
		Account:      &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"},
		Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription: &carrier.Subscription{Id: uuid.New().String()},
		Payment: &carrier.Payment{
			Amount:   10,
			Currency: "USD",
		},
		BillingDate:     timestamppb.New(time.Now()),
		NextBillingDate: timestamppb.New(time.Now().Add(time.Hour * 24)),
	})

	require.NoError(t, err, "no error for sending new club supporter subscription")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "New Subscription", title.Text(), "has the correct new subscription details")
}
