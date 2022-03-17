package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/graphql/relay"
	"testing"
	"time"
)

type AccountActiveClubSupporterSubscriptions struct {
	Entities []struct {
		Account struct {
			Id                         relay.ID
			ClubSupporterSubscriptions struct {
				Edges []*struct {
					Node struct {
						Item struct {
							Id                 relay.ID
							Reference          string
							LastBillingDate    string
							NextBillingDate    string
							BillingAmount      int
							BillingCurrency    types.Currency
							PaymentMethod      types.PaymentMethod
							CcbillSubscription types.CCBillSubscription
							BillingError       *struct {
								FailedAt        time.Time `json:"failedAt"`
								CcbillErrorText *string   `json:"ccbillErrorText"`
								CcbillErrorCode *string   `json:"ccbillErrorCode"`
								NextRetryDate   string    `json:"nextRetryDate"`
							}
						} `graphql:"... on AccountActiveClubSupporterSubscription"`
					}
				}
			} `graphql:"clubSupporterSubscriptions(status: [ACTIVE])"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type _Any map[string]interface{}

func getActiveAccountClubSupporterSubscriptions(t *testing.T, client *graphql.Client, accountId string) AccountActiveClubSupporterSubscriptions {

	var accountClubSupporterSubscriptions AccountActiveClubSupporterSubscriptions

	err := client.Query(context.Background(), &accountClubSupporterSubscriptions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing subscriptions")

	return accountClubSupporterSubscriptions
}

type AccountTransactions struct {
	Entities []struct {
		Account struct {
			Id                          relay.ID
			TransactionsTotalCount      int
			TransactionsPaymentCount    int
			TransactionsRefundCount     int
			TransactionsChargebackCount int
			Transactions                struct {
				Edges []*struct {
					Node struct {
						Id                relay.ID
						Reference         string
						Type              types.AccountTransactionType
						Events            []*types.AccountTransactionEvent
						Timestamp         time.Time
						Amount            int
						Currency          types.Currency
						BilledAtDate      string
						NextBillingDate   string
						PaymentMethod     types.PaymentMethod
						CcbillTransaction *types.CCBillTransaction
					}
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func getAccountTransactions(t *testing.T, client *graphql.Client, accountId string) AccountTransactions {

	// refresh transactions index so we get the most up-to-date values
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.AccountTransactionsIndexName).Do(context.Background())
	require.NoError(t, err)

	var accountTransactions AccountTransactions

	err = client.Query(context.Background(), &accountTransactions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing account transactions")

	return accountTransactions
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

	SubscriptionInitialPrice   int
	SubscriptionRecurringPrice int
	SubscriptionCurrency       types.Currency

	BilledInitialPrice   int
	BilledRecurringPrice int
	BilledCurrency       types.Currency

	AccountingInitialPrice   int
	AccountingRecurringPrice int
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
			Item struct {
				Id relay.ID
			} `graphql:"... on IAccountClubSupporterSubscription"`
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
