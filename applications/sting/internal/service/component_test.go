package service_test

import (
	"context"
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"overdoll/applications/sting/internal/ports"
	"overdoll/applications/sting/internal/service"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const customCharacterName = "test"
const customMediaName = "asdasd"

const StingHttpAddr = ":6666"
const StingHttpClientAddr = "http://:6666/graphql"

const StingGrpcAddr = "localhost:6667"
const StingGrpcClientAddr = "localhost:6667"

func getHttpClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client) {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(StingHttpClientAddr, client), client
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()

	newApp, _ := service.NewApplication(context.Background())
	env.RegisterActivity(&newApp.Activities)

	return env
}

func startService() bool {
	config.Read("applications/sting")

	application, _ := service.NewApplication(context.Background())

	client := clients.NewTemporalClient(context.Background())

	srv := ports.NewHttpServer(&application, client)

	go bootstrap.InitializeHttpServer(StingHttpAddr, srv, func() {})

	ok := tests.WaitForPort(StingHttpAddr)
	if !ok {
		log.Println("Timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application, client)

	go bootstrap.InitializeGRPCServer(StingGrpcAddr, func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})

	ok = tests.WaitForPort(StingGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for sting GRPC to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
