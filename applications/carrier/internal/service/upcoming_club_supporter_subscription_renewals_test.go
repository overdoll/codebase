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

//go:embed file_fixtures/upcoming_club_supporter_subscription_renewals_test.html
var upcomingClubSupporterSubscriptionRenewalsHtml string

//go:embed file_fixtures/upcoming_club_supporter_subscription_renewals_test.txt
var upcomingClubSupporterSubscriptionRenewalsText string

func TestUpcomingClubSupporterSubscriptionRenewals(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email}, nil).Once()
	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	tm, _ := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")

	_, err := client.UpcomingClubSupporterSubscriptionRenewals(context.Background(), &carrier.UpcomingClubSupporterSubscriptionRenewalsRequest{
		Account: &carrier.Account{Id: accountId},
		Renewals: []*carrier.SubscriptionRenewal{{
			Club:         &carrier.Club{Id: clubId},
			Subscription: &carrier.Subscription{Id: "25WqY2AZfmlykwqKhQagxmI9gtd"},
			Payment: &carrier.Payment{
				Amount:   699,
				Currency: "USD",
			},
			BillingDate: timestamppb.New(tm),
		}},
	})

	require.NoError(t, err, "no error for sending upcoming club supporter subscription renewals")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("upcoming_club_supporter_subscription_renewals_test.html", content.Html)
		generateEmailFileFixture("upcoming_club_supporter_subscription_renewals_test.txt", content.Text)
	} else {
		require.Equal(t, "Upcoming Subscription Renewals", content.Subject, "correct subject for the email")
		require.Equal(t, upcomingClubSupporterSubscriptionRenewalsHtml, content.Html, "correct content for the email html")
		require.Equal(t, upcomingClubSupporterSubscriptionRenewalsText, content.Text, "correct content for the email text")
	}
}
