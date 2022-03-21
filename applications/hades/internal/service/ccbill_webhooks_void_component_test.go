package service_test

import (
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_Void(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillVoid, mock.Anything)

	// run webhook - cancellation
	runWebhookAction(t, "Void", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"reason":         "Income issues",
		"source":         "webAdmin",
		"subscriptionId": ccbillSubscriptionId,
		"transactionId":  ccbillTransactionId,
		"timestamp":      "2022-02-26 20:18:00",
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	accountTransactionsVoid := getAccountTransactions(t, gqlClient, accountId)

	require.Len(t, accountTransactionsVoid.Entities[0].Account.Transactions.Edges, 1, "1 transaction item")
	transaction := accountTransactionsVoid.Entities[0].Account.Transactions.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypeVoid, transaction.Type, "correct transaction type")
	require.Equal(t, "2022-02-26 15:21:49 +0000 UTC", transaction.Timestamp.String(), "correct timestamp")
}