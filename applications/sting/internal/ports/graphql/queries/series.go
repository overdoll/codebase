package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Series(ctx context.Context, after *string, before *string, first *int, last *int, slugs []string, title *string, sortBy types.SeriesSort) (*types.SeriesConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchSeries.Handle(ctx, query.SearchSeries{
		Principal: principal.FromContext(ctx),
		SortBy:    sortBy.String(),
		Slugs:     slugs,
		Cursor:    cursor,
		Title:     title,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalSeriesToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Serial(ctx context.Context, slug string) (*types.Series, error) {

	media, err := r.App.Queries.SeriesBySlug.Handle(ctx, query.SeriesBySlug{
		Principal: principal.FromContext(ctx),
		Slug:      slug,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalSeriesToGraphQL(ctx, media), nil
}
