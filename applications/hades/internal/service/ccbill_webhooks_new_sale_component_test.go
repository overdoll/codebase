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

type AccountTransactionHistoryNew struct {
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
					} `graphql:"... on AccountNewTransactionHistory"`
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_NewSale(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessWebhook(t, accountId, ccbillSubscriptionId, clubId)

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
	require.Equal(t, "2022-03-28 00:00:00 +0000 UTC", subscription.Node.NextBillingDate, "correct next billing date")

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, subscription.Node.PaymentMethod)

	accountSavedPayments := getAccountSavedPaymentMethods(t, gqlClient, accountId)

	require.Len(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges, 1, "should have 1 saved payment method available")

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.PaymentMethod)
	require.Equal(t, ccbillSubscriptionId, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.CcbillSubscription.CcbillSubscriptionID, "correct ccbill subscription id")

	ccbillSubscriptionDetails := getCCBillSubscriptionDetails(t, gqlClient, ccbillSubscriptionId)

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, ccbillSubscriptionDetails.PaymentMethod)

	require.Equal(t, types.AccountClubSupporterSubscriptionStatusActive, ccbillSubscriptionDetails.Status, "subscription should be active")

	require.Equal(t, "6.99", ccbillSubscriptionDetails.SubscriptionInitialPrice, "s: correct initial price")
	require.Equal(t, "6.99", ccbillSubscriptionDetails.SubscriptionRecurringPrice, "s: correct recurring price")
	require.Equal(t, types.CurrencyUsd, ccbillSubscriptionDetails.SubscriptionCurrency, "s: correct usd currency")

	require.Equal(t, "6.99", ccbillSubscriptionDetails.BilledInitialPrice, "b: correct initial price")
	require.Equal(t, "6.99", ccbillSubscriptionDetails.BilledRecurringPrice, "b: correct recurring price")
	require.Equal(t, types.CurrencyUsd, ccbillSubscriptionDetails.BilledCurrency, "b: correct usd currency")

	require.Equal(t, "6.99", ccbillSubscriptionDetails.AccountingInitialPrice, "a: correct initial price")
	require.Equal(t, "6.99", ccbillSubscriptionDetails.AccountingRecurringPrice, "a: correct recurring price")
	require.Equal(t, types.CurrencyUsd, ccbillSubscriptionDetails.AccountingCurrency, "a: correct usd currency")

	var accountTransactions AccountTransactionHistoryNew

	err := gqlClient.Query(context.Background(), &accountTransactions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactions.Entities[0].Account.TransactionHistory.Edges, 1, "1 transaction item")

	transaction := accountTransactions.Entities[0].Account.TransactionHistory.Edges[0].Node

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, transaction.PaymentMethod)

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, 6.99, transaction.Amount, "correct amount")
	require.Equal(t, types.CurrencyUsd, transaction.Currency, "correct currency")
	require.Equal(t, "2022-03-28 00:00:00 +0000 UTC", transaction.NextBillingDate, "correct next billing date")
	require.Equal(t, "2022-02-26 00:00:00 +0000 UTC", transaction.BilledAtDate, "correct billing date")
}

func assertNewSaleSuccessCorrectPaymentMethodDetails(t *testing.T, paymentMethod types.PaymentMethod) {
	require.Equal(t, "1111", paymentMethod.Card.Last4, "correct last 4 digits on the card")
	require.Equal(t, types.CardTypeVisa, paymentMethod.Card.Type, "is a VISA card")
	require.Equal(t, "04/2024", paymentMethod.Card.Expiration, "correct expiration date")

	require.Equal(t, "nikita@overdoll.com", paymentMethod.BillingContact.Email, "correct billing contact")
	require.Equal(t, "Test", paymentMethod.BillingContact.FirstName, "correct first name")
	require.Equal(t, "Person", paymentMethod.BillingContact.LastName, "correct last name")

	require.Equal(t, "Test Address", paymentMethod.BillingAddress.AddressLine1, "correct address")
	require.Equal(t, "TM4N5S1", paymentMethod.BillingAddress.PostalCode, "correct postal code")
	require.Equal(t, "CA", paymentMethod.BillingAddress.Country, "correct country")
	require.Equal(t, "NT", paymentMethod.BillingAddress.State, "correct state")
	require.Equal(t, "Test City", paymentMethod.BillingAddress.City, "correct city")
}
