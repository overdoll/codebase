package activities

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/sentry_support"
)

type UpdateAccountCancelDeletionInput struct {
	AccountId string
}

func (h *Activities) UpdateAccountCancelDeletion(ctx context.Context, input UpdateAccountCancelDeletionInput) error {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	_, err = h.ar.UpdateAccountDeleting(ctx, input.AccountId, func(account *account.Account) error {
		return account.MarkUnDeleted()
	})

	if err != nil {
		return err
	}

	return nil
}
