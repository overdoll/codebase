package service_test

import (
	"context"
	"encoding/base64"
	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"log"
	"os"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/ports"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/applications/stella/internal/service"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/testing_tools"
	"testing"
)

type TestClub struct {
	Name string `faker:"title_male"`
	Slug string `faker:"username"`
}

func newPrincipal(t *testing.T) *principal.Principal {
	return principal.NewPrincipal("1q7MJ3JkhcdcJJNqZezdfQt5pZ6", nil, false, false)
}

func newClub(t *testing.T) *club.Club {

	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err)

	clb, err := club.NewClub(newPrincipal(t), fake.Slug, fake.Name)
	require.NoError(t, err)

	return clb
}

// helper which seeds a new post in the database
func seedClub(t *testing.T) *club.Club {
	pst := newClub(t)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewClubCassandraRepository(session)
	err := adapter.CreateClub(context.Background(), newPrincipal(t), pst)
	require.NoError(t, err)
	return pst
}

const StingHttpAddr = ":6666"
const StingGraphqlClientAddr = "http://:6666/api/graphql"
const StingTusClientAddr = "http://:6666/api/upload/"

const StingGrpcAddr = "localhost:6667"
const StingGrpcClientAddr = "localhost:6667"

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

func getGraphqlClient(t *testing.T) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

func newFakeAccount(t *testing.T) string {
	return uuid.New().String()
}

func convertClubIdToRelayId(clubId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, clubId))))
}

func convertPostIdToRelayId(postId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Post{}, postId))))
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	newApp, _ := service.NewApplication(context.Background())
	env.RegisterActivity(newApp.Activities)

	return env
}

func startService() bool {
	config.Read("applications/sting")

	application, _ := service.NewComponentTestApplication(context.Background())

	client := clients.NewTemporalClient(context.Background())

	srv := ports.NewHttpServer(&application, client)

	go bootstrap.InitializeHttpServer(StingHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(StingHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application, client)

	go bootstrap.InitializeGRPCServer(StingGrpcAddr, func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})

	ok = testing_tools.WaitForPort(StingGrpcAddr)

	if !ok {
		log.Println("timed out waiting for sting GRPC to come up")
		return false
	}

	// pre-install webp so that our workflows dont have to
	if err := webpbin.NewCWebP().BinWrapper.Run(); err != nil {
		log.Printf("could not install webp: %v", err)
		return false
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
