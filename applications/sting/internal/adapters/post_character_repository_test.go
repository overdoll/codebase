package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

func TestPostCharacterRepository_failure(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepositoryWithESFailure(t)

	characterId := uuid.New().String()

	characterSlug := createFakeSlug(t)
	seriesSlug := "foreigneronmars"

	character := post.UnmarshalCharacterFromDatabase(characterId, characterSlug, map[string]string{"en": "test"}, nil, 0, 0,
		post.UnmarshalSeriesFromDatabase("1pcKiQL7dgUW8CIN7uO1wqFaMql", "foreigneronmars", map[string]string{"en": "test"}, nil, 0, 0))

	ctx := context.Background()

	requester := testing_tools.NewStaffPrincipal(uuid.New().String())

	err := postRepo.CreateCharacter(ctx, requester, character)
	require.Error(t, err, "should have received an error while creating the character")

	_, err = postRepo.GetCharacterById(ctx, requester, characterId)
	require.Equal(t, post.ErrCharacterNotFound, err, "character should not be found by id")

	_, err = postRepo.GetCharacterBySlug(ctx, requester, characterSlug, seriesSlug)
	require.Equal(t, post.ErrCharacterNotFound, err, "character should not be found by slug")
}
