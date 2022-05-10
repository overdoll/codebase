package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
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

	email := generateEmail("carrier-confirm_account_email")
	token := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"
	secret := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	_, err := client.ConfirmAccountEmail(context.Background(), &carrier.ConfirmAccountEmailRequest{
		Account: &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"}, Email: email, Id: token, Secret: secret})

	require.NoError(t, err, "no error for sending confirm account email")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Confirm Email", content.Subject, "correct subject for the email")
	require.Equal(t, confirmAccountEmailHtml, content.Html, "correct content for the email html")
	require.Equal(t, confirmAccountEmailText, content.Text, "correct content for the email text")
}
