package service_test

import (
	"context"
	"testing"
	"time"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
)

type CharacterModified struct {
	Name  string
	Media struct {
		Title string
	}
}

type CategoryModified struct {
	Title string
}

type AudienceModified struct {
	Title string
}

type BrandModified struct {
	Name string
}

type PostModified struct {
	ID         string
	Reference  string
	State      types.PostState
	Characters []CharacterModified
	Audience   *AudienceModified
	Brand      *BrandModified
	Categories []CategoryModified
	Content    []types.Resource
}

type Post struct {
	Post *PostModified `graphql:"post(reference: $reference)"`
}

func getPost(t *testing.T, id string) Post {

	client, _ := getGraphqlClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var post Post

	err := client.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(id),
	})

	require.NoError(t, err)

	return post
}

type _Any map[string]interface{}

type AccountPosts struct {
	Entities []struct {
		Account struct {
			ID    string
			Posts *struct {
				Edges []*struct {
					Node PostModified
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type CreatePost struct {
	CreatePost *struct {
		Post *PostModified
	} `graphql:"createPost()"`
}

type UpdatePostContent struct {
	UpdatePostContent *struct {
		Post *PostModified
	} `graphql:"updatePostContent(input: $input)"`
}

type UpdatePostCategories struct {
	UpdatePostCategories *struct {
		Post *PostModified
	} `graphql:"updatePostCategories(input: $input)"`
}

type UpdatePostCharacters struct {
	UpdatePostCharacters *struct {
		Post *PostModified
	} `graphql:"updatePostCharacters(input: $input)"`
}

type UpdatePostBrand struct {
	UpdatePostBrand *struct {
		Post *PostModified
	} `graphql:"updatePostBrand(input: $input)"`
}

type UpdatePostAudience struct {
	UpdatePostAudience *struct {
		Post *PostModified
	} `graphql:"updatePostAudience(input: $input)"`
}

type SubmitPost struct {
	SubmitPost *struct {
		Post     *PostModified
		InReview bool
	} `graphql:"submitPost(input: $input)"`
}

// TestCreatePost_Submit_and_review - do a complete post flow (create post, add all necessary options, and then submit it)
// then, we test our GRPC endpoints for revoking
func TestCreatePost_Submit_and_publish(t *testing.T) {
	t.Parallel()

	pass := passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	client, _ := getGraphqlClient(t, pass)

	var createPost CreatePost

	err := client.Mutate(context.Background(), &createPost, nil)
	require.NoError(t, err)

	newPostId := createPost.CreatePost.Post.ID
	newPostReference := createPost.CreatePost.Post.Reference

	// check to make sure post is in a draft state
	require.Equal(t, types.PostStateDraft, createPost.CreatePost.Post.State)

	// check to make sure post exists for our account
	var accountPosts AccountPosts

	err = client.Query(context.Background(), &accountPosts, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=",
			},
		},
	})

	require.NoError(t, err)

	exists := false

	for _, post := range accountPosts.Entities[0].Account.Posts.Edges {
		if post.Node.ID == newPostId {
			exists = true
		}
	}

	// ensure this post will exist and is assigned to our moderator
	require.True(t, exists)

	// upload some files - this is required before running update command
	tusClient, _ := getTusClient(t, pass)
	fileId := uploadFileWithTus(t, tusClient, "applications/sting/internal/service/file_fixtures/test_file_1.png")

	// update with new content (1 file)
	var updatePostContent UpdatePostContent

	err = client.Mutate(context.Background(), &updatePostContent, map[string]interface{}{
		"input": types.UpdatePostContentInput{
			ID:      relay.ID(newPostId),
			Content: []string{fileId},
		},
	})

	require.NoError(t, err)

	// properly identify the content and stuff
	require.Len(t, updatePostContent.UpdatePostContent.Post.Content, 1)
	require.Equal(t, types.ResourceTypeImage, updatePostContent.UpdatePostContent.Post.Content[0].Type)

	// update with new categories
	var updatePostCategories UpdatePostCategories

	err = client.Mutate(context.Background(), &updatePostCategories, map[string]interface{}{
		"input": types.UpdatePostCategoriesInput{
			ID:          relay.ID(newPostId),
			CategoryIds: []relay.ID{"Q2F0ZWdvcnk6MXE3TUpGazlXb2YxcXlRUU9SS0JySnhHRmhK", "Q2F0ZWdvcnk6MXE3TUpGTVZnRFBvNG1GanNmTmFnNnJSd1J5", "Q2F0ZWdvcnk6MXE3TUpTZUVpYWkzeUZONlBzNjVlQUNGZGU5"},
		},
	})

	require.NoError(t, err)

	// properly identify the content and stuff
	require.Len(t, updatePostCategories.UpdatePostCategories.Post.Characters, 3)
	require.Equal(t, "Transmit", updatePostCategories.UpdatePostCategories.Post.Categories[0].Title)
	require.Equal(t, "Alter", updatePostCategories.UpdatePostCategories.Post.Categories[1].Title)
	require.Equal(t, "Convict", updatePostCategories.UpdatePostCategories.Post.Categories[2].Title)

	// update with new characters
	var updatePostCharacters UpdatePostCharacters

	err = client.Mutate(context.Background(), &updatePostCharacters, map[string]interface{}{
		"input": types.UpdatePostCharactersInput{
			ID:           relay.ID(newPostId),
			CharacterIds: []relay.ID{"Q2hhcmFjdGVyOjFxN01KblFYQXR4ZXIwZmJvQk1IdGxDMEpNZQ=="},
		},
	})

	require.NoError(t, err)

	require.Len(t, updatePostCharacters.UpdatePostCharacters.Post.Characters, 1)
	require.Equal(t, "Aarush Hills", updatePostCharacters.UpdatePostCharacters.Post.Characters[0].Name)

	// update with new brand
	var updatePostBrand UpdatePostBrand

	err = client.Mutate(context.Background(), &updatePostBrand, map[string]interface{}{
		"input": types.UpdatePostBrandInput{
			ID:      relay.ID(newPostId),
			BrandID: "QnJhbmQ6MXBjS1p5b1lGeFpSeWlkVjlYSGQxV3lQYnJq",
		},
	})

	require.NoError(t, err)

	require.NotNil(t, updatePostBrand.UpdatePostBrand.Post.Brand)
	require.Equal(t, "Default Brand", updatePostBrand.UpdatePostBrand.Post.Brand.Name)

	// update with new audience
	var updatePostAudience UpdatePostAudience

	err = client.Mutate(context.Background(), &updatePostAudience, map[string]interface{}{
		"input": types.UpdatePostAudienceInput{
			ID:         relay.ID(newPostId),
			AudienceID: "QXVkaWVuY2U6MXBjS2lRTDdkZ1VXOENJTjd1TzF3cUZhTXFs",
		},
	})

	require.NoError(t, err)

	require.NotNil(t, updatePostAudience.UpdatePostAudience.Post.Audience)
	require.Equal(t, "Standard Audience", updatePostAudience.UpdatePostAudience.Post.Audience.Title)

	// finally, submit the post for review
	var submitPost SubmitPost

	err = client.Mutate(context.Background(), &submitPost, map[string]interface{}{
		"input": types.SubmitPostInput{
			ID: relay.ID(newPostId),
		},
	})

	require.NoError(t, err)
	require.Equal(t, types.PostStateProcessing, submitPost.SubmitPost.Post.State)
	require.Equal(t, true, submitPost.SubmitPost.InReview)

	// now, we do workflows for submissions
	// submitPost comes after
	env := getWorkflowEnvironment(t)

	// we need to publish the post or else it will get stuck in an infinite loop (we reassign the moderator every 24 hours)
	env.RegisterDelayedCallback(func() {

		// setup another environment since we cant execute multiple workflows
		newEnv := getWorkflowEnvironment(t)
		stingClient := getGrpcClient(t)

		// "publish" pending post
		_, e := stingClient.PublishPost(context.Background(), &sting.PostRequest{Id: newPostReference})
		require.NoError(t, e)

		// execute workflow manually since it wont be executed right here
		newEnv.ExecuteWorkflow(workflows.PublishPost, newPostReference)
		require.True(t, newEnv.IsWorkflowCompleted())
		require.NoError(t, newEnv.GetWorkflowError())

	}, time.Hour*24)

	env.ExecuteWorkflow(workflows.SubmitPost, newPostReference)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// ensure that the post is now published
	postState := getPost(t, newPostReference)
	require.Equal(t, types.PostStatePublished, postState.Post.State)
}

//// Test_CreatePost_Discard - discard post
//func TestCreatePost_Discard(t *testing.T) {
//	t.Parallel()
//
//	env := getWorkflowEnvironment(t)
//
//	var newPostId string
//
//	createPost(t, env, func(postId string) func() {
//		return func() {
//			newPostId = postId
//
//			// setup another environment since we cant execute multiple workflows
//			newEnv := getWorkflowEnvironment(t)
//
//			stingClient := getGrpcClient(t)
//
//			// "discard" pending post
//			_, e := stingClient.DiscardPost(context.Background(), &sting.PostRequest{Id: postId})
//			require.NoError(t, e)
//
//			// execute workflow manually since it wont be executed right here
//			newEnv.ExecuteWorkflow(workflows.DiscardPost, postId)
//
//			require.True(t, newEnv.IsWorkflowCompleted())
//			require.NoError(t, newEnv.GetWorkflowError())
//		}
//	})
//
//	pendingPost := getPost(t, newPostId)
//
//	// check to make sure post is in rejected state
//	require.Equal(t, types.PostStateDiscarded, pendingPost.Post.State)
//}
//
//// Test_CreatePost_Reject - reject post
//func TestCreatePost_Reject_undo_reject(t *testing.T) {
//	t.Parallel()
//
//	var newPostId string
//
//	env := getWorkflowEnvironment(t)
//
//	createPost(t, env, func(postId string) func() {
//		return func() {
//			newPostId = postId
//			// setup another environment since we cant execute multiple workflows
//
//			stingClient := getGrpcClient(t)
//
//			// "reject" pending post
//			_, e := stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
//			require.NoError(t, e)
//
//			pendingPost := getPost(t, newPostId)
//
//			// make sure post is in rejected state
//			require.Equal(t, types.PostStateRejected, pendingPost.Post.State)
//
//			// UNDO
//			_, e = stingClient.UndoPost(context.Background(), &sting.PostRequest{Id: postId})
//			require.NoError(t, e)
//
//			newEnv := getWorkflowEnvironment(t)
//			newEnv.ExecuteWorkflow(workflows.UndoPost, postId)
//
//			require.True(t, newEnv.IsWorkflowCompleted())
//			require.NoError(t, newEnv.GetWorkflowError())
//
//			// CHECK STATUS
//
//			pendingPost = getPost(t, newPostId)
//
//			// check to make sure post is still in "review" state (since we did the undo)
//			require.Equal(t, types.PostStateReview, pendingPost.Post.State)
//
//			// need to reject again, or else we will be in an infinite loop
//			_, e = stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
//			require.NoError(t, e)
//		}
//	})
//
//	pendingPost := getPost(t, newPostId)
//
//	// check to make sure post is in rejected state
//	require.Equal(t, types.PostStateRejected, pendingPost.Post.State)
//}
