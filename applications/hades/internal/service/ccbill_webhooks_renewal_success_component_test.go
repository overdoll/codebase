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
func TestBillingFlow_RenewalSuccess(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillRenewalSuccess, mock.Anything)

	newTransactionId := uuid.New().String()

	// run webhook - cancellation
	runWebhookAction(t, "RenewalSuccess", map[string]string{
		"accountingCurrency":     "USD",
		"accountingCurrencyCode": "840",
		"accountingAmount":       "6.99",
		"billedCurrency":         "USD",
		"billedCurrencyCode":     "840",
		"billedAmount":           "6.99",
		"bin":                    "411111",
		"cardType":               "VISA",
		"clientAccnum":           "951492",
		"clientSubacc":           "0101",
		"expDate":                "0423",
		"last4":                  "1111",
		"renewalDate":            "2021-03-28",
		"nextRenewalDate":        "2024-03-28",
		"paymentType":            "CREDIT",
		"timestamp":              "2022-02-28 08:21:49",
		"subscriptionId":         ccbillSubscriptionId,
		"transactionId":          newTransactionId,
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getActiveAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges, 1, "1 subscription exists")
	subscription := subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges[0].Node.Item

	require.Equal(t, graphql.CurrencyUsd, subscription.BillingCurrency, "USD currency is used")
	require.Equal(t, 699, subscription.BillingAmount, "correct billing amount")
	require.Equal(t, "2024-03-28", subscription.NextBillingDate, "correct next billing date")

	accountTransactionsInvoice := getAccountTransactions(t, gqlClient, accountId)

	require.Len(t, accountTransactionsInvoice.Entities[0].Account.Transactions.Edges, 2, "2 transaction items")
	require.Equal(t, 2, accountTransactionsInvoice.Entities[0].Account.TransactionsTotalCount, "correct total count")
	require.Equal(t, 2, accountTransactionsInvoice.Entities[0].Account.TransactionsPaymentCount, "correct payment count")

	transaction := accountTransactionsInvoice.Entities[0].Account.Transactions.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypePayment, transaction.Type, "correct transaction type")
	require.Equal(t, "2022-02-28 15:21:49 +0000 UTC", transaction.Timestamp.String(), "correct timestamp")
	require.Equal(t, 699, transaction.Amount, "correct amount")
	require.Equal(t, graphql.CurrencyUsd, transaction.Currency, "correct currency")

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, transaction.PaymentMethod)
}
