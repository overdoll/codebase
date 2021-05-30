package service_test

import (
	"context"
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/shurcooL/graphql"
	"github.com/spf13/viper"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const StingHttpAddr = ":6666"
const StingHttpClientAddr = "http://:6666/graphql"

type CreatePost struct {
	CreatePost struct {
		Review graphql.Boolean
	} `graphql:"createPost(data: $data)"`
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
	assert.Equal(t, false, bool(createPost.CreatePost.Review))
}

func getClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client) {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(StingHttpClientAddr, client), client
}

func startService() bool {
	viper.Set("db.keyspace", "sting")

	app, _ := service.NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&app)

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
