package service_test

import (
	"context"
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

type ExpiredAccountClubSupporterSubscriptions struct {
	Entities []struct {
		Account struct {
			Id                                relay.ID
			ExpiredClubSupporterSubscriptions struct {
				Edges []*struct {
					Node struct {
						Id             relay.ID
						SupporterSince time.Time
						ExpiredAt      time.Time
						CancelledAt    time.Time
					}
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type AccountCancelledClubSupporterSubscriptions struct {
	Entities []struct {
		Account struct {
			Id                         relay.ID
			ClubSupporterSubscriptions struct {
				Edges []*struct {
					Node struct {
						Item struct {
							Id                 relay.ID
							Status             types.AccountClubSupporterSubscriptionStatus
							Reference          string
							EndDate            time.Time
							CancelledAt        time.Time
							BillingAmount      int
							BillingCurrency    types.Currency
							PaymentMethod      types.PaymentMethod
							CcbillSubscription types.CCBillSubscription
							CancellationReason types.CancellationReason
							Transactions       struct {
								Edges []*struct {
									Node struct {
										Id relay.ID
									}
								}
							}
						} `graphql:"... on AccountCancelledClubSupporterSubscription"`
					}
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type AccountExpiredClubSupporterSubscriptions struct {
	Entities []struct {
		Account struct {
			Id                         relay.ID
			ClubSupporterSubscriptions struct {
				Edges []*struct {
					Node struct {
						Item struct {
							Id           relay.ID
							Status       types.AccountClubSupporterSubscriptionStatus
							Reference    string
							ExpiredAt    time.Time
							Transactions struct {
								Edges []*struct {
									Node struct {
										Id relay.ID
									}
								}
							}
						} `graphql:"... on AccountExpiredClubSupporterSubscription"`
					}
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_Cancelled_and_Expired(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillCancellation, mock.Anything)

	// run webhook - cancellation
	runWebhookAction(t, "Cancellation", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"reason":         "Transaction Voided",
		"source":         "webAdmin",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-26 20:18:00",
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var cancelledSubscriptions AccountCancelledClubSupporterSubscriptions

	err := gqlClient.Query(context.Background(), &cancelledSubscriptions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing cancelled subscriptions")

	require.Len(t, cancelledSubscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges, 1, "should have 1 subscription")

	subscription := cancelledSubscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges[0].Node.Item

	require.Equal(t, types.AccountClubSupporterSubscriptionStatusCancelled, subscription.Status, "subscription is cancelled now")
	require.Equal(t, "2022-02-26 20:18:00", subscription.CancelledAt, "subscription correct cancellation date")
	require.Equal(t, "2022-02-26 20:18:00", subscription.EndDate, "subscription correct end date")
	require.NotNil(t, subscription.CancellationReason, "subscription correct cancellation reason")
	require.Len(t, subscription.Transactions.Edges, 1, "should have 1 transaction")

	expiredWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillExpiration, mock.Anything)

	// run webhook - expiration
	runWebhookAction(t, "Expiration", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-28 20:18:00",
	})

	env = getWorkflowEnvironment(t)
	expiredWorkflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	var expiredSubscriptions AccountExpiredClubSupporterSubscriptions

	err = gqlClient.Query(context.Background(), &cancelledSubscriptions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing expired subscriptions")

	require.Len(t, expiredSubscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges, 1, "should have 1 subscription")

	expiredSubscription := expiredSubscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges[0].Node.Item

	require.Equal(t, types.AccountClubSupporterSubscriptionStatusExpired, expiredSubscription.Status, "subscription is expired now")
	require.Equal(t, "2022-02-26 20:18:00", expiredSubscription.ExpiredAt, "subscription correct end date")
	require.Len(t, expiredSubscription.Transactions.Edges, 1, "should have 1 transaction")

	var expiredAccountClubSupporterSubscriptions ExpiredAccountClubSupporterSubscriptions

	err = gqlClient.Query(context.Background(), &expiredAccountClubSupporterSubscriptions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error looking up expired subscriptions")

	expiredSubscriptionNew := expiredAccountClubSupporterSubscriptions.Entities[0].Account.ExpiredClubSupporterSubscriptions.Edges[0].Node

	require.Equal(t, "2022-02-28 20:18:00", expiredSubscriptionNew.ExpiredAt.String(), "correct expiration date")
	require.Equal(t, "2022-02-26 20:18:00", expiredSubscriptionNew.CancelledAt.String(), "correct cancellation date")
	require.Equal(t, "2022-02-26 08:21:49", expiredSubscriptionNew.SupporterSince.String(), "correct supporter date")
}
