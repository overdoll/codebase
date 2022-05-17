package service_test

import (
	"context"
	"encoding/base64"
	"github.com/bxcodec/faker/v3"
	"go.temporal.io/sdk/testsuite"
	"log"
	"os"
	"overdoll/applications/eva/internal/adapters"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"overdoll/applications/eva/internal/ports"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/applications/eva/internal/service"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
)

const EvaHttpAddr = ":7777"
const EvaHttpClientAddr = "http://:7777/api/graphql"

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
	IsArtist    bool

	Deleting *types.AccountDeleting

	IsDeleted bool
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
		Validation          *types.VerifyAuthenticationTokenValidation
	} `graphql:"verifyAuthenticationToken(input: $input)"`
}

func verifyAuthenticationToken(t *testing.T, client *graphql.Client, token, secret string) VerifyAuthenticationToken {
	var redeemCookie VerifyAuthenticationToken

	err := client.Mutate(context.Background(), &redeemCookie, map[string]interface{}{
		"input": types.VerifyAuthenticationTokenInput{Token: token, Secret: secret},
	})

	require.NoError(t, err, "no error for verifying authentication token")

	return redeemCookie
}

type GrantAccountAccessWithAuthenticationToken struct {
	GrantAccountAccessWithAuthenticationToken *struct {
		Account struct {
			Username string
		}
		Validation *types.GrantAccountAccessWithAuthenticationTokenValidation
	} `graphql:"grantAccountAccessWithAuthenticationToken(input: $input)"`
}

func grantAccountAccessWithAuthenticationToken(t *testing.T, client *graphql.Client, token string) GrantAccountAccessWithAuthenticationToken {
	var redeemCookie GrantAccountAccessWithAuthenticationToken

	err := client.Mutate(context.Background(), &redeemCookie, map[string]interface{}{
		"input": types.GrantAccountAccessWithAuthenticationTokenInput{Token: token},
	})

	require.NoError(t, err)

	return redeemCookie
}

// helper function - basically runs the "authentication" flow - run authenticate mutation, grab cookie from jar, and redeem the cookie
func authenticateAndVerifyToken(t *testing.T, email string) (VerifyAuthenticationToken, *graphql.Client, *passport.Pocket) {

	client, pass := getHttpClient(t)

	authenticate := grantAuthenticationToken(t, client, email)

	require.NotNil(t, authenticate.GrantAuthenticationToken.AuthenticationToken)

	token, sec := getAuthTokenAndSecretFromEmail(t, email)

	ck := verifyAuthenticationToken(t, client, token, sec)

	// make sure cookie is valid
	require.NotNil(t, ck.VerifyAuthenticationToken)

	return ck, client, pass
}

type ViewAuthenticationToken struct {
	ViewAuthenticationToken *types.AuthenticationToken `graphql:"viewAuthenticationToken(token: $token)"`
}

func viewAuthenticationToken(t *testing.T, client *graphql.Client, token string) ViewAuthenticationToken {
	var authRedeemed ViewAuthenticationToken

	err := client.Query(context.Background(), &authRedeemed, map[string]interface{}{
		"token": graphql.String(token),
	})

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

type TestAccount struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

func newTestAccount(t *testing.T) *account.Account {
	fake := TestAccount{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	usr, err := account.NewAccount(uuid.New().String(), fake.Username, fake.Email)

	require.NoError(t, err)

	return usr
}

// helper which creates fake account in the repository so tests can be more predictable
func seedNormalAccount(t *testing.T) *account.Account {
	usr := newTestAccount(t)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewAccountCassandraRedisRepository(session)
	err := adapter.CreateAccount(context.Background(), usr)
	require.NoError(t, err)
	return usr
}

func seedMfaAccount(t *testing.T) *account.Account {
	usr := newTestAccount(t)

	err := usr.EnableMultiFactor()
	require.NoError(t, err)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewAccountCassandraRedisRepository(session)
	err = adapter.CreateAccount(context.Background(), usr)
	require.NoError(t, err)
	return usr
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Account{}, accountId))))
}

func getAuthTokenAndSecretFromEmail(t *testing.T, email string) (string, string) {
	token, secret, err := GetAuthTokenAndSecretFromEmail(email)
	require.NoError(t, err)
	return token, secret
}

func getWorkflowEnvironment() *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	env.RegisterActivity(application.App.Activities)

	return env
}

func getHttpClientWithAuthenticatedAccount(t *testing.T, account string) (*graphql.Client, *passport.Pocket) {

	client, transport := passport.NewHTTPTestClientWithPassport(&account)

	return graphql.NewClient(EvaHttpClientAddr, client), transport
}

func getHttpClient(t *testing.T) (*graphql.Client, *passport.Pocket) {

	client, transport := passport.NewHTTPTestClientWithPassport(nil)

	return graphql.NewClient(EvaHttpClientAddr, client), transport
}

func getGrpcClientWithAuthenticatedAccount(t *testing.T, account string) (eva.EvaClient, context.Context) {

	// use a testing utility from passport to add passport to the context
	conn, ctx, err := passport.NewGrpcTestClientConnection(context.Background(), EvaGrpcClientAddr, &account)
	require.NoError(t, err)

	return eva.NewEvaClient(conn), ctx
}

func getGrpcClient(t *testing.T) (eva.EvaClient, context.Context) {

	// use a testing utility from passport to add passport to the context
	conn, ctx, err := passport.NewGrpcTestClientConnection(context.Background(), EvaGrpcClientAddr, nil)
	require.NoError(t, err)

	return eva.NewEvaClient(conn), ctx
}

func startService() bool {
	config.Read("applications/eva")

	app := service.NewComponentTestApplication(context.Background())

	mockServices(app)

	srv := ports.NewHttpServer(app.App)

	go bootstrap.InitializeHttpServer(EvaHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(EvaHttpAddr)
	if !ok {
		log.Println("Timed out waiting for eva HTTP to come up")
		return false
	}
	s := ports.NewGrpcServer(app.App)

	go bootstrap.InitializeGRPCServer(EvaGrpcAddr, func(server *grpc.Server) {
		eva.RegisterEvaServer(server, s)
	})

	ok = testing_tools.WaitForPort(EvaGrpcAddr)

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
