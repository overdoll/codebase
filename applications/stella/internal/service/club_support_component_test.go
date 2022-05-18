package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/app/workflows"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

func TestClubSupport(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, uuid.New().String())

	clubViewer := getClub(t, client, clb.Slug())
	require.False(t, clubViewer.Club.CanSupport, "should not be able to support a newly created club")
	require.Nil(t, clubViewer.Club.NextSupporterPostTime, "next support time should be nil")

	// do a new supporter post grpc call
	grpcClient := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.NewSupporterPost, mock.Anything)

	_, err := grpcClient.NewSupporterPost(context.Background(), &stella.NewSupporterPostRequest{
		ClubId: clb.ID(),
	})
	require.NoError(t, err, "no error for new supporter post")

	env := getWorkflowEnvironment()

	env.OnRequestCancelExternalWorkflow(mock.Anything, mock.Anything, mock.Anything).
		Run(
			func(args mock.Arguments) {

			},
		).
		Return(nil).
		Once()

	env.RegisterWorkflow(workflows.ClubSupporterPostNotifications)
	workflowExecution.FindAndExecuteWorkflow(t, env)

	clubViewer = getClub(t, client, clb.Slug())
	require.True(t, clubViewer.Club.CanSupport, "should be able to support now that the club has created a new post")
	require.NotNil(t, clubViewer.Club.NextSupporterPostTime, "should have a next supporter post time now")
}
