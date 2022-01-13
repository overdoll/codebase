package service_test

import (
	"context"
	"testing"
	"time"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type PostWithViewerLike struct {
	ID          string
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

// TestLikePost_and_undo - like a post, check viewer, and then also undo the like
func TestLikePost_and_undo(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	publishedPost := seedPublishedPost(t, testingAccountId)
	postId := publishedPost.ID()
	relayId := convertPostIdToRelayId(postId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var likePost LikePost

	err := client.Mutate(context.Background(), &likePost, map[string]interface{}{
		"input": types.LikePostInput{
			PostID: relayId,
		},
	})

	require.NoError(t, err, "no error liking a post")

	env := getWorkflowEnvironment(t)

	env.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	env.ExecuteWorkflow(workflows.AddPostLike, postId)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// refresh ES index or we wont see it
	refreshPostESIndex(t)

	postAfterLiked := getPostWithViewerLike(t, testingAccountId, postId)

	require.NotNil(t, postAfterLiked.Post.ViewerLiked, "viewer like object should exist")

	require.Equal(t, 1, postAfterLiked.Post.Likes, "post has 1 like")

	var undoLikePost UndoLikePost

	err = client.Mutate(context.Background(), &undoLikePost, map[string]interface{}{
		"input": types.UndoLikePostInput{
			PostID: relayId,
		},
	})

	require.NoError(t, err, "no error removing like from post")

	env = getWorkflowEnvironment(t)

	env.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	env.ExecuteWorkflow(workflows.RemovePostLike, postId)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	postAfterLikeRemoved := getPostWithViewerLike(t, testingAccountId, postId)

	require.Equal(t, 0, postAfterLikeRemoved.Post.Likes, "post has 0 likes")
	require.Nil(t, postAfterLikeRemoved.Post.ViewerLiked, "viewer like object should no longer exist")
}
