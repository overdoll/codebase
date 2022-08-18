package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Search(ctx context.Context, after *string, before *string, first *int, last *int, qs string) (*types.SearchConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.Search.Handle(ctx, query.Search{
		Principal: principal.FromContext(ctx),
		Passport:  passport.FromContext(ctx),
		Cursor:    cursor,
		Query:     qs,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalSearchToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) PostsFeed(ctx context.Context, after *string, before *string, first *int, last *int, seed *string) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.PostsFeed.Handle(ctx, query.PostsFeed{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Seed:      seed,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Posts(ctx context.Context, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, seed *string, sortBy types.PostsSort) (*types.PostConnection, error) {

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
		Cursor:              cursor,
		ContributorId:       nil,
		SupporterOnlyStatus: supporterOnly,
		AudienceSlugs:       audienceSlugs,
		CategorySlugs:       categorySlugs,
		CharacterSlugs:      characterSlugs,
		SeriesSlugs:         seriesSlugs,
		State:               stateModified,
		SortBy:              sortBy.String(),
		Principal:           principal.FromContext(ctx),
		ShowSuspendedClubs:  false,
		Seed:                seed,
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

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostToGraphQL(ctx, pendingPost, nil), nil
}
