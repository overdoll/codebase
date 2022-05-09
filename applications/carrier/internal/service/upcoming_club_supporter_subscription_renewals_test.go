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

func TestUpcomingClubSupporterSubscriptionRenewals(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.UpcomingClubSupporterSubscriptionRenewals(context.Background(), &carrier.UpcomingClubSupporterSubscriptionRenewalsRequest{
		Account: &carrier.Account{Id: accountId},
		Renewals: []*carrier.SubscriptionRenewal{{
			Club:         &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
			Subscription: &carrier.Subscription{Id: uuid.New().String()},
			Payment: &carrier.Payment{
				Amount:   10,
				Currency: "USD",
			},
			BillingDate: timestamppb.New(time.Now()),
		}},
	})

	require.NoError(t, err, "no error for sending upcoming club supporter subscription renewals")

	doc := waitForEmailAndGetDocument(t, email, timestampFrom)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Upcoming Subscription Renewals", title.Text(), "has the correct email title")
}
