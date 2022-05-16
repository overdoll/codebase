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

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ArchivePost, workflows.ArchivePostInput{PostId: postId})

	var archivePost ArchivePost

	err := client.Mutate(context.Background(), &archivePost, map[string]interface{}{
		"input": types.ArchivePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error archiving a post")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	post := getPost(t, client, postId)

	require.Equal(t, types.PostStateArchived, post.Post.State, "post is in archived state")

	unArchiveWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.UnArchivePost, workflows.UnArchivePostInput{PostId: postId})

	var unArchivePost UnArchivePost

	err = client.Mutate(context.Background(), &unArchivePost, map[string]interface{}{
		"input": types.UnArchivePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error un archiving a post")

	unArchiveWorkflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	post = getPost(t, client, postId)

	require.Equal(t, types.PostStatePublished, post.Post.State, "post is in published state")
}
