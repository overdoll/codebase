package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/testing_tools"
	"testing"
)

type AccountCuratedPostsAccount struct {
	ID                    string
	CuratedPostsFeedData  types.CuratedPostsFeedData
	CuratedPostsFeedPosts struct {
		Edges []struct {
			Node PostModified
		}
	}
}

type AccountCuratedPosts struct {
	Entities []struct {
		Account AccountCuratedPostsAccount `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func getAccountCuratedPosts(t *testing.T, accountId string) AccountCuratedPostsAccount {

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var accountPersonalization AccountCuratedPosts

	err := client.Query(context.Background(), &accountPersonalization, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err)

	return accountPersonalization.Entities[0].Account
}

func TestGetAccountCuratedPosts(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	shouldGetWorkflow := false

	flowRun := &mocks.WorkflowRun{}
	flowRun.
		On("Get", mock.Anything, mock.Anything).
		Return(nil)

	application.TemporalClient.
		On("GetWorkflow", mock.Anything, "sting.GenerateCuratedPostsFeed_"+testingAccountId, mock.Anything).
		Run(func(args mock.Arguments) {
			shouldGetWorkflow = true
		}).
		Return(flowRun)

	workflowExecution1 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.GenerateCuratedPostsFeed, mock.Anything)
	workflowExecution2 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.GenerateCuratedPostsFeed, mock.Anything)

	curatedPosts := getAccountCuratedPosts(t, testingAccountId)

	workflowExecution1.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
	workflowExecution2.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	require.True(t, shouldGetWorkflow, "should have gotten workflow")

	require.Nil(t, curatedPosts.CuratedPostsFeedData.NextRegenerationTime, "should be nil")
	require.Nil(t, curatedPosts.CuratedPostsFeedData.GeneratedAt, "should not have a generated at field")
	require.Nil(t, curatedPosts.CuratedPostsFeedData.ViewedAt, "should not have a viewed at field")

	// should run the generation again when we query it
	workflowExecution3 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.GenerateCuratedPostsFeed, mock.Anything)

	curatedPosts = getAccountCuratedPosts(t, testingAccountId)

	workflowExecution3.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	require.Nil(t, curatedPosts.CuratedPostsFeedData.NextRegenerationTime, "should be nil")
	require.NotNil(t, curatedPosts.CuratedPostsFeedData.GeneratedAt, "should not have a generated at field")
	require.Nil(t, curatedPosts.CuratedPostsFeedData.ViewedAt, "should not have a viewed at field")
}
