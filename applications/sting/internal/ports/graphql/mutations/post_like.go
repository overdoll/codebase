package mutations

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) LikePost(ctx context.Context, input types.LikePostInput) (*types.LikePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postLike, err := r.App.Commands.LikePost.
		Handle(
			ctx,
			command.LikePost{
				Principal: principal.FromContext(ctx),
				PostId:    input.PostID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "AddPostLike_" + postLike.PostId() + "_" + postLike.AccountId(),
	}

	_, err = r.Client.ExecuteWorkflow(ctx, options, workflows.AddPostLike, postLike.PostId())

	if err != nil {
		return nil, err
	}

	return &types.LikePostPayload{PostLike: types.MarshalPostLikeToGraphQL(ctx, postLike)}, err
}

func (r *MutationResolver) UndoLikePost(ctx context.Context, input types.UndoLikePostInput) (*types.UndoLikePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err :=
		r.App.Commands.UndoLikePost.
			Handle(
				ctx,
				command.UndoLikePost{
					Principal: principal.FromContext(ctx),
					PostId:    input.PostID.GetID(),
				},
			); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemovePostLike_" + input.PostID.GetID() + "_" + principal.FromContext(ctx).AccountId(),
	}

	_, err := r.Client.ExecuteWorkflow(ctx, options, workflows.RemovePostLike, input.PostID.GetID())

	if err != nil {
		return nil, err
	}

	id := relay.NewID(types.PostLike{}, input.PostID.GetID(), principal.FromContext(ctx).AccountId())

	return &types.UndoLikePostPayload{PostLikeID: &id}, err
}
