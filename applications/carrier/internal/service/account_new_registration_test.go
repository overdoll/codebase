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

//go:embed file_fixtures/account_new_registration_test.html
var accountNewRegistrationHtml string

//go:embed file_fixtures/account_new_registration_test.txt
var accountNewRegistrationText string

func TestAccountNewRegistration(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()

	_, err := client.AccountNewRegistration(context.Background(), &carrier.AccountNewRegistrationRequest{
		Account: &carrier.Account{Id: accountId},
	})

	require.NoError(t, err, "no error for sending account new registration")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("account_new_registration_test.html", content.Html)
		generateEmailFileFixture("account_new_registration_test.txt", content.Text)
	} else {
		require.Equal(t, "A personal thank you for visiting overdoll, and some questions for you", content.Subject, "correct subject for the email")
		require.Equal(t, accountNewRegistrationHtml, content.Html, "correct content for the email html")
		require.Equal(t, accountNewRegistrationText, content.Text, "correct content for the email text")
	}
}
