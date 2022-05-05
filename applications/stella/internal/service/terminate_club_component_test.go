package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/ports/graphql/types"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

type TerminateClub struct {
	TerminateClub *struct {
		Club *ClubModified
	} `graphql:"terminateClub(input: $input)"`
}

type UnTerminateClub struct {
	UnSuspendClub *struct {
		Club *ClubModified
	} `graphql:"unTerminateClub(input: $input)"`
}

func TestTerminateClub_and_unTerminate(t *testing.T) {
	t.Parallel()

	staffAccountId := "1q7MJ5IyRTV0X4J27F3m5wGD5mj"

	client := getGraphqlClientWithAuthenticatedAccount(t, staffAccountId)
	clb := seedClub(t, staffAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.TerminateClub, mock.Anything)

	var terminateClub TerminateClub
	err := client.Mutate(context.Background(), &terminateClub, map[string]interface{}{
		"input": types.TerminateClubInput{
			ClubID: relayId,
		},
	})

	require.NoError(t, err, "no error terminating club")

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	refreshClubESIndex(t)

	updatedClb := getClub(t, client, clb.Slug())
	require.NotNil(t, updatedClb.Club.Termination, "club is terminated")

	grpcClient := getGrpcClient(t)

	can, err := grpcClient.CanDeleteAccountData(context.Background(), &stella.CanDeleteAccountDataRequest{AccountId: staffAccountId})
	require.NoError(t, err, "no error seeing if you can delete account data")
	require.True(t, can.CanDelete, "should be able to delete")

	// should not be able to find the club publicly
	randomUserGraphqlClient := getGraphqlClientWithAuthenticatedAccount(t, uuid.New().String())
	updatedClb = getClub(t, randomUserGraphqlClient, clb.Slug())
	require.Nil(t, updatedClb.Club, "club should not be found")

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.UnTerminateClub, mock.Anything)

	var unTerminateClub UnTerminateClub
	err = client.Mutate(context.Background(), &unTerminateClub, map[string]interface{}{
		"input": types.UnTerminateClubInput{
			ClubID: relayId,
		},
	})

	require.NoError(t, err, "no error un terminating")

	env = getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	updatedClb = getClub(t, client, clb.Slug())
	require.Nil(t, updatedClb.Club.Termination, "club is no longer suspended")

	// should be able to find the club again
	randomUserGraphqlClient = getGraphqlClientWithAuthenticatedAccount(t, uuid.New().String())
	updatedClb = getClub(t, randomUserGraphqlClient, clb.Slug())
	require.NotNil(t, updatedClb.Club, "club should be found")
}
