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
	"strings"
)

type CharacterResolver struct {
	App *app.Application
}

func (r CharacterResolver) Thumbnail(ctx context.Context, obj *types.Character) (*types.Resource, error) {
	if obj.Thumbnail == nil {
		return nil, nil
	}

	return &types.Resource{ID: relay.NewID(types.Resource{}, obj.ID.GetID(), obj.Thumbnail.ID.GetID())}, nil
}

func (r CharacterResolver) Posts(ctx context.Context, obj *types.Character, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, sortBy types.PostsSort) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var stateModified *string

	if state != nil {
		str := state.String()
		stateModified = &str
	}

	var supporterOnly []string

	for _, s := range supporterOnlyStatus {
		supporterOnly = append(supporterOnly, s.String())
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:             cursor,
		CharacterSlugs:     []string{obj.Slug},
		Principal:          principal.FromContext(ctx),
		State:              stateModified,
		AudienceSlugs:      audienceSlugs,
		CategorySlugs:      categorySlugs,
		SortBy:             strings.ToLower(sortBy.String()),
		ShowSuspendedClubs: false,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
