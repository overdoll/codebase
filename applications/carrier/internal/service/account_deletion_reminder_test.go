package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/account_deletion_reminder_test.html
var accountDeletionReminderHtml string

//go:embed file_fixtures/account_deletion_reminder_test.txt
var accountDeletionReminderText string

func TestAccountDeletionReminder(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()

	tm, _ := time.Parse("2006-01-02T15:04:05.000Z", "2014-11-12T11:45:26.371Z")

	_, err := client.AccountDeletionReminder(context.Background(), &carrier.AccountDeletionReminderRequest{
		Account:      &carrier.Account{Id: accountId},
		DeletionDate: timestamppb.New(tm),
	})

	require.NoError(t, err, "no error for sending account deletion reminder request")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("account_deletion_reminder_test.html", content.Html)
		generateEmailFileFixture("account_deletion_reminder_test.txt", content.Text)
	} else {
		require.Equal(t, "Reminder about your request to delete your account", content.Subject, "correct subject for the email")
		require.Equal(t, accountDeletionReminderHtml, content.Html, "correct content for the email html")
		require.Equal(t, accountDeletionReminderText, content.Text, "correct content for the email text")
	}
}
