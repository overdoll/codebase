package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/club_supporter_subscription_refunded_test.html
var clubSupporterSubscriptionRefundedHtml string

//go:embed file_fixtures/club_supporter_subscription_refunded_test.txt
var clubSupporterSubscriptionRefundedText string

func TestClubSupporterSubscriptionRefunded(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()

	email := generateEmail("carrier-" + accountId)
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()
	application.StingClient.On("GetClubById", mock.Anything, &sting.GetClubByIdRequest{ClubId: clubId}).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	_, err := client.ClubSupporterSubscriptionRefunded(context.Background(), &carrier.ClubSupporterSubscriptionRefundedRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: clubId},
		Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Refund: &carrier.Payment{
			Amount:   10,
			Currency: "USD",
		},
		Transaction: &carrier.Transaction{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
	})

	require.NoError(t, err, "no error for sending club supporter subscription refunded")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_supporter_subscription_refunded_test.html", content.Html)
		generateEmailFileFixture("club_supporter_subscription_refunded_test.txt", content.Text)
	} else {
		require.Equal(t, "Subscription refunded 25WqY2AZfmlykwqKhQagxmI9gtd", content.Subject, "correct subject for the email")
		require.Equal(t, clubSupporterSubscriptionRefundedHtml, content.Html, "correct content for the email html")
		require.Equal(t, clubSupporterSubscriptionRefundedText, content.Text, "correct content for the email text")
	}
}
