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
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/applications/eva/src/ports"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/applications/eva/src/service"
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

type GrantAuthenticationToken struct {
	GrantAuthenticationToken types.GrantAuthenticationTokenPayload `graphql:"grantAuthenticationToken(input: $input)"`
}

func mAuthenticate(t *testing.T, client *graphql.Client, email string) GrantAuthenticationToken {
	var authenticate GrantAuthenticationToken

	err := client.Mutate(context.Background(), &authenticate, map[string]interface{}{
		"input": types.GrantAuthenticationTokenInput{Email: email},
	})

	require.NoError(t, err)

	return authenticate
}

type VerifyAuthenticationTokenAndAttemptAccountAccessGrant struct {
	VerifyAuthenticationTokenAndAttemptAccountAccessGrant *struct {
		Account *struct {
			Username graphql.String
		}
		AuthenticationToken *types.AuthenticationToken
	} `graphql:"verifyAuthenticationTokenAndAttemptAccountAccessGrant(input: $input)"`
}

func verifyAuthenticationToken(t *testing.T, client *graphql.Client, cookie string) VerifyAuthenticationTokenAndAttemptAccountAccessGrant {
	var redeemCookie VerifyAuthenticationTokenAndAttemptAccountAccessGrant

	err := client.Mutate(context.Background(), &redeemCookie, map[string]interface{}{
		"input": types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput{AuthenticationTokenID: cookie},
	})

	require.NoError(t, err)

	return redeemCookie
}

// helper function - basically runs the "authentication" flow - run authenticate mutation, grab cookie from jar, and redeem the cookie
func authenticateAndVerifyToken(t *testing.T, email string) (VerifyAuthenticationTokenAndAttemptAccountAccessGrant, *graphql.Client, *clients.ClientPassport) {

	client, httpUser, pass := getHttpClient(t, passport.FreshPassport())

	authenticate := mAuthenticate(t, client, email)

	otpCookie := getOTPTokenFromJar(t, httpUser.Jar)

	require.NotNil(t, authenticate.GrantAuthenticationToken.AuthenticationToken)
	require.Equal(t, email, authenticate.GrantAuthenticationToken.AuthenticationToken.Email)

	ck := verifyAuthenticationToken(t, client, otpCookie.Value)

	// make sure cookie is valid
	require.NotNil(t, ck.VerifyAuthenticationTokenAndAttemptAccountAccessGrant)

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
	config.Read("applications/eva/config.toml")

	app, _ := service.NewApplication(context.Background())

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
