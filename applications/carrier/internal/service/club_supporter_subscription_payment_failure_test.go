package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/club_supporter_subscription_payment_failure.html
var clubSupporterSubscriptionPaymentFailureHtml string

//go:embed file_fixtures/club_supporter_subscription_payment_failure.txt
var clubSupporterSubscriptionPaymentFailureText string

func TestClubSupporterSubscriptionPaymentFailure(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()

	email := generateEmail("carrier-" + accountId)

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: accountId}, nil).Once()
	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	_, err := client.ClubSupporterSubscriptionPaymentFailure(context.Background(), &carrier.ClubSupporterSubscriptionPaymentFailureRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: clubId},
		Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
	})

	require.NoError(t, err, "no error for sending club supporter subscription payment failure")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_supporter_subscription_payment_failure.html", content.Html)
		generateEmailFileFixture("club_supporter_subscription_payment_failure.txt", content.Text)
	} else {
		require.Equal(t, "Subscription renewal failure", content.Subject, "correct subject for the email")
		require.Equal(t, clubSupporterSubscriptionPaymentFailureHtml, content.Html, "correct content for the email html")
		require.Equal(t, clubSupporterSubscriptionPaymentFailureText, content.Text, "correct content for the email text")
	}
}
