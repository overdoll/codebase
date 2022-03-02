package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"testing"
	"time"
)

type ClubSupporterSubscriptionsEdges struct {
	Edges []*struct {
		Node struct {
			Id                 relay.ID
			Status             types.AccountClubSupporterSubscriptionStatus
			LastBillingDate    time.Time
			NextBillingDate    time.Time
			CancelledAt        *time.Time
			BillingAmount      float64
			BillingCurrency    types.Currency
			PaymentMethod      types.PaymentMethod
			CcbillSubscription types.CCBillSubscription
		}
	}
}

type AccountClubSupporterSubscriptions struct {
	Entities []struct {
		Account struct {
			Id                         relay.ID
			ClubSupporterSubscriptions ClubSupporterSubscriptionsEdges
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type _Any map[string]interface{}

func getAccountClubSupporterSubscriptions(t *testing.T, client *graphql.Client, accountId string) ClubSupporterSubscriptionsEdges {

	var accountClubSupporterSubscriptions AccountClubSupporterSubscriptions

	err := client.Query(context.Background(), &accountClubSupporterSubscriptions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing subscriptions")

	return accountClubSupporterSubscriptions.Entities[0].Account.ClubSupporterSubscriptions
}

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

func getAccountSavedPaymentMethods(t *testing.T, client *graphql.Client, accountId string) AccountSavedPaymentMethods {

	// check for saved payment methods
	var accountSavedPayments AccountSavedPaymentMethods

	err := client.Query(context.Background(), &accountSavedPayments, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing saved payment methods")

	return accountSavedPayments
}

type CCBillSubscriptionDetailsCustom struct {
	Id            relay.ID
	Status        types.CCBillSubscriptionStatus
	PaymentMethod types.PaymentMethod

	SubscriptionInitialPrice   float64
	SubscriptionRecurringPrice float64
	SubscriptionCurrency       types.Currency

	BilledInitialPrice   float64
	BilledRecurringPrice float64
	BilledCurrency       types.Currency

	AccountingInitialPrice   float64
	AccountingRecurringPrice float64
	AccountingCurrency       types.Currency

	IsRecurring       bool
	TimesRebilled     int
	ChargebacksIssued int
	RefundsIssued     int
	VoidsIssued       int
}

type CCBillSubscriptionDetails struct {
	CCBillSubscriptionDetails *CCBillSubscriptionDetailsCustom `graphql:"ccbillSubscriptionDetails(ccbillSubscriptionId: $ccbillSubscriptionId)"`
}

func getCCBillSubscriptionDetails(t *testing.T, client *graphql.Client, id string) *CCBillSubscriptionDetailsCustom {

	var ccbillSubscriptionDetails CCBillSubscriptionDetails

	err := client.Query(context.Background(), &ccbillSubscriptionDetails, map[string]interface{}{
		"ccbillSubscriptionId": graphql.String(id),
	})

	require.NoError(t, err)
	require.NotNil(t, ccbillSubscriptionDetails.CCBillSubscriptionDetails, "should exist")

	return ccbillSubscriptionDetails.CCBillSubscriptionDetails
}

type CCBillTransactionDetails struct {
	CCBillTransactionDetails *struct {
		Approved                               bool
		DeclineError                           *types.CCBillDeclineError
		DeclineCode                            *string
		DeclineText                            *string
		LinkedAccountClubSupporterSubscription *struct {
			Id relay.ID
		}
	} `graphql:"ccbillTransactionDetails(token: $token)"`
}

func getCCBillTransactionDetails(t *testing.T, gqlClient *graphql.Client, token string) CCBillTransactionDetails {
	var ccbillTransactionDetailsFailure CCBillTransactionDetails

	err := gqlClient.Query(context.Background(), &ccbillTransactionDetailsFailure, map[string]interface{}{
		"token": graphql.String(token),
	})

	require.NoError(t, err, "no error grabbing transaction details token")
	require.NotNil(t, ccbillTransactionDetailsFailure.CCBillTransactionDetails, "transaction details exists")

	return ccbillTransactionDetailsFailure
}
