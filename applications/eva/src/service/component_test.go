package service

import (
	"context"
	"log"
	"net/http"
	"net/url"
	"os"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const EvaHttpAddr = ":7777"
const EvaHttpClientAddr = "http://:7777/graphql"

const EvaGrpcAddr = "localhost:7778"
const EvaGrpcClientAddr = "localhost:7778"

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

type Register struct {
	Register bool `graphql:"register(data: $data)"`
}

type Logout struct {
	Logout bool `graphql:"logout()"`
}

type Authenticate struct {
	Authenticate bool `graphql:"authenticate(data: $data)"`
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

func mAuthenticate(t *testing.T, client *graphql.Client, email string) Authenticate {
	var authenticate Authenticate

	err := client.Mutate(context.Background(), &authenticate, map[string]interface{}{
		"data": &types.AuthenticationInput{Email: email},
	})

	require.NoError(t, err)

	return authenticate
}

func qRedeemCookie(t *testing.T, client *graphql.Client, cookie string) RedeemCookie {
	var redeemCookie RedeemCookie

	err := client.Query(context.Background(), &redeemCookie, map[string]interface{}{
		"cookie": graphql.String(cookie),
	})

	require.NoError(t, err)

	return redeemCookie
}

func qAuth(t *testing.T, client *graphql.Client) AuthQuery {
	var authRedeemed AuthQuery

	err := client.Query(context.Background(), &authRedeemed, nil)

	require.NoError(t, err)

	return authRedeemed
}

// TestUserRegistration_complete - complete a whole user registration flow using multiple graphql endpoints
// this is in one test because it requires a persistent state (in this case, it's cookies)
func TestUserRegistration_complete(t *testing.T) {
	t.Parallel()

	client, httpUser, _ := getClient(t, nil)

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	authenticate := mAuthenticate(t, client, fake.Email)

	// get cookies
	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)

	// make sure OTPKey is not empty
	require.True(t, otpCookie != nil)

	assert.Equal(t, authenticate.Authenticate, true)

	// check our auth query and make sure that it returns the correct cookie values
	authNotRedeemed := qAuth(t, client)

	// expect that the cookie is not redeemed
	assert.Equal(t, false, bool(authNotRedeemed.Authentication.Cookie.Redeemed))

	redeemCookie := qRedeemCookie(t, client, otpCookie.Value)

	// make sure cookie is redeemed
	assert.Equal(t, bool(redeemCookie.RedeemCookie.Redeemed), true)
	// make sure in the same session
	assert.Equal(t, bool(redeemCookie.RedeemCookie.SameSession), true)

	// check our auth query and make sure that it returns the correct cookie values
	authRedeemed := qAuth(t, client)

	// expect that our authentication query sees the cookie as redeemed
	assert.Equal(t, true, bool(authRedeemed.Authentication.Cookie.Redeemed))

	// now, we register (cookie is redeemed from above query)
	var register Register

	err = client.Mutate(context.Background(), &register, map[string]interface{}{
		"data": &types.RegisterInput{Username: fake.Username},
	})

	require.NoError(t, err)
	assert.Equal(t, register.Register, true)

	otpCookie = getOTPCookieFromJar(t, httpUser.Jar)
	// Making sure that with "register" the OTP cookie is removed
	require.Nil(t, otpCookie)
}

// TestRedeemCookie_invalid - test by redeeming an invalid cookie
func TestRedeemCookie_invalid(t *testing.T) {
	t.Parallel()

	client, _, _ := getClient(t, nil)

	redeemCookie := qRedeemCookie(t, client, "some-random-cookie")

	// check to make sure its returned as invalid
	assert.Equal(t, bool(redeemCookie.RedeemCookie.Invalid), true)
}

// TestUserLogin_existing - test is similar to registration, except that we do a login with an
// existing user
func TestUserLogin_existing(t *testing.T) {
	t.Parallel()

	client, httpUser, pass := getClient(t, passport.FreshPassport())

	authenticate := mAuthenticate(t, client, "poisonminion_test@overdoll.com")

	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)

	assert.Equal(t, authenticate.Authenticate, true)

	redeemCookie := qRedeemCookie(t, client, otpCookie.Value)

	// the RedeemCookie function will also log you in, if you redeem a cookie that's for a registered user
	// so we check for that here
	assert.Equal(t, true, bool(redeemCookie.RedeemCookie.Registered))

	// the third parameter of getClient contains the most up-to-date version of the passport
	modified := pass.GetPassport()

	// since our passport is a pointer that is modified from a response, we can use it to check to make sure
	// that the user is logged into the correct one
	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", modified.UserID())
}

// TestUserLogin_from_another_session - we login, but redeem our cookie from another "session"
func TestUserLogin_from_another_session(t *testing.T) {
	t.Parallel()

	client, httpUser, _ := getClient(t, passport.FreshPassport())

	authenticate := mAuthenticate(t, client, "poisonminion_test@overdoll.com")

	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)

	assert.Equal(t, authenticate.Authenticate, true)

	clientFromAnotherSession, _, _ := getClient(t, nil)

	redeemCookie := qRedeemCookie(t, clientFromAnotherSession, otpCookie.Value)

	// should have indicated that it was redeemed by another session
	assert.Equal(t, false, bool(redeemCookie.RedeemCookie.SameSession))

	authRedeemed := qAuth(t, client)

	// since our user's cookie was redeemed from another session, when the user runs this query
	// the next time, it should just log them in
	assert.Equal(t, "poisonminion", string(authRedeemed.Authentication.User.Username))
}

// Test empty authentication - we didnt pass any passport so it shouldn't do anything
func TestGetUserAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _, _ := getClient(t, nil)

	query := qAuth(t, client)

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
	client, _, _ := getClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	query := qAuth(t, client)

	require.Nil(t, query.Authentication.Cookie)
	require.Equal(t, "poisonminion", string(query.Authentication.User.Username))
}

// test to make sure logout works (when passport is present)
func TestLogout_user(t *testing.T) {
	t.Parallel()

	client, _, _ := getClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var mutation Logout

	err := client.Mutate(context.Background(), &mutation, nil)

	require.NoError(t, err)

	require.Equal(t, mutation.Logout, true)
}

// TestUser_get - test GRPC endpoint for grabbing a user
func TestUser_get(t *testing.T) {
	t.Parallel()

	evaClient, _ := clients.NewEvaClient(context.Background(), EvaGrpcClientAddr)

	res, err := evaClient.GetUser(context.Background(), &eva.GetUserRequest{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"})

	require.NoError(t, err)

	assert.Equal(t, res.Username, "poisonminion")
}

func getOTPCookieFromJar(t *testing.T, jar http.CookieJar) *http.Cookie {
	// get cookies
	cookies := jar.Cookies(&url.URL{
		Scheme: "http",
	})

	var otpCookie *http.Cookie

	// need to grab value from cookie, so we can redeem it
	for _, ck := range cookies {
		if ck.Name == cookie.OTPKey {
			otpCookie = ck
		}
	}

	return otpCookie
}

func getClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client, *clients.ClientPassport) {

	client, transport := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(EvaHttpClientAddr, client), client, transport
}

func startService() bool {
	// config file location (specified in BUILD file) will be absolute from repository path
	config.Read("applications/eva/config.toml")

	app, _ := NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&app)

	go bootstrap.InitializeHttpServer(EvaHttpAddr, srv, func() {})

	ok := tests.WaitForPort(EvaHttpAddr)
	if !ok {
		log.Println("Timed out waiting for eva HTTP to come up")
		return false
	}
	s := ports.NewGrpcServer(&app)

	go bootstrap.InitializeGRPCServer(EvaGrpcAddr, func(server *grpc.Server) {
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
