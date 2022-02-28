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

	ccbillNewSaleSuccessWebhook(t, accountId, ccbillSubscriptionId, clubId)

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

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Edges, 1, "should have 1 subscription")

	subscription := subscriptions.Edges[0]

	require.Equal(t, subscription.Node.Status, types.AccountClubSupporterSubscriptionStatusActive, "subscription is active")
	require.Equal(t, subscription.Node.BillingCurrency, types.CurrencyUsd, "USD currency is used")
	require.Equal(t, subscription.Node.BillingAmount, 6.99, "correct billing amount")
	require.Nil(t, subscription.Node.CancelledAt, "not cancelled")
	require.Equal(t, subscription.Node.NextBillingDate, "2024-03-28 00:00:00 +0000 UTC", "correct next billing date")

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

	require.Equal(t, transaction.Transaction, types.AccountTransactionTypeClubSupporterSubscription, "correct transaction type")
	require.Equal(t, transaction.Timestamp, "2022-02-26 08:21:49 +0000 UTC", "correct timestamp")
	require.Equal(t, transaction.Amount, "6.99", "correct amount")
	require.Equal(t, transaction.Currency, types.CurrencyUsd, "correct currency")
	require.Equal(t, transaction.CCBillSubscriptionTransaction.CcbillSubscriptionID, ccbillSubscriptionId, "correct ccbill subscription ID")

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, transaction.PaymentMethod)
}
