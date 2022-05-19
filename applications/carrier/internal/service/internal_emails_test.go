package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"os"
	carrier "overdoll/applications/carrier/proto"
	stella "overdoll/applications/stella/proto"
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

func TestInternalEmails(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	clubId := uuid.New().String()
	accountId := uuid.New().String()

	timestampFrom := time.Now()

	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

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

	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

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
}
