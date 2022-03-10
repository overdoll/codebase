package service_test

import (
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_BillingDateChanged(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillBillingDateChange, mock.Anything)

	// run webhook - customer data update
	runWebhookAction(t, "BillingDateChange", map[string]string{
		"clientAccnum":    "951492",
		"clientSubacc":    "0101",
		"nextRenewalDate": "2022-03-28",
		"subscriptionId":  ccbillSubscriptionId,
		"timestamp":       "2022-02-26 20:18:00",
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Equal(t, "2022-03-28 00:00:00 +0000 UTC", subscriptions.Edges[0].Node.NextBillingDate.String(), "correct next billing date")
}
