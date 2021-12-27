package entities

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/principal"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAudienceByID(ctx context.Context, id relay.ID) (*types.Audience, error) {

	media, err := r.App.Queries.AudienceById.Handle(ctx, query.AudienceById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {

		if err == post.ErrAudienceNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAudienceToGraphQL(ctx, media), nil
}

func (r EntityResolver) FindClubByID(ctx context.Context, id relay.ID) (*types.Club, error) {

	media, err := r.App.Queries.ClubById.Handle(ctx, query.ClubById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {

		if err == post.ErrClubNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubToGraphQL(ctx, media), nil
}

func (r EntityResolver) FindSeriesByID(ctx context.Context, id relay.ID) (*types.Series, error) {

	media, err := r.App.Queries.SeriesById.Handle(ctx, query.SeriesById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {

		if err == post.ErrSeriesNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalSeriesToGraphQL(ctx, media), nil
}

func (r EntityResolver) FindCategoryByID(ctx context.Context, id relay.ID) (*types.Category, error) {

	category, err := r.App.Queries.CategoryById.Handle(ctx, query.CategoryById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {

		if err == post.ErrCategoryNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCategoryToGraphQL(ctx, category), nil
}

func (r EntityResolver) FindCharacterByID(ctx context.Context, id relay.ID) (*types.Character, error) {

	character, err := r.App.Queries.CharacterById.Handle(ctx, query.CharacterById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {

		if err == post.ErrCharacterNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCharacterToGraphQL(ctx, character), nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{
		ID: id,
	}, nil
}

func (r EntityResolver) FindPostByID(ctx context.Context, id relay.ID) (*types.Post, error) {

	pendingPost, err := r.App.Queries.PostById.Handle(ctx, query.PostById{
		Id:        id.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {

		if err == post.ErrNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostToGraphQL(ctx, pendingPost), nil
}
