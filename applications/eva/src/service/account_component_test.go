package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/passport"
)

type ViewerAcc struct {
	Viewer struct {
		Username graphql.String
	} `graphql:"viewer()"`
}

func viewerAccount(t *testing.T, client *graphql.Client) ViewerAcc {
	var settings ViewerAcc
	err := client.Query(context.Background(), &settings, nil)
	require.NoError(t, err)
	return settings
}

// TestRedeemCookie_invalid - test by redeeming an invalid cookie
func TestRedeemCookie_invalid(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, nil)

	redeemToken := verifyAuthenticationToken(t, client, "some-random-cookie")

	// check to make sure its returned as invalid
	assert.Nil(t, redeemToken.VerifyAuthenticationTokenAndAttemptAccountAccessGrant.AuthenticationToken)
}

// Test empty authentication - we didnt pass any passport so it shouldn't do anything
func TestGetAccountAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, nil)

	query := viewerAccount(t, client)

	// at this point there is no account (since no passport is passed in) so expect that it doesnt send anything
	require.Empty(t, query.Viewer.Username)

	queryToken := viewAuthenticationToken(t, client)

	require.Nil(t, queryToken.ViewAuthenticationToken)
}

// TestGetAccountAuthentication_user - we assign a passport to our Http client, which will add it to the request body
// when doing a graphql request
// normally, passport is stored in session and assigned in the graphql gateway
// since we can't do this here, we assign it manually
func TestGetAccountAuthentication_user(t *testing.T) {
	t.Parallel()

	// userID is from one of our seeders (which will exist during testing)
	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	query := viewerAccount(t, client)

	require.Equal(t, graphql.String("poisonminion"), query.Viewer.Username)

	queryToken := viewAuthenticationToken(t, client)

	require.Nil(t, queryToken.ViewAuthenticationToken)
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
