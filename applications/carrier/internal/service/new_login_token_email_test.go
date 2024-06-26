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

//go:embed file_fixtures/new_login_token_test.html
var newLoginTokenHtml string

//go:embed file_fixtures/new_login_token_test.txt
var newLoginTokenText string

func TestNewLoginTokenEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	email := generateEmail("carrier-" + uuid.New().String())
	token := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"
	secret := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	_, err := client.NewLoginToken(context.Background(), &carrier.NewLoginTokenRequest{Email: email, Token: token, Secret: secret})

	require.NoError(t, err, "no error for sending login token email")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("new_login_token_test.html", content.Html)
		generateEmailFileFixture("new_login_token_test.txt", content.Text)
	} else {
		require.Equal(t, "New login to overdoll", content.Subject, "correct subject for the email")
		require.Equal(t, newLoginTokenHtml, content.Html, "correct content for the email html")
		require.Equal(t, newLoginTokenText, content.Text, "correct content for the email text")
	}
}

//go:embed file_fixtures/new_login_token_code_test.html
var newLoginTokenCodeHtml string

//go:embed file_fixtures/new_login_token_code_test.txt
var newLoginTokenCodeText string

func TestNewLoginTokenWithCodeEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	email := generateEmail("carrier-" + uuid.New().String())
	token := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"
	secret := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	_, err := client.NewLoginToken(context.Background(), &carrier.NewLoginTokenRequest{Email: email, Token: token, Secret: secret, IsCode: true})

	require.NoError(t, err, "no error for sending login token email")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("new_login_token_code_test.html", content.Html)
		generateEmailFileFixture("new_login_token_code_test.txt", content.Text)
	} else {
		require.Equal(t, "New login to overdoll", content.Subject, "correct subject for the email")
		require.Equal(t, newLoginTokenCodeHtml, content.Html, "correct content for the email html")
		require.Equal(t, newLoginTokenCodeText, content.Text, "correct content for the email text")
	}
}
