package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type ClubResolver struct {
	App *app.Application
}

func (r ClubResolver) CharactersCount(ctx context.Context, obj *types.Club) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	count, err := r.App.Queries.ClubCharactersCount.Handle(ctx, query.ClubCharactersCount{
		ClubId:    obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return 0, err
	}

	return count, nil
}

func (r ClubResolver) Characters(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, slugs []string, name *string, sortBy types.CharactersSort) (*types.CharacterConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	clubId := obj.ID.GetID()

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, query.SearchCharacters{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Slugs:     slugs,
		SortBy:    sortBy.String(),
		Name:      name,
		ClubId:    &clubId,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQLConnection(ctx, results, cursor), nil
}

func (r ClubResolver) Posts(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, sortBy types.PostsSort) (*types.PostConnection, error) {

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
		ClubIds:             []string{obj.ID.GetID()},
		SupporterOnlyStatus: supporterOnly,
		Principal:           principal.FromContext(ctx),
		AudienceSlugs:       audienceSlugs,
		CategorySlugs:       categorySlugs,
		CharacterSlugs:      characterSlugs,
		SeriesSlugs:         seriesSlugs,
		State:               stateModified,
		SortBy:              sortBy.String(),
		ShowSuspendedClubs:  true,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r ClubResolver) ViewerMember(ctx context.Context, obj *types.Club) (*types.ClubMember, error) {

	// non-authed users will just return nil
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, nil
	}

	clb, err := r.App.Queries.ClubMemberById.Handle(ctx, query.ClubMemberById{
		ClubId:    obj.ID.GetID(),
		AccountId: principal.FromContext(ctx).AccountId(),
	})

	if err != nil {

		if err == club.ErrClubMemberNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubMemberToGraphql(ctx, clb), nil
}

func (r ClubResolver) MembersIsSupporterCount(ctx context.Context, obj *types.Club) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	count, err := r.App.Queries.ClubSupporterMembersCount.Handle(ctx, query.ClubSupporterMembersCount{
		ClubId:    obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return 0, err
	}

	return int(count), nil
}

func (r ClubResolver) Members(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, supporter bool, sortBy types.ClubMembersSort) (*types.ClubMemberConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	clubId := obj.ID.GetID()

	results, err := r.App.Queries.SearchClubMemberships.Handle(ctx, query.SearchClubMemberships{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		ClubId:    &clubId,
		Supporter: supporter,
		SortBy:    sortBy.String(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubMembersToGraphQLConnection(ctx, results, cursor), nil
}

func (r ClubResolver) SlugAliasesLimit(ctx context.Context, obj *types.Club) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	return r.App.Queries.ClubSlugAliasesLimit.Handle(ctx, query.ClubSlugAliasesLimit{
		AccountId: obj.Owner.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})
}

func (r ClubResolver) SuspensionLogs(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int) (*types.ClubSuspensionLogConnection, error) {

	// non-authed users will just return nil
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	logs, err := r.App.Queries.ClubSuspensionLogs.Handle(ctx, query.ClubSuspensionLogs{
		ClubId:    obj.ID.GetID(),
		Cursor:    cursor,
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubSuspensionLogsToGraphQLConnection(ctx, logs, cursor), nil
}
