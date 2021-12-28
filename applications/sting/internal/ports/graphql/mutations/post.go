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

func (r *MutationResolver) CreatePost(ctx context.Context) (*types.CreatePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.CreatePost.
		Handle(
			ctx,
			command.CreatePost{
				Principal: principal.FromContext(ctx),
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

func (r *MutationResolver) UpdatePostClub(ctx context.Context, input types.UpdatePostClubInput) (*types.UpdatePostClubPayload, error) {
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.UpdatePostClub.
		Handle(
			ctx,
			command.UpdatePostClub{
				Principal: principal.FromContext(ctx),
				PostId:    input.ID.GetID(),
				ClubId:    input.ClubID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostClubPayload{
		Post: types.MarshalPostToGraphQL(ctx, pst),
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

func (r *MutationResolver) UpdatePostContent(ctx context.Context, input types.UpdatePostContentInput) (*types.UpdatePostContentPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.UpdatePostContent.
		Handle(
			ctx,
			command.UpdatePostContent{
				Principal: principal.FromContext(ctx),
				PostId:    input.ID.GetID(),
				Content:   input.Content,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostContentPayload{
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
