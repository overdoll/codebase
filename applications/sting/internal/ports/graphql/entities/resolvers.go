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
		AudienceId: id.GetID(),
	})

	if err != nil {

		if err == post.ErrAudienceNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAudienceToGraphQL(media), nil
}

func (r EntityResolver) FindBrandByID(ctx context.Context, id relay.ID) (*types.Brand, error) {

	media, err := r.App.Queries.BrandById.Handle(ctx, query.BrandById{
		BrandId: id.GetID(),
	})

	if err != nil {

		if err == post.ErrBrandNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalBrandToGraphQL(media), nil
}

func (r EntityResolver) FindSeriesByID(ctx context.Context, id relay.ID) (*types.Series, error) {

	media, err := r.App.Queries.SeriesById.Handle(ctx, query.SeriesById{
		SeriesId: id.GetID(),
	})

	if err != nil {

		if err == post.ErrSeriesNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalSeriesToGraphQL(media), nil
}

func (r EntityResolver) FindCategoryByID(ctx context.Context, id relay.ID) (*types.Category, error) {

	category, err := r.App.Queries.CategoryById.Handle(ctx, query.CategoryById{
		CategoryId: id.GetID(),
	})

	if err != nil {

		if err == post.ErrCategoryNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCategoryToGraphQL(category), nil
}

func (r EntityResolver) FindCharacterByID(ctx context.Context, id relay.ID) (*types.Character, error) {

	character, err := r.App.Queries.CharacterById.Handle(ctx, query.CharacterById{
		CharacterId: id.GetID(),
	})

	if err != nil {

		if err == post.ErrCharacterNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCharacterToGraphQL(character), nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{
		ID: id,
	}, nil
}

func (r EntityResolver) FindPostByID(ctx context.Context, id relay.ID) (*types.Post, error) {

	pendingPost, err := r.App.Queries.PostById.Handle(ctx, query.PostById{
		PostId:    id.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {

		if err == post.ErrNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostToGraphQL(pendingPost), nil
}
