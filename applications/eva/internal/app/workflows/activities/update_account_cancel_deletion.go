package activities

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
)

type UpdateAccountCancelDeletionInput struct {
	AccountId string
}

func (h *Activities) UpdateAccountCancelDeletion(ctx context.Context, input UpdateAccountCancelDeletionInput) error {

	_, err := h.ar.UpdateAccountDeleting(ctx, input.AccountId, func(account *account.Account) error {
		return account.MarkUnDeleted()
	})

	if err != nil {
		return err
	}

	return nil
}
