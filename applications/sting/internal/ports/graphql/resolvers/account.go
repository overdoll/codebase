package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) ModeratorPostsQueue(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, orderBy types.PostsOrder) (*types.PostConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	moderatorId := obj.ID.GetID()

	var stateModified *string

	if state != nil {
		str := state.String()
		stateModified = &str
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:         cursor,
		ModeratorId:    &moderatorId,
		State:          stateModified,
		OrderBy:        orderBy.Field.String(),
		AudienceSlugs:  audienceSlugs,
		CharacterSlugs: characterSlugs,
		CategorySlugs:  categorySlugs,
		SeriesSlugs:    seriesSlugs,
		Principal:      principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) Posts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, orderBy types.PostsOrder) (*types.PostConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	contributorId := obj.ID.GetID()

	var stateModified *string

	if state != nil {
		str := state.String()
		stateModified = &str
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:         cursor,
		ContributorId:  &contributorId,
		AudienceSlugs:  audienceSlugs,
		SeriesSlugs:    seriesSlugs,
		CategorySlugs:  categorySlugs,
		CharacterSlugs: characterSlugs,
		OrderBy:        orderBy.Field.String(),
		State:          stateModified,
		Principal:      principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
