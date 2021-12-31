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
	"time"
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

type ViewerAccountEmailUsernameSettings struct {
	Viewer struct {
		Username                string
		EmailsLimit             int
		UsernameEditAvailableAt time.Time
		Emails                  *struct {
			Edges []*struct {
				Node *AccountEmailModified
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

	newAcc := createFakeNormalAccount(t)
	testAccountId := newAcc.ID()
	oldEmail := newAcc.Email()

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

	var oldEmailId relay.ID
	foundConfirmedEmail := false

	// go through account settings and make sure that this email is now confirmed
	for _, email := range settings.Viewer.Emails.Edges {
		if email.Node.Email == targetEmail && email.Node.Status == types.AccountEmailStatusConfirmed {
			foundConfirmedEmail = true
		}

		if email.Node.Email == oldEmail {
			oldEmailId = email.Node.ID
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
		"input": types.UpdateAccountEmailStatusToPrimaryInput{AccountEmailID: oldEmailId},
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
}

type UpdateAccountUsername struct {
	UpdateAccountUsername struct {
		Account    *AccountModified
		Validation *types.UpdateAccountUsernameValidation
	} `graphql:"updateAccountUsername(input: $input)"`
}

func TestAccountUsername_modify(t *testing.T) {
	t.Parallel()

	newAcc := createFakeNormalAccount(t)
	testAccountId := newAcc.ID()
	oldUsername := newAcc.Username()

	client, _ := getHttpClientWithAuthenticatedAccount(t, testAccountId)

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetUsername := fake.Username

	var modifyAccountUsername UpdateAccountUsername

	// modify account's username
	err = client.Mutate(context.Background(), &modifyAccountUsername, map[string]interface{}{
		"input": types.UpdateAccountUsernameInput{Username: targetUsername},
	})

	require.NoError(t, err)
	require.Nil(t, modifyAccountUsername.UpdateAccountUsername.Validation, "no validation errors")

	settings := viewerAccountEmailUsernameSettings(t, client)

	// make sure that the username is modified as well for the "authentication" query
	require.Equal(t, targetUsername, settings.Viewer.Username, "username is modified")

	require.True(t, settings.Viewer.UsernameEditAvailableAt.After(time.Now()))

	// make sure we can't find the account using the old username now
	accountUsername := getAccountByUsername(t, client, oldUsername)
	require.Nil(t, accountUsername)

	// make sure that we get an error if we try to change the name again
	var modifyAccountUsername2 UpdateAccountUsername
	err = client.Mutate(context.Background(), &modifyAccountUsername2, map[string]interface{}{
		"input": types.UpdateAccountUsernameInput{Username: oldUsername},
	})
	require.Error(t, err)
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
	t.Parallel()

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
