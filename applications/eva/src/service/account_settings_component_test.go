package service

import (
	"context"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/passport"
)

func getEmailConfirmation(t *testing.T, targetEmail string) string {

	client, err := bootstrap.InitializeRedisSession()
	require.NoError(t, err)
	session, err := bootstrap.InitializeDatabaseSession()
	require.NoError(t, err)

	accountRepo := adapters.NewAccountCassandraRedisRepository(session, client)

	res, err := accountRepo.GetEmailConfirmationByEmail(context.Background(), targetEmail)

	return res
}

type AddAccountEmail struct {
	AddAccountEmail types.Response `graphql:"addAccountEmail(email: $email)"`
}

type ConfirmAccountEmail struct {
	ConfirmAccountEmail types.Response `graphql:"confirmAccountEmail(id: $id)"`
}

type MakeAccountEmailPrimary struct {
	MakeAccountEmailPrimary types.Response `graphql:"makeAccountEmailPrimary(email: $email)"`
}

// Go through a full flow of adding a new email to an account, confirming the email and making it the primary email
func TestAccountEmail_create_new_and_confirm_make_primary(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	// use passport with user
	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetEmail := fake.Email

	var addAccountEmail AddAccountEmail

	// add an email to our account
	err = client.Mutate(context.Background(), &addAccountEmail, map[string]interface{}{
		"email": graphql.String(targetEmail),
	})

	require.NoError(t, err)
	require.True(t, addAccountEmail.AddAccountEmail.Ok)

	settings := qAccountSettings(t, client)

	foundUnconfirmedEmail := false

	// query account's settings and ensure this email is here, and unconfirmed
	for _, email := range settings.AccountSettings.General.Emails {
		if email.Email == targetEmail && email.Status == types.AccountEmailStatusEnumUnconfirmed {
			foundUnconfirmedEmail = true
		}
	}

	require.True(t, foundUnconfirmedEmail)

	// get confirmation key (this would be found in the email, but here we query our redis DB directly)
	confirmationKey := getEmailConfirmation(t, targetEmail)

	require.NotEmpty(t, confirmationKey)

	var confirmAccountEmail ConfirmAccountEmail

	// confirm the account's new email
	err = client.Query(context.Background(), &confirmAccountEmail, map[string]interface{}{
		"id": graphql.String(confirmationKey),
	})

	require.NoError(t, err)
	require.True(t, confirmAccountEmail.ConfirmAccountEmail.Ok)

	settings = qAccountSettings(t, client)

	foundConfirmedEmail := false

	// go through account settings and make sure that this email is now confirmed
	for _, email := range settings.AccountSettings.General.Emails {
		if email.Email == targetEmail && email.Status == types.AccountEmailStatusEnumConfirmed {
			foundConfirmedEmail = true
		}
	}

	require.True(t, foundConfirmedEmail)

	var makeEmailPrimary MakeAccountEmailPrimary

	// mark email as primary
	err = client.Mutate(context.Background(), &makeEmailPrimary, map[string]interface{}{
		"email": graphql.String(targetEmail),
	})

	require.NoError(t, err)
	require.True(t, makeEmailPrimary.MakeAccountEmailPrimary.Ok)

	// query account settings once more
	settings = qAccountSettings(t, client)

	foundPrimaryEmail := false

	// go through account settings and make sure that this email is now the primary email
	for _, email := range settings.AccountSettings.General.Emails {
		if email.Email == targetEmail && email.Status == types.AccountEmailStatusEnumPrimary {
			foundPrimaryEmail = true
		}
	}

	require.True(t, foundPrimaryEmail)
}

type ModifyAccountUsername struct {
	ModifyAccountUsername types.Response `graphql:"modifyAccountUsername(username: $username)"`
}

func TestAccountUsername_modify(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetUsername := fake.Username

	var modifyAccountUsername ModifyAccountUsername

	// modify account's username
	err = client.Mutate(context.Background(), &modifyAccountUsername, map[string]interface{}{
		"username": graphql.String(targetUsername),
	})

	require.NoError(t, err)
	require.True(t, modifyAccountUsername.ModifyAccountUsername.Ok)

	settings := qAccountSettings(t, client)

	foundNewUsername := false

	// go through the account's usernames and make sure the username exists here
	for _, email := range settings.AccountSettings.General.Usernames {
		if email.Username == targetUsername {
			foundNewUsername = true
		}
	}

	require.True(t, foundNewUsername)

	auth := qAuth(t, client)

	// make sure that the username is modified as well for the "authentication" query
	assert.Equal(t, targetUsername, auth.Authentication.User.Username)
}
