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
)

type CancelActiveSupporterSubscriptionsForClub struct {
	CancelActiveSupporterSubscriptionsForClub *struct {
		Club struct {
			Id relay.ID
		}
	} `graphql:"cancelActiveSupporterSubscriptionsForClub(input: $input)"`
}

func TestCancelActiveSubscriptionsForClub(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	mockAccountStaff(t, accountId)
	mockAccountDigest(t, accountId, "")

	graphqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId, nil)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.CancelActiveSupporterSubscriptionsForClub, mock.Anything)

	var cancelActiveSubscriptions CancelActiveSupporterSubscriptionsForClub

	err := graphqlClient.Mutate(context.Background(), &cancelActiveSubscriptions, map[string]interface{}{
		"input": types.CancelActiveSupporterSubscriptionsForClubInput{ClubID: convertClubIdIdToRelayId(clubId)},
	})

	require.NoError(t, err, "no error cancelling active subscriptions")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	var accountClubSupporterSubscriptions AccountCancelledClubSupporterSubscriptions

	err = graphqlClient.Query(context.Background(), &accountClubSupporterSubscriptions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing subscriptions")

	require.Len(t, accountClubSupporterSubscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges, 1, "should be cancelled")
}
