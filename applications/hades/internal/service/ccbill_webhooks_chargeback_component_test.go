package service_test

import (
	"context"
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type AccountTransactionHistoryChargeback struct {
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
							Amount                        int
							Currency                      types.Currency
							PaymentMethod                 types.PaymentMethod
							CCBillSubscriptionTransaction types.CCBillSubscriptionTransaction `graphql:"ccbillSubscriptionTransaction"`
							Timestamp                     time.Time
						} `graphql:"... on AccountChargebackTransactionHistory"`
					}
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_Chargeback(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId, nil)

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
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var accountTransactionsChargeback AccountTransactionHistoryChargeback

	err := gqlClient.Query(context.Background(), &accountTransactionsChargeback, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactionsChargeback.Entities[0].Account.TransactionHistory.Edges, 2, "2 transaction items")
	transaction := accountTransactionsChargeback.Entities[0].Account.TransactionHistory.Edges[0].Node.Item

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, "2022-02-27 03:18:00 +0000 UTC", transaction.Timestamp.String(), "correct timestamp")
	require.Equal(t, 699, transaction.Amount, "correct amount")
	require.Equal(t, types.CurrencyUsd, transaction.Currency, "correct currency")
	require.Equal(t, "IDK LOL", transaction.CCBillReason, "correct reason")
	require.Equal(t, ccbillSubscriptionId, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, "correct ccbill subscription ID")

	require.Equal(t, "1111", transaction.PaymentMethod.Card.Last4, "correct last 4 digits on the card")
	require.Equal(t, types.CardTypeVisa, transaction.PaymentMethod.Card.Type, "is a VISA card")
	require.Equal(t, "04/2023", transaction.PaymentMethod.Card.Expiration, "correct expiration date")
}
