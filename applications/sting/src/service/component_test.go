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
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const StingHttpAddr = ":6666"
const StingHttpClientAddr = "http://:6666/graphql"

type CreatePost struct {
	Post struct {
		Review graphql.Boolean
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

// TestPost_create_new_post - create a new valid post
func TestPost_create_new_post(t *testing.T) {

	// we have to create a post as an authenticated user, otherwise it won't let us
	client, _ := getClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

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

	require.NoError(t, err)
	assert.Equal(t, false, bool(createPost.Post.Review))
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

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
