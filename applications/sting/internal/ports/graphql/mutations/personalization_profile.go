package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) UpdatePersonalizationProfileAudience(ctx context.Context, input types.UpdatePersonalizationProfileAudienceInput) (*types.UpdatePersonalizationProfileAudiencePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var audienceIds []string

	for _, id := range input.AudienceIds {
		audienceIds = append(audienceIds, id.GetID())
	}

	profile, err := r.App.Commands.UpdatePersonalizationProfileAudience.
		Handle(
			ctx,
			command.UpdatePersonalizationProfileAudience{
				Principal:   principal.FromContext(ctx),
				AudienceIds: audienceIds,
				Skipped:     input.Skipped,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePersonalizationProfileAudiencePayload{PersonalizationProfile: types.MarshalPersonalizationProfileToGraphQL(ctx, profile)}, nil
}

func (r *MutationResolver) UpdatePersonalizationProfileCategory(ctx context.Context, input types.UpdatePersonalizationProfileCategoryInput) (*types.UpdatePersonalizationProfileCategoryPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var categoryIds []string

	for _, id := range input.CategoryIds {
		categoryIds = append(categoryIds, id.GetID())
	}

	profile, err := r.App.Commands.UpdatePersonalizationProfileCategory.
		Handle(
			ctx,
			command.UpdatePersonalizationProfileCategory{
				Principal:   principal.FromContext(ctx),
				CategoryIds: categoryIds,
				Skipped:     input.Skipped,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePersonalizationProfileCategoryPayload{PersonalizationProfile: types.MarshalPersonalizationProfileToGraphQL(ctx, profile)}, nil
}

func (r *MutationResolver) UpdatePersonalizationProfileDateOfBirth(ctx context.Context, input types.UpdatePersonalizationProfileDateOfBirthInput) (*types.UpdatePersonalizationProfileDateOfBirthPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	profile, err := r.App.Commands.UpdatePersonalizationProfileDateOfBirth.
		Handle(
			ctx,
			command.UpdatePersonalizationDateOfBirth{
				Principal:   principal.FromContext(ctx),
				DateOfBirth: input.DateOfBirth,
				Skipped:     input.Skipped,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePersonalizationProfileDateOfBirthPayload{PersonalizationProfile: types.MarshalPersonalizationProfileToGraphQL(ctx, profile)}, nil
}
