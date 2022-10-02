package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
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

type ObservePosts struct {
	ObservePosts *struct {
		Posts []*PostWithViewerLike
	} `graphql:"observePosts(input: $input)"`
}

type PostWithViewer struct {
	Post *PostWithViewerLike `graphql:"post(reference: $reference)"`
}

type AccountLikedPosts struct {
	Entities []struct {
		Account struct {
			ID         string
			LikedPosts *struct {
				Edges []*struct {
					Node PostModified
				}
			} `graphql:"likedPosts()"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
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

// TestLikePost_and_undo - like a post, check viewer, and then also undo the like, as well as liking again + deleting
func TestLikePost_and_undo_and_delete(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, uuid.New().String())
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	publishedPost := seedPublishedPost(t, uuid.New().String(), clubId)
	postId := publishedPost.ID()
	relayId := convertPostIdToRelayId(postId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.AddPostLike, mock.Anything)

	var likePost LikePost

	err := client.Mutate(context.Background(), &likePost, map[string]interface{}{
		"input": types.LikePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error liking a post")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	// refresh ES index or we wont see it
	refreshPostESIndex(t)

	postAfterLiked := getPostWithViewerLike(t, testingAccountId, postId)

	require.NotNil(t, postAfterLiked.Post.ViewerLiked, "viewer like object should exist")

	require.Equal(t, 1, postAfterLiked.Post.Likes, "post has 1 like")

	var accountLiked AccountLikedPosts

	err = client.Query(context.Background(), &accountLiked, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(testingAccountId),
			},
		},
	})

	require.NoError(t, err, "no error getting account liked posts")

	require.Equal(t, 1, len(accountLiked.Entities[0].Account.LikedPosts.Edges), "has 1 liked post")

	removeLikeWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.RemovePostLike, mock.Anything)

	var undoLikePost UndoLikePost

	err = client.Mutate(context.Background(), &undoLikePost, map[string]interface{}{
		"input": types.UndoLikePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error removing like from post")

	removeLikeWorkflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	postAfterLikeRemoved := getPostWithViewerLike(t, testingAccountId, postId)

	require.Equal(t, 0, postAfterLikeRemoved.Post.Likes, "post has 0 likes")
	require.Nil(t, postAfterLikeRemoved.Post.ViewerLiked, "viewer like object should no longer exist")

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.AddPostLike, mock.Anything)

	err = client.Mutate(context.Background(), &likePost, map[string]interface{}{
		"input": types.LikePostInput{
			ID: relayId,
		},
	})

	require.NoError(t, err, "no error liking a post")

	var observePosts ObservePosts

	err = client.Mutate(context.Background(), &observePosts, map[string]interface{}{
		"input": types.ObservePostsInput{
			PostIds: []relay.ID{relayId},
		},
	})

	require.NoError(t, err, "failed to observe posts")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.DeleteAccountData, workflows.DeleteAccountDataInput{AccountId: testingAccountId})

	grpcClient := getGrpcClient(t)

	_, err = grpcClient.DeleteAccountData(context.Background(), &sting.DeleteAccountDataRequest{AccountId: testingAccountId})
	require.NoError(t, err, "no error deleting account data")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	postAfterLikeRemoved = getPostWithViewerLike(t, testingAccountId, postId)

	require.Equal(t, 0, postAfterLikeRemoved.Post.Likes, "post has 0 likes")
	require.Nil(t, postAfterLikeRemoved.Post.ViewerLiked, "viewer like object should no longer exist")
}
