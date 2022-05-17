package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/confirm_account_email_test.html
var confirmAccountEmailHtml string

//go:embed file_fixtures/confirm_account_email_test.txt
var confirmAccountEmailText string

func TestConfirmAccountEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	email := generateEmail("carrier-" + uuid.New().String())
	token := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"
	secret := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"}).Return(&eva.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"}, nil).Once()

	_, err := client.ConfirmAccountEmail(context.Background(), &carrier.ConfirmAccountEmailRequest{
		Account: &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"}, Email: email, Id: token, Secret: secret})

	require.NoError(t, err, "no error for sending confirm account email")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("confirm_account_email_test.html", content.Html)
		generateEmailFileFixture("confirm_account_email_test.txt", content.Text)
	} else {
		require.Equal(t, "Confirm Email", content.Subject, "correct subject for the email")
		require.Equal(t, confirmAccountEmailHtml, content.Html, "correct content for the email html")
		require.Equal(t, confirmAccountEmailText, content.Text, "correct content for the email text")
	}
}
