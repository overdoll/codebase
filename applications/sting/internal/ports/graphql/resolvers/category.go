package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"strconv"
)

type CategoryResolver struct {
	App *app.Application
}

func (r CategoryResolver) Thumbnail(ctx context.Context, obj *types.Category, size *int) (*types.Resource, error) {

	if size != nil {
		return &types.Resource{ID: relay.NewID(types.Resource{}, strconv.Itoa(*size), obj.ID.GetID(), obj.Thumbnail.ID.GetID())}, nil
	}

	return &types.Resource{ID: relay.NewID(types.Resource{}, obj.ID.GetID(), obj.Thumbnail.ID.GetID())}, nil
}

func (r CategoryResolver) Posts(ctx context.Context, obj *types.Category, after *string, before *string, first *int, last *int, audienceSlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, orderBy types.PostsOrder) (*types.PostConnection, error) {

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
		AudienceSlugs:  audienceSlugs,
		CharacterSlugs: characterSlugs,
		SeriesSlugs:    seriesSlugs,
		State:          stateModified,
		CategorySlugs:  []string{obj.Slug},
		Principal:      principal.FromContext(ctx),
		OrderBy:        orderBy.Field.String(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
