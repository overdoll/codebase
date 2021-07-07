package adapters_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/tests"
	"overdoll/libraries/account"
	"overdoll/libraries/uuid"
)

func TestCassandraRepository_create_post(t *testing.T) {
	t.Parallel()

	repo := newPostRepository(t)
	ctx := context.Background()

	fakePost := newFakePost(t)

	err := repo.CreatePost(ctx, fakePost)

	require.NoError(t, err)
}

func TestCassandraRepository_get_pending_post_not_exists(t *testing.T) {
	t.Parallel()

	repo := newPostRepository(t)
	ctx := context.Background()

	id := uuid.New().String()

	usr, err := repo.GetPendingPost(ctx, id)

	assert.Nil(t, usr)
	assert.EqualError(t, err, post.NotFoundError{Identifier: id}.Error())
}

func newPostRepository(t *testing.T) adapters.PostsCassandraRepository {
	session := tests.CreateScyllaSession(t, "sting")

	return adapters.NewPostsCassandraRepository(session)
}

func newFakePost(t *testing.T) *post.Post {

	artist := post.NewArtist(uuid.New().String(), "test")

	usr := account.NewAccount(
		uuid.New().String(),
		"asd",
		"",
		nil,
		false,
		false,
	)

	category := post.NewCategory(uuid.New().String(), "asd")

	media := post.NewMedia(uuid.New().String(), "asd")

	character := post.NewCharacter(uuid.New().String(), "char", media)

	var content []string

	var characters []*post.Character
	characters = append(characters, character)

	var categories []*post.Category
	categories = append(categories, category)

	return post.NewPost(uuid.New().String(), artist, usr, content, categories, characters)
}
