package service_test

import (
	"context"
	"encoding/base64"
	"github.com/shurcooL/graphql"
	"go.temporal.io/sdk/mocks"
	"go.temporal.io/sdk/testsuite"
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

var (
	temporalClientMock *mocks.Client
)

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(HadesGraphqlClientAddr, client)
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Account{}, accountId))))
}

func convertClubIdIdToRelayId(clubId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, clubId))))
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	newApp, _, _ := service.NewComponentTestApplication(context.Background())
	env.RegisterActivity(newApp.Activities)

	return env
}

func startService() bool {
	config.Read("applications/hades")

	application, _, temporalClient := service.NewComponentTestApplication(context.Background())

	temporalClientMock = temporalClient

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
