package service_test

import (
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_UserReactivation(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessWebhook(t, accountId, ccbillSubscriptionId, clubId)

	// run webhook - cancellation
	runWebhookAction(t, "UserReactivation", map[string]string{
		"subscriptionId":  ccbillSubscriptionId,
		"nextRenewalDate": "2025-03-28",
		"clientAccnum":    "951492",
		"clientSubacc":    "0101",
	})

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Edges, 1, "should have 1 subscription")

	subscription := subscriptions.Edges[0]

	require.Equal(t, subscription.Node.Status, types.AccountClubSupporterSubscriptionStatusActive, "subscription is active")
	require.Equal(t, subscription.Node.NextBillingDate, "2025-03-28 00:00:00 +0000 UTC", "correct next billing date")
}
