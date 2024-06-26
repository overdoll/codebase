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

func (r *QueryResolver) Categories(ctx context.Context, after *string, before *string, first *int, last *int, slugs []string, title *string, excludeEmpty bool, sortBy types.CategoriesSort) (*types.CategoryConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchCategories.Handle(ctx, query.SearchCategories{
		Principal:    principal.FromContext(ctx),
		Cursor:       cursor,
		Title:        title,
		Slugs:        slugs,
		SortBy:       sortBy.String(),
		ExcludeEmpty: excludeEmpty,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCategoryToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Category(ctx context.Context, slug string) (*types.Category, error) {

	category, err := r.App.Queries.CategoryBySlug.Handle(ctx, query.CategoryBySlug{
		Principal: principal.FromContext(ctx),
		Slug:      slug,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCategoryToGraphQL(ctx, category), nil
}
