package service_test

import (
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_BillingDateChanged(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessWebhook(t, accountId, ccbillSubscriptionId, clubId)

	// run webhook - customer data update
	runWebhookAction(t, "BillingDateChange", map[string]string{
		"clientAccnum":    "951492",
		"clientSubacc":    "0101",
		"nextRenewalDate": "2022-03-28",
		"subscriptionId":  ccbillSubscriptionId,
		"timestamp":       "2022-02-24 20:18:00",
	})

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Equal(t, subscriptions.Edges[0].Node.NextBillingDate, "2022-02-24 20:18:00 +0000 UTC", "correct next billing date")
}
