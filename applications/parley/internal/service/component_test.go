package service_test

import (
	"context"
	"encoding/base64"
	"log"
	"os"
	"testing"

	"github.com/segmentio/ksuid"
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
const ParleyHttpClientAddr = "http://:8888/graphql"

const ParleyGrpcAddr = "localhost:8889"
const ParleyGrpcClientAddr = "localhost:8889"

func getHttpClient(t *testing.T, pass *passport.Passport) *graphql.Client {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(ParleyHttpClientAddr, client)
}

func getGrpcClient(t *testing.T) parley.ParleyClient {

	parleyClient, _ := clients.NewParleyClient(context.Background(), ParleyGrpcClientAddr)

	return parleyClient
}

func getRandomPostId() string {
	return base64.StdEncoding.EncodeToString([]byte("Post:" + ksuid.New().String()))
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
