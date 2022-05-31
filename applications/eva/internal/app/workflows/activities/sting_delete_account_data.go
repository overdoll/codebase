package activities

import (
	"context"
	"github.com/getsentry/sentry-go"
)

func (h *Activities) StingDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.sting.DeleteAccountData(ctx, accountId); err != nil {
		sentry.CurrentHub().CaptureException(err)
		return err
	}

	return nil
}
