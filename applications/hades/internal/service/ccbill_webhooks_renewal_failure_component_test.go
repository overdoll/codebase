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
func TestBillingFlow_RenewalFailure(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CCBillRenewalFailure, mock.Anything)

	// run webhook - renewal failure
	runWebhookAction(t, "RenewalFailure", map[string]string{
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"failureReason":  "Invalid Input.",
		"failureCode":    "BE-140",
		"nextRetryDate":  "2012-08-20",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-26 20:18:00",
	})

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	subscriptions := getActiveAccountClubSupporterSubscriptions(t, gqlClient, accountId)

	require.Len(t, subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges, 1, "1 subscription exists")
	subscription := subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges[0].Node.Item

	require.NotNil(t, subscription.BillingError, "should have a billing error")
	require.Equal(t, "2012-08-20", subscription.BillingError.NextRetryDate, "correct timestamp")
	require.Equal(t, "Invalid Input.", *subscription.BillingError.CcbillErrorText, "correct reason")
	require.Equal(t, "BE-140", *subscription.BillingError.CcbillErrorCode, "correct code")
}
