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

//go:embed file_fixtures/club_supporter_required_post_reminder_test.html
var clubSupporterRequiredPostReminderHtml string

//go:embed file_fixtures/club_supporter_required_post_reminder_test.txt
var clubSupporterRequiredPostReminderText string

func TestClubSupporterRequiredPostReminder(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: accountId}, nil).Once()

	_, err := client.ClubSupporterRequiredPostReminder(context.Background(), &carrier.ClubSupporterRequiredPostReminderRequest{
		Club:       &carrier.Club{Id: clubId},
		TimePassed: 1651849358004,
	})

	require.NoError(t, err, "no error for sending club supporter required post reminder")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_supporter_required_post_reminder_test.html", content.Html)
		generateEmailFileFixture("club_supporter_required_post_reminder_test.txt", content.Text)
	} else {
		require.Equal(t, "Reminder to create a supporter-only post test a club", content.Subject, "correct subject for the email")
		require.Equal(t, clubSupporterRequiredPostReminderHtml, content.Html, "correct content for the email html")
		require.Equal(t, clubSupporterRequiredPostReminderText, content.Text, "correct content for the email text")
	}
}
