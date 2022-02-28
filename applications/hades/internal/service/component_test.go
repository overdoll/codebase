package service_test

import (
	"context"
	"encoding/base64"
	"github.com/shurcooL/graphql"
	"log"
	"os"
	"overdoll/applications/hades/internal/ports"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/applications/hades/internal/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
	"testing"
)

const HadesHttpAddr = ":6666"
const HadesHttpCCBillWebhookAddr = "http://:6666/api/ccbill/webhook"
const HadesHttpCCBillPaymentFlowAddr = "http://:6666/api/ccbill/payment-flow"
const HadesHttpCCBillPaymentFlowCallbackAddr = "http://:6666/api/ccbill/payment-flow/callback"

const HadesGraphqlClientAddr = "http://:6666/api/graphql"

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(HadesGraphqlClientAddr, client)
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Account{}, accountId))))
}

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
