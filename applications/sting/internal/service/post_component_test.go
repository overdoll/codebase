package service_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"overdoll/libraries/uuid"
	"testing"
	"time"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/graphql/relay"
)

type PostModified struct {
	ID        relay.ID
	Reference string
	Moderator *struct {
		Id string
	}
	Contributor struct {
		Id string
	}
	State      types.PostState
	Characters []CharacterModified
	Audience   *AudienceModified
	Club       struct {
		Id string
	}
	Categories []CategoryModified
	Content    []types.Resource
}

type Post struct {
	Post *PostModified `graphql:"post(reference: $reference)"`
}

func getPost(t *testing.T, id string) Post {

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

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
	} `graphql:"createPost(input: $input)"`
}

type Posts struct {
	Posts *struct {
		Edges []*struct {
			Node PostModified
		}
	} `graphql:"posts(audienceSlugs: $audienceSlugs, categorySlugs: $categorySlugs, characterSlugs: $characterSlugs, seriesSlugs: $seriesSlugs, state: $state)"`
}

type AddPostContent struct {
	AddPostContent *struct {
		Post *PostModified
	} `graphql:"addPostContent(input: $input)"`
}

type UpdatePostContentOrder struct {
	UpdatePostContentOrder *struct {
		Post *PostModified
	} `graphql:"updatePostContentOrder(input: $input)"`
}

type RemovePostContent struct {
	RemovePostContent *struct {
		Post *PostModified
	} `graphql:"removePostContent(input: $input)"`
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
type AccountPosts struct {
	Entities []struct {
		Account struct {
			ID    string
			Posts *struct {
				Edges []*struct {
					Node PostModified
				}
			} `graphql:"posts(state: $state)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
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

type PostsEntities struct {
	Entities []struct {
		Post PostModified `graphql:"... on Post"`
	} `graphql:"_entities(representations: $representations)"`
}

// TestCreatePost_Submit_and_review - do a complete post flow (create post, add all necessary options, and then submit it)
// then, we test our GRPC endpoints for revoking
func TestCreatePost_Submit_and_publish(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	moderatorAccountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var createPost CreatePost

	clubId := ksuid.New().String()

	relayId := convertClubIdToRelayId(clubId)

	err := client.Mutate(context.Background(), &createPost, map[string]interface{}{
		"input": types.CreatePostInput{
			ClubID: relayId,
		},
	})

	require.NoError(t, err, "no error creating a post")

	newPostId := createPost.CreatePost.Post.ID
	newPostReference := createPost.CreatePost.Post.Reference

	// check to make sure post is in a draft state
	require.Equal(t, types.PostStateDraft, createPost.CreatePost.Post.State)

	// update with new content (1 file)
	var addPostContent AddPostContent

	err = client.Mutate(context.Background(), &addPostContent, map[string]interface{}{
		"input": types.AddPostContentInput{
			ID:      relay.ID(newPostId),
			Content: []string{uuid.New().String(), uuid.New().String()},
		},
	})

	require.NoError(t, err)

	require.Len(t, addPostContent.AddPostContent.Post.Content, 2, "should have 2 content")

	// quickly reverse the list
	var reversedContentIds []relay.ID

	reversedContentIds = append(reversedContentIds, addPostContent.AddPostContent.Post.Content[1].ID)
	reversedContentIds = append(reversedContentIds, addPostContent.AddPostContent.Post.Content[0].ID)

	var updatePostContentOrder UpdatePostContentOrder

	// update order
	err = client.Mutate(context.Background(), &updatePostContentOrder, map[string]interface{}{
		"input": types.UpdatePostContentOrderInput{
			ID:         relay.ID(newPostId),
			ContentIds: reversedContentIds,
		},
	})

	require.NoError(t, err, "no error updating the order")

	require.Len(t, updatePostContentOrder.UpdatePostContentOrder.Post.Content, 2, "should have 2 content")

	var newContentIds []relay.ID

	newContentIds = append(newContentIds, updatePostContentOrder.UpdatePostContentOrder.Post.Content[0].ID)
	newContentIds = append(newContentIds, updatePostContentOrder.UpdatePostContentOrder.Post.Content[1].ID)

	require.Equal(t, reversedContentIds, newContentIds, "list should still be reversed")

	var removePostContent RemovePostContent

	// remove 1 post content
	err = client.Mutate(context.Background(), &removePostContent, map[string]interface{}{
		"input": types.RemovePostContentInput{
			ID:         relay.ID(newPostId),
			ContentIds: []relay.ID{addPostContent.AddPostContent.Post.Content[0].ID},
		},
	})

	require.NoError(t, err)

	require.Len(t, removePostContent.RemovePostContent.Post.Content, 1, "should have 1 content")

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

	// check if post is in account's drafts
	es := bootstrap.InitializeElasticSearchSession()
	_, err = es.Refresh(adapters.PostIndexName).Do(context.Background())
	require.NoError(t, err)

	var accountPosts AccountPosts
	err = client.Query(context.Background(), &accountPosts, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(testingAccountId),
			},
		},
		"state": types.PostStateDraft,
	})
	require.NoError(t, err)
	require.GreaterOrEqual(t, len(accountPosts.Entities[0].Account.Posts.Edges), 1)

	// make sure we got an error for viewing a post unauthenticated
	client2 := getGraphqlClient(t)
	var post Post
	err = client2.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(newPostReference),
	})
	require.Error(t, err)

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

	env := getWorkflowEnvironment(t)
	postId := submitPost.SubmitPost.Post.Reference

	// we need to submit the post, in which our tests will do an action
	env.RegisterDelayedCallback(func() {

		// refresh ES index or we wont see it
		refreshPostESIndex(t)

		// at this point, our post is put into the moderation queue. check for existence here
		// grab all pending posts for our moderator
		client := getGraphqlClientWithAuthenticatedAccount(t, moderatorAccountId)

		var accountModeratorPosts AccountModeratorPosts

		err := client.Query(context.Background(), &accountModeratorPosts, map[string]interface{}{
			"representations": []_Any{
				{
					"__typename": "Account",
					"id":         convertAccountIdToRelayId(moderatorAccountId),
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

		newEnv.RegisterWorkflow(workflows.UpdateTotalPostsForPostTags)

		// execute workflow manually since it wont be executed right here
		newEnv.ExecuteWorkflow(workflows.PublishPost, postId)
		require.True(t, newEnv.IsWorkflowCompleted())
		require.NoError(t, newEnv.GetWorkflowError())
	}, time.Hour*24)

	env.ExecuteWorkflow(workflows.SubmitPost, postId)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// refresh ES index or we wont see it
	refreshPostESIndex(t)

	post = getPost(t, postId)

	// check to make sure post is in published state
	require.Equal(t, types.PostStatePublished, post.Post.State)
	require.Equal(t, 1, len(post.Post.Content), "should have only 1 content at the end")

	client = getGraphqlClientWithAuthenticatedAccount(t, moderatorAccountId)

	// query accountPosts once more, make sure post is no longer visible
	var newAccountPosts AccountModeratorPosts

	err = client.Query(context.Background(), &newAccountPosts, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(moderatorAccountId),
			},
		},
	})

	require.NoError(t, err)

	exists := false

	for _, post := range newAccountPosts.Entities[0].Account.ModeratorPostsQueue.Edges {
		if post.Node.Reference == postId {
			exists = true
			break
		}
	}

	require.False(t, exists, "should no longer be in the moderator posts queue")

	client = getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var posts Posts

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"state":          types.PostStatePublished,
		"categorySlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
		"characterSlugs": []graphql.String{},
		"audienceSlugs":  []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found the post in published state")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"state":          types.PostStatePublished,
		"categorySlugs":  []graphql.String{"alter"},
		"characterSlugs": []graphql.String{},
		"audienceSlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found post with category")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"state":          types.PostStatePublished,
		"characterSlugs": []graphql.String{"aarush_hills"},
		"categorySlugs":  []graphql.String{},
		"audienceSlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found post with character")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"state":          types.PostStatePublished,
		"audienceSlugs":  []graphql.String{"standard_audience"},
		"characterSlugs": []graphql.String{},
		"categorySlugs":  []graphql.String{},
		"seriesSlugs":    []graphql.String{},
	})

	require.NoError(t, err)
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found post with audience")

	// make sure getPost works, and correct data is assigned
	stingClient := getGrpcClient(t)
	data, e := stingClient.GetPost(context.Background(), &sting.PostRequest{Id: postId})
	require.NoError(t, e)
	require.Equal(t, relay.NewMustUnmarshalFromBase64(post.Post.Contributor.Id).GetID(), data.ContributorId, "should have correct contributor ID assigned")
	require.Equal(t, relay.NewMustUnmarshalFromBase64(post.Post.Moderator.Id).GetID(), data.ModeratorId, "should have correct moderator ID assigned")

	var postsEntities PostsEntities
	err = client.Query(context.Background(), &postsEntities, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         newPostId,
			},
		},
	})
	require.NoError(t, err)

	require.Len(t, postsEntities.Entities, 1, "should have found the post")
}

// Test_CreatePost_Discard - discard post
func TestCreatePost_Discard(t *testing.T) {
	t.Parallel()

	env := getWorkflowEnvironment(t)

	testingAccountId := newFakeAccount(t)

	pst := seedPublishingPost(t, testingAccountId)
	postId := pst.ID()

	// we need to submit the post, in which our tests will do an action
	env.RegisterDelayedCallback(func() {
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
	}, time.Hour*24)

	env.ExecuteWorkflow(workflows.SubmitPost, postId)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	post := getPost(t, postId)

	// check to make sure post is in a dicarded state
	require.Equal(t, types.PostStateDiscarded, post.Post.State)
	require.Len(t, post.Post.Content, 0)
}

// Test_CreatePost_Reject - reject post
func TestCreatePost_Reject(t *testing.T) {
	t.Parallel()

	env := getWorkflowEnvironment(t)

	testingAccountId := newFakeAccount(t)

	pst := seedPublishingPost(t, testingAccountId)
	postId := pst.ID()

	// we need to submit the post, in which our tests will do an action
	env.RegisterDelayedCallback(func() {

		stingClient := getGrpcClient(t)

		// "reject" pending post
		_, e := stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
		require.NoError(t, e)

		post := getPost(t, postId)

		// make sure post is in rejected state
		require.Equal(t, types.PostStateRejected, post.Post.State)

	}, time.Hour*24)

	env.ExecuteWorkflow(workflows.SubmitPost, postId)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	post := getPost(t, postId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStateRejected, post.Post.State)
}

// TestCreatePost_Remove - remove post
func TestCreatePost_Remove(t *testing.T) {
	t.Parallel()

	env := getWorkflowEnvironment(t)

	testingAccountId := newFakeAccount(t)

	pst := seedPublishingPost(t, testingAccountId)
	postId := pst.ID()

	// we need to submit the post, in which our tests will do an action
	env.RegisterDelayedCallback(func() {
		stingClient := getGrpcClient(t)

		// "remove" pending post
		_, e := stingClient.RemovePost(context.Background(), &sting.PostRequest{Id: postId})
		require.NoError(t, e)

		newEnv := getWorkflowEnvironment(t)
		newEnv.ExecuteWorkflow(workflows.RemovePost, postId)

		require.True(t, newEnv.IsWorkflowCompleted())
		require.NoError(t, newEnv.GetWorkflowError())
	}, time.Hour*24)

	env.ExecuteWorkflow(workflows.SubmitPost, postId)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	post := getPost(t, postId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStateRemoved, post.Post.State)
}
