package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateAudience(ctx context.Context, input types.CreateAudienceInput) (*types.CreateAudiencePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	audience, err := r.App.Commands.CreateAudience.
		Handle(
			ctx,
			command.CreateAudience{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				Title:     input.Title,
				Standard:  input.Standard,
			},
		)

	if err != nil {

		if err == post.ErrAudienceSlugNotUnique {
			taken := types.CreateAudienceValidationSlugTaken
			return &types.CreateAudiencePayload{
				Validation: &taken,
			}, nil
		}

		return nil, err
	}

	return &types.CreateAudiencePayload{
		Audience: types.MarshalAudienceToGraphQL(ctx, audience),
	}, err
}

func (r *MutationResolver) UpdateAudienceTitle(ctx context.Context, input types.UpdateAudienceTitleInput) (*types.UpdateAudienceTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	audience, err := r.App.Commands.UpdateAudienceTitle.
		Handle(
			ctx,
			command.UpdateAudienceTitle{
				Principal:  principal.FromContext(ctx),
				AudienceId: input.ID.GetID(),
				Title:      input.Title,
				Locale:     input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateAudienceTitlePayload{
		Audience: types.MarshalAudienceToGraphQL(ctx, audience),
	}, err
}

func (r *MutationResolver) UpdateAudienceThumbnail(ctx context.Context, input types.UpdateAudienceThumbnailInput) (*types.UpdateAudienceThumbnailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	audience, err := r.App.Commands.UpdateAudienceThumbnail.
		Handle(
			ctx,
			command.UpdateAudienceThumbnail{
				Principal:  principal.FromContext(ctx),
				AudienceId: input.ID.GetID(),
				Thumbnail:  input.Thumbnail,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateAudienceThumbnailPayload{
		Audience: types.MarshalAudienceToGraphQL(ctx, audience),
	}, err
}

func (r *MutationResolver) UpdateAudienceIsStandard(ctx context.Context, input types.UpdateAudienceIsStandardInput) (*types.UpdateAudienceIsStandardPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	audience, err := r.App.Commands.UpdateAudienceIsStandard.
		Handle(
			ctx,
			command.UpdateAudienceIsStandard{
				Principal:  principal.FromContext(ctx),
				AudienceId: input.ID.GetID(),
				IsStandard: input.Standard,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateAudienceIsStandardPayload{
		Audience: types.MarshalAudienceToGraphQL(ctx, audience),
	}, err
}
