package service_test

import (
	"context"
	"encoding/base64"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"log"
	"os"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/applications/hades/internal/service"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
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

const HadesGrpcAddr = "localhost:6247"
const HadesGrpcClientAddr = "localhost:6247"

const HadesGraphqlClientAddr = "http://:6666/api/graphql"

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

func convertClubMemberIdIdToRelayId(clubId, accountId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.ClubMember{}, clubId, accountId))))
}

func refreshSubscriptionsIndex(t *testing.T) {

	// refresh transactions index so we get the most up-to-date values
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.SubscriptionsIndexName).Do(context.Background())
	require.NoError(t, err)
}

func getWorkflowEnvironment() *testsuite.TestWorkflowEnvironment {

	suite := new(testsuite.WorkflowTestSuite)
	suite.SetLogger(testing_tools.NewDefaultTestWorkflowLogger())
	env := suite.NewTestWorkflowEnvironment()
	env.RegisterActivity(application.App.Activities)
	env.RegisterWorkflow(workflows.ClubTransactionMetric)

	return env
}

func getGrpcClient(t *testing.T) hades.HadesClient {

	hadesClient, _ := clients.NewHadesClient(context.Background(), HadesGrpcClientAddr)

	return hadesClient
}

func startService() bool {
	config.Read("applications/hades")

	app := service.NewComponentTestApplication(context.Background())

	mockServices(app)

	srv := ports.NewHttpServer(app.App)

	go bootstrap.InitializeHttpServer(HadesHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(HadesHttpAddr)
	if !ok {
		log.Println("timed out waiting for hades HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(app.App)

	go bootstrap.InitializeGRPCServer(HadesGrpcAddr, func(server *grpc.Server) {
		hades.RegisterHadesServer(server, s)
	})

	ok = testing_tools.WaitForPort(HadesGrpcAddr)

	if !ok {
		log.Println("timed out waiting for hades GRPC to come up")
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
