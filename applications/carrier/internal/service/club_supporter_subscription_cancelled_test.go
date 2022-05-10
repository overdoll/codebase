package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/club_supporter_subscription_cancelled_test.html
var clubSupporterSubscriptionCancelledHtml string

//go:embed file_fixtures/club_supporter_subscription_cancelled_test.txt
var clubSupporterSubscriptionCancelledText string

func TestClubSupporterSubscriptionCancelled(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_subscription_cancelled"
	email := generateEmail("carrier-" + accountId)

	tm, err := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")
	require.NoError(t, err, "no error parsing time")

	_, err = client.ClubSupporterSubscriptionCancelled(context.Background(), &carrier.ClubSupporterSubscriptionCancelledRequest{
		Account:        &carrier.Account{Id: accountId},
		Club:           &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Subscription:   &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		ExpirationDate: timestamppb.New(tm),
	})

	require.NoError(t, err, "no error for sending club supporter subscription cancelled")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Subscription Cancelled for 25WqY2AZfmlykwqKhQagxmI9gtd", content.Subject, "correct subject for the email")
	require.Equal(t, clubSupporterSubscriptionCancelledHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubSupporterSubscriptionCancelledText, content.Text, "correct content for the email text")
}
