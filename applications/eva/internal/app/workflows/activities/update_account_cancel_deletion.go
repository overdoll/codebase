package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
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
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
