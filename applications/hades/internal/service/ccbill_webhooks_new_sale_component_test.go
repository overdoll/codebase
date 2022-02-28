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

type AccountSavedPaymentMethods struct {
	Entities []struct {
		Account struct {
			Id                  relay.ID
			SavedPaymentMethods struct {
				Edges []*struct {
					Node struct {
						CcbillSubscription *types.CCBillSubscription
						Id                 relay.ID
						PaymentMethod      types.PaymentMethod
					}
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

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

	require.Equal(t, subscription.Node.Status, types.AccountClubSupporterSubscriptionStatusActive, "subscription is active")
	require.Equal(t, subscription.Node.BillingCurrency, types.CurrencyUsd, "USD currency is used")
	require.Equal(t, subscription.Node.BillingAmount, 6.99, "correct billing amount")
	require.Nil(t, subscription.Node.CancelledAt, "not cancelled")
	require.Equal(t, subscription.Node.NextBillingDate, "2022-03-28 00:00:00 +0000 UTC", "correct next billing date")

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, subscription.Node.PaymentMethod)

	// check for saved payment methods
	var accountSavedPayments AccountSavedPaymentMethods

	err := gqlClient.Query(context.Background(), &accountSavedPayments, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing saved payment methods")

	require.Len(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges, 1, "should have 1 saved payment method available")

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.PaymentMethod)
	require.Equal(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.CcbillSubscription.CcbillSubscriptionID, ccbillSubscriptionId, "correct ccbill subscription id")

	ccbillSubscriptionDetails := getCCBillSubscriptionDetails(t, gqlClient, ccbillSubscriptionId)

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, ccbillSubscriptionDetails.PaymentMethod)

	require.Equal(t, ccbillSubscriptionDetails.Status, types.AccountClubSupporterSubscriptionStatusActive, "subscription should be active")

	require.Equal(t, ccbillSubscriptionDetails.SubscriptionInitialPrice, "6.99", "s: correct initial price")
	require.Equal(t, ccbillSubscriptionDetails.SubscriptionRecurringPrice, "6.99", "s: correct recurring price")
	require.Equal(t, ccbillSubscriptionDetails.SubscriptionCurrency, types.CurrencyUsd, "s: correct usd currency")

	require.Equal(t, ccbillSubscriptionDetails.BilledInitialPrice, "6.99", "b: correct initial price")
	require.Equal(t, ccbillSubscriptionDetails.BilledRecurringPrice, "6.99", "b: correct recurring price")
	require.Equal(t, ccbillSubscriptionDetails.BilledCurrency, types.CurrencyUsd, "b: correct usd currency")

	require.Equal(t, ccbillSubscriptionDetails.AccountingInitialPrice, "6.99", "a: correct initial price")
	require.Equal(t, ccbillSubscriptionDetails.AccountingRecurringPrice, "6.99", "a: correct recurring price")
	require.Equal(t, ccbillSubscriptionDetails.AccountingCurrency, types.CurrencyUsd, "a: correct usd currency")

	var accountTransactions AccountTransactionHistoryNew

	err = gqlClient.Query(context.Background(), &accountTransactions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactions.Entities[0].Account.TransactionHistory.Edges, 1, "1 transaction item")

	transaction := accountTransactions.Entities[0].Account.TransactionHistory.Edges[0].Node

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, transaction.PaymentMethod)

	require.Equal(t, transaction.Amount, "6.99", "correct amount")
	require.Equal(t, transaction.Currency, types.CurrencyUsd, "correct currency")
	require.Equal(t, transaction.NextBillingDate, "2022-03-28 00:00:00 +0000 UTC", "correct next billing date")
	require.Equal(t, transaction.BilledAtDate, "2022-02-26 00:00:00 +0000 UTC", "correct billing date")
}

func assertNewSaleSuccessCorrectPaymentMethodDetails(t *testing.T, paymentMethod types.PaymentMethod) {
	require.Equal(t, paymentMethod.Card.Last4, "1111", "correct last 4 digits on the card")
	require.Equal(t, paymentMethod.Card.Type, types.CardTypeVisa, "is a VISA card")
	require.Equal(t, paymentMethod.Card.Expiration, "04/2024", "correct expiration date")

	require.Equal(t, paymentMethod.BillingContact.Email, "nikita@overdoll.com", "correct billing contact")
	require.Equal(t, paymentMethod.BillingContact.FirstName, "Test", "correct first name")
	require.Equal(t, paymentMethod.BillingContact.LastName, "Person", "correct last name")

	require.Equal(t, paymentMethod.BillingAddress.AddressLine1, "Test Address", "correct address")
	require.Equal(t, paymentMethod.BillingAddress.PostalCode, "TM4N5S1", "correct postal code")
	require.Equal(t, paymentMethod.BillingAddress.Country, "CA", "correct country")
	require.Equal(t, paymentMethod.BillingAddress.State, "NT", "correct state")
	require.Equal(t, paymentMethod.BillingAddress.City, "Test City", "correct city")
}
