package resolvers

import (
	"context"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"strconv"

	"github.com/vektah/gqlparser/v2/gqlerror"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubResolver struct {
	App *app.Application
}

func (r ClubResolver) Thumbnail(ctx context.Context, obj *types.Club, size *int) (*types.Resource, error) {

	if obj.Thumbnail == nil {
		return nil, nil
	}

	if size != nil {
		return &types.Resource{ID: relay.NewID(types.Resource{}, strconv.Itoa(*size), obj.ID.GetID(), obj.Thumbnail.ID.GetID())}, nil
	}

	return &types.Resource{ID: relay.NewID(types.Resource{}, obj.ID.GetID(), obj.Thumbnail.ID.GetID())}, nil
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
