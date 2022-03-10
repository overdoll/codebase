package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/testing_tools"
	"testing"
)

type ArchivePost struct {
	ArchivePost *struct {
		Post *PostModified
	} `graphql:"archivePost(input: $input)"`
}

type UnArchivePost struct {
	UnArchivePost *struct {
		Post *PostModified
	} `graphql:"unArchivePost(input: $input)"`
}

// TestArchivePost_and_undo - archive a post and unarchive it
func TestArchivePost_and_undo(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	publishedPost := seedPublishedPost(t, testingAccountId)
	postId := publishedPost.ID()
	relayId := convertPostIdToRelayId(postId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.ArchivePost, workflows.ArchivePostInput{PostId: postId})

	var archivePost ArchivePost

	err := client.Mutate(context.Background(), &archivePost, map[string]interface{}{
		"input": types.ArchivePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error archiving a post")

	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateTotalPostsForPostTags)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	post := getPost(t, client, postId)

	require.Equal(t, types.PostStateArchived, post.Post.State, "post is in archived state")

	unArchiveWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.UnArchivePost, workflows.UnArchivePostInput{PostId: postId})

	var unArchivePost UnArchivePost

	err = client.Mutate(context.Background(), &unArchivePost, map[string]interface{}{
		"input": types.UnArchivePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error un archiving a post")

	unArchiveEnvironment := getWorkflowEnvironment(t)
	unArchiveEnvironment.RegisterWorkflow(workflows.UpdateTotalPostsForPostTags)
	unArchiveWorkflowExecution.FindAndExecuteWorkflow(t, unArchiveEnvironment)
	require.True(t, unArchiveEnvironment.IsWorkflowCompleted())
	require.NoError(t, unArchiveEnvironment.GetWorkflowError())

	post = getPost(t, client, postId)

	require.Equal(t, types.PostStatePublished, post.Post.State, "post is in published state")
}
