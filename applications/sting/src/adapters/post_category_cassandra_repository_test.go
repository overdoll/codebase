package adapters_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/uuid"
)

func TestPostsCategoryCassandraRepository_create_category(t *testing.T) {
	t.Parallel()

	repo := newPostRepository(t)
	ctx := context.Background()

	var categories []*post.Category

	categories = append(categories, post.NewCategory(uuid.New().String(), "asd"), post.NewCategory(uuid.New().String(), "asd2"))

	err := repo.CreateCategories(ctx, categories)

	require.NoError(t, err)
}
