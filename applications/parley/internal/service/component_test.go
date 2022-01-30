package service_test

import (
	"context"
	"encoding/base64"
	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/require"
	"log"
	"os"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/principal"
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
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Rule{}, ruleId))))
}

func convertClubIdToRelayId(ruleId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, ruleId))))
}

func convertPostIdToRelayId(postId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Post{}, postId))))
}

func createRule(t *testing.T, infraction bool) *rule.Rule {
	fake := TestRule{}
	err := faker.FakeData(&fake)

	pst, err := rule.NewRule(principal.NewPrincipal("1q7MJ5IyRTV0X4J27F3m5wGD5mj", []string{"staff"}, false, false), fake.Title, fake.Description, infraction)
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

func seedRule(t *testing.T) *rule.Rule {
	pst := createRule(t, false)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewRuleCassandraRepository(session)
	err := adapter.CreateRule(context.Background(), pst)
	require.NoError(t, err)

	return pst
}

func getHttpClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(ParleyHttpClientAddr, client)
}

func getGrpcClient(t *testing.T) parley.ParleyClient {

	parleyClient, _ := clients.NewParleyClient(context.Background(), ParleyGrpcClientAddr)

	return parleyClient
}

func startService() bool {
	config.Read("applications/parley")

	application, _ := service.NewComponentTestApplication(context.Background())

	srv := ports.NewHttpServer(&application)

	go bootstrap.InitializeHttpServer(ParleyHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(ParleyHttpAddr)
	if !ok {
		log.Println("Timed out waiting for parley HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application)

	go bootstrap.InitializeGRPCServer(ParleyGrpcAddr, func(server *grpc.Server) {
		parley.RegisterParleyServer(server, s)
	})

	ok = testing_tools.WaitForPort(ParleyGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for parley GRPC to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
