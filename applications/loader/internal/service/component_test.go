package service_test

import (
	"context"
	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/shurcooL/graphql"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"log"
	"os"
	"overdoll/applications/loader/internal/ports"
	"overdoll/applications/loader/internal/service"
	loader "overdoll/applications/loader/proto"

	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
	"testing"
)

const LoaderHttpAddr = ":3333"
const LoaderGraphqlClientAddr = "http://:3333/api/graphql"
const LoaderTusClientAddr = "http://:3333/api/upload/"

const LoaderGrpcAddr = "localhost:3334"
const LoaderGrpcClientAddr = "localhost:3334"

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(LoaderGraphqlClientAddr, client)
}

func getGraphqlClient(t *testing.T) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil)

	return graphql.NewClient(LoaderGraphqlClientAddr, client)
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), LoaderGrpcClientAddr)

	return stingClient
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	newApp, _ := service.NewApplication(context.Background())
	env.RegisterActivity(newApp.Activities)

	return env
}

func startService() bool {
	config.Read("applications/loader")

	application, _ := service.NewApplication(context.Background())

	client := clients.NewTemporalClient(context.Background())

	srv := ports.NewHttpServer(&application, client)

	go bootstrap.InitializeHttpServer(LoaderHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(LoaderHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application, client)

	go bootstrap.InitializeGRPCServer(LoaderGrpcAddr, func(server *grpc.Server) {
		loader.RegisterLoaderServer(server, s)
	})

	ok = testing_tools.WaitForPort(LoaderGrpcAddr)

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
