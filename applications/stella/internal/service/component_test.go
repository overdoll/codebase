package service_test

import (
	"context"
	"encoding/base64"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"log"
	"os"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/ports"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/applications/stella/internal/service"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

const StellaHttpAddr = ":2222"
const StellaGraphqlClientAddr = "http://:2222/api/graphql"

const StellaGrpcAddr = "localhost:2223"
const StellaGrpcClientAddr = "localhost:2223"

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(StellaGraphqlClientAddr, client)
}

func getGrpcClient(t *testing.T) stella.StellaClient {

	stellaClient, _ := clients.NewStellaClient(context.Background(), StellaGrpcClientAddr)

	return stellaClient
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	app := service.NewComponentTestApplication(context.Background())
	env.RegisterActivity(app.App.Activities)

	return env
}

type TestClub struct {
	Name string `faker:"title_male"`
	Slug string `faker:"username"`
}

func newPrincipal(t *testing.T, accountId string) *principal.Principal {
	return testing_tools.NewArtistPrincipal(accountId)
}

func newClub(t *testing.T, accountId string) *club.Club {

	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err)

	clb, err := club.NewClub(newPrincipal(t, accountId), fake.Slug, fake.Name, 0)
	require.NoError(t, err)

	return clb
}

func refreshClubESIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.ClubsIndexName).Do(context.Background())
	require.NoError(t, err)
}

func refreshClubMembersESIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.ClubMembersIndexName).Do(context.Background())
	require.NoError(t, err)
}

// helper which seeds a new post in the database
func seedClub(t *testing.T, accountId string) *club.Club {
	pst := newClub(t, accountId)

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()

	adapter := adapters.NewClubCassandraElasticsearchRepository(session, es)
	err := adapter.CreateClub(context.Background(), pst)
	require.NoError(t, err)
	return pst
}

func newFakeAccount(t *testing.T) string {
	return uuid.New().String()
}

func convertClubIdToRelayId(clubId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, clubId))))
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Account{}, accountId))))
}

func startService() bool {
	config.Read("applications/stella")

	app := service.NewComponentTestApplication(context.Background())

	client := clients.NewTemporalClient(context.Background())

	srv := ports.NewHttpServer(&app.App)

	go bootstrap.InitializeHttpServer(StellaHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(StellaHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&app.App, client)

	go bootstrap.InitializeGRPCServer(StellaGrpcAddr, func(server *grpc.Server) {
		stella.RegisterStellaServer(server, s)
	})

	ok = testing_tools.WaitForPort(StellaGrpcAddr)

	if !ok {
		log.Println("timed out waiting for sting GRPC to come up")
		return false
	}

	mockServices(app)

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
