package service

import (
	"context"
	"log"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"os"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/bxcodec/faker/v3"
	"github.com/machinebox/graphql"
	"github.com/spf13/viper"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/tests"
)

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

const authQuery = `
	
`

// TestUserRegistration_complete - complete a whole user registration flow using multiple graphql endpoints
// this is in one test because it requires a persistent state (in this case, it's cookies)
func TestUserRegistration_complete(t *testing.T) {
	t.Parallel()

	client, httpUser := getClient(t)

	var authenticate struct {
		Authenticate bool `graphql:"authenticate(data: $data)"`
	}

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	email := fake.Email

	err = client.Mutate(context.Background(), &authenticate, map[string]interface{}{
		"data": &types.AuthenticationInput{Email: email},
	})

	require.NoError(t, err)

	// get cookies
	cookies := httpUser.Jar.Cookies(&url.URL{
		Scheme: "http",
	})

	var otpCookie *http.Cookie

	// need to grab value from cookie, so we can redeem it
	for _, ck := range cookies {
		if ck.Name == cookie.OTPKey {
			otpCookie = ck
		}
	}

	// make sure OTPKey is not empty
	require.True(t, otpCookie != nil)

	assert.Equal(t, authenticate.Authenticate, true)

	// check our auth query and make sure that it returns the correct cookie values
	var authNotRedeemed AuthQuery

	err = client.Query(context.Background(), &authNotRedeemed, nil)

	require.NoError(t, err)

	// expect that the cookie is not redeemed
	assert.Equal(t, false, bool(authNotRedeemed.Authentication.Cookie.Redeemed))

	var redeemCookie struct {
		RedeemCookie struct {
			SameSession graphql.Boolean
			Registered  graphql.Boolean
			Redeemed    graphql.Boolean
			Session     graphql.String
			Email       graphql.String
			Invalid     graphql.Boolean
		} `graphql:"redeemCookie(cookie: $cookie)"`
	}

	err = client.Query(context.Background(), &redeemCookie, map[string]interface{}{
		"cookie": graphql.String(otpCookie.Value),
	})

	require.NoError(t, err)

	httpUser.Jar.SetCookies(&url.URL{
		Scheme: "http",
		Path:   "/",
	}, []*http.Cookie{{Name: otpCookie.Name, Value: otpCookie.Value}})

	// make sure cookie is redeemed
	assert.Equal(t, bool(redeemCookie.RedeemCookie.Redeemed), true)
	// make sure in the same session
	assert.Equal(t, bool(redeemCookie.RedeemCookie.SameSession), true)

	// check our auth query and make sure that it returns the correct cookie values
	var authRedeemed AuthQuery

	err = client.Query(context.Background(), &authRedeemed, nil)

	require.NoError(t, err)

	// expect that our authentication query sees the cookie as redeemed
	assert.Equal(t, true, bool(authRedeemed.Authentication.Cookie.Redeemed))

	// now, we register (cookie is redeemed from above query)
	var register struct {
		Register bool `graphql:"register(data: $data)"`
	}

	err = client.Mutate(context.Background(), &register, map[string]interface{}{
		"data": &types.RegisterInput{Username: fake.Username},
	})

	require.NoError(t, err)
	assert.Equal(t, register.Register, true)

}

// Test empty authentication - we didnt pass any passport so it shouldnt do anything
func TestGetUserAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _ := getClient(t)

	var query AuthQuery

	err := client.Query(context.Background(), &query, nil)

	require.NoError(t, err)

	// at this point there is no user (since no passport is passed in) so expect that it doesnt send anything
	require.Nil(t, query.Authentication.Cookie)
	require.Nil(t, query.Authentication.User)
}

// TODO: test GRPC endpoint for grabbing specific users (see how DDD sets it up)

func getClient(t *testing.T) (*graphql.Client, *http.Client) {
	jar, err := cookiejar.New(nil)

	require.NoError(t, err)

	httpUser := &http.Client{
		Jar: jar,
	}

	return graphql.NewClient("http://:7777/graphql", graphql.WithHTTPClient(httpUser)), httpUser
}

func startService() bool {
	// in bazel we cant read config file (its not included as part of tests) so we need to set it here
	viper.Set("db.keyspace", "eva")

	app, _ := NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&app)

	evaHttpAddr := ":7777"

	go bootstrap.InitializeHttpServer(evaHttpAddr, srv, func() {})

	ok := tests.WaitForPort(evaHttpAddr)
	if !ok {
		log.Println("Timed out waiting for eva HTTP to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
