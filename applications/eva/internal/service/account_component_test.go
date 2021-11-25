package service_test

import (
	"context"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"testing"
	"time"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/passport"
)

func viewerAccount(t *testing.T, client *graphql.Client) ViewerAccount {
	var settings ViewerAccount
	err := client.Query(context.Background(), &settings, nil)
	require.NoError(t, err, "no error fetching viewer")
	return settings
}

// TestRedeemCookie_invalid - test by redeeming an invalid cookie
func TestRedeemCookie_invalid(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	redeemToken := verifyAuthenticationToken(t, client, "some-random-cookie")

	// check to make sure its returned as invalid
	require.Nil(t, redeemToken.VerifyAuthenticationToken.AuthenticationToken, "authentication token is valid")
}

// Test empty authentication - we didnt pass any passport so it shouldn't do anything
func TestGetAccountAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	query := viewerAccount(t, client)

	// at this point there is no account (since no passport is passed in) so expect that it doesnt send anything
	require.Nil(t, query.Viewer, "no viewer present for no account")

	queryToken := viewAuthenticationToken(t, client)

	require.Nil(t, queryToken.ViewAuthenticationToken, "no authentication token for empty")
}

// TestGetAccountAuthentication_user - we assign a passport to our Http client, which will add it to the request body
// when doing a graphql request
// normally, passport is stored in session and assigned in the graphql gateway
// since we can't do this here, we assign it manually
func TestGetAccountAuthentication_user(t *testing.T) {
	t.Parallel()

	// userID is from one of our seeders (which will exist during testing)
	client, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	query := viewerAccount(t, client)

	require.Equal(t, "poisonminion", query.Viewer.Username, "correct username for account")

	queryToken := viewAuthenticationToken(t, client)

	require.Nil(t, queryToken.ViewAuthenticationToken, "no authentication token for authenticated account")
}

// TestAccount_get - test GRPC endpoint for grabbing a user
func TestAccount_get(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	res, err := client.GetAccount(context.Background(), &eva.GetAccountRequest{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"})

	require.NoError(t, err, "no error for fetching an account")

	require.Equal(t, "poisonminion", res.Username, "correct username for grpc request")
}

type UnlockAccount struct {
	UnlockAccount struct {
		Account struct {
			Id string
		}
	} `graphql:"unlockAccount()"`
}

func TestAccount_lock_unlock(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	// lock account with grpc endpoint
	res, err := client.LockAccount(context.Background(), &eva.LockAccountRequest{
		Id:       "1q7MIqqnkzew33q4elXuN1Ri27d",
		Duration: time.Now().Add(time.Duration(-15) * time.Minute).Unix(),
		Reason:   eva.LockAccountReason_POST_INFRACTION,
	})

	require.NoError(t, err, "no error for locking account")

	require.Equal(t, true, res.Locked, "account should be locked")

	gClient, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MIqqnkzew33q4elXuN1Ri27d"))

	var query ViewerAccountLock
	err = gClient.Query(context.Background(), &query, nil)
	require.NoError(t, err, "no error fetching viewer")

	require.NotNil(t, query.Viewer.Lock, "should be locked")
	require.Equal(t, types.AccountLockReasonPostInfraction, query.Viewer.Lock.Reason, "viewer should see that the account is locked")

	var unlockAccount UnlockAccount

	err = gClient.Mutate(context.Background(), &unlockAccount, nil)

	require.NoError(t, err, "no error when unlocking")

	// check account
	err = gClient.Query(context.Background(), &query, nil)
	require.NoError(t, err, "no error fetching viewer")

	require.Nil(t, query.Viewer.Lock, "should not be locked")
}
