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

//go:embed file_fixtures/club_supporter_subscription_duplicate_test.html
var clubSupporterSubscriptionDuplicateHtml string

//go:embed file_fixtures/club_supporter_subscription_duplicate_test.txt
var clubSupporterSubscriptionDuplicateText string

func TestClubSupporterSubscriptionDuplicate(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email}, nil).Once()
	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	_, err := client.ClubSupporterSubscriptionDuplicate(context.Background(), &carrier.ClubSupporterSubscriptionDuplicateRequest{
		Account: &carrier.Account{Id: accountId},
		Club:    &carrier.Club{Id: clubId},
		Payment: &carrier.Payment{
			Amount:   699,
			Currency: "USD",
		},
	})

	require.NoError(t, err, "no error for sending club supporter subscription duplicate")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_supporter_subscription_duplicate_test.html", content.Html)
		generateEmailFileFixture("club_supporter_subscription_duplicate_test.txt", content.Text)
	} else {
		require.Equal(t, "Duplicate subscription for test a club", content.Subject, "correct subject for the email")
		require.Equal(t, clubSupporterSubscriptionDuplicateHtml, content.Html, "correct content for the email html")
		require.Equal(t, clubSupporterSubscriptionDuplicateText, content.Text, "correct content for the email text")
	}
}
