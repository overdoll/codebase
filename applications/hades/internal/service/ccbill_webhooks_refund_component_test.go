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

type AccountTransactionHistoryRefund struct {
	Entities []struct {
		Account struct {
			Id                 relay.ID
			TransactionHistory struct {
				Edges []*struct {
					Node struct {
						Item struct {
							Id                            relay.ID
							Transaction                   types.AccountTransactionType
							CCBillReason                  string `graphql:"ccbillReason"`
							Amount                        float64
							Currency                      types.Currency
							PaymentMethod                 types.PaymentMethod
							CCBillSubscriptionTransaction types.CCBillSubscriptionTransaction `graphql:"ccbillSubscriptionTransaction"`
							Timestamp                     time.Time
						} `graphql:"... on AccountRefundTransactionHistory"`
					}
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_Refund(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId, nil)

	workflow := workflows.CCBillRefund
	testing_tools.MockWorkflowWithArgs(t, temporalClientMock, workflow, mock.Anything).Return(&mocks.WorkflowRun{}, nil)

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
		"timestamp":              "2022-02-24 20:27:56",
	})

	args := testing_tools.GetArgumentsForWorkflowCall(t, temporalClientMock, workflow, mock.Anything)
	env := getWorkflowEnvironment(t)
	// execute workflow manually since it won't be
	env.ExecuteWorkflow(workflow, args...)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var accountTransactionsRefund AccountTransactionHistoryRefund

	err := gqlClient.Query(context.Background(), &accountTransactionsRefund, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactionsRefund.Entities[0].Account.TransactionHistory.Edges, 2, "2 transaction items")
	transaction := accountTransactionsRefund.Entities[0].Account.TransactionHistory.Edges[0].Node.Item

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, "2022-02-25 03:27:56 +0000 UTC", transaction.Timestamp.String(), "correct timestamp")
	require.Equal(t, 6.99, transaction.Amount, "correct amount")
	require.Equal(t, types.CurrencyUsd, transaction.Currency, "correct currency")
	require.Equal(t, "Refunded through Data Link: subscriptionManagement.cgi", transaction.CCBillReason, "correct reason")
	require.Equal(t, ccbillSubscriptionId, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, "correct ccbill subscription ID")

	require.Equal(t, "1111", transaction.PaymentMethod.Card.Last4, "correct last 4 digits on the card")
	require.Equal(t, types.CardTypeVisa, transaction.PaymentMethod.Card.Type, "is a VISA card")
	require.Equal(t, "01/2023", transaction.PaymentMethod.Card.Expiration, "correct expiration date")
}
