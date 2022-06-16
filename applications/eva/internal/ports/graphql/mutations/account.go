package mutations

import (
	"context"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) DeleteAccount(ctx context.Context, input types.DeleteAccountInput) (*types.DeleteAccountPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.DeleteAccount.Handle(ctx, command.DeleteAccount{
		Principal: principal.FromContext(ctx),
		AccountId: input.AccountID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.DeleteAccountPayload{
		Account: types.MarshalAccountToGraphQL(ctx, acc),
	}, nil
}

func (r *MutationResolver) CancelAccountDeletion(ctx context.Context, input types.CancelAccountDeletionInput) (*types.CancelAccountDeletionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.CancelAccountDeletion.Handle(ctx, command.CancelAccountDeletion{
		Principal: principal.FromContext(ctx),
		AccountId: input.AccountID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.CancelAccountDeletionPayload{
		Account: types.MarshalAccountToGraphQL(ctx, acc),
	}, nil
}
