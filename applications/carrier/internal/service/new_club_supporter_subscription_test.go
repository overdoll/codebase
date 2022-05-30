package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/new_club_supporter_subscription_test.html
var newClubSupporterSubscriptionHtml string

//go:embed file_fixtures/new_club_supporter_subscription_test.txt
var newClubSupporterSubscriptionText string

func TestNewClubSupporterSubscription(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: accountId}, nil).Once()
	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	tm, _ := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")

	_, err := client.NewClubSupporterSubscription(context.Background(), &carrier.NewClubSupporterSubscriptionRequest{
		Account:      &carrier.Account{Id: accountId},
		Club:         &carrier.Club{Id: clubId},
		Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		Payment: &carrier.Payment{
			Amount:   10,
			Currency: "USD",
		},
		BillingDate:     timestamppb.New(tm),
		NextBillingDate: timestamppb.New(tm.Add(time.Hour * 24)),
	})

	require.NoError(t, err, "no error for sending new club supporter subscription")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("new_club_supporter_subscription_test.html", content.Html)
		generateEmailFileFixture("new_club_supporter_subscription_test.txt", content.Text)
	} else {
		require.Equal(t, "Email confirmation for subscription 25WqY2AZfmlykwqKhQagxmI9gtd", content.Subject, "correct subject for the email")
		require.Equal(t, newClubSupporterSubscriptionHtml, content.Html, "correct content for the email html")
		require.Equal(t, newClubSupporterSubscriptionText, content.Text, "correct content for the email text")
	}
}
