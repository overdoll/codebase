package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
	"time"
)

type AccountDeletionReminderInput struct {
	AccountId    string
	DeletionDate time.Time
}

func (h *Activities) AccountDeletionReminder(ctx context.Context, input AccountDeletionReminderInput) error {

	if err := h.carrier.AccountDeletionReminder(ctx, input.AccountId, input.DeletionDate); err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
