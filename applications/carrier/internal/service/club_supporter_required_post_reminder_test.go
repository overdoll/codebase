package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
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

	clubId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_club_supporter_required"
	email := generateEmail("carrier-" + clubId)

	_, err := client.ClubSupporterRequiredPostReminder(context.Background(), &carrier.ClubSupporterRequiredPostReminderRequest{
		Club:       &carrier.Club{Id: clubId},
		TimePassed: 1651849358004,
	})

	require.NoError(t, err, "no error for sending club supporter required post reminder")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Reminder to create a supporter-only post testclub", content.Subject, "correct subject for the email")
	//	require.Equal(t, clubSupporterRequiredPostReminderHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubSupporterRequiredPostReminderText, content.Text, "correct content for the email text")
}
