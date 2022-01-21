package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateCharacter(ctx context.Context, input types.CreateCharacterInput) (*types.CreateCharacterPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	character, err := r.App.Commands.CreateCharacter.
		Handle(
			ctx,
			command.CreateCharacter{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				Name:      input.Name,
			},
		)

	if err != nil {

		if err == post.ErrCharacterSlugNotUnique {
			taken := types.CreateCharacterValidationSlugTaken
			return &types.CreateCharacterPayload{
				Validation: &taken,
			}, nil
		}

		return nil, err
	}

	return &types.CreateCharacterPayload{
		Character: types.MarshalCharacterToGraphQL(ctx, character),
	}, err
}

func (r *MutationResolver) UpdateCharacterName(ctx context.Context, input types.UpdateCharacterNameInput) (*types.UpdateCharacterNamePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	character, err := r.App.Commands.UpdateCharacterName.
		Handle(
			ctx,
			command.UpdateCharacterName{
				Principal:   principal.FromContext(ctx),
				CharacterId: input.ID.GetID(),
				Name:        input.Name,
				Locale:      input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCharacterNamePayload{
		Character: types.MarshalCharacterToGraphQL(ctx, character),
	}, err
}

func (r *MutationResolver) UpdateCharacterThumbnail(ctx context.Context, input types.UpdateCharacterThumbnailInput) (*types.UpdateCharacterThumbnailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	character, err := r.App.Commands.UpdateCharacterThumbnail.
		Handle(
			ctx,
			command.UpdateCharacterThumbnail{
				Principal:   principal.FromContext(ctx),
				CharacterId: input.ID.GetID(),
				Thumbnail:   input.Thumbnail,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCharacterThumbnailPayload{
		Character: types.MarshalCharacterToGraphQL(ctx, character),
	}, err
}
