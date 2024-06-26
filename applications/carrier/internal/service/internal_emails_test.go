package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	"os"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/club_over_chargeback_threshold.html
var clubOverChargebackThresholdHtml string

//go:embed file_fixtures/club_over_chargeback_threshold.txt
var clubOverChargebackThresholdText string

//go:embed file_fixtures/club_supporter_no_posts.html
var clubSupporterNoPostsHtml string

//go:embed file_fixtures/club_supporter_no_posts.txt
var clubSupporterNoPostsText string

//go:embed file_fixtures/new_club_supporter_subscription_test.html
var newClubSupporterSubscriptionHtml string

//go:embed file_fixtures/new_club_supporter_subscription_test.txt
var newClubSupporterSubscriptionText string

//go:embed file_fixtures/new_creator_lead_test.html
var newCreatorLeadHtml string

//go:embed file_fixtures/new_creator_lead_test.txt
var newCreatorLeadText string

func TestInternalEmails(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	clubId := uuid.New().String()
	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	timestampFrom := time.Now()

	application.StingClient.On("GetClubById", mock.Anything, &sting.GetClubByIdRequest{ClubId: clubId}).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	_, err := client.ClubOverChargebackThreshold(context.Background(), &carrier.ClubOverChargebackThresholdRequest{
		Club:      &carrier.Club{Id: clubId},
		Threshold: 0.005,
	})

	require.NoError(t, err, "no error for sending club over chargeback threshold")

	content := waitForEmailAndGetResponse(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_over_chargeback_threshold.html", content.Html)
		generateEmailFileFixture("club_over_chargeback_threshold.txt", content.Text)
	} else {
		require.Equal(t, "test a club has went over the chargeback threshold", content.Subject, "correct subject for the email")
		require.Equal(t, clubOverChargebackThresholdHtml, content.Html, "correct content for the email html")
		require.Equal(t, clubOverChargebackThresholdText, content.Text, "correct content for the email text")
	}

	// need a sleep function here or else the emails conflict
	time.Sleep(time.Second * 3)

	timestampFrom = time.Now()

	application.StingClient.On("GetClubById", mock.Anything, &sting.GetClubByIdRequest{ClubId: clubId}).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	_, err = client.ClubSupporterNoPosts(context.Background(), &carrier.ClubSupporterNoPostsRequest{
		Club: &carrier.Club{Id: clubId},
	})

	require.NoError(t, err, "no error for sending club supporter no posts")

	noPostsContent := waitForEmailAndGetResponse(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_supporter_no_posts.html", noPostsContent.Html)
		generateEmailFileFixture("club_supporter_no_posts.txt", noPostsContent.Text)
	} else {
		require.Equal(t, "test a club has not posted any supporter-only content", noPostsContent.Subject, "correct subject for the email")
		require.Equal(t, clubSupporterNoPostsHtml, noPostsContent.Html, "correct content for the email html")
		require.Equal(t, clubSupporterNoPostsText, noPostsContent.Text, "correct content for the email text")
	}

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()
	application.StingClient.On("GetClubById", mock.Anything, &sting.GetClubByIdRequest{ClubId: clubId}).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	// need a sleep function here or else the emails conflict
	time.Sleep(time.Second * 3)

	timestampFrom = time.Now()

	tm, _ := time.Parse("2006-01-02T15:04:05.000Z", "2014-11-12T11:45:26.371Z")

	_, err = client.NewClubSupporterSubscription(context.Background(), &carrier.NewClubSupporterSubscriptionRequest{
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

	content = waitForEmailAndGetResponse(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("new_club_supporter_subscription_test.html", content.Html)
		generateEmailFileFixture("new_club_supporter_subscription_test.txt", content.Text)
	} else {
		require.Equal(t, "Email confirmation for subscription 25WqY2AZfmlykwqKhQagxmI9gtd", content.Subject, "correct subject for the email")
		require.Equal(t, newClubSupporterSubscriptionHtml, content.Html, "correct content for the email html")
		require.Equal(t, newClubSupporterSubscriptionText, content.Text, "correct content for the email text")
	}

	time.Sleep(time.Second * 3)

	timestampFrom = time.Now()

	_, err = client.NewCreatorLead(context.Background(), &carrier.NewCreatorLeadRequest{
		Email:     "test@test.com",
		Username:  "test",
		Portfolio: "https://test.com",
		Details:   "some details",
	})

	require.NoError(t, err, "no error for sending new creator lead email")

	content = waitForEmailAndGetResponse(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("new_creator_lead_test.html", content.Html)
		generateEmailFileFixture("new_creator_lead_test.txt", content.Text)
	} else {
		require.Equal(t, "New creator lead", content.Subject, "correct subject for the email")
		require.Equal(t, newCreatorLeadHtml, content.Html, "correct content for the email html")
		require.Equal(t, newCreatorLeadText, content.Text, "correct content for the email text")
	}
}
