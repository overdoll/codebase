package service_test

import (
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_UserReactivation(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.CCBillUserReactivation, mock.Anything)

	// run webhook - cancellation
	runWebhookAction(t, "UserReactivation", map[string]string{
		"subscriptionId":  ccbillSubscriptionId,
		"nextRenewalDate": "2025-03-28",
		"clientAccnum":    "951492",
		"clientSubacc":    "0101",
	})

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	mockAccountNormal(t, accountId)
	mockAccountDigest(t, accountId, "")

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getActiveAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges, 1, "1 subscription exists")
	subscription := subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges[0].Node.Item

	require.Equal(t, "2025-03-28", subscription.NextBillingDate, "correct next billing date")
}
