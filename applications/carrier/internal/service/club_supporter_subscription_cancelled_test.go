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

func TestClubSupporterSubscriptionCancelled(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier-club_supporter_subscription_cancelled")

	_, err := client.ClubSupporterSubscriptionCancelled(context.Background(), &carrier.ClubSupporterSubscriptionCancelledRequest{
		Account:        &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"},
		Club:           &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription:   &carrier.Subscription{Id: uuid.New().String()},
		ExpirationDate: timestamppb.New(time.Now()),
	})

	require.NoError(t, err, "no error for sending club supporter subscription cancelled")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Subscription Cancelled", title.Text(), "has the correct email title")
}
