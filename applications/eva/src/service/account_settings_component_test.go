package service

import (
	"context"
	"strings"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/passport"
)

func getEmailConfirmation(t *testing.T, targetEmail string) string {

	client, err := bootstrap.InitializeRedisSession()
	require.NoError(t, err)
	sess, err := bootstrap.InitializeDatabaseSession()
	require.NoError(t, err)

	accountRepo := adapters.NewAccountCassandraRedisRepository(sess, client)

	res, err := accountRepo.GetEmailConfirmationByEmail(context.Background(), targetEmail)

	return res
}

func createSession(t *testing.T, accountId, userAgent, ip string) {

	client, err := bootstrap.InitializeRedisSessionWithCustomDB(0)
	require.NoError(t, err)

	sessionRepo := adapters.NewSessionRepository(client)

	err = sessionRepo.CreateSessionForAccount(context.Background(), session.NewSession(accountId, userAgent, ip))

	require.NoError(t, err)
}

type AddAccountEmail struct {
	AddAccountEmail types.Response `graphql:"addAccountEmail(email: $email)"`
}

type ConfirmAccountEmail struct {
	ConfirmAccountEmail types.Response `graphql:"confirmAccountEmail(id: $id)"`
}

type RemoveAccountEmail struct {
	RemoveAccountEmail types.Response `graphql:"removeAccountEmail(email: $email)"`
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

	targetEmail := strings.ToLower(fake.Email)

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

func TestAccountEmail_create_new_and_remove(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	// use passport with user
	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetEmail := strings.ToLower(fake.Email)

	var addAccountEmail AddAccountEmail

	// add an email to our account
	err = client.Mutate(context.Background(), &addAccountEmail, map[string]interface{}{
		"email": graphql.String(targetEmail),
	})

	require.NoError(t, err)
	require.True(t, addAccountEmail.AddAccountEmail.Ok)

	var removeAccountEmail RemoveAccountEmail

	// remove the email from the account
	err = client.Mutate(context.Background(), &removeAccountEmail, map[string]interface{}{
		"email": graphql.String(targetEmail),
	})

	require.NoError(t, err)
	require.True(t, removeAccountEmail.RemoveAccountEmail.Ok)

	settings := qAccountSettings(t, client)

	foundNewEmail := false

	// go through account settings and make sure email is not found
	for _, email := range settings.AccountSettings.General.Emails {
		if email.Email == targetEmail {
			foundNewEmail = true
		}
	}

	require.False(t, foundNewEmail)
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

	auth := qAuthenticatedAccount(t, client)

	// make sure that the username is modified as well for the "authentication" query
	assert.Equal(t, targetUsername, auth.AuthenticatedAccount.Username)
}

type TestSession struct {
	Ip string `faker:"ipv4"`
}

type RevokeAccountSession struct {
	RevokeAccountSession types.Response `graphql:"revokeAccountSession(id: $id)"`
}

func TestAccountSessions_view_and_revoke(t *testing.T) {
	t.Parallel()

	fakeSession := TestSession{}

	err := faker.FakeData(&fakeSession)
	require.NoError(t, err)

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	createSession(t, testAccountId, "user-agent", fakeSession.Ip)

	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	// query account settings once more
	settings := qAccountSettings(t, client)

	foundSession := false
	sessionId := ""

	// go through sessions and find by IP
	for _, sess := range settings.AccountSettings.Security.Sessions {
		if sess.IP == fakeSession.Ip {
			foundSession = true
			sessionId = sess.ID
		}
	}

	require.True(t, foundSession)

	var revokeAccountSession RevokeAccountSession

	// revoke the session
	err = client.Mutate(context.Background(), &revokeAccountSession, map[string]interface{}{
		"id": graphql.String(sessionId),
	})

	require.NoError(t, err)
	require.True(t, revokeAccountSession.RevokeAccountSession.Ok)

	// now test to make sure the session does not exist
	settings = qAccountSettings(t, client)
	foundSession = false

	for _, sess := range settings.AccountSettings.Security.Sessions {
		if sess.IP == fakeSession.Ip {
			foundSession = true
		}
	}

	// make sure its false
	require.False(t, foundSession)
}
