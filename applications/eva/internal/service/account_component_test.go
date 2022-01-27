package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	eva "overdoll/applications/eva/proto"
	"testing"
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

	client, _ := getHttpClientWithAuthenticatedAccount(t, "")

	redeemToken := verifyAuthenticationToken(t, client, "some-random-cookie", "some random secret")

	// check to make sure its returned as invalid
	require.Nil(t, redeemToken.VerifyAuthenticationToken.AuthenticationToken, "authentication token is valid")
}

// Test empty authentication - we didnt pass any passport so it shouldn't do anything
func TestGetAccountAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClientWithAuthenticatedAccount(t, "")

	query := viewerAccount(t, client)

	// at this point there is no account (since no passport is passed in) so expect that it doesnt send anything
	require.Nil(t, query.Viewer, "no viewer present for no account")

	queryToken := viewAuthenticationToken(t, client, "")

	require.Nil(t, queryToken.ViewAuthenticationToken, "no authentication token for empty")
}

// TestGetAccountAuthentication_user - we assign a passport to our Http client, which will add it to the request body
// when doing a graphql request
// normally, passport is stored in session and assigned in the graphql gateway
// since we can't do this here, we assign it manually
func TestGetAccountAuthentication_user(t *testing.T) {
	t.Parallel()

	// userID is from one of our seeders (which will exist during testing)
	client, _ := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	query := viewerAccount(t, client)

	require.Equal(t, "poisonminion", query.Viewer.Username, "correct username for account")
}

// TestAccount_get - test GRPC endpoint for grabbing a user
func TestAccount_get(t *testing.T) {
	t.Parallel()

	client, _ := getGrpcClient(t)

	res, err := client.GetAccount(context.Background(), &eva.GetAccountRequest{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"})

	require.NoError(t, err, "no error for fetching an account")

	require.Equal(t, "poisonminion", res.Username, "correct username for grpc request")
}
