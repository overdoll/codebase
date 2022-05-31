package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
	"time"
)

type AccountDeletionBeginInput struct {
	AccountId    string
	DeletionDate time.Time
}

func (h *Activities) AccountDeletionBegin(ctx context.Context, input AccountDeletionBeginInput) error {

	if err := h.carrier.AccountDeletionBegin(ctx, input.AccountId, input.DeletionDate); err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
