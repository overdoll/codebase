package service_test

import (
	"context"
	"log"
	"os"
	"overdoll/applications/hades/internal/ports"
	"overdoll/applications/hades/internal/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"overdoll/libraries/testing_tools"
	"testing"
)

const HadesHttpAddr = ":6666"
const HadesHttpCCBillWebhookAddr = "http://:6666/api/ccbill/webhook"

const HadesGraphqlClientAddr = "http://:6666/api/graphql"

func startService() bool {
	config.Read("applications/hades")

	application, _ := service.NewComponentTestApplication(context.Background())

	srv := ports.NewHttpServer(&application)

	bootstrap.InitializeHttpServer(HadesHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(HadesHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
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
