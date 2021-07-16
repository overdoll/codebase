package service

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/passport"
)

// TestRedeemCookie_invalid - test by redeeming an invalid cookie
func TestRedeemCookie_invalid(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, nil)

	redeemToken := qRedeemAuthenticationToken(t, client, "some-random-cookie")

	// check to make sure its returned as invalid
	assert.Nil(t, redeemToken.RedeemAuthenticationToken)
}

// Test empty authentication - we didnt pass any passport so it shouldn't do anything
func TestGetAccountAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, nil)

	query := qAuthenticatedAccount(t, client)

	// at this point there is no account (since no passport is passed in) so expect that it doesnt send anything
	require.Nil(t, query.Viewer)

	queryToken := qAuthenticationTokenStatus(t, client)

	require.Nil(t, queryToken.AuthenticationTokenStatus)
}

// TestGetAccountAuthentication_user - we assign a passport to our Http client, which will add it to the request body
// when doing a graphql request
// normally, passport is stored in session and assigned in the graphql gateway
// since we can't do this here, we assign it manually
func TestGetAccountAuthentication_user(t *testing.T) {
	t.Parallel()

	// userID is from one of our seeders (which will exist during testing)
	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	query := qAuthenticatedAccount(t, client)

	require.Equal(t, "poisonminion", query.Viewer.Username)

	queryToken := qAuthenticationTokenStatus(t, client)

	require.Nil(t, queryToken.AuthenticationTokenStatus)
}

// TestAccount_get - test GRPC endpoint for grabbing a user
func TestAccount_get(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	res, err := client.GetAccount(context.Background(), &eva.GetAccountRequest{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"})

	require.NoError(t, err)

	assert.Equal(t, res.Username, "poisonminion")
}

func TestAccount_lock_unlock(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	res, err := client.LockAccount(context.Background(), &eva.LockAccountRequest{
		Id:       "1q7MIqqnkzew33q4elXuN1Ri27d",
		Duration: 100000000,
		Reason:   eva.LockAccountReason_POST_INFRACTION,
	})

	require.NoError(t, err)

	assert.Equal(t, true, res.Locked)

	res, err = client.LockAccount(context.Background(), &eva.LockAccountRequest{
		Id:       "1q7MIqqnkzew33q4elXuN1Ri27d",
		Duration: 0,
	})

	require.NoError(t, err)

	assert.Equal(t, false, res.Locked)
}
