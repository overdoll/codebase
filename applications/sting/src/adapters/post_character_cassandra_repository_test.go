package adapters_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/uuid"
)

func TestPostsCharacterCassandraRepository_create_character(t *testing.T) {
	t.Parallel()

	repo := newPostRepository(t)
	ctx := context.Background()

	characters := newFakeCharacters(t)

	err := repo.CreateCharacters(ctx, characters)

	require.NoError(t, err)
}

// Test that when we create new characters with custom media, they will be returned when we grab it from the database
func TestPostsCharacterCassandraRepository_get_character(t *testing.T) {
	t.Parallel()

	repo := newPostRepository(t)
	ctx := context.Background()

	characters := newFakeCharacters(t)

	err := repo.CreateCharacters(ctx, characters)

	require.NoError(t, err)

	var ids []string
	var medias []*post.Media

	for _, char := range characters {
		ids = append(ids, char.ID())
		medias = append(medias, char.Media())
	}

	// Also make sure we create the medias since getCharacters will grab those
	err = repo.CreateMedias(ctx, medias)

	require.NoError(t, err)

	getCharacters, err := repo.GetCharactersById(ctx, ids)
	require.NoError(t, err)

	// Go through each character in the DB and ensure it was found
	for _, char := range getCharacters {
		found := false

		for _, target := range characters {

			if char.ID() == target.ID() && char.Media().ID() == target.Media().ID() {
				found = true
				break
			}
		}

		// we have to have found the character. if we didn't, error out
		assert.True(t, found)
	}
}

func newFakeCharacters(t *testing.T) []*post.Character {
	var characters []*post.Character
	return append(characters, post.NewCharacter(uuid.New().String(), "asd", post.NewMedia(uuid.New().String(), "")), post.NewCharacter(uuid.New().String(), "asd2", post.NewMedia(uuid.New().String(), "")))
}
