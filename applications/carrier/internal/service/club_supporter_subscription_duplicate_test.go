package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/club_supporter_subscription_duplicate_test.html
var clubSupporterSubscriptionDuplicateHtml string

//go:embed file_fixtures/club_supporter_subscription_duplicate_test.txt
var clubSupporterSubscriptionDuplicateText string

func TestClubSupporterSubscriptionDuplicate(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_subscription_duplicate"
	email := generateEmail("carrier-" + accountId)

	_, err := client.ClubSupporterSubscriptionDuplicate(context.Background(), &carrier.ClubSupporterSubscriptionDuplicateRequest{
		Account: &carrier.Account{Id: accountId},
		Club:    &carrier.Club{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Payment: &carrier.Payment{
			Amount:   699,
			Currency: "USD",
		},
	})

	require.NoError(t, err, "no error for sending club supporter subscription duplicate")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Duplicate subscription for testclub", content.Subject, "correct subject for the email")
	require.Equal(t, clubSupporterSubscriptionDuplicateHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubSupporterSubscriptionDuplicateText, content.Text, "correct content for the email text")
}
