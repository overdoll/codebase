package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestPostCharacterRepository_failure(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepositoryWithESFailure(t)

	characterId := uuid.New().String()

	characterSlug := createFakeSlug(t)
	seriesSlug := "foreigneronmars"

	character := post.UnmarshalCharacterFromDatabase(characterId, characterSlug, map[string]string{"en": "test"}, nil, 0, 0, time.Now(),
		post.UnmarshalSeriesFromDatabase("1pcKiQL7dgUW8CIN7uO1wqFaMql", "foreigneronmars", map[string]string{"en": "test"}, nil, 0, 0, time.Now()))

	ctx := context.Background()

	requester := testing_tools.NewStaffPrincipal(uuid.New().String())

	err := postRepo.CreateCharacter(ctx, requester, character)
	require.Error(t, err, "should have received an error while creating the character")

	_, err = postRepo.GetCharacterById(ctx, requester, characterId)
	require.True(t, apperror.IsNotFoundError(err), "character should not be found by id")

	_, err = postRepo.GetCharacterBySlug(ctx, requester, characterSlug, seriesSlug)
	require.Equal(t, apperror.IsNotFoundError(err), "character should not be found by slug")
}
