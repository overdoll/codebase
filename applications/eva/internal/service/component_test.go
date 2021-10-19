package service_test

import (
	"context"
	"log"
	"net/http"
	"net/url"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/applications/eva/internal/ports"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/applications/eva/internal/service"
	eva "overdoll/applications/eva/proto"
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

type AccountModified struct {
	Username    string
	IsStaff     bool
	IsModerator bool
}

type AccountByUsername struct {
	Account *AccountModified `graphql:"account(username: $username)"`
}

type ViewerAccount struct {
	Viewer *AccountModified `graphql:"viewer()"`
}

type GrantAuthenticationToken struct {
	GrantAuthenticationToken types.GrantAuthenticationTokenPayload `graphql:"grantAuthenticationToken(input: $input)"`
}

func grantAuthenticationToken(t *testing.T, client *graphql.Client, email string) GrantAuthenticationToken {
	var authenticate GrantAuthenticationToken

	err := client.Mutate(context.Background(), &authenticate, map[string]interface{}{
		"input": types.GrantAuthenticationTokenInput{Email: email},
	})

	require.NoError(t, err)

	return authenticate
}

type VerifyAuthenticationToken struct {
	VerifyAuthenticationToken *struct {
		AuthenticationToken *types.AuthenticationToken
	} `graphql:"verifyAuthenticationToken(input: $input)"`
}

func verifyAuthenticationToken(t *testing.T, client *graphql.Client, cookie string) VerifyAuthenticationToken {
	var redeemCookie VerifyAuthenticationToken

	err := client.Mutate(context.Background(), &redeemCookie, map[string]interface{}{
		"input": types.VerifyAuthenticationTokenInput{AuthenticationTokenID: cookie},
	})

	require.NoError(t, err)

	return redeemCookie
}

type GrantAccountAccessWithAuthenticationToken struct {
	GrantAccountAccessWithAuthenticationToken *struct {
		Account struct {
			Username string
		}
	} `graphql:"grantAccountAccessWithAuthenticationToken()"`
}

func grantAccountAccessWithAuthenticationToken(t *testing.T, client *graphql.Client) GrantAccountAccessWithAuthenticationToken {
	var redeemCookie GrantAccountAccessWithAuthenticationToken

	err := client.Mutate(context.Background(), &redeemCookie, nil)

	require.NoError(t, err)

	return redeemCookie
}

// helper function - basically runs the "authentication" flow - run authenticate mutation, grab cookie from jar, and redeem the cookie
func authenticateAndVerifyToken(t *testing.T, email string) (VerifyAuthenticationToken, *graphql.Client, *clients.ClientPassport) {

	client, httpUser, pass := getHttpClient(t, passport.FreshPassport())

	authenticate := grantAuthenticationToken(t, client, email)

	otpCookie := getOTPTokenFromJar(t, httpUser.Jar)

	require.NotNil(t, authenticate.GrantAuthenticationToken.AuthenticationToken)
	require.Equal(t, email, authenticate.GrantAuthenticationToken.AuthenticationToken.Email)

	ck := verifyAuthenticationToken(t, client, otpCookie.Value)

	// make sure cookie is valid
	require.NotNil(t, ck.VerifyAuthenticationToken)

	return ck, client, pass
}

type ViewAuthenticationToken struct {
	ViewAuthenticationToken *types.AuthenticationToken
}

func viewAuthenticationToken(t *testing.T, client *graphql.Client) ViewAuthenticationToken {
	var authRedeemed ViewAuthenticationToken

	err := client.Query(context.Background(), &authRedeemed, nil)

	require.NoError(t, err)

	return authRedeemed
}

func getAccountByUsername(t *testing.T, client *graphql.Client, username string) *AccountModified {
	var accountByUsername AccountByUsername

	err := client.Query(context.Background(), &accountByUsername, map[string]interface{}{
		"username": graphql.String(username),
	})

	require.NoError(t, err)

	return accountByUsername.Account
}

func getOTPTokenFromJar(t *testing.T, jar http.CookieJar) *http.Cookie {
	// get cookies
	cookies := jar.Cookies(&url.URL{
		Scheme: "http",
	})

	var otpCookie *http.Cookie

	// need to grab value from cookie, so we can redeem it
	for _, ck := range cookies {
		if ck.Name == token.OTPKey {
			otpCookie = ck
		}
	}

	return otpCookie
}

func getHttpClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client, *clients.ClientPassport) {

	client, transport := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(EvaHttpClientAddr, client), client, transport
}

func getGrpcClient(t *testing.T) eva.EvaClient {

	evaClient, _ := clients.NewEvaClient(context.Background(), EvaGrpcClientAddr)

	return evaClient
}

func startService() bool {
	// config file location (specified in BUILD file) will be absolute from repository path
	config.Read("applications/eva")

	app, _ := service.NewApplication(context.Background())

	srv := ports.NewHttpServer(&app)

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
