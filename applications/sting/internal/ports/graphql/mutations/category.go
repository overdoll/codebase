package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) UpdateCategoryTopic(ctx context.Context, input types.UpdateCategoryTopicInput) (*types.UpdateCategoryTopicPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	category, err := r.App.Commands.UpdateCategoryTopic.
		Handle(
			ctx,
			command.UpdateCategoryTopic{
				Principal:  principal.FromContext(ctx),
				CategoryId: input.ID.GetID(),
				TopicId:    input.TopicID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCategoryTopicPayload{
		Category: types.MarshalCategoryToGraphQL(ctx, category),
	}, err
}

func (r *MutationResolver) AddCategoryAlternativeTitle(ctx context.Context, input types.AddCategoryAlternativeTitleInput) (*types.AddCategoryAlternativeTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	category, err := r.App.Commands.AddCategoryAlternativeTitle.
		Handle(
			ctx,
			command.AddCategoryAlternativeTitle{
				Principal:  principal.FromContext(ctx),
				CategoryId: input.ID.GetID(),
				Title:      input.Title,
				Locale:     input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.AddCategoryAlternativeTitlePayload{
		Category: types.MarshalCategoryToGraphQL(ctx, category),
	}, err
}

func (r *MutationResolver) RemoveCategoryAlternativeTitle(ctx context.Context, input types.RemoveCategoryAlternativeTitleInput) (*types.RemoveCategoryAlternativeTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	category, err := r.App.Commands.RemoveCategoryAlternativeTitle.
		Handle(
			ctx,
			command.RemoveCategoryAlternativeTitle{
				Principal:  principal.FromContext(ctx),
				CategoryId: input.ID.GetID(),
				Title:      input.Title,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.RemoveCategoryAlternativeTitlePayload{
		Category: types.MarshalCategoryToGraphQL(ctx, category),
	}, err
}

func (r *MutationResolver) CreateCategory(ctx context.Context, input types.CreateCategoryInput) (*types.CreateCategoryPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var topicId *string

	if input.TopicID != nil {
		id := input.TopicID.GetID()
		topicId = &id
	}

	category, err := r.App.Commands.CreateCategory.
		Handle(
			ctx,
			command.CreateCategory{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				Title:     input.Title,
				TopicId:   topicId,
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
