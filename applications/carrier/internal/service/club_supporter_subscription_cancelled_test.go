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

//go:embed file_fixtures/club_supporter_subscription_cancelled_test.html
var clubSupporterSubscriptionCancelledHtml string

//go:embed file_fixtures/club_supporter_subscription_cancelled_test.txt
var clubSupporterSubscriptionCancelledText string

func TestClubSupporterSubscriptionCancelled(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()
	application.StingClient.On("GetClubById", mock.Anything, &sting.GetClubByIdRequest{ClubId: clubId}).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	tm, _ := time.Parse("2006-01-02T15:04:05.000Z", "2014-11-12T11:45:26.371Z")

	_, err := client.ClubSupporterSubscriptionCancelled(context.Background(), &carrier.ClubSupporterSubscriptionCancelledRequest{
		Account:        &carrier.Account{Id: accountId},
		Club:           &carrier.Club{Id: clubId},
		Subscription:   &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
		ExpirationDate: timestamppb.New(tm),
	})

	require.NoError(t, err, "no error for sending club supporter subscription cancelled")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_supporter_subscription_cancelled_test.html", content.Html)
		generateEmailFileFixture("club_supporter_subscription_cancelled_test.txt", content.Text)
	} else {
		require.Equal(t, "Subscription Cancelled for 25WqY2AZfmlykwqKhQagxmI9gtd", content.Subject, "correct subject for the email")
		require.Equal(t, clubSupporterSubscriptionCancelledHtml, content.Html, "correct content for the email html")
		require.Equal(t, clubSupporterSubscriptionCancelledText, content.Text, "correct content for the email text")
	}
}
