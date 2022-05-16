package service_test

import (
	"context"
	"log"
	"os"
	"overdoll/applications/carrier/internal/ports"
	"overdoll/applications/carrier/internal/service"
	carrier "overdoll/applications/carrier/proto"
	"testing"

	"google.golang.org/grpc"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/testing_tools"
)

const CarrierGrpcAddress = "localhost:9998"

func getGrpcClient() carrier.CarrierClient {

	grpcAddress, _ := clients.NewCarrierClient(context.Background(), CarrierGrpcAddress)

	return grpcAddress
}

func startService() bool {
	// config file location (specified in BUILD file) will be absolute from repository path
	config.Read("applications/carrier")

	app := service.NewComponentTestApplication(context.Background())

	srv := ports.NewGrpcServer(&app.App)

	go bootstrap.InitializeGRPCServer(CarrierGrpcAddress, func(server *grpc.Server) {
		carrier.RegisterCarrierServer(server, srv)
	})

	ok := testing_tools.WaitForPort(CarrierGrpcAddress)

	if !ok {
		log.Println("Timed out waiting for carrier GRPC to come up")
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
