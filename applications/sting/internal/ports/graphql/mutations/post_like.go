package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
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

	return &types.LikePostPayload{PostLike: types.MarshalPostLikeToGraphQL(ctx, postLike)}, nil
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

	id := relay.NewID(types.PostLike{}, input.PostID.GetID(), principal.FromContext(ctx).AccountId())

	return &types.UndoLikePostPayload{PostLikeID: &id}, nil
}
