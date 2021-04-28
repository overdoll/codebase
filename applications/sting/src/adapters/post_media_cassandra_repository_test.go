package adapters_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

func TestPostsMediaCassandraRepository_create_media(t *testing.T) {
	t.Parallel()

	repo := newPostRepository(t)
	ctx := context.Background()

	medias := newFakeMedia(t)

	err := repo.CreateMedias(ctx, medias)

	require.NoError(t, err)
}

func newFakeMedia(t *testing.T) []*post.Media {
	var medias []*post.Media

	medias = append(medias, post.NewMedia(ksuid.New().String(), ""))
	medias = append(medias, post.NewMedia(ksuid.New().String(), ""))

	return medias
}
