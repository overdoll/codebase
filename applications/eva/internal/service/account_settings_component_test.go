package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/applications/eva/internal/service"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/graphql/relay"
	"strings"
	"testing"
)

func getEmailConfirmationTokenFromEmail(t *testing.T, email string) string {
	res, err := service.GetEmailConfirmationTokenFromEmail(email)
	require.NoError(t, err, "no error for grabbing confirmation token")
	return res
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

type ViewerAccountEmailUsernameSettings struct {
	Viewer struct {
		Username    string
		EmailsLimit int
		Emails      *struct {
			Edges []*struct {
				Node *AccountEmailModified
			}
		}
		UsernamesLimit int
		Usernames      *struct {
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

// Go through a full flow of adding a new email to an account, confirming the email and making it the primary email
func TestAccountEmail_create_new_and_confirm_make_primary(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	// use passport with user
	client, _ := getHttpClientWithAuthenticatedAccount(t, testAccountId)

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err, "no error generating fake account")

	targetEmail := strings.ToLower(fake.Email)

	var addAccountEmail AddAccountEmail

	// add an email to our account
	err = client.Mutate(context.Background(), &addAccountEmail, map[string]interface{}{
		"input": types.AddAccountEmailInput{Email: targetEmail},
	})

	require.NoError(t, err, "no error for adding account email")
	require.NotNil(t, addAccountEmail.AddAccountEmail.AccountEmail, "account email should be available")
	require.Equal(t, addAccountEmail.AddAccountEmail.AccountEmail.Email, targetEmail, "emails should match")
	require.Equal(t, addAccountEmail.AddAccountEmail.AccountEmail.Status, types.AccountEmailStatusUnconfirmed, "email should be unconfirmed")

	// get confirmation key (this would be found in the email, but here we query our redis DB directly)
	confirmationKey := getEmailConfirmationTokenFromEmail(t, targetEmail)

	require.NotEmpty(t, confirmationKey)

	var confirmAccountEmail ConfirmAccountEmail

	// confirm the account's new email
	err = client.Mutate(context.Background(), &confirmAccountEmail, map[string]interface{}{
		"input": types.ConfirmAccountEmailInput{ID: confirmationKey},
	})

	require.NoError(t, err, "no error for confirming account")
	require.NotNil(t, confirmAccountEmail.ConfirmAccountEmail.AccountEmail, "email should be available")

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

	// set old email as primary
	err = client.Mutate(context.Background(), &makeEmailPrimary, map[string]interface{}{
		"input": types.UpdateAccountEmailStatusToPrimaryInput{AccountEmailID: "QWNjb3VudEVtYWlsOjFwY0tpYlJvcVRBVWdtT2lOcEdMSXJ6dE05UjppMmZoei50ZXN0LWFjY291bnRAaW5ib3gudGVzdG1haWwuYXBw"},
	})

	require.NoError(t, err, "no error for updating status to primary")
	require.NotNil(t, makeEmailPrimary.UpdateAccountEmailStatusToPrimary.PrimaryAccountEmail, "email is available")

	// remove old email from account
	var removeAccountEmail DeleteAccountEmail

	// remove the email from the account
	err = client.Mutate(context.Background(), &removeAccountEmail, map[string]interface{}{
		"input": types.DeleteAccountEmailInput{AccountEmailID: addAccountEmail.AddAccountEmail.AccountEmail.ID},
	})

	require.NoError(t, err)
	require.NotNil(t, removeAccountEmail.DeleteAccountEmail.AccountEmailID)

	settings = viewerAccountEmailUsernameSettings(t, client)

	foundNewEmail := false

	// go through account settings and make sure email is not found
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == targetEmail {
			foundNewEmail = true
		}
	}

	require.False(t, foundNewEmail, "should not have found an email as part of the viewer's emails")
}

func TestAccountEmailAndUsernameLimit(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	// use passport with user
	client, _ := getHttpClientWithAuthenticatedAccount(t, testAccountId)

	settings := viewerAccountEmailUsernameSettings(t, client)

	require.Equal(t, settings.Viewer.EmailsLimit, 5, "should show an emails limit")
	require.Equal(t, settings.Viewer.UsernamesLimit, 5, "should show a usernames limit")
}

type UpdateAccountUsernameAndRetainPrevious struct {
	UpdateAccountUsernameAndRetainPrevious struct {
		AccountUsername *AccountUsernameModified
		Validation      *types.UpdateAccountUsernameAndRetainPreviousValidation
	} `graphql:"updateAccountUsernameAndRetainPrevious(input: $input)"`
}

type DeleteAccountUsername struct {
	DeleteAccountUsername struct {
		AccountUsernameId relay.ID
	} `graphql:"deleteAccountUsername(input: $input)"`
}

func TestAccountUsername_modify(t *testing.T) {
	t.Parallel()

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	client, _ := getHttpClientWithAuthenticatedAccount(t, testAccountId)

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
	require.Nil(t, modifyAccountUsername.UpdateAccountUsernameAndRetainPrevious.Validation, "no validation errors")
	require.NotNil(t, modifyAccountUsername.UpdateAccountUsernameAndRetainPrevious.AccountUsername)

	settings := viewerAccountEmailUsernameSettings(t, client)

	var foundUsername *AccountUsernameModified

	// go through the account's usernames and make sure the username exists here
	for _, username := range settings.Viewer.Usernames.Edges {
		if username.Node.Username == targetUsername {
			foundUsername = username.Node
		}
	}

	require.NotNil(t, foundUsername, "should have found a username in the list")

	// make sure that the username is modified as well for the "authentication" query
	require.Equal(t, targetUsername, settings.Viewer.Username, "username is modified")

	oldUsername := "testaccountforstuff"

	var modifyAccountUsernameToPrevious UpdateAccountUsernameAndRetainPrevious

	// set username back to the old one
	err = client.Mutate(context.Background(), &modifyAccountUsernameToPrevious, map[string]interface{}{
		"input": types.UpdateAccountUsernameAndRetainPreviousInput{Username: oldUsername},
	})

	require.NoError(t, err)
	require.Nil(t, modifyAccountUsernameToPrevious.UpdateAccountUsernameAndRetainPrevious.Validation, "no validation errors")
	require.NotNil(t, modifyAccountUsernameToPrevious.UpdateAccountUsernameAndRetainPrevious.AccountUsername, "account username should be there")

	settings = viewerAccountEmailUsernameSettings(t, client)

	// make suer username is set back to the old one
	require.Equal(t, oldUsername, settings.Viewer.Username, "username is set back to the old one")

	// delete old username
	var deleteAccountUsername DeleteAccountUsername

	// delete old username that we set
	err = client.Mutate(context.Background(), &deleteAccountUsername, map[string]interface{}{
		"input": types.DeleteAccountUsernameInput{AccountUsernameID: foundUsername.ID},
	})

	require.NoError(t, err)

	// make sure username no longer shows up
	settings = viewerAccountEmailUsernameSettings(t, client)

	var foundUsernameOld *AccountUsernameModified

	// make sure old username is gone
	for _, username := range settings.Viewer.Usernames.Edges {
		if username.Node.Username == foundUsername.Username {
			foundUsernameOld = username.Node
		}
	}

	require.Nil(t, foundUsernameOld, "should not have the username in the list anymore")
}

type TestSession struct {
	Ip string `faker:"ipv4"`
}

type RevokeAccountSession struct {
	RevokeAccountSession *types.RevokeAccountSessionPayload `graphql:"revokeAccountSession(input: $input)"`
}

func TestAccountSessions_view_and_revoke(t *testing.T) {
	t.Parallel()

	ip := "127.0.0.1"

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	grpcClient, ctx := getGrpcClientWithAuthenticatedAccount(t, testAccountId)

	// create a new session
	s, err := grpcClient.CreateSession(ctx, &eva.CreateSessionRequest{AccountId: testAccountId})
	require.NoError(t, err)

	// get session and make sure its valid
	v, err := grpcClient.GetSession(ctx, &eva.SessionRequest{Id: s.Id})
	require.NoError(t, err)

	require.Equal(t, true, v.Valid, "session should be valid")
	require.Equal(t, testAccountId, v.AccountId, "session should be exact account id")

	client, _ := getHttpClientWithAuthenticatedAccount(t, testAccountId)

	// query account settings once more
	settings := viewerAccountEmailUsernameSettings(t, client)

	foundSession := false
	var sessionId relay.ID

	// go through sessions and find by IP
	for _, sess := range settings.Viewer.Sessions.Edges {
		if sess.Node.IP == ip {
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

	require.NoError(t, err, "no error when revoking session")
	require.NotNil(t, revokeAccountSession.RevokeAccountSession.AccountSessionID)

	// now test to make sure the session does not exist
	settings = viewerAccountEmailUsernameSettings(t, client)
	foundSession = false

	for _, sess := range settings.Viewer.Sessions.Edges {
		if sess.Node.ID == sessionId {
			foundSession = true
		}
	}

	// make sure its false
	require.False(t, foundSession, "session should not have been found")

}

func TestAccountSessions_view_and_revoke_remote(t *testing.T) {

	testAccountId := "1pcKibRoqTAUgmOiNpGLIrztM9R"

	grpcClient, ctx := getGrpcClient(t)

	// create another new session
	s, err := grpcClient.CreateSession(ctx, &eva.CreateSessionRequest{AccountId: testAccountId})
	require.NoError(t, err, "should have created a new session")

	// revoke session
	_, err = grpcClient.RevokeSession(ctx, &eva.SessionRequest{Id: s.Id})
	require.NoError(t, err, "session should have been revoked")

	// get session and see that its not valid
	v, err := grpcClient.GetSession(ctx, &eva.SessionRequest{Id: s.Id})
	require.NoError(t, err)
	require.Equal(t, false, v.Valid, "session should no longer be valid")
}
