package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/account_deleted_test.html
var accountDeletedHtml string

//go:embed file_fixtures/account_deleted_test.txt
var accountDeletedText string

func TestAccountDeleted(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_deleted"
	email := generateEmail("carrier-" + accountId)

	_, err := client.AccountDeleted(context.Background(), &carrier.AccountDeletedRequest{
		Email:    email,
		Username: accountId,
	})

	require.NoError(t, err, "no error for sending account deleted")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Account deleted", content.Subject, "correct subject for the email")
	require.True(t, compareHtml(t, accountDeletedHtml, content.Html), "correct content for the email html")
	require.Equal(t, accountDeletedText, content.Text, "correct content for the email text")
}
