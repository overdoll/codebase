package service_test

import (
	"context"
	"encoding/base64"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

type GenerateClubSupporterRefundReceiptFromAccountTransaction struct {
	GenerateClubSupporterRefundReceiptFromAccountTransaction *types.GenerateClubSupporterRefundReceiptFromAccountTransactionPayload `graphql:"generateClubSupporterRefundReceiptFromAccountTransaction(input: $input)"`
}

type AccountTransaction struct {
	AccountTransaction *struct {
		Id string
	} `graphql:"accountTransaction(reference: $reference)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_Refund(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillRefund, mock.Anything)

	// run webhook - cancellation
	runWebhookAction(t, "Refund", map[string]string{
		"accountingAmount":       "6.99",
		"accountingCurrency":     "USD",
		"accountingCurrencyCode": "840",
		"amount":                 "6.99",
		"cardType":               "VISA",
		"clientAccnum":           "951492",
		"clientSubacc":           "0101",
		"currency":               "USD",
		"currencyCode":           "840",
		"expDate":                "0123",
		"last4":                  "1111",
		"paymentAccount":         "693a3b8d0d888c3d04800000004bacd",
		"paymentType":            "CREDIT",
		"reason":                 "Refunded through Data Link: subscriptionManagement.cgi",
		"subscriptionId":         ccbillSubscriptionId,
		"transactionId":          ccbillTransactionId,
		"timestamp":              "2022-02-28 20:27:56",
	})

	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.ClubTransactionMetric)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	metrics := getClubTransactionMetrics(t, gqlClient, clubId)

	require.Equal(t, 1, metrics.TotalTransactionsCount, "should have 1 transaction count")
	require.Equal(t, 699, metrics.TotalTransactionsAmount, "should have 1 transaction count")
	require.Equal(t, graphql1.CurrencyUsd, metrics.Currency, "should have 1 transaction count")

	require.Equal(t, 699, metrics.RefundsAmount, "should have 1 refunds amount")
	require.Equal(t, 1, metrics.RefundsCount, "should have 1 refunds count")
	require.Equal(t, float64(1), metrics.RefundsCountRatio, "should have correct refunds ratio")
	require.Equal(t, float64(1), metrics.RefundsAmountRatio, "should have correct refunds amount")

	accountTransactionsRefund := getAccountTransactions(t, gqlClient, accountId)

	require.Len(t, accountTransactionsRefund.Entities[0].Account.Transactions.Edges, 1, "1 transaction items")
	transaction := accountTransactionsRefund.Entities[0].Account.Transactions.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypeRefund, transaction.Type, "correct transaction type")
	require.Equal(t, 1, accountTransactionsRefund.Entities[0].Account.TransactionsRefundCount, "correct refund count")
	require.Equal(t, 0, accountTransactionsRefund.Entities[0].Account.TransactionsPaymentCount, "correct payment count")

	require.Len(t, transaction.Events, 1, "should have 1 event")

	event := transaction.Events[0]

	require.Equal(t, "2022-03-01 03:27:56 +0000 UTC", event.CreatedAt.String(), "correct timestamp")
	require.Equal(t, 699, event.Amount, "correct amount")
	require.Equal(t, graphql1.CurrencyUsd, event.Currency, "correct currency")
	require.Equal(t, "Refunded through Data Link: subscriptionManagement.cgi", event.Reason, "correct reason")

	sDec, _ := base64.StdEncoding.DecodeString(event.ID.GetID())
	eventId := relay.ID(sDec).GetID()

	// look up a single transaction
	var accountTransaction AccountTransaction

	err := gqlClient.Query(context.Background(), &accountTransaction, map[string]interface{}{
		"reference": graphql.String(transaction.Reference),
	})

	require.NoError(t, err, "no error looking up transaction")
	require.NotNil(t, accountTransaction.AccountTransaction, "account transaction history should exist")

	receiptWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.GenerateClubSupporterRefundReceiptFromAccountTransaction, mock.Anything)

	flowRun := &mocks.WorkflowRun{}

	flowRun.
		On("Get", mock.Anything, mock.Anything).
		Return(nil)

	temporalClientMock.
		On("GetWorkflow", mock.Anything, "ClubSupporterRefundReceipt_"+transaction.Reference+"-"+eventId, mock.Anything).
		// on GetWorkflow command, this would check if the workflow was completed
		// so we run our workflow to make sure it's completed
		Run(
			func(args mock.Arguments) {
				env = getWorkflowEnvironment(t)
				receiptWorkflowExecution.FindAndExecuteWorkflow(t, env)
				require.True(t, env.IsWorkflowCompleted())
				require.NoError(t, env.GetWorkflowError())
			},
		).
		Return(flowRun)

	var generateReceipt GenerateClubSupporterRefundReceiptFromAccountTransaction

	err = gqlClient.Mutate(context.Background(), &generateReceipt, map[string]interface{}{
		"input": types.GenerateClubSupporterRefundReceiptFromAccountTransactionInput{
			TransactionID:      transaction.Id,
			TransactionEventID: transaction.Events[0].ID,
		},
	})

	require.NoError(t, err, "no error generating a refund receipt from transaction")

	fileUrl := generateReceipt.GenerateClubSupporterRefundReceiptFromAccountTransaction.Link.String()
	require.True(t, testing_tools.FileExists(fileUrl), "file should exist")
}
