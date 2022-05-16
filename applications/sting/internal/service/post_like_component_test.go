package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/testing_tools"
	"testing"
	"time"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type PostWithViewerLike struct {
	ID          string
	Reference   string
	ViewerLiked *PostLikeModified
	Likes       int
	Categories  []struct {
		TotalLikes int
	}
	Characters []struct {
		TotalLikes int
		Series     struct {
			TotalLikes int
		}
	}
	Audience struct {
		TotalLikes int
	}
}

type PostLikeModified struct {
	ID      string
	LikedAt time.Time
}

type LikePost struct {
	LikePost *struct {
		PostLike *PostLikeModified
	} `graphql:"likePost(input: $input)"`
}

type UndoLikePost struct {
	UndoLikePost *struct {
		PostLikeId *string
	} `graphql:"undoLikePost(input: $input)"`
}

type PostWithViewer struct {
	Post *PostWithViewerLike `graphql:"post(reference: $reference)"`
}

func getPostWithViewerLike(t *testing.T, accountId, id string) PostWithViewer {

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var post PostWithViewer

	err := client.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(id),
	})

	require.NoError(t, err)

	return post
}

func TestLikePost_and_delete_account_data(t *testing.T) {
	t.Parallel()

	grpcClient := getGrpcClient(t)

	testingAccountId := newFakeAccount(t)
	publishedPost := seedPublishedPost(t, testingAccountId)
	postId := publishedPost.ID()
	relayId := convertPostIdToRelayId(postId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.AddPostLike, workflows.AddPostLikeInput{
		PostId:    postId,
		AccountId: testingAccountId,
	})

	var likePost LikePost

	err := client.Mutate(context.Background(), &likePost, map[string]interface{}{
		"input": types.LikePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error liking a post")

	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	postAfterLiked := getPostWithViewerLike(t, testingAccountId, postId)
	require.NotNil(t, postAfterLiked.Post.ViewerLiked, "viewer like object should not be nil")

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.DeleteAccountData, mock.Anything)

	_, err = grpcClient.DeleteAccountData(context.Background(), &sting.DeleteAccountDataRequest{AccountId: testingAccountId})
	require.NoError(t, err, "no error deleting account data")

	env = getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.RemovePost)
	env.RegisterWorkflow(workflows.RemovePostLike)
	env.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	postAfterLiked = getPostWithViewerLike(t, testingAccountId, postId)
	require.Nil(t, postAfterLiked.Post.ViewerLiked, "viewer like object should be nil")
}

// TestLikePost_and_undo - like a post, check viewer, and then also undo the like
func TestLikePost_and_undo(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	publishedPost := seedPublishedPost(t, testingAccountId)
	postId := publishedPost.ID()
	relayId := convertPostIdToRelayId(postId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.AddPostLike, workflows.AddPostLikeInput{
		PostId:    postId,
		AccountId: testingAccountId,
	})

	var likePost LikePost

	err := client.Mutate(context.Background(), &likePost, map[string]interface{}{
		"input": types.LikePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error liking a post")

	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// refresh ES index or we wont see it
	refreshPostESIndex(t)

	postAfterLiked := getPostWithViewerLike(t, testingAccountId, postId)

	require.NotNil(t, postAfterLiked.Post.ViewerLiked, "viewer like object should exist")

	require.Equal(t, 1, postAfterLiked.Post.Likes, "post has 1 like")

	removeLikeWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.RemovePostLike, mock.Anything)

	var undoLikePost UndoLikePost

	err = client.Mutate(context.Background(), &undoLikePost, map[string]interface{}{
		"input": types.UndoLikePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error removing like from post")

	newEnv := getWorkflowEnvironment(t)
	newEnv.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	removeLikeWorkflowExecution.FindAndExecuteWorkflow(t, newEnv)
	require.True(t, newEnv.IsWorkflowCompleted())
	require.NoError(t, newEnv.GetWorkflowError())

	postAfterLikeRemoved := getPostWithViewerLike(t, testingAccountId, postId)

	require.Equal(t, 0, postAfterLikeRemoved.Post.Likes, "post has 0 likes")
	require.Nil(t, postAfterLikeRemoved.Post.ViewerLiked, "viewer like object should no longer exist")
}
