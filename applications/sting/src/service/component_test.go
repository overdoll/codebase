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
	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const StingHttpAddr = ":6666"
const StingHttpClientAddr = "http://:6666/graphql"

const StingGrpcAddr = "localhost:6667"
const StingGrpcClientAddr = "localhost:6667"

type CreatePost struct {
	Post *types.PostResponse `graphql:"post(data: $data)"`
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

type WorkflowComponentTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite
	app app.Application
	env *testsuite.TestWorkflowEnvironment
}

func mCreatePost(s *WorkflowComponentTestSuite, callback func(string) func()) {
	// we have to create a post as an authenticated user, otherwise it won't let us
	client, _ := getHttpClient(s.T(), passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var createPost CreatePost

	artistId := "1q7MIw0U6TEpELH0FqnxrcXt3E0"

	err := client.Mutate(context.Background(), &createPost, map[string]interface{}{
		"data": &types.PostInput{
			Content:           []string{},
			Categories:        []string{"1q7MJFk9Wof1qyQQORKBrJxGFhJ", "1q7MJFMVgDPo4mFjsfNag6rRwRy", "1q7MJSeEiai3yFN6Ps65eACFde9"},
			Characters:        []string{"1q7MJnQXAtxer0fboBMHtlC0JMe"},
			MediaRequests:     nil,
			CharacterRequests: nil,
			ArtistID:          &artistId,
			ArtistUsername:    "artist_verified",
		},
	})

	s.NoError(err)
	s.Equal(false, createPost.Post.Review)

	postId := createPost.Post.ID

	// execute workflow, since the graphql wont execute it and only put it into a queue
	// we also get the ability to get workflow state, etc.. in this test

	// when the timer is called (waited 24 hours to select a new moderator), we will update the post before the activity
	// function executes so it doesn't keep looping forever
	s.env.RegisterDelayedCallback(callback(postId), time.Hour*24)
	s.env.ExecuteWorkflow(workflows.CreatePost, postId)

	s.True(s.env.IsWorkflowCompleted())
	s.NoError(s.env.GetWorkflowError())
}

// Test_CreatePost_Publish - publish post
func (s *WorkflowComponentTestSuite) Test_CreatePost_Publish() {

	mCreatePost(s, func(postId string) func() {
		return func() {
			// setup another environment since we cant execute multiple workflows
			newEnv := s.NewTestWorkflowEnvironment()
			ports.RegisterActivities(s.app, newEnv)

			stingClient := getGrpcClient(s.T())

			// "publish" pending post
			_, e := stingClient.PublishPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			s.NoError(e)

			// execute workflow manually since it wont be executed right here
			newEnv.ExecuteWorkflow(workflows.PublishPost, postId)

			s.True(newEnv.IsWorkflowCompleted())
			s.NoError(newEnv.GetWorkflowError())
		}
	})
}

// Test_CreatePost_Discard - discard post
func (s *WorkflowComponentTestSuite) Test_CreatePost_Discard() {

	mCreatePost(s, func(postId string) func() {
		return func() {
			// setup another environment since we cant execute multiple workflows
			newEnv := s.NewTestWorkflowEnvironment()
			ports.RegisterActivities(s.app, newEnv)

			stingClient := getGrpcClient(s.T())

			// "discard" pending post
			_, e := stingClient.DiscardPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			s.NoError(e)

			// execute workflow manually since it wont be executed right here
			newEnv.ExecuteWorkflow(workflows.DiscardPost, postId)

			s.True(newEnv.IsWorkflowCompleted())
			s.NoError(newEnv.GetWorkflowError())
		}
	})
}

// Test_CreatePost_Reject - reject post
func (s *WorkflowComponentTestSuite) Test_CreatePost_Reject() {

	mCreatePost(s, func(postId string) func() {
		return func() {
			// setup another environment since we cant execute multiple workflows
			newEnv := s.NewTestWorkflowEnvironment()
			ports.RegisterActivities(s.app, newEnv)

			stingClient := getGrpcClient(s.T())

			// "reject" pending post
			_, e := stingClient.RejectPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			s.NoError(e)
		}
	})
}

// Test_CreatePost_Undo - undo post - publish post and then undo it
func (s *WorkflowComponentTestSuite) Test_CreatePost_Undo() {

	var newPostId string

	mCreatePost(s, func(postId string) func() {
		return func() {
			newPostId = postId
			// setup another environment since we cant execute multiple workflows
			newEnv := s.NewTestWorkflowEnvironment()
			ports.RegisterActivities(s.app, newEnv)

			stingClient := getGrpcClient(s.T())

			// "undo" pending post
			_, e := stingClient.PublishPendingPost(context.Background(), &sting.PendingPostRequest{Id: postId})
			s.NoError(e)
		}
	})

	stingClient := getGrpcClient(s.T())
	_, e := stingClient.UndoPendingPost(context.Background(), &sting.PendingPostRequest{Id: newPostId})
	s.NoError(e)
}

// TestSearchCharacters - search some characters
func TestSearchCharacters(t *testing.T) {

	client, _ := getHttpClient(t, nil)

	var search SearchCharacters

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Aarush Hills",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Characters, 1)
	require.Equal(t, "Aarush Hills", search.Characters[0].Name)
}

// TestSearchCategories - search some categories
func TestSearchCategories(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var search SearchCategories

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Convict",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Categories, 1)
	require.Equal(t, "Convict", search.Categories[0].Title)
}

// TestSearchMedia - search some media
func TestSearchMedia(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var search SearchMedia

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Foreigner On Mars",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Media, 1)
	require.Equal(t, "Foreigner On Mars", search.Media[0].Title)
}

// TestSearchArtist - search some artist
func TestSearchArtist(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t, nil)

	var search SearchArtist

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "artist_verified",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Artists, 1)
	require.Equal(t, "artist_verified", search.Artists[0].Username)
}

func getHttpClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client) {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(StingHttpClientAddr, client), client
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func (s *WorkflowComponentTestSuite) SetupTest() {
	config.Read("applications/sting/config.toml")

	s.env = s.NewTestWorkflowEnvironment()

	newApp, _ := service.NewApplication(context.Background())
	ports.RegisterActivities(newApp, s.env)

	s.app = newApp
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

func (s *WorkflowComponentTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}

func TestUnitTestSuite(t *testing.T) {
	t.Parallel()

	suite.Run(t, new(WorkflowComponentTestSuite))
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
