package service_test

import (
	"context"
	"log"
	"net/http"
	"os"
	"testing"
	"time"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/applications/sting/internal/service"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const customCharacterName = "test"
const customMediaName = "asdasd"

const StingHttpAddr = ":6666"
const StingHttpClientAddr = "http://:6666/graphql"

const StingGrpcAddr = "localhost:6667"
const StingGrpcClientAddr = "localhost:6667"

type PostModified struct {
	ID                string
	Reference         string
	State             types.PostState
	MediaRequests     []string
	CharacterRequests []*types.CharacterRequestType
	Characters        []CharacterModified
}

type CreatePost struct {
	CreatePost *struct {
		Post   *PostModified
		Review bool
	} `graphql:"createPost(input: $input)"`
}

type Post struct {
	Post *PostModified `graphql:"post(reference: $reference)"`
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

type CharacterModified struct {
	Name  string
	Media struct {
		Title string
	}
}

type SearchCharacters struct {
	Characters struct {
		Edges []struct {
			Node CharacterModified
		}
	} `graphql:"characters(name: $name)"`
}

type SearchCategories struct {
	Categories struct {
		Edges []struct {
			Node struct {
				Title string
			}
		}
	} `graphql:"categories(title: $title)"`
}

type SearchMedia struct {
	Media struct {
		Edges []struct {
			Node struct {
				Title string
			}
		}
	} `graphql:"medias(title: $title)"`
}

func qPendingPost(t *testing.T, id string) Post {

	client, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var post Post

	err := client.Query(context.Background(), &post, map[string]interface{}{
		"reference": graphql.String(id),
	})

	require.NoError(t, err)

	return post
}

func mCreatePost(t *testing.T, env *testsuite.TestWorkflowEnvironment, callback func(string) func()) {
	// we have to create a post as an authenticated user, otherwise it won't let us
	client, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var createPost CreatePost

	artistUsername := "artist_verified"
	id := relay.ID("QWNjb3VudDoxcTdNSXcwVTZURXBFTEgwRnFueHJjWHQzRTA=")
	med := customMediaName

	err := client.Mutate(context.Background(), &createPost, map[string]interface{}{
		"input": types.CreatePostInput{
			Content:       []string{},
			CategoryIds:   []relay.ID{"Q2F0ZWdvcnk6MXE3TUpGazlXb2YxcXlRUU9SS0JySnhHRmhK", "Q2F0ZWdvcnk6MXE3TUpGTVZnRFBvNG1GanNmTmFnNnJSd1J5", "Q2F0ZWdvcnk6MXE3TUpTZUVpYWkzeUZONlBzNjVlQUNGZGU5"},
			CharacterIds:  []relay.ID{"Q2hhcmFjdGVyOjFxN01KblFYQXR4ZXIwZmJvQk1IdGxDMEpNZQ=="},
			MediaRequests: []string{customMediaName},
			CharacterRequests: []*types.CharacterRequest{{
				Name:            customCharacterName,
				CustomMediaName: &med,
			}},
			ExistingArtist:       &id,
			CustomArtistUsername: &artistUsername,
		},
	})

	require.NoError(t, err)
	require.Equal(t, false, createPost.CreatePost.Review)

	postId := createPost.CreatePost.Post.Reference

	// execute workflow, since the graphql wont execute it and only put it into a queue
	// we also get the ability to get workflow state, etc.. in this test

	// when the timer is called (waited 24 hours to select a new moderator), we will update the post before the activity
	// function executes so it doesn't keep looping forever
	env.RegisterDelayedCallback(callback(postId), time.Hour*24)
	env.ExecuteWorkflow(workflows.SubmitPost, postId)

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())
}

// Test_CreatePost_Publish - publish post
func TestCreatePost_Publish(t *testing.T) {
	t.Parallel()

	var newPostId string

	env := getWorkflowEnvironment(t)

	mCreatePost(t, env, func(postId string) func() {
		return func() {
			// need to refresh the ES index or else the post wont be found
			es := bootstrap.InitializeElasticSearchSession()
			_, err := es.Refresh(adapters.PostIndexName).Do(context.Background())

			newPostId = postId

			// at this point, our post is put into the moderation queue. check for existence here
			// grab all pending posts for our moderator
			client, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

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
				if post.Node.Reference == newPostId {
					exists = true
				}
			}

			// ensure this post will exist and is assigned to our moderator
			require.True(t, exists)

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

	pendingPost := qPendingPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStatePublished, pendingPost.Post.State)

	// publishing removes any custom fields and converts them
	require.Len(t, pendingPost.Post.MediaRequests, 0)
	require.Nil(t, pendingPost.Post.CharacterRequests)

	// check to make sure our custom character + media appears in the list
	customCharacterExists := false
	customMediaExists := false

	for _, char := range pendingPost.Post.Characters {
		if char.Name == customCharacterName {
			customCharacterExists = true
		}

		if char.Media.Title == customMediaName {
			customMediaExists = true
		}
	}

	// ensure that our custom character && media was assigned
	require.True(t, customCharacterExists)
	require.True(t, customMediaExists)
}

// Test_CreatePost_Discard - discard post
func TestCreatePost_Discard(t *testing.T) {
	t.Parallel()

	env := getWorkflowEnvironment(t)

	var newPostId string

	mCreatePost(t, env, func(postId string) func() {
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

	pendingPost := qPendingPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStateDiscarded, pendingPost.Post.State)

	// discarding post also completely removes any custom fields
	require.Len(t, pendingPost.Post.MediaRequests, 0)
	require.Nil(t, pendingPost.Post.CharacterRequests)
}

// Test_CreatePost_Reject - reject post
func TestCreatePost_Reject_undo_reject(t *testing.T) {
	t.Parallel()

	var newPostId string

	env := getWorkflowEnvironment(t)

	mCreatePost(t, env, func(postId string) func() {
		return func() {
			newPostId = postId
			// setup another environment since we cant execute multiple workflows

			stingClient := getGrpcClient(t)

			// "reject" pending post
			_, e := stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)

			pendingPost := qPendingPost(t, newPostId)

			// make sure post is in rejected state
			require.Equal(t, types.PostStateRejected, pendingPost.Post.State)

			// UNDO
			_, e = stingClient.UndoPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)

			newEnv := getWorkflowEnvironment(t)
			newEnv.ExecuteWorkflow(workflows.UndoPost, postId)

			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())

			// CHECK STATUS

			pendingPost = qPendingPost(t, newPostId)

			// check to make sure post is still in "review" state (since we did the undo)
			require.Equal(t, types.PostStateReview, pendingPost.Post.State)

			// need to reject again, or else we will be in an infinite loop
			_, e = stingClient.RejectPost(context.Background(), &sting.PostRequest{Id: postId})
			require.NoError(t, e)
		}
	})

	pendingPost := qPendingPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PostStateRejected, pendingPost.Post.State)
}

// TestSearchCharacters - search some characters
func TestSearchCharacters(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var searchCharacters SearchCharacters

	err := client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"name": graphql.String("Aarush Hills"),
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters.Edges, 1)
	require.Equal(t, "Aarush Hills", searchCharacters.Characters.Edges[0].Node.Name)
}

// TestSearchCategories - search some categories
func TestSearchCategories(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var searchCategories SearchCategories

	err := client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String("Convict"),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 1)
	require.Equal(t, "Convict", searchCategories.Categories.Edges[0].Node.Title)
}

// TestSearchMedia - search some media
func TestSearchMedia(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var searchMedia SearchMedia

	err := client.Query(context.Background(), &searchMedia, map[string]interface{}{
		"title": graphql.String("Foreigner On Mars"),
	})

	require.NoError(t, err)
	require.Len(t, searchMedia.Media.Edges, 1)
	require.Equal(t, "Foreigner On Mars", searchMedia.Media.Edges[0].Node.Title)
}

func getHttpClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client) {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(StingHttpClientAddr, client), client
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()

	newApp, _ := service.NewApplication(context.Background())
	ports.RegisterActivities(&newApp, env)

	return env
}

func startService() bool {
	config.Read("applications/sting")

	application, _ := service.NewApplication(context.Background())

	client := clients.NewTemporalClient(context.Background())

	srv := ports.NewGraphQLServer(&application, client)

	go bootstrap.InitializeHttpServer(StingHttpAddr, srv, func() {})

	ok := tests.WaitForPort(StingHttpAddr)
	if !ok {
		log.Println("Timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application, client)

	go bootstrap.InitializeGRPCServer(StingGrpcAddr, func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})

	ok = tests.WaitForPort(StingGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for sting GRPC to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
