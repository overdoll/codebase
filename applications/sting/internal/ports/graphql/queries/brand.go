package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Brands(ctx context.Context, after *string, before *string, first *int, last *int, slugs []string, name *string, orderBy types.BrandsOrder) (*types.BrandConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchBrands.Handle(ctx, query.SearchBrands{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Name:      name,
		Slugs:     slugs,
		OrderBy:   orderBy.Field.String(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalBrandsToGraphQLConnection(results, cursor), nil
}

func (r *QueryResolver) Brand(ctx context.Context, slug string) (*types.Brand, error) {

	media, err := r.App.Queries.BrandBySlug.Handle(ctx, query.BrandBySlug{
		Principal: principal.FromContext(ctx),
		Slug:      slug,
	})

	if err != nil {

		if err == post.ErrBrandNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalBrandToGraphQL(media), nil
}
