package service_test

import (
	"context"
	"overdoll/applications/eva/internal/service"
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

func getEmailConfirmationTokenFromEmail(t *testing.T, email string) string {
	res, err := service.GetEmailConfirmationTokenFromEmail(email)
	require.NoError(t, err, "no error for grabbing confirmation token")
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
	Email  string
	Status types.AccountEmailStatus
}

type AccountUsernameModified struct {
	ID       relay.ID
	Username string
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
		Username string
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
	require.NoError(t, err, "no error for grabbing viewer account email settings")
	return settings
}

func addAccountEmail(t *testing.T, client *graphql.Client, targetEmail string) AddAccountEmail {
	var addAccountEmail AddAccountEmail

	// add an email to our account
	err := client.Mutate(context.Background(), &addAccountEmail, map[string]interface{}{
		"input": types.AddAccountEmailInput{Email: targetEmail},
	})

	require.NoError(t, err, "no error for adding account email")
	require.NotNil(t, addAccountEmail.AddAccountEmail.AccountEmail, "account email should be available")
	require.Equal(t, addAccountEmail.AddAccountEmail.AccountEmail.Email, targetEmail, "emails should match")
	require.Equal(t, addAccountEmail.AddAccountEmail.AccountEmail.Status, types.AccountEmailStatusUnconfirmed, "email should be unconfirmed")

	return addAccountEmail
}

func confirmAccountEmail(t *testing.T, client *graphql.Client, email string) ConfirmAccountEmail {
	// get confirmation key (this would be found in the email, but here we query our redis DB directly)
	confirmationKey := getEmailConfirmationTokenFromEmail(t, email)

	require.NotEmpty(t, confirmationKey)

	var confirmAccountEmail ConfirmAccountEmail

	// confirm the account's new email
	err := client.Mutate(context.Background(), &confirmAccountEmail, map[string]interface{}{
		"input": types.ConfirmAccountEmailInput{ID: confirmationKey},
	})

	require.NoError(t, err, "no error for confirming account")
	require.NotNil(t, confirmAccountEmail.ConfirmAccountEmail.AccountEmail, "email should be available")

	return confirmAccountEmail
}

// Go through a full flow of adding a new email to an account, confirming the email and making it the primary email
func TestAccountEmail_create_new_and_confirm_make_primary(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	// use passport with user
	client, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err, "no error generating fake account")

	targetEmail := strings.ToLower(fake.Email)

	addAccountEmail(t, client, targetEmail)

	confirmAccountEmail := confirmAccountEmail(t, client, targetEmail)

	settings := viewerAccountEmailUsernameSettings(t, client)

	foundConfirmedEmail := false

	// go through account settings and make sure that this email is now confirmed
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == targetEmail && email.Node.Status == types.AccountEmailStatusConfirmed {
			foundConfirmedEmail = true
		}
	}

	require.True(t, foundConfirmedEmail, "should have found a confirmed account email in list")

	var makeEmailPrimary UpdateAccountEmailStatusToPrimary

	// mark email as primary
	err = client.Mutate(context.Background(), &makeEmailPrimary, map[string]interface{}{
		"input": types.UpdateAccountEmailStatusToPrimaryInput{AccountEmailID: confirmAccountEmail.ConfirmAccountEmail.AccountEmail.ID},
	})

	require.NoError(t, err, "no error for updating status to primary")
	require.NotNil(t, makeEmailPrimary.UpdateAccountEmailStatusToPrimary.PrimaryAccountEmail, "email is available")

	require.Equal(t, targetEmail, makeEmailPrimary.UpdateAccountEmailStatusToPrimary.PrimaryAccountEmail.Email, "emails should be equal")

	// query account settings once more
	settings = viewerAccountEmailUsernameSettings(t, client)

	foundPrimaryEmail := false

	// go through account settings and make sure that this email is now the primary email
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == targetEmail && email.Node.Status == types.AccountEmailStatusPrimary {
			foundPrimaryEmail = true
		}
	}

	require.True(t, foundPrimaryEmail, "should have found an email that is primary")
}

// adds an email
func TestAccountEmail_create_new_confirm_and_remove(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	// use passport with user
	client, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetEmail := strings.ToLower(fake.Email)

	addAccountEmail := addAccountEmail(t, client, targetEmail)

	confirmAccountEmail(t, client, targetEmail)

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
		if email.Node.Email == targetEmail {
			foundNewEmail = true
		}
	}

	require.False(t, foundNewEmail, "should have found an email as part of the viewer's emails")
}

type UpdateAccountUsernameAndRetainPrevious struct {
	UpdateAccountUsernameAndRetainPrevious struct {
		AccountUsername *AccountUsernameModified
	} `graphql:"updateAccountUsernameAndRetainPrevious(input: $input)"`
}

func TestAccountUsername_modify(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	client, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

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
		if username.Node.Username == targetUsername {
			foundNewUsername = true
		}
	}

	require.True(t, foundNewUsername, "should have found a username in the list")

	// make sure that the username is modified as well for the "authentication" query
	require.Equal(t, targetUsername, settings.Viewer.Username, "username is modified")
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

	client, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

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

	require.True(t, foundSession, "should have found a matching session")

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
	require.False(t, foundSession, "session should not have been found")
}
