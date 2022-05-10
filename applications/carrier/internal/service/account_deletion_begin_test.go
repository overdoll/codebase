package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/account_deletion_begin_test.html
var accountDeletedBeginHtml string

//go:embed file_fixtures/account_deletion_begin_test.txt
var accountDeletedBeginText string

func TestAccountDeletionBegin(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_deletion_begin"
	email := generateEmail("carrier-" + accountId)

	tm, err := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")
	require.NoError(t, err, "no error parsing email")

	_, err = client.AccountDeletionBegin(context.Background(), &carrier.AccountDeletionBeginRequest{
		Account:      &carrier.Account{Id: accountId},
		DeletionDate: timestamppb.New(tm),
	})

	require.NoError(t, err, "no error for sending account deletion begin request")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Request to delete your account", content.Subject, "correct subject for the email")
	require.Equal(t, accountDeletedBeginHtml, content.Html, "correct content for the email html")
	require.Equal(t, accountDeletedBeginText, content.Text, "correct content for the email text")
}
