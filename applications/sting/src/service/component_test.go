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
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	search "overdoll/libraries/elasticsearch"
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

type CreatePendingPost struct {
	CreatePendingPost *types.CreatePendingPostPayload `graphql:"createPendingPost(input: $input)"`
}

type PendingPost struct {
	PendingPost *types.PendingPost `graphql:"pendingPost(id: $id)"`
}

type PendingPosts struct {
	PendingPosts *types.PendingPostConnection `graphql:"pendingPosts(filter: $filter)"`
}

type SearchCharacters struct {
	Characters []*types.Character `graphql:"characters(data: $data)"`
}

type SearchCategories struct {
	Categories []*types.Category `graphql:"categories(data: $data)"`
}

type SearchMedia struct {
	Media []*types.Media `graphql:"media(data: $data)"`
}

type SearchArtist struct {
	Artists []*types.Artist `graphql:"artists(data: $data)"`
}

func qPendingPost(t *testing.T, id string) PendingPost {

	client, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var pendingPost PendingPost

	err := client.Query(context.Background(), &pendingPost, map[string]interface{}{
		"id": graphql.String(id),
	})

	require.NoError(t, err)

	return pendingPost
}

func mCreatePost(t *testing.T, env *testsuite.TestWorkflowEnvironment, callback func(string) func()) {
	// we have to create a post as an authenticated user, otherwise it won't let us
	client, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var createPost CreatePendingPost

	artistId := "1q7MIw0U6TEpELH0FqnxrcXt3E0"
	artistUsername := "artist_verified"

	id := relay.NewID(types.Artist{}, artistId)

	err := client.Mutate(context.Background(), &createPost, map[string]interface{}{
		"input": &types.CreatePendingPostInput{
			Content:       []string{},
			CategoryIds:   []string{"1q7MJFk9Wof1qyQQORKBrJxGFhJ", "1q7MJFMVgDPo4mFjsfNag6rRwRy", "1q7MJSeEiai3yFN6Ps65eACFde9"},
			CharacterIds:  []string{"1q7MJnQXAtxer0fboBMHtlC0JMe"},
			MediaRequests: []string{customMediaName},
			CharacterRequests: []*types.CharacterRequest{{
				Name:  customCharacterName,
				Media: customMediaName,
			}},
			ExistingArtist:       &id,
			CustomArtistUsername: &artistUsername,
		},
	})

	require.NoError(t, err)
	require.Equal(t, false, createPost.CreatePendingPost.Review)

	postId := createPost.CreatePendingPost.PendingPost.ID.GetID()

	// execute workflow, since the graphql wont execute it and only put it into a queue
	// we also get the ability to get workflow state, etc.. in this test

	// when the timer is called (waited 24 hours to select a new moderator), we will update the post before the activity
	// function executes so it doesn't keep looping forever
	env.RegisterDelayedCallback(callback(postId), time.Hour*24)
	env.ExecuteWorkflow(workflows.CreatePost, postId)

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
			es, err := search.NewStore(context.Background())
			require.NoError(t, err)
			err = es.Refresh(adapters.PostIndexName)
			require.NoError(t, err)

			newPostId = postId

			// at this point, our post is put into the moderation queue. check for existence here
			// grab all pending posts for our moderator
			client, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

			var pendingPosts PendingPosts

			err = client.Query(context.Background(), &pendingPosts, map[string]interface{}{
				"filter": types.PendingPostFilters{
					ID: &newPostId,
				},
			})

			require.NoError(t, err)

			exists := false

			for _, post := range pendingPosts.PendingPosts.Edges {
				if post.Node.ID == newPostId {
					exists = true
				}
			}

			// ensure this post will exist and is assigned to our moderator
			require.True(t, exists)

			// setup another environment since we cant execute multiple workflows
			newEnv := getWorkflowEnvironment(t)

			stingClient := getGrpcClient(t)

			// "publish" pending post
			_, e := stingClient.PublishPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			require.NoError(t, e)

			// execute workflow manually since it wont be executed right here
			newEnv.ExecuteWorkflow(workflows.PublishPost, postId)
			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())
		}
	})

	pendingPost := qPendingPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PendingPostStateEnumPublished, pendingPost.PendingPost.State)

	// publishing removes any custom fields and converts them
	require.Len(t, pendingPost.PendingPost.MediaRequests, 0)
	require.Nil(t, pendingPost.PendingPost.CharacterRequests)

	// check to make sure our custom character + media appears in the list
	customCharacterExists := false
	customMediaExists := false

	for _, char := range pendingPost.PendingPost.Characters {
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
			_, e := stingClient.DiscardPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			require.NoError(t, e)

			// execute workflow manually since it wont be executed right here
			newEnv.ExecuteWorkflow(workflows.DiscardPost, postId)

			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())
		}
	})

	pendingPost := qPendingPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PendingPostStateEnumDiscarded, pendingPost.PendingPost.State)

	// discarding post also completely removes any custom fields
	require.Len(t, pendingPost.PendingPost.MediaRequests, 0)
	require.Nil(t, pendingPost.PendingPost.CharacterRequests)
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
			_, e := stingClient.RejectPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			require.NoError(t, e)

			pendingPost := qPendingPost(t, newPostId)

			// make sure post is in rejected state
			require.Equal(t, types.PendingPostStateEnumRejected, pendingPost.PendingPost.State)

			// UNDO
			_, e = stingClient.UndoPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			require.NoError(t, e)

			newEnv := getWorkflowEnvironment(t)
			newEnv.ExecuteWorkflow(workflows.UndoPost, postId)

			require.True(t, newEnv.IsWorkflowCompleted())
			require.NoError(t, newEnv.GetWorkflowError())

			// CHECK STATUS

			pendingPost = qPendingPost(t, newPostId)

			// check to make sure post is still in "review" state (since we did the undo)
			require.Equal(t, types.PendingPostStateEnumReview, pendingPost.PendingPost.State)

			// need to reject again, or else we will be in an infinite loop
			_, e = stingClient.RejectPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			require.NoError(t, e)
		}
	})

	pendingPost := qPendingPost(t, newPostId)

	// check to make sure post is in rejected state
	require.Equal(t, types.PendingPostStateEnumRejected, pendingPost.PendingPost.State)
}

// TestSearchCharacters - search some characters
func TestSearchCharacters(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var searchCharacters SearchCharacters

	err := client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Aarush Hills",
		},
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters, 1)
	require.Equal(t, "Aarush Hills", searchCharacters.Characters[0].Name)
}

// TestSearchCategories - search some categories
func TestSearchCategories(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var searchCategories SearchCategories

	err := client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Convict",
		},
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories, 1)
	require.Equal(t, "Convict", searchCategories.Categories[0].Title)
}

// TestSearchMedia - search some media
func TestSearchMedia(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var searchMedia SearchMedia

	err := client.Query(context.Background(), &searchMedia, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Foreigner On Mars",
		},
	})

	require.NoError(t, err)
	require.Len(t, searchMedia.Media, 1)
	require.Equal(t, "Foreigner On Mars", searchMedia.Media[0].Title)
}

// TestSearchArtist - search some artist
func TestSearchArtist(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var searchArtist SearchArtist

	err := client.Query(context.Background(), &searchArtist, map[string]interface{}{
		"data": types.SearchInput{
			Search: "artist_verified",
		},
	})

	require.NoError(t, err)
	require.Len(t, searchArtist.Artists, 1)
	require.Equal(t, "artist_verified", searchArtist.Artists[0].Username)
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
	config.Read("applications/sting/config.toml")

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
