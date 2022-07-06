package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateTopic(ctx context.Context, input types.CreateTopicInput) (*types.CreateTopicPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	topic, err := r.App.Commands.CreateTopic.
		Handle(
			ctx,
			command.CreateTopic{
				Principal:   principal.FromContext(ctx),
				Slug:        input.Slug,
				Title:       input.Title,
				Description: input.Description,
				Weight:      input.Weight,
			},
		)

	if err != nil {

		if err == post.ErrTopicSlugNotUnique {
			taken := types.CreateTopicValidationSlugTaken
			return &types.CreateTopicPayload{
				Validation: &taken,
			}, nil
		}

		return nil, err
	}

	return &types.CreateTopicPayload{
		Topic: types.MarshalTopicToGraphQL(ctx, topic),
	}, err
}

func (r *MutationResolver) UpdateTopicTitle(ctx context.Context, input types.UpdateTopicTitleInput) (*types.UpdateTopicTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	topic, err := r.App.Commands.UpdateTopicTitle.
		Handle(
			ctx,
			command.UpdateTopicTitle{
				TopicId:   input.ID.GetID(),
				Principal: principal.FromContext(ctx),
				Title:     input.Title,
				Locale:    input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateTopicTitlePayload{
		Topic: types.MarshalTopicToGraphQL(ctx, topic),
	}, err
}

func (r *MutationResolver) UpdateTopicDescription(ctx context.Context, input types.UpdateTopicDescriptionInput) (*types.UpdateTopicDescriptionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	topic, err := r.App.Commands.UpdateTopicDescription.
		Handle(
			ctx,
			command.UpdateTopicDescription{
				Principal:   principal.FromContext(ctx),
				TopicId:     input.ID.GetID(),
				Description: input.Description,
				Locale:      input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateTopicDescriptionPayload{
		Topic: types.MarshalTopicToGraphQL(ctx, topic),
	}, err
}

func (r *MutationResolver) UpdateTopicWeight(ctx context.Context, input types.UpdateTopicWeightInput) (*types.UpdateTopicWeightPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	topic, err := r.App.Commands.UpdateTopicWeight.
		Handle(
			ctx,
			command.UpdateTopicWeight{
				Principal: principal.FromContext(ctx),
				TopicId:   input.ID.GetID(),
				Weight:    input.Weight,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateTopicWeightPayload{
		Topic: types.MarshalTopicToGraphQL(ctx, topic),
	}, err
}

func (r *MutationResolver) UpdateTopicBanner(ctx context.Context, input types.UpdateTopicBannerInput) (*types.UpdateTopicBannerPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	topic, err := r.App.Commands.UpdateTopicBanner.
		Handle(
			ctx,
			command.UpdateTopicBanner{
				Principal: principal.FromContext(ctx),
				TopicId:   input.ID.GetID(),
				Banner:    input.Banner,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateTopicBannerPayload{
		Topic: types.MarshalTopicToGraphQL(ctx, topic),
	}, err

}
