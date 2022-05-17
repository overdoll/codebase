package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
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

	accountUsername := "test user"
	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.AccountDeleted(context.Background(), &carrier.AccountDeletedRequest{
		Email:    email,
		Username: accountUsername,
	})

	require.NoError(t, err, "no error for sending account deleted")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("account_deleted_test.html", content.Html)
		generateEmailFileFixture("account_deleted_test.txt", content.Text)
	} else {
		require.Equal(t, "Account deleted", content.Subject, "correct subject for the email")
		require.Equal(t, accountDeletedHtml, content.Html, "correct content for the email html")
		require.Equal(t, accountDeletedText, content.Text, "correct content for the email text")
	}
}
