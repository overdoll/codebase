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

func (r *QueryResolver) Posts(ctx context.Context, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, orderBy types.PostsOrder) (*types.PostConnection, error) {

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
		ModeratorId:    nil,
		ContributorId:  nil,
		AudienceSlugs:  audienceSlugs,
		CategorySlugs:  categorySlugs,
		CharacterSlugs: characterSlugs,
		SeriesSlugs:    seriesSlugs,
		State:          stateModified,
		OrderBy:        orderBy.Field.String(),
		Principal:      principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Post(ctx context.Context, reference string) (*types.Post, error) {

	pendingPost, err := r.App.Queries.PostById.Handle(ctx, query.PostById{
		Id:        reference,
		Principal: principal.FromContext(ctx),
	})

	if err != nil {

		if err == post.ErrNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostToGraphQL(ctx, pendingPost), nil
}
