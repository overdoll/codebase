package service_test

import (
	"context"
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/testsuite"
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const StingHttpAddr = ":6666"
const StingHttpClientAddr = "http://:6666/graphql"

type CreatePost struct {
	Post struct {
		Review graphql.Boolean
		Id     graphql.String
	} `graphql:"post(data: $data)"`
}

type SearchCharacters struct {
	Characters []struct {
		Id   graphql.String
		Name graphql.String
	} `graphql:"characters(data: $data)"`
}

type SearchCategories struct {
	Categories []struct {
		Id    graphql.String
		Title graphql.String
	} `graphql:"categories(data: $data)"`
}

type SearchMedia struct {
	Media []struct {
		Id    graphql.String
		Title graphql.String
	} `graphql:"media(data: $data)"`
}

type SearchArtist struct {
	Artists []struct {
		Id       graphql.String
		Username graphql.String
	} `graphql:"artists(data: $data)"`
}

type WorkflowComponentTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite

	env *testsuite.TestWorkflowEnvironment
}

// TestPost_create_new_post - create a new valid post
func (s *WorkflowComponentTestSuite) Test_CreatePost_Success() {
	s.T().Parallel()

	// we have to create a post as an authenticated user, otherwise it won't let us
	client, _ := getClient(s.T(), passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var createPost CreatePost

	artistId := "1q7MIw0U6TEpELH0FqnxrcXt3E0"

	err := client.Mutate(context.Background(), &createPost, map[string]interface{}{
		"data": &types.PostInput{
			Content:           []string{"some-random-id", "another-random-id"},
			Categories:        []string{"1q7MJFk9Wof1qyQQORKBrJxGFhJ", "1q7MJFMVgDPo4mFjsfNag6rRwRy", "1q7MJSeEiai3yFN6Ps65eACFde9"},
			Characters:        []string{"1q7MJnQXAtxer0fboBMHtlC0JMe"},
			MediaRequests:     nil,
			CharacterRequests: nil,
			ArtistID:          &artistId,
			ArtistUsername:    "artist_verified",
		},
	})

	require.NoError(s.T(), err)
	assert.Equal(s.T(), false, bool(createPost.Post.Review))

	// execute workflow, since the graphql wont execute it and only put it into a queue
	// we also get the ability to get workflow state, etc.. in this test
	s.env.ExecuteWorkflow(workflows.CreatePost, string(createPost.Post.Id))

	s.True(s.env.IsWorkflowCompleted())
	s.NoError(s.env.GetWorkflowError())
}

// TestSearchCharacters - search some characters
func TestSearchCharacters(t *testing.T) {

	client, _ := getClient(t, nil)

	var search SearchCharacters

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Aarush Hills",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Characters, 1)
	require.Equal(t, "Aarush Hills", string(search.Characters[0].Name))
}

// TestSearchCategories - search some categories
func TestSearchCategories(t *testing.T) {

	client, _ := getClient(t, nil)

	var search SearchCategories

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Convict",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Categories, 1)
	require.Equal(t, "Convict", string(search.Categories[0].Title))
}

// TestSearchMedia - search some media
func TestSearchMedia(t *testing.T) {

	client, _ := getClient(t, nil)

	var search SearchMedia

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "Foreigner On Mars",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Media, 1)
	require.Equal(t, "Foreigner On Mars", string(search.Media[0].Title))
}

// TestSearchArtist - search some artist
func TestSearchArtist(t *testing.T) {

	client, _ := getClient(t, nil)

	var search SearchArtist

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"data": types.SearchInput{
			Search: "artist_verified",
		},
	})

	require.NoError(t, err)
	require.Len(t, search.Artists, 1)
	require.Equal(t, "artist_verified", string(search.Artists[0].Username))
}

func getClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client) {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(StingHttpClientAddr, client), client
}

func (s *WorkflowComponentTestSuite) SetupTest() {
	config.Read("applications/sting/config.toml")

	s.env = s.NewTestWorkflowEnvironment()

	app, _ := service.NewApplication(context.Background())

	s.env.RegisterActivityWithOptions(app.Commands.CreatePost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.CreatePost)})
	s.env.RegisterActivityWithOptions(app.Commands.PublishPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PublishPost)})
	s.env.RegisterActivityWithOptions(app.Commands.DiscardPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.DiscardPost)})
	s.env.RegisterActivityWithOptions(app.Commands.UndoPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.UndoPost)})
	s.env.RegisterActivityWithOptions(app.Commands.NewPendingPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.NewPendingPost)})
	s.env.RegisterActivityWithOptions(app.Commands.PostCustomResources.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PostCustomResources)})
	s.env.RegisterActivityWithOptions(app.Commands.ReassignModerator.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.ReassignModerator)})
}

func startService() bool {
	config.Read("applications/sting/config.toml")

	app, _ := service.NewApplication(context.Background())

	client := clients.NewTemporalClient(context.Background())

	srv := ports.NewGraphQLServer(&app, client)

	go bootstrap.InitializeHttpServer(StingHttpAddr, srv, func() {})

	ok := tests.WaitForPort(StingHttpAddr)

	if !ok {
		log.Println("Timed out waiting for sting HTTP to come up")
	}

	return true
}

func (s *WorkflowComponentTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}

func TestUnitTestSuite(t *testing.T) {
	suite.Run(t, new(WorkflowComponentTestSuite))
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
