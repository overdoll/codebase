package entities

import (
	"context"

	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindArtistByID(ctx context.Context, id relay.ID) (*types.Artist, error) {

	artist, err := r.App.Queries.ArtistById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalArtistToGraphQL(artist), nil
}

func (r EntityResolver) FindCategoryByID(ctx context.Context, id relay.ID) (*types.Category, error) {

	category, err := r.App.Queries.CategoryById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalCategoryToGraphQL(category), nil
}

func (r EntityResolver) FindCharacterByID(ctx context.Context, id relay.ID) (*types.Character, error) {

	character, err := r.App.Queries.CharacterById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQL(character), nil
}

func (r EntityResolver) FindMediaByID(ctx context.Context, id relay.ID) (*types.Media, error) {

	media, err := r.App.Queries.MediaById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalMediaToGraphQL(media), nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{
		ID: id,
	}, nil
}

func (r EntityResolver) FindPostByID(ctx context.Context, id relay.ID) (*types.Post, error) {

	pendingPost, err := r.App.Queries.PostById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQL(pendingPost), nil
}
