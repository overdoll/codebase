package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	sting "overdoll/applications/sting/proto"
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

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()
	application.StingClient.On("GetClubById", mock.Anything, &sting.GetClubByIdRequest{ClubId: clubId}).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	tm, _ := time.Parse("2006-01-02T15:04:05.000Z", "2014-11-12T11:45:26.371Z")

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
