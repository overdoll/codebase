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

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.ClubSupporterSubscriptionCancelled(context.Background(), &carrier.ClubSupporterSubscriptionCancelledRequest{
		Account:        &carrier.Account{Id: accountId},
		Club:           &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription:   &carrier.Subscription{Id: uuid.New().String()},
		ExpirationDate: timestamppb.New(time.Now()),
	})

	require.NoError(t, err, "no error for sending club supporter subscription cancelled")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Subscription Cancelled", title.Text(), "has the correct email title")
}
