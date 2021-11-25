package service_test

import (
	"context"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
)

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

	client := getGraphqlClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var post Post

	err := client.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(id),
	})

	require.NoError(t, err)

	return post
}

type _Any map[string]interface{}

type CreatePost struct {
	CreatePost *struct {
		Post *PostModified
	} `graphql:"createPost()"`
}

type Posts struct {
	Posts *struct {
		Edges []*struct {
			Node PostModified
		}
	} `graphql:"posts(brandSlugs: $brandSlugs, audienceSlugs: $audienceSlugs, categorySlugs: $categorySlugs, characterSlugs: $characterSlugs, seriesSlugs: $seriesSlugs, state: $state)"`
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

func createPost(t *testing.T, client *graphql.Client, env *testsuite.TestWorkflowEnvironment, callback func(string) func()) {
	var createPost CreatePost

	err := client.Mutate(context.Background(), &createPost, nil)
	require.NoError(t, err)

	newPostId := createPost.CreatePost.Post.ID
	newPostReference := createPost.CreatePost.Post.Reference

	// check to make sure post is in a draft state
	require.Equal(t, types.PostStateDraft, createPost.CreatePost.Post.State)

	// upload some files - this is required before running update command
	tusClient := getTusClient(t)
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
	require.Equal(t, os.Getenv("APP_URL")+"/api/uploads/"+fileId+".png", string(updatePostContent.UpdatePostContent.Post.Content[0].Urls[0].URL))

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
	require.Len(t, updatePostCategories.UpdatePostCategories.Post.Categories, 3)
	require.Equal(t, "Alter", updatePostCategories.UpdatePostCategories.Post.Categories[0].Title)
	require.Equal(t, "Transmit", updatePostCategories.UpdatePostCategories.Post.Categories[1].Title)
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
			BrandID: "QnJhbmQ6MXE3TUl3MFU2VEVwRUxIMEZxbnhyY1h0M0Uw",
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
	require.Equal(t, true, submitPost.SubmitPost.InReview, "expected post submitted to be in review")

	// we need to submit the post, in which our tests will do an action
	env.RegisterDelayedCallback(callback(newPostReference), time.Hour*24)

	env.ExecuteWorkflow(workflows.SubmitPost, newPostReference)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())
}

type AccountModeratorPosts struct {
	Entities []struct {
		Account struct {
			ID                  string
			ModeratorPostsQueue *struct {
				Edges []*struct {
					Node PostModified
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

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

// TestCreatePost_Submit_and_review - do a complete post flow (create post, add all necessary options, and then submit it)
// then, we test our GRPC endpoints for revoking
func TestCreatePost_Submit_and_publish(t *testing.T) {
	t.Parallel()

	pass := passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	client := getGraphqlClient(t, pass)

	var newPostId string

	env := getWorkflowEnvironment(t)
	es := bootstrap.InitializeElasticSearchSession()

	createPost(t, client, env, func(postId string) func() {
		return func() {
			// need to refresh the ES index or else the post wont be found
			_, err := es.Refresh(adapters.PostIndexName).Do(context.Background())

			newPostId = postId

			// at this point, our post is put into the moderation queue. check for existence here
			// grab all pending posts for our moderator
			client := getGraphqlClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

			var accountModeratorPosts AccountModeratorPosts

			err = client.Query(context.Background(), &accountModeratorPosts, map[string]interface{}{
				"representations": []_Any{
					{
						"__typename": "Account",
						"id":         "QWNjb3VudDoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=",
					},
				},
			})

			require.NoError(t, err)

			exists := false

			for _, post := range accountModeratorPosts.Entities[0].Account.ModeratorPostsQueue.Edges {
				if post.Node.Reference == postId {
					exists = true
				}
			}

			// ensure this post will exist and is assigned to our moderator
			require.True(t, exists, "post exists for moderator")

			// setup another environment since we cant execute multiple workflows
			newEnv := getWorkflowEnvironment(t)

			stingClient := getGrpcClient(t)

			// "publish" pending post
			_, e := stingClient.PublishPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)

			// execute workflow manually since it wont be executed right here
			newEnv.ExecuteWorkflow(workflows.PublishPost, postId)
			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())
		}
	})

	post := getPost(t, newPostId)

	// check to make sure post is in published state
	require.Equal(t, types.PostStatePublished, post.Post.State)
	cont := post.Post.Content[0]
	split := strings.Split(cont.ID, "/")
	require.Equal(t, os.Getenv("STATIC_URL")+"/posts/"+post.Post.Reference+"/"+split[len(split)-1]+".webp", string(cont.Urls[0].URL))

	// refresh index
	_, err := es.Refresh(adapters.PostIndexName).Do(context.Background())
	require.NoError(t, err)

	// query accountPosts once more, make sure post is no longer visible
	var newAccountPosts AccountModeratorPosts

	err = client.Query(context.Background(), &newAccountPosts, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         "QWNjb3VudDoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=",
			},
		},
	})

	require.NoError(t, err)

	exists := false

	for _, post := range newAccountPosts.Entities[0].Account.ModeratorPostsQueue.Edges {
		if post.Node.Reference == newPostId {
			exists = true
			break
		}
	}

	require.False(t, exists, "should no longer be in the moderator posts queue")

	var posts Posts

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"state":          types.PostStatePublished,
		"brandSlugs":     []graphql.String{},
		"categorySlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
		"characterSlugs": []graphql.String{},
		"audienceSlugs":  []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, posts.Posts.Edges, 1)

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"brandSlugs":     []graphql.String{"default_brand"},
		"categorySlugs":  []graphql.String{},
		"characterSlugs": []graphql.String{},
		"audienceSlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, posts.Posts.Edges, 1)

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"categorySlugs":  []graphql.String{"alter"},
		"brandSlugs":     []graphql.String{},
		"characterSlugs": []graphql.String{},
		"audienceSlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, posts.Posts.Edges, 1)

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"characterSlugs": []graphql.String{"aarush_hills"},
		"categorySlugs":  []graphql.String{},
		"brandSlugs":     []graphql.String{},
		"audienceSlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, posts.Posts.Edges, 1)

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"audienceSlugs":  []graphql.String{"standard_audience"},
		"characterSlugs": []graphql.String{},
		"categorySlugs":  []graphql.String{},
		"brandSlugs":     []graphql.String{},
		"seriesSlugs":    []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, posts.Posts.Edges, 1)
}

// Test_CreatePost_Discard - discard post
func TestCreatePost_Discard(t *testing.T) {
	t.Parallel()

	pass := passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	client := getGraphqlClient(t, pass)

	env := getWorkflowEnvironment(t)

	var newPostId string

	createPost(t, client, env, func(postId string) func() {
		return func() {
			newPostId = postId

			// setup another environment since we cant execute multiple workflows
			newEnv := getWorkflowEnvironment(t)

			stingClient := getGrpcClient(t)

			// "discard" pending post
			_, e := stingClient.DiscardPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)

			// execute workflow manually since it wont be executed right here
			newEnv.ExecuteWorkflow(workflows.DiscardPost, postId)

			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())
		}
	})

	post := getPost(t, newPostId)

	// check to make sure post is in a dicarded state
	require.Equal(t, types.PostStateDiscarded, post.Post.State)
	require.Len(t, post.Post.Content, 0)
}

// Test_CreatePost_Reject - reject post
func TestCreatePost_Reject_undo_reject(t *testing.T) {
	t.Parallel()

	pass := passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	client := getGraphqlClient(t, pass)

	env := getWorkflowEnvironment(t)

	var newPostId string

	createPost(t, client, env, func(postId string) func() {
		return func() {
			newPostId = postId
			// setup another environment since we cant execute multiple workflows

			stingClient := getGrpcClient(t)

			// "reject" pending post
			_, e := stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)

			post := getPost(t, newPostId)

			// make sure post is in rejected state
			require.Equal(t, types.PostStateRejected, post.Post.State)

			// UNDO
			_, e = stingClient.UndoPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)

			newEnv := getWorkflowEnvironment(t)
			newEnv.ExecuteWorkflow(workflows.UndoPost, postId)

			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())

			// CHECK STATUS
			post = getPost(t, newPostId)

			// check to make sure post is still in "review" state (since we did the undo)
			require.Equal(t, types.PostStateReview, post.Post.State)

			// need to reject again, or else we will be in an infinite loop
			_, e = stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)
		}
	})

	post := getPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStateRejected, post.Post.State)
}

// TestCreatePost_Remove - remove post
func TestCreatePost_Remove(t *testing.T) {
	t.Parallel()

	pass := passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	client := getGraphqlClient(t, pass)

	env := getWorkflowEnvironment(t)

	var newPostId string

	createPost(t, client, env, func(postId string) func() {
		return func() {
			newPostId = postId
			// setup another environment since we cant execute multiple workflows

			stingClient := getGrpcClient(t)

			// "remove" pending post
			_, e := stingClient.RemovePost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)

			newEnv := getWorkflowEnvironment(t)
			newEnv.ExecuteWorkflow(workflows.RemovePost, postId)

			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())
		}
	})

	post := getPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStateRemoved, post.Post.State)
}
