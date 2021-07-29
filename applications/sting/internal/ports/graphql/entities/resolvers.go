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

func (r EntityResolver) FindArtistByID(ctx context.Context, id relay.ID) (*types.Artist, error) {

	artist, err := r.App.Queries.ArtistById.Handle(ctx, query.ArtistById{
		AccountId: id.GetID(),
	})

	if err != nil {

		if err == post.ErrArtistNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalArtistToGraphQL(artist), nil
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

func (r EntityResolver) FindMediaByID(ctx context.Context, id relay.ID) (*types.Media, error) {

	media, err := r.App.Queries.MediaById.Handle(ctx, query.MediaById{
		MediaId: id.GetID(),
	})

	if err != nil {

		if err == post.ErrMediaNotFound {
			return nil, nil
		}

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
