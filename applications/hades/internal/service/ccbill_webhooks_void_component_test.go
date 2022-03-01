package service_test

import (
	"context"
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type AccountTransactionHistoryVoid struct {
	Entities []struct {
		Account struct {
			Id                 relay.ID
			TransactionHistory struct {
				Edges []*struct {
					Node struct {
						Id                            relay.ID
						Transaction                   types.AccountTransactionType
						CCBillReason                  string
						CCBillSubscriptionTransaction types.CCBillSubscriptionTransaction
						Timestamp                     time.Time
					} `graphql:"... on AccountVoidTransactionHistory"`
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_Void(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId)

	// run webhook - cancellation
	runWebhookAction(t, "Void", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"reason":         "Income issues",
		"source":         "webAdmin",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-24 14:24:14",
	})

	workflow := workflows.CCBillVoid

	args := temporalClientMock.MethodCalled(testing_tools.GetFunctionName(workflow), nil)

	env := getWorkflowEnvironment(t)
	// execute workflow manually since it won't be
	env.ExecuteWorkflow(workflow, args)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var accountTransactionsVoid AccountTransactionHistoryVoid

	err := gqlClient.Query(context.Background(), &accountTransactionsVoid, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactionsVoid.Entities[0].Account.TransactionHistory.Edges, 2, "2 transaction items")
	transaction := accountTransactionsVoid.Entities[0].Account.TransactionHistory.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, "2022-02-24 14:24:14 +0000 UTC", transaction.Timestamp, "correct timestamp")
	require.Equal(t, "Income issues", transaction.CCBillReason, "correct reason")
	require.Equal(t, ccbillSubscriptionId, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, "correct ccbill subscription ID")
}