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

	if size != nil {
		return &types.Resource{ID: relay.NewID(types.Resource{}, strconv.Itoa(*size), obj.ID.GetID(), obj.Thumbnail.ID.GetID())}, nil
	}

	return &types.Resource{ID: relay.NewID(types.Resource{}, obj.ID.GetID(), obj.Thumbnail.ID.GetID())}, nil
}

func (r ClubResolver) ViewerMember(ctx context.Context, obj *types.Club) (*types.ClubMember, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
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

func (r ClubResolver) Members(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, orderBy types.ClubMembersOrder) (*types.ClubMemberConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.ClubMembersByClub.Handle(ctx, query.ClubMembersByClub{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		ClubId:    obj.ID.GetID(),
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
