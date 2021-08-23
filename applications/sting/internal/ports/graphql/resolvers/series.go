package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SeriesResolver struct {
	App *app.Application
}

func (r SeriesResolver) Posts(ctx context.Context, obj *types.Series, after *string, before *string, first *int, last *int, brandSlugs []string, audienceSlugs []string, categorySlugs []string, characterSlugs []string, state *types.PostState, orderBy types.PostsOrder) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var stateModified *string

	if state != nil {
		str := state.String()
		stateModified = &str
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:         cursor,
		SeriesSlugs:    []string{obj.Slug},
		BrandSlugs:     brandSlugs,
		AudienceSlugs:  audienceSlugs,
		CategorySlugs:  categorySlugs,
		CharacterSlugs: characterSlugs,
		Principal:      principal.FromContext(ctx),
		State:          stateModified,
		OrderBy:        orderBy.Field.String(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
