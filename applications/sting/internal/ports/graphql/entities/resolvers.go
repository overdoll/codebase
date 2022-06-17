package entities

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/principal"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindClubByID(ctx context.Context, id relay.ID) (*types.Club, error) {
	return dataloader.For(ctx).GetClubById(ctx, id.GetID())
}

func (r EntityResolver) FindAudienceByID(ctx context.Context, id relay.ID) (*types.Audience, error) {
	return dataloader.For(ctx).GetAudienceById(ctx, id.GetID())
}

func (r EntityResolver) FindSeriesByID(ctx context.Context, id relay.ID) (*types.Series, error) {
	return dataloader.For(ctx).GetSeriesById(ctx, id.GetID())
}

func (r EntityResolver) FindCategoryByID(ctx context.Context, id relay.ID) (*types.Category, error) {
	return dataloader.For(ctx).GetCategoryById(ctx, id.GetID())
}

func (r EntityResolver) FindCharacterByID(ctx context.Context, id relay.ID) (*types.Character, error) {
	return dataloader.For(ctx).GetCharacterById(ctx, id.GetID())
}

func (r EntityResolver) FindPostByID(ctx context.Context, id relay.ID) (*types.Post, error) {
	return dataloader.For(ctx).GetPostById(ctx, id.GetID())
}

func (r EntityResolver) FindClubMemberByID(ctx context.Context, id relay.ID) (*types.ClubMember, error) {

	clubs, err := r.App.Queries.ClubMemberById.Handle(ctx, query.ClubMemberById{
		Principal: principal.FromContext(ctx),
		AccountId: id.GetCompositePartID(0),
		ClubId:    id.GetCompositePartID(1),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubMemberToGraphql(ctx, clubs), nil
}

func (r EntityResolver) FindPostLikeByID(ctx context.Context, id relay.ID) (*types.PostLike, error) {

	postLike, err := r.App.Queries.PostLikeById.Handle(ctx, query.PostLikeById{
		Principal: principal.FromContext(ctx),
		PostId:    id.GetCompositePartID(1),
		AccountId: id.GetCompositePartID(0),
	})

	if err != nil {

		if err == post.ErrLikeNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostLikeToGraphQL(ctx, postLike), nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{
		ID: id,
	}, nil
}
