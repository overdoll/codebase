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

func (r AccountResolver) CuratedPostsFeedData(ctx context.Context, obj *types.Account) (*types.CuratedPostsFeedData, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.CuratedPostsFeedData.Handle(ctx, query.CuratedPostsFeedData{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.CuratedPostsFeedData{
		GeneratedAt:                  result.GeneratedAt(),
		NextRegenerationTime:         result.NextRegenerationTime(),
		ViewedAt:                     result.ViewedAt(),
		NextRegenerationTimeDuration: int(result.NextRegenerationTimeDuration().Milliseconds()),
	}, nil
}

func (r AccountResolver) CuratedPostsFeedPosts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.CuratedPostsFeedPosts.Handle(ctx, query.CuratedPostsFeedPosts{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) HasClubSupporterSubscription(ctx context.Context, obj *types.Account) (bool, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return false, err
	}

	hasSubscription, err := r.App.Queries.HasClubSupporterSubscription.Handle(ctx, query.HasClubSupporterSubscription{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {
		return false, err
	}

	return hasSubscription, nil
}

func (r AccountResolver) LikedPosts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountLikedPosts.Handle(ctx, query.AccountLikedPosts{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalLikedPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) ClubMembersPostsFeed(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.ClubMembersPostsFeed.Handle(ctx, query.ClubMembersPostsFeed{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) CurationProfile(ctx context.Context, obj *types.Account) (*types.CurationProfile, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	profile, err := r.App.Queries.CurationProfileByAccountId.Handle(ctx, query.PersonalizationProfileByAccountId{
		Principal: principal.FromContext(ctx),
		AccountId: principal.FromContext(ctx).AccountId(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCurationProfileToGraphQL(ctx, profile), nil
}

func (r AccountResolver) Posts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, clubCharacterSlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, seed *string, sortBy types.PostsSort) (*types.PostConnection, error) {

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

	var supporterOnly []string

	for _, s := range supporterOnlyStatus {
		supporterOnly = append(supporterOnly, s.String())
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:              cursor,
		ContributorId:       &contributorId,
		AudienceSlugs:       audienceSlugs,
		SeriesSlugs:         seriesSlugs,
		CategorySlugs:       categorySlugs,
		CharacterSlugs:      characterSlugs,
		ClubCharacterSlugs:  clubCharacterSlugs,
		SortBy:              sortBy.String(),
		State:               stateModified,
		SupporterOnlyStatus: supporterOnly,
		Principal:           principal.FromContext(ctx),
		ShowSuspendedClubs:  true,
		Seed:                seed,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
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

func (r AccountResolver) Clubs(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, slugs []string, name *string, sortBy types.ClubsSort) (*types.ClubConnection, error) {

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
		SortBy:         sortBy.String(),
		Slugs:          slugs,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubsToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) ClubMemberships(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, supporter bool, sortBy types.ClubMembersSort) (*types.ClubMemberConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	accId := obj.ID.GetID()

	results, err := r.App.Queries.SearchClubMemberships.Handle(ctx, query.SearchClubMemberships{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		AccountId: &accId,
		Supporter: supporter,
		SortBy:    sortBy.String(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubMembersToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) HasNonTerminatedClubs(ctx context.Context, obj *types.Account) (bool, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return false, err
	}

	result, err := r.App.Queries.HasNonTerminatedClubs.Handle(ctx, query.HasNonTerminatedClubs{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {
		return false, err
	}

	return result, nil
}
