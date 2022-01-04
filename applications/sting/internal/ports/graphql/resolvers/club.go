package resolvers

import (
	"context"
	query2 "overdoll/applications/stella/internal/app/query"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/passport"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubResolver struct {
	App *app.Application
}

func (r ClubResolver) Thumbnail(ctx context.Context, obj *types.Club, size *types.ResourceSizes) (types.Resource, error) {

	resource, err := r.App.Queries.ResourceById.Handle(ctx, query.ResourceById{
		ItemId:     obj.ID.GetID(),
		ResourceId: types.GetResourceIdFromResource(ctx, obj.Thumbnail),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalResourceToGraphQL(ctx, resource, size), nil
}

func (r ClubResolver) ViewerMember(ctx context.Context, obj *types.Club) (*types.ClubMember, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clb, err := r.App.Queries.ClubMemberById.Handle(ctx, query2.ClubMemberById{
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

	results, err := r.App.Queries.ClubMembersByClub.Handle(ctx, query2.ClubMembersByClub{
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

	return r.App.Queries.ClubSlugAliasesLimit.Handle(ctx, query2.ClubSlugAliasesLimit{
		AccountId: obj.Owner.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})
}

func (r ClubResolver) Posts(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, orderBy types.PostsOrder) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var stateModified *string

	if state != nil {
		str := state.String()
		stateModified = &str
	}

	clubId := obj.ID.GetID()

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:         cursor,
		ClubId:         &clubId,
		Principal:      principal.FromContext(ctx),
		AudienceSlugs:  audienceSlugs,
		CategorySlugs:  categorySlugs,
		CharacterSlugs: characterSlugs,
		SeriesSlugs:    seriesSlugs,
		State:          stateModified,
		OrderBy:        orderBy.Field.String(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
