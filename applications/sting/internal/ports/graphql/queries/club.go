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

func (r *QueryResolver) DiscoverClubs(ctx context.Context, after *string, before *string, first *int, last *int) (*types.ClubConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.DiscoverClubs.Handle(ctx, query.DiscoverClubs{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubsToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Clubs(ctx context.Context, after *string, before *string, first *int, last *int, slugs []string, name *string, suspended *bool, canSupport *bool, terminated *bool, excludeEmpty bool, sortBy types.ClubsSort) (*types.ClubConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchClubs.Handle(ctx, query.SearchClubs{
		Principal:    principal.FromContext(ctx),
		Cursor:       cursor,
		Name:         name,
		Slugs:        slugs,
		SortBy:       sortBy.String(),
		Suspended:    suspended,
		Terminated:   terminated,
		ExcludeEmpty: excludeEmpty,
		CanSupport:   canSupport,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubsToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Club(ctx context.Context, slug string) (*types.Club, error) {

	media, err := r.App.Queries.ClubBySlug.Handle(ctx, query.ClubBySlug{
		Principal: principal.FromContext(ctx),
		Slug:      slug,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubToGraphQL(ctx, media), nil
}
