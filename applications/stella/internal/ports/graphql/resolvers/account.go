package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"strings"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) ClubsLimit(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	return r.App.Queries.AccountClubsLimit.Handle(ctx, query.AccountClubsLimit{
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})
}

func (r AccountResolver) ClubsCount(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	results, err := r.App.Queries.AccountClubsCount.Handle(ctx, query.AccountClubsCount{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {
		return 0, err
	}

	return results, nil
}

func (r AccountResolver) ClubMembershipsLimit(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	return r.App.Queries.AccountClubMembershipsLimit.Handle(ctx, query.AccountClubMembershipsLimit{
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})
}

func (r AccountResolver) ClubMembershipsCount(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	results, err := r.App.Queries.AccountClubMembershipsCount.Handle(ctx, query.AccountClubMembershipsCount{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {
		return 0, err
	}

	return results, nil
}

func (r AccountResolver) Clubs(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, slugs []string, name *string, suspended bool, sortBy types.ClubsSort) (*types.ClubConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	accountId := obj.ID.GetID()

	results, err := r.App.Queries.SearchClubs.Handle(ctx, query.SearchClubs{
		Principal:      principal.FromContext(ctx),
		Cursor:         cursor,
		OwnerAccountId: &accountId,
		Name:           name,
		Suspended:      suspended,
		SortBy:         strings.ToLower(sortBy.String()),
		Slugs:          slugs,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubsToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) ClubMemberships(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, sortBy types.ClubMembersSort) (*types.ClubMemberConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountClubMemberships.Handle(ctx, query.AccountClubMemberships{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		AccountId: obj.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubMembersToGraphQLConnection(ctx, results, cursor), nil
}
