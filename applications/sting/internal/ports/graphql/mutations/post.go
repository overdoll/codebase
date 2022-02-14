package mutations

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreatePost(ctx context.Context, input types.CreatePostInput) (*types.CreatePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.CreatePost.
		Handle(
			ctx,
			command.CreatePost{
				Principal: principal.FromContext(ctx),
				ClubId:    input.ClubID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CreatePostPayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
	}, err
}

func (r *MutationResolver) SubmitPost(ctx context.Context, input types.SubmitPostInput) (*types.SubmitPostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.SubmitPost.
		Handle(
			ctx,
			command.SubmitPost{
				Principal: principal.FromContext(ctx),
				PostId:    input.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "SubmitPostWorkflow_" + pst.ID(),
	}

	_, err = r.Client.ExecuteWorkflow(ctx, options, workflows.SubmitPost, pst.ID())

	if err != nil {
		return nil, err
	}

	inReview := true

	return &types.SubmitPostPayload{
		Post:     types.MarshalPostToGraphQL(ctx, pst),
		InReview: &inReview,
	}, err
}

func (r *MutationResolver) UpdatePostAudience(ctx context.Context, input types.UpdatePostAudienceInput) (*types.UpdatePostAudiencePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.UpdatePostAudience.
		Handle(
			ctx,
			command.UpdatePostAudience{
				Principal:  principal.FromContext(ctx),
				PostId:     input.ID.GetID(),
				AudienceId: input.AudienceID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostAudiencePayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
	}, err
}

func (r *MutationResolver) AddPostContent(ctx context.Context, input types.AddPostContentInput) (*types.AddPostContentPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.AddPostContent.
		Handle(
			ctx,
			command.AddPostContent{
				Principal: principal.FromContext(ctx),
				PostId:    input.ID.GetID(),
				Content:   input.Content,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.AddPostContentPayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
	}, err
}

func (r *MutationResolver) RemovePostContent(ctx context.Context, input types.RemovePostContentInput) (*types.RemovePostContentPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var removedContentIds []string

	for _, cnt := range input.ContentIds {
		removedContentIds = append(removedContentIds, cnt.GetID())
	}

	pst, err := r.App.Commands.RemovePostContent.
		Handle(
			ctx,
			command.RemovePostContent{
				Principal:  principal.FromContext(ctx),
				PostId:     input.ID.GetID(),
				ContentIds: removedContentIds,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.RemovePostContentPayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
	}, err
}

func (r *MutationResolver) UpdatePostContentOrder(ctx context.Context, input types.UpdatePostContentOrderInput) (*types.UpdatePostContentOrderPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var updatedContentIds []string

	for _, cnt := range input.ContentIds {
		updatedContentIds = append(updatedContentIds, cnt.GetID())
	}

	pst, err := r.App.Commands.UpdatePostContentOrder.
		Handle(
			ctx,
			command.UpdatePostContentOrder{
				Principal:  principal.FromContext(ctx),
				PostId:     input.ID.GetID(),
				ContentIds: updatedContentIds,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostContentOrderPayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
	}, err
}

func (r *MutationResolver) UpdatePostCharacters(ctx context.Context, input types.UpdatePostCharactersInput) (*types.UpdatePostCharactersPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var characterIds []string

	for _, id := range input.CharacterIds {
		characterIds = append(characterIds, id.GetID())
	}

	pst, err := r.App.Commands.UpdatePostCharacters.
		Handle(
			ctx,
			command.UpdatePostCharacters{
				Principal:    principal.FromContext(ctx),
				PostId:       input.ID.GetID(),
				CharacterIds: characterIds,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostCharactersPayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
	}, err
}

func (r *MutationResolver) UpdatePostCategories(ctx context.Context, input types.UpdatePostCategoriesInput) (*types.UpdatePostCategoriesPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var categoryIds []string

	for _, id := range input.CategoryIds {
		categoryIds = append(categoryIds, id.GetID())
	}

	pst, err := r.App.Commands.UpdatePostCategories.
		Handle(
			ctx,
			command.UpdatePostCategories{
				Principal:   principal.FromContext(ctx),
				PostId:      input.ID.GetID(),
				CategoryIds: categoryIds,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostCategoriesPayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
	}, err
}
