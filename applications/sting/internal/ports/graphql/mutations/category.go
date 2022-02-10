package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateCategory(ctx context.Context, input types.CreateCategoryInput) (*types.CreateCategoryPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	category, err := r.App.Commands.CreateCategory.
		Handle(
			ctx,
			command.CreateCategory{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				Title:     input.Title,
			},
		)

	if err != nil {

		if err == post.ErrCategorySlugNotUnique {
			taken := types.CreateCategoryValidationSlugTaken
			return &types.CreateCategoryPayload{
				Validation: &taken,
			}, nil
		}

		return nil, err
	}

	return &types.CreateCategoryPayload{
		Category: types.MarshalCategoryToGraphQL(ctx, category),
	}, err
}

func (r *MutationResolver) UpdateCategoryTitle(ctx context.Context, input types.UpdateCategoryTitleInput) (*types.UpdateCategoryTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	category, err := r.App.Commands.UpdateCategoryTitle.
		Handle(
			ctx,
			command.UpdateCategoryTitle{
				Principal:  principal.FromContext(ctx),
				CategoryId: input.ID.GetID(),
				Title:      input.Title,
				Locale:     input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCategoryTitlePayload{
		Category: types.MarshalCategoryToGraphQL(ctx, category),
	}, err
}

func (r *MutationResolver) UpdateCategoryThumbnail(ctx context.Context, input types.UpdateCategoryThumbnailInput) (*types.UpdateCategoryThumbnailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	category, err := r.App.Commands.UpdateCategoryThumbnail.
		Handle(
			ctx,
			command.UpdateCategoryThumbnail{
				Principal:  principal.FromContext(ctx),
				CategoryId: input.ID.GetID(),
				Thumbnail:  input.Thumbnail,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCategoryThumbnailPayload{
		Category: types.MarshalCategoryToGraphQL(ctx, category),
	}, err
}