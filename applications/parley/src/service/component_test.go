package service_test

import (
	"context"
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"google.golang.org/grpc"
	parley "overdoll/applications/parley/proto"
	"overdoll/applications/parley/src/ports"
	"overdoll/applications/parley/src/service"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const ParleyHttpAddr = ":8888"
const ParleyHttpClientAddr = "http://:8888/graphql"

const ParleyGrpcAddr = "localhost:8889"
const ParleyGrpcClientAddr = "localhost:8889"

func getHttpClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client) {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(ParleyHttpClientAddr, client), client
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), ParleyGrpcClientAddr)

	return stingClient
}

func startService() bool {
	config.Read("applications/sting/config.toml")

	application, _ := service.NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&application)

	go bootstrap.InitializeHttpServer(ParleyHttpAddr, srv, func() {})

	ok := tests.WaitForPort(ParleyHttpAddr)
	if !ok {
		log.Println("Timed out waiting for parley HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application)

	go bootstrap.InitializeGRPCServer(ParleyGrpcAddr, func(server *grpc.Server) {
		parley.RegisterParleyServer(server, s)
	})

	ok = tests.WaitForPort(ParleyGrpcAddr)

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
