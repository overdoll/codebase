package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/apperror"
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

	character := post.UnmarshalCharacterFromDatabase(characterId, characterSlug, map[string]string{"en": "test"}, nil, nil, 0, 0, time.Now(), time.Now(),
		post.UnmarshalSeriesFromDatabase("1pcKiQL7dgUW8CIN7uO1wqFaMql", "foreigneronmars", map[string]string{"en": "test"}, nil, nil, 0, 0, time.Now(), time.Now()), nil)

	ctx := context.Background()

	err := postRepo.CreateCharacter(ctx, character)
	require.Error(t, err, "should have received an error while creating the character")

	_, err = postRepo.GetCharacterById(ctx, characterId)
	require.True(t, apperror.IsNotFoundError(err), "character should not be found by id")

	_, err = postRepo.GetCharacterBySlug(ctx, characterSlug, &seriesSlug, nil)
	require.True(t, apperror.IsNotFoundError(err), "character should not be found by slug")
}
