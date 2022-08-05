package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"overdoll/libraries/uuid"
	"testing"

	"github.com/stretchr/testify/require"
)

type PostGames struct {
	PostGames struct {
		Edges []struct {
			Node PostModified
		}
	} `graphql:"postsGame(slug: $slug, seed: $seed)"`
}

func TestCreatePostGames(t *testing.T) {
	t.Parallel()

	return

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	mockAccountStaff(t, accountId)

	pst1 := seedPublishedPost(t, accountId, clubId)
	pst2 := seedPublishedPost(t, accountId, clubId)

	postsGameSlug := seedPostsGame(t, []string{pst1.ID(), pst2.ID()})

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var postGames PostGames

	err := client.Query(context.Background(), &postGames, map[string]interface{}{
		"slug": graphql.String(postsGameSlug),
		"seed": graphql.String("asdasdasd"),
	})

	require.NoError(t, err, "no error getting posts games")

	require.Equal(t, 2, len(postGames.PostGames.Edges), "should have found 2 posts for the game")
}
