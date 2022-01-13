package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) UpdateCurationProfileAudience(ctx context.Context, input types.UpdateCurationProfileAudienceInput) (*types.UpdateCurationProfileAudiencePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var audienceIds []string

	for _, id := range input.AudienceIds {
		audienceIds = append(audienceIds, id.GetID())
	}

	profile, err := r.App.Commands.UpdateCurationProfileAudience.
		Handle(
			ctx,
			command.UpdateCurationProfileAudience{
				Principal:   principal.FromContext(ctx),
				AudienceIds: audienceIds,
				Skipped:     input.Skipped,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCurationProfileAudiencePayload{CurationProfile: types.MarshalCurationProfileToGraphQL(ctx, profile)}, nil
}

func (r *MutationResolver) UpdateCurationProfileCategory(ctx context.Context, input types.UpdateCurationProfileCategoryInput) (*types.UpdateCurationProfileCategoryPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var categoryIds []string

	for _, id := range input.CategoryIds {
		categoryIds = append(categoryIds, id.GetID())
	}

	profile, err := r.App.Commands.UpdateCurationProfileCategory.
		Handle(
			ctx,
			command.UpdateCurationProfileCategory{
				Principal:   principal.FromContext(ctx),
				CategoryIds: categoryIds,
				Skipped:     input.Skipped,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCurationProfileCategoryPayload{CurationProfile: types.MarshalCurationProfileToGraphQL(ctx, profile)}, nil
}

func (r *MutationResolver) UpdateCurationProfileDateOfBirth(ctx context.Context, input types.UpdateCurationProfileDateOfBirthInput) (*types.UpdateCurationProfileDateOfBirthPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	profile, err := r.App.Commands.UpdateCurationProfileDateOfBirth.
		Handle(
			ctx,
			command.UpdateCurationProfileDateOfBirth{
				Principal:   principal.FromContext(ctx),
				DateOfBirth: input.DateOfBirth,
				Skipped:     input.Skipped,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCurationProfileDateOfBirthPayload{CurationProfile: types.MarshalCurationProfileToGraphQL(ctx, profile)}, nil
}
