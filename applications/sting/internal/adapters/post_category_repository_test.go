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

func TestPostCategoryRepository_failure(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepositoryWithESFailure(t)

	categoryId := uuid.New().String()
	categorySlug := createFakeSlug(t)

	category := post.UnmarshalCategoryFromDatabase(categoryId, categorySlug, map[string]string{"en": "test"}, nil, 0, 0, time.Now())

	ctx := context.Background()

	requester := testing_tools.NewStaffPrincipal(uuid.New().String())

	err := postRepo.CreateCategory(ctx, requester, category)
	require.Error(t, err, "should have received an error while creating the category")

	_, err = postRepo.GetCategoryById(ctx, requester, categoryId)
	require.True(t, apperror.IsNotFoundError(err), "category should not be found by id")

	_, err = postRepo.GetCategoryBySlug(ctx, requester, categorySlug)
	require.Equal(t, apperror.IsNotFoundError(err), "category should not be found by slug")
}
