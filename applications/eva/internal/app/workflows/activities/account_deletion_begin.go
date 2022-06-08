package activities

import (
	"context"
	"time"
)

type AccountDeletionBeginInput struct {
	AccountId    string
	DeletionDate time.Time
}

func (h *Activities) AccountDeletionBegin(ctx context.Context, input AccountDeletionBeginInput) error {

	if err := h.carrier.AccountDeletionBegin(ctx, input.AccountId, input.DeletionDate); err != nil {
		return err
	}

	return nil
}
