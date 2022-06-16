package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/applications/sting/internal/service"
	sting "overdoll/applications/sting/proto"
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

	staffAccountId := uuid.New().String()
	mockAccountStaff(t, staffAccountId)

	regularAccountId := uuid.New().String()
	mockAccountNormal(t, regularAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, staffAccountId)
	clb := seedClub(t, regularAccountId)
	publishedPost := seedPublishedPost(t, uuid.New().String(), clb.ID())
	postId := publishedPost.ID()
	relayId := service.convertClubIdToRelayId(clb.ID())

	// TEST WITH REGULAR ACCOUNT TO SEE IF YOU CAN SEE POST
	regularClient := getGraphqlClientWithAuthenticatedAccount(t, regularAccountId)
	pst := getPost(t, regularClient, postId)
	require.NotNil(t, pst.Post, "post is not nil")

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(service.application.TemporalClient, workflows.TerminateClub, mock.Anything)

	var terminateClub TerminateClub
	err := client.Mutate(context.Background(), &terminateClub, map[string]interface{}{
		"input": types.TerminateClubInput{
			ClubID: relayId,
		},
	})

	require.NoError(t, err, "no error terminating club")

	workflowExecution.FindAndExecuteWorkflow(t, service.getWorkflowEnvironment())

	service.refreshClubESIndex(t)

	updatedClb := getClub(t, client, clb.Slug())
	require.NotNil(t, updatedClb.Club.Termination, "club is terminated")

	// POST SHOULD NO LONGER BE VISIBLE AFTER TERMINATING
	pst = getPost(t, regularClient, postId)
	require.Nil(t, pst.Post, "post should be nil")

	grpcClient := service.getGrpcClient(t)

	can, err := grpcClient.CanDeleteAccountData(context.Background(), &sting.CanDeleteAccountDataRequest{AccountId: regularAccountId})
	require.NoError(t, err, "no error seeing if you can delete account data")
	require.True(t, can.CanDelete, "should be able to delete")

	// should not be able to find the club publicly

	randomUser := uuid.New().String()
	service.mockAccountNormal(t, randomUser)

	randomUserGraphqlClient := service.getGraphqlClientWithAuthenticatedAccount(t, randomUser)

	updatedClb = getClub(t, randomUserGraphqlClient, clb.Slug())
	require.Nil(t, updatedClb.Club, "club should not be found")

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(service.application.TemporalClient, workflows.UnTerminateClub, mock.Anything)

	var unTerminateClub UnTerminateClub
	err = client.Mutate(context.Background(), &unTerminateClub, map[string]interface{}{
		"input": types.UnTerminateClubInput{
			ClubID: relayId,
		},
	})

	require.NoError(t, err, "no error un terminating")

	workflowExecution.FindAndExecuteWorkflow(t, service.getWorkflowEnvironment())

	updatedClb = getClub(t, client, clb.Slug())
	require.Nil(t, updatedClb.Club.Termination, "club is no longer suspended")

	// should be able to find the club again
	randomUserGraphqlClient = service.getGraphqlClientWithAuthenticatedAccount(t, randomUser)
	updatedClb = getClub(t, randomUserGraphqlClient, clb.Slug())
	require.NotNil(t, updatedClb.Club, "club should be found")

	// POST SHOULD BE VISIBLE ONCE AGAIN
	pst = getPost(t, randomUserGraphqlClient, postId)
	require.NotNil(t, pst.Post, "post is not nil")
}
