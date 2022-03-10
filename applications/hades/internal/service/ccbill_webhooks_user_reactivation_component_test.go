package service_test

import (
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_UserReactivation(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillUserReactivation, mock.Anything)

	// run webhook - cancellation
	runWebhookAction(t, "UserReactivation", map[string]string{
		"subscriptionId":  ccbillSubscriptionId,
		"nextRenewalDate": "2025-03-28",
		"clientAccnum":    "951492",
		"clientSubacc":    "0101",
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Edges, 1, "should have 1 subscription")

	subscription := subscriptions.Edges[0]

	require.Equal(t, types.AccountClubSupporterSubscriptionStatusActive, subscription.Node.Status, "subscription is active")
	require.Equal(t, "2025-03-28 00:00:00 +0000 UTC", subscription.Node.NextBillingDate.String(), "correct next billing date")
}
