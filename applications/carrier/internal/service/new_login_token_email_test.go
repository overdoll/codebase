package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"testing"
	"time"
)

//go:embed file_fixtures/new_login_token_test.html
var newLoginTokenHtml string

//go:embed file_fixtures/new_login_token_test.txt
var newLoginTokenText string

func TestNewLoginTokenEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	email := generateEmail("carrier-new_login_token")
	token := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"
	secret := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	_, err := client.NewLoginToken(context.Background(), &carrier.NewLoginTokenRequest{Email: email, Token: token, Secret: secret})

	require.NoError(t, err, "no error for sending login token email")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "New Login Token", content.Subject, "correct subject for the email")
	require.Equal(t, newLoginTokenHtml, content.Html, "correct content for the email html")
	require.Equal(t, newLoginTokenText, content.Text, "correct content for the email text")
}
