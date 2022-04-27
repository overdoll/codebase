package service_test

import (
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_Chargeback(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillChargeback, mock.Anything)

	// run webhook - cancellation
	runWebhookAction(t, "Chargeback", map[string]string{
		"accountingCurrency":     "USD",
		"accountingCurrencyCode": "840",
		"accountingAmount":       "6.99",
		"currency":               "USD",
		"currencyCode":           "840",
		"amount":                 "6.99",
		"bin":                    "411111",
		"cardType":               "VISA",
		"expDate":                "0423",
		"last4":                  "1111",
		"reason":                 "IDK LOL",
		"timestamp":              "2022-02-26 20:18:00",
		"subscriptionId":         ccbillSubscriptionId,
		"transactionId":          ccbillTransactionId,
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	transactions := getAccountTransactions(t, gqlClient, accountId)

	require.Len(t, transactions.Entities[0].Account.Transactions.Edges, 1, "1 transaction item")
	transaction := transactions.Entities[0].Account.Transactions.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypeChargeback, transaction.Type, "correct transaction type")
	require.Equal(t, 1, transactions.Entities[0].Account.TransactionsChargebackCount, 1, "correct chargeback count")
	require.Equal(t, 0, transactions.Entities[0].Account.TransactionsPaymentCount, "correct payment count")

	require.Len(t, transaction.Events, 1, "should have 1 event")

	event := transaction.Events[0]

	require.Equal(t, "2022-02-27 03:18:00 +0000 UTC", event.Timestamp.String(), "correct timestamp")
	require.Equal(t, 699, event.Amount, "correct amount")
	require.Equal(t, graphql.CurrencyUsd, event.Currency, "correct currency")
	require.Equal(t, "IDK LOL", event.Reason, "correct reason")
}
