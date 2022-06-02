package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Clubs(ctx context.Context, after *string, before *string, first *int, last *int, slugs []string, name *string, suspended bool, terminated bool, sortBy types.ClubsSort) (*types.ClubConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchClubs.Handle(ctx, query.SearchClubs{
		Principal:  principal.FromContext(ctx),
		Cursor:     cursor,
		Name:       name,
		Slugs:      slugs,
		SortBy:     sortBy.String(),
		Suspended:  &suspended,
		Terminated: &terminated,
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

		if domainerror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubToGraphQL(ctx, media), nil
}
