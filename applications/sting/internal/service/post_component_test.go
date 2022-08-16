package service_test

import (
	"context"
	"encoding/base64"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type PostModified struct {
	ID          relay.ID
	Reference   string
	Contributor struct {
		Id string
	}
	State               types.PostState
	Description         string
	Characters          []CharacterModified
	Audience            *AudienceModified
	Categories          []CategoryModified
	Content             []types.PostContent
	SupporterOnlyStatus types.SupporterOnlyStatus
}

type Post struct {
	Post *PostModified `graphql:"post(reference: $reference)"`
}

func getPost(t *testing.T, client *graphql.Client, id string) Post {

	var post Post

	err := client.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(id),
	})

	require.NoError(t, err)

	return post
}

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
	} `graphql:"posts(audienceSlugs: $audienceSlugs, categorySlugs: $categorySlugs, characterSlugs: $characterSlugs, seriesSlugs: $seriesSlugs, state: $state, supporterOnlyStatus: $supporterOnlyStatus)"`
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

type UpdatePostContentIsSupporterOnly struct {
	UpdatePostContentIsSupporterOnly *struct {
		Post *PostModified
	} `graphql:"updatePostContentIsSupporterOnly(input: $input)"`
}

type UpdatePostDescription struct {
	UpdatePostDescription *struct {
		Post *PostModified
	} `graphql:"updatePostDescription(input: $input)"`
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
		Post *PostModified
	} `graphql:"submitPost(input: $input)"`
}

type DisableClubSupporterOnlyPosts struct {
	DisableClubSupporterOnlyPosts *struct {
		Club *ClubModified
	} `graphql:"disableClubSupporterOnlyPosts(input: $input)"`
}

type EnableClubSupporterOnlyPosts struct {
	EnableClubSupporterOnlyPosts *struct {
		Club *ClubModified
	} `graphql:"enableClubSupporterOnlyPosts(input: $input)"`
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

type ClubPosts struct {
	Entities []struct {
		Club struct {
			ID    string
			Posts *struct {
				Edges []*struct {
					Node PostModified
				}
			} `graphql:"posts(supporterOnlyStatus: $supporterOnlyStatus)"`
		} `graphql:"... on Club"`
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

	staffAccountId := uuid.New().String()
	mockAccountStaff(t, staffAccountId)

	staffClient := getGraphqlClientWithAuthenticatedAccount(t, staffAccountId)

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var createPost CreatePost

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

	resourceIds := []string{"00be69a89e31d28cf8e79b7373d505c7", "01af3cada165015c65f341dd2d21a04a", "04ba807328b59c911a8a37f80447e16a"}

	// update with new content (1 file)
	var addPostContent AddPostContent

	err = client.Mutate(context.Background(), &addPostContent, map[string]interface{}{
		"input": types.AddPostContentInput{
			ID:      newPostId,
			Content: resourceIds,
		},
	})

	require.NoError(t, err)

	require.Len(t, addPostContent.AddPostContent.Post.Content, 3, "should have 3 content")

	require.False(t, addPostContent.AddPostContent.Post.Content[0].IsSupporterOnly, "should not be supporter only content #1")
	require.False(t, addPostContent.AddPostContent.Post.Content[1].IsSupporterOnly, "should not be supporter only content #2")

	require.True(t, addPostContent.AddPostContent.Post.Content[0].ViewerCanViewSupporterOnlyContent, "should be able to view content #1")
	require.True(t, addPostContent.AddPostContent.Post.Content[1].ViewerCanViewSupporterOnlyContent, "should be able to view content #2")

	// quickly reverse the list
	var reversedContentIds []relay.ID

	secondIdContent := addPostContent.AddPostContent.Post.Content[0].ID

	reversedContentIds = append(reversedContentIds, addPostContent.AddPostContent.Post.Content[1].ID)
	reversedContentIds = append(reversedContentIds, secondIdContent)
	reversedContentIds = append(reversedContentIds, addPostContent.AddPostContent.Post.Content[2].ID)

	var updatePostContentOrder UpdatePostContentOrder

	// update order
	err = client.Mutate(context.Background(), &updatePostContentOrder, map[string]interface{}{
		"input": types.UpdatePostContentOrderInput{
			ID:         newPostId,
			ContentIds: reversedContentIds,
		},
	})

	require.NoError(t, err, "no error updating the order")

	require.Len(t, updatePostContentOrder.UpdatePostContentOrder.Post.Content, 3, "should have 3 content")

	var newContentIds []relay.ID

	newContentIds = append(newContentIds, updatePostContentOrder.UpdatePostContentOrder.Post.Content[0].ID)
	newContentIds = append(newContentIds, updatePostContentOrder.UpdatePostContentOrder.Post.Content[1].ID)
	newContentIds = append(newContentIds, updatePostContentOrder.UpdatePostContentOrder.Post.Content[2].ID)

	require.Equal(t, reversedContentIds, newContentIds, "list should still be reversed")

	var updatePostContentIsSupporterOnly UpdatePostContentIsSupporterOnly

	// update order
	err = client.Mutate(context.Background(), &updatePostContentIsSupporterOnly, map[string]interface{}{
		"input": types.UpdatePostContentIsSupporterOnlyInput{
			ID:              newPostId,
			ContentIds:      []relay.ID{secondIdContent},
			IsSupporterOnly: true,
		},
	})

	require.NoError(t, err, "no error updating supporter only content")

	require.False(t, updatePostContentIsSupporterOnly.UpdatePostContentIsSupporterOnly.Post.Content[0].IsSupporterOnly, "should not be supporter only content #1")
	require.True(t, updatePostContentIsSupporterOnly.UpdatePostContentIsSupporterOnly.Post.Content[1].IsSupporterOnly, "should be supporter only content #2")

	require.True(t, updatePostContentIsSupporterOnly.UpdatePostContentIsSupporterOnly.Post.Content[0].ViewerCanViewSupporterOnlyContent, "should be able to view content #1")
	require.True(t, updatePostContentIsSupporterOnly.UpdatePostContentIsSupporterOnly.Post.Content[1].ViewerCanViewSupporterOnlyContent, "should be able to view content #2")

	var post Post
	err = client.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(newPostReference),
	})
	require.NoError(t, err)

	require.Equal(t, types.SupporterOnlyStatusPartial, post.Post.SupporterOnlyStatus, "should be partial supporter only status")

	var removePostContent RemovePostContent

	// remove 1 post content
	err = client.Mutate(context.Background(), &removePostContent, map[string]interface{}{
		"input": types.RemovePostContentInput{
			ID:         newPostId,
			ContentIds: []relay.ID{addPostContent.AddPostContent.Post.Content[2].ID},
		},
	})

	require.NoError(t, err)

	require.Len(t, removePostContent.RemovePostContent.Post.Content, 2, "should have 2 content")

	description := "test description for the post 😀 😃 😄 😁 😆 😅 😂 🤣"

	// update the post description
	var updatePostDescription UpdatePostDescription

	err = client.Mutate(context.Background(), &updatePostDescription, map[string]interface{}{
		"input": types.UpdatePostDescriptionInput{
			ID:          newPostId,
			Description: description,
			Locale:      "en",
		},
	})

	require.NoError(t, err, "no error updating the post description")

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
	require.Equal(t, "Transmit", updatePostCategories.UpdatePostCategories.Post.Categories[0].Title)
	require.Equal(t, "Alter", updatePostCategories.UpdatePostCategories.Post.Categories[1].Title)
	require.Equal(t, "Convict", updatePostCategories.UpdatePostCategories.Post.Categories[2].Title)

	// update with new characters
	var updatePostCharacters UpdatePostCharacters

	err = client.Mutate(context.Background(), &updatePostCharacters, map[string]interface{}{
		"input": types.UpdatePostCharactersInput{
			ID:           newPostId,
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
			ID:         newPostId,
			AudienceID: "QXVkaWVuY2U6MXBjS2lRTDdkZ1VXOENJTjd1TzF3cUZhTXFs",
		},
	})

	require.NoError(t, err)

	require.NotNil(t, updatePostAudience.UpdatePostAudience.Post.Audience)
	require.Equal(t, "Standard Audience", updatePostAudience.UpdatePostAudience.Post.Audience.Title)

	// check if post is in account's drafts
	refreshPostESIndex(t)

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
	require.Equal(t, 1, len(accountPosts.Entities[0].Account.Posts.Edges))

	// make sure we got an error for viewing a post unauthenticated
	client2 := getGraphqlClient(t)

	err = client2.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(newPostReference),
	})
	require.Error(t, err)

	// mark resources as processed in order to be able to submit
	grpcClient := getGrpcCallbackClient(t)

	var targets []*proto.Resource

	for v, id := range resourceIds {
		if v == 2 {
			break
		}
		targets = append(targets, &proto.Resource{
			Id:          id,
			ItemId:      newPostReference,
			Type:        proto.ResourceType_IMAGE,
			Processed:   true,
			ProcessedId: uuid.New().String(),
			MimeTypes:   []string{"image/png"},
			Private:     true,
			Width:       100,
			Height:      100,
			Token:       "POST",
		})
	}

	_, err = grpcClient.UpdateResources(context.Background(), &proto.UpdateResourcesRequest{Resources: targets})
	require.NoError(t, err, "no error updating resources")

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.SubmitPost, mock.Anything)

	// finally, submit the post for review
	var submitPost SubmitPost

	err = client.Mutate(context.Background(), &submitPost, map[string]interface{}{
		"input": types.SubmitPostInput{
			ID: newPostId,
		},
	})

	require.NoError(t, err)

	postId := submitPost.SubmitPost.Post.Reference

	env := getWorkflowEnvironment()

	// signal workflow that resources were processed
	application.TemporalClient.On("SignalWorkflow", mock.Anything, mock.Anything, "", workflows.SubmitPostSignalChannel, true).
		Run(
			func(args mock.Arguments) {
				env.SignalWorkflow(workflows.SubmitPostSignalChannel, true)
			},
		).
		Return(nil).
		Once()

	// update callback
	env.RegisterDelayedCallback(func() {
		pst := getPostFromAdapter(t, postId)
		_, err = grpcClient.UpdateResources(context.Background(), &proto.UpdateResourcesRequest{Resources: []*proto.Resource{
			{
				Id:          pst.Content()[1].ResourceHidden().ID(),
				ItemId:      submitPost.SubmitPost.Post.Reference,
				Processed:   true,
				Type:        proto.ResourceType_IMAGE,
				ProcessedId: uuid.New().String(),
				Private:     false,
				Width:       100,
				Height:      100,
				Token:       "POST_PRIVATE_CONTENT",
			},
		}})
		require.NoError(t, err, "no error updating resource")
	}, time.Millisecond)

	env.OnRequestCancelExternalWorkflow(mock.Anything, mock.Anything, mock.Anything).
		Run(
			func(args mock.Arguments) {

			},
		).
		Return(nil).
		Once()

	workflowExecution.FindAndExecuteWorkflow(t, env)

	// refresh ES index or we wont see it
	refreshPostESIndex(t)

	testAccount := uuid.New().String()
	mockAccountNormal(t, testAccount)
	client = getGraphqlClientWithAuthenticatedAccount(t, testAccount)

	post = getPost(t, client, postId)

	// check to make sure post is in published state
	require.Equal(t, types.PostStatePublished, post.Post.State)
	require.Equal(t, 2, len(post.Post.Content), "should have only 2 content at the end")

	// this specific account ID will make sure that the club linked to this post will be part of its supporter list

	testAccountClubSupporter := uuid.New().String()
	mockAccountNormal(t, testAccountClubSupporter)

	// make this account a supporter
	env = getWorkflowEnvironment()
	env.ExecuteWorkflow(workflows.AddClubSupporter, workflows.AddClubSupporterInput{
		ClubId:      clubId,
		AccountId:   testAccountClubSupporter,
		SupportedAt: time.Now(),
	})
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	client = getGraphqlClientWithAuthenticatedAccount(t, testAccountClubSupporter)

	post = getPost(t, client, postId)

	require.True(t, post.Post.Content[0].ViewerCanViewSupporterOnlyContent, "can view first content because its free")
	require.False(t, post.Post.Content[0].IsSupporterOnly, "can view content since its marked as non supporter")

	require.Len(t, post.Post.Content[0].Resource.Urls, 1, "should have 1 url")
	for _, urls := range post.Post.Content[0].Resource.Urls {
		require.Contains(t, urls.URL, "Key-Pair-Id", "should be private content")
	}

	require.True(t, post.Post.Content[1].ViewerCanViewSupporterOnlyContent, "can view supporter only because they are a supporter")
	require.True(t, post.Post.Content[1].IsSupporterOnly, "cant view first content because its supporter only")
	require.Nil(t, post.Post.Content[1].SupporterOnlyResource, "supporter only resource is nil")

	require.Len(t, post.Post.Content[1].Resource.Urls, 1, "should have 1 url")
	for _, urls := range post.Post.Content[1].Resource.Urls {
		require.Contains(t, urls.URL, "Key-Pair-Id", "should be private content")
	}

	require.Equal(t, description, post.Post.Description, "should have the correct post description")

	originalId := post.Post.Content[1].Resource.ID

	// make a random client so we can test post permissions
	client = getGraphqlClientWithAuthenticatedAccount(t, testAccount)

	post = getPost(t, client, postId)

	require.True(t, post.Post.Content[0].ViewerCanViewSupporterOnlyContent, "can view first content because its free")
	require.False(t, post.Post.Content[0].IsSupporterOnly, "can view content since its marked as non supporter")

	require.False(t, post.Post.Content[1].ViewerCanViewSupporterOnlyContent, "cant view first content because its supporter only")
	require.True(t, post.Post.Content[1].IsSupporterOnly, "cant view first content because its supporter only")
	require.NotNil(t, post.Post.Content[1].SupporterOnlyResource, "can view supporter only resource")

	sDec, _ := base64.StdEncoding.DecodeString(post.Post.Content[1].Resource.ID.GetID())
	resourceId := relay.ID(sDec).GetID()

	require.NotEmpty(t, resourceId, "should not be empty")
	require.NotEqual(t, originalId.GetID(), post.Post.Content[1].Resource.ID.GetID(), "should show a different id")

	client = getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var posts Posts

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"supporterOnlyStatus": []types.SupporterOnlyStatus{},
		"state":               types.PostStatePublished,
		"categorySlugs":       []graphql.String{},
		"seriesSlugs":         []graphql.String{},
		"characterSlugs":      []graphql.String{},
		"audienceSlugs":       []graphql.String{},
	})

	require.NoError(t, err, "no error searching for published")
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found the post in published state")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"supporterOnlyStatus": []types.SupporterOnlyStatus{},
		"state":               types.PostStatePublished,
		"categorySlugs":       []graphql.String{"Alter"},
		"characterSlugs":      []graphql.String{},
		"audienceSlugs":       []graphql.String{},
		"seriesSlugs":         []graphql.String{},
	})

	require.NoError(t, err, "no error searching for category")
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found post with category")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"supporterOnlyStatus": []types.SupporterOnlyStatus{},
		"state":               types.PostStatePublished,
		"characterSlugs":      []graphql.String{"AarushHills"},
		"categorySlugs":       []graphql.String{},
		"audienceSlugs":       []graphql.String{},
		"seriesSlugs":         []graphql.String{"CatCanDance"},
	})

	require.NoError(t, err, "no error searching for character")
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found post with character")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"supporterOnlyStatus": []types.SupporterOnlyStatus{},
		"state":               types.PostStatePublished,
		"audienceSlugs":       []graphql.String{"StandardAudience"},
		"characterSlugs":      []graphql.String{},
		"categorySlugs":       []graphql.String{},
		"seriesSlugs":         []graphql.String{},
	})

	require.NoError(t, err, "no error searching for audience")
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found post with audience")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"supporterOnlyStatus": []types.SupporterOnlyStatus{},
		"state":               types.PostStatePublished,
		"characterSlugs":      []graphql.String{},
		"categorySlugs":       []graphql.String{},
		"audienceSlugs":       []graphql.String{},
		"seriesSlugs":         []graphql.String{"CatCanDance"},
	})

	require.NoError(t, err, "no error searching for series")
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found post with series")

	err = client.Query(context.Background(), &posts, map[string]interface{}{
		"supporterOnlyStatus": []types.SupporterOnlyStatus{types.SupporterOnlyStatusPartial},
		"state":               types.PostStatePublished,
		"categorySlugs":       []graphql.String{},
		"seriesSlugs":         []graphql.String{},
		"characterSlugs":      []graphql.String{},
		"audienceSlugs":       []graphql.String{},
	})

	require.NoError(t, err, "no error searching for supporter only status")
	require.GreaterOrEqual(t, len(posts.Posts.Edges), 1, "found the post in supporter only state")

	// make sure getPost works, and correct data is assigned
	stingClient := getGrpcClient(t)
	_, e := stingClient.GetPost(context.Background(), &sting.PostRequest{Id: postId})
	require.NoError(t, e)

	var postsEntities PostsEntities
	err = client.Query(context.Background(), &postsEntities, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         newPostId,
			},
		},
	})
	require.NoError(t, err, "no error grabbing entities")

	require.Len(t, postsEntities.Entities, 1, "should have found the post")

	var clubPosts ClubPosts

	err = client.Query(context.Background(), &clubPosts, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         convertClubIdToRelayId(clubId),
			},
		},
		"supporterOnlyStatus": []types.SupporterOnlyStatus{types.SupporterOnlyStatusNone},
	})
	require.NoError(t, err)
	require.Equal(t, 0, len(clubPosts.Entities[0].Club.Posts.Edges), "no posts for none supporter status")

	err = client.Query(context.Background(), &clubPosts, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         convertClubIdToRelayId(clubId),
			},
		},
		"supporterOnlyStatus": []types.SupporterOnlyStatus{types.SupporterOnlyStatusPartial, types.SupporterOnlyStatusFull},
	})
	require.NoError(t, err)
	require.Equal(t, 1, len(clubPosts.Entities[0].Club.Posts.Edges), "1 post for supporter only status partial")

	// SHOULD BE ABLE TO SUPPORT CLUB SINCE WE POSTED AT LEAST 1 PREMIUM POST
	clubViewer := getClub(t, client, clb.Slug())
	require.True(t, clubViewer.Club.CanSupport, "should be able to support now that the club has created a new post")
	require.NotNil(t, clubViewer.Club.NextSupporterPostTime, "should have a next supporter post time now")
	require.NotNil(t, clubViewer.Club.Banner, "banner should now be present after creating a post")
	require.True(t, clubViewer.Club.CanCreateSupporterOnlyPosts, "should be able to create supporter only posts")

	var disableSupporterOnlyPosts DisableClubSupporterOnlyPosts

	err = staffClient.Mutate(context.Background(), &disableSupporterOnlyPosts, map[string]interface{}{
		"input": types.DisableClubSupporterOnlyPostsInput{
			ClubID: clubViewer.Club.ID,
		},
	})

	require.NoError(t, err, "no error disabling supporter only posts")

	require.False(t, disableSupporterOnlyPosts.DisableClubSupporterOnlyPosts.Club.CanSupport, "can support is now false")
	require.Nil(t, disableSupporterOnlyPosts.DisableClubSupporterOnlyPosts.Club.NextSupporterPostTime, "no next supporter post time since it was disabled")
	require.False(t, disableSupporterOnlyPosts.DisableClubSupporterOnlyPosts.Club.CanCreateSupporterOnlyPosts, "cannot create supporter only posts anymore")

	clubViewer = getClub(t, client, clb.Slug())
	require.False(t, clubViewer.Club.CanSupport, "can support is now false")
	require.Nil(t, clubViewer.Club.NextSupporterPostTime, "no next supporter post time since it was disabled")
	require.False(t, clubViewer.Club.CanCreateSupporterOnlyPosts, "cannot create supporter only posts anymore")

	var enableSupporterOnlyPosts EnableClubSupporterOnlyPosts

	err = staffClient.Mutate(context.Background(), &enableSupporterOnlyPosts, map[string]interface{}{
		"input": types.EnableClubSupporterOnlyPostsInput{
			ClubID: clubViewer.Club.ID,
		},
	})

	require.True(t, enableSupporterOnlyPosts.EnableClubSupporterOnlyPosts.Club.CanCreateSupporterOnlyPosts, "can create supporter only posts")
	clubViewer = getClub(t, client, clb.Slug())
	require.True(t, clubViewer.Club.CanCreateSupporterOnlyPosts, "can create supporter only posts")
}

func TestCreatePost_Publish(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	pst := seedReviewPost(t, testingAccountId, clubId)
	postId := pst.ID()

	stingClient := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.PublishPost, mock.Anything)

	_, e := stingClient.PublishPost(context.Background(), &sting.PostRequest{Id: postId})
	require.NoError(t, e)

	env := getWorkflowEnvironment()

	env.OnRequestCancelExternalWorkflow(mock.Anything, mock.Anything, mock.Anything).
		Run(
			func(args mock.Arguments) {

			},
		).
		Return(nil).
		Once()

	workflowExecution.FindAndExecuteWorkflow(t, env)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	post := getPost(t, client, postId)

	// post should now be published
	require.Equal(t, types.PostStatePublished, post.Post.State)
}

// Test_CreatePost_Discard - discard post
func TestCreatePost_Discard(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	pst := seedPublishingPost(t, testingAccountId, clubId)
	postId := pst.ID()

	stingClient := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.DiscardPost, mock.Anything)

	// "discard" pending post
	_, e := stingClient.DiscardPost(context.Background(), &sting.PostRequest{Id: postId})
	require.NoError(t, e)

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	post := getPost(t, client, postId)

	// check to make sure post is in a discarded state
	require.Equal(t, types.PostStateDiscarded, post.Post.State)
}

type DeletePost struct {
	DeletePost *struct {
		PostId *relay.ID
	} `graphql:"deletePost(input: $input)"`
}

// Test_CreatePost_Reject - reject post, and then delete it
func TestCreatePost_Reject_and_delete(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	pst := seedPublishingPost(t, testingAccountId, clubId)
	postId := pst.ID()

	stingClient := getGrpcClient(t)

	// "reject" pending post
	_, err := stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
	require.NoError(t, err, "no error rejecting a post")

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	post := getPost(t, client, postId)

	// make sure post is in rejected state
	require.Equal(t, types.PostStateRejected, post.Post.State)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.DeletePost, mock.Anything)

	var deletePost DeletePost

	err = client.Mutate(context.Background(), &deletePost, map[string]interface{}{
		"input": types.DeletePostInput{
			ID: convertPostIdToRelayId(postId),
		},
	})

	require.NoError(t, err, "no error deleting")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	post = getPost(t, client, postId)

	require.Nil(t, post.Post, "post should not have been found")
}

// TestCreatePost_Remove - remove post
func TestCreatePost_Remove(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	pst := seedPublishingPost(t, testingAccountId, clubId)
	postId := pst.ID()

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.RemovePost, mock.Anything)

	stingClient := getGrpcClient(t)

	// "remove" pending post
	_, e := stingClient.RemovePost(context.Background(), &sting.PostRequest{Id: postId})
	require.NoError(t, e)

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	post := getPost(t, client, postId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStateRemoved, post.Post.State)
}
