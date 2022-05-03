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
	return h.carrier.AccountDeletionBegin(ctx, input.AccountId, input.DeletionDate)
}
