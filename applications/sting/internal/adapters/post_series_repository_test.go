package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

func TestPostSeries_failure(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepositoryWithESFailure(t)

	seriesId := uuid.New().String()
	seriesSlug := createFakeSlug(t)

	series := post.UnmarshalSeriesFromDatabase(seriesId, seriesSlug, map[string]string{"en": "test"}, nil, 0, 0)

	ctx := context.Background()

	requester := testing_tools.NewStaffPrincipal(uuid.New().String())

	err := postRepo.CreateSeries(ctx, requester, series)
	require.Error(t, err, "should have received an error while creating the series")

	_, err = postRepo.GetSingleSeriesById(ctx, requester, seriesId)
	require.Equal(t, post.ErrAudienceNotFound, err, "series should not be found by id")

	_, err = postRepo.GetSeriesBySlug(ctx, requester, seriesSlug)
	require.Equal(t, post.ErrAudienceNotFound, err, "series should not be found by slug")
}
