package activities

import (
	"context"
	"overdoll/libraries/sentry_support"
	"time"
)

type AccountDeletionReminderInput struct {
	AccountId    string
	DeletionDate time.Time
}

func (h *Activities) AccountDeletionReminder(ctx context.Context, input AccountDeletionReminderInput) error {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	if err = h.carrier.AccountDeletionReminder(ctx, input.AccountId, input.DeletionDate); err != nil {
		return err
	}

	return nil
}
