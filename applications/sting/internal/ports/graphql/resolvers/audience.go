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

type AudienceResolver struct {
	App *app.Application
}

func (r AudienceResolver) Thumbnail(ctx context.Context, obj *types.Audience, size *types.ResourceSizes) (types.Resource, error) {

	resource, err := r.App.Queries.ResourceById.Handle(ctx, query.ResourceById{
		ItemId:     obj.ID.GetID(),
		ResourceId: types.GetResourceIdFromResource(ctx, obj.Thumbnail),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalResourceToGraphQL(ctx, resource, size), nil
}

func (r AudienceResolver) Posts(ctx context.Context, obj *types.Audience, after *string, before *string, first *int, last *int, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, orderBy types.PostsOrder) (*types.PostConnection, error) {

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
		AudienceSlugs:  []string{obj.Slug},
		CategorySlugs:  categorySlugs,
		CharacterSlugs: characterSlugs,
		SeriesSlugs:    seriesSlugs,
		Principal:      principal.FromContext(ctx),
		State:          stateModified,
		OrderBy:        orderBy.Field.String(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
