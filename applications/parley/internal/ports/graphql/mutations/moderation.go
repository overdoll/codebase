package mutations

import (
	"context"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r MutationResolver) AddModeratorToPostQueue(ctx context.Context, input types.AddModeratorToPostQueueInput) (*types.AddModeratorToPostQueuePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.AddModeratorToPostQueue.Handle(ctx, command.AddModeratorToPostQueue{
		Principal: principal.FromContext(ctx),
		AccountId: input.AccountID.GetID(),
	}); err != nil {
		return nil, err
	}

	return &types.AddModeratorToPostQueuePayload{Account: &types.Account{ID: input.AccountID}}, nil
}

func (r MutationResolver) RemoveModeratorFromPostQueue(ctx context.Context, input types.RemoveModeratorFromPostQueueInput) (*types.RemoveModeratorFromPostQueuePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.RemoveModeratorFromPostQueue.Handle(ctx, command.RemoveModeratorFromPostQueue{
		Principal: principal.FromContext(ctx),
		AccountId: input.AccountID.GetID(),
	}); err != nil {
		return nil, err
	}

	return &types.RemoveModeratorFromPostQueuePayload{Account: &types.Account{ID: input.AccountID}}, nil
}

func (r MutationResolver) RejectPost(ctx context.Context, input types.RejectPostInput) (*types.RejectPostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.RejectPost.Handle(ctx, command.RejectPost{
		Principal: principal.FromContext(ctx),
		PostId:    input.PostID.GetID(),
		RuleId:    input.RuleID.GetID(),
		Notes:     input.Notes,
	}); err != nil {
		return nil, err
	}

	return &types.RejectPostPayload{
		Post: &types.Post{
			ID: input.PostID,
		},
	}, nil
}

func (r MutationResolver) RemovePost(ctx context.Context, input types.RemovePostInput) (*types.RemovePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.RemovePost.Handle(ctx, command.RemovePost{
		Principal: principal.FromContext(ctx),
		RuleId:    input.RuleID.GetID(),
		Notes:     input.Notes,
		PostId:    input.PostID.GetID(),
	}); err != nil {
		return nil, err
	}

	return &types.RemovePostPayload{
		Post: &types.Post{
			ID: input.PostID,
		},
	}, nil
}

func (r MutationResolver) ApprovePost(ctx context.Context, input types.ApprovePostInput) (*types.ApprovePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.ApprovePost.Handle(ctx, command.ApprovePost{
		Principal: principal.FromContext(ctx),
		PostId:    input.PostID.GetID(),
	}); err != nil {
		return nil, err
	}

	return &types.ApprovePostPayload{
		Post: &types.Post{
			ID: input.PostID,
		},
	}, nil
}
