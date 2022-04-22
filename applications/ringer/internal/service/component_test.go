package service_test

import (
	"context"
	"encoding/base64"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"log"
	"os"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/applications/ringer/internal/ports"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/applications/ringer/internal/service"
	ringer "overdoll/applications/ringer/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/money"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
	"testing"
	"time"
)

const RingerHttpAddr = ":6556"

const RingerGraphqlClientAddr = "http://:6556/api/graphql"

const RingerGrpcAddr = "localhost:7278"
const RingerGrpcClientAddr = "localhost:7278"

var (
	temporalClientMock *mocks.Client
)

type _Any map[string]interface{}

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(RingerGraphqlClientAddr, client)
}

func getGrpcClient(t *testing.T) ringer.RingerClient {

	// use a testing utility from passport to add passport to the context
	conn, _, err := passport.NewGrpcTestClientConnection(context.Background(), RingerGrpcClientAddr, nil)
	require.NoError(t, err)

	return ringer.NewRingerClient(conn)
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	newApp, _, _ := service.NewComponentTestApplication(context.Background())
	env.RegisterActivity(newApp.Activities)

	return env
}

func convertCountryIdToRelayId(countryId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Country{}, countryId))))
}

func convertClubIdToRelayId(ruleId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, ruleId))))
}

func convertPayoutIdToRelayId(ruleId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.ClubPayout{}, ruleId))))
}

func convertAccountIdToRelayId(ruleId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Account{}, ruleId))))
}

func seedPayment(t *testing.T, accountTransactionId, destinationClubId, sourceAccountId string) {
	env := getWorkflowEnvironment(t)

	env.RegisterWorkflow(workflows.ClubPaymentDeposit)
	env.RegisterWorkflow(workflows.GenerateClubMonthlyPayout)
	// mock out this generate club monthly payout workflow
	env.OnWorkflow(workflows.GenerateClubMonthlyPayout, mock.Anything, mock.Anything).Return(nil)
	env.SetDetachedChildWait(false)

	env.ExecuteWorkflow(workflows.ClubPaymentDeposit, workflows.ClubPaymentDepositInput{
		AccountTransactionId:        accountTransactionId,
		SourceAccountId:             sourceAccountId,
		DestinationClubId:           destinationClubId,
		Amount:                      1000,
		Currency:                    money.USD,
		Timestamp:                   time.Now(),
		IsClubSupporterSubscription: true,
	})

	require.True(t, env.IsWorkflowCompleted(), "payment successfully seeded")
	require.NoError(t, env.GetWorkflowError(), "payment seeded without errors")
}

func cleanupDepositRequests(t *testing.T) {
	session := bootstrap.InitializeDatabaseSession()
	err := session.Query("TRUNCATE deposit_requests", nil).ExecRelease()
	require.NoError(t, err)
	err = session.Query("TRUNCATE deposit_requests_by_month", nil).ExecRelease()
	require.NoError(t, err)
}

func setupPayoutMethodForAccount(t *testing.T, accountId, email string) {
	session := bootstrap.InitializeDatabaseSession()

	detailsRepo := adapters.NewDetailsCassandraRepository(session)
	_, err := detailsRepo.UpdateAccountDetails(context.Background(), testing_tools.NewStaffPrincipal(accountId), accountId, func(id *details.AccountDetails) error {
		id.UpdateFirstName("test")
		id.UpdateLastName("test")
		id.UpdateCountry("USA")
		return nil
	})
	require.NoError(t, err)

	adapter := adapters.NewPayoutCassandraRepository(session, service.StellaServiceMock{})

	pay, err := payout.NewPaxumAccountPayoutMethod(accountId, email)
	require.NoError(t, err)

	err = adapter.UpdateAccountPayoutMethod(context.Background(), pay)
	require.NoError(t, err)
}

type ClubBalances struct {
	Entities []struct {
		Club struct {
			ID             string
			PendingBalance types.Balance `graphql:"pendingBalance()"`
			Balance        types.Balance `graphql:"balance()"`
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

func getClubBalances(t *testing.T, client *graphql.Client, clubId string) ClubBalances {

	var pays ClubBalances

	err := client.Query(context.Background(), &pays, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         string(convertClubIdToRelayId(clubId)),
			},
		},
	})

	require.NoError(t, err)

	return pays
}

func refreshPayoutsIndex(t *testing.T) {

	// refresh transactions index so we get the most up-to-date values
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.ClubPayoutsIndexName).Do(context.Background())
	require.NoError(t, err)
}

func refreshPaymentsIndex(t *testing.T) {

	// refresh transactions index so we get the most up-to-date values
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.ClubPaymentsIndexName).Do(context.Background())
	require.NoError(t, err)
}

func startService() bool {
	config.Read("applications/ringer")

	app, _, temporalClient := service.NewComponentTestApplication(context.Background())

	temporalClientMock = temporalClient

	srv := ports.NewHttpServer(&app)

	go bootstrap.InitializeHttpServer(RingerHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(RingerHttpAddr)
	if !ok {
		log.Println("Timed out waiting for eva HTTP to come up")
		return false
	}
	s := ports.NewGrpcServer(&app)

	go bootstrap.InitializeGRPCServer(RingerGrpcAddr, func(server *grpc.Server) {
		ringer.RegisterRingerServer(server, s)
	})

	ok = testing_tools.WaitForPort(RingerGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for eva GRPC to come up")
	}

	return true
}

func TestMain(m *testing.M) {

	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}