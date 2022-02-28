package service_test

import (
	"context"
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type AccountTransactionHistoryFailure struct {
	Entities []struct {
		Account struct {
			Id                 relay.ID
			TransactionHistory struct {
				Edges []*struct {
					Node struct {
						Id                            relay.ID
						Transaction                   types.AccountTransactionType
						NextRetryDate                 time.Time
						CCBillErrorCode               string
						CCBillErrorText               string
						CCBillSubscriptionTransaction types.CCBillSubscriptionTransaction
						Timestamp                     time.Time
					} `graphql:"... on AccountFailureTransactionHistory"`
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_RenewalFailure(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessWebhook(t, accountId, ccbillSubscriptionId, clubId)

	// run webhook - renewal failure
	runWebhookAction(t, "RenewalFailure", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"failureReason":  "Invalid Input.",
		"failureCode":    "BE-140",
		"nextRetryDate":  "2012-08-20",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-24 14:24:14",
	})

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var accountTransactionsFailure AccountTransactionHistoryFailure

	err := gqlClient.Query(context.Background(), &accountTransactionsFailure, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactionsFailure.Entities[0].Account.TransactionHistory.Edges, 2, "2 transaction items")
	transaction := accountTransactionsFailure.Entities[0].Account.TransactionHistory.Edges[0].Node

	require.Equal(t, transaction.Transaction, types.AccountTransactionTypeClubSupporterSubscription, "correct transaction type")
	require.Equal(t, transaction.Timestamp, "2022-02-24 14:24:14 +0000 UTC", "correct timestamp")
	require.Equal(t, transaction.NextRetryDate, "2012-08-20 00:00:00 +0000 UTC", "correct timestamp")
	require.Equal(t, transaction.CCBillErrorText, "Invalid Input.", "correct reason")
	require.Equal(t, transaction.CCBillErrorCode, "BE-140", "correct code")
	require.Equal(t, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, ccbillSubscriptionId, "correct ccbill subscription ID")
}
