package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
	"overdoll/applications/eva/internal/domain/account"
)

type UpdateAccountDeletedInput struct {
	AccountId string
}

func (h *Activities) UpdateAccountDeleted(ctx context.Context, input UpdateAccountDeletedInput) error {

	_, err := h.ar.UpdateAccountDeleted(ctx, input.AccountId, func(account *account.Account) error {
		return account.MarkDeleted()
	})

	if err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
