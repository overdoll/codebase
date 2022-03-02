package service_test

import (
	"context"
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type AccountTransactionHistoryInvoice struct {
	Entities []struct {
		Account struct {
			Id                 relay.ID
			TransactionHistory struct {
				Edges []*struct {
					Node struct {
						Id                            relay.ID
						Transaction                   types.AccountTransactionType
						Amount                        float64
						Currency                      types.Currency
						BilledAtDate                  time.Time
						NextBillingDate               time.Time
						PaymentMethod                 types.PaymentMethod
						CCBillSubscriptionTransaction types.CCBillSubscriptionTransaction
						Timestamp                     time.Time
					} `graphql:"... on AccountInvoiceTransactionHistory"`
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_RenewalSuccess(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId, nil)

	workflow := workflows.CCBillRenewalSuccess
	testing_tools.MockWorkflowWithArgs(t, temporalClientMock, workflow, mock.Anything).Return(&mocks.WorkflowRun{}, nil)

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
		"timestamp":              "2022-02-26 08:21:49",
		"subscriptionId":         ccbillSubscriptionId,
	})

	args := testing_tools.GetArgumentsForWorkflowCall(t, temporalClientMock, workflow, mock.Anything)
	env := getWorkflowEnvironment(t)
	// execute workflow manually since it won't be
	env.ExecuteWorkflow(workflow, args)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Edges, 1, "should have 1 subscription")

	subscription := subscriptions.Edges[0]

	require.Equal(t, types.AccountClubSupporterSubscriptionStatusActive, subscription.Node.Status, "subscription is active")
	require.Equal(t, types.CurrencyUsd, subscription.Node.BillingCurrency, "USD currency is used")
	require.Equal(t, 6.99, subscription.Node.BillingAmount, "correct billing amount")
	require.Nil(t, subscription.Node.CancelledAt, "not cancelled")
	require.Equal(t, "2024-03-28 00:00:00 +0000 UTC", subscription.Node.NextBillingDate, "correct next billing date")

	var accountTransactionsInvoice AccountTransactionHistoryInvoice

	err := gqlClient.Query(context.Background(), &accountTransactionsInvoice, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactionsInvoice.Entities[0].Account.TransactionHistory.Edges, 2, "2 transaction items")
	transaction := accountTransactionsInvoice.Entities[0].Account.TransactionHistory.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, "2022-02-26 08:21:49 +0000 UTC", transaction.Timestamp, "correct timestamp")
	require.Equal(t, 6.99, transaction.Amount, "correct amount")
	require.Equal(t, types.CurrencyUsd, transaction.Currency, "correct currency")
	require.Equal(t, ccbillSubscriptionId, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, "correct ccbill subscription ID")

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, transaction.PaymentMethod)
}
