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

func TestPostSeries_failure(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepositoryWithESFailure(t)

	seriesId := uuid.New().String()
	seriesSlug := createFakeSlug(t)

	series := post.UnmarshalSeriesFromDatabase(seriesId, seriesSlug, map[string]string{"en": "test"}, nil, nil, 0, 0, time.Now(), time.Now())

	ctx := context.Background()

	err := postRepo.CreateSeries(ctx, series)
	require.Error(t, err, "should have received an error while creating the series")

	_, err = postRepo.GetSingleSeriesById(ctx, seriesId)
	require.True(t, apperror.IsNotFoundError(err), "series should not be found by id")

	_, err = postRepo.GetSeriesBySlug(ctx, seriesSlug)
	require.True(t, apperror.IsNotFoundError(err), "series should not be found by slug")
}
