package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"log"
	"os"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"testing"

	"github.com/shurcooL/graphql"
	"google.golang.org/grpc"
	"overdoll/applications/parley/internal/ports"
	"overdoll/applications/parley/internal/service"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
)

const ParleyHttpAddr = ":8888"
const ParleyHttpClientAddr = "http://:8888/api/graphql"

const ParleyGrpcAddr = "localhost:8889"
const ParleyGrpcClientAddr = "localhost:8889"

type _Any map[string]interface{}

type TestRule struct {
	Title       string `faker:"username"`
	Description string `faker:"username"`
}

func convertRuleIdToRelayId(ruleId string) relay.ID {
	return relay.ID(relay.MarshalRelayId(relay.NewID(types.Rule{}, ruleId)))
}

func convertClubIdToRelayId(ruleId string) relay.ID {
	return relay.ID(relay.MarshalRelayId(relay.NewID(types.Club{}, ruleId)))
}

func convertPostIdToRelayId(postId string) relay.ID {
	return relay.ID(relay.MarshalRelayId(relay.NewID(types.Post{}, postId)))
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(relay.MarshalRelayId(relay.NewID(types.Account{}, accountId)))
}

func createRule(t *testing.T, infraction bool) *rule.Rule {
	fake := TestRule{}
	err := faker.FakeData(&fake)

	pst, err := rule.NewRule(testing_tools.NewStaffPrincipal("1q7MJ5IyRTV0X4J27F3m5wGD5mj"), fake.Title, fake.Description, infraction)
	require.NoError(t, err)

	return pst
}

func seedRuleInfraction(t *testing.T) *rule.Rule {
	pst := createRule(t, true)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewRuleCassandraRepository(session)
	err := adapter.CreateRule(context.Background(), pst)
	require.NoError(t, err)

	return pst
}

func clearModeratorsTableAndSeedModerator(t *testing.T, accountId string) {
	session := bootstrap.InitializeDatabaseSession()
	err := session.Query("TRUNCATE moderators", nil).ExecRelease()
	require.NoError(t, err)

	m, err := moderator.NewModerator(testing_tools.NewModeratorPrincipal(accountId), accountId)
	require.NoError(t, err)
	adapter := adapters.NewModeratorCassandraRepository(session, bootstrap.InitializeRedisSession())
	err = adapter.CreateModerator(context.Background(), m)
}

func seedPostModerator(t *testing.T, accountId, postId string) *moderator.PostModerator {
	pst, err := moderator.NewPostModerator(accountId, postId)
	require.NoError(t, err)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewModeratorCassandraRepository(session, bootstrap.InitializeRedisSession())
	err = adapter.CreatePostModerator(context.Background(), pst)
	require.NoError(t, err)

	return pst
}

func seedRule(t *testing.T, infraction bool) *rule.Rule {
	pst := createRule(t, infraction)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewRuleCassandraRepository(session)
	err := adapter.CreateRule(context.Background(), pst)
	require.NoError(t, err)

	return pst
}

func refreshReportsIndex(t *testing.T) {

	// refresh transactions index so we get the most up-to-date values
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.PostReportsReaderIndex).Do(context.Background())
	require.NoError(t, err)
}

func getWorkflowEnvironment() *testsuite.TestWorkflowEnvironment {

	suite := new(testsuite.WorkflowTestSuite)
	suite.SetLogger(testing_tools.NewDefaultTestWorkflowLogger())
	env := suite.NewTestWorkflowEnvironment()

	env.RegisterActivity(application.App.Activities)

	return env
}

func getHttpClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId, nil)

	return graphql.NewClient(ParleyHttpClientAddr, client)
}

func getGrpcClient(t *testing.T) parley.ParleyClient {

	parleyClient, _ := clients.NewParleyClient(context.Background(), ParleyGrpcClientAddr)

	return parleyClient
}

func startService() bool {
	config.Read("applications/parley")

	app := service.NewComponentTestApplication(context.Background())

	srv := ports.NewHttpServer(app.App)

	go bootstrap.InitializeHttpServer(ParleyHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(ParleyHttpAddr)
	if !ok {
		log.Println("Timed out waiting for parley HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(app.App)

	go bootstrap.InitializeGRPCServer(ParleyGrpcAddr, func(server *grpc.Server) {
		parley.RegisterParleyServer(server, s)
	})

	ok = testing_tools.WaitForPort(ParleyGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for parley GRPC to come up")
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
