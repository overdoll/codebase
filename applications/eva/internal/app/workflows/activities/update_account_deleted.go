package activities

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/sentry_support"
)

type UpdateAccountDeletedInput struct {
	AccountId string
}

func (h *Activities) UpdateAccountDeleted(ctx context.Context, input UpdateAccountDeletedInput) error {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	_, err = h.ar.UpdateAccountDeleted(ctx, input.AccountId, func(account *account.Account) error {
		return account.MarkDeleted()
	})

	if err != nil {
		return err
	}

	return nil
}
