package service_test

import (
	"context"
	"strings"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/internal/adapters"
	"overdoll/applications/eva/internal/domain/session"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
)

func getEmailConfirmation(t *testing.T, targetEmail string) string {

	client := bootstrap.InitializeRedisSession()
	sess := bootstrap.InitializeDatabaseSession()

	accountRepo := adapters.NewAccountCassandraRedisRepository(sess, client)

	res, err := accountRepo.GetEmailConfirmationByEmail(context.Background(), targetEmail)
	require.NoError(t, err)

	return res
}

func createSession(t *testing.T, accountId, userAgent, ip string) {

	client := bootstrap.InitializeRedisSessionWithCustomDB(0)

	sessionRepo := adapters.NewSessionRepository(client)

	err := sessionRepo.CreateSessionForAccount(context.Background(), session.NewSession(accountId, userAgent, ip))
	require.NoError(t, err)
}

type AccountEmailModified struct {
	ID     relay.ID
	Email  graphql.String
	Status types.AccountEmailStatus
}

type AccountUsernameModified struct {
	ID       relay.ID
	Username graphql.String
}

type AddAccountEmail struct {
	AddAccountEmail struct {
		AccountEmail *AccountEmailModified
	} `graphql:"addAccountEmail(input: $input)"`
}

type ConfirmAccountEmail struct {
	ConfirmAccountEmail struct {
		AccountEmail *AccountEmailModified
	} `graphql:"confirmAccountEmail(input: $input)"`
}

type DeleteAccountEmail struct {
	DeleteAccountEmail struct {
		AccountEmailID relay.ID
	} `graphql:"deleteAccountEmail(input: $input)"`
}

type UpdateAccountEmailStatusToPrimary struct {
	UpdateAccountEmailStatusToPrimary struct {
		PrimaryAccountEmail *AccountEmailModified
		UpdatedAccountEmail *AccountEmailModified
	} `graphql:"updateAccountEmailStatusToPrimary(input: $input)"`
}

type ViewerAccountEmailUsernameSettings struct {
	Viewer struct {
		Username graphql.String
		Emails   *struct {
			Edges []*struct {
				Node *AccountEmailModified
			}
		}
		Usernames *struct {
			Edges []*struct {
				Node *AccountUsernameModified
			}
		}
		Sessions *types.AccountSessionConnection
	} `graphql:"viewer()"`
}

func viewerAccountEmailUsernameSettings(t *testing.T, client *graphql.Client) ViewerAccountEmailUsernameSettings {
	var settings ViewerAccountEmailUsernameSettings
	err := client.Query(context.Background(), &settings, nil)
	require.NoError(t, err)
	return settings
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
		"input": types.AddAccountEmailInput{Email: targetEmail},
	})

	require.NoError(t, err)
	require.NotNil(t, addAccountEmail.AddAccountEmail.AccountEmail)
	require.Equal(t, graphql.String(targetEmail), addAccountEmail.AddAccountEmail.AccountEmail.Email)

	settings := viewerAccountEmailUsernameSettings(t, client)

	foundUnconfirmedEmail := false

	// query account's settings and ensure this email is here, and unconfirmed
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == graphql.String(targetEmail) && email.Node.Status == types.AccountEmailStatusUnconfirmed {
			foundUnconfirmedEmail = true
		}
	}

	require.True(t, foundUnconfirmedEmail)

	// get confirmation key (this would be found in the email, but here we query our redis DB directly)
	confirmationKey := getEmailConfirmation(t, targetEmail)

	require.NotEmpty(t, confirmationKey)

	var confirmAccountEmail ConfirmAccountEmail

	// confirm the account's new email
	err = client.Mutate(context.Background(), &confirmAccountEmail, map[string]interface{}{
		"input": types.ConfirmAccountEmailInput{ID: confirmationKey},
	})

	require.NoError(t, err)
	require.NotNil(t, confirmAccountEmail.ConfirmAccountEmail.AccountEmail)

	settings = viewerAccountEmailUsernameSettings(t, client)

	foundConfirmedEmail := false

	// go through account settings and make sure that this email is now confirmed
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == graphql.String(targetEmail) && email.Node.Status == types.AccountEmailStatusConfirmed {
			foundConfirmedEmail = true
		}
	}

	require.True(t, foundConfirmedEmail)

	var makeEmailPrimary UpdateAccountEmailStatusToPrimary

	// mark email as primary
	err = client.Mutate(context.Background(), &makeEmailPrimary, map[string]interface{}{
		"input": types.UpdateAccountEmailStatusToPrimaryInput{AccountEmailID: confirmAccountEmail.ConfirmAccountEmail.AccountEmail.ID},
	})

	require.NoError(t, err)
	require.NotNil(t, makeEmailPrimary.UpdateAccountEmailStatusToPrimary.PrimaryAccountEmail)

	require.Equal(t, targetEmail, makeEmailPrimary.UpdateAccountEmailStatusToPrimary.PrimaryAccountEmail.Email)

	// query account settings once more
	settings = viewerAccountEmailUsernameSettings(t, client)

	foundPrimaryEmail := false

	// go through account settings and make sure that this email is now the primary email
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == graphql.String(targetEmail) && email.Node.Status == types.AccountEmailStatusPrimary {
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
		"input": types.AddAccountEmailInput{Email: targetEmail},
	})

	require.NoError(t, err)
	require.NotNil(t, addAccountEmail.AddAccountEmail.AccountEmail)

	var removeAccountEmail DeleteAccountEmail

	// remove the email from the account
	err = client.Mutate(context.Background(), &removeAccountEmail, map[string]interface{}{
		"input": types.DeleteAccountEmailInput{AccountEmailID: addAccountEmail.AddAccountEmail.AccountEmail.ID},
	})

	require.NoError(t, err)
	require.NotNil(t, removeAccountEmail.DeleteAccountEmail.AccountEmailID)

	settings := viewerAccountEmailUsernameSettings(t, client)

	foundNewEmail := false

	// go through account settings and make sure email is not found
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == graphql.String(targetEmail) {
			foundNewEmail = true
		}
	}

	require.False(t, foundNewEmail)
}

type UpdateAccountUsernameAndRetainPrevious struct {
	UpdateAccountUsernameAndRetainPrevious struct {
		AccountUsername *AccountUsernameModified
	} `graphql:"updateAccountUsernameAndRetainPrevious(input: $input)"`
}

func TestAccountUsername_modify(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetUsername := fake.Username

	var modifyAccountUsername UpdateAccountUsernameAndRetainPrevious

	// modify account's username
	err = client.Mutate(context.Background(), &modifyAccountUsername, map[string]interface{}{
		"input": types.UpdateAccountUsernameAndRetainPreviousInput{Username: targetUsername},
	})

	require.NoError(t, err)
	require.NotNil(t, modifyAccountUsername.UpdateAccountUsernameAndRetainPrevious.AccountUsername)

	settings := viewerAccountEmailUsernameSettings(t, client)

	foundNewUsername := false

	// go through the account's usernames and make sure the username exists here
	for _, username := range settings.Viewer.Usernames.Edges {
		if username.Node.Username == graphql.String(targetUsername) {
			foundNewUsername = true
		}
	}

	require.True(t, foundNewUsername)

	// make sure that the username is modified as well for the "authentication" query
	require.Equal(t, graphql.String(targetUsername), settings.Viewer.Username)
}

type TestSession struct {
	Ip string `faker:"ipv4"`
}

type RevokeAccountSession struct {
	RevokeAccountSession *types.RevokeAccountSessionPayload `graphql:"revokeAccountSession(input: $input)"`
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
	settings := viewerAccountEmailUsernameSettings(t, client)

	foundSession := false
	var sessionId relay.ID

	// go through sessions and find by IP
	for _, sess := range settings.Viewer.Sessions.Edges {
		if sess.Node.IP == fakeSession.Ip {
			foundSession = true
			sessionId = sess.Node.ID
		}
	}

	require.True(t, foundSession)

	var revokeAccountSession RevokeAccountSession

	// revoke the session
	err = client.Mutate(context.Background(), &revokeAccountSession, map[string]interface{}{
		"input": types.RevokeAccountSessionInput{AccountSessionID: sessionId},
	})

	require.NoError(t, err)
	require.NotNil(t, revokeAccountSession.RevokeAccountSession.AccountSessionID)

	// now test to make sure the session does not exist
	settings = viewerAccountEmailUsernameSettings(t, client)
	foundSession = false

	for _, sess := range settings.Viewer.Sessions.Edges {
		if sess.Node.IP == fakeSession.Ip {
			foundSession = true
		}
	}

	// make sure its false
	require.False(t, foundSession)
}
