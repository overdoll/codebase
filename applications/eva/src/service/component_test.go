package service

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/spf13/viper"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const EvaHttpAddr = ":7777"
const EvaHttpClientAddr = "http://:7777/graphql"

const EvaGrpcAddr = "0.0.0.0:7778"
const EvaGrpcClientAddr = "http://0.0.0.0:7778"

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

type AuthQuery struct {
	Authentication struct {
		User *struct {
			Username graphql.String
		}
		Cookie *struct {
			Email    graphql.String
			Redeemed graphql.Boolean
		}
	}
}

type RedeemCookie struct {
	RedeemCookie struct {
		SameSession graphql.Boolean
		Registered  graphql.Boolean
		Redeemed    graphql.Boolean
		Session     graphql.String
		Email       graphql.String
		Invalid     graphql.Boolean
	} `graphql:"redeemCookie(cookie: $cookie)"`
}

type Authenticate struct {
	Authenticate bool `graphql:"authenticate(data: $data)"`
}

type Register struct {
	Register bool `graphql:"register(data: $data)"`
}

type Logout struct {
	Logout bool `graphql:"logout()"`
}

// TestUserRegistration_complete - complete a whole user registration flow using multiple graphql endpoints
// this is in one test because it requires a persistent state (in this case, it's cookies)
func TestUserRegistration_complete(t *testing.T) {
	t.Parallel()

	client, httpUser := getClient(t, nil)

	var authenticate Authenticate

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

	var redeemCookie RedeemCookie

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
	var register Register

	err = client.Mutate(context.Background(), &register, map[string]interface{}{
		"data": &types.RegisterInput{Username: fake.Username},
	})

	require.NoError(t, err)
	assert.Equal(t, register.Register, true)

	cookies = httpUser.Jar.Cookies(&url.URL{
		Scheme: "http",
	})

	// Making sure that with "register" the OTP cookie is removed
	for _, ck := range cookies {
		assert.NotEqual(t, ck.Name, cookie.OTPKey)
	}
}

// Test empty authentication - we didnt pass any passport so it shouldn't do anything
func TestGetUserAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _ := getClient(t, nil)

	var query AuthQuery

	err := client.Query(context.Background(), &query, nil)

	require.NoError(t, err)

	// at this point there is no user (since no passport is passed in) so expect that it doesnt send anything
	require.Nil(t, query.Authentication.Cookie)
	require.Nil(t, query.Authentication.User)
}

// TestGetUserAuthentication_user - we assign a passport to our Http client, which will add it to the request body
// when doing a graphql request
// normally, passport is stored in session and assigned in the graphql gateway
// since we can't do this here, we assign it manually
func TestGetUserAuthentication_user(t *testing.T) {
	t.Parallel()

	// userID is from one of our seeders (which will exist during testing)
	client, _ := getClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var query AuthQuery

	err := client.Query(context.Background(), &query, nil)

	require.NoError(t, err)

	require.Nil(t, query.Authentication.Cookie)
	require.Equal(t, "poisonminion", string(query.Authentication.User.Username))
}

// test to make sure logout works (when passport is present)
func TestLogout_user(t *testing.T) {
	t.Parallel()

	client, _ := getClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var mutation Logout

	err := client.Mutate(context.Background(), &mutation, nil)

	require.NoError(t, err)

	require.Equal(t, mutation.Logout, true)
}

// test by grabbing a user
func TestUser_get(t *testing.T) {
	evaClient, _ := clients.NewEvaClient(context.Background(), EvaGrpcClientAddr)

	res, err := evaClient.GetUser(context.Background(), &eva.GetUserRequest{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"})

	require.NoError(t, err)

	fmt.Println(res)

	assert.Equal(t, true, false)
}

func getClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client) {

	client := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(EvaHttpClientAddr, client), client
}

func startService() bool {
	// in bazel we cant read config file (its not included as part of tests) so we need to set it here
	viper.Set("db.keyspace", "eva")

	app, _ := NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&app)

	go bootstrap.InitializeHttpServer(EvaHttpAddr, srv, func() {})

	ok := tests.WaitForPort(EvaHttpAddr)
	if !ok {
		log.Println("Timed out waiting for eva HTTP to come up")
		return false
	}

	bootstrap.InitializeGRPCServer(EvaGrpcAddr, func(server *grpc.Server) {
		s := ports.NewGrpcServer(&app)
		eva.RegisterEvaServer(server, s)
	})

	ok = tests.WaitForPort(EvaGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for eva GRPC to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
