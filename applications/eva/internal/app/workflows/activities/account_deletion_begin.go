package activities

import (
	"context"
	"overdoll/libraries/sentry_support"
	"time"
)

type AccountDeletionBeginInput struct {
	AccountId    string
	DeletionDate time.Time
}

func (h *Activities) AccountDeletionBegin(ctx context.Context, input AccountDeletionBeginInput) error {

	var err error
	defer sentry_support.CaptureActivityError(ctx, err)

	if err := h.carrier.AccountDeletionBegin(ctx, input.AccountId, input.DeletionDate); err != nil {
		return err
	}

	return nil
}
