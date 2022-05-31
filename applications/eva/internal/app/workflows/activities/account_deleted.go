package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
)

type AccountDeletedInput struct {
	Username string
	Email    string
}

func (h *Activities) AccountDeleted(ctx context.Context, input AccountDeletedInput) error {

	if err := h.carrier.AccountDeleted(ctx, input.Username, input.Email); err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
