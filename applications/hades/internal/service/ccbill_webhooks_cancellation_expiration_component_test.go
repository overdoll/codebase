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

type AccountTransactionHistoryCancelled struct {
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
					} `graphql:"... on AccountCancelledTransactionHistory"`
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type AccountTransactionHistoryExpired struct {
	Entities []struct {
		Account struct {
			Id                 relay.ID
			TransactionHistory struct {
				Edges []*struct {
					Node struct {
						Id                            relay.ID
						Transaction                   types.AccountTransactionType
						CCBillSubscriptionTransaction types.CCBillSubscriptionTransaction
						Timestamp                     time.Time
					} `graphql:"... on AccountExpiredTransactionHistory"`
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_Cancelled_and_Expired(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId, nil)

	workflow := workflows.CCBillCancellation
	testing_tools.MockWorkflowWithArgs(t, temporalClientMock, workflow, mock.Anything).Return(&mocks.WorkflowRun{}, nil)

	// run webhook - cancellation
	runWebhookAction(t, "Cancellation", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"reason":         "Transaction Voided",
		"source":         "webAdmin",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-24 14:24:41",
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

	require.Equal(t, types.AccountClubSupporterSubscriptionStatusCancelled, subscriptions.Edges[0].Node.Status, "subscription is cancelled now")

	var accountTransactionsCancelled AccountTransactionHistoryCancelled

	err := gqlClient.Query(context.Background(), &accountTransactionsCancelled, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactionsCancelled.Entities[0].Account.TransactionHistory.Edges, 2, "2 transaction items")

	transaction := accountTransactionsCancelled.Entities[0].Account.TransactionHistory.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, "2022-02-24 14:24:41 +0000 UTC", transaction.Timestamp, "correct timestamp")
	require.Equal(t, "Transaction Voided", transaction.CCBillReason, "correct reason")
	require.Equal(t, ccbillSubscriptionId, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, "correct ccbill subscription ID")

	workflowExpired := workflows.CCBillExpiration
	testing_tools.MockWorkflowWithArgs(t, temporalClientMock, workflowExpired, mock.Anything).Return(&mocks.WorkflowRun{}, nil)

	// run webhook - expiration
	runWebhookAction(t, "Expired", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-24 14:24:41",
	})

	args = testing_tools.GetArgumentsForWorkflowCall(t, temporalClientMock, workflowExpired, mock.Anything)
	env = getWorkflowEnvironment(t)
	// execute workflow manually since it won't be
	env.ExecuteWorkflow(workflowExpired, args)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// get club supporter subscriptions
	subscriptions = getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Edges, 0, "should no longer have the subscription")

	var accountTransactionsExpired AccountTransactionHistoryExpired

	err = gqlClient.Query(context.Background(), &accountTransactionsExpired, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactionsCancelled.Entities[0].Account.TransactionHistory.Edges, 3, "3 transaction items")

	transaction = accountTransactionsCancelled.Entities[0].Account.TransactionHistory.Edges[0].Node

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, "2022-02-24 14:24:41 +0000 UTC", transaction.Timestamp, "correct timestamp")
	require.Equal(t, ccbillSubscriptionId, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, "correct ccbill subscription ID")
}
